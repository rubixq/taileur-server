const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api_routes");

dotenv.config();

mongoose.connect(`mongodb://${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on("error", (error) => {
    console.log("failed connecting to database", error);
    process.exit(1);
});
db.once("open", () => {
    console.log("successfully connected to database")
});

app = express();

app.use(cors());
app.use(express.json({
    inflate: true,
    limit: '100kb',
    strict: true,
    type: "application/json",
    verify: undefined
}));
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`server is listening on ${port}`);
});