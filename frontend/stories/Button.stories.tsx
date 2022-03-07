import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "../components/Primitives/Button";
import MagnifyingGlass from "../components/Primitives/icons/magnifyingGlass";

export default {
  title: "Button",
  component: Button,
  parameters: {
    cssprops: {
      "background-color": {
        value: "green",
        description: "Optional description",
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Text: ComponentStory<typeof Button> = ({ ...args }) => <Button {...args}>Button</Button>;
const TextAndIcon: ComponentStory<typeof Button> = ({ ...args }) => (
  <Button id="b1" {...args}>
    Button
    <MagnifyingGlass />
  </Button>
);
const OnlyIcon: ComponentStory<typeof Button> = ({ ...args }) => (
  <Button {...args}>
    <MagnifyingGlass />
  </Button>
);

export const Primary = Text.bind({});
Primary.argTypes = {
  state: {
    options: ["primary", "primaryOutline", "light", "lightOutline", "danger", "dangerOutline"],
    defaultValue: "primary",
    control: { type: "select" },
  },
  size: {
    options: ["lg", "md", "sm"],
    defaultValue: "md",
    control: { type: "select" },
  },
  disabled: {
    control: { type: "boolean" },
    defaultValue: false,
  },
  isIcon: {
    control: { type: "boolean" },
    defaultValue: false,
  },
  ref: {
    table: {
      disable: true,
    },
  },
  textSize: {
    table: {
      disable: true,
    },
  },
};

export const TextIcon = TextAndIcon.bind({});
TextIcon.argTypes = {
  state: {
    options: ["primary", "primaryOutline", "light", "lightOutline", "danger", "dangerOutline"],
    defaultValue: "primary",
    control: { type: "select" },
  },
  size: {
    options: ["lg", "md", "sm"],
    defaultValue: "md",
    control: { type: "select" },
  },
  disabled: {
    control: { type: "boolean" },
    defaultValue: false,
  },
  isIcon: {
    control: { type: "boolean" },
    defaultValue: false,
  },
  ref: {
    table: {
      disable: true,
    },
  },
  textSize: {
    table: {
      disable: true,
    },
  },
};

export const Icon = OnlyIcon.bind({});
Icon.argTypes = {
  state: {
    options: ["primary", "primaryOutline", "light", "lightOutline", "danger", "dangerOutline"],
    defaultValue: "primary",
    control: { type: "select" },
  },
  size: {
    options: ["lg", "md", "sm"],
    defaultValue: "md",
    control: { type: "select" },
  },
  disabled: {
    control: { type: "boolean" },
    defaultValue: false,
  },
  isIcon: {
    control: { type: "boolean" },
    defaultValue: true,
  },
  ref: {
    table: {
      disable: true,
    },
  },
  textSize: {
    table: {
      disable: true,
    },
  },
};
