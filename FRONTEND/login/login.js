async function login(e) {
    e.preventDefault();

    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }

    await axios.post('http://localhost:3000/user/login', loginDetails)
        .then(res => {
            alert('logged in successfully');
        })
        .catch(err => {
            if (err.response.status == 401) {
                alert('Incorrect password');
            }
            else {
                alert(`User doesn't exist, try another email Id`);
            }
        })
}

document.getElementById('signup').addEventListener('click', () => {
    window.location.href = '../signup/signup.html';
})