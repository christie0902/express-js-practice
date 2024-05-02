const express = require("express");
const blogControllers = require("../controllers/blogControllers");
const router = express.Router();

router.get("/", blogControllers.blog_index);
router.get("/create", blogControllers.blog_create_get);
router.post("/", blogControllers.blog_create_post);
router.get("/:id", blogControllers.blog_details);
router.delete("/:id", blogControllers.blog_delete);

module.exports = router;
