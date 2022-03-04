import React from "react";
import { FieldValues, useFormContext, UseFormReturn, useWatch } from "react-hook-form";
import { css } from "@stitches/react";
import Text from "./Text";
import { CSS, styled } from "../../stitches.config";
import Flex from "./Flex";
import isEmpty from "../../utils/isEmpty";
import InfoIcon from "./icons/info";
import { outlineColor, outlineFocus } from "../../styles/colors/outline.colors";
import { boxShadow, boxShadowFocus } from "../../styles/colors/box-shadow.colors";

const StyledInput = styled("input", {
  // Reset
  appearance: "none",
  borderWidth: "0",
  boxSizing: "border-box",
  margin: "0",
  outlineOffset: "0",
  padding: "0",
  fontFamily: "DM Sans",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  backgroundColor: "$white",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },
  "&:-internal-autofill-selected": {
    "-webkit-box-shadow": "0 0 0px 1000px white inset",
    backgroundColor: "$white",
  },

  "&:-webkit-autofill": {
    "-webkit-box-shadow": "0 0 0px 1000px white inset",
    backgroundColor: "$white",
  },
  "&:-webkit-autofill:active": {
    "-webkit-box-shadow": "0 0 0px 1000px white inset",
    backgroundColor: "$white",
  },
  "&:-webkit-autofill:focus": {
    "-webkit-box-shadow": "0 0 0px 1000px white inset",
    backgroundColor: "$white",
  },

  "&:-webkit-autofill::first-line": {
    color: "$primaryBase",
    fontFamily: "DM Sans",
    fontSize: "$16",
    fontWeight: "$bold",
  },

  // Custom

  display: "flex",
  fontSize: "$16",
  lineHeight: "$20",
  px: "$16",
  py: "$16",
  boxShadow: "0",
  border: "1px solid $primary200",
  outline: "none",
  borderRadius: "$4",
  "&::-webkit-input-placeholder": {
    color: "$primary300",
  },
  "&:disabled": {
    backgroundColor: "$primary50",
  },
});

interface InputProps {
  id: string;
  type: "text" | "password" | "email" | "number" | "tel" | "url";
  placeholder: string;
  // value?: string;
  icon?: JSX.Element;
  helperText?: string;
  iconPosition?: "left" | "right";
  customCss?: CSS;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  icon,
  iconPosition,
  helperText,
  type,
  customCss,
  disabled,
}) => {
  Input.defaultProps = {
    iconPosition: "left",
    icon: undefined,
    helperText: "",
    customCss: undefined,
    disabled: false,
  };

  const isIconLeft = iconPosition === "left";
  const isIconRight = iconPosition === "right";

  const values = useFormContext();
  const {
    formState: { errors },
  } = values;
  const isValueEmpty = isEmpty(values.getValues()[id]);
  const state = errors[`${id}`] ? "error" : isValueEmpty ? "default" : "valid";
  helperText = errors[`${id}`]?.message;
  return (
    <Flex
      direction="column"
      css={{ position: "relative", width: "100%", mb: "$20", height: "auto", ...customCss }}
      onBlur={() => {
        if (isValueEmpty) values.clearErrors();
      }}
    >
      {!!icon && (
        <Flex
          css={{
            ...css,
            position: "absolute",
            top: "$16",
            left: isIconLeft ? "$16" : "undefined",
            right: isIconRight ? "$16" : "undefined",
          }}
        >
          {icon}
        </Flex>
      )}
      <Flex>
        <StyledInput
          id={id}
          placeholder=" "
          disabled={disabled}
          type={type}
          css={{
            height: "$56",
            width: "100%",
            borderColor: outlineColor[state ?? "default"],
            boxShadow: boxShadow[state ?? "default"],
            "&::placeholder": {
              color: disabled ? "$primaryBase" : "$primary300",
            },
            "&:focus": {
              "[data-state]": "focus",
              border: outlineFocus[state ?? "default"],
              boxShadow: boxShadowFocus[state ?? "default"],
            },
            "&:not(:placeholder-shown) ~ label": {
              transform: `scale(0.875) translateX(${
                icon && isIconLeft ? "0.5rem" : "0.1rem"
              }) translateY(-0.5rem)`,
            },
            color: "$primaryBase",
            "&:focus ~ label": {
              transform: `scale(0.875) translateX(${
                icon && isIconLeft ? "0.5rem" : "0.1rem"
              }) translateY(-0.5rem)`,
            },
            lineHeight: "$20",
            pt: "$28",
            pb: "$8",
            pl: icon && isIconLeft ? "$56" : "$16",
            pr: icon && iconPosition === "right" ? "$56" : "$16",
          }}
          {...values?.register(id)}
        />
        <Text
          as="label"
          htmlFor={id}
          css={{
            fontSize: "$16",
            p: "$16",
            pl: icon && isIconLeft ? "$57" : "$17",
            top: "0",
            lineHeight: "$24",
            color: "$primary300",
            position: "absolute",
            pointerEvents: "none",
            transformOrigin: "0 0",
            transition: "all .2s ease-in-out",
          }}
        >
          {placeholder}
        </Text>
      </Flex>
      {!!helperText && (helperText || state === "error") && (
        <Flex
          gap="4"
          align="center"
          css={{
            mt: "$8",
            "& svg": {
              height: "$16 !important",
              width: "$16 !important",
              color: "$dangerBase",
            },
          }}
        >
          {state === "error" && <InfoIcon />}
          <Text
            css={{
              color: state === "error" ? "$dangerBase" : "$primary300",
            }}
            hint
          >
            {helperText}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Input;
