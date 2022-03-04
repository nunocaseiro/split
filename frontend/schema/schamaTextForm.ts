import * as z from "zod";

const SchemaTextForm = z.object({
  text: z.string().nonempty("Please insert text."),
});

export default SchemaTextForm;
