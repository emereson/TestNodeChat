const Chat = require('../models/chat.model');

exports.findAll = async (req, res) => {
  try {
    const limit = req.query.limit || 10;

    const chats = await Chat.findAll({
      order: [['id', 'ASC']],
      limit: parseInt(limit),
    });

    res.status(200).json({
      status: 'success',
      message: 'Mensajes obtenidos correctamente',
      results: chats.length,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener los mensajes',
      error: error.message,
    });
  }
};

exports.create = async (req, res) => {
  const { name, message } = req.body;
  const io = req.app.get('io');
  try {
    const chat = await Chat.create({
      name,
      message,
    });

    io.emit('chat', chat);

    res.status(201).json({
      status: 'success',
      message: 'Mensaje creado correctamente',
      chat,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al crear el mensaje',
      error: error.message,
    });
  }
};
