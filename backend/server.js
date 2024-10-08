import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import {app, server} from "./socket/socket.js"

import connectToMongoDB from "./db/connectToMongodb.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()) //to parse the incoming requests with json payloads (from req.body)
app.use(cookieParser())  //parse cookies to middleware

app.use("/api/auth",authRoutes);  
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"frontend", "dist", "index.html"))
})


// app.get("/", (req,res)=>{
//     //root route http://localhost:5000/
//     res.send("Hello world!!!")
// })

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server listen on port, ${PORT}`)
});