import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextArea from "../components/Primitives/TextArea";

export default {
  title: "TextArea",
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const TextAreaRegular: ComponentStory<typeof TextArea> = ({ ...args }: any) => (
  <TextArea id="ta1" placeholder="" value="" {...args} />
);
export const Primary = TextAreaRegular.bind({});
Primary.argTypes = {
  id: {
    table: {
      disable: true,
    },
  },
  state: {
    options: ["default", "valid", "error", "disabled"],
    control: { type: "select" },
    defaultValue: "default",
  },
  placeholder: {
    control: { type: "text" },
    defaultValue: "Placeholder",
  },
  value: {
    table: {
      disable: true,
    },
  },
  helperText: {
    control: { type: "text" },
    defaultValue: "This is the help text for this input.",
  },
};
