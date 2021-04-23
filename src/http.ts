import express from 'express'
import "./database"
import { routes } from "./routes"
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import path from "path"

const app = express();

app.use(express.json());
app.use(routes);
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (req, res) => {
    return res.render("html/client.html");
})


const http = createServer(app); // Criando protocolo HTTP
const io = new Server(http); // Criando protocolo WebSocket

io.on("connection", (socket: Socket) => { }/* console.log("Connection made", socket.id) */);

export { http, io }