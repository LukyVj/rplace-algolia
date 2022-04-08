import { Server } from "socket.io";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    let clientsCount = 0;
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.sockets.on("connection", function (socket) {
      var clients = io.sockets.server.engine.clientsCount;
      console.log("clients: " + clients);
      clientsCount = clients;
    });

    res.send({ clientsCount });
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
