import type { NextPage } from "next";
import Button from "../components/Primitives/Button";
import Text from "../components/Primitives/Text";
import Flex from "../components/Primitives/Flex";
import Input from "../components/Primitives/Input";
import MagnifyingGlass from "../components/Primitives/icons/magnifyingGlass";
import TextArea from "../components/Primitives/TextArea";
import Select from "../components/Primitives/Select";
import Checkbox from "../components/Primitives/Checkbox";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Home: NextPage = () => {
  const methods = useForm<{ i1: string; ta1: string }>({
    mode: "onChange",
    reValidateMode: "onChange",
    // resolver: zodResolver(
    //   z.object({
    //     i1: z.string().nonempty("Please insert text."),
    //     ta1: z.string().nonempty("Please insert text."),
    //   })
    // ),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;
  return (
    <Flex gap="8" direction="column">
      <FormProvider {...methods}>
        <Text>Divide and conquer</Text>
        <Button state="dangerOutline" size="lg">
          TTTT
        </Button>

        <Input
          id="i1"
          type="text"
          placeholder="TextField"
          iconPosition="left"
          icon={<MagnifyingGlass />}
        />

        <TextArea placeholder="TextField" state="error" helperText="Text" value="" id="TA" />

        <Select values={["ola", "bois"]} label="HEYO" variant="default" isCheckBox />

        <Checkbox id="c1" label="Label" size="12" checked={"indeterminate"} variant="error" />
      </FormProvider>
    </Flex>
  );
};

export default Home;
