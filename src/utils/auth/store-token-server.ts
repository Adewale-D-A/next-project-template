import { cookies } from "next/headers";
import Criptic from "@/utils/criptic";
import { cookieOptions } from "@/config/system/cookies-options";

const encrypt = new Criptic();
const authKey = process.env.AUTH_SESION_KEY || "";

export default async function storeTokenServer({ token }: { token: string }) {
  const cookieStore = await cookies();
  const strigifiedToken = JSON.stringify({
    token,
  });
  // encrypt token
  const encryptedToken = encrypt.encrypt(authKey, strigifiedToken);
  cookieStore.set(authKey, encryptedToken, cookieOptions);
}
