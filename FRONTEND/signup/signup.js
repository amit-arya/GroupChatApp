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
        alert('signed up successfully');
    })
    .catch(err=>{
        alert(err);
    })
}