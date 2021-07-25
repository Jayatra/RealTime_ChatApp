//setup of socket.io but u have to import it in index.io
const socket=io()
//logic for sending message in whatsapp
//to get username
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')



do{
    name = prompt('Pleasse enter our name:')
}
while(!name)
//in textarea when we want to send we enter 

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})



function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()  //for new line
    }
    //Append
    appendMessage(msg,'outgoing')
    textarea.value = ''
    scrollToBottom();

    //send to server
    socket.emit('message',msg)
}





function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type

    mainDiv.classList.add(className,'message')


    //setting the message from booth the side 
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}




//recieve message same as we recieved in server side
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom();
})




function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}