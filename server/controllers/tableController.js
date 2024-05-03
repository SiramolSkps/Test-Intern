// ติดต่อกับฐานข้อมูล
const slugify = require("slugify");
const Tables = require("../models/table");
// บันทึกข้อมูล
exports.create = (req, res) => {
  const { hnID, firstname, lastname, telephone, email, status } = req.body;
  const slug = slugify(hnID);

  switch (true) {
    case !hnID:
      return res.status(400).json({ error: "กรุณาป้อน HN ID" });
    case !firstname:
      return res.status(400).json({ error: "กรุณาป้อนชื่อ" });
    case !lastname:
      return res.status(400).json({ error: "กรุณาป้อนนามสกุล" });
    case !telephone:
      return res.status(400).json({ error: "กรุณาป้อนเบอร์ติดต่อ" });
    case !email:
      return res.status(400).json({ error: "กรุณาป้อนอีเมลล์" });
  }
  Tables.create(
    { hnID, firstname, lastname, telephone, email, status, slug },
    (err, table) => {
      if (err) {
        res.status(400).json({ error: "มี HN ID นี้ในระบบแล้ว" });
      }
      res.json(table);
    }
  );
};

// ดึงข้อมูลบัญชีทั้งหมด
exports.getAllUsers = (req, res) => {
  Tables.find({}).exec((err, users) => {
    res.json(users);
  });
};

// ดึงผู้ใช้ที่สนใจอ้างอิงตาม slug
exports.singleUser = (req, res) => {
  const { slug } = req.params;
  Tables.findOne({ slug }).exec((err, user) => {
    res.json(user);
  });
};

exports.remove = (req, res) => {
  const { slug } = req.params;
  Tables.findOneAndRemove({ slug }).exec((err, user) => {
    if (err) console.log(err);
    res.json(`Delete user HN:${slug} successfully!`);
  });
};

exports.update = (req, res) => {
  const { slug } = req.params;
  // ส่งข้อมูล => hnID, firstname, lastname, telephone, email
  const { hnID, firstname, lastname, telephone, email, status } = req.body;
  Tables.findOneAndUpdate(
    { slug },
    { hnID, firstname, lastname, telephone, email, status },
    { new: true }
  ).exec((err, user) => {
    if (err) console.log(err);
    res.json(user);
  });
};

