import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

let socket = io();
let form = document.getElementById("form");
let formnick = document.getElementById("form2");
let input = document.getElementById("input");
let inputnick = document.getElementById("inputnick");

formnick.addEventListener("submit", function (e) {
    e.preventDefault();
    if (inputnick.value) {
        socket.emit("set nick", inputnick.value);
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", input.value);
        input.value = "";
    }
});

const messages = document.getElementById("messages");
socket.on("chat message", function(msg) {
    console.log("chegou uma msg " + msg)
    var item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});