const express = require("express");
const path = require("path");
const router = express.Router();
const burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.all(data => res.render("index", data));
});

router.post("/api/burgers", function(req, res) {
    burger.create(
        ["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured],
        result => res.json(result)
    );
});

router.put("/api/burgers/:id", function(req, res) {
    const burger = {
        burger_name: req.body.burger_name,
        devoured: req.body.devoured
    };
    burgers.update(burger, "id = " + req.body.id, result => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../" + req.url));
});

module.exports = router;