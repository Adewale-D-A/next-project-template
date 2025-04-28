import { NextRequest, NextResponse } from "next/server";
import storeTokenServer from "@/utils/auth/store-token-server";
import storeProfileServer from "@/utils/auth/store-profile-server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, profile } = body;
  // STEP 1: VALIDATE REQUEST BODY
  if (!token || !profile) {
    return NextResponse.json(
      {
        success: false,
        message: "request body is incomplete, token and profile is required",
      },
      { status: 400 }
    );
  }
  try {
    await cookies();
    // STEP 2: STORE SERVER SIDE TOKEN
    storeTokenServer({ token: token?.access_token });
    // STEP 3: STORE SERVER SIDE PROFILE
    storeProfileServer({ profile });
    return NextResponse.json(
      { success: true, message: "okay" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
}
