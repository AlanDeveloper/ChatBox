import express from "express";
import http from "http";
import { Server } from "socket.io";
import routes from "./src/routes/index.js";
import init from "./src/websocket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "src/views");

init(io);

app.use("/", routes);

server.listen(3000, () => {
    console.log("listening on *:3000");
});