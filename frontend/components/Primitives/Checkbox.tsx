import React, { useState } from "react";
import { styled } from "@stitches/react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import CheckIcon from "./icons/check";
import Text from "./Text";
import Flex from "./Flex";
import IndeterminateIcon from "./icons/indeterminate";

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: "unset",
  backgroundColor: "white",
  boxSizing: "border-box",
  borderRadius: "$2",
  border: "1px solid $primaryBase",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  variants: {
    variant: {
      default: {
        borderColor: "$primaryBase",
        backgroundColor: "transparent",
        '&[data-state="checked"]': {
          backgroundColor: "$primaryBase",
        },
        "&:disabled": {
          borderColor: "$primary100",
          '&[data-state="checked"]': {
            backgroundColor: "$primary100",
          },
        },
      },
      error: {
        borderColor: "$dangerBase",
        '&[data-state="checked"]': {
          backgroundColor: "$dangerBase",
        },
        "&:disabled": {
          borderColor: "$primary100",
          '&[data-state="checked"]': {
            backgroundColor: "$primary100",
          },
        },
      },
    },
  },
  '&[data-state="indeterminate"]': {
    borderColor: "$primaryBase",
    backgroundColor: "$primaryBase",
  },
  defaultVariants: {
    variant: "default",
  },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: "$white",
});

// Exports
export const CheckboxIndicator = StyledIndicator;

const getIndeterminateSize = (boxSize: "12" | "16") => {
  if (boxSize === "12") return "8";
  return "10";
};

const Checkbox: React.FC<{
  label: string;
  id: string;
  variant?: "default" | "error";
  checked?: boolean | "indeterminate";
  values?: string[];
  disabled?: boolean;
  size: "12" | "16";
  handleChange: (value: string) => void;
}> = ({ id, label, variant, size, checked, values, disabled, handleChange }) => {
  Checkbox.defaultProps = {
    variant: "default",
    checked: false,
    values: [],
    disabled: false,
  };

  const [currentCheckValue, setCurrentCheckValue] = useState<boolean | undefined | "indeterminate">(
    checked
  );

  const handleCheckedChange = (isChecked: boolean | "indeterminate") => {
    handleChange(id);
    setCurrentCheckValue(isChecked);
  };

  return (
    <Flex css={{ alignItems: "center", height: "$36", width: "100%" }}>
      <StyledCheckbox
        variant={variant ?? "default"}
        name={id}
        id={id}
        checked={currentCheckValue}
        disabled={disabled}
        onCheckedChange={handleCheckedChange}
        css={{ width: `$${size} !important`, height: `$${size} !important` }}
      >
        <CheckboxIndicator
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: `$${size} !important`,
            height: `$${size} !important`,
            "& svg": {
              width:
                currentCheckValue === "indeterminate"
                  ? `$${getIndeterminateSize(size)} !important`
                  : `$${size} !important`,
              height: `$${size} !important`,
            },
          }}
        >
          {currentCheckValue === true && <CheckIcon />}
          {currentCheckValue === "indeterminate" && <IndeterminateIcon />}
        </CheckboxIndicator>
      </StyledCheckbox>
      <Text as="label" size="sm" css={{ paddingLeft: "$8", width: "100%" }} htmlFor={id}>
        {label}
      </Text>
    </Flex>
  );
};

export default Checkbox;
