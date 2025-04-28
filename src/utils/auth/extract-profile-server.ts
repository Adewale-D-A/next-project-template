import { cookies } from "next/headers";
import Criptic from "@/utils/criptic";
import { AuthUser } from "@/types/auth";

const cryptographer = new Criptic();
const authProfileKeyServer = process.env.AUTH_PROFILE_KEY || "";

export default async function extractProfileServer() {
  const cookieStore = await cookies();
  const profileCredentials = cookieStore.get(authProfileKeyServer)?.value;
  const decryptProfileCredentials = cryptographer.decrypt(
    authProfileKeyServer,
    profileCredentials
  );
  const profileData = JSON.parse(decryptProfileCredentials);
  return profileData as AuthUser;
}
