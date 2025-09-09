import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormHelperText,
  Link,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Validation functions
  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(value)) return "Enter a valid email address";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      console.log("Form Submitted:", { email, password });
    }
  };

  // Input changes
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  // On blur validation
  const handleEmailBlur = () => setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  const handlePasswordBlur = () =>
    setErrors((prev) => ({ ...prev, password: validatePassword(password) }));

  // Toggle password visibility
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleResetPassword = () => {
    alert("Redirect to reset password page");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
      <Paper
        elevation={4}
        sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 2, boxSizing: "border-box" }}
      >
        {/* Logo + University */}
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
          <img src="/logo.png" alt="CanSTEM Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
            CanSTEM University
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ fontWeight: "bold", color: "text.primary", mb: 3 }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2} direction="column" alignItems="center">
            {/* Email */}
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Box sx={{ width: 100, textAlign: "right", pr: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: "text.secondary" }}>
                  Email:
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  size="small"
                  error={Boolean(errors.email)}
                />
                {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
              </Box>
            </Grid>

            {/* Password */}
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Box sx={{ width: 100, textAlign: "right", pr: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: "text.secondary" }}>
                  Password:
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  size="small"
                  error={Boolean(errors.password)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowPassword} edge="end" size="small">
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
              </Box>
            </Grid>

            {/* Login + Forgot */}
            <Grid item xs={12} sx={{ mt: 2, width: "100%" }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Button type="submit" variant="contained" color="primary" sx={{ width: 150 }}>
                  Login
                </Button>
                <Box mt={1}>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleResetPassword}
                    sx={{ textDecoration: "none", color: "primary.main" }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
