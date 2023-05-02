const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

const { origin } = window.location;

function responsebtn() {
  window.location.href = `${origin}/pages/nonteamplayer/response.html?unique_id=${phonenumber}`;
}
function jointeambtn() {
  window.location.href = `${origin}/pages/nonteamplayer/jointeam.html?unique_id=${phonenumber}`;
}
function createteambtn() {
  window.location.href = `${origin}/pages/nonteamplayer/createteam.html?unique_id=${phonenumber}`;
}

function matchInvitationBtn() {
  window.location.href = `${origin}/pages/teamplayer captain/match invitation.html?unique_id=${phonenumber}`;
}

function myTeam() {
  window.location.href = `${origin}/pages/profile/teamprofile.html?unique_id=${phonenumber}`;
}
function teamResponse() {
  window.location.href = `${origin}/pages/teamplayer captain/team response.html?unique_id=${phonenumber}`;
}
function teamResponseNew() {
  window.location.href = `${origin}/pages/nonteamplayer/response.html?unique_id=${phonenumber}`;
}

function playerRequest() {
  window.location.href = `${origin}/pages/teamplayer captain/playerrequests.html?unique_id=${phonenumber}`;
}

function profilepage() {
  window.location.href = `${origin}/pages/profile/myprofile.html?unique_id=${phonenumber}`;
}
function myMatch() {
  window.location.href = `${origin}/pages/search and notification/calendar.html?unique_id=${phonenumber}`;
}

// upto above links for home page

// options depending upon player team status (start)--------------------------
const unique_id = phonenumber;

const user_detail = JSON.parse(localStorage.getItem("user_detail"));

function findPlayer(e) {
  return e.phoneNumber == unique_id;
}

person_data = user_detail.find(findPlayer);

function createMatchBtn() {
  window.location.href = `/pages/teamplayer captain/creatematch.html?unique_id=${phonenumber}&my_name=${person_data.userName}&opponent_url=0&opponent_name=0&captain=0&type=0&opponent_id=0`;
}

if (person_data.captainStatus != 2) {
  const all = document.querySelectorAll(".not_in_team");

  all.forEach((e) => (e.style.display = "none"));

  if (person_data.captainStatus != 1) {
    const all = document.querySelectorAll(".captain");

    all.forEach((e) => (e.style.display = "none"));
  }
}

if (person_data.captainStatus == 2) {
  const all = document.querySelectorAll(".in_team");

  all.forEach((e) => (e.style.display = "none"));
  if (person_data.captainStatus != 1) {
    const all = document.querySelectorAll(".captain");

    all.forEach((e) => (e.style.display = "none"));
  }
}

// options depending upon player team status (end)--------------------------

// sidebar js work start ---------------------------------------------------
document.querySelector("#player_name").innerText = person_data.userName;
document.querySelector("#player_number").innerText = person_data.phoneNumber;

const player_image_url = person_data.imageUrl;
const player_image = document.querySelector(".player_image");
if (player_image_url == "") {
  player_image.setAttribute(
    "src",
    "../../assets/images/defalt_player_image.webp"
  );
} else {
  player_image.setAttribute("src", player_image_url);
}
// for range value start
const username = person_data.userName;
const firstname = person_data.firstName;
const lastname = person_data.lastName;
const dateofbirth = person_data.dateOFBirth;
const { gender } = person_data;
const { game } = person_data;
const { area } = person_data;
const { distric } = person_data;
const { about } = person_data;
const image = person_data.imageUrl;

const person_data_range = {
  username,
  firstname,
  lastname,
  dateofbirth,
  gender,
  game,
  area,
  distric,
  about,
  image,
};

const emptyValues = new Set(["", null, undefined]);
const null_count = Object.values(person_data_range).filter((x) =>
  emptyValues.has(x)
).length;
let key_count = 0;

// loop through each key/value
for (const key in person_data_range) {
  // increase the count
  ++key_count;
}
// range calculation

const range_value = 100 - (null_count / key_count) * 100;

const range_input = document.querySelector(".range_cover");
range_input.style.width = `${range_value}%`;

document.querySelector(".range-label").innerHTML = `${Math.round(
  range_value
)}%`;

// sidebar js work end ---------------------------------------------------
function previousPage() {
  window.history.go(-1);
}

document
  .querySelector(".playerdetailsdiv")
  .addEventListener("click", profilepage);
document
  .querySelector(".playerimagediv")
  .addEventListener("click", profilepage);
