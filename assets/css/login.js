function signUp(e) {
    // hear i collect value from signUp form 
    let email = document.getElementById("email").value,	
	 fullname = document.getElementById("fullname").value,
	 username = document.getElementById("username").value,
	 password = document.getElementById("password").value;

    // hear i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
    let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

    // hear we give some condition for signup to restict same unique id 
    let exist = user_detail.some(function(data){
            data.username.toLowerCase() == username.toLowerCase() ||
            data.email.toLowerCase() == email.toLowerCase()
    });

    // if condition fail
    if(!exist){
        user_detail.push({ email,fullname,username,password});

        localStorage.setItem('user_detail', JSON.stringify(user_detail));
        
        document.querySelector('form').reset();

        alert('Account created Successfully');

    	location.href = "./signup2.html";
    }
    // if condition pass
    else{
        alert('Sorry the User already Exist!! \n Try with different Phone number or email');
        document.querySelector('form').reset();
    }
    e.preventDefault();
}


// for sign in()
const signIn = e =>{
    let email = document.getElementById('email').value,
        password = document.getElementById('password').value;

    let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

    let exist = user_detail.length &&
    JSON.parse(localStorage.getItem('user_detail')).some(data => data.email.toLowerCase() == email
     && data.password.toLowerCase() == password);
    if(!exist){
        alert("Incorrect login credentials");
    }
    else{
        alert("Your login in successful");
        location.href = "./pages/homepage/hpexist.html";
    }
    e.preventDefault();
}