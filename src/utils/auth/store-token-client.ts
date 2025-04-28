import Criptic from "@/utils/criptic";

const encrypt = new Criptic();
const authKey = process.env.NEXT_PUBLIC_AUTH_SESION_KEY || "";
export default function storeTokenClient({ token }: { token: string }) {
  const strigifiedToken = JSON.stringify({
    token,
  });
  // encrypt token
  const encryptedToken = encrypt.encrypt(authKey, strigifiedToken);
  if (typeof window !== "undefined") {
    localStorage.setItem(authKey, encryptedToken);
  }
}
