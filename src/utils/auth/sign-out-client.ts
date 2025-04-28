const authProfileKey = process.env.NEXT_PUBLIC_AUTH_PROFILE_KEY || "";
const authKey = process.env.NEXT_PUBLIC_AUTH_SESION_KEY || "";

export default function signOutClient(redirect?: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(authProfileKey);
    localStorage.removeItem(authKey);
  }
}
