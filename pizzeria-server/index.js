const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", require("./routes/user"));
app.use("/pizza", require("./routes/pizza"));
//app.use("/order", require("./routes/order"));

app.all("*", (req, res) => {
  res.status(404);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
