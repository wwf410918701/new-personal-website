import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect } from "react";
import RootStore from "../mobx/rootStore";
import { useRouter } from "next/router";
import ReactGA from "react-ga";

ReactGA.initialize("G-9QRV1GTH53");

export const RootStoreContext = createContext<RootStore>(new RootStore());

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  useEffect(() => {
    ReactGA.pageview(asPath);
  }, [asPath]);

  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <Component {...pageProps} />
    </RootStoreContext.Provider>
  );
}
