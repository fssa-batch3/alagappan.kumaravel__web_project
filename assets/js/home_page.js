const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

const { origin } = window.location;

const user_api_id = JSON.parse(localStorage.getItem("user_id"));

// (async function () {
//   teamdetails = await getTeamid(user_api_id);
// })();

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

async function myTeam() {
  const team_ids = await getTeamid(user_api_id);

  const filter_teamin_data = team_ids.find(
    (e) => e.activeStatus === 2 || e.activeStatus === 1
  );

  window.location.href = `${origin}/pages/profile/teamprofile.html?team_id=${filter_teamin_data.teamId}`;
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
  window.location.href = `${origin}/pages/profile/myprofile.html`;
}
function myMatch() {
  window.location.href = `${origin}/pages/search and notification/calendar.html?unique_id=${phonenumber}`;
}

async function getPersonData(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);

  const result = await data;

  return result.data;
}

async function getTeamid(value) {
  const res = new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/player_team_relation`, {
        params: {
          playerId: value,
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

  return objData.data;
}

async function getarea(areaUniqueId) {
  const resp = await axios.get(
    `http://localhost:3000/area_list/${areaUniqueId}`
  );

  const objData = resp;

  console.log(objData);

  const area_data = objData.data;

  return area_data;
}
// upto above links for home page

// options depending upon player team status (start)--------------------------
const unique_id = phonenumber;

// here i get data from mockapi start

// here i get data from mockapi end

async function homepageCondition() {
  const endpoint = "users/";

  const person_data = await getPersonData(endpoint, user_api_id);

  const team_ids = await getTeamid(user_api_id);

  const area_data = await getarea(person_data.areaUniqueId);

  const filter_teamcap_data = team_ids.find((e) => e.activeStatus === 1);

  const filter_teamin_data = team_ids.find(
    (e) => e.activeStatus === 2 || e.activeStatus === 1
  );

  if (filter_teamin_data) {
    const all = document.querySelectorAll(".not_in_team");

    all.forEach((e) => (e.style.display = "none"));

    if (!filter_teamcap_data) {
      const all = document.querySelectorAll(".captain");

      all.forEach((e) => (e.style.display = "none"));
    }
  }

  if (!filter_teamin_data) {
    const all = document.querySelectorAll(".in_team");

    all.forEach((e) => (e.style.display = "none"));
    if (!filter_teamcap_data) {
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
  if (player_image_url === "") {
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
  const { area } = area_data;
  const { distric } = area_data;
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
}
async function getplayerDet(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);

  const result = await data;

  return result.data;
}
async function createMatchBtn() {
  const player_profile = await getplayerDet("users", user_api_id)

  window.location.href = `/pages/teamplayer captain/creatematch.html?my_name=${player_profile.userName}&opponent_url=null&opponent_name=null&captain=null&type=null&opponent_id=null`;
}
// sidebar js work end ---------------------------------------------------

document
  .querySelector(".playerdetailsdiv")
  .addEventListener("click", profilepage);
document
  .querySelector(".playerimagediv")
  .addEventListener("click", profilepage);

function previousPage() {
  window.history.go(-1);
}

window.onload = homepageCondition();
