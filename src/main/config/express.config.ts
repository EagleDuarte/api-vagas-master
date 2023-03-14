const express = require('express');
const cors = require('cors');

exports.createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    return app;
};
