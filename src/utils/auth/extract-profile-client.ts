import { AuthUser } from "@/types/auth";
import Criptic from "@/utils/criptic";

const cryptographer = new Criptic();
const authProfileKeyClient = process.env.NEXT_PUBLIC_AUTH_PROFILE_KEY || "";

export default function extractProfileClient() {
  if (typeof window !== "undefined") {
    const profileCredentials = localStorage.getItem(authProfileKeyClient) || "";
    const decryptProfileCredentials = cryptographer.decrypt(
      authProfileKeyClient,
      profileCredentials
    );
    const profileData = JSON.parse(decryptProfileCredentials);
    return profileData as AuthUser;
  } else {
    return {} as any;
  }
}
