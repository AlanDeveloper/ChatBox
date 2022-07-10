const init = (io) => {

    io.on('connection', (socket) => {
        socket.client.nick = socket.client.id;
        console.log('a user connected');

        socket.on('chat message', (msg) => {
            console.log('sid: ' + socket.client.id + '\tmessage: ' + msg);
            io.emit('chat message', socket.client.nick + " disse: " + msg);
        });

        socket.on('set nick', (msg) => {
            const oldNick = socket.client.nick
            io.emit('chat message', `${oldNick} trocou seu nome para ${msg}`);
            socket.client.nick = msg;
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}

export default init;