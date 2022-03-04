import React, { useState } from "react";
import { getSession, GetSessionParams } from "next-auth/react";
import { styled } from "../../stitches.config";
import { TabsList, TabsRoot, TabsTrigger } from "../../components/Primitives/Tab";
import Text from "../../components/Primitives/Text";
import Flex from "../../components/Primitives/Flex";
import centerScreen from "../../styles/centerScreen";
import { RedirectServerSideProps, SessionServerSideProps } from "../../types/serverSideProps";
import { DASHBOARD_ROUTE } from "../../utils/routes";
import ValidateEmail from "../../components/auth/ValidateEmail";
import RegisterMiddleware from "../../components/auth/RegisterMiddleware";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

export async function getServerSideProps(
  context: GetSessionParams | undefined
): Promise<RedirectServerSideProps | SessionServerSideProps> {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: DASHBOARD_ROUTE,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const CenteredContainer = styled(Flex, centerScreen);

const Auth: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showValidateEmail, setShowValidateEmail] = useState(true);
  const [showMiddleware, setShowMiddleware] = useState(false);
  const [email, setEmail] = useState("");

  const resetRegisterTab = () => {
    setShowRegister(false);
    setShowValidateEmail(true);
    setShowMiddleware(false);
  };

  return (
    <Flex justify="center">
      <CenteredContainer
        css={{ borderRadius: "$80", p: "$40", width: "500px", flexShrink: "2" }}
        justify="center"
      >
        <TabsRoot defaultValue="login">
          <TabsList aria-label="Login or register" css={{ mb: "$20" }}>
            <TabsTrigger value="login">
              <Text size="20">Login</Text>
            </TabsTrigger>
            <TabsTrigger value="register" onClick={resetRegisterTab}>
              <Text size="20">Register</Text>
            </TabsTrigger>
          </TabsList>
          <LoginForm />
          {showValidateEmail && (
            <ValidateEmail
              setEmail={setEmail}
              setShowValidateEmail={setShowValidateEmail}
              setShowMiddleware={setShowMiddleware}
              setShowRegister={setShowRegister}
            />
          )}

          {showRegister && <RegisterForm email={email} />}
          {showMiddleware && (
            <RegisterMiddleware
              email={email}
              setShowValidateEmail={setShowValidateEmail}
              setShowMiddleware={setShowMiddleware}
              setShowRegister={setShowRegister}
            />
          )}
        </TabsRoot>
      </CenteredContainer>
    </Flex>
  );
};

export default Auth;
