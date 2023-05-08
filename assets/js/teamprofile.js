const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const my_team_id = urlParams.get("team_id");

// const unique_id = phonenumber;

// const team_list = JSON.parse(localStorage.getItem("team_details_list"));

// const all_player_list = JSON.parse(localStorage.getItem("user_detail"));

// const players_list = JSON.parse(localStorage.getItem("user_detail"));

// const match_list = JSON.parse(localStorage.getItem("match_list"));

// const request_list = JSON.parse(localStorage.getItem("match_response_list"));

// const score_resopnse = JSON.parse(localStorage.getItem("score_card"));

function exit() {
  if (confirm(`Do you want to Exit from ${teamProfile.teamName} team ?`)) {
    const my_profile_exit = all_player_list.find(
      (e) => e.phoneNumber === phonenumber
    );

    my_profile_exit.captainStatus = 2;

    const indexOfUser = teamProfile.teamMembers.indexOf(
      my_profile_exit.phoneNumber
    );

    teamProfile.teamMembers.splice(indexOfUser, 1);

    localStorage.setItem("user_detail", JSON.stringify(all_player_list));
    localStorage.setItem("team_details_list", JSON.stringify(team_list));

    window.location.href = `../homepage/hpexist.html?unique_id=${phonenumber}`;
  }
}
function profile() {
  const toggle_button = document.querySelector(".button_underline");
  toggle_button.style.left = "75%";

  const content_1 = document.querySelector("section.first");
  content_1.style.display = "none";

  const content_2 = document.querySelector("section.second");
  content_2.style.display = "none";

  const content_3 = document.querySelector("section.three");
  content_3.style.display = "block";

  const content_4 = document.querySelector("section.four");
  content_4.style.display = "none";
}
function match() {
  const toggle_button = document.querySelector(".button_underline");
  toggle_button.style.left = "50%";

  const content_1 = document.querySelector("section.first");
  content_1.style.display = "none";

  const content_2 = document.querySelector("section.second");
  content_2.style.display = "block";

  const content_3 = document.querySelector("section.three");
  content_3.style.display = "none";

  const content_4 = document.querySelector("section.four");
  content_4.style.display = "none";
}
function member() {
  const toggle_button = document.querySelector(".button_underline");
  toggle_button.style.left = "25%";

  const content_1 = document.querySelector("section.first");
  content_1.style.display = "block";

  const content_2 = document.querySelector("section.second");
  content_2.style.display = "none";

  const content_3 = document.querySelector("section.three");
  content_3.style.display = "none";

  const content_4 = document.querySelector("section.four");
  content_4.style.display = "none";
}

function stats() {
  const toggle_button = document.querySelector(".button_underline");
  toggle_button.style.left = "0%";

  const content_1 = document.querySelector("section.first");
  content_1.style.display = "none";

  const content_2 = document.querySelector("section.second");
  content_2.style.display = "none";

  const content_3 = document.querySelector("section.three");
  content_3.style.display = "none";

  const content_4 = document.querySelector("section.four");
  content_4.style.display = "block";
}

function teamEdit() {
  window.location.href = `../my team/myteamedit.html?unique_id=${phonenumber}&team_id=${team_id}`;
}

function renderPlayer(player, captain, whatsapp, me, age) {
  const template1 = `	
      <div class="teams">
                      <div class="teamimagediv">
                          <img class="teamprofile playerimg" src="${player.imageUrl}" alt="Image of ${player.userName}">
                      </div>
                      <div class="teamdetaildiv playerdet">
                          <div>
                              <div><p class="playername">${player.userName}<b>${me} ${captain}</b></p></div>
                              <div class="whatsapp">
                                  ${whatsapp}
                                  </div>
                          </div>
                          <div class="matchdetails"><i class="fa-solid fa-calendar-week"></i>
                              <p>${age}</p></div>
      
                      </div>
                  </div>
      `;
  return template1;
}

window.onload = teamPageLoad();

// upto this common for all section
async function getTeamDet(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);

  const result = await data;

  return result.data;
}
async function getTeamPlayersObject(team_players_id) {
  const result = [];

  for (let i = 0; i < team_players_id.length; i++) {
    const player_id = team_players_id[i].playerId;
    result.push(await getTeamDet("users", player_id));
  }

  return result;
}

async function getMyTeamPlayersId(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}`, {
    params: {
      teamId: user_api_id,
    },
  });

  const response = await data;

  const team_players_id = response.data;

  return team_players_id;
}

async function teamPageLoad() {
  const teamProfile = await getTeamDet("team_details_list", my_team_id);

  const team_players_relation_list = await getMyTeamPlayersId(
    "player_team_relation",
    my_team_id
  );

  const team_players_list = await getTeamPlayersObject(
    team_players_relation_list
  );

  const my_id = JSON.parse(localStorage.getItem("user_id"));

  // function findPlayer(a) {
  //   const index = a.teamMembers.indexOf(unique_id);
  //   return a.teamMembers[index] === unique_id;
  // }

  // const teamProfile = team_list.find(findPlayer);

  // const team_id = teamProfile.id;

  // let completed_match_list;
  // const completed_match = [];

  // if (request_list !== undefined) {
  //   completed_match_list = request_list.filter(
  //     (e) => e.match_in_status === 1 && e.team_id === team_id
  //   );
  // }

  // const unique_player = teamProfile.teamMembers;

  // const team_players_list = [];

  // for (let i = 0; i < unique_player.length; i++) {
  //   const player_number = unique_player[i];

  //   function findPlayer(a) {
  //     return a.phoneNumber === player_number;
  //   }

  //   const player_object = all_player_list.find(findPlayer);

  //   team_players_list.push(player_object);
  // }

  const my_profile_id = team_players_relation_list.find(
    (e) => e.playerId === my_id
  );

  if (
    my_profile_id === undefined ||
    my_profile_id.activeStatus === 0 ||
    my_profile_id.activeStatus === 2
  ) {
    document.querySelector(".edit_team").style.display = "none";
  }

  const players_age = [];

  for (let i = 0; i < team_players_list.length; i++) {
    let captain = "";
    let whatsapp = "";
    let me = "";

    if (team_players_relation_list[i].activeStatus === 1) {
      captain = "captain";
    }
    if (
      team_players_list[i].id === my_id &&
      team_players_relation_list[i].activeStatus === 1
    ) {
      whatsapp = "";
      me = "(you)";
    } else if (team_players_list[i].id !== my_id) {
      whatsapp = '<i class="fa-brands fa-whatsapp"></i>';
    } else {
      whatsapp = '<a class="exit_from_team" onclick="exit()">EXIT</a>';
      me = "(you)";
    }

    const playerAge = team_players_list[i].dateOFBirth;
    const dob = new Date(playerAge);
    const today = new Date();
    let age = today.getTime() - dob.getTime();
    age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
    players_age.push(age);

    const player = team_players_list[i];
    const template1 = renderPlayer(player, captain, whatsapp, me, age);
    document
      .querySelector(".playermatch")
      .insertAdjacentHTML("beforeend", template1);
  }

  // here i find max and min of players of the age

  const max = Math.max(...players_age);
  const min = Math.min(...players_age);
  const team_area_object = await getTeamDet(
    "area_list",
    teamProfile.address_id
  );

  const team_image = document.createElement("img");
  team_image.setAttribute("src", teamProfile.teamImageUrl);
  team_image.setAttribute("alt", `logo of ${teamProfile.teamName}`);
  document.querySelector(".playerimagediv").prepend(team_image);

  const team_background_image = document.createElement("img");
  team_background_image.setAttribute("class", "bgimg");
  team_background_image.setAttribute("src", teamProfile.teamImageUrl);
  team_background_image.setAttribute("alt", `logo of ${teamProfile.teamName}`);
  document.querySelector("header").prepend(team_background_image);

  const teamUserName = teamProfile.teamName;
  document.querySelector(".profiledetailsdiv p").innerHTML = teamUserName;

  const teamLocation = team_area_object.area;
  document.querySelector(".profiledetailsdiv div:nth-child(2) p").innerHTML =
    teamLocation;

  const teamSince = moment(teamProfile.dateOfJoin);

  document.querySelector(
    ".profiledetailsdiv div:nth-child(3) p"
  ).innerHTML = `Since  ${teamSince.format("MMM Do YY")}`;

  const teamArea = `${team_area_object.area}, ${team_area_object.distric}`;
  document.querySelector(".area").innerHTML = teamArea;

  const teamAge = `${min} - ${max}`;
  document.querySelector(".age").innerHTML = teamAge;

  const teamAbout = teamProfile.about;
  document.querySelector(".about").innerHTML = teamAbout;

  if (teamProfile.openForPlayersStatus) {
    const teamOpenForPlayer = teamProfile.openForPlayersDescription;
    document.querySelector(".open_for_player").innerHTML = teamOpenForPlayer;
  } else {
    document.querySelector(".open_for_player").innerHTML =
      "They did Not want any players";
  }

  const teamMemberCount = team_players_list.length;
  document.querySelector(".member").innerHTML = teamMemberCount;
}

function previousPage() {
  window.history.go(-1);
}
