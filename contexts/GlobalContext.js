import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [isHydrated, setIsHydrated] = useState(true);
  const [smallDevice, setSmallDevice] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(max-width: 700px)");

    // Set the initial value
    setSmallDevice(mediaQueryList.matches);
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        isHydrated,
        setIsHydrated,
        smallDevice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used with a settings provider");
  }
  return context;
}
