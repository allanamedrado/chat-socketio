const socket = io()
const chat = document.querySelector('.chat-form')
const chatInput = document.querySelector('.chat-input')

chat.addEventListener('submit', e=> { //e representa o evento ocorrido, no caso o de recarregar a pagina
    e.preventDefault() //aqui previne o comportamento de recarregar a página do form
    socket.emit('chat', chatInput.value) //envia os dados no cliente
    chatInput.value = '' //limpa o valor do input
})

const chatDump = document.querySelector('.chat-dump')

const render = ({message, id}) => {
    const div = document.createElement('div')
    div.classList.add('chat-message') 
    if(id === socket.id) { //transmitindo chat do cliente
        div.classList.add('chat-message-user')
    }
    div.innerText = message //inserindo a mensagem na div
    chatDump.appendChild(div)
}

socket.on('chat', data => { //ouve os eventos emitidos pelo servido
    render(data)
    console.log ('transmitir do servidor:', data)
})

