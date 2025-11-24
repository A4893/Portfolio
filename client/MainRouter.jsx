// import React from 'react'
// import {Route, Routes} from 'react-router-dom'
// import Home from './components/Home' 
// import About from './src/about'
// import Contact from './src/contact'
// import Education from './qualification/education'
// import Project from './project/project'
// import Users from './user/Users.jsx'
// import Signup from './user/Signup.jsx'
// import Signin from './lib/Signin.jsx'

// import Profile from './user/Profile.jsx'
// import PrivateRoute from './lib/PrivateRoute.jsx'
// import EditProfile from './user/EditProfile.jsx'
// import Autheducation from './qualification/auth-education.jsx'
// import auth from './lib/auth-helper.js'
// import Menu from './components/layout' 
// function MainRouter() {
//  return (
//  <div>
//  <Menu/>

// <Routes>

// <Route exact path="/" element={<Home />} />
// <Route path="/users" element={<Users />} />
// <Route path="/signup" element={<Signup />}/>
// <Route path="/signin" element={<Signin />} />

 
// <Route
//  path="/user/edit/:userId"
//  element={
//  <PrivateRoute>
//  <EditProfile />
//  </PrivateRoute>
//  }
// />

// <Route path="/user/:userId" element={<Profile/>}/>
// <Route exact path="/about" element={<About />} />
// <Route exact path="/education" element={<Education />} />
// <Route exact path="/project" element={<Project />} />
// <Route exact path="/contact" element={<Contact />} />

 
//  </Routes>
//  </div>
//  )
// }
// export default MainRouter

import React from 'react'
import AuthProject from './project/projecta.jsx'
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home' 
import About from './src/about'
import Contact from './src/contact'
import Education from './qualification/education'
import Projects from './project/projects.jsx'
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './lib/Signin.jsx'

import Profile from './user/Profile.jsx'
import PrivateRoute from './lib/PrivateRoute.jsx'
import EditProfile from './user/EditProfile.jsx'
import Autheducation from './qualification/auth-education.jsx'
import ProfileManage from './user/User-Management.jsx'
import Menu from './components/layout' 
import auth from './lib/auth-helper'   

function MainRouter() {
  const user = auth.isAuthenticated() ? auth.isAuthenticated().user : null;

  return (
    <div>
      <Menu/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />} />

        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />

        <Route path="/user/:userId" element={<Profile/>}/>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/education" element={<Education />} />
        <Route exact path="/project" element={<Projects />} />
        <Route exact path="/contact" element={<Contact />} />

        {user && user._id === "6923e3ac30cc74f6ca050644" && (
          <Route exact path="/autheducation" element={<Autheducation />} />
        )}
         {user && user._id === "6923e3ac30cc74f6ca050644" && (
          <Route exact path="/authproject" element={<AuthProject />} />
        )}

        {user && user._id === "6923e3ac30cc74f6ca050644" && (
          <Route exact path="/usermanagement" element={<ProfileManage  />} />
        )}
      </Routes>
    </div>
  )
}
export default MainRouter
