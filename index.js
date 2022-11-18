const express = require("express");
const cors = require('cors')
//const routes = require('./routes/routes')
//require("dotenv").config();
const dbConnect = require('./mysql');
const app = express();
const PORT = process.env.PORT;
app.use(cors())
app.use(express.json())

    
const profile = require('./routes/profile');
const productdet = require('./routes/productdet')
app.use('/profile',profile);  
app.use('/productdet',productdet);      

app.listen(3000, () => {
  console.log(`server running at 127.0.0.1:${PORT}`);
});