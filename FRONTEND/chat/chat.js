const token = localStorage.getItem('token');

async function sendmessage(e){
    e.preventDefault();

    const mesg = document.getElementById('message').value
    
    const msg = {
        message: mesg
    }

    await axios.post('http://localhost:3000/message', msg, { headers: { "Authorization": token } })
    .then(res=>{
        console.log(res.data.newMessage.message);
        const parentElement = document.getElementById('messages');
        const childElement = `<div style="background-color: white;" id="messages">${res.data.newMessage.message}</div>`;
        parentElement.innerHTML += childElement;
    })
    .catch(err=>{
        console.log({Error:err});
    })
}

document.getElementById('logout').addEventListener('click', ()=>{
    window.location.href = '../login/login.html';
})