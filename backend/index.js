express = require("express");
const Student = require("./models/Student");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const multer = require("multer");
const { request, response } = require("express");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const PORT = 3005;

// mongodb connection

mongoose
  .connect(
    "mongodb+srv://Adhii:Adithyankunju@cluster0.7cz3nfc.mongodb.net/collage?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post("/new", (req, res) => {
//   const user = Student(req.body);
//   user.save().then(() => {
//     res.send("Record Saved");
//   });
// });
app.post("/new", upload.single("image1"), async (request, response) => {
  try {
    const { admissionno, Name, age, course } = request.body;
    const newdata = new Studentmodel({
      admissionno,
      Name,
      age,
      course,
      image1: {
        data: request.file.buffer,
        contentType: request.file.mimetype,
      },
    });
    await newdata.save();
    response.status(200).json({ message: "Record saved" });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

app.get("/view", (req, res) => {
  Student.find().then((data) => {
    res.json(data);
  });
});

app.put("/edit/:id", (req, res) => {
  id = req.params.id;

  Student.findByIdAndUpdate(id, req.body).then(() => {
    res.send("update successfully");
  });
});

app.listen(PORT, () => {
  console.log(`Server Running on port:${PORT}`);
});
