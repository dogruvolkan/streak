import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  TrendingUp,
  Timer,
  EmojiEvents,
  Smartphone,
  CheckCircle,
  Star,
  Whatshot,
  Analytics,
  CloudOff,
} from "@mui/icons-material";

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp />,
      title: "Smart Habit Tracking",
      description:
        "Track daily, weekly, and monthly habits with intelligent progress visualization",
    },
    {
      icon: <Timer />,
      title: "Flexible Scheduling",
      description:
        "Set custom repeat patterns and choose specific days for your habits",
    },
    {
      icon: <EmojiEvents />,
      title: "Achievement System",
      description:
        "Celebrate every milestone with confetti and visual feedback",
    },
    {
      icon: <Analytics />,
      title: "Detailed Statistics",
      description:
        "Comprehensive analytics to track your progress and identify patterns",
    },
    {
      icon: <Smartphone />,
      title: "Mobile Optimized",
      description:
        "Perfect experience on all devices - phone, tablet, and desktop",
    },
    {
      icon: <CloudOff />,
      title: "Privacy First",
      description:
        "All data stored locally on your device - no cloud, no tracking",
    },
  ];

  const benefits = [
    "Build lasting habits that stick",
    "Increase productivity and focus",
    "Track multiple goals simultaneously",
    "Visual progress motivation",
    "Streak psychology for consistency",
    "Completely free to use",
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Finally found a habit tracker that actually works! The streak visualization keeps me motivated.",
      rating: 5,
    },
    {
      name: "James L.",
      text: "Simple, clean interface. Love that my data stays private and offline.",
      rating: 5,
    },
    {
      name: "Maria K.",
      text: "The confetti celebration system is genius! Makes building habits feel like a game.",
      rating: 5,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default",
        overflow: "auto",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Build Habits That Last
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 400,
              mb: 4,
              opacity: 0.9,
            }}
          >
            Free Streak Tracker for Consistent Habit Building
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", mb: 4, maxWidth: "600px", mx: "auto" }}
          >
            Transform your life with the power of streaks. Track daily habits,
            visualize progress, and build consistency that leads to lasting
            change.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => (window.location.href = "/app")}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            Start Tracking Free
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Why Choose Our Habit Tracker?
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{ height: "100%", textAlign: "center", p: 2 }}
            >
              <CardContent>
                <Box sx={{ color: "primary.main", mb: 2 }}>
                  {React.cloneElement(feature.icon, { sx: { fontSize: 48 } })}
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 6,
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{ mb: 4, fontWeight: 600 }}
              >
                Transform Your Life with Habits
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, fontSize: "1.1rem", lineHeight: 1.7 }}
              >
                Research shows that 40% of our daily actions are habits, not
                decisions. By tracking and building positive habits, you're
                investing in your future self and creating lasting positive
                change.
              </Typography>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box>
              <Paper
                sx={{
                  p: 4,
                  textAlign: "center",
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                <Whatshot sx={{ fontSize: 64, mb: 2 }} />
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{ mb: 2, fontWeight: 700 }}
                >
                  Join 10,000+ Users
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Building better habits every day
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => (window.location.href = "/app")}
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    "&:hover": {
                      bgcolor: "grey.100",
                    },
                  }}
                >
                  Get Started Now
                </Button>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          What Our Users Say
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Card key={index} sx={{ height: "100%", p: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", mb: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} sx={{ color: "gold" }} />
                  ))}
                </Box>
                <Typography variant="body1" sx={{ mb: 2, fontStyle: "italic" }}>
                  "{testimonial.text}"
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  - {testimonial.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Frequently Asked Questions
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
            }}
          >
            <Box>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  Is the habit tracker really free?
                </Typography>
                <Typography variant="body2">
                  Yes! Our habit tracker is completely free to use with no
                  hidden fees, subscriptions, or premium features. We believe
                  everyone deserves access to tools that help them improve their
                  lives.
                </Typography>
              </Paper>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  How does the streak system work?
                </Typography>
                <Typography variant="body2">
                  Every time you complete a habit, your streak counter
                  increases. Miss a day, and it resets to zero. This
                  psychological approach leverages loss aversion to keep you
                  motivated and consistent.
                </Typography>
              </Paper>
            </Box>
            <Box>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  Is my data safe and private?
                </Typography>
                <Typography variant="body2">
                  Absolutely! All your data is stored locally on your device. We
                  don't collect, store, or share any personal information. Your
                  habits and progress remain completely private.
                </Typography>
              </Paper>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  Can I track different types of habits?
                </Typography>
                <Typography variant="body2">
                  Yes! You can track daily habits (like drinking water), weekly
                  habits (like workout sessions), and monthly habits (like
                  reading books). Each habit can have its own custom schedule.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{ mb: 3, fontWeight: 600 }}
          >
            Ready to Build Better Habits?
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, fontSize: "1.1rem", maxWidth: "600px", mx: "auto" }}
          >
            Join thousands of people who have transformed their lives through
            consistent habit building. Start your journey today - it's
            completely free!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => (window.location.href = "/app")}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            Start Your First Streak
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "grey.900", color: "white", py: 4 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Streak Tracker
              </Typography>
              <Typography variant="body2" color="grey.400">
                The free, privacy-focused habit tracker that helps you build
                lasting positive changes in your life.
              </Typography>
            </Box>
            <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Typography variant="body2" color="grey.400">
                © 2025 Streak Tracker. All rights reserved.
              </Typography>
              <Typography variant="body2" color="grey.400" sx={{ mt: 1 }}>
                Made with ❤️ for habit builders worldwide
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
