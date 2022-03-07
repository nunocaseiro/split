import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { z } from "zod";
import Input from "../components/Primitives/Input";
import MagnifyingGlass from "../components/Primitives/icons/magnifyingGlass";

export default {
  title: "Input",
  component: Input,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof Input>;

const InputWithoutIcon: ComponentStory<typeof Input> = ({ ...args }: any) => {
  const methods = useForm<{ i1: string }>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(
      z.object({
        i1: z.string().nonempty("Please insert at least 2 chars.").min(2, "Too short"),
      })
    ),
  });

  return (
    <FormProvider {...methods}>
      <Input id="i1" placeholder="Hey" {...args} />
    </FormProvider>
  );
};
const InputWithIcon: ComponentStory<typeof Input> = ({ ...args }: any) => {
  const methods = useForm<{ i1: string }>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(
      z.object({
        i1: z.string().nonempty("Please insert at least 2 chars.").min(2, "Too short"),
      })
    ),
  });
  return (
    <FormProvider {...methods}>
      <Input id="i1" placeholder="" {...args} icon={<MagnifyingGlass />} />
    </FormProvider>
  );
};

export const NoIcon = InputWithoutIcon.bind({});
NoIcon.argTypes = {
  id: {
    table: {
      disable: true,
    },
  },
  type: {
    options: ["text", "password", "email", "number", "tel", "url"],
    defaultValue: "text",
    control: { type: "select" },
  },
  placeholder: {
    control: { type: "text" },
    defaultValue: "Placeholder",
  },
  icon: {
    table: {
      disable: true,
    },
  },
  iconPosition: {
    table: {
      disable: true,
    },
  },
  helperText: {
    control: { type: "text" },
  },
};

export const WithIcon = InputWithIcon.bind({});
WithIcon.argTypes = {
  id: {
    table: {
      disable: true,
    },
  },
  type: {
    options: ["text", "password", "email", "number", "tel", "url"],
    defaultValue: "text",
    control: { type: "select" },
  },
  placeholder: {
    control: { type: "text" },
    defaultValue: "Placeholder",
  },
  icon: {
    table: {
      disable: true,
    },
  },
  iconPosition: {
    options: ["left", "right"],
    control: { type: "select" },
    defaultValue: "left",
  },
  helperText: {
    control: { type: "text" },
  },
};
