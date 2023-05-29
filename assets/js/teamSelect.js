const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const my_name = urlParams.get("my_name");

const team_id = urlParams.get("team_id");

const { origin } = window.location;

const player_id = JSON.parse(localStorage.getItem("user_id"));
function renderTeam(team) {
    const template = `
              <div class="teams">
                  <div class="teamimagediv popup-name" data-id="${team.id}">
                      <img class="teamprofile"
                              src="${team.teamImageUrl}" alt="logo of ${team.teamName}">
                  </div>
                  <div class="teamdetaildiv">
                      <div>
                          
                              <div class="popup-name" data-id="${team.id}">
                                  <h2>${team.teamName}</h2>
                              </div>
                              <div>
                                  <i class="fa-solid fa-location-dot"></i>
                                  <p>${team.address.area}</p>
                              </div>
                          
                      </div>
                      <div class="pin">
                          <i class="fa-regular fa-copyright"></i>
                          <p>${team.captainUserName}</p>
                      </div>
                  </div>
                  <p class="select-link" data-id="${team.id}">SELECT</p>
              </div>
              `;
    return template;
}
async function getDataById(endpoint, user_api_id) {
    const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);
  
    const result = await data;
  
    return result.data;
}
async function getRelationDataByTeam(endpoint, user_api_id) {
    const data = axios.get(`http://localhost:3000/${endpoint}`, {
      params: {
        teamId: user_api_id,
        activeStatus: 1
      },
    });
    const response = await data;
  
    const team_players_id = response.data;
  
    return team_players_id;
}
async function teamSelectPage(){

const all_teams_axios = await axios.get(`http://localhost:3000/team_details_list`)
let all_teams = all_teams_axios.data

const my_team = await getDataById("team_details_list", team_id)

let jointeam = all_teams.filter(e => e.id !== my_team["id"])

console.log(jointeam);

let filter_team = []

for (let index = 0; index < jointeam.length; index++) {

  let team = jointeam[index];

  const team_cap_rel = await getRelationDataByTeam("player_team_relation", team['id'])
  console.log(team_cap_rel)

  if(team_cap_rel.length !== 0){
    const teamArea = await getDataById("area_list", team['address_id'])
    team["address"] = teamArea

    const cap_obj = await getDataById("users", team_cap_rel[0]["playerId"])
    team["captainUserName"] = cap_obj["userName"]
    filter_team.push(team)
  }

}

for(let i=0; i<filter_team.length;i++){
    const template = renderTeam(filter_team[i]);

    document
      .querySelector(".join-team-content")
      .insertAdjacentHTML("beforeend", template);
}

// function for team members display in popup start
function renderPlayer(player) {
  const template1 = `	
<div>
		<img class="players-list-image" src="${player.imageUrl}" alt="Image of ${player.userName}">
		<p>${player.userName}</p>
	</div>
	`;
  return template1;
}

// response create start

const selectbtn = document.querySelectorAll(".select-link");
selectbtn.forEach((each) => {
  each.addEventListener("click", () => {

    const select_id = JSON.parse(each.dataset.id)

    const person_data = filter_team.find(e => e.id === select_id)

    const captain = person_data.captainUserName;
    
    // const person_data = jointeam.find(
    //   (book) => book.uniqueId === each.dataset.id
    // );

    // const team_members = person_data.teamMembers;


    // for (let j = 0; j < team_members.length; j++) {
    //   const a = team_members[j];

    //   const all_player_list = JSON.parse(localStorage.getItem("user_detail"));

    //   const find = all_player_list.find((e) => e.phoneNumber === a);

    //   if (find.captainStatus === 1) {
    //     captain = find.userName;
    //   }
    // }

    window.location.href = `../teamplayer captain/creatematch.html?my_name=${my_name}&opponent_url=${person_data.teamImageUrl}&opponent_name=${person_data.teamName}&captain=${captain}&type=1&opponent_id=${select_id}`;
  });
});

// response create end

  // function for team members display in popup start
  // onclick button
  const bookCovers = document.querySelectorAll(".popup-name");
  bookCovers.forEach((each) => {
    each.addEventListener("click", async () => {
      const click_id = each.dataset.id;

      const person_data = await getDataById("team_details_list", click_id);
      const person_data_area = await getDataById(
        "area_list",
        person_data.address_id
      );
      const team_members_all = await getRelationDataByTeam(
        "player_team_relation",
        click_id
      );
      const team_members = team_members_all.filter((e) => e.activeStatus === 1);

      const popup = document.getElementById("popup");
      popup.classList.add("open-popup"); // hear we add class for show popup
      //  hear we work for display team member repeat pattern
      document.querySelector(".players-list").innerHTML = "";

      // find players in there team start
      const players_list = [];

      for (let i = 0; i < team_members.length; i++) {
        const player_id = team_members[i].playerId;

        const player_object = await getDataById("users", player_id);

        players_list.push(player_object);
      }
      console.log(players_list);
      // find players in there team end

      for (let index = 0; index < players_list.length; index++) {
        const player = players_list[index];
        const template1 = renderPlayer(player);
        document
          .querySelector(".players-list")
          .insertAdjacentHTML("beforeend", template1);
      }
      // popup team content
      const popup_team_name = document.querySelector(
        "div.popup-team-content h2"
      );
      popup_team_name.innerHTML = person_data.teamName;

      const popup_area_name = document.querySelector("p.popup_area_name");
      popup_area_name.innerHTML = `${person_data_area.area},  ${person_data_area.distric}`;

      const popup_since = document.querySelector("p.popup_since");
      const teamSince = moment(person_data.dateOfJoin);
      popup_since.innerHTML = `Since  ${teamSince.format("MMM Do YY")}`;

      const popup_member_count = document.querySelector(
        "h3.popup_member_count"
      );
      popup_member_count.innerHTML = `Members (${team_members.length})`;

      const popup_viewprofile = document.querySelector(
        "button.profile-view-btn"
      );
      popup_viewprofile.setAttribute("data-viewid", click_id);
    });
  });

  const popup_viewprofile = document.querySelector("button.profile-view-btn");
  popup_viewprofile.addEventListener("click", () => {
console.log("hi")
    window.location.href = `${origin}/pages/profile/teamprofile.html?team_id=${popup_viewprofile.dataset.viewid}`;
  });

  // function for team members display in popup end

}
function ClosePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("open-popup");
}

function previousPage() {
  window.history.go(-1);
}

// function for team members display in popup end

window.onload = teamSelectPage();