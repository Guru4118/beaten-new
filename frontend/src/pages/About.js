import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  Star as StarIcon,
  LocalShipping as ShippingIcon,
  Style as StyleIcon,
  Diamond as DiamondIcon,
  EmojiEvents as TrophyIcon,
  Favorite as HeartIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material";

const About = ({ mode }) => {
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

  const features = [
    {
      icon: <DiamondIcon sx={{ fontSize: 40, color: matteColors[900] }} />,
      title: "Premium Quality",
      description:
        "We use carefully selected high-quality fabrics that ensure ultimate comfort and long-lasting wear.",
    },
    {
      icon: <StyleIcon sx={{ fontSize: 40, color: matteColors[900] }} />,
      title: "Timeless Designs",
      description:
        "Our designs are a blend of global fashion trends and timeless elegance, ensuring you stay ahead in style.",
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 40, color: matteColors[900] }} />,
      title: "Affordable Luxury",
      description:
        "We believe that premium fashion should be accessible. Our pricing structure is designed to give you the look and feel of luxury without breaking the bank.",
    },
    {
      icon: <ShippingIcon sx={{ fontSize: 40, color: matteColors[900] }} />,
      title: "Versatility",
      description:
        "Whether it's casual wear, semi-formal, or statement pieces, our collection is tailored to fit every occasion with grace and trend.",
    },
  ];

  const values = [
    {
      icon: <HeartIcon sx={{ fontSize: 40, color: matteColors[900] }} />,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We go above and beyond to ensure an exceptional shopping experience.",
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 40, color: matteColors[900] }} />,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect, from design to delivery, setting new standards in the fashion industry.",
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: matteColors[900] }} />,
      title: "Innovation",
      description:
        "We continuously innovate and evolve, bringing fresh perspectives and cutting-edge designs to our collections.",
    },
  ];

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
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: mode === "dark" ? "#fff" : matteColors[900],
              fontSize: { xs: "1.3rem", md: "2.2rem" },
              mb: 1.2,
            }}
          >
            About BEATEN
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              maxWidth: { xs: "90%", md: "700px" },
              mx: "auto",
              fontWeight: 400,
              lineHeight: 1.5,
              color: mode === "dark" ? "#fff" : matteColors[700],
              fontSize: { xs: "0.98rem", md: "1.15rem" },
            }}
          >
            Beyond Expectations. Always Trendsetting. Elevate Your Look Now.
          </Typography>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 3, md: 6 },
          }}
        >
          {/* Introduction */}
          <Paper
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 4,
              background:
                mode === "dark"
                  ? "#232323"
                  : "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              mb: 1,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #1a1a1a 0%, #404040 100%)",
              },
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: mode === "dark" ? "#fff" : matteColors[900],
                    fontSize: { xs: "1.2rem", md: "1.6rem" },
                    mb: 2,
                  }}
                >
                  About Beaten
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    lineHeight: 1.8,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    color: mode === "dark" ? "#fff" : matteColors[700],
                    mb: 3,
                  }}
                >
                  Founded by two brothers with a shared passion for fashion and
                  an unwavering vision, Beaten was born to create a unique space
                  in the fashion industry. Our collection captures the essence
                  of modern luxury, inspired by global trends and refined
                  aesthetics. We aim to deliver standout designs with a premium
                  yet affordable approach.
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: mode === "dark" ? "#fff" : matteColors[900],
                    mt: 3,
                    mb: 2,
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                  }}
                >
                  Our Story
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    lineHeight: 1.8,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    color: mode === "dark" ? "#fff" : matteColors[700],
                  }}
                >
                  Founded by two brothers with a shared passion for fashion and
                  an unwavering vision, Beaten was born to create a unique space
                  in the fashion industry. Our collection captures the essence
                  of modern luxury, inspired by global trends and refined
                  aesthetics. We aim to deliver standout designs with a premium
                  yet affordable approach.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "300px", md: "500px" },
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(45deg, rgba(26,26,26,0.2) 0%, rgba(26,26,26,0) 100%)",
                      zIndex: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Beaten Fashion"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Features Grid */}
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: mode === "dark" ? "#fff" : matteColors[900],
                mb: 2,
                textAlign: "center",
                fontSize: { xs: "1.08rem", md: "1.5rem" },
              }}
            >
              What Sets Us Apart
            </Typography>
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper
                    sx={{
                      p: { xs: 2, md: 4 },
                      borderRadius: 3,
                      background:
                        mode === "dark"
                          ? "#232323"
                          : "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      height: "100%",
                    }}
                  >
                    <Box sx={{ mb: 0, mr: 1 }}>
                      {React.cloneElement(feature.icon, {
                        fontSize: "medium",
                        sx: {
                          color: mode === "dark" ? "#fff" : matteColors[900],
                          fontSize: { xs: 28, md: 40 },
                        },
                      })}
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: mode === "dark" ? "#fff" : matteColors[900],
                          fontSize: { xs: "1rem", md: "1.15rem" },
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.5,
                          color: mode === "dark" ? "#fff" : matteColors[700],
                          fontSize: { xs: "0.95rem", md: "1.05rem" },
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Values Section */}
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: mode === "dark" ? "#fff" : matteColors[900],
                mb: 2,
                textAlign: "center",
                fontSize: { xs: "1.08rem", md: "1.5rem" },
              }}
            >
              Our Core Values
            </Typography>
            <Grid container spacing={3}>
              {values.map((value, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    sx={{
                      p: { xs: 2, md: 4 },
                      borderRadius: 3,
                      background:
                        mode === "dark"
                          ? "#232323"
                          : "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      height: "100%",
                    }}
                  >
                    <Box sx={{ mb: 0, mr: 1 }}>
                      {React.cloneElement(value.icon, {
                        fontSize: "medium",
                        sx: {
                          color: mode === "dark" ? "#fff" : matteColors[900],
                          fontSize: { xs: 28, md: 40 },
                        },
                      })}
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: mode === "dark" ? "#fff" : matteColors[900],
                          fontSize: { xs: "1rem", md: "1.15rem" },
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.5,
                          color: mode === "dark" ? "#fff" : matteColors[700],
                          fontSize: { xs: "0.95rem", md: "1.05rem" },
                        }}
                      >
                        {value.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Vision Section */}
          <Paper
            sx={{
              p: { xs: 2, md: 6 },
              borderRadius: 3,
              background:
                mode === "dark"
                  ? "#232323"
                  : "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: mode === "dark" ? "#fff" : matteColors[900],
                fontSize: { xs: "1.08rem", md: "1.5rem" },
                mb: 1.2,
              }}
            >
              <AutoAwesomeIcon
                sx={{
                  fontSize: { xs: 28, md: 40 },
                  color: mode === "dark" ? "#fff" : matteColors[900],
                  mr: 3,
                  verticalAlign: "middle",
                }}
              />
              Our Vision
            </Typography>
            <Typography
              variant="body2"
              paragraph
              sx={{
                lineHeight: 1.6,
                fontSize: { xs: "0.97rem", md: "1.1rem" },
                color: mode === "dark" ? "#fff" : matteColors[700],
              }}
            >
              Our long-term vision is to establish Beaten as a powerhouse in
              premium fashion, offering a distinctive style language that sets
              new benchmarks in the industry. We aim to expand our product range
              to include shoes, accessories, fragrances, and lifestyle products
              — creating a one-stop fashion destination.
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.6,
                fontSize: { xs: "0.97rem", md: "1.1rem" },
                color: mode === "dark" ? "#fff" : matteColors[700],
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              "Beaten isn't just fashion. It's a statement of who you are. Join
              the revolution. Elevate your look. Be Beaten."
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
