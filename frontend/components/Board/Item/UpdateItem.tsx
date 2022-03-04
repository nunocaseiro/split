import { CheckIcon } from "@modulz/radix-icons";
import { styled } from "../../../stitches.config";
import Button from "../../Primitives/Button";

const StyledCheckIcon = styled(CheckIcon, { size: "$20" });

const UpdateItem: React.FC<{ handleUpdate: () => void }> = ({ handleUpdate }) => {
  return (
    <Button
      css={{ m: 0, p: 2, lineHeight: 0, height: "fit-content", alignSelf: "end" }}
      onClick={handleUpdate}
    >
      <StyledCheckIcon />
    </Button>
  );
};

export default UpdateItem;
