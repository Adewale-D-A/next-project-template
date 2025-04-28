import { NextRequest, NextResponse } from "next/server";
import signOutServer from "@/utils/auth/sign-out-server";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  try {
    await cookies();
    signOutServer();
    return NextResponse.json(
      { success: true, message: "Session safely cleared" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
}
