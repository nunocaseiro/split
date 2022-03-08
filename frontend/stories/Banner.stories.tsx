import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Banner from "../components/Primitives/Banner";

export default {
  title: "Banner",
  component: Banner,
} as ComponentMeta<typeof Banner>;

const BannerStory: ComponentStory<typeof Banner> = ({
  ...args
}: React.ComponentProps<typeof Banner>) => <Banner css={{ backgroundColor: "$black" }} {...args} />;

export const Primary = BannerStory.bind({});
Primary.argTypes = {};
