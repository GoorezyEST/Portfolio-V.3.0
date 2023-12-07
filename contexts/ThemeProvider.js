"use client";

import React from "react";
import { GlobalProvider } from "./GlobalContext";
import LoadingScreen from "./LoadingScreen";

function ThemeProvider({ children }) {
  return (
    <GlobalProvider>
      <LoadingScreen>{children}</LoadingScreen>
    </GlobalProvider>
  );
}

export default ThemeProvider;
