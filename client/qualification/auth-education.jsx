import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { create, list } from "../qualification/api-qualification.js";
import academic from "../src/assets/academic.jfif";
import "../src/education.css";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import "@fontsource/roboto/400.css";

export default function Autheducation() {
  const [qualifications, setQualifications] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
    try {
      const newQualification = await create(data);
      setQualifications([...qualifications, newQualification]);
      reset(); // clears the form
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" className="worksTitle">
        Academic Qualification
      </Typography>
      <img
        src={academic}
        alt="Academic Qualification"
        className="worksImg"
        style={{ 
            width: '300px',   // set a fixed width
            height: 'auto',   // keep aspect ratio
            display: 'block', // center with margin auto
            margin: '0 auto' 
          }}
      />
      <br />
      <br />

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
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>

              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="standard"
                  {...register("firstname", {
                    required: "First name is required",
                  })}
                  error={!!errors.firstname}
                  helperText={errors.firstname?.message}
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="standard"
                  {...register("lastname", {
                    required: "Last name is required",
                  })}
                  error={!!errors.lastname}
                  helperText={errors.lastname?.message}
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
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              {/* Completion Date */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Completion Date"
                  variant="standard"
                  {...register("completion", {
                    required: "Completion Date is required",
                  })}
                  error={!!errors.completion}
                  helperText={errors.completion?.message}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="standard"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <br />
      <br />

      {/* Render qualifications */}
      {qualifications.map((q, index) => (
        <Card key={index} style={{ margin: "10px auto", maxWidth: 800 }}>
          <CardContent>
            <Typography variant="h6">{q.title}</Typography>
            <Typography>
              {q.firstname} {q.lastname}
            </Typography>
            <Typography>{q.email}</Typography>
            <Typography>{q.completion}</Typography>
            <Typography>{q.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
