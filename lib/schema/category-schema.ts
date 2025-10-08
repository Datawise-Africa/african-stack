import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const categorySchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(80, { message: "Title must be 80 characters or fewer." }),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description must be 500 characters or fewer." })
    .optional()
    .or(z.literal("")),
  thumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid URL." })
    .optional()
    .or(z.literal("")),
});

export const categoryFormResolver = zodResolver(categorySchema);
export type CategoryFormValues = z.infer<typeof categorySchema>;
