import React, { useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";
import LandingPage from "./components/LandingPage";
import { createAppTheme } from "./utils/theme";

const Router: React.FC = () => {
  // Check if we should show landing page
  const shouldShowLanding =
    window.location.pathname === "/landing" ||
    (window.location.pathname === "/" &&
      window.location.search.includes("landing"));

  // Add body class for landing page
  useEffect(() => {
    if (shouldShowLanding) {
      document.body.classList.add("landing-page");
      // Remove the class when component unmounts
      return () => {
        document.body.classList.remove("landing-page");
      };
    } else {
      document.body.classList.add("app-page");
      return () => {
        document.body.classList.remove("app-page");
      };
    }
  }, [shouldShowLanding]);

  if (shouldShowLanding) {
    return (
      <ThemeProvider theme={createAppTheme("light", "purple")}>
        <CssBaseline />
        <LandingPage />
      </ThemeProvider>
    );
  }

  return <App />;
};

export default Router;
