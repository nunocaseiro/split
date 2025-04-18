import { Title } from '@/components/CardBoard/CardBody/CardTitle/partials/Title';
import Tooltip from '@/components/Primitives/Tooltips/Tooltip/Tooltip';

type CardTitleProps = {
  userIsParticipating: boolean;
  boardId: string;
  title: string;
  isSubBoard: boolean | undefined;
  mainBoardId?: string;
};

const CardTitle: React.FC<CardTitleProps> = ({
  userIsParticipating,
  boardId,
  title,
  isSubBoard,
  mainBoardId = undefined,
}) =>
  isSubBoard ? (
    <Tooltip content="It’s a sub-team board. A huge team got split into sub teams.">
      <Title
        boardId={boardId}
        isSubBoard={isSubBoard}
        mainBoardId={mainBoardId}
        title={title}
        userIsParticipating={userIsParticipating}
      />
    </Tooltip>
  ) : (
    <Title
      boardId={boardId}
      isSubBoard={isSubBoard}
      mainBoardId={mainBoardId}
      title={title}
      userIsParticipating={userIsParticipating}
    />
  );

export default CardTitle;
