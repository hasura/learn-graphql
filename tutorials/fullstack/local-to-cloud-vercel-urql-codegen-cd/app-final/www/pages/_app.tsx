import "../styles/globals.css";
import type { AppProps } from "next/app";
import withUrql from "../utils/client";
import Header from "../components/Header";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="cupcake">
      <div className="container mx-auto max-w-5xl">
        <Header />
        <div className="mx-6">
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default withUrql(MyApp);
