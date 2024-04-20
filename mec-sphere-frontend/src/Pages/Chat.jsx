// Accept chat request
router.put("/accept-chat/:id", async (req, res) => {
    const { id } = req.params;
    const friendId = req.body.friendId;
  
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (!user.friends.includes(friendId)) {
        return res.status(400).json({ error: "User is not in your friend list" });
      }
  
      // You can implement further logic here for handling chat requests
  
      res.json({ message: "Chat request accepted successfully" });
    } catch (err) {
      next(err);
    }
  });
  