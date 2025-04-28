import Criptic from "@/utils/criptic";

const cryptographer = new Criptic();
const authKeyClient = process.env.NEXT_PUBLIC_AUTH_SESION_KEY || "";

export default function extractTokenClient() {
  if (typeof window !== "undefined") {
    const authCredentials = localStorage.getItem(authKeyClient) || "";
    const decryptAuthCredentials = cryptographer.decrypt(
      authKeyClient,
      authCredentials
    );
    const { token } = JSON.parse(decryptAuthCredentials);
    return { token };
  } else {
    return {};
  }
}
