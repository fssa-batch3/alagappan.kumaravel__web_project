
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const player_id = JSON.parse(localStorage.getItem("user_id"));
if (!player_id) {
  window.location.href = "../../index.html";
}
const opponent_id = urlParams.get("opponent_id");

const opponent_url = urlParams.get("opponent_url");

const opponent_name = urlParams.get("opponent_name");

const opponent_cap_name = urlParams.get("captain");

const opponent_type = JSON.parse(urlParams.get("type"));

const cap_name = urlParams.get("my_name");

// const team_list = JSON.parse(localStorage.getItem("team_details_list"));

// const all_player_list = JSON.parse(localStorage.getItem("user_detail"));

async function getRelationDataByPlayer(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}`, {
    params: {
      playerId: user_api_id,
      activeStatus: 1
    },
  });
  const response = await data;

  const team_players_id = response.data;

  return team_players_id;
}
async function getRelationDataByTeam(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}`, {
    params: {
      teamId: user_api_id
    },
  });
  const response = await data;

  const team_players_id = response.data;

  return team_players_id;
}
async function getTeamObjByArea(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}`, {
    params: {
      address_id: user_api_id,
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
async function createTeamPage() {

  const date_of_match = document.querySelector("#date_and_time");

  const today = new Date();

  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  const max_value = `${yyyy}-${mm}-${dd}T${today.getHours()}:${today.getMinutes()}`;
  if (date_of_match) {
    date_of_match.setAttribute("min", max_value);
  }

  console.log(player_id);
  const team_player_rel = await getRelationDataByPlayer("player_team_relation", player_id)
  console.log(team_player_rel);
  const find_rel = team_player_rel.find(e => e.activeStatus === 1 || e.activeStatus === 2)

  if (!find_rel) {
    window.location.href = "../homepage/hpexist.html";
  }

  const teamProfile = await getDataById("team_details_list", find_rel["teamId"]);

  console.log(teamProfile);

  // here i show my team details

  const my_team_image = document.querySelector(".teamimage");
  my_team_image.setAttribute("src", teamProfile.teamImageUrl);
  my_team_image.setAttribute("alt", teamProfile.teamName);

  const team_name = document.querySelector(".my_team_name");
  team_name.innerHTML = teamProfile.teamName;

  const my_name = document.querySelector(".my_name");
  my_name.innerHTML = cap_name;

  // here i show opponent details

  if (opponent_url === "null") {
    const opp_image = document.querySelector(".opponent_image");
    opp_image.style.visibility = "hidden";
  }

  if (opponent_name === "null") {
    document.querySelector(".opponent_name").innerHTML = "Choose Opponent";
  }
  if (opponent_name !== "null") {
    document.querySelector(".opponent_name").innerHTML = opponent_name;
  }

  if (opponent_name !== "null") {
    document.querySelector(".opp_captain").innerHTML = opponent_cap_name;
  }
  if (opponent_type === 2) {
    const a = document.querySelector(".select_opponent_div div i");
    a.setAttribute("class", "fa-solid fa-map-pin");
  }
  if (opponent_type === 1) {
    const a = document.querySelector(".select_opponent_div div i");
    a.setAttribute("class", "fa-regular fa-copyright");
  }

  if (opponent_name !== "null") {
    const opp_image = document.querySelector(".opponent_image");
    opp_image.setAttribute("src", opponent_url);
    opp_image.setAttribute("alt", opponent_name);
  }

  if (opponent_type === 2) {
    const toggle_button = document.querySelector(".toggle_button");
    toggle_button.style.left = "50%";

    const btn_color_1 = document.querySelector(".darkbtn");
    btn_color_1.style.color = "#f7f7f7";

    const btn_color_2 = document.querySelector(".lightbtn");
    btn_color_2.style.color = "#000";

    const select_team = document.querySelector(".select_opponent_div");
    select_team.removeEventListener("click", selectTeam);
    select_team.addEventListener("click", selectArea);

  }
  if (opponent_type === null || opponent_type === 1) {
    console.log("hi hello");
    const select_team = document.querySelector(".select_opponent_div");
    select_team.removeEventListener("click", selectArea);
    select_team.addEventListener("click", selectTeam);
  }
}

async function selectArea() {
  const team_player_rel = await getRelationDataByPlayer("player_team_relation", player_id)

  const find_rel = team_player_rel.find(e => e.activeStatus === 1 || e.activeStatus === 2)

  const teamProfile = await getDataById("team_details_list", find_rel["teamId"]);

  window.location.href = `./area-select.html?my_name=${cap_name}&team_id=${teamProfile.id}`;
}
async function selectTeam() {
  const team_player_rel = await getRelationDataByPlayer("player_team_relation", player_id)

  const find_rel = team_player_rel.find(e => e.activeStatus === 1 || e.activeStatus === 2)

  const teamProfile = await getDataById("team_details_list", find_rel["teamId"]);

  window.location.href = `./team-select.html?my_name=${cap_name}&team_id=${teamProfile.id}`;
}

function leftbtn() {
  document.querySelector(".opponent_name").innerHTML = "Choose Opponent";

  const opp_image = document.querySelector(".opponent_image");
  opp_image.style.visibility = "hidden";

  const opp_cap_name = document.querySelector(".opp_captain");
  opp_cap_name.style.visibility = "hidden";

  const opp_cap_icon = document.querySelector(".select_opponent_div div i");
  opp_cap_icon.style.visibility = "hidden";

  const toggle_button = document.querySelector(".toggle_button");
  toggle_button.style.left = "5%";

  const btn_color_1 = document.querySelector(".darkbtn");
  btn_color_1.style.color = "#000";

  const btn_color_2 = document.querySelector(".lightbtn");
  btn_color_2.style.color = "#f7f7f7";

  const select_team = document.querySelector(".select_opponent_div");
  select_team.removeEventListener("click", selectArea);
  select_team.addEventListener("click", selectTeam);

}

function rightbtn() {
  document.querySelector(".opponent_name").innerHTML = "Choose Opponent";

  const opp_image = document.querySelector(".opponent_image");
  opp_image.style.visibility = "hidden";

  const opp_cap_name = document.querySelector(".opp_captain");
  opp_cap_name.style.visibility = "hidden";

  const opp_cap_icon = document.querySelector(".select_opponent_div div i");
  opp_cap_icon.style.visibility = "hidden";

  const toggle_button = document.querySelector(".toggle_button");
  toggle_button.style.left = "50%";

  const btn_color_1 = document.querySelector(".darkbtn");
  btn_color_1.style.color = "#f7f7f7";

  const btn_color_2 = document.querySelector(".lightbtn");
  btn_color_2.style.color = "#000";

  const select_team = document.querySelector(".select_opponent_div");
  select_team.removeEventListener("click", selectTeam)
  select_team.addEventListener("click", selectArea);

}

function backBtn() {
  window.location.href = `../homepage/hpexist.html?`;
}

function previousPage() {
  window.history.go(-1);
}

window.onload = createTeamPage();

// here after is for create match when we click the button

async function setData(endpoint, data) {
  let value = null;
  const resp = axios.post(`http://localhost:3000/${endpoint}`, data, {
    "Content-Type": "application/json",
  }).catch((error) => {
    console.log(error);
    alert("Something Went Wrong in update relation");
  });

  const getData = await resp

  if(getData["status"] === 201){
    value = getData.data
  }
  console.log(value)
  return value
}

// async function setData(endpoint, data) {
//   let value = null;
//   try {
//     const response = await axios.post(`http://localhost:3000/${endpoint}`, data, {
//       headers: { "Content-Type": "application/json" },
//     });
//     if (response.status === 201) {
//       value = response.data;
//     }
//   } catch (error) {
//     console.log(error);
//     alert("Something went wrong in updating the relation");
//   }

//   console.log(value);
//   return value;
// }


async function setTeamReqData(endpoint, data) {
  let value = null;
  const resp = axios.post(`http://localhost:3000/${endpoint}`, data, {
    "Content-Type": "application/json",
  }).catch((error) => {
      console.log(error);
      alert("Something Went Wrong in update relation");
    });

  const getData = await resp
  if(getData["status"] === 201){
    value = getData.data
  }
  console.log(value)
  return value
}

async function matchCreate(e) {
  e.preventDefault();

  const team_player_rel = await getRelationDataByPlayer("player_team_relation", player_id)
  console.log(team_player_rel);
  const find_rel = team_player_rel.find(e => e.activeStatus === 1 || e.activeStatus === 2)

  const my_team_id = find_rel["teamId"]
  // let opponent = document.querySelector(".opp_captain").innerText;
  const opp_cap_name = document.querySelector(".opp_captain");

  if (opp_cap_name.style.visibility === "hidden" || opponent_cap_name === "null") {
    document.querySelector(".alert_msg").innerText = "Select your opponent";
  } else {
    const opp_type = opponent_type;
    const opp_id = opponent_id;
    const members = document.getElementById("members").value;
    const type_of_match = document.getElementById("type_of_match").value;
    const players_from_age = document.getElementById("players_from_age").value;
    const players_to_age = document.getElementById("players_to_age").value;
    const date_and_time = document.getElementById("date_and_time").value;
    const address = document.getElementById("address_details").value;
    const add_info = document.getElementById("add_info").value;
    const created_time = moment();
    let address_id = ""
    if (opp_type === 2) {
      address_id = opponent_id
    }

    const match_object = {
      "address_id": address_id,
      "friendType": opp_type,
      "typeOfMatch": type_of_match,
      "time": date_and_time,
      "members": members,
      "membersAgeFrom": players_from_age,
      "membersAgeTo": players_to_age,
      "location": address,
      "information": add_info,
      "createdTime": created_time,
      "activeStatus": 1,
      "createdTeam" : my_team_id,
      "createdBy" : player_id
    };

    const match_list = await setData("match_list", match_object)

    if (match_list !== null) {
      const match_response = {
        "matchUniqueId": match_list["id"],
        "team_id": my_team_id,
        "match_in_status": 1
      };
      const my_all_teammates = await getRelationDataByTeam("player_team_relation", my_team_id)
      const my_team_members = my_all_teammates.filter(e => e.activeStatus !== 0)

      const set_my_team_req = await setData("match_response_list", match_response)
      let for_check = []
      if(set_my_team_req !== null){
        for (let i = 0; i < my_team_members.length; i++) {
          const a = my_team_members[i]["playerId"]
          const obj = {
            "matchRequestId": set_my_team_req["id"],
            "player_id": a,
            "mvpStatus" : 0,
          }
         const team_in_data = await setData("match_team_members", obj)
        //  await new Promise(r => setTimeout(r, 200));
        if(team_in_data !== null){
         for_check.push(team_in_data)
         console.log(team_in_data)
        }
        }
      }
      
      console.log("before", opp_type)
      if(my_team_members.length === for_check.length){
        console.log("after", opp_type)
        if (opp_type === 1) {
          const team_2_details = {
            matchUniqueId: match_list["id"],
            team_id: JSON.parse(opp_id),
            match_in_status: 2
          };
          console.log("after", team_2_details)

         const opp_req = await setData("match_response_list", team_2_details)

         console.log(opp_req)

          if(opp_req !== null){
            console.log("work")
            window.location.href = `./team response.html?`;
          }else{
            console.log("not completed")
          }
        }
        else if (opp_type === 2) {

          const all_area_team = await getTeamObjByArea("team_details_list", JSON.parse(address_id))
          const area_teams = all_area_team.filter(e => e.id !== my_team_id)
          let check_arr = []
          for (let i = 0; i < area_teams.length; i++) {
            const team_2_details = {
              matchUniqueId: match_list["id"],
              team_id: area_teams[i]["id"],
              match_in_status: 2,
            };
            const opp_req = await setData("match_response_list", team_2_details)
            if(opp_req !== null){
              check_arr.push(opp_req)
             }  
          }
          if(area_teams.length === check_arr.length){
            console.log("work")
            window.location.href = `./team response.html?`;
          }else{
            console.log("not completed")
          }
        }
      }
    
    }
    // here i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
    // const match_list = JSON.parse(localStorage.getItem("match_list")) || [];
  }
}