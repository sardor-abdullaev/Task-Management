const { connectDB } = require("./helpers/db");

connectDB();

require("./message");
require("./query");
