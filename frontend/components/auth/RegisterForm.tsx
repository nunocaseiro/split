import React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "../../stitches.config";
import useUser from "../../hooks/useUser";
import Button from "../Primitives/Button";
import Flex from "../Primitives/Flex";
import { TabsContent } from "../Primitives/Tab";
import { User } from "../../types/user";
import Text from "../Primitives/Text";
import ErrorMessages from "../../errors/errorMessages";
import schemaRegisterForm from "../../schema/schemaRegisterForm";
import Input from "../Primitives/Input";
import isEmpty from "../../utils/isEmpty";

const StyledForm = styled("form", Flex, { width: "100%" });

const RegisterForm: React.FC<{ email: string }> = ({ email }) => {
  const { setPw, createUser } = useUser();
  const { isError, error } = createUser;

  const methods = useForm<User>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(schemaRegisterForm),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const name = useWatch({
    control,
    name: "name",
  });
  const password = useWatch({
    control,
    name: "password",
  });
  const passwordConf = useWatch({
    control,
    name: "passwordConf",
  });

  return (
    <TabsContent value="register" css={{ width: "100%" }}>
      <FormProvider {...methods}>
        <StyledForm
          direction="column"
          onSubmit={handleSubmit((dataUser: User) => {
            if (dataUser.password) {
              dataUser.email = email;
              setPw(dataUser?.password);
              createUser.mutate(dataUser);
            }
          })}
        >
          <Flex>
            {isError ? (
              <Text
                color="red"
                css={{
                  backgroundColor: "$red5",
                  fontWeight: "bold",
                  p: "$16",
                  width: "100%",
                }}
              >
                {ErrorMessages[error?.response?.data.message] ?? ErrorMessages.DEFAULT}
              </Text>
            ) : null}
          </Flex>
          <Input
            id="name"
            type="text"
            value={name}
            state={errors.name ? "error" : isEmpty(name) ? "default" : "valid"}
            placeholder="Name"
            helperText={errors.name?.message}
          />
          <Input
            id="password"
            type="password"
            value={password}
            state={errors.password ? "error" : isEmpty(password) ? "default" : "valid"}
            placeholder="Password"
            helperText={errors.password?.message}
          />
          <Input
            id="passwordConfirmation"
            type="password"
            value={passwordConf}
            state={errors.passwordConf ? "error" : isEmpty(passwordConf) ? "default" : "valid"}
            placeholder="PasswordConfirmation"
            helperText={errors.passwordConf?.message}
          />
          <Button
            color="green"
            state="primary"
            size="md"
            css={{ mt: "$8", width: "100%" }}
            type="submit"
          >
            Create account
          </Button>
        </StyledForm>
      </FormProvider>
    </TabsContent>
  );
};

export default RegisterForm;
