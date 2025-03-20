const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const queryTestRouter = require("./routes/queryTest");
const aiSuggestRouter = require("./routes/aiSuggest");
const explainRouter = require("./routes/explain");


const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/query", queryTestRouter);
app.use("/api/suggest", aiSuggestRouter);
app.use("/api/explain", explainRouter);

app.listen(3000, () => {
    console.log("SQL Performance Tool running on http://localhost:3000");
});