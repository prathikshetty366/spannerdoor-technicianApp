import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../app/store";
import "../public/styles/root.scss";
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";
// import Layout from "@/components/Dashboard/Layout";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Technician tool</title>
        </Head>
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
