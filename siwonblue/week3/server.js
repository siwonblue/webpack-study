const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("server connected");
});

app.get("/api", (req, res) => {
  res.send("message from server");
});

app.post("/api/test", (req, res) => {
  const body = req.body;
  res.send({
    ok: true,
    message: "hello webpack test",
    body,
  });
});
app.listen(3065, () => console.log("express server is listening on PORT 3065"));
