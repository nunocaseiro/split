import React, { useEffect, useMemo, useState } from 'react';

import Avatar from '@/components/Primitives/Avatars/Avatar/Avatar';
import Icon from '@/components/Primitives/Icons/Icon/Icon';
import Button from '@/components/Primitives/Inputs/Button/Button';
import Flex from '@/components/Primitives/Layout/Flex/Flex';
import Text from '@/components/Primitives/Text/Text';
import { BoardPhases } from '@/enums/boards/phases';
import { getCardVotes } from '@/helper/board/votes';
import useVotes from '@/hooks/useVotes';
import { BoardUser } from '@/types/board/board.user';
import CardType from '@/types/card/card';
import { CardItemType } from '@/types/card/cardItem';
import CommentType from '@/types/comment/comment';
import { getInitials } from '@/utils/getInitials';

interface FooterProps {
  boardId: string;
  userId: string;
  socketId: string | undefined;
  card: CardType | CardItemType;
  anonymous: boolean;
  isItem: boolean;
  isMainboard: boolean;
  setOpenComments?: () => void;
  comments?: CommentType[];
  isCommentsOpened?: boolean;
  boardUser?: BoardUser;
  maxVotes?: number;
  hideCards: boolean;
  isRegularBoard?: boolean;
  phase?: string;
}

const CardFooter = ({
  boardId,
  userId,
  socketId,
  card,
  anonymous,
  isItem,
  isMainboard,
  comments,
  boardUser,
  maxVotes,
  setOpenComments,
  isCommentsOpened,
  hideCards,
  isRegularBoard,
  phase,
}: FooterProps) => {
  const createdBy = useMemo(() => {
    if (Object.hasOwnProperty.call(card, 'items')) {
      const cardTyped = card as CardType;
      return cardTyped.items.at(-1)?.createdBy;
    }
    return card.createdBy;
  }, [card]);

  const createdByTeam = useMemo(() => {
    if (Object.hasOwnProperty.call(card, 'items')) {
      const cardTyped = card as CardType;
      return cardTyped.items.at(-1)?.createdByTeam;
    }
    return card.createdByTeam;
  }, [card]);

  const {
    handleVote: { mutate, status },
    toastInfoMessage,
    updateVote,
  } = useVotes();

  const user = boardUser;
  const userVotes = user?.votesCount ?? 0;

  const [count, setCount] = useState(0);

  const calculateVotes = () => {
    const cardTyped = card as CardType;
    if (Object.hasOwnProperty.call(card, 'items')) {
      const cardItemId = cardTyped.items.length === 1 ? cardTyped.items[0]._id : undefined;

      const votesInThisCard =
        cardTyped.items.length === 1 ? cardTyped.items[0].votes : getCardVotes(cardTyped);

      const votesOfUserInThisCard = votesInThisCard.filter((vote) => vote === userId).length;

      return { cardItemId, votesOfUserInThisCard, votesInThisCard };
    }

    return { cardItemId: undefined, votesOfUserInThisCard: 0, votesInThisCard: [] };
  };

  const { cardItemId, votesInThisCard, votesOfUserInThisCard } = calculateVotes();

  const handleDeleteVote = () => {
    if ((hideCards && createdBy?._id !== userId) || status === 'pending') return;
    if (maxVotes) {
      toastInfoMessage(`You have ${maxVotes! - (userVotes - 1)} votes left.`);
    }
    updateVote({
      boardId,
      cardId: card._id,
      socketId,
      cardItemId,
      isCardGroup: cardItemId === undefined,
      count: count - 1,
      userId,
      fromRequest: true,
    });
    setCount((prev) => prev - 1);
  };

  const handleAddVote = () => {
    if (status === 'pending') return;
    if (maxVotes) {
      toastInfoMessage(`You have ${maxVotes - (userVotes + 1)} votes left.`);
    }
    updateVote({
      boardId,
      cardId: card._id,
      socketId,
      cardItemId,
      isCardGroup: cardItemId === undefined,
      count: count + 1,
      userId,
      fromRequest: true,
    });
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count === 0) return;
      mutate({
        boardId,
        cardId: card._id,
        socketId,
        cardItemId,
        isCardGroup: cardItemId === undefined,
        count,
        userId,
        fromRequest: true,
      });
      setCount(0);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const disableVotes = !((!isMainboard && isRegularBoard) || (isMainboard && !isRegularBoard));

  return (
    <Flex align="center" gap="6" justify={!anonymous || createdByTeam ? 'between' : 'end'}>
      {!anonymous && !createdByTeam && (
        <Flex
          align="center"
          gap="4"
          css={{
            maxWidth: '$226',
          }}
        >
          <Avatar
            isBoardPage
            css={{ flexShrink: 0 }}
            fallbackText={getInitials(createdBy?.firstName ?? '-', createdBy?.lastName ?? '-')}
            id={createdBy?._id}
            isDefaultColor={createdBy?._id === userId}
            size={20}
            src={createdBy?.avatar}
          />
          <Text
            size="xs"
            css={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {createdBy?.firstName} {createdBy?.lastName}
          </Text>
        </Flex>
      )}
      {createdByTeam && (
        <Text fontWeight="medium" size="xs">
          {createdByTeam}
        </Text>
      )}
      {!isItem && comments && (
        <Flex align="center" gap="10">
          <Flex align="center" gap="2">
            <Button
              isIcon
              css={{ color: '$primary500' }}
              onClick={handleAddVote}
              size="sm"
              variant="light"
              disabled={
                disableVotes ||
                (maxVotes && user?.votesCount === maxVotes) ||
                hideCards ||
                phase === BoardPhases.ADDCARDS ||
                phase === BoardPhases.SUBMITTED
              }
            >
              <Icon name="thumbs-up" />
            </Button>
            <Text
              size="xs"
              visible={votesInThisCard.length > 0}
              css={{
                width: '10px',
              }}
            >
              {votesInThisCard.length}
            </Text>
          </Flex>

          <Flex
            align="center"
            gap="2"
            css={{
              mr: '$10',
            }}
          >
            <Button
              isIcon
              css={{ color: '$primary500' }}
              onClick={handleDeleteVote}
              size="sm"
              variant="light"
              disabled={
                disableVotes ||
                votesInThisCard.length === 0 ||
                (maxVotes && userVotes === 0) ||
                votesOfUserInThisCard === 0 ||
                hideCards ||
                phase === BoardPhases.ADDCARDS ||
                phase === BoardPhases.SUBMITTED
              }
            >
              <Icon name="thumbs-down" />
            </Button>
          </Flex>

          <Flex align="center" gap="2">
            <Button
              isIcon
              css={{ color: '$primary500' }}
              disabled={hideCards && card.createdBy?._id !== userId}
              onClick={setOpenComments}
              size="sm"
              variant="light"
            >
              <Icon name={isCommentsOpened ? 'comment-filled' : 'comment'} />
            </Button>
            <Text size="xs" visible={comments.length > 0}>
              {comments.length}
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default CardFooter;
