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
  Gavel as GavelIcon,
  CheckCircle as AcceptIcon,
  ShoppingCart as PurchaseIcon,
  AccountCircle as AccountIcon,
  Copyright as CopyrightIcon,
  Block as ProhibitedIcon,
  Warning as LiabilityIcon,
  Update as UpdateIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

const Terms = ({ mode }) => {
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

  const termsSections = [
    {
      icon: <GavelIcon />,
      title: "Introduction",
      description:
        "Welcome to BEATEN. These Terms of Service govern your use of our website and services. By accessing or using our site, you agree to these terms.",
    },
    {
      icon: <AcceptIcon />,
      title: "Acceptance of Terms",
      description:
        "By using our website, you confirm that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.",
    },
    {
      icon: <PurchaseIcon />,
      title: "Purchases",
      description:
        "All purchases made through our website are subject to product availability and our acceptance. We reserve the right to refuse or cancel any order at our discretion.",
    },
    {
      icon: <AccountIcon />,
      title: "User Accounts",
      description:
        "You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
    },
    {
      icon: <CopyrightIcon />,
      title: "Intellectual Property",
      description:
        "All content on this site, including text, images, logos, and designs, is the property of BEATEN or its licensors and is protected by copyright and trademark laws.",
    },
    {
      icon: <ProhibitedIcon />,
      title: "Prohibited Activities",
      description:
        "You agree not to use the site for any unlawful purpose or in any way that could harm BEATEN or its users. Prohibited activities include, but are not limited to, hacking, spamming, and infringing on intellectual property rights.",
    },
    {
      icon: <LiabilityIcon />,
      title: "Limitation of Liability",
      description:
        "BEATEN is not liable for any indirect, incidental, or consequential damages arising from your use of the site or products purchased through the site.",
    },
    {
      icon: <UpdateIcon />,
      title: "Changes to Terms",
      description:
        "We may update these Terms of Service from time to time. Any changes will be posted on this page with an updated effective date.",
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
          Terms of Service
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
        {termsSections.map((section, index) => (
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
          If you have any questions about these Terms of Service, please contact
          us at{" "}
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

export default Terms;
