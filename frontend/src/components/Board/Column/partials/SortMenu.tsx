import Icon from '@/components/Primitives/Icons/Icon/Icon';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverItem,
  PopoverTrigger,
} from '@/components/Primitives/Popovers/Popover/Popover';
import Text from '@/components/Primitives/Text/Text';

type Props = {
  setFilter: (value: 'desc' | 'asc' | undefined) => void;
  filter: 'desc' | 'asc' | undefined;
  disabled?: boolean;
};

const SortMenu = ({ setFilter, filter, disabled = false }: Props) => {
  /**
   * Make a switch case to set icon
   * by current filter
   */
  let icon;

  switch (filter) {
    case 'asc':
      icon = 'sort_upvoted';
      break;
    case 'desc':
      icon = 'sort_downvoted';
      break;
    default:
      icon = 'sort';
      break;
  }

  return (
    <Popover>
      <PopoverTrigger disabled={disabled} size="md" variant="light">
        <Icon name={icon} size={24} />
      </PopoverTrigger>
      {!disabled && (
        <PopoverContent>
          <PopoverClose>
            <PopoverItem active={filter === 'desc'} onClick={() => setFilter('desc')}>
              <Icon name="sort_desc" />
              <Text size="sm">Sort by votes (desc)</Text>
            </PopoverItem>
          </PopoverClose>
          <PopoverClose>
            <PopoverItem active={filter === 'asc'} onClick={() => setFilter('asc')}>
              <Icon name="sort_asc" />
              <Text size="sm">Sort by votes (asc)</Text>
            </PopoverItem>
          </PopoverClose>
          <PopoverClose>
            <PopoverItem active={filter === undefined} onClick={() => setFilter(undefined)}>
              <Icon name="sort" />
              <Text size="sm">No sorting</Text>
            </PopoverItem>
          </PopoverClose>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default SortMenu;
