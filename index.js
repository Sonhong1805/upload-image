const express = require("express");
const app = express();
const port = process.env.PORT || 3100;
const cors = require("cors");
const logger = require("morgan");
const upload = require("./uploadCloudinary");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.post(
  "/upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  (req, res) => {
    if (req.files && req.files.image && req.files.image.length > 0) {
      const imagePath = req.files.image[0]?.path;
      if (imagePath) {
        res.status(200).json({
          success: true,
          message: "Upload image successfully",
          image: imagePath,
        });
      }
    } else {
      res.status(200).json({
        success: true,
        message: "No image uploaded",
        image: "",
      });
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
