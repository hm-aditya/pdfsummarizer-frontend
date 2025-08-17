import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData(); // receive file from frontend

  // forward this formData to your Express backend (running on port 5000)
  const res = await fetch("http://localhost:5000/summarize", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data);
}
