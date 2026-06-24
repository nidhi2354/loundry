const express = require("express");

const router = express.Router();


const authMiddleware = require("../middlewares/authMiddleware");



const roleMiddleware = require("../middlewares/roleMiddleware")


const upload = require("../middlewares/multer")

const {createBlog, getBlogs, getSingleBlog, deleteBlog, updateBlog} = require("../controllers/blogControllers")



router.post("/create",
  authMiddleware,
  roleMiddleware,
  upload.single("image"),
  createBlog);


router.get("/get",getBlogs);


router.get("/:id",getSingleBlog);


router.delete("/:id",authMiddleware,
  roleMiddleware,deleteBlog);


router.put("/update/:id",
  authMiddleware,
  roleMiddleware,
   upload.single("image"),
  updateBlog)

module.exports = router;

