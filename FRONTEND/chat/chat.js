const token = localStorage.getItem('token');

window.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');

    await axios.get('http://localhost:3000/get-groups', { headers: { "Authorization": token } })
        .then(res => {
            const parentElement = document.getElementById('messages');
            const childElement = `<div style="font-weight:bold">Your Groups--</div>`;
            parentElement.innerHTML += childElement;

            for (let i = 0; i < res.data.user[0].groups.length; i++) {
                const id = res.data.user[0].groups[i].id;
                const grpName = res.data.user[0].groups[i].name;
                const childElement = `<button onclick=getMessages('${id}')>${grpName}</button><br>`;
                parentElement.innerHTML += childElement;
            }
        })
        .catch(err => {
            console.log('Error:', err);
        })
})

async function getMessages(id){
    localStorage.setItem('grpId', id);
    window.location.href = '../message/message.html';
}

document.getElementById('logout').addEventListener('click', () => {
    window.location.href = '../login/login.html';
})

document.getElementById('creategroup').addEventListener('click', () => {
    window.location.href = '../group/group.html';
})