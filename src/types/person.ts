import { z } from "zod";

const ZodPerson = z.object({
    name: z.string(),
    prompt: z.string(),
  });
  
  export default ZodPerson;
  export type Person = z.infer<typeof ZodPerson>;
