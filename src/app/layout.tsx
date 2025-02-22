import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const poppins = localFont({
  src: "./fonts/poppins.woff2",
  variable: "--font-poppins",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Xiaomi India | Smartphone | Tablet | TV",
  description:
    "On Xiaomi's official website, you can buy a variety of home electronics with cutting-edge technology, including smartphones, tablets, TVs, and smart devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${poppins.variable} antialiased bg-[#f7f7f7]`}>
        {children}
      </body>
    </html>
  );
}
