import { Nunito_Sans } from "next/font/google";
import "@/styles/globals.css";
import ThemeProvider from "@/contexts/ThemeProvider";

const open_Sans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://franco-espinosa-test.vercel.app/"),
  title: "Franco Espinosa - Portfolio",
  description:
    "Mi nombre es Franco Espinosa, soy un desarrollador web de Argentina, Mar del Plata. Aprovecho cada día para expandir mis conocimientos y enfrentar desafíos que pongan a prueba mis habilidades.",
  openGraph: {
    title: "Franco Espinosa - Portfolio",
    description:
      "Mi nombre es Franco Espinosa, soy un desarrollador web de Argentina, Mar del Plata. Aprovecho cada día para expandir mis conocimientos y enfrentar desafíos que pongan a prueba mis habilidades.",
    url: "https://franco-espinosa-test.vercel.app/",
  },
  keywords: [
    "Franco Espinosa",
    "Franco Espinosa Portfolio",
    "Franco Espinosa portfolio",
    "franco espinosa",
    "portfolio franco espinosa",
    "portfolio",
    "portafolio",
    "portafolio franco espinosa",
    "franco espinosa portafolio",
    "Franco Espinosa portafolio",
    "Franco Espinosa frontend",
    "Frontend portfolio",
    "Portafolio frontend",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={open_Sans.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
