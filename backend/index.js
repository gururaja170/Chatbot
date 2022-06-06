const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/dbMongo")();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
