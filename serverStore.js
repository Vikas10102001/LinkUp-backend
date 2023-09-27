let io = null;
const connectedUser = new Map();

exports.setServerInstance = (ioInstance) => {
  io = ioInstance;
};

exports.getServerInstance = () => {
  return io;
};

exports.addConnectedUser = ({ socketId, userId }) => {
  connectedUser.set(socketId, { userId });
  console.log("New connected user : ", connectedUser);
};

exports.removeDisconnectedUser = (socketId) => {
  if (connectedUser.has(socketId)) {
    connectedUser.delete(socketId);
    console.log("User Disconnected , Active users : ", connectedUser);
  }
};
