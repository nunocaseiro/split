import nProgress from "nprogress";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import SchemaEmailForm from "../../schema/schamaEmailForm";
import Text from "../Primitives/Text";
import { EmailUser } from "../../types/user";
import Button from "../Primitives/Button";
import { TabsContent } from "../Primitives/Tab";
import fetchData from "../../utils/fetchData";
import { styled } from "../../stitches.config";
import ErrorMessages from "../../errors/errorMessages";
import Flex from "../Primitives/Flex";
import { NEXT_PUBLIC_ENABLE_AZURE } from "../../utils/constants";
import Input from "../Primitives/Input";

const StyledForm = styled("form", { width: "100%" });

const ValidateEmail: React.FC<{
  setShowMiddleware: Dispatch<SetStateAction<boolean>>;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
  setShowValidateEmail: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
}> = ({ setShowValidateEmail, setShowMiddleware, setShowRegister, setEmail }) => {
  const methods = useForm<EmailUser>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(SchemaEmailForm),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const email = useWatch({
    control,
    name: "email",
  });

  const [loginError, setLoginError] = useState(false);

  const onCheckEmail = async (emailValue: string) => {
    if (NEXT_PUBLIC_ENABLE_AZURE) {
      nProgress.start();
      try {
        const result = await fetchData<boolean>(`/auth/checkUserExists/${emailValue}`);

        setEmail(emailValue);
        if (result) {
          setShowValidateEmail(false);
          setShowMiddleware(true);
        } else {
          setShowValidateEmail(false);
          setShowMiddleware(false);
          setShowRegister(true);
        }
      } catch (error) {
        setLoginError(true);
      } finally {
        nProgress.done();
      }
    } else {
      setShowValidateEmail(false);
      setShowMiddleware(false);
      setShowRegister(true);
    }
  };

  return (
    <TabsContent value="register" css={{ gap: "$24" }}>
      <FormProvider {...methods}>
        <StyledForm
          onSubmit={handleSubmit(() => {
            onCheckEmail(email);
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
                  mb: "$8",
                }}
              >
                {ErrorMessages.DEFAULT}
              </Text>
            ) : null}
          </Flex>
          <Input
            id="email"
            type="text"
            value={email}
            state={errors.email ? "error" : "default"}
            placeholder="Email"
            helperText={errors.email?.message}
          />
          <Button color="green" type="submit" css={{ width: "100%" }}>
            Continue
          </Button>
        </StyledForm>
      </FormProvider>
    </TabsContent>
  );
};

export default ValidateEmail;
