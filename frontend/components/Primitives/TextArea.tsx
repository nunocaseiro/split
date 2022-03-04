import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { styled } from "../../stitches.config";
import { boxShadow, boxShadowFocus } from "../../styles/colors/box-shadow.colors";
import { outlineColor, outlineFocus } from "../../styles/colors/outline.colors";
import isEmpty from "../../utils/isEmpty";
import Flex from "./Flex";
import Text from "./Text";
import InfoIcon from "./icons/info";

const StyledTextArea = styled("textarea", {
  // Reset
  appearance: "none",
  borderWidth: "0",
  boxSizing: "border-box",
  margin: "0",
  outlineOffset: "0",
  padding: "0",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },

  // Custom

  fontSize: "$16",
  lineHeight: "$20",
  resize: "none",
  height: "auto",
  px: "$16",
  py: "$16",
  boxShadow: "0",
  border: "1px solid $primary200",
  borderRadius: "$4",
  outline: "none",
  "&::-webkit-input-placeholder": {
    color: "$primary300",
  },
  "&:disabled": {
    backgroundColor: "$primary50",
  },
  fontFamily: "DM Sans",
  overflowWrap: "break-word",
  overflow: "hidden",
});

interface ResizableTextAreaProps {
  id: string;
  state?: "default" | "valid" | "error" | "disabled";
  placeholder: string;
  value: string;
  helperText?: string;
}

const TextArea: React.FC<ResizableTextAreaProps> = ({
  value,
  id,
  state,
  placeholder,
  helperText,
}) => {
  TextArea.defaultProps = {
    state: "default",
    value: "",
    helperText: undefined,
  };
  if (state !== "error" && !!helperText) helperText = undefined;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const flexRef = useRef<HTMLDivElement | null>(null);

  const values = useFormContext();
  const { ref, ...rest } = values?.register(id) || {};
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.value = value;
      textareaRef.current.style.height = "0px";
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = `${scrollHeight === 42 ? 0 : scrollHeight}px`;
    }
  }, [value]);
  return (
    <Flex
      ref={flexRef}
      direction="column"
      css={{ position: "relative", width: "100%", height: "auto", mb: "$20" }}
    >
      <Flex>
        <StyledTextArea
          id={id}
          disabled={state === "disabled"}
          ref={(e) => {
            if (ref) ref(e);
            textareaRef.current = e;
          }}
          {...rest}
          css={{
            fontWeight: "normal",
            width: "100%",
            borderColor: outlineColor[state ?? "default"],
            boxShadow: boxShadow[state ?? "default"],
            "&::placeholder": {
              color: state === "disabled" ? "$primaryBase" : "$primary300",
            },
            "&:focus": {
              border: outlineFocus[state ?? "default"],
              boxShadow: boxShadowFocus[state ?? "default"],
            },
            color: "$primaryBase",
            "&:focus ~ label": {
              transform: `scale(0.875) translateX(0.115rem) translateY(-0.5rem)`,
            },
            lineHeight: "20px",
            pt: "$28",
            pb: "$8",
            pl: "$16",
            pr: "$16",
          }}
        />
        <Text
          as="label"
          htmlFor={id}
          css={{
            fontSize: "$16",
            top: "0",
            p: "$16",
            pl: "$17",
            lineHeight: "24px",
            color: "$primary300",
            position: "absolute",
            pointerEvents: "none",
            transform: !isEmpty(value)
              ? `scale(0.875) translateX(0.115rem) translateY(-0.5rem)`
              : undefined,
            transformOrigin: "0 0",
            transition: "all .2s ease-in-out",
          }}
        >
          {placeholder}
        </Text>
      </Flex>
      {!!helperText && state === "error" && (
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
export default TextArea;
