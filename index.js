//first we will import Socket IO at 8000 port 

const io = require('socket.io')(8000,{cors:{origin:'*',}})

//empty users object
const users = {};


//when user enter it gives conections

io.on('connection', socket=>{
    socket.on('new-user', name=>{
        //appendin users in object
        users[socket.id]= name;
        //sending user join message to all when user join
        socket.broadcast.emit('user-joined',name)
    })
    
    socket.on('send',msg=>{
        //sending user message to all when user send message
        socket.broadcast.emit('recive',{message:msg , name: users[socket.id]})
    })
    //sending user message to all when user disconnect 
    socket.on('disconnect',msg=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id]
    })
})

