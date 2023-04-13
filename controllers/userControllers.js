const { User, Thought } = require("../models");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getSingleUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");
      if (!user) {
        res.status(404).json({ message: "No user associated with that ID" });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user associated with that ID" });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        res.status(404).json({ message: "No user associated with that ID" });
      } else {
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: "Both thought and user has been delted" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user associated with that ID" });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user associated with that ID" });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
