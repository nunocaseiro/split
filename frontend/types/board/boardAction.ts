import CardType from "../card/card";
import BoardChanges from "./boardChanges";

interface BoardAction {
  type: string;
  changes: BoardChanges;
  item?: CardType;
}

export default BoardAction;
