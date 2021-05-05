const express = require('express')
const app = express()
const server = require('http').createServer(app) //servidor construido dentro de um pacote http
const path = require('path')
const io = require('socket.io')(server)

app.get('/index', (req, res) => {
    res.render('index')
})

app.use(express.static(path.join(__dirname, '/static')))

io.on('connection', socket => { //escutando clientes conectando ao servidor
    console.log('Some client connected') 
    socket.on('chat', message => {//ouve o evento criado no html e registra a msg        
        io.emit('chat', {message, id: socket.id})//envia a mensagem pra todos os clientes conectados
        console.log('message from client:', message)
    })
})

const port = process.env.PORT || 3000 

server.listen(port, () => {
    console.log('listening on: ', port)
})

