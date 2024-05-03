// HN ID (hnID), ชื่อ(fname) , นามสกุล(lname) , เบอร์โทร(telephone) , อีเมลล์ (email) , สถานะผู้ใช้ (status),slug(url)
const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    hnID: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, default: "Admin" },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tables", tableSchema);
