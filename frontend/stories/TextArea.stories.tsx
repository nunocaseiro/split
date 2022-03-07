import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextArea from "../components/Primitives/TextArea";

export default {
  title: "TextArea",
  component: TextArea,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof TextArea>;

const TextAreaRegular: ComponentStory<typeof TextArea> = ({ ...args }: any) => {
  const methods = useForm<{ i1: string }>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(
      z.object({
        ta1: z.string().nonempty("Please insert at least 2 chars.").min(2, "Too short"),
      })
    ),
  });
  return (
    <FormProvider {...methods}>
      <TextArea id="ta1" value="" {...args} />
    </FormProvider>
  );
};

export const Primary = TextAreaRegular.bind({});
Primary.argTypes = {
  id: {
    table: {
      disable: true,
    },
  },
  placeholder: {
    control: { type: "text" },
    defaultValue: "Placeholder",
  },
  helperText: {
    control: { type: "text" },
  },
};
