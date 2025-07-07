import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Card,
  CardContent,
  CardActions,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  ExpandMore as ExpandMoreIcon,
  WorkspacePremium as PremiumIcon,
  Discount as DiscountIcon,
  PriorityHigh as PriorityIcon,
  HeadsetMic as HeadsetIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/format";
import axios from "axios";

const Premium = ({ mode }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Define matte black colors
  const matteColors = {
    900: "#1a1a1a", // Deepest matte black
    800: "#2d2d2d", // Rich matte black
    700: "#404040", // Medium matte black
    600: "#525252", // Light matte black
    100: "#f5f5f5", // Off-white
  };

  // Sophisticated gold colors
  const goldColors = {
    primary: "#D4AF37", // Classic gold
    light: "#F4E4BC", // Light gold
    dark: "#B8860B", // Dark gold
    gradient: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
    hover: "linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)",
  };

  const benefits = [
    {
      icon: <DiscountIcon sx={{ color: goldColors.primary, fontSize: 24 }} />,
      text: "₹249 off on every order",
    },
    {
      icon: <PriorityIcon sx={{ color: goldColors.primary, fontSize: 24 }} />,
      text: "Early access to new drops",
    },
    {
      icon: <ShippingIcon sx={{ color: goldColors.primary, fontSize: 24 }} />,
      text: "Priority shipping",
    },
    {
      icon: <HeadsetIcon sx={{ color: goldColors.primary, fontSize: 24 }} />,
      text: "Premium support",
    },
  ];

  const faqs = [
    {
      question: "How does the ₹249 discount work?",
      answer:
        "As a Premium member, you automatically get ₹249 off on every order you place. The discount is applied at checkout, and there's no minimum order value required. This discount can be combined with other ongoing promotions and offers.",
    },
    {
      question: "What is early access to new drops?",
      answer:
        "Premium members get exclusive 24-hour early access to all new product launches and collections. This means you can shop new items before they're available to regular customers, ensuring you get first pick of limited edition items and popular sizes.",
    },
    {
      question: "How does priority shipping work?",
      answer:
        "Premium members enjoy faster shipping on all orders. Your orders are processed and shipped within 24 hours, and you'll receive tracking information as soon as your package is dispatched. This applies to all shipping methods, including standard delivery.",
    },
    {
      question: "What is premium support?",
      answer:
        "Premium members have access to our dedicated support team through multiple channels including email, phone, and live chat. Our support team is available 24/7 to assist with any queries, order tracking, returns, or product information. You'll also get priority response times.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your Premium subscription at any time. Your premium benefits will continue until the end of your current billing period. To cancel, simply go to your account settings and select the cancellation option. There are no cancellation fees.",
    },
    {
      question: "Is the subscription auto-renewing?",
      answer:
        "Yes, the Premium subscription automatically renews at the end of each year. You'll receive a notification before the renewal date. You can choose to cancel the auto-renewal at any time through your account settings.",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "Yes, we offer a 30-day satisfaction guarantee for Premium subscriptions. If you're not completely satisfied with the benefits, you can request a full refund within 30 days of your subscription start date. Contact our support team to process your refund.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No, there are no hidden fees. The ₹249 yearly subscription fee is the only charge you'll pay. All premium benefits, including the ₹249 discount on orders, priority shipping, and premium support, are included at no additional cost.",
    },
  ];

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/premium/subscribe", {
        plan: "year",
      });

      // Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: "INR",
        name: "BEATEN Premium",
        description: "Yearly Premium Membership",
        order_id: response.data.orderId,
        handler: async (response) => {
          try {
            await axios.post("/api/premium/verify", {
              orderId: response.data.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            setSuccess("Premium membership activated successfully!");
          } catch (err) {
            setError("Failed to verify payment");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        theme: {
          color: "#1976d2",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError("Failed to initiate subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: mode === "dark" ? "#181818" : "#fff",
        color: mode === "dark" ? "#fff" : "inherit",
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 3, md: 8 },
            position: "relative",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: mode === "dark" ? "#fff" : matteColors[900],
              fontSize: { xs: "1.3rem", sm: "1.6rem", md: "2rem" },
              mb: 1,
              letterSpacing: "0.04em",
              textAlign: "center",
            }}
          >
            BEATEN CLUB
          </Typography>
          <PremiumIcon
            sx={{
              fontSize: 32,
              color: goldColors.primary,
              mb: 1,
              opacity: 0.95,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: mode === "dark" ? "#fff" : matteColors[700],
              fontWeight: 400,
              mb: 2,
              fontSize: { xs: "0.98rem", md: "1.08rem" },
            }}
          >
            Elevate your shopping experience with exclusive benefits and club
            features
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Benefits Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: { xs: 2, md: 4 },
                height: "100%",
                borderRadius: "16px",
                background:
                  mode === "dark"
                    ? "#232323"
                    : "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
                color: mode === "dark" ? "#fff" : matteColors[900],
                boxShadow: `0 8px 24px ${goldColors.light}40`,
                border: `1.5px solid ${goldColors.primary}`,
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: mode === "dark" ? "#fff" : matteColors[900],
                  mb: { xs: 1.2, md: 2 },
                  fontSize: { xs: "1.05rem", md: "1.3rem" },
                }}
              >
                Club Benefits
              </Typography>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      py: 1.2,
                      px: 0,
                      "&:not(:last-child)": {
                        borderBottom: "1px solid rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {benefit.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={benefit.text}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        color: mode === "dark" ? "#fff" : matteColors[900],
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: mode === "dark" ? "#fff" : matteColors[900],
                    fontSize: { xs: "0.98rem", md: "1.08rem" },
                  }}
                >
                  Why Choose BEATEN CLUB?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.6,
                    fontSize: { xs: "0.92rem", md: "1.02rem" },
                    color: mode === "dark" ? "#fff" : matteColors[700],
                  }}
                >
                  Get exclusive access to new collections, priority shipping,
                  and premium support. Save on every order and enjoy a superior
                  shopping experience with our club membership.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Plan Section */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                background:
                  mode === "dark"
                    ? "#232323"
                    : "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
                color: mode === "dark" ? "#fff" : matteColors[900],
                boxShadow: `0 8px 24px ${goldColors.light}40`,
                borderRadius: "16px",
                overflow: "hidden",
                p: { xs: 0, md: 0 },
                mb: { xs: 2, md: 0 },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: { xs: "120px", md: "200px" },
                  height: { xs: "120px", md: "200px" },
                  background: goldColors.gradient,
                  opacity: 0.13,
                  borderRadius: { xs: "0 0 0 120px", md: "0 0 0 200px" },
                }}
              />
              <Chip
                label="Best Value"
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  fontWeight: 600,
                  fontSize: { xs: "0.8rem", md: "0.9rem" },
                  padding: { xs: "4px 10px", md: "8px 16px" },
                  borderRadius: "20px",
                  boxShadow: `0 2px 8px ${goldColors.light}40`,
                  background: goldColors.gradient,
                  color: "#fff",
                  border: `1.5px solid ${goldColors.primary}`,
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: mode === "dark" ? "#fff" : matteColors[900],
                    mb: { xs: 1.2, md: 2 },
                    fontSize: { xs: "1.05rem", md: "1.3rem" },
                    mt: { xs: 5, md: 0 },
                  }}
                >
                  BEATEN CLUB Yearly Plan
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      mb: 0.5,
                      display: "flex",
                      alignItems: "baseline",
                      color: mode === "dark" ? "#fff" : matteColors[900],
                      fontSize: { xs: "1.5rem", md: "2rem" },
                    }}
                  >
                    ₹249
                    <Typography
                      variant="body2"
                      sx={{
                        ml: 1,
                        fontWeight: 400,
                        color: mode === "dark" ? "#fff" : matteColors[700],
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                      }}
                    >
                      /year
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: mode === "dark" ? "#fff" : matteColors[700],
                      fontSize: { xs: "0.92rem", md: "1.02rem" },
                    }}
                  >
                    Save big with our annual plan
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <List sx={{ py: 0 }}>
                  {benefits.map((benefit, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 1.1,
                        px: 0,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {benefit.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={benefit.text}
                        primaryTypographyProps={{
                          fontWeight: 500,
                          color: mode === "dark" ? "#fff" : matteColors[900],
                          fontSize: { xs: "0.95rem", md: "1.05rem" },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ p: 4, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleSubscribe}
                  disabled={loading}
                  sx={{
                    py: isMobile ? 1.2 : 1,
                    px: isMobile ? 3 : 4,
                    borderRadius: 10,
                    fontSize: { xs: "1.04rem", md: "0.9rem" },
                    fontWeight: 700,
                    textTransform: "none",
                    background: goldColors.gradient,
                    color: "#fff",
                    boxShadow: `0 4px 12px ${goldColors.light}40`,
                    border: `1.5px solid ${goldColors.primary}`,
                    width: "auto",
                    minWidth: 0,
                    alignSelf: "center",
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: goldColors.hover,
                      boxShadow: `0 6px 16px ${goldColors.light}60`,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {loading ? "Processing..." : "Subscribe Now"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* Success/Error Alerts */}
        {(success || error) && (
          <Box sx={{ mt: 4 }}>
            {success && (
              <Alert
                severity="success"
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                {success}
              </Alert>
            )}
            {error && (
              <Alert
                severity="error"
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                {error}
              </Alert>
            )}
          </Box>
        )}

        {/* FAQ Section */}
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              color: mode === "dark" ? "#fff" : matteColors[900],
              mb: 1.2,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="body2"
            align="center"
            paragraph
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 3,
              color: mode === "dark" ? "#fff" : matteColors[700],
              fontSize: { xs: "0.95rem", md: "1.05rem" },
            }}
          >
            Everything you need to know about BEATEN CLUB
          </Typography>
          <Grid container spacing={2}>
            {faqs.map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Accordion
                  sx={{
                    mb: 2,
                    borderRadius: "12px !important",
                    background: "#fff",
                    color: "#181818",
                    "& .MuiAccordionSummary-root": {
                      background: "#fff",
                      color: "#181818",
                    },
                    "& .MuiAccordionDetails-root": {
                      background: "#fff",
                      color: "#181818",
                    },
                    "&:before": {
                      display: "none",
                    },
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: goldColors.primary }} />
                    }
                    sx={{
                      backgroundColor: "#fff",
                      color: "#181818",
                      minHeight: "56px",
                      borderRadius: "12px",
                      fontSize: { xs: "0.98rem", md: "1.08rem" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#181818",
                        fontSize: { xs: "0.98rem", md: "1.08rem" },
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ background: "#fff", color: "#181818" }}
                  >
                    <Typography
                      sx={{
                        lineHeight: 1.6,
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                        color: "#181818",
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Premium;
