const token = localStorage.getItem('token');

async function sendmessage(e){
    e.preventDefault();

    const mesg = document.getElementById('message').value
    
    const msg = {
        message: mesg
    }

    await axios.post('http://localhost:3000/message', msg, { headers: { "Authorization": token } })
    .then(res=>{
        showMessage(res.data.newMessage.message);
    })
    .catch(err=>{
        console.log({Error:err});
    })
}

window.addEventListener("DOMContentLoaded", async()=>{
    const token = localStorage.getItem('token');
    await axios.get("http://localhost:3000/get-messages",{ headers: {"Authorization":token }})
    .then((res)=>{
        for(let i=0;i<res.data.messages.length;i++){
            showMessage(res.data.messages[i].message);
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

function showMessage(message){
    const parentElement = document.getElementById('messages');
    const childElement = `<div style="background-color: white;" id="messages">${message}</div>`;
    parentElement.innerHTML += childElement;
}

document.getElementById('logout').addEventListener('click', ()=>{
    window.location.href = '../login/login.html';
})