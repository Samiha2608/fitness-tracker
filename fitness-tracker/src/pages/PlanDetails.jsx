import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CardMedia, Chip, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Import images
import workout1 from "../assets/workout1.jpg";
import workout2 from "../assets/workout2.jpg";
import workout3 from "../assets/workout3.jpg";

const workoutPlans = [
  {
    id: 1,
    title: "Beginner Plan",
    duration: "4 weeks",
    image: workout1,
    details:
      "This plan includes light cardio and beginner-friendly strength exercises. Perfect for those starting their fitness journey.",

    weeklyStructure: [
      "Week 1-2: Light cardio and bodyweight exercises",
      "Week 3: Low-intensity weight training",
      "Week 4: Combination of cardio and weights",
    ],
    faqs: [
      "Can I skip rest days? Rest is crucial for recovery; don't skip.",
      "Do I need equipment? Most exercises are bodyweight, but light dumbbells are optional.",
    ],
    highlights: [
      "Light cardio sessions",
      "Strength training exercises",
      "Rest days for recovery",
      "Nutrition and diet suggestions",
    ],
  },
  {
    id: 2,
    title: "Weight Loss Plan",
    duration: "6 weeks",
    image: workout2,
    details:
      "Focuses on high-intensity interval training (HIIT) and meal suggestions for fat loss.",
    weeklyStructure: [
      "Week 1-2: HIIT and moderate cardio",
      "Week 3-4: Longer-duration HIIT and weightlifting",
      "Week 5-6: Advanced HIIT and mobility drills",
    ],
    faqs: [
      "Will I lose muscle during this plan? Following the meal plan ensures minimal muscle loss.",
      "How intense is HIIT? Start slow and build intensity as you progress.",
    ],
    highlights: [
      "High-intensity interval training (HIIT)",
      "Calorie deficit meal plans",
      "Daily progress tracking",
      "Stretching and mobility routines",
    ],
  },
  {
    id: 3,
    title: "Muscle Gain Plan",
    duration: "8 weeks",
    image: workout3,
    details:
      "Emphasis on heavy compound lifts and a protein-rich diet plan. Designed for advanced lifters.",
    weeklyStructure: [
      "Week 1-2: Full-body strength training",
      "Week 3-5: Progressive overload with split routines",
      "Week 6-8: Advanced hypertrophy workouts",
    ],
    faqs: [
      "What if I miss a workout? Focus on consistency; a missed day won't ruin progress.",
      "Do I need supplements? A protein-rich diet is sufficient, but supplements can help.",
    ],
    highlights: [
      "Strength-based compound lifts",
      "Targeted hypertrophy workouts",
      "Progressive overload techniques",
      "High-protein diet recommendations",
    ],
  },
];

const PlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = workoutPlans.find((plan) => plan.id === parseInt(id));

  if (!plan) return <Typography variant="h4">Plan not found!</Typography>;

  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        color: "#ffffff",
        padding: { xs: "16px", sm: "32px" },
        minHeight: "100vh",
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        variant="text"
        sx={{
          color: "#00bfa5",
          marginBottom: "24px",
          "&:hover": { color: "#33c9dc" },
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
        alignItems="center"
      >
        <CardMedia
          component="img"
          image={plan.image}
          alt={plan.title}
          sx={{
            width: "100%",
            maxWidth: { xs: "300px", md: "400px" },
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
          }}
        />
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "16px",
              color: "#00bfa5",
              fontSize: { xs: "1.8rem", sm: "2rem" },
            }}
          >
            {plan.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "8px",
              color: "#bdbdbd",
              fontSize: { xs: "1rem", sm: "1.1rem" },
            }}
          >
            Duration: {plan.duration}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: "16px",
              color: "#bdbdbd",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            {plan.details}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: "8px", fontWeight: "bold" }}>
            Weekly Structure:
          </Typography>
          <ul>
            {plan.weeklyStructure.map((week, index) => (
              <li key={index} style={{ marginBottom: "8px", color: "#bdbdbd" }}>
                {week}
              </li>
            ))}
          </ul>
          <Typography variant="h6" sx={{ marginBottom: "8px", fontWeight: "bold" }}>
            FAQs:
          </Typography>
          <ul>
            {plan.faqs.map((faq, index) => (
              <li key={index} style={{ marginBottom: "8px", color: "#bdbdbd" }}>
                {faq}
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00bfa5",
              "&:hover": { backgroundColor: "#33c9dc" },
              marginTop: "24px",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
            onClick={() => alert("Plan Started!")}
          >
            Start This Plan
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PlanDetails;
