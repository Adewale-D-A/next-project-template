import Criptic from "@/utils/criptic";
import { cookies } from "next/headers";

const cryptographer = new Criptic();
const authKeyServer = process.env.AUTH_SESION_KEY || "";

export default async function extractTokenServer() {
  const cookieStore = await cookies();
  const authCredentials = cookieStore.get(authKeyServer)?.value;

  const decryptAuthCredentials = cryptographer.decrypt(
    authKeyServer,
    authCredentials
  );
  const { token } = JSON.parse(decryptAuthCredentials);
  return { token };
}
