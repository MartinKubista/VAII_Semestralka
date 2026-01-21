const pool = require("./db");
const fs = require("fs");
const path = require("path");


const uploadsCarDir = "uploads";
//AI
async function getDbImages() {
  const [rows] = await pool.query("SELECT image_path FROM images");

  return rows.map(row => path.basename(row.image_path));
}

function getUploadFiles() {
  const uploadDir = path.join(__dirname, "uploads");
  return fs.readdirSync(uploadDir);
}

async function cleanupUnusedCarImages() {
  const uploadDir = path.join(__dirname, "uploads");

  const dbFiles = await getDbImages();
  const uploadFiles = getUploadFiles();

  for (const file of uploadFiles) {
    if (!dbFiles.includes(file)) {
      const filePath = path.join(uploadDir, file);

      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
        console.log("Zmazané:", file);
      }
    }
  }
}

module.exports = { cleanupUnusedCarImages};