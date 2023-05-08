const { origin } = window.location;

async function findnumber(value) {
  let matchPhonenum = false;

  const res = new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/users`, {
        params: {
          phoneNumber: value,
        },
      })
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });

  const objData = await res;

  console.log(objData);

  if (objData.data.length !== 0) {
    matchPhonenum = true;
  }

  console.log(matchPhonenum);

  return matchPhonenum;
}

async function signUp_1(e) {
  e.preventDefault();
  // here i collect value from signUp form
  const phonenumber = document.getElementById("phonenumber").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confrim_password = document.getElementById("confirm_password").value;

  const matchPhonenum = await findnumber(phonenumber);

  let temp;

  if (matchPhonenum) {
    temp = document.querySelector(".wrong_password").innerHTML =
      "This number already have account.  ";
    return temp;
  }

  const wrong_password = password !== confrim_password;

  if (wrong_password) {
    temp = document.querySelector(".wrong_password").innerHTML =
      "Password not match.  ";
    return temp;
  }

  user_detail_single = {
    phoneNumber: phonenumber,
    userName: username,
    password,
    confirmPassword: confrim_password,
  };

  localStorage.setItem("user_data", JSON.stringify(user_detail_single));

  document.querySelector("form").reset();

  location.href = `${origin}/pages/login&signup/signup2.html?unique_id=${phonenumber}`;

  // let same_number = user_detail.some(data =>
  //     data.phoneNumber === phonenumber);

  // let same_user_name = user_detail.some(data =>
  //     data.userName === username);

  // if (same_user_name) {

  //     a = document.querySelector(".wrong_password").innerHTML = "User name not available.  "
  //     return a;
  // }
}

function validation(password) {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  if (password.match(passw)) {
    return true;
  }

  return false;
}

function mytest() {
  const password = document.getElementById("password").value;
  const valid = validation(password);

  if (valid === true) {
    document.querySelector(".password_error_not_ok").style.display = "none";
    document.querySelector(".password_error_ok").style.display = "flex";
  }
  if (valid === false) {
    document.querySelector(".password_error_not_ok").style.display = "flex";
    document.querySelector(".password_error_ok").style.display = "none";
  }
}

async function setData(endpoint, data) {
  console.log(data);

  // axios.post(url, data, headerOptions)

  await axios
    .post(`http://localhost:3000/${endpoint}`, data, {
      "Content-Type": "application/json",
    })

    .then((data) => {
      localStorage.setItem("user_id", data.data.id);

      window.location.href = `${origin}/pages/homepage/hpexist.html`;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function setArea(inset) {
  let new_id = "";

  await axios
    .post(`http://localhost:3000/area_list`, inset, {
      "Content-Type": "application/json",
    })
    .then((data) => {
      console.log(data);
      new_id = data.data.id;
    });

  return new_id;
}

async function findarea(area, distric) {
  let result = "";

  console.log("ww");

  // const resp = await axios.get(`http://localhost:3000/area_list`);

  const resp = new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/area_list`)
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  const objData = await resp;
  // console.log(objData);
  // console.log("done");

  const area_data = objData.data;

  const find_area = area_data.find(
    (e) => e.area === area && e.distric === distric
  );

  console.log(find_area);

  if (find_area !== undefined) {
    result = find_area.id;
    return result;
  }

  if (find_area === undefined) {
    result = area_data.length + 1;
    const inset = {
      area,
      distric,
    };
    console.log(inset);

    const new_id = await setArea(inset);

    return new_id;
  }
}

async function signUp_2(e) {
  e.preventDefault();
  console.log("work");
  // here i collect value from signUp form
  const date_of_birth = document.getElementById("date_of_birth").value;
  const gender = document.getElementById("gender").value;
  const game = document.getElementById("game").value;
  const area = document.getElementById("area").value;
  const distric = document.getElementById("distric").value;
  const create_date = moment();

  // create user id for new person start

  const area_data = await findarea(area, distric);

  const user_data = JSON.parse(localStorage.getItem("user_data"));

  user_data.dateOFBirth = date_of_birth;
  user_data.gender = gender;
  user_data.game = game;
  user_data.areaUniqueId = area_data;
  user_data.createDate = create_date;
  user_data.firstName = "";
  user_data.lastName = "";
  user_data.about = "";
  user_data.imageUrl = "https://iili.io/HWhKUrB.webp";

  // user_data.id = id + 1;

  console.log(user_data);
  // here i push data to mockapi start

  const endpoint = "users";
  await setData(endpoint, user_data);
  // here i push data to mockapi end

  document.querySelector("form").reset();
}

// for sign in()
function signIn(e) {
  e.preventDefault();
  const phonenumber = document.getElementById("phonenumber").value;
  const password = document.getElementById("password").value;

  // let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

  axios
    .get(`http://localhost:3000/users`, {
      params: {
        phoneNumber: phonenumber,
      },
    })
    .then((res) => {
      console.log(res.data);

      if (res.data.length !== 0 && res.data[0].password === password) {
        alert("Your login in successful");

        localStorage.setItem("user_id", res.data[0].id);

        window.location.href = `${origin}/pages/homepage/hpexist.html?unique_id=${phonenumber}`;
      }
      if (res.data.length === 0 || res.data[0].password !== password) {
        document.querySelector("#error_msg").innerHTML =
          "Wrong Password or Phone number";
      }
    });

  // let exist = user_detail.some(data =>
  //     data.phoneNumber === phonenumber
  //     && data.password === password);

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
  const image_input = document.getElementById("user_image").value;
  const image_element = document.getElementById("team_image_show");
  image_element.setAttribute("src", image_input);
  if (image_element.getAttribute("src") === "") {
    image_element.setAttribute("src", "https://iili.io/HWhKUrB.webp");
  }
}

function updateData(endpoint, data) {

  // axios.post(url, data, headerOptions)

  axios
    .patch(`http://localhost:3000/${endpoint}`, data, {
      "Content-Type": "application/json",
    })

    .then((data) => {
      console.log(data);

      // localStorage.setItem("user_id", JSON.stringify(data.data.id));

      const queryString = window.location.search;

      const urlParams = new URLSearchParams(queryString);

      const phonenumber = urlParams.get("unique_id");

      window.location.href = `${origin}/pages/profile/myprofile.html?unique_id=${phonenumber}`;
    })
    .catch((error) => {
      console.log(error);
    });
}
// same user name function not done now -------------------
// function sameUserName(user_detail) {
//   const user_name = document.getElementById("user_username").value;

//   const same_user_name = user_detail.some(
//     (data) => data.userName === user_name
//   );

//   if (same_user_name) {
//     return false;
//   }
//   true;
// }

async function update(e) {
  e.preventDefault();

  const person_data = {};

  // const same_user_name = sameUserName(person_data);

  // if (same_user_name) {
  //   b = document.querySelector(".wrong_password").innerHTML =
  //     "User name not available.  ";
  //   return b;
  // }

  // for unique user name end

  const first_name = document.getElementById("user_first_name").value;
  const last_name = document.getElementById("user_last_name").value;
  const date_of_birth = document.getElementById("user_date_of_birth").value;
  const gender = document.getElementById("user_gender").value;
  const game = document.getElementById("user_game").value;
  const area = document.getElementById("user_area").value;
  const distric = document.getElementById("user_distric").value;
  const about = document.getElementById("user_about").value;

  const area_data = await findarea(area, distric);

  let image = document.getElementById("user_image").value;
  const user_name = document.getElementById("user_username").value;

  person_data.userName = user_name;
  person_data.firstName = first_name;
  person_data.lastName = last_name;
  person_data.dateOFBirth = date_of_birth;
  person_data.gender = gender;
  person_data.game = game;
  person_data.areaUniqueId = area_data;
  person_data.about = about;
  if (image === "") {
    image = "https://iili.io/HWhKUrB.webp";
  }
  person_data.imageUrl = image;

  // localStorage.setItem('user_detail', JSON.stringify(user_detail));

  const user_api_id = JSON.parse(localStorage.getItem("user_id"));

  const endpoint = `users/${user_api_id}`;
  updateData(endpoint, person_data);
}

// delete profile start // not worked for database

// function del() {
//   if (confirm("Are you sure to delete this Account ?")) {
//     const queryString = window.location.search;

//     const urlParams = new URLSearchParams(queryString);

//     const phonenumber = urlParams.get("unique_id");

//     const unique_id = phonenumber;

//     const user_detail = JSON.parse(localStorage.getItem("user_detail"));

//     function findPlayer(a) {
//       return a.phoneNumber === unique_id;
//     }

//     const person_data = user_detail.find(findPlayer);

//     const indexOfUser = user_detail.indexOf(person_data);

//     user_detail.splice(indexOfUser, 1);

//     localStorage.setItem("user_detail", JSON.stringify(user_detail));

//     window.location.href = `${origin}/index.html`;
//   }
// }

function logOut() {
  localStorage.setItem("user_id", null);

  window.location.href = `${origin}/index.html`;
}

function backBtnHome() {
  window.location.href = `../homepage/hpexist.html?unique_id=${phonenumber}`;
}

function previousPage() {
  window.history.go(-1);
}

// new js for show password start ---------------------------

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
if (togglePassword) {
  togglePassword.addEventListener("click", function (e) {
    // toggle the type attribute
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    // toggle the eye slash icon
    this.classList.toggle("fa-eye-slash");
  });
}

const togglePassword_con = document.querySelector("#togglePassword_con");
const confirm_password = document.querySelector("#confirm_password");
if (togglePassword_con) {
  togglePassword_con.addEventListener("click", function (e) {
    // toggle the type attribute
    const type =
      confirm_password.getAttribute("type") === "password"
        ? "text"
        : "password";
    confirm_password.setAttribute("type", type);
    // toggle the eye slash icon
    this.classList.toggle("fa-eye-slash");
  });
}
// new js for show password end ---------------------------

const DOB = document.querySelector("#date_of_birth");

const today = new Date();

const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
const yyyy = today.getFullYear();

const max_value = `${yyyy}-${mm}-${dd}`;
if (DOB) {
  DOB.setAttribute("max", max_value);
}
