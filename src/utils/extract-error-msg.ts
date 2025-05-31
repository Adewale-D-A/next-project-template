export default function extractErrMssg(data: {
  message: any;
  status: string;
  errors: { type: string; msg: string }[];
  data: { message: any };
}) {
  const values =
    typeof data?.errors === "object"
      ? Object.values(data?.errors?.map((item) => item?.msg)).join(", ")
      : typeof data?.data?.message === "object"
      ? Object.values(data?.data?.message).join(", ")
      : data?.message || data?.status;
  return values || "Please try again later";
}
