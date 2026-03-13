const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

/* Create uploads folder if not exists */
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

/* Storage config */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "latest.jpg"); // overwrite latest image
  }
});

const upload = multer({ storage: storage });

/* Allow frontend access */
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

/* Upload API */
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("Image received from device");
  res.json({ status: "uploaded" });
});

/* API to get latest image */
app.get("/latest", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads/latest.jpg"));
});

/* Root route */
app.get("/", (req, res) => {
  res.send("Animal Intrusion Detection API Running");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
