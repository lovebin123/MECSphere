const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/authMiddleware");

router.get("/", async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/sign", async (req, res, next) => {
  const { email, password, name, role } = req.body;

  try {
    // Check if user with the given email already exists
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      // User already exists, send an error response
      return res.status(400).json({ error: "User already exists" });
    }

    // If user doesn't exist, hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      email: email,
      name: name,
      role: role,
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
      role: user.role,
      id: user.id,
      email: user.email,
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
// Send friend request
router.post("/add-friend/:id", async (req, res) => {
  const { id } = req.params;
  const friendId = req.body.friendId;

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.friends.push(friendId);
    await user.save();

    res.json({ message: "Friend request sent successfully" });
  } catch (err) {
    next(err);
  }
});

router.post("/friends", async (req, res, next) => {
  const { id } = req.body;

  try {
    const user = await userModel.findById(id);
    if (!user) {  
      return res.status(404).json({ error: "User not found" });
    } 
    
    // Find the friends of the user
    const friends = await userModel.find({ _id: { $in: user.friends } });

    return res.json(friends);
  } catch (err) {
    next(err);
  }
});

router.post("/request", async (req, res, next) => {
  try {
    const { userid, friendid } = req.body;

    const user = await userModel.findById(userid);

    const friend = await userModel.findById(friendid);

    // Check if the user has already sent a request to this friend
    const existingRequest = friend.requests.find(
      (request) => request.id === userid
    );

    if (existingRequest) {
      // User has already sent a request to this friend
      return res.json({
        error: "You have already sent a request to this User.",
      });
    }

    // Check if the friend has already received a request from this user
    const existingReceivedRequest = user.requests.find(
      (request) => request.id === friendid
    );

    if (existingReceivedRequest) {
      // Friend has already received a request from this user
      return res.json({
        error: "You have already received a request from this User.",
      });
    }

    // Add the request to the friend
    friend.requests.push({
      accepted: false,
      name: user.name,
      status: "pending",
      id: userid,
    });

    await friend.save();

  
    await user.save();

    res.json({ friend: friend });
  } catch (error) {
    next(error);
  }
});

router.post("/chatrequest", async (req, res, next) => {
  try {
    const { userid, friendid } = req.body;

    const user = await userModel.findById(userid);

    const friend = await userModel.findById(friendid);

    // Check if the user has already sent a request to this friend
    const existingRequest = friend.chatRequests.find(
      (request) => request.id === userid
    );

    if (existingRequest) {
      // User has already sent a request to this friend
      return res.json({
        error: "You have already sent a request to this User.",
      });
    }

    // Check if the friend has already received a request from this user
    const existingReceivedRequest = user.requests.find(
      (request) => request.id === friendid
    );

    if (existingReceivedRequest) {
      // Friend has already received a request from this user
      return res.json({
        error: "You have already received a request from this User.",
      });
    }

    // Add the request to the friend
    friend.chatRequests.push({
      name: user.name,
      id: userid,
    });

    await friend.save();

    res.json({ friend: friend });
  } catch (error) {
    next(error);
  }
});

router.post("/requests", async (req, res, next) => {
  try {
    const { id } = req.body;

    const user = await userModel.findById(id).catch(() => {
      console.log("cant find team");
    });

    res.json(user.requests);
  } catch (error) {
    next(error);
  }
});

router.post("/chatrequests", async (req, res, next) => {
  try {
    const { id } = req.body;

    const user = await userModel.findById(id).catch(() => {
      console.log("cant find user");
    });

    res.json(user.chatRequests);
  } catch (error) {
    next(error);
  }
});

router.post("/rejectrequest", async (req, res, next) => {
  try {
    const {  requestid, userid } = req.body;

    const user = await userModel.findById(userid);

    console.log(user.requests);

    user.requests = user.requests.filter((request) => request.id !== requestid);
    
    await user.save();

    res.json(user.requests);
  } catch (error) {
    next(error);
  }
});

router.post("/acceptrequest", async (req, res, next) => {
  try {
    const { userid, requestid } = req.body;

    const friend = await userModel.findById(requestid);
    const user = await userModel.findById(userid);

    user.friends.push(requestid);
    friend.friends.push(userid);
    

    user.requests = user.requests.filter((request) => request.id !== requestid);
    


    await friend.save();
    await user.save();

    res.json(user.requests);
  } catch (error) {
    next(error);
  }
});



// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = router;
