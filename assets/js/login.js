let origin = window.location.origin

function signUp_1(e) {
    e.preventDefault();
    // here i collect value from signUp form 
    let phonenumber = document.getElementById("phonenumber").value,
        username = document.getElementById("username").value,
        password = document.getElementById("password").value,
        confrim_password = document.getElementById("confirm_password").value;


    // here i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
    // let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

    // here we give some condition for signup to restict same unique id 

    axios.get(`http://localhost:3000/users`, 
    {params : {
        phoneNumber : phonenumber
      }})
      .then ( res => {
       console.log (res.data)

        if ((res.data).length != 0) {
            a = document.querySelector(".wrong_password").innerHTML = "This number already have account.  ";
            return a;
        }
        let wrong_password = password != confrim_password;

    if (wrong_password) {
        a = document.querySelector(".wrong_password").innerHTML = "Password not match.  "
        return a;
    }
    else {
        user_detail_single = { "phoneNumber": phonenumber, "userName": username, "password": password, "confirmPassword": confrim_password }

        localStorage.setItem('user_data', JSON.stringify(user_detail_single))

        document.querySelector('form').reset();

        location.href = `${origin}/pages/login&signup/signup2.html?unique_id=${phonenumber}`;
    }

       })

    // let same_number = user_detail.some(data =>
    //     data.phoneNumber == phonenumber);

   
    // let same_user_name = user_detail.some(data =>
    //     data.userName == username);

    // if (same_user_name) {

    //     a = document.querySelector(".wrong_password").innerHTML = "User name not available.  "
    //     return a;
    // }

    


}

function validation(password) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (password.match(passw)) {
        return true;
    }
    else {
        return false;
    }
}

function mytest() {
    let password = document.getElementById("password").value;
    let valid = validation(password)

    if (valid == true) {
        document.querySelector(".password_error_not_ok").style.display = "none"
        document.querySelector(".password_error_ok").style.display = "flex"
    }
    if (valid == false) {
        document.querySelector(".password_error_not_ok").style.display = "flex"
        document.querySelector(".password_error_ok").style.display = "none"
    }

}

function setData(endpoint, data) {

    console.log(data)

    // axios.post(url, data, headerOptions)

    axios.post(`http://localhost:3000/${endpoint}`,
                 data,
                 {'Content-Type': 'application/json'})

        .then(data => {
            console.log(data);

            const queryString = window.location.search;

            const urlParams = new URLSearchParams(queryString);

            const phonenumber = urlParams.get('unique_id');

            window.location.href = `${origin}/pages/homepage/hpexist.html?unique_id=${phonenumber}`

        })
        .catch(error => {
            console.log(error);
        })
}

function signUp_2(e) {

    // here i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
    // let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

    //     user_detail.push(user_data);

    //     localStorage.setItem('user_detail', JSON.stringify(user_detail));

// create user id for new person start

axios.get(`http://localhost:3000/users`)
  .then ( res => {
   console.log (res.data[res.data.length-1]["uniqueId"])

   let id = res.data[res.data.length-1]["id"]

   localStorage.setItem('user_id', id+1);


    // here i collect value from signUp form 
    let date_of_birth = document.getElementById("date_of_birth").value,
        gender = document.getElementById("gender").value,
        game = document.getElementById("game").value,
        area = document.getElementById("area").value,
        distric = document.getElementById("distric").value,
        create_date = moment();

        axios.get(`http://localhost:3000/area_list`)
        .then ( res => {
            let a  = res.data
            // console.log(a)
            let find  = a.find(e => e.area == area && e.distric == distric)

            if(find != undefined){
                JSON.stringify(localStorage.setItem("area_id", find["id"]))
            }
            if(find == undefined){
                JSON.stringify(localStorage.setItem("area_id", res.data.length+1))

                
            }

        })

    
    let area_id = JSON.parse(localStorage.getItem("area_id"))


    let user_data = JSON.parse(localStorage.getItem("user_data"));

    user_data["dateOFBirth"] = date_of_birth;
    user_data["gender"] = gender;
    user_data["game"] = game;
    user_data["areaUniqueId"] = 1;
    user_data["createDate"] = create_date;
    user_data["firstName"] = "";
    user_data["lastName"] = "";
    user_data["about"] = "";
    user_data["imageUrl"] = "https://iili.io/HWhKUrB.webp",
        user_data["captainStatus"] = 2;

    // let person_unique_id = uuidv4();



user_data["id"] = id+1;

// create user id for new person end


    console.log(user_data)
    // here i push data to mockapi start

    let endpoint = "users";
    setData(endpoint, user_data);
    // here i push data to mockapi end

    document.querySelector('form').reset();

   })

    e.preventDefault();
}




// for sign in()
function signIn(e) {
    e.preventDefault();
    let phonenumber = document.getElementById('phonenumber').value,
        password = document.getElementById('password').value;

    // let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

    
axios.get(`http://localhost:3000/users`, 
{params : {
    phoneNumber : phonenumber
  }})
  .then ( res => {
   console.log (res.data)

    if((res.data).length != 0 && res.data[0]["password"] == password){
    alert("Your login in successful");

    localStorage.setItem('user_id', res.data[0]["id"]);

    window.location.href = `${origin}/pages/homepage/hpexist.html?unique_id=${phonenumber}`;
    }
    if((res.data).length == 0 || res.data[0]["password"] != password){
        document.querySelector("#error_msg").innerHTML = "Wrong Password or Phone number"

    }
   })


    // let exist = user_detail.some(data =>
    //     data.phoneNumber == phonenumber
    //     && data.password == password);

    // if (!exist) {
    //     document.querySelector("#error_msg").innerHTML = "Wrong Password or Phone number"
    // }
    // else {

    //     alert("Your login in successful");
    //     window.location.href = `${origin}/pages/homepage/hpexist.html?unique_id=${phonenumber}`;

    // }

}

// function for profile edit.

function onEdit() {
    window.location.href = `${origin}/pages/profile/profileedit.html?unique_id=${phonenumber}`;

}

function myFunction() {
    let image_input = document.getElementById("user_image").value;
    let image_element = document.getElementById("team_image_show");
    image_element.setAttribute("src", image_input)
    if (image_element.getAttribute("src") == "") {
        image_element.setAttribute("src", "https://iili.io/HWhKUrB.webp")
    }

}

function updateData(endpoint, data) {

    console.log(data)

    // axios.post(url, data, headerOptions)

    axios.put(`http://localhost:3000/${endpoint}`,
                 data,
                 {'Content-Type': 'application/json'})

        .then(data => {
            console.log(data);

            localStorage.setItem('user_id', JSON.stringify(data['data']['id']));

            const queryString = window.location.search;

            const urlParams = new URLSearchParams(queryString);

            const phonenumber = urlParams.get('unique_id');

            window.location.href = `${origin}/pages/profile/myprofile.html?unique_id=${phonenumber}`;

        })
        .catch(error => {
            console.log(error);
        })
}

function sameUserName(user_detail){
    let user_name = document.getElementById("user_username").value;

    let same_user_name = user_detail.some(data =>
        data.userName == user_name);

    if(same_user_name){
        return false
    }else{
        true
    }

}

function update(e) {
    e.preventDefault();


   let person_data = {}

    // for unique user name start
    person_data["userName"] = "";

axios.get(`http://localhost:3000/users/`)
.then ( res => {
    
 let person_data = res['data']

 console.log(person_data)

 let same_user_name = sameUserName(person_data)

 if (same_user_name) {
     b = document.querySelector(".wrong_password").innerHTML = "User name not available.  "
     return b;
 }


 if (!same_user_name) {
    // for unique user name end

    let first_name = document.getElementById("user_first_name").value,
        last_name = document.getElementById("user_last_name").value,
        date_of_birth = document.getElementById("user_date_of_birth").value,
        gender = document.getElementById("user_gender").value,
        game = document.getElementById("user_game").value,
        area = document.getElementById("user_area").value,
        distric = document.getElementById("user_distric").value,
        about = document.getElementById("user_about").value,
        image = document.getElementById("user_image").value;
    let user_name = document.getElementById("user_username").value;


    person_data["userName"] = user_name;
    person_data["firstName"] = first_name;
    person_data["lastName"] = last_name;
    person_data["dateOFBirth"] = date_of_birth;
    person_data["gender"] = gender;
    person_data["game"] = game;
    person_data["area"] = area;
    person_data["distric"] = distric;
    person_data["about"] = about;
    if (image == "") {
        image = "https://iili.io/HWhKUrB.webp";
    }
    person_data["imageUrl"] = image;

    // localStorage.setItem('user_detail', JSON.stringify(user_detail));

    let user_api_id = JSON.parse(localStorage.getItem("user_id"));

    let endpoint = `users/${user_api_id}`;
    updateData(endpoint, person_data)
}
})
}

// delete profile start

function del() {

    if (confirm("Are you sure to delete this Account ?")) {

        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);

        const phonenumber = urlParams.get('unique_id');

        let unique_id = phonenumber;

        let user_detail = JSON.parse(localStorage.getItem('user_detail'))


        function findPlayer(a) {
            return a.phoneNumber == unique_id;
        }

        let person_data = user_detail.find(findPlayer);

        let indexOfUser = user_detail.indexOf(person_data);

        user_detail.splice(indexOfUser, 1);


        localStorage.setItem('user_detail', JSON.stringify(user_detail));

        window.location.href = `${origin}/index.html`;

    }

}

function logOut() {
    localStorage.setItem('user_id', null);

    window.location.href = `${origin}/index.html`;

}

function backBtnHome() {
    window.location.href = `../homepage/hpexist.html?unique_id=${phonenumber}`

}

function previousPage() {
    window.history.go(-1)
}

// new js for show password start ---------------------------

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
if (togglePassword) {
    togglePassword.addEventListener('click', function (e) {
        // toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // toggle the eye slash icon
        this.classList.toggle('fa-eye-slash');
    });
}

const togglePassword_con = document.querySelector('#togglePassword_con');
const confirm_password = document.querySelector('#confirm_password');
if (togglePassword_con) {
    togglePassword_con.addEventListener('click', function (e) {
        // toggle the type attribute
        const type = confirm_password.getAttribute('type') === 'password' ? 'text' : 'password';
        confirm_password.setAttribute('type', type);
        // toggle the eye slash icon
        this.classList.toggle('fa-eye-slash');
    });
}
// new js for show password end --------------------------- 

let DOB = document.querySelector("#date_of_birth")

let today = new Date();

let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

let max_value = yyyy + '-' + mm + '-' + dd;
if (DOB) {
    DOB.setAttribute("max", max_value)
}