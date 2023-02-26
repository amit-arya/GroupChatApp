const token = localStorage.getItem('token');

async function creategroup(e){
    e.preventDefault();

    const groupname = {
        name: e.target.grpname.value
    }
    
    await axios.post('http://localhost:3000/creategroup', groupname, { headers: { "Authorization": token } })
    .then(res=>{
        alert('Successfully created the group');
        e.target.grpname.value = '';
    })
    .catch(err=>{
        console.log('Error:', err);
        alert(err);
    })
}

document.getElementById('logout').addEventListener('click', ()=>{
    window.location.href = '../login/login.html';
})