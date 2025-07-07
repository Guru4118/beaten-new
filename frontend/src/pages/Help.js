import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
  Link,
} from "@mui/material";
import {
  Help as HelpIcon,
  ShoppingBag as OrderIcon,
  AccountCircle as AccountIcon,
  Support as SupportIcon,
  Search as SearchIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

const Help = ({ mode }) => {
  const theme = useTheme();
  const matteColors = {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  };

  const helpSections = [
    {
      icon: <HelpIcon />,
      title: "Frequently Asked Questions",
      description:
        "Browse our FAQs for quick answers about orders, shipping, returns, and more.",
    },
    {
      icon: <OrderIcon />,
      title: "Order Issues",
      description:
        "If you have a problem with your order, please check your order status or contact our support team for assistance.",
    },
    {
      icon: <AccountIcon />,
      title: "Account Help",
      description:
        "Need help with your account? You can reset your password, update your information, or contact us for further support.",
    },
    {
      icon: <SupportIcon />,
      title: "Contact Support",
      description:
        "Still need help? Email us at support@beaten.in and our team will get back to you as soon as possible.",
    },
  ];

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 6,
        bgcolor: mode === "dark" ? "#181818" : "#fff",
        color: mode === "dark" ? "#fff" : "#181818",
        minHeight: "100vh",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: "2rem", md: "2.7rem" },
    
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "3px",
              background: "linear-gradient(90deg, #1a1a1a 0%, #404040 100%)",
              borderRadius: "2px",
              color: mode === "dark" ? "#fff" : "#181818",
            },
          }}
        >
          Help Center
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: mode === "dark" ? "#fff" : "#181818",
            mb: 4,
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Find answers to common questions or get in touch with our support team
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {helpSections.map((section, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: "12px",
                      background: "rgba(26, 26, 26, 0.03)",
                      mr: 2,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {React.cloneElement(section.icon, {
                      sx: {
                        fontSize: 32,
                        color: matteColors[900],
                      },
                    })}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: matteColors[900] }}
                  >
                    {section.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: matteColors[700], lineHeight: 1.8 }}
                >
                  {section.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SearchIcon sx={{ fontSize: 32, color: matteColors[900] }} />
        <Typography
          variant="body1"
          sx={{ color: matteColors[700], lineHeight: 1.8 }}
        >
          Can't find what you're looking for? Use our search feature to quickly
          find answers to your questions.
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <EmailIcon sx={{ fontSize: 32, color: matteColors[900] }} />
        <Typography
          variant="body1"
          sx={{ color: matteColors[700], lineHeight: 1.8 }}
        >
          For urgent matters, you can reach our support team at{" "}
          <Link
            href="mailto:support@beaten.in"
            sx={{
              color: "#C9A14A",
              textDecoration: "none",
              borderBottom: "1px solid #C9A14A",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "#B08C3A",
              },
            }}
          >
            support@beaten.in
          </Link>
          . We typically respond within 24 hours.
        </Typography>
      </Box>
    </Container>
  );
};

export default Help;
