import React, { useState, useEffect } from "react";
import AnimatedWrapper from "../components/AnimatedWrapper";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const COLORS = ["#00bfa5", "#004d40", "#26a69a", "#b2dfdb"];

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#0f172a",
        paper: "#1e293b",
      },
      text: {
        primary: "#f8fafc",
        secondary: "#cbd5e1",
      },
      primary: {
        main: "#00bfa5",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: "#1e293b",
          },
        },
      },
    },
  });

  const api = axios.create({
    baseURL: "http://localhost:5000/auth",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await api.get("/metrics");
      setMetrics(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load metrics. Please try again later.");
      console.error("Error fetching metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <div className="p-8 rounded-lg bg-slate-800/50 backdrop-blur-lg">
          <CircularProgress className="text-indigo-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-slate-900 min-h-screen">
        <Alert 
          severity="error" 
          className="bg-red-500/10 text-red-200 border border-red-500/20"
        >
          {error}
        </Alert>
      </div>
    );
  }

  const pieData = metrics?.overall_stats
    ? [
        { name: "Completed", value: metrics.overall_stats.completed_activities },
        { name: "Pending", value: metrics.overall_stats.pending_activities },
        { name: "Missed", value: metrics.overall_stats.missed_activities },
      ]
    : [];

    const StatCard = ({ title, value, gradient }) => (
      <Card className="relative overflow-hidden group">
        <div className={`absolute inset-0 opacity-50 ${gradient}`} />
        <div className="absolute inset-0 bg-slate-800/50 group-hover:bg-slate-800/40 transition-colors duration-300" />
        <CardContent className="relative p-6 flex flex-col items-center justify-center h-full">
          <Typography className="text-slate-300 mb-2 font-medium" variant="subtitle1">
            {title}
          </Typography>
          <Typography variant="h4" className="font-bold text-white">
            {value}
          </Typography>
        </CardContent>
      </Card>
    );

  return (
<ThemeProvider theme={darkTheme}>
  <AnimatedWrapper>
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <Typography
        variant="h4"
        className="font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400"
      >
        Performance Dashboard
      </Typography>

      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Completion Rate"
            value={`${metrics?.overall_stats?.completion_rate}%`}
            gradient="bg-gradient-to-br from-teal-500/30 to-cyan-500/30"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Activities"
            value={metrics?.overall_stats?.total_activities}
            gradient="bg-gradient-to-br from-cyan-500/30 to-teal-400/30"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Activities This Week"
            value={metrics?.weekly_stats?.length || 0}
            gradient="bg-gradient-to-br from-teal-400/30 to-cyan-400/30"
          />
        </Grid>
      </Grid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 backdrop-blur-sm bg-slate-800/60">
          <Typography variant="h6" className="mb-6 text-slate-200 font-semibold">
            Activity Status Distribution
          </Typography>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-slate-800/60">
          <Typography variant="h6" className="mb-6 text-slate-200 font-semibold">
            Weekly Activity Completion
          </Typography>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer>
              <BarChart data={metrics?.weekly_stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#88d9d2" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#88d9d2' }}
                  axisLine={{ stroke: '#005a5a' }}
                />
                <YAxis
                  tick={{ fill: '#88d9d2' }}
                  axisLine={{ stroke: '#005a5a' }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                  cursor={{ fill: 'rgba(88,217,210,0.1)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar
                  dataKey="completed_activities"
                  name="Completed"
                  fill="#00897b"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="total_activities"
                  name="Total"
                  fill="#005a5a"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6 backdrop-blur-sm bg-slate-800/60">
        <Typography variant="h6" className="mb-6 text-slate-200 font-semibold">
          Top Activities Performance
        </Typography>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer>
            <BarChart data={metrics?.activity_types}>
              <CartesianGrid strokeDasharray="3 3" stroke="#88d9d2" />
              <XAxis
                dataKey="activity"
                tick={{ fill: '#88d9d2' }}
                axisLine={{ stroke: '#005a5a' }}
              />
              <YAxis
                tick={{ fill: '#88d9d2' }}
                axisLine={{ stroke: '#005a5a' }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                cursor={{ fill: 'rgba(88,217,210,0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar
                dataKey="completed_count"
                name="Completed"
                fill="#00a89f"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="count"
                name="Total"
                fill="#007b71"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  </AnimatedWrapper>
</ThemeProvider>
  );
};

export default Dashboard;