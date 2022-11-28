import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext } from "react";
import RootStore from "../mobx/rootStore";

export const RootStoreContext = createContext<RootStore>(new RootStore());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <Component {...pageProps} />
    </RootStoreContext.Provider>
  );
}
