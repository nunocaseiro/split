import * as z from "zod";

const SchemaEmailForm = z.object({
  email: z.string().nonempty("Please insert your email.").email("This email is not valid."),
});

export default SchemaEmailForm;
