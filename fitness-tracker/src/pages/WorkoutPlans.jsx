import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
} from "@mui/material";
import { Timer } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Import images
import workout1 from "../assets/workout1.jpg";
import workout2 from "../assets/workout2.jpg";
import workout3 from "../assets/workout3.jpg";

const workoutPlans = [
  {
    id: 1,
    title: "Beginner Plan",
    duration: "4 weeks",
    level: "Beginner",
    description: "Perfect for beginners starting their fitness journey.",
    image: workout1,
    tags: ["Cardio", "Strength", "Low Intensity"],
  },
  {
    id: 2,
    title: "Weight Loss Plan",
    duration: "6 weeks",
    level: "Intermediate",
    description: "Focused on fat-burning and HIIT workouts.",
    image: workout2,
    tags: ["HIIT", "Fat Loss", "Calorie Burn"],
  },
  {
    id: 3,
    title: "Muscle Gain Plan",
    duration: "8 weeks",
    level: "Advanced",
    description: "Build strength with heavy lifting routines.",
    image: workout3,
    tags: ["Strength", "Hypertrophy", "Advanced"],
  },
];

const WorkoutPlans = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        color: "#ffffff",
        padding: { xs: "16px", sm: "32px" }, // Adjust padding for small screens
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "#00bfa5",
          marginBottom: "16px",
          fontSize: { xs: "2rem", sm: "2.5rem" }, // Responsive font size
        }}
      >
        Workout Plans
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          color: "#bdbdbd",
          marginBottom: "32px",
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        Choose the plan that suits your fitness goals and get started today.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {workoutPlans.map((plan) => (
          <Grid
            item
            key={plan.id}
            xs={12} // Full width on small screens
            sm={6} // Half width on small to medium screens
            md={4} // One-third width on larger screens
          >
            <Card
              sx={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                borderRadius: "12px",
                transform: "scale(1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={plan.image}
                alt={plan.title}
                height="200"
                sx={{
                  borderBottom: "3px solid #00bfa5",
                  filter: "brightness(0.9)",
                  transition: "filter 0.3s",
                  "&:hover": {
                    filter: "brightness(1.1)",
                  },
                }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#00bfa5",
                    marginBottom: "8px",
                    fontSize: { xs: "1.25rem", sm: "1.5rem" }, // Responsive font size
                  }}
                >
                  {plan.title}
                </Typography>
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <Timer sx={{ color: "#bdbdbd", marginRight: "8px" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#bdbdbd",
                      fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    }}
                  >
                    {plan.duration}
                  </Typography>
                  <Chip
                    label={plan.level}
                    sx={{
                      marginLeft: "auto",
                      backgroundColor: "#00bfa5",
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: { xs: "0.75rem", sm: "0.9rem" },
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#bdbdbd",
                    marginBottom: "16px",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  {plan.description}
                </Typography>
                <Box marginBottom={2}>
                  {plan.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      sx={{
                        backgroundColor: "#424242",
                        color: "#ffffff",
                        marginRight: "8px",
                        marginBottom: "8px",
                        fontSize: { xs: "0.75rem", sm: "0.85rem" },
                      }}
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate(`/workouts/${plan.id}`)}
                  sx={{
                    backgroundColor: "#00bfa5",
                    color: "#ffffff",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    "&:hover": {
                      backgroundColor: "#00a58f",
                    },
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkoutPlans;
