const express = require("express");
const dotenv = require("dotenv").config();
const detailsRoutes = require('./detailsRoutes');
const connectDB = require("./mongoconn");
const bodyParser = require('body-parser');

const cors = require('cors');

const app= express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(cors());
app.use(express.json());

connectDB();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.urlencoded({ extended: true }));

app.use('/api/details', detailsRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});