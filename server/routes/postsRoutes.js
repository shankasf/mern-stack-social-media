const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { handleUpload } = require("../middleware/uploadMiddleware");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
} = require("../controllers/postsController");

const router = express.Router();

// All routes are protected
router.use(protect);

// Post routes
router.route("/").post(handleUpload, createPost).get(getPosts);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);
router.put("/:id/like", likePost);
router.post("/:id/comments", addComment);

module.exports = router;
