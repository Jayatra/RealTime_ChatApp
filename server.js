const express = require('express')
const app = express()
const http = require('http').createServer(app)



const PORT = process.env.PORT || 3000


http.listen(PORT,()=>{
    console.log(`Listening the port : ${PORT}`)
})


//getting all the details form .html,.css file
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html')
})



//socket setup
const io = require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log('connected')

    //now we will listen the client side message here
    socket.on('message',(msg)=>{
        console.log(msg)
        //here we have forward id msg to others who are connected to this server
        socket.broadcast.emit('message',msg)
    })
})