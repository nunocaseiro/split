import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { setHeaderToken } from "../../utils/fetchData";
import { AUTH_ROUTE } from "../../utils/routes";

function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);
    if (!session) {
      return {
        redirect: {
          destination: AUTH_ROUTE,
          permanent: false,
        },
      };
    }
    setHeaderToken(session.accessToken);
    return gssp(ctx);
  };
}

export default requireAuthentication;
