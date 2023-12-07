import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [isHydrated, setIsHydrated] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        isHydrated,
        setIsHydrated,
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
