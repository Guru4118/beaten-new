import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import {
  AssignmentReturn as ReturnIcon,
  SwapHoriz as ExchangeIcon,
  Payment as PaymentIcon,
  Support as SupportIcon,
  LocalShipping as ShippingIcon,
  VerifiedUser as VerifiedIcon,
} from "@mui/icons-material";

const Returns = ({ mode }) => {
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

  const returnSteps = [
    {
      icon: <ReturnIcon />,
      title: "Return Policy",
      description:
        "We accept returns within 14 days of delivery. Items must be unworn, unwashed, and in their original condition with tags attached.",
    },
    {
      icon: <SupportIcon />,
      title: "How to Initiate a Return",
      description:
        "To start a return, contact our support team with your order number and reason for return. We will provide instructions and a return shipping label if eligible.",
    },
    {
      icon: <ExchangeIcon />,
      title: "Exchanges",
      description:
        "If you need a different size or color, please indicate this when initiating your return. We will process an exchange if the item is available.",
    },
    {
      icon: <PaymentIcon />,
      title: "Refunds",
      description:
        "Refunds are processed to your original payment method within 5-7 business days after we receive and inspect your return.",
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
            color: matteColors[900],
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
          Returns & Exchanges
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: matteColors[700],
            mb: 4,
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Learn about our return policy, how to initiate a return, and our
          refund process
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {returnSteps.map((step, index) => (
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
                    {React.cloneElement(step.icon, {
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
                    {step.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: matteColors[700], lineHeight: 1.8 }}
                >
                  {step.description}
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
        <VerifiedIcon sx={{ fontSize: 32, color: matteColors[900] }} />
        <Typography
          variant="body1"
          sx={{ color: matteColors[700], lineHeight: 1.8 }}
        >
          We strive to make the return process as smooth as possible. If you
          have any questions or need assistance, our customer service team is
          here to help!
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
        <ShippingIcon sx={{ fontSize: 32, color: matteColors[900] }} />
        <Typography
          variant="body1"
          sx={{ color: matteColors[700], lineHeight: 1.8 }}
        >
          For international returns, please note that shipping costs may vary.
          Contact our support team for specific shipping instructions and costs.
        </Typography>
      </Box>
    </Container>
  );
};

export default Returns;
