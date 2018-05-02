var express = require ('express');
var app  = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola', function(req,res){
    res.status(200).send('Hola mundo desde una ruta');
});

var  messages = [{
    id:1,
    text:'Bienvenido la chat privado de Socket.io y node js',
    nickname: 'Victor Percy Tataje Guzman' 
}];

io.on('connection',function(socket){
    console.log('El nodo con ip:' + socket.handshake.address+ "se ha conectado");
    socket.emit('messages',messages);
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages',messages);
    });
});

server.listen(6677, function (){
    console.log('esta funcionando esta wada');
});


