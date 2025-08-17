import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const axiosFormData = new FormData();
    axiosFormData.append("file", buffer, file.name);

    // Make sure the port matches your Express backend
    const res = await axios.post("http://localhost:5000/summarize", axiosFormData, {
      headers: axiosFormData.getHeaders(),
      timeout: 10000, // 10 seconds
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Upload failed:", err);

    // Provide meaningful error details
    const details =
      err.response?.data ||
      err.message ||
      "No response from backend (check if Express is running on the correct port)";

    return NextResponse.json(
      { error: "Failed to process file", details },
      { status: 500 }
    );
  }
}
