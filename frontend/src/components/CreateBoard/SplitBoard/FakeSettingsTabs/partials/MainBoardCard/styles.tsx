import { styled } from '@/styles/stitches/stitches.config';

import Box from '@/components/Primitives/Layout/Box/Box';
import Flex from '@/components/Primitives/Layout/Flex/Flex';

const MainContainer = styled(Flex, Box, {
  backgroundColor: 'white',
  height: '$76',
  width: '100%',
  borderRadius: '$12',
  px: '$24',
  py: '$22',
});

const Container = styled(Flex, Box, {});

export { Container, MainContainer };
