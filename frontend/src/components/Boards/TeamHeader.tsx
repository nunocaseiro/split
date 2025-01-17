import Flex from '@/components/Primitives/Layout/Flex/Flex';
import Separator from '@/components/Primitives/Separator/Separator';
import Text from '@/components/Primitives/Text/Text';
import { BoardUser } from '@/types/board/board.user';
import { Team } from '@/types/team/team';
import { TeamUser } from '@/types/team/team.user';
import AvatarGroup from '@/components/Primitives/Avatars/AvatarGroup/AvatarGroup';

interface TeamHeaderProps {
  team?: Team;
  userId: string;
  users?: BoardUser[] | TeamUser[];
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ team, userId, users }) => {
  const hasTeam = !!team;
  return (
    <Flex align="center" css={{ mb: '$16' }} justify="start">
      <Flex align="center">
        <Text
          css={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '$260',
          }}
          heading="5"
        >
          {hasTeam ? team.name : 'My boards'}
        </Text>
        {hasTeam && (
          <Flex align="center" css={{ ml: '$24' }} gap="12">
            <Flex align="center" gap="8">
              <Text color="primary300" size="sm">
                Members
              </Text>
              <AvatarGroup listUsers={team.users} userId={userId} />
            </Flex>
            <Separator css={{ backgroundColor: '$primary300' }} orientation="vertical" size="md" />
            <Text color="primary300" size="sm">
              Team admin
            </Text>
            <AvatarGroup teamAdmins stakeholders listUsers={team.users} userId={userId} />
          </Flex>
        )}
        {!hasTeam && users && (
          <Flex css={{ ml: '$12' }}>
            <AvatarGroup myBoards listUsers={users} userId={userId} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default TeamHeader;
