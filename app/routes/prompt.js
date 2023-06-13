const express = require("express");
const router = express.Router();

//for importing images from public
router.use(express.static("public"));

//routes for other pages
router.get("/home", (req, res, next) => {
    res.render("home");
  });

router.get("/about", (req, res, next) => {
    res.render("about");
  });

  router.get("/faq", (req, res, next) => {
    res.render("faq");
  });

  router.get("/team", (req, res, next) => {
    res.render("team");
  });

  router.get("/lead", (req, res, next) => {
    res.render("lead");
  });

  module.exports = router;