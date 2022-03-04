import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import globalStyles from "../styles/globals";
import "../public/nprogress.css";
import Layout from "../components/Layout/Layout";
import store from "../store/store";
import { JWT_EXPIRATION_TIME } from "../utils/constants";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
          },
        },
      })
  );
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  globalStyles();
  return (
    <>
      <Head>
        <title>Divide & Conquer</title>
      </Head>
      <SessionProvider session={session} refetchInterval={JWT_EXPIRATION_TIME - 5}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Provider store={store}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Provider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default App;
