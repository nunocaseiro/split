import { Dispatch, SetStateAction } from "react";
import { TabsContent } from "../Primitives/Tab";
import Button from "../Primitives/Button";
import Text from "../Primitives/Text";
import Flex from "../Primitives/Flex";
import useUser from "../../hooks/useUser";

const RegisterMiddleware: React.FC<{
  email: string;
  setShowValidateEmail: Dispatch<SetStateAction<boolean>>;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
  setShowMiddleware: Dispatch<SetStateAction<boolean>>;
}> = ({ email, setShowValidateEmail, setShowRegister, setShowMiddleware }) => {
  const { loginAzure } = useUser();

  const showValidateEmail = () => {
    setShowValidateEmail(true);
    setShowRegister(false);
    setShowMiddleware(false);
  };

  return (
    <TabsContent direction="column" value="register" css={{ gap: "$8" }}>
      <Flex>
        <Text>
          This email <Text>{email} </Text> supports login with company sso
          <Button
            css={{ backgroundColor: "white", p: 0, cursor: "pointer", color: "blue" }}
            type="button"
            onClick={showValidateEmail}
          >
            (change)
          </Button>
        </Text>
      </Flex>
      <Button type="button" onClick={loginAzure}>
        Login
      </Button>
    </TabsContent>
  );
};

export default RegisterMiddleware;
