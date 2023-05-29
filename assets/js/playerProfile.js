import {pastMatchData} from './past_match.js';

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const url_id = JSON.parse(urlParams.get("unique_id"));

const my_id = JSON.parse(localStorage.getItem("user_id"));

// ----------------- button css animation start

function member() {
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
  function profile() {
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
document.querySelector(".profilebtn").addEventListener("click", profile);
document.querySelector(".matchbtn").addEventListener("click", match)
document.querySelector(".memberbtn").addEventListener("click", member)
document.querySelector(".statsbtn").addEventListener("click", stats)
document.querySelector(".backtohome").addEventListener("click", previousPage)
  // ----------------button css animation end
async function getMyMatchesReq(player_id) {
    const data = axios.get(`http://localhost:3000/match_team_members`, {
        params: {
            player_id : player_id,
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
function teamCard(teamProfile) {
const template = `<div class="playerteam">
                <div class="myteam">
                    <div class="teamimagediv">
                        <img class="teamprofile" src="${teamProfile.teamImageUrl}" alt="${
    teamProfile.teamName
    }">
                    </div>
                    <div class="teamdetaildiv">
                        <div>
                            <div><h2>${teamProfile.teamName}</h2></div>
                            <div>
                                <i class="fa-regular fa-calendar"></i>
                                <p>Since ${moment(teamProfile.dateOfJoin).format("MMM Do YY")}</p></div>
                        </div>
                        <div class="matchdetails"><i class="fa-solid fa-location-dot"></i>
                            <p>${teamProfile.address.area}, ${teamProfile.address.distric}</p></div>
    
                            <div class="matchdetails"><i class="fa-solid fa-circle-info"></i>
                                <p>${teamProfile.about}</p></div>	
                    </div>
                </div>
        </div>
        `;
    return template;
}

async function getplayerDet(endpoint, user_api_id) {
    const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);
  
    const result = await data;
  
    return result.data;
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

async function playerProfilePage(){

let playerProfile = await getplayerDet("users", url_id); // here i find player profile

const area_obj = await getplayerDet("area_list", playerProfile["areaUniqueId"]);
// ------------players team start-----
playerProfile["address"] = area_obj;
console.log(playerProfile);

const team_player_all_rel = await getRelationDataByPlayer("player_team_relation", url_id)

const find_relation = team_player_all_rel.find(e => e.activeStatus === 1 || e.activeStatus === 2)
let teamProfile = "";
// we find players team if he/she in team this condition works (start)
if (find_relation) {

    teamProfile = await getplayerDet("team_details_list", find_relation["teamId"]);
    const team_area_obj = await getplayerDet("area_list", teamProfile["address_id"]);
    teamProfile["address"] = team_area_obj ;
    // here i find the team profile
  console.log(teamProfile);
  const my_team_id = teamProfile.id;

  document.querySelector("section.three .playermatch").innerHTML =
    teamCard(teamProfile);

  document.querySelector(".playerteam").addEventListener("click",() => {
    window.location.href = `../profile/teamprofile.html?team_id=${my_team_id}`;
  });

}
// we find players team if he/she in team this condition works (end)

// ------------players team end-----


// PLAYER PROFILE START
const player_image = document.createElement("img");
player_image.setAttribute("src", playerProfile.imageUrl);
player_image.setAttribute("alt", playerProfile.userName);
document.querySelector(".playerimagediv").prepend(player_image);

const player_background_image = document.createElement("img");
player_background_image.setAttribute("class", "bgimg");
player_background_image.setAttribute("src", playerProfile.imageUrl);
player_background_image.setAttribute("alt", playerProfile.userName);
document.querySelector("header").prepend(player_background_image);

const playerUserName = playerProfile.userName;
document.querySelector(".profiledetailsdiv p").innerHTML = playerUserName;

const playerLocation = playerProfile.address.area;
document.querySelector(".profiledetailsdiv div:nth-child(2) p").innerHTML =
  playerLocation;

const playerSince = moment(playerProfile.dateOfJoin);
document.querySelector(".profiledetailsdiv div:nth-child(3) p").innerHTML =
  `Since  ${playerSince.format("MMM Do YY")}`;

const playerFullName = `${playerProfile.firstName} ${playerProfile.lastName}`;
document.querySelector(".player_full_name").innerHTML = playerFullName;

const playerAge = playerProfile.dateOFBirth;
const dob = new Date(playerAge);
const today = new Date();
let age = today.getTime() - dob.getTime();
age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
document.querySelector(".player_age").innerHTML = age;

const playerGender = playerProfile.gender;
document.querySelector(".player_gender").innerHTML = playerGender;

const playerGame = playerProfile.game;
document.querySelector(".player_game").innerHTML = playerGame;

let playerTeamName = "--";
if (playerProfile.captainStatus !== 2) {
  playerTeamName = teamProfile.teamName;
}
document.querySelector(".player_team_name").innerHTML = playerTeamName;

const playerArea = `${playerProfile.address.area}, ${playerProfile.address.distric}`;
document.querySelector(".player_area").innerHTML = playerArea;

const playerAbout = playerProfile.about;
document.querySelector(".player_about").innerHTML = playerAbout;

// PLAYER PROFILE END
// here For player past match

let completed_match_list =[]

const completete_match_req_id = await getMyMatchesReq(url_id);
for(let i=0; i<completete_match_req_id.length; i++){
    const data = completete_match_req_id[i]["matchRequestId"]
    const my_match_req_id = await getDataById("match_response_list", data)
    if(my_match_req_id["match_in_status"] === 1){
        const get_match_obj = await getDataById("match_list", my_match_req_id["matchUniqueId"]);
        const today = new Date(get_match_obj["time"]);
        const tomorrow = new Date(today);
        if(get_match_obj["activeStatus"] === 0 && tomorrow < new Date()){
            completed_match_list.push(get_match_obj)
        }
    }
}
pastMatchData(completed_match_list)

}
function previousPage() {
  window.history.go(-1);
}

window.onload = playerProfilePage();
