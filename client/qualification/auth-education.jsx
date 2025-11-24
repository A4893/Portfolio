
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { create, list } from '../qualification/api-qualification.js';
import academic from '../src/assets/academic.jfif';
import '../src/education.css';
import { Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';
import '@fontsource/roboto/400.css';
export default function Autheducation(){
     const [values, setValues] = useState({
        title: "",
        firstname: "",
        lastname: "",
        email: "",
        completion: "",
        description: "",
      });
    
      const [qualifications, setQualifications] = useState([]); // store submitted qualifications
    
      const { register, handleSubmit, formState: { errors } } = useForm();
    
      // Load existing qualifications from backend
      useEffect(() => {
        const abortController = new AbortController();
        list(abortController.signal).then((data) => {
          if (data && Array.isArray(data)) {
            setQualifications(data);
          }
        });
        return () => abortController.abort();
      }, []);
    
      const submitForm = async (data) => {
        console.log(data);
        try {
          const newQualification = await create(data);
          // Add new qualification to state
          setQualifications([...qualifications, newQualification]);
    
          // Reset form values
          setValues({
            title: "",
            firstname: "",
            lastname: "",
            email: "",
            completion: "",
            description: "",
          });
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
    
      const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
      };
    
      return (
        <>
          <Typography variant="h4" align="center" className="worksTitle">Academic Qualification</Typography>
          <img src={academic} alt="Academic Qualification" className="worksImg" style={{ width: '100%' }} />
          <br /><br />
          
          {/* Form */}
          <Card style={{ maxWidth: 800, padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>
              <form onSubmit={handleSubmit(submitForm)}>
                <Grid container spacing={2}>
                  {/* Title */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
                      variant="standard"
                      {...register("title", { required: "Title is required" })}
                      value={values.title}
                      onChange={handleChange('title')}
                      error={!!errors.title}
                      helperText={errors.title ? errors.title.message : ""}
                    />
                  </Grid>
    
                  {/* First Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="standard"
                      {...register("firstname", { required: "First name is required" })}
                      value={values.firstname}
                      onChange={handleChange('firstname')}
                      error={!!errors.firstname}
                      helperText={errors.firstname ? errors.firstname.message : ""}
                    />
                  </Grid>
    
                  {/* Last Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="standard"
                      {...register("lastname", { required: "Last name is required" })}
                      value={values.lastname}
                      onChange={handleChange('lastname')}
                      error={!!errors.lastname}
                      helperText={errors.lastname ? errors.lastname.message : ""}
                    />
                  </Grid>
    
                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      variant="standard"
                      {...register("email", { required: "Email is required" })}
                      value={values.email}
                      onChange={handleChange('email')}
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  </Grid>
    
                  {/* Completion Date */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Completion Date"
                      variant="standard"
                      {...register("completion", { required: "Completion Date is required" })}
                      value={values.completion}
                      onChange={handleChange('completion')}
                      error={!!errors.completion}
                      helperText={errors.completion ? errors.completion.message : ""}
                    />
                  </Grid>
    
                  {/* Description */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      variant="standard"
                      {...register("description", { required: "Description is required" })}
                      value={values.description}
                      onChange={handleChange('description')}
                      error={!!errors.description}
                      helperText={errors.description ? errors.description.message : ""}
                    />
                  </Grid>
    
                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
    
          <br /><br />
    
          
    
        </>
      );
}