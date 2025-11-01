const express  = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');

const AuthRouter = require("./Routes/AuthRoute.js");
const ProductRouter = require('./Routes/ProductRoute.js');

// mongodb connection
require ("./Models/db.js");

const app = express();
const PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter );
app.use("/products", ProductRouter );

app.listen(PORT, () => console.log(`Server started at ${PORT}`));