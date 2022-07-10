import express from "express";

const routes = express.Router();

routes.get("/", function (req, res) {
    return res.render("index");
});

// NOT FOUND
routes.use(function (req, res) {
    return res.render("404");
});

export default routes;
