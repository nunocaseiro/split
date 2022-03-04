import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import router from "next/router";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { RedirectableProviderType } from "next-auth/providers";
import { styled } from "../../stitches.config";
import msIcon from "../../public/ms.png";
import { LoginUser } from "../../types/user";
import Flex from "../Primitives/Flex";
import { TabsContent } from "../Primitives/Tab";
import Text from "../Primitives/Text";
import Button from "../Primitives/Button";
import ErrorMessages from "../../errors/errorMessages";
import { NEXT_PUBLIC_ENABLE_AZURE } from "../../utils/constants";
import SchemaLoginForm from "../../schema/schemaLoginForm";
import { DASHBOARD_ROUTE } from "../../utils/routes";
import useUser from "../../hooks/useUser";
import Input from "../Primitives/Input";
import isEmpty from "../../utils/isEmpty";

const StyledForm = styled("form", Flex, { width: "100%", justifyItems: "center" });

const LoginForm: React.FC = () => {
  const [loginError, setLoginError] = useState(false);
  const methods = useForm<LoginUser>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(SchemaLoginForm),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  console.log("OLAAAAAA");

  const { loginAzure } = useUser();

  const onLogin = async (credentials: LoginUser) => {
    try {
      const result = await signIn<RedirectableProviderType>("credentials", {
        ...credentials,
        callbackUrl: DASHBOARD_ROUTE,
        redirect: false,
      });
      if (!result?.error) {
        router.push(DASHBOARD_ROUTE);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <TabsContent value="login" css={{ justifyContent: "center" }}>
      <FormProvider {...methods}>
        <StyledForm
          direction="column"
          onSubmit={handleSubmit((credentials: LoginUser) => {
            onLogin(credentials);
          })}
        >
          <Flex>
            {loginError ? (
              <Text
                color="red"
                css={{
                  backgroundColor: "$red5",
                  fontWeight: "bold",
                  p: "$16",
                  width: "100%",
                }}
              >
                {ErrorMessages.INVALID_CREDENTIALS}
              </Text>
            ) : null}
          </Flex>
          <Input id="email" type="text" placeholder="Email" />
          <Input id="password" type="password" placeholder="Password" />
          {NEXT_PUBLIC_ENABLE_AZURE && (
            <Button
              type="button"
              state="primary"
              isIcon="true"
              size="sm"
              css={{ margin: "0 auto", width: "fit-content", justifySelf: "center" }}
              onClick={loginAzure}
            >
              <Image src={msIcon} width="100%" height="100%" />
            </Button>
          )}
          <Button
            color="green"
            size="md"
            state="primary"
            css={{ mt: "$8", width: "100%" }}
            type="submit"
          >
            Login
          </Button>
        </StyledForm>
      </FormProvider>
    </TabsContent>
  );
};

export default LoginForm;
