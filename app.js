const app = require("express")();
const fs = require("fs");
const PORT = process.env.PORT || 3001;

app.get("", (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`App up at port ${PORT}`);
});