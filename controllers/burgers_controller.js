const express = require("express");
const path = require("path");
const router = express.Router();
const burger = require("../models/burger.js");

function buildBurger(req) {
    return {
        id: req.params.id || req.body.id,
        burger_name: req.body.burger_name,
        devoured: req.body.devoured
    }
}

router.get("/", function(req, res) {
    burger.all(burgers => {
        const notEaten = burgers.filter(burger => !burger.devoured);
        const eaten = burgers.filter(burger => burger.devoured);
        res.render("index", {notEaten, eaten})
    });
});

router.post("/api/burgers", function(req, res) {
    burger.create(buildBurger(req), result => res.json(result));
});

router.put("/api/burgers/:id", function(req, res) {
    burger.update(buildBurger(req),  result => {
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