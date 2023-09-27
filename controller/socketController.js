const { addConnectedUser } = require("../serverStore");

exports.newConnectionHandler = (socket) => {
  addConnectedUser({ socketId: socket.id, userId: socket.user.id });
};
