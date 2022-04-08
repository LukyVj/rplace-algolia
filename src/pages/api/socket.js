import { Server } from "socket.io";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    var count = 0;

    var $ipsConnected = [];
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", function (socket) {
      var $ipAddress = socket.handshake.address;

      if (!$ipsConnected.hasOwnProperty($ipAddress)) {
        $ipsConnected[$ipAddress] = 1;

        count++;

        socket.emit("counter", { count: count });
      }

      console.log("client is connected");

      /* Disconnect socket */

      socket.on("disconnect", function () {
        if ($ipsConnected.hasOwnProperty($ipAddress)) {
          delete $ipsConnected[$ipAddress];

          count--;

          socket.emit("counter", { count: count });
        }
      });
    });
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
