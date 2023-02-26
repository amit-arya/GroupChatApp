const token = localStorage.getItem('token');
const grpId = localStorage.getItem('grpId');
const arr = [];

async function sendmessage(e) {
    e.preventDefault();

    const mesg = document.getElementById('message').value

    const msg = {
        message: mesg
    }
    
    await axios.post(`http://localhost:3000/send-message/${grpId}`, msg, { headers: { "Authorization": token } })
        .then(res => {
            showMessage(res.data.newMessage.message);
            if(arr.length>0){
                arr.shift();
            }
            arr.push(res.data.newMessage.message);
            localStorage.setItem('arr', arr);
            document.getElementById('message').value = "";
        })
        .catch(err => {
            console.log({ Error: err });
        })
}

window.addEventListener('DOMContentLoaded', async () => {

    const parentElement = document.getElementById('grpMessages');
    await axios.get(`http://localhost:3000/get-group/${grpId}`)
    .then(res=>{
        const grpName = res.data.group.name;
        const childElement = `<div style="font-weight:bold; font-size:25px">We are ${grpName}</div>`;
        parentElement.innerHTML += childElement;
        parentElement.innerHTML += 'You Joined---';
    })
    .catch(err=>{
        console.log("Error:", err);
    })

    await axios.get(`http://localhost:3000/get-messages/${grpId}`)
        .then((res) => {
            let l = res.data.messages.length;
            let k = l > 10 ? l - 10 : 0;

            for (let i = k; i < l; i++) {
                arr.push(res.data.messages[i].message);
                showMessage(res.data.messages[i].message);
            }

            localStorage.setItem('arr', arr);
            let array = localStorage.getItem('arr');
            array = array.split(',');

        })
        .catch(err => {
            console.log(err);
        })
})

function showMessage(message) {
    const parentElement = document.getElementById('grpMessages');
    const childElement = `<div style="background-color: white;" id="messages">${message}</div>`;
    parentElement.innerHTML += childElement;
}