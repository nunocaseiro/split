import { ComponentMeta, ComponentStory } from "@storybook/react";
import Checkbox from "../components/Primitives/Checkbox";

export default {
  title: "Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const CheckboxStory: ComponentStory<typeof Checkbox> = ({ ...args }: any) => (
  <Checkbox size="16" {...args} />
);

export const Primary = CheckboxStory.bind({});
Primary.argTypes = {
  id: {
    defaultValue: "id1",
  },
  checked: {
    options: [true, false, "indeterminate"],
    control: { type: "select" },
  },
  size: {
    options: ["12", "16"],
    control: { type: "select" },
  },
};
