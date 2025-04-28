import { cookies } from "next/headers";
import Criptic from "@/utils/criptic";
import { cookieOptions } from "@/config/system/cookies-options";
import { AuthUser } from "@/types/auth";

const cryptographer = new Criptic();
const authProfileKey = process.env.AUTH_PROFILE_KEY || "";

export default async function storeProfileServer({
  profile,
}: {
  profile: AuthUser;
}) {
  const cookieStore = await cookies();
  const strigifiedProfile = JSON.stringify(profile);
  const encryptedProfile = cryptographer.encrypt(
    authProfileKey,
    strigifiedProfile
  );

  cookieStore.set(authProfileKey, encryptedProfile, cookieOptions);
}
