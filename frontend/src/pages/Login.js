import React, { useState } from "react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "../context/AuthContext";

const Login = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, sendOTP, verifyOTP } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loginTab, setLoginTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const matteColors = {
    900: "#1a1a1a",
    800: "#2d2d2d",
    700: "#404040",
    600: "#525252",
    100: "#f5f5f5",
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!emailOrPhone) {
      setError("Please enter your email or phone number.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await sendOTP(emailOrPhone);
      setSuccess("OTP sent successfully! Check your email/phone.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await verifyOTP(emailOrPhone, otp);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await login({ emailOrPhone: email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: mode === "dark" ? "#181818" : "#fff",
          color: mode === "dark" ? "#fff" : "inherit",
          minHeight: "100vh",
          width: "100%",
          transition: "background 0.3s, color 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/Beaten/Artboard 3.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 8,
        }}
      >
        <Paper
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 450,
            borderRadius: 4,
            boxShadow: 24,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 900,
              color: "primary.main",
              mb: 2,
              letterSpacing: 2,
            }}
          >
            WELCOME BACK
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{
              mb: 4,
              fontSize: "1.1rem",
            }}
          >
            {step === 1
              ? "Enter your email or phone to continue"
              : "Enter the OTP sent to your device"}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Tabs value={loginTab} onChange={(e, v) => setLoginTab(v)} centered sx={{ mb: 3 }}>
            <Tab label="Email Login" />
            <Tab label="OTP Login" />
          </Tabs>

          {loginTab === 0 && (
            <form onSubmit={handleEmailLogin}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                autoFocus
                InputProps={{
                  startAdornment: <EmailIcon sx={{ color: "action.active", mr: 1 }} />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: <LockIcon sx={{ color: "action.active", mr: 1 }} />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: matteColors[900],
                  color: "white",
                  py: { xs: 0.7, md: 1 },
                  px: { xs: 2, md: 3 },
                  fontSize: { xs: "0.98rem", md: "1.05rem" },
                  borderRadius: 10,
                  minHeight: { xs: 40, md: 48 },
                  fontWeight: 700,
                  textTransform: "none",
                  letterSpacing: 1.2,
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  "&:hover": {
                    backgroundColor: matteColors[800],
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
              <Box sx={{ textAlign: "right", mb: 2 }}>
                <Link component={RouterLink} to="/forgot-password">
                  Forgot password?
                </Link>
              </Box>
            </form>
          )}

          {loginTab === 1 && (
            <form onSubmit={handleSendOtp}>
              <TextField
                fullWidth
                id="emailOrPhone"
                name="emailOrPhone"
                label="Email or Phone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                margin="normal"
                autoFocus
                InputProps={{
                  startAdornment: emailOrPhone.includes("@") ? (
                    <EmailIcon sx={{ color: "action.active", mr: 1 }} />
                  ) : (
                    <PhoneIphoneIcon sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: matteColors[900],
                  color: "white",
                  py: { xs: 0.7, md: 1 },
                  px: { xs: 2, md: 3 },
                  fontSize: { xs: "0.98rem", md: "1.05rem" },
                  borderRadius: 10,
                  minHeight: { xs: 40, md: 48 },
                  fontWeight: 700,
                  textTransform: "none",
                  letterSpacing: 1.2,
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  "&:hover": {
                    backgroundColor: matteColors[800],
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Send OTP"}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp}>
              <TextField
                fullWidth
                id="otp"
                name="otp"
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                margin="normal"
                autoFocus
                inputProps={{ maxLength: 6 }}
                InputProps={{
                  startAdornment: (
                    <LockIcon sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: matteColors[900],
                  color: "white",
                  py: { xs: 0.7, md: 1 },
                  px: { xs: 2, md: 3 },
                  fontSize: { xs: "0.98rem", md: "1.05rem" },
                  borderRadius: 10,
                  minHeight: { xs: 40, md: 48 },
                  fontWeight: 700,
                  textTransform: "none",
                  letterSpacing: 1.2,
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  "&:hover": {
                    backgroundColor: matteColors[800],
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Verify & Login"}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setStep(1)}
                sx={{
                  mb: 2,
                  borderColor: matteColors[900],
                  color: matteColors[900],
                  backgroundColor: "white",
                  py: { xs: 0.7, md: 1 },
                  px: { xs: 2, md: 3 },
                  fontSize: { xs: "0.98rem", md: "1.05rem" },
                  borderRadius: 10,
                  minHeight: { xs: 40, md: 48 },
                  fontWeight: 600,
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  "&:hover": {
                    backgroundColor: matteColors[100],
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                  },
                }}
              >
                Change Email/Phone
              </Button>
            </form>
          )}

          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register">
              Register here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
