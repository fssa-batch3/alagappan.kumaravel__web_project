function signUp_1(e) {
    e.preventDefault();
    // here i collect value from signUp form 
    let phonenumber = document.getElementById("phonenumber").value,	
	 username = document.getElementById("username").value,
	 password = document.getElementById("password").value,
     confrim_password = document.getElementById("confirm_password").value;

     // here i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
    let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

    // here we give some condition for signup to restict same unique id 

    let same_number = user_detail.some(data =>
        data.phoneNumber == phonenumber );

    if(same_number){
        // alert("This number already have account");
       a = document.querySelector(".wrong_password").innerHTML = "This number already have account.  ";
        // document.querySelector('form').reset();
        return a;
    }
    let same_user_name = user_detail.some(data =>
        data.userName == username );
            
    if(same_user_name){
        // alert("User name not available.");
        a = document.querySelector(".wrong_password").innerHTML = "User name not available.  "
        return a;
    }

    let wrong_password = password != confrim_password ;
    
    if (wrong_password){
        // alert("Password not match.");
        
        a = document.querySelector(".wrong_password").innerHTML = "Password not match.  "
        return a;
    }
    else {
        user_detail_single = { "phoneNumber": phonenumber, "userName" :username, "password" : password , "confirmPassword" : confrim_password}

        localStorage.setItem('user_data', JSON.stringify(user_detail_single))   
        
        document.querySelector('form').reset();

    	location.href = `./signup2.html?unique_id=${phonenumber}`;
    }
    
    
}

function signUp_2(e) {

    // here i collect value from signUp form 
    let date_of_birth = document.getElementById("date_of_birth").value,	
	 gender = document.getElementById("gender").value,
	 game = document.getElementById("game").value,
	 area = document.getElementById("area").value,
     distric = document.getElementById("distric").value,
     create_date = moment();
     console.log(create_date)



    let user_data = JSON.parse(localStorage.getItem("user_data"));

    user_data["dateOFBirth"] = date_of_birth;
    user_data["gender"] = gender;
    user_data["game"] = game;
    user_data["area"] = area;
    user_data["distric"] = distric;
    user_data["createDate"] = create_date;
    user_data["firstName"] = "";
    user_data["lastName"] = "";
    user_data["about"]= "";
    user_data["imageUrl"]= "../../assets/images/defalt_player_image.webp",
    user_data["captainStatus"] = "";

    let person_unique_id = uuidv4();
    user_data["uniqueId"]= person_unique_id;



    // here i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
    let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

        user_detail.push(user_data);

        localStorage.setItem('user_detail', JSON.stringify(user_detail));
        
        document.querySelector('form').reset();

        const queryString = window.location.search;

	    const urlParams = new URLSearchParams(queryString);

	    const phonenumber = urlParams.get('unique_id');

    	window.location.href = `../homepage/hpnew.html?unique_id=${phonenumber}`

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
        document.querySelector("#error_msg").innerHTML = "Wrong Password or Phone number"
    }
    else{
        user_detail_single = { "phoneNumber": phonenumber}

        localStorage.setItem('user_data', JSON.stringify(user_detail_single))

        alert("Your login in successful");
        window.location.href = `/pages/homepage/hpexist.html?unique_id=${phonenumber}`;

    }
    e.preventDefault();
}

// function for profile edit.

function onEdit(){
    window.location.href = `./profileedit.html?unique_id=${phonenumber}`;

}



function update(e){
    e.preventDefault();

function findPlayer(a) {
return a.phoneNumber == unique_id ;
}

person_data = user_detail.find(findPlayer);

// for unique user name start
person_data["userName"] = "";

let user_name = document.getElementById("user_username").value;

let same_user_name = user_detail.some(data =>
    data.userName == user_name );
if(same_user_name){
    b = document.querySelector(".wrong_password").innerHTML = "User name not available.  "
    return b;
}
// for unique user name end

let first_name = document.getElementById("user_first_name").value,
last_name = document.getElementById("user_last_name").value,
date_of_birth = document.getElementById("user_date_of_birth").value ,
gender = document.getElementById("user_gender").value ,
game = document.getElementById("user_game").value ,
area = document.getElementById("user_area").value ,
distric = document.getElementById("user_distric").value ,
about = document.getElementById("user_about").value ,
image = document.getElementById("user_image").value;


person_data["userName"] = user_name;
person_data["firstName"] = first_name;
person_data["lastName"] = last_name;
person_data["dateOFBirth"] = date_of_birth;
person_data["gender"] = gender;
person_data["game"] = game;
person_data["area"] = area;
person_data["distric"] = distric;
person_data["about"]= about;
if(image == ""){
    image = "../../assets/images/defalt_player_image.webp";
}
person_data["imageUrl"]= image;

localStorage.setItem('user_detail', JSON.stringify(user_detail));

window.location.href = `./myprofile.html?unique_id=${phonenumber}`;

}

// delete profile start

function del(){
    
    if(confirm("Are you sure to delete this Account ?")){

        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);
    
        const phonenumber = urlParams.get('unique_id');
    
    let unique_id = phonenumber;
    
let user_detail = JSON.parse(localStorage.getItem('user_detail'))


function findPlayer(a) {
return a.phoneNumber == unique_id ;
}

let person_data = user_detail.find(findPlayer);

let indexOfUser = user_detail.indexOf(person_data);

user_detail.splice(indexOfUser, 1);


localStorage.setItem('user_detail', JSON.stringify(user_detail));

localStorage.setItem('user_data', "")

window.location.href = "../../index.html";

    }

}

function logOut(){
    localStorage.setItem('user_data', "")
    window.location.href = `../../index.html`;


}
