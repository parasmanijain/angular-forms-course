import express, { Application } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { getAllCourses, getCourseById } from "./get-courses.route";
import { searchLessons } from "./search-lessons.route";
import { getCourseCategories } from "./course-categories.route";
import { onFileupload } from "./file-upload.route";
import { AddressInfo } from "net";

const app: Application = express();

app.use(cors({ origin: true }));

app.use(fileUpload());

app.route("/api/courses").get(getAllCourses);

app.route("/api/courses/:id").get(getCourseById);

app.route("/api/lessons").get(searchLessons);

app.route("/api/course-categories").get(getCourseCategories);

app.route("/api/thumbnail-upload").post(onFileupload);

const httpServer = app.listen(9000, () => {
  const address = httpServer.address();
  if (address && typeof address === "object") {
    console.log(
      "HTTP REST API Server running at http://localhost:" + address.port,
    );
  } else {
    console.log("HTTP REST API Server running at http://localhost:9000");
  }
});

httpServer.on("error", (error: any) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      "Port 9000 is already in use. Please close other applications using this port or change the port number.",
    );
  } else {
    console.error("Server error:", error);
  }
  process.exit(1);
});
