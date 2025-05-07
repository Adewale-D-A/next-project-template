import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const input = searchParams.get("input") || "";
    // const components = "country:NG"; // Restrict to Nigeria

    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          input: input,
          // bounds,
          // radius,
          // location,
          // components,
          key: process.env.MAPS_API_KEY,
        },
      }
    );
    return NextResponse.json(
      { success: true, data: response?.data?.predictions || [] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
