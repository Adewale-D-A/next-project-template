import { AuthUser } from "@/types/auth";
import Criptic from "@/utils/criptic";

const cryptographer = new Criptic();
const authProfileKey = process.env.NEXT_PUBLIC_AUTH_PROFILE_KEY || "";

export default function storeProfileClient({ profile }: { profile: AuthUser }) {
  const strigifiedProfile = JSON.stringify(profile);
  const encryptedProfile = cryptographer.encrypt(
    authProfileKey,
    strigifiedProfile
  );

  if (typeof window !== "undefined") {
    localStorage.setItem(authProfileKey, encryptedProfile);
  }
}
