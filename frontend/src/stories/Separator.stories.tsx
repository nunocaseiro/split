import React from 'react';
import { ComponentStory } from '@storybook/react';

import Separator from '@/components/Primitives/Separator';
import { SeparatorOrientationType, SeparatorSizeType } from './types/PrimitiveTypes';

const ORIENTATION_OPTIONS: SeparatorOrientationType[] = ['horizontal', 'vertical'];

const SIZE_OPTIONS: SeparatorSizeType[] = ['sm', 'md', 'lg', 'full'];

export default {
  title: 'Primitives/Separator',
  component: Separator,
  parameters: {
    controls: {
      expanded: true,
      exclude: ['ref', 'as', 'asChild', 'css'],
      sort: 'requiredFirst',
    },
  },
  args: {
    orientation: 'horizontal',
    size: 'full',
  },
  argTypes: {
    orientation: {
      options: ORIENTATION_OPTIONS,
      control: { type: 'select' },
      description: 'The component orientation.',
      table: {
        type: { summary: ORIENTATION_OPTIONS.join('|') },
        defaultValue: { summary: 'horizontal' },
      },
    },
    size: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
      description: 'The component size.',
      table: {
        type: { summary: SIZE_OPTIONS.join('|') },
        defaultValue: { summary: 'full' },
      },
    },
  },
};

const Template: ComponentStory<typeof Separator> = ({ ...args }) => (
  <div style={{ height: '100vh' }}>
    <Separator {...args} />
  </div>
);

export const Default = Template.bind({});
Default.storyName = 'Basic Usage';
