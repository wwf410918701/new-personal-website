import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect } from "react";
import RootStore from "../mobx/rootStore";
import { useRouter } from "next/router";
import { GoogleAnalytics } from "nextjs-google-analytics";

export const RootStoreContext = createContext<RootStore>(new RootStore());

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <GoogleAnalytics trackPageViews gaMeasurementId={"G-9QRV1GTH53"} />
      <Component {...pageProps} />
    </RootStoreContext.Provider>
  );
}
