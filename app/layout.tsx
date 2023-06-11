// import Nav from "./components/shared/Nav";
import localFont from "next/font/local";
import Experience, { CanvasWrapper } from "./components/Three/Experience";
import { ManagedUIContext } from "./Context/store";
import "./globals.css";

const eduFavorit = localFont({
  src: [
    {
      path: "../public/fonts/EduFavorit/EduFavorit-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/EduFavorit/EduFavorit-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/EduFavorit/EduFavorit-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/EduFavorit/EduFavorit-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-eduFavorit",
});

export const metadata = {
  title: "Jason Thompson | Creative Tech",
  description:
    "developer and designer focusing on future-oriented web experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${eduFavorit.className}`}>
        <ManagedUIContext>
          <CanvasWrapper>{/* <Experience /> */}</CanvasWrapper>
          {children}
        </ManagedUIContext>
      </body>
    </html>
  );
}
