import {pastMatchData} from './past_match.js';

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const my_team_id = JSON.parse(urlParams.get("team_id"));

const my_id = JSON.parse(localStorage.getItem("user_id"));
async function getTeamMatchResponse(endpoint, team_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}`, {
      params: {
          team_id: team_id,
          match_in_status: 1,
      },
  });
  const response = await data;
  
  const team_players_id = response.data;
  
  return team_players_id;
}
async function getDataById(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);

  const result = await data;

  return result.data;
}
async function updateData(endpoint, data) {

    await axios.patch(`http://localhost:3000/${endpoint}`, data, {
        "Content-Type": "application/json",
      }).then(() => {
        window.location.href = `../homepage/hpexist.html`;
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong in update relation");
      });
}
async function getRelationDataByPlayer(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}`, {
      params: {
      playerId: user_api_id,
      },
  });
  const response = await data;
  
  const team_players_id = response.data;
  
  return team_players_id;
}
async function exit() {
  const teamProfile = await getTeamDet("team_details_list", my_team_id);
  if (confirm(`Do you want to Exit from ${teamProfile.teamName} team ?`)) {

    const change_person_rel = await getRelationDataByPlayer("player_team_relation", my_id) 
    const find_rel_id = change_person_rel.find(e => e.activeStatus === 2 && e.teamId === my_team_id)
    const value = {
      "activeStatus": 0,
    }
    updateData(`player_team_relation/${find_rel_id["id"]}`, value)

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
  window.location.href = `../my team/myteamedit.html?team_id=${my_team_id}`;
}
document.querySelector(".edit_team").addEventListener("click", teamEdit);
document.querySelector(".profilebtn").addEventListener("click", profile);
document.querySelector(".matchbtn").addEventListener("click", match)
document.querySelector(".memberbtn").addEventListener("click", member)
document.querySelector(".statsbtn").addEventListener("click", stats)
document.querySelector(".backtohome").addEventListener("click", previousPage)
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
    result.push(await getTeamDet("users", player_id)); // should clarify this bug
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

  const team_players_relation_all_list = await getMyTeamPlayersId(
    "player_team_relation",
    my_team_id
  );

  const team_players_relation_list = team_players_relation_all_list.filter(e => e.activeStatus !== 0)

  const team_players_list = await getTeamPlayersObject(
    team_players_relation_list
  );

  const my_id = JSON.parse(localStorage.getItem("user_id"));

  const request_list = await getTeamMatchResponse("match_response_list", my_team_id)
  let completed_match_list =[]
  let match_request_list = []
  let matchInvitaton = []

  for(let i = 0; i < request_list.length; i++){
    const get_match_data = await getDataById("match_list", request_list[i]["matchUniqueId"])
    match_request_list.push(get_match_data)
}

matchInvitaton = match_request_list.filter(
  e =>
  e.activeStatus === 0 &&
  new Date(e.time) > new Date()
);
  completed_match_list = match_request_list.filter(
  e =>{
          const today = new Date(e.time);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);

          const ans =
          e.activeStatus === 0 &&
          tomorrow < new Date();

          return ans;
      })

  pastMatchData(completed_match_list)

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
      whatsapp = '<a class="exit_from_team">EXIT</a>';
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

  const exit_team = document.querySelector(".exit_from_team");
  if(exit_team){
    exit_team.addEventListener("click", () =>{
      if(matchInvitaton.length !== 0){
        alert("Only you can exit this team once all of your matches are over.")
      }
      if(matchInvitaton.length === 0){
        exit()
      }
    })
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
window.onload = teamPageLoad();