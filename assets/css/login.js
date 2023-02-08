function signUp_1(e) {
    // hear i collect value from signUp form 
    let phonenumber = document.getElementById("phonenumber").value,	
	fullname = document.getElementById("fullname").value,
	 username = document.getElementById("username").value,
	 password = document.getElementById("password").value;


     // hear i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
    let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

    // hear we give some condition for signup to restict same unique id 
    let exist = user_detail.some(data =>
            data.userName == username ||
            data.phoneNumber == phonenumber
    );

    // if condition fail
    if(!exist){
        user_detail_single = { "phoneNumber": phonenumber, "fullName" :fullname, "userName" :username, "password" : password}

        localStorage.setItem('user_data', JSON.stringify(user_detail_single))   
        
        document.querySelector('form').reset();

        alert('Account created Successfully');

    	location.href = "./signup2.html";
    }
    // if condition pass
    else {
        alert('Sorry the User already Exist!! \n Try with different Username or phonenumber');
    }
    
    e.preventDefault();
}

function signUp_2(e) {

    // hear i collect value from signUp form 
    let date_of_birth = document.getElementById("date_of_birth").value,	
	 gender = document.getElementById("gender").value,
	 game = document.getElementById("game").value,
	 area = document.getElementById("area").value;


    let user_data = JSON.parse(localStorage.getItem("user_data"));

    user_data["dateOFBirth"] = date_of_birth;
    user_data["gender"] = gender;
    user_data["game"] = game;
    user_data["area"] = area;

    // hear i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
    let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

        user_detail.push(user_data);

        localStorage.setItem('user_detail', JSON.stringify(user_detail));
        
        document.querySelector('form').reset();

        alert('Account created Successfully');

    	window.location.href = "../homepage/hpnew.html"

        e.preventDefault(); 
}



// for sign in()
function signIn(e){
    let phonenumber = document.getElementById('phonenumber').value,
        password = document.getElementById('password').value;

    let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

    let exist = user_detail.some(data => 
        data.phoneNumber == phonenumber
     && data.password == password);

    if(!exist){
        alert("Incorrect login credentials");
    }
    else{
        user_detail_single = { "phoneNumber": phonenumber}

        localStorage.setItem('user_data', JSON.stringify(user_detail_single))

        alert("Your login in successful");
        window.location.href = "./pages/homepage/hpexist.html";

    }
    e.preventDefault();
}