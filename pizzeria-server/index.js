const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));

app.use("/user", require("./routes/user"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/pizza", require("./routes/pizza"));
app.use("/address", require("./routes/address"));
app.use("/card", require("./routes/card"));
//app.use("/order", require("./routes/order"));

app.all("*", (req, res) => {
  res.status(404);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
