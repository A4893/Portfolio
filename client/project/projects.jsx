import React, { useState, useEffect } from "react";
import {list} from "./api-project" // ✅ import list function
import { Card, CardContent, Typography, Grid } from "@mui/material";
import "@fontsource/roboto/400.css";
import "../src/project.css"; // custom styles
import projectn2 from "../src/assets/projectn2.jfif";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  // Load projects from backend
  useEffect(() => {
    const abortController = new AbortController();
    list(abortController.signal).then((data) => {
      if (data && Array.isArray(data)) {
        setProjects(data);
      }
    });
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        All Projects
      </Typography>
      <div style={{ textAlign: "center" }}>
        <img
          src={projectn2}
          alt="Projects Banner"
          className="worksImg"
          width={1500}
          height={80}
        />
        <br /><br />
      </div>

      {/* Display projects as cards */}
      <Grid container spacing={3} justifyContent="center" className="projects-container">
        {projects.map((p, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="project-card">
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography variant="body1">
                  {p.firstname} {p.lastname}
                </Typography>
                <Typography variant="body2" className="email">
                  {p.email}
                </Typography>
                <span className="completion-badge">
                  Completion: {p.completion}
                </span>
                <Typography variant="body2">{p.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
