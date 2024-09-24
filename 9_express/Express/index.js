const express = require("express")

const app = express();

app.get("/", (req, res) => {
   res.send("Hello world!!")
})

app.listen(4455, () => {
   console.log("Linsteing in 4455")
})