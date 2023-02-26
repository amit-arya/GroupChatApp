async function signup(e){
    e.preventDefault();

    const signupdetails = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        password: e.target.password.value
    }

    await axios.post('http://localhost:3000/user/signup', signupdetails)
    .then(res=>{
        alert('signed up successfully, Login now');
        window.location.href = '../login/login.html';
    })
    .catch(err=>{
        alert(err);
    })
}

document.getElementById('login').addEventListener('click', ()=>{
    window.location.href = '../login/login.html';
})