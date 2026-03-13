const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

// create uploads folder if not exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  }
});

const upload = multer({ storage: storage });

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// upload API
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("Image uploaded");
  res.send("Image received");
});

app.get("/", (req, res) => {
  res.send("Animal Intrusion Detection Server Running");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
