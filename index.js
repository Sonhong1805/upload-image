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
    const { image } = req.files;
    console.log("image:" + image[0]?.path);
    // console.log("images:" + req.files.images?.map((file) => file.path));

    res.status(200).json({
      success: true,
      message: "upload image successfully",
      image: image[0]?.path,
    });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
