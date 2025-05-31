import { z } from "zod";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/config/system/constants";
interface FileExtension extends File {
  preview: string;
}
export const phoneNumberSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .min(11, "Phone number should be atleast 11 numbers")
  .regex(
    /^(\+234|234|0)(701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|908|901|902|903|904|905|906|907|911|912|913|915|916|917)([0-9]{7})$/,
    { message: "Phone number is invalid" }
  );

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");
// .regex(/[@$!%*?&#]/, "Password must contain at least one special character");

export const imageFileUpload = z
  .any()
  .refine(
    (file: FileExtension) => file.name || file?.preview,
    "Logo is required"
  )
  .refine(
    (file: FileExtension) => file?.size <= MAX_FILE_SIZE || file?.preview,
    `Max file size is 5MB.`
  )
  .refine(
    (file: FileExtension) =>
      ACCEPTED_FILE_TYPES.includes(file?.type) || file?.preview,
    "Only .jpeg, .jpg, .png, and .webp formats are supported."
  )
  .optional();

export const generateHexCode = () => {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
};
