import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import { useSession, signOut } from "next-auth/react";
import { QueryErrorResetBoundary } from "react-query";
import { styled } from "../../stitches.config";
import NavBar from "../NavBar/NavBar";
import Flex from "../Primitives/Flex";
import { REFRESH_TOKEN_ERROR } from "../../utils/constants";
import "react-toastify/dist/ReactToastify.css";
import { ShouldRenderNav } from "../../utils/routes";
import Button from "../Primitives/Button";

const Main = styled("main", Flex, { px: "3vw", py: "$50", height: "100%" });

const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession({ required: false });

  useEffect(() => {
    if (session?.error === REFRESH_TOKEN_ERROR) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);

  if (!session && ShouldRenderNav(router.asPath)) return <div>Loading...</div>;

  return (
    <>
      {ShouldRenderNav(router.asPath) && <NavBar />}
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                There was an error!
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
              </div>
            )}
          >
            <Main direction="column">{children}</Main>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <ToastContainer limit={3} />
    </>
  );
};

export default Layout;
