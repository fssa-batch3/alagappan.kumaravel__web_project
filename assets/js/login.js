const { origin } = window.location;

function signUp_1(e) {
  e.preventDefault();
  // here i collect value from signUp form
  const phonenumber = document.getElementById('phonenumber').value;
	 const username = document.getElementById('username').value;
	 const password = document.getElementById('password').value;
  const confrim_password = document.getElementById('confirm_password').value;

  // here i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
  const user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

  // here we give some condition for signup to restict same unique id

  const same_number = user_detail.some((data) => data.phoneNumber == phonenumber);

  if (same_number) {
    a = document.querySelector('.wrong_password').innerHTML = 'This number already have account.  ';
    return a;
  }
  const same_user_name = user_detail.some((data) => data.userName == username);

  if (same_user_name) {
    a = document.querySelector('.wrong_password').innerHTML = 'User name not available.  ';
    return a;
  }

  const wrong_password = password != confrim_password;

  if (wrong_password) {
    a = document.querySelector('.wrong_password').innerHTML = 'Password not match.  ';
    return a;
  }

  user_detail_single = {
    phoneNumber: phonenumber, userName: username, password, confirmPassword: confrim_password,
  };

  localStorage.setItem('user_data', JSON.stringify(user_detail_single));

  document.querySelector('form').reset();

    	location.href = `${origin}/pages/login&signup/signup2.html?unique_id=${phonenumber}`;
}

function validation(password) {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  if (password.match(passw)) {
    return true;
  }

  return false;
}

function mytest() {
  const password = document.getElementById('password').value;
  const valid = validation(password);

  if (valid == true) {
    document.querySelector('.password_error_not_ok').style.display = 'none';
    document.querySelector('.password_error_ok').style.display = 'flex';
  }
  if (valid == false) {
    document.querySelector('.password_error_not_ok').style.display = 'flex';
    document.querySelector('.password_error_ok').style.display = 'none';
  }
}

function signUp_2(e) {
  // here i collect value from signUp form
  const date_of_birth = document.getElementById('date_of_birth').value;
	 const gender = document.getElementById('gender').value;
	 const game = document.getElementById('game').value;
	 const area = document.getElementById('area').value;
  const distric = document.getElementById('distric').value;
  const create_date = moment();
  console.log(create_date);

  const user_data = JSON.parse(localStorage.getItem('user_data'));

  user_data.dateOFBirth = date_of_birth;
  user_data.gender = gender;
  user_data.game = game;
  user_data.area = area;
  user_data.distric = distric;
  user_data.createDate = create_date;
  user_data.firstName = '';
  user_data.lastName = '';
  user_data.about = '';
  user_data.imageUrl = 'https://iili.io/HWhKUrB.webp',
  user_data.captainStatus = 2;

  const person_unique_id = uuidv4();
  user_data.uniqueId = person_unique_id;

  // here i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
  const user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

  user_detail.push(user_data);

  localStorage.setItem('user_detail', JSON.stringify(user_detail));

  document.querySelector('form').reset();

  const queryString = window.location.search;

	    const urlParams = new URLSearchParams(queryString);

	    const phonenumber = urlParams.get('unique_id');

    	window.location.href = `${origin}/pages/homepage/hpexist.html?unique_id=${phonenumber}`;

  e.preventDefault();
}

// for sign in()
function signIn(e) {
  e.preventDefault();
  const phonenumber = document.getElementById('phonenumber').value;
  const password = document.getElementById('password').value;

  const user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

  const exist = user_detail.some((data) => data.phoneNumber == phonenumber
     && data.password == password);

  if (!exist) {
    document.querySelector('#error_msg').innerHTML = 'Wrong Password or Phone number';
  } else {
    alert('Your login in successful');
    window.location.href = `${origin}/pages/homepage/hpexist.html?unique_id=${phonenumber}`;
  }
}

// function for profile edit.

function onEdit() {
  window.location.href = `${origin}/pages/profile/profileedit.html?unique_id=${phonenumber}`;
}

function myFunction() {
  const image_input = document.getElementById('user_image').value;
  const image_element = document.getElementById('team_image_show');
  image_element.setAttribute('src', image_input);
  if (image_element.getAttribute('src') == '') {
    image_element.setAttribute('src', 'https://iili.io/HWhKUrB.webp');
  }
}

function update(e) {
  e.preventDefault();

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const phonenumber = urlParams.get('unique_id');

  function findPlayer(a) {
    return a.phoneNumber == unique_id;
  }

  person_data = user_detail.find(findPlayer);

  // for unique user name start
  person_data.userName = '';

  const user_name = document.getElementById('user_username').value;

  const same_user_name = user_detail.some((data) => data.userName == user_name);
  if (same_user_name) {
    b = document.querySelector('.wrong_password').innerHTML = 'User name not available.  ';
    return b;
  }
  // for unique user name end

  const first_name = document.getElementById('user_first_name').value;
  const last_name = document.getElementById('user_last_name').value;
  const date_of_birth = document.getElementById('user_date_of_birth').value;
  const gender = document.getElementById('user_gender').value;
  const game = document.getElementById('user_game').value;
  const area = document.getElementById('user_area').value;
  const distric = document.getElementById('user_distric').value;
  const about = document.getElementById('user_about').value;
  let image = document.getElementById('user_image').value;

  person_data.userName = user_name;
  person_data.firstName = first_name;
  person_data.lastName = last_name;
  person_data.dateOFBirth = date_of_birth;
  person_data.gender = gender;
  person_data.game = game;
  person_data.area = area;
  person_data.distric = distric;
  person_data.about = about;
  if (image == '') {
    image = 'https://iili.io/HWhKUrB.webp';
  }
  person_data.imageUrl = image;

  localStorage.setItem('user_detail', JSON.stringify(user_detail));

  window.location.href = `${origin}/pages/profile/myprofile.html?unique_id=${phonenumber}`;
}

// delete profile start

function del() {
  if (confirm('Are you sure to delete this Account ?')) {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const phonenumber = urlParams.get('unique_id');

    const unique_id = phonenumber;

    const user_detail = JSON.parse(localStorage.getItem('user_detail'));

    function findPlayer(a) {
      return a.phoneNumber == unique_id;
    }

    const person_data = user_detail.find(findPlayer);

    const indexOfUser = user_detail.indexOf(person_data);

    user_detail.splice(indexOfUser, 1);

    localStorage.setItem('user_detail', JSON.stringify(user_detail));

    window.location.href = `${origin}/index.html`;
  }
}

function logOut() {
  window.location.href = `${origin}/index.html`;
}

function backBtnHome() {
  window.location.href = `../homepage/hpexist.html?unique_id=${phonenumber}`;
}

function previousPage() {
  window.history.go(-1);
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

const DOB = document.querySelector('#date_of_birth');

const today = new Date();

const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
const yyyy = today.getFullYear();

const max_value = `${yyyy}-${mm}-${dd}`;
if (DOB) {
  DOB.setAttribute('max', max_value);
}
