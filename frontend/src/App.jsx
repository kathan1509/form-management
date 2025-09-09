import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./components/Login";
// Import MUI Theme utilities
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Import your custom theme
import theme from "./theme";

function App() {
   return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* MUI baseline styles (reset & consistency) */}
	  <Login />
    </ThemeProvider>
  );
}

export default App
