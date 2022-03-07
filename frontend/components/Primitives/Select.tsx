import React, { useState } from "react";
import { styled } from "@stitches/react";
import { violet, mauve, blackA } from "@radix-ui/colors";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import Flex from "./Flex";
import Text from "./Text";
import Checkbox from "./Checkbox";
import { boxShadow, boxShadowFocus } from "../../styles/colors/box-shadow.colors";
import { outlineColor, outlineFocus } from "../../styles/colors/outline.colors";

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: "unset",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$4",
  boxSizing: "border-box",
  pt: "$8",
  pl: "$16",
  fontSize: "$16",
  lineHeight: "$20",
  height: 56,
  gap: 4,
  backgroundColor: "white",
  color: "White",
  border: "1px solid var(--colors-primary200)",
  "&:focus": { boxShadow: `0 0 0 2px black` },
});

const StyledContent = styled(SelectPrimitive.Content, {
  overflow: "hidden",
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

const StyledViewport = styled(SelectPrimitive.Viewport, {
  padding: 5,
});

const StyledItem = styled(SelectPrimitive.Item, {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: violet.violet11,
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 35px 0 25px",
  position: "relative",
  userSelect: "none",

  "&[data-disabled]": {
    color: mauve.mauve8,
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: violet.violet9,
    color: violet.violet1,
  },
});

const StyledLabel = styled(SelectPrimitive.Label, {
  padding: "0 25px",
  fontSize: 12,
  lineHeight: "25px",
  color: mauve.mauve11,
});

const StyledSeparator = styled(SelectPrimitive.Separator, {
  height: 1,
  backgroundColor: violet.violet6,
  margin: 5,
});

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const scrollButtonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
  backgroundColor: "white",
  color: violet.violet11,
  cursor: "default",
};

const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton, scrollButtonStyles);

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton, scrollButtonStyles);

// Exports
export const SelectRoot = SelectPrimitive.Root;
export const SelectTrigger = StyledTrigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectIcon = SelectPrimitive.Icon;
export const SelectContent = StyledContent;
export const SelectViewport = StyledViewport;
export const SelectGroup = SelectPrimitive.Group;
export const SelectItem = StyledItem;
export const SelectItemText = SelectPrimitive.ItemText;
export const SelectItemIndicator = StyledItemIndicator;
export const SelectLabel = StyledLabel;
export const SelectSeparator = StyledSeparator;
export const SelectScrollUpButton = StyledScrollUpButton;
export const SelectScrollDownButton = StyledScrollDownButton;

const Select: React.FC<{ values: string[]; isCheckBox?: boolean; label: string }> = ({
  values,
  isCheckBox,
  label,
}) => {
  Select.defaultProps = {
    isCheckBox: false,
  };
  const [currentValue, setCurrentValue] = useState(values[0] ?? "");

  const setChangedValue = (val: string) => {
    setCurrentValue(val);
  };

  return (
    <Flex css={{ position: "relative", width: "100%" }}>
      <SelectRoot value={currentValue} onValueChange={setChangedValue}>
        <SelectTrigger
          aria-label="Food"
          css={{
            width: "100%",
            borderColor: outlineColor[state],
            boxShadow: boxShadow[state],
            // "&::placeholder": {
            //   color: disabled ? "$primaryBase" : "$primary300",
            // },
            "&:focus": {
              "[data-state]": "focus",
              border: outlineFocus[state],
              boxShadow: boxShadowFocus[state],
            },
          }}
        >
          <SelectValue />
          <SelectIcon>
            <ChevronDownIcon />
          </SelectIcon>
        </SelectTrigger>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>
            <SelectGroup>
              {!isCheckBox &&
                values.map((value) => {
                  return (
                    <SelectItem value={value.toLowerCase()}>
                      <SelectItemText>{value}</SelectItemText>
                      <SelectItemIndicator>
                        <CheckIcon />
                      </SelectItemIndicator>
                    </SelectItem>
                  );
                })}
              {isCheckBox &&
                values.map((value) => {
                  return <Checkbox id="value" label={value} size="12" />;
                })}
            </SelectGroup>
          </SelectViewport>
          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectRoot>
      <Text
        as="label"
        css={{
          fontSize: "$16",
          pl: "$17",
          top: "0",
          lineHeight: "$24",
          color: "$primary300",
          position: "absolute",
          pointerEvents: "none",
          transformOrigin: "0 0",
          transition: "all .2s ease-in-out",
        }}
      >
        {label}
      </Text>
    </Flex>
  );
};

export default Select;
