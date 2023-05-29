const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

const my_id = JSON.parse(localStorage.getItem("user_id"));

const { origin } = window.location;

async function myTeam(teamId) {
  window.location.href = `${origin}/pages/profile/teamprofile.html?team_id=${teamId}`;
}

async function getDataById(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);

  const result = await data;

  return result.data;
}

async function getDataByPlayersId(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}`, {
    params: {
      playersId: user_api_id,
    },
  });
  const response = await data;

  const team_players_id = response.data;

  return team_players_id;
}

async function getOpenTeamDetails(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}`, {
    params: {
      openForPlayersStatus: user_api_id,
    },
  });
  const response = await data;

  const team_players_id = response.data;

  return team_players_id;
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
async function getRelationDataByTeam(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}`, {
    params: {
      teamId: user_api_id,
    },
  });
  const response = await data;

  const team_players_id = response.data;

  return team_players_id;
}

function renderTeam(team, address) {
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
                                  <p>${address.area}</p>
                              </div>
                          
                      </div>
                      <div>
                          <i class="fa-regular fa-handshake"></i>
                          <p>${team.openForPlayersDescription}</p>
                      </div>
                  </div>
                  <p class="select-link" data-id="${team.id}">SELECT</p>
              </div>
              `;
  return template;
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

// requestStatus 0 = rejected
// requestStatus 1 = accepted
// requestStatus 2 = not yet response
// requestStatus 3 = not active
window.onload = joinTeamPageLoad();

async function joinTeamPageLoad() {
  const response_list = await getDataByPlayersId("response_list", my_id);

  const players_request = response_list.filter((e) => e.requestStatus === 2);
  const requested_team_id = [];

  for (let i = 0; i < players_request.length; i++) {
    const a = players_request[i].teamId;

    requested_team_id.push(a);
  }

  const jointeam = await getOpenTeamDetails("team_details_list", true);

  const requested_teams = []; // here i push the requested team object for remove form all request

  for (let i = 0; i < requested_team_id.length; i++) {
    const a = requested_team_id[i];

    const b = jointeam.find((e) => e.id === a);

    requested_teams.push(b);
  }
  // here i remove that team
  for (let i = 0; i < requested_team_id.length; i++) {
    const user_id = requested_teams[i];

    const index = jointeam.indexOf(user_id);

    console.log(index);
    jointeam.splice(index, 1);
  }

  const relation_object = await getRelationDataByPlayer(
    "player_team_relation",
    my_id
  );

  const find_player_teamin = relation_object.find((e) => e.activeStatus === 1);

  for (let index = 0; index < jointeam.length; index++) {
    const team = jointeam[index];

    const area_id = team.address_id;

    const address = await getDataById("area_list", area_id);

    const template = renderTeam(team, address);
    document
      .querySelector(".join-team-content")
      .insertAdjacentHTML("beforeend", template);

    // here i just hide that select button for team players
    if (find_player_teamin) {
      const a = document.querySelectorAll("p.select-link");
      for (let i = 0; i < a.length; i++) {
        a[i].style.display = "none";
      }
    }
  }

  // response create start
  const selectbtn = document.querySelectorAll(".select-link");
  selectbtn.forEach((each) => {
    each.addEventListener("click", async () => {
      const team_unique_id = JSON.parse(each.dataset.id);
      const created_time = moment();

      const response_details = {
        playerId: my_id,
        teamId: team_unique_id,
        createdTime: created_time,
        requestStatus: 2,
      };

      await setData("response_list", response_details);
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
    window.location.href = `${origin}/pages/profile/teamprofile.html?team_id=${popup_viewprofile.dataset.viewid}`;
  });

  // function for team members display in popup end
}

async function setData(endpoint, data) {
  console.log(data);

  // axios.post(url, data, headerOptions)

  await axios
    .post(`http://localhost:3000/${endpoint}`, data, {
      "Content-Type": "application/json",
    })

    .then(async (result) => {
      console.log(result);

      window.location.href = `./response.html?unique_id=${phonenumber}`;
    })
    .catch((error) => {
      console.log(error);
      alert("Something Went Wrong");
    });
}

function ClosePopup() {
  popup.classList.remove("open-popup");
}
function previousPage() {
  window.history.go(-1);
}
