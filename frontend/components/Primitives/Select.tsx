import React, { useState } from "react";
import { styled } from "@stitches/react";
import { violet, mauve } from "@radix-ui/colors";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import Flex from "./Flex";
import Text from "./Text";
import Checkbox from "./Checkbox";
import isEmpty from "../../utils/isEmpty";

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: "unset",
  alignItems: "center",
  fontFamily: "DM Sans",
  display: "flex",
  justifyContent: "space-between",
  borderRadius: "$4",
  boxSizing: "border-box",
  paddingTop: "$28",
  paddingBottom: "$8",
  width: "100%",
  paddingLeft: "$16",
  paddingRight: "$16",
  fontSize: "$16",
  lineHeight: "$20",
  height: "$56",
  backgroundColor: "white",
  color: "black",
  border: "1px solid var(--colors-primary200)",
  variants: {
    variant: {
      default: {
        "&:focus": {
          borderColor: "$primary400",
          boxShadow: "0px 0px 0px 2px var(--colors-primaryLightest)",
        },
      },
      valid: {
        borderColor: "$success700",
        boxShadow: "0px 0px 0px 2px var(--colors-successLightest)",
      },
      error: {
        borderColor: "$danger700",
        boxShadow: "0px 0px 0px 2px var(--colors-dangerLightest)",
      },
    },
  },
});

const StyledContent = styled(SelectPrimitive.Content, {
  overflow: "hidden",
  backgroundColor: "white",
  fontFamily: "DM Sans",
  borderRadius: 6,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

const StyledViewport = styled(SelectPrimitive.Viewport, {
  padding: 5,
});

const StyledItem = styled(SelectPrimitive.Item, {
  all: "unset",
  fontSize: "$14",
  lineHeight: "$20",
  color: "$black",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 36,
  pl: "$16",
  py: "$8",
  position: "relative",
  userSelect: "none",
  fontFamily: "DM Sans",

  "&:focus": {
    backgroundColor: "$black",
    color: "$white",
  },
});

const StyledItemText = styled(SelectPrimitive.ItemText, {
  fontFamily: "DM Sans",
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

const StyledIcon = styled(SelectPrimitive.Icon, {
  "& svg": {
    height: "$24",
    width: "$24",
  },
  position: "absolute",
  right: 16,
  top: 16,
});

const StyledSelectValue = styled(SelectPrimitive.SelectValue, {
  fontFamily: "DM Sans",
});

// Exports
export const SelectRoot = SelectPrimitive.Root;
export const SelectTrigger = StyledTrigger;
export const SelectValue = StyledSelectValue;
export const SelectIcon = StyledIcon;
export const SelectContent = StyledContent;
export const SelectViewport = StyledViewport;
export const SelectGroup = SelectPrimitive.Group;
export const SelectItem = StyledItem;
export const SelectItemText = StyledItemText;
export const SelectItemIndicator = StyledItemIndicator;
export const SelectLabel = StyledLabel;
export const SelectSeparator = StyledSeparator;
export const SelectScrollUpButton = StyledScrollUpButton;
export const SelectScrollDownButton = StyledScrollDownButton;

const Select: React.FC<{
  variant?: "default" | "valid" | "error";
  values: string[];
  isCheckBox?: boolean;
  label: string;
}> = ({ variant, values, isCheckBox, label }) => {
  Select.defaultProps = {
    isCheckBox: false,
    variant: "default",
  };
  const [currentValue, setCurrentValue] = useState("empty");
  const [selectedValues, setSelectedValues] = useState([] as string[]);

  const handleChange = (value: string) => {
    setSelectedValues((prev) => {
      if (selectedValues.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  };

  const setChangedValue = (val: string) => {
    setCurrentValue(val);
  };

  return (
    <Flex css={{ position: "relative", width: "100%" }}>
      <SelectRoot value={currentValue} onValueChange={setChangedValue}>
        <SelectTrigger
          variant={variant}
          aria-label="Options"
          css={{
            "&:focus ~ label": {
              transform:
                !isEmpty(currentValue) && currentValue !== "empty"
                  ? `scale(0.875) translateX(0.1rem) translateY(-0.5rem)`
                  : "scale(1) translateX(0) translateY(0)",
            },
          }}
        >
          <SelectValue />
          <SelectIcon color="black">
            <ChevronDownIcon />
          </SelectIcon>
        </SelectTrigger>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>
            <SelectGroup>
              <SelectItem css={{ height: isCheckBox ? "0" : "none" }} value="empty">
                <SelectItemText />
              </SelectItem>
              {!isCheckBox &&
                values.map((value, index) => {
                  return (
                    <SelectItem key={`${value}${index}`} value={value.toLowerCase()}>
                      <SelectItemText>{value}</SelectItemText>
                      {/* <SelectItemIndicator>
                        <CheckIcon />
                      </SelectItemIndicator> */}
                    </SelectItem>
                  );
                })}
              {isCheckBox &&
                values.map((value, index) => {
                  return (
                    <Checkbox
                      key={`${value}${index}`}
                      handleChange={handleChange}
                      id={value}
                      checked={selectedValues.includes(value)}
                      label={value}
                      size="16"
                    />
                  );
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
          // left: 16,
          // top: 16,
          top: 0,
          p: "$16",
          pl: "$17",
          lineHeight: "$24",
          color: "$primary300",
          position: "absolute",
          pointerEvents: "none",
          transformOrigin: "0 0",
          transition: "all .2s ease-in-out",
          transform:
            !isEmpty(currentValue) && currentValue !== "empty"
              ? "scale(0.875) translateX(0.1rem) translateY(-0.5rem)"
              : "scale(1) translateX(0) translateY(0)",
        }}
      >
        {label}
      </Text>
    </Flex>
  );
};

export default Select;
