const express = require("express");
const path = require("path");
const connection = require("./database");
const app = express()

// Serve all files in your project folder
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
