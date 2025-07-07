import React from "react";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Straighten as MeasureIcon,
  AccessTime as TimeIcon,
  Info as InfoIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

const SizeGuide = ({ mode }) => {
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
          Size Guide
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
          Find your perfect fit with our comprehensive measurement guide and
          size charts
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
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
                <MeasureIcon
                  sx={{ fontSize: 32, color: matteColors[900], mr: 2 }}
                />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: matteColors[900] }}
                >
                  How to Measure
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ color: matteColors[700], lineHeight: 1.8 }}
              >
                Use a measuring tape to measure your chest, waist, and hips.
                Compare your measurements to our size charts below for the best
                fit.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
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
                <InfoIcon
                  sx={{ fontSize: 32, color: matteColors[900], mr: 2 }}
                />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: matteColors[900] }}
                >
                  Fit Tips
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ color: matteColors[700], lineHeight: 1.8 }}
              >
                If you are between sizes, we recommend sizing up for a more
                relaxed fit. For further assistance, contact our support team.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <MaleIcon sx={{ fontSize: 32, color: matteColors[900], mr: 2 }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: matteColors[900] }}
          >
            Men's Size Chart
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    "linear-gradient(90deg, #1a1a1a 0%, #404040 100%)",
                }}
              >
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Size
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Chest (in)
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Waist (in)
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Hip (in)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { size: "S", chest: "36-38", waist: "29-31", hip: "35-37" },
                { size: "M", chest: "39-41", waist: "32-34", hip: "38-40" },
                { size: "L", chest: "42-44", waist: "35-37", hip: "41-43" },
                { size: "XL", chest: "45-47", waist: "38-40", hip: "44-46" },
              ].map((row) => (
                <TableRow
                  key={row.size}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: matteColors[50] },
                    "&:hover": { backgroundColor: matteColors[100] },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{row.size}</TableCell>
                  <TableCell>{row.chest}</TableCell>
                  <TableCell>{row.waist}</TableCell>
                  <TableCell>{row.hip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mt: 6, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <FemaleIcon sx={{ fontSize: 32, color: matteColors[900], mr: 2 }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: matteColors[900] }}
          >
            Women's Size Chart
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    "linear-gradient(90deg, #1a1a1a 0%, #404040 100%)",
                }}
              >
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Size
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Bust (in)
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Waist (in)
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Hip (in)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { size: "S", bust: "33-35", waist: "26-28", hip: "36-38" },
                { size: "M", bust: "36-38", waist: "29-31", hip: "39-41" },
                { size: "L", bust: "39-41", waist: "32-34", hip: "42-44" },
                { size: "XL", bust: "42-44", waist: "35-37", hip: "45-47" },
              ].map((row) => (
                <TableRow
                  key={row.size}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: matteColors[50] },
                    "&:hover": { backgroundColor: matteColors[100] },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{row.size}</TableCell>
                  <TableCell>{row.bust}</TableCell>
                  <TableCell>{row.waist}</TableCell>
                  <TableCell>{row.hip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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
        <TrendingUpIcon sx={{ fontSize: 32, color: matteColors[900] }} />
        <Typography
          variant="body1"
          sx={{ color: matteColors[700], lineHeight: 1.8 }}
        >
          For the most accurate fit, we recommend measuring yourself while
          wearing lightweight clothing. If you need any assistance, our customer
          service team is here to help!
        </Typography>
      </Box>
    </Container>
  );
};

export default SizeGuide;
