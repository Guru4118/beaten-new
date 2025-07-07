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
  PrivacyTip as PrivacyIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Share as ShareIcon,
  Cookie as CookieIcon,
  Security as SecurityIcon,
  VerifiedUser as RightsIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

const Privacy = ({ mode }) => {
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

  const privacySections = [
    {
      icon: <PrivacyIcon />,
      title: "Introduction",
      description:
        "At BEATEN, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.",
    },
    {
      icon: <PersonIcon />,
      title: "Information We Collect",
      description:
        "We may collect personal information such as your name, email address, shipping address, payment details, and browsing behavior when you use our site or place an order.",
    },
    {
      icon: <SettingsIcon />,
      title: "How We Use Your Information",
      description:
        "Your information is used to process orders, provide customer support, improve our services, send updates and marketing communications, and comply with legal obligations.",
    },
    {
      icon: <ShareIcon />,
      title: "Sharing of Information",
      description:
        "We do not sell your personal information. We may share it with trusted partners for order fulfillment, payment processing, analytics, and legal compliance.",
    },
    {
      icon: <CookieIcon />,
      title: "Cookies & Tracking Technologies",
      description:
        "We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences in your browser settings.",
    },
    {
      icon: <SecurityIcon />,
      title: "Data Security",
      description:
        "We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.",
    },
    {
      icon: <RightsIcon />,
      title: "Your Rights",
      description:
        "You have the right to access, update, or delete your personal information. Contact us to exercise these rights or for any privacy-related questions.",
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
            color: mode === "dark" ? "#fff" : "#181818",
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
            },
          }}
        >
          Privacy Policy
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
          Last updated: June 2024
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {privacySections.map((section, index) => (
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
        <EmailIcon sx={{ fontSize: 32, color: matteColors[900] }} />
        <Typography
          variant="body1"
          sx={{ color: matteColors[700], lineHeight: 1.8 }}
        >
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
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
        </Typography>
      </Box>
    </Container>
  );
};

export default Privacy;
