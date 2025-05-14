const express = require("express");
const mainRouter = require('./routes/index');

const cors = require('cors');
const bodyParser = require('body-parser');
//const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json()); 


app.use("/api/v1", mainRouter);
//app.use('/api/payments', paymentRoutes);



app.listen(3000, () => {
    console.log("listening on port 3000");
});