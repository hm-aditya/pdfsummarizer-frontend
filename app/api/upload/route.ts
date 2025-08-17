import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Build axios FormData
    const axiosFormData = new FormData();
    axiosFormData.append("file", buffer, file.name);

    // Send to Express backend
    const res = await axios.post("http://localhost:5000/summarize", axiosFormData, {
      headers: axiosFormData.getHeaders(),
      timeout: 10000,
    });

    return NextResponse.json(res.data);
  } catch (error: unknown) {
    console.error("Upload failed:", error);

    let details: string;
    if (axios.isAxiosError(error)) {
      details =
        (error.response?.data as string) ??
        error.message ??
        "No response from backend (check if Express is running)";
    } else if (error instanceof Error) {
      details = error.message;
    } else {
      details = "Unknown error occurred";
    }

    return NextResponse.json(
      { error: "Failed to process file", details },
      { status: 500 }
    );
  }
}
