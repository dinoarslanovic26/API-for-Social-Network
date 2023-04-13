const router = require("express").Router();
const userControllers = require("../../controllers/userControllers");

router.route("/")
  .get(userControllers.getUsers)
  .post(userControllers.createUser);

router.route("/:userId")
  .get(userControllers.getSingleUser)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

router.route("/:userId/friends/:friendId")
  .post(userControllers.addFriend)
  .delete(userControllers.deleteFriend);

module.exports = router;
