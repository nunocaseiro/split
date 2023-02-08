import React, { VFC, ReactNode } from 'react';
import { ComponentStory } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import TextArea from '@/components/Primitives/TextArea';

export default {
  title: 'Primitives/TextArea',
  component: TextArea,
  parameters: {
    controls: {
      expanded: true,
      exclude: ['ref', 'as', 'css'],
      sort: 'requiredFirst',
    },
    docs: {
      description: {
        component:
          'The border color of the TextArea component is controlled by the react hook form validator that is used.',
      },
    },
  },
  args: {
    placeholder: 'Some text...',
  },
  argTypes: {
    id: {
      control: false,
    },
    placeholder: {
      control: false,
      description: 'Placeholder text that appears in the textarea',
      table: {
        type: { summary: 'string' },
      },
      defaultValue: false,
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the textarea.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      defaultValue: false,
    },
  },
};

const StorybookFormProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
};

const Template: ComponentStory<typeof TextArea> = ({ placeholder, disabled }) => (
  <StorybookFormProvider>
    <TextArea id="text" placeholder={placeholder} disabled={disabled} />
  </StorybookFormProvider>
);

export const Default = Template.bind({});
Default.storyName = 'Basic Usage';