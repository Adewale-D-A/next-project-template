const authProfileKey = process.env.AUTH_PROFILE_KEY || "";
const authKey = process.env.AUTH_SESION_KEY || "";
import { cookies } from "next/headers";

export default async function signOutServer() {
  const cookieStore = await cookies();

  cookieStore.delete(authProfileKey);
  cookieStore.delete(authKey);
}
