const socket = io();
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true});
const roomNameDOM = document.querySelector('.room-name-cont');
roomNameDOM.innerHTML = room;
const send_button_element = document.getElementById("click_to_send");
const text_element = document.getElementById("message_to_send");
send_button_element.addEventListener("click", ()=>{socket.emit("msg_from_user", text_element.value);
text_element.value = "";
text_element.focus();});
socket.emit("joinRoom", {username, room});
socket.on("message", msg=>{
    outputMessage(msg);
}
)
socket.on("userArr", list_ => {
    console.log(list_);
    string_to_append = '';
    for (let counter_ = 0; counter_ < list_.length; counter_++){
        string_to_append += `<li><div class="user-name-cont">${list_[counter_]}</div></li>`;
    }
    document.getElementById("user_name_list").innerHTML = string_to_append;
})

function outputMessage(msg_text){
    div_new = document.createElement('div');
    div_new.classList.add("message");
    div_new.innerHTML = `<div class="meta-data">
    <p class="userName">${msg_text.userName}</p>
    <p class="timeMsg">${msg_text.time}</p>
</div>
    ${msg_text.messageText}
</div>`;
document.querySelector('.chat-area').appendChild(div_new);
}