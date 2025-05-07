import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
// import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  // const supabase = createClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  try {
    // if (!session) {
    //   return NextResponse.json({ success: false, data: [] }, { status: 400 });
    // }
    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get("placeId");
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: placeId,
          fields: "geometry",
          key: process.env.MAPS_API_KEY,
        },
      }
    );
    return NextResponse.json(
      { success: true, data: response.data?.result?.geometry?.location },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
