import { Dispatch, SetStateAction } from "react";
import Text from "../../Primitives/Text";
import TextArea from "../../Primitives/TextArea";

interface TextItemProps {
  editText: boolean;
  newText: string;
  setNewText: Dispatch<SetStateAction<string>>;
  text: string;
}

const TextItem: React.FC<TextItemProps> = ({ editText, newText, setNewText, text }) => {
  if (!editText) return <Text css={{ wordBreak: "break-word" }}>{text}</Text>;
  return (
    <TextArea
      value={newText}
      setCurrentValue={setNewText}
      id="AddCardTextArea"
      state="default"
      helperText=""
      placeholder=""
    />
  );
};

export default TextItem;
