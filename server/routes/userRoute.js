const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/authMiddleware");

router.post("/sign", async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      email: email,
      name: name,
      password: hash,
    });

    await newUser.save();
    console.log(name);
    res.json({ msg: "User Created" });
  } catch (err) {
    // Pass the error to the next middleware for centralized error handling
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.json({ error: "User Doesn't Exist" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ error: "Wrong Username And Password Combination" });
    }

    const accessToken = sign(
      { email: user.email, id: user.id, name: user.name },
      "shhhhh its a secret"
    );

    res.json({
      token: accessToken,
      name: user.name,
      id: user.id,
      gmail: user.email,
    });
  } catch (err) {
    // Pass the error to the next middleware for centralized error handling
    next(err);
  }
});

// to check if the user is already logged in
router.get("/logcheck", validateToken, (req, res) => {
  res.json(req.user);
});

//to update
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    next(err);
  }
});
// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = router;