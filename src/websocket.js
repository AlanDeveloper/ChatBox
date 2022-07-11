let online = [];

const init = (io) => {

    io.on('connection', (socket) => {
        socket.client.nick = socket.client.id;
        console.log('a user connected');
        online.push(socket.client.nick);

        io.emit('update users', online);

        io.emit('chat message', socket.client.nick + " se conectou");

        socket.on('chat message', (msg) => {
            console.log('sid: ' + socket.client.id + '\tmessage: ' + msg);
            io.emit('chat message', socket.client.nick + " disse: " + msg);
        });

        socket.on('set nick', (msg) => {
            const oldNick = socket.client.nick;
            for (let i = 0; i < online.length; i++) {
                if (online[i] == oldNick) {
                    online[i] = msg;
                }
            }
            io.emit('chat message', `${oldNick} trocou seu nome para ${msg}`);
            io.emit('update users', online);
            socket.client.nick = msg;
        })

        socket.on('disconnect', () => {
            online = online.filter(id => id != socket.client.nick);
            console.log('user disconnected');
            io.emit('update users', online);
            io.emit('chat message', socket.client.nick + " se desconectou");
        });
    });
}

export default init;