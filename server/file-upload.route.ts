import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

export function onFileupload(req: Request, res: Response) {
  // Check if files exist and thumbnail is present
  if (!req["files"] || !req["files"].thumbnail) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  let file = req["files"].thumbnail;

  // Handle both single file and array of files
  const uploadedFile = Array.isArray(file) ? file[0] : (file as UploadedFile);

  console.log("File uploaded: ", uploadedFile.name);

  setTimeout(() => {
    res.status(200).json({ message: "File uploaded successfully." });
  }, 2000);
}
