import { Html, Head, Main, NextScript } from "next/document";
import { ThemeProvider } from "next-themes";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
          <Main />
          <NextScript />
      </body>
    </Html>
  );
}
