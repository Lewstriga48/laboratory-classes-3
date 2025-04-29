const express = require("express");
const router = express.Router();

const { MENU_LINKS } = require("../constants/navigation");

router.get("/", (_req, res) => {
  res.render("home", {
    headTitle: "Shop – Home",
    path: "/",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/",
  });
});

module.exports = router;
