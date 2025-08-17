export async function uploadAndSummarize(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/summarize", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to summarize PDF");
  }

  const data = await res.json();
  return data.summary;
}
