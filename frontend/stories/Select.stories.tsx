import { ComponentMeta, ComponentStory } from "@storybook/react";
import Select from "../components/Primitives/Select";

export default {
  title: "Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const SelectStory: ComponentStory<typeof Select> = ({ ...args }: any) => (
  <Select values={["One", "Two", "Three"]} {...args} />
);

export const Primary = SelectStory.bind({});
Primary.argTypes = {
  values: {
    table: {
      disable: true,
    },
  },
};
