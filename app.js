const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');

const chatRouter = require('./routes/chat.routes');
const configureSocket = require('./socketConfig');

const app = express();
const server = http.createServer(app);
const io = configureSocket(server);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.set('io', io);

app.use('/api/v1/messages', chatRouter);

app.use((req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server ☠`, 404));
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: err.message,
  });
});

module.exports = { app, server };
