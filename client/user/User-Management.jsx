/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from '../lib/auth-helper.js'
import { list } from './api-user.js'   // ✅ use list instead of read
import { useLocation, Navigate, Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  },
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}))

export default function ProfileManage() {
  const location = useLocation()
  const classes = useStyles()
  const [users, setUsers] = useState([])
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUsers(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  if (redirectToSignin) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.map((user, i) => (
          <React.Fragment key={i}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              <ListItemSecondaryAction>
                {/* ✅ Edit button for every user */}
                <Link to={`/user/edit/${user._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                {/* ✅ Delete button for every user */}
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={`Joined: ${new Date(user.created).toDateString()}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  )
}
