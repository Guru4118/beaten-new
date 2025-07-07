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
  LocalShipping as ShippingIcon,
  AccessTime as TimeIcon,
  Payment as PaymentIcon,
  Public as GlobalIcon,
  LocalPostOffice as PostIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";

const Shipping = ({ mode }) => {
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

  const shippingInfo = [
    {
      icon: <ShippingIcon />,
      title: "Shipping Methods",
      description:
        "We offer standard and express shipping options. All orders are shipped via trusted carriers to ensure safe and timely delivery.",
    },
    {
      icon: <TimeIcon />,
      title: "Delivery Times",
      description:
        "Orders are typically processed within 1-2 business days. Delivery times vary by location: 3-7 business days for domestic orders, and 7-14 business days for international orders.",
    },
    {
      icon: <PaymentIcon />,
      title: "Shipping Costs",
      description:
        "Shipping costs are calculated at checkout based on your location and selected shipping method. Free shipping is available on orders over a certain amount.",
    },
    {
      icon: <GlobalIcon />,
      title: "International Shipping",
      description:
        "We ship internationally to many countries. Please note that customs fees and import duties may apply and are the responsibility of the recipient.",
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
          Shipping Information
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
          Learn about our shipping methods, delivery times, and costs
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {shippingInfo.map((info, index) => (
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
                    {React.cloneElement(info.icon, {
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
                    {info.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: matteColors[700], lineHeight: 1.8 }}
                >
                  {info.description}
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
        <PostIcon sx={{ fontSize: 32, color: matteColors[900] }} />
        <Typography
          variant="body1"
          sx={{ color: matteColors[700], lineHeight: 1.8 }}
        >
          All orders are carefully packaged to ensure your items arrive in
          perfect condition. We use eco-friendly packaging materials whenever
          possible.
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
        <SecurityIcon sx={{ fontSize: 32, color: matteColors[900] }} />
        <Typography
          variant="body1"
          sx={{ color: matteColors[700], lineHeight: 1.8 }}
        >
          We provide tracking information for all orders. You can track your
          package's journey from our warehouse to your doorstep through our
          website or mobile app.
        </Typography>
      </Box>
    </Container>
  );
};

export default Shipping;
