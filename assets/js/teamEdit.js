
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const captain_id = urlParams.get("unique_id");

const team_id = urlParams.get("team_id");

const { origin } = window.location;

const my_id = JSON.parse(localStorage.getItem("user_id"));

// here i done function for show players details
function playerstemp(player, captain, remove, classes, click) {
    const template1 = `	
  <div class="teams">
          <div class="teamimagediv">
              <img class="teamprofile playerimg" src="${player.imageUrl}" alt="profile of ${player.userName}">
          </div>
          <div class="teamdetaildiv playerdet">
              <div>
                  <div><p class="playername">${player.userName}   <b>${captain}</b></p></div>
                  <div class="whatsapp">
                      <a class="${classes}" data-id="${player.id}" onclick="${click}">${remove}</a>
                      </div>
              </div>
              <div class="matchdetails"><i class="fa-solid fa-calendar-week"></i>
                  <p>21</p></div>
      
          </div>
      </div>
      `;
    return template1;
}

function switchCap(player) {
const template1 = `	
<div class="teams">
        <div class="teamimagediv">
            <img class="teamprofile playerimg" src="${player.imageUrl}" alt="profile of ${player.userName}">
        </div>
        <div class="teamdetaildiv playerdet">
            <div>
                <div><p class="playername">${player.userName}</p></div>
                <div class="whatsapp">
                    <a type="button" class="select_cap" data-id="${player.id}">SELECT</a>
                    </div>
            </div>
            <div class="matchdetails"><i class="fa-solid fa-calendar-week"></i>
                <p>21</p></div>
    
        </div>
    </div>
    `;
return template1;
}

async function getTeamDet(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);

  const result = await data;

  return result.data;
}

async function updateData(endpoint, data) {
  let value = 1;
    await axios.patch(`http://localhost:3000/${endpoint}`, data, {
        "Content-Type": "application/json",
      }).then((d) => {
        console.log(d);
        value = d.data
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong in update relation");
      });
  
  console.log(value)
      return value
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
// here i done function for delete team
async function teamDelete() {
  const teamProfile = await getTeamDet("team_details_list", team_id);
    if (
      confirm(
        `Are you sure that you want to DELETE ?` +
          ` You can't get '${teamProfile.teamName}' as your user name again after you delete this team`
      )
    ) {
      const data = {
        "openForPlayersStatus": false,
      }
      const change_team_data = await updateData(`team_details_list/${team_id}`, data)

      if(change_team_data !== 1){
        const all_team_members = await getRelationDataByPlayer("player_team_relation", team_id)
        const my_team_member = all_team_members.filter(e => e.activeStatus !== 0)

        for(let i=0; i<my_team_member.length; i++){
          const value = {
            "activeStatus": 0,
          }
          await updateData(`player_team_relation/${my_team_member[i]["id"]}`, value)
        }

        window.location.href = `../homepage/hpexist.html`;
      }

    }
}

function memberEdit() {
    const toggle_button = document.querySelector(".toggle_button");
    toggle_button.style.left = "50%";
  
    const btn_color_1 = document.querySelector(".darkbtn");
    btn_color_1.style.color = "#000";
  
    const btn_color_2 = document.querySelector(".lightbtn");
    btn_color_2.style.color = "#fff";
  
    const content_1 = document.querySelector("section.first");
    content_1.style.display = "none";
  
    const content_2 = document.querySelector("section.second");
    content_2.style.display = "block";
  }
  
  function profileEdit() {
    const toggle_button = document.querySelector(".toggle_button");
    toggle_button.style.left = "0%";
  
    const btn_color_1 = document.querySelector(".darkbtn");
    btn_color_1.style.color = "#fff";
  
    const btn_color_2 = document.querySelector(".lightbtn");
    btn_color_2.style.color = "#000";
  
    const content_1 = document.querySelector("section.first");
    content_1.style.display = "block";
  
    const content_2 = document.querySelector("section.second");
    content_2.style.display = "none";
  }
  
  function myFunction() {
    const image_input = document.getElementById("team_image").value;
    const image_element = document.getElementById("team_image_show");
    image_element.setAttribute("src", image_input);
    if (image_element.getAttribute("src") === "") {
      image_element.setAttribute(
        "src",
        "../../assets/images/defalt_team_image.png"
      );
    }
  }

// here i create popup for switch captain
function switchCaptain() {
    const popup = document.querySelector(".popup_content");
    popup.classList.add("open-popup"); // hear we add class for show popup
    //  hear we work for display team member repeat pattern
  }
function ClosePopup() {
const popup = document.querySelector(".popup_content");
popup.classList.remove("open-popup");
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

function updateTeamData(endpoint, data) {
  // axios.post(url, data, headerOptions)

  axios
    .patch(`http://localhost:3000/${endpoint}`, data, {
      "Content-Type": "application/json",
    })

    .then((data) => {
      console.log(data);

      window.location.href = `${origin}/pages/profile/teamprofile.html?team_id=${team_id}`;
    })
    .catch((error) => {
      console.log(error);
    });
}
async function teamUpdate(e) {

    e.preventDefault();
  
    // for unique user name start
    // teamProfile.teamName = "";
  

    // const same_team_name = team_list.some((data) => data.teamName === team_name);
  
    // if (same_team_name) {
    //   b = document.querySelector(".wrong_password").innerHTML =
    //     "Team name not available.  ";
    //   return b;
    // }
  
    // for unique user name end
  

    let teamProfile = {}
    const open_player_checkbox = document.getElementById("open_for_players").checked;
    const player_description = document.getElementById("team_player_description").value;
    const team_name = document.getElementById("teamname").value;
    const area = document.getElementById("area").value;
    const distric = document.getElementById("distric").value;
    const about = document.getElementById("team_about").value;
    let image = document.getElementById("team_image").value;
  
    const address_id = await findarea(area, distric);

    teamProfile.teamName = team_name;
    teamProfile.about = about;
    teamProfile.address_id = address_id;
    teamProfile.openForPlayersStatus = open_player_checkbox;
    teamProfile.openForPlayersDescription = player_description;
  
    if (image === "") {
      image = "https://iili.io/HGUnV71.png";
    }
    teamProfile.teamImageUrl = image;

    const endpoint = `team_details_list/${team_id}`;
    await updateTeamData(endpoint, teamProfile);


  }


async function updateData(endpoint, data) {
  let value = 1;
    await axios.patch(`http://localhost:3000/${endpoint}`, data, {
        "Content-Type": "application/json",
      }).then((d) => {
        console.log(d);
        value = d.data
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong in update relation");
      });
  
  console.log(value)
      return value
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
async function getDataById(endpoint, user_api_id) {
    const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);
  
    const result = await data;
  
    return result.data;
}
async function teamEditPage() {

const player_relation_data = await getRelationDataByPlayer("player_team_relation", my_id)
const me_team_relation = player_relation_data.find(e => e.teamId === JSON.parse(team_id) && e.activeStatus !== 0)

//  find captain or not

if (me_team_relation === undefined || me_team_relation.activeStatus !== 1) {
  window.location.href = `../homepage/hpexist.html`;
}

const teamProfile = await getDataById("team_details_list", team_id);

const teamArea = await getDataById("area_list", teamProfile["address_id"]);

teamProfile["address"] = teamArea ;

// here i paste the value in input form local storage

document.getElementById("team_image").value = teamProfile.teamImageUrl;
document.getElementById("teamname").value = teamProfile.teamName;
document.getElementById("area").value = teamProfile.address.area;
document.getElementById("distric").value = teamProfile.address.distric;
document.getElementById("team_about").value = teamProfile.about;
document.getElementById("open_for_players").checked =
  teamProfile.openForPlayersStatus;
document.getElementById("team_player_description").value =
  teamProfile.openForPlayersDescription;

const image_element = document.getElementById("team_image_show");
image_element.setAttribute("src", teamProfile.teamImageUrl);

const players_list = [];

const unique_player_all = await getRelationDataByTeam("player_team_relation", team_id)

const unique_player = unique_player_all.filter(e => e.activeStatus !== 0)
for (let i = 0; i < unique_player.length; i++) {
  const player_number = unique_player[i]["playerId"];

  let player_object = await getDataById("users", player_number);

  player_object["captainStatus"] = unique_player[i]["activeStatus"]
  players_list.push(player_object);
}
console.log(players_list)

for (let i = 0; i < players_list.length; i++) {
  let captain = "";
  let remove = "";
  let classes = "";
  let click = "";
  if (players_list[i].captainStatus === 1) {
    captain = "captain";
    remove = "SWITCH CAPTAIN";
    classes = "switchcap";
    click = "switchCaptain()";
  } else {
    remove = "REMOVE";
    classes = "remove_player";
  }

  const player = players_list[i];
  const template1 = playerstemp(player, captain, remove, classes, click);
  document
    .querySelector("section.second")
    .insertAdjacentHTML("beforeend", template1);
}

const team_members = players_list.filter((e) => e.captainStatus === 2);

for (let i = 0; i < team_members.length; i++) {
  const player = team_members[i];
  const template1 = switchCap(player);
  document
    .querySelector(".popup_content")
    .insertAdjacentHTML("afterbegin", template1);
}

const switchnewcap = document.querySelectorAll(".select_cap");
switchnewcap.forEach((bookCover) => {
  bookCover.addEventListener("click",async () => {

    const new_cap_id = JSON.parse(bookCover.dataset.id);

    const change_person_rel = await getRelationDataByPlayer("player_team_relation", new_cap_id) 
    const find_rel_id = change_person_rel.find(e => e.activeStatus === 2)
    const value = {
      "activeStatus": 1,
    }
    const change_cap_data = await updateData(`player_team_relation/${find_rel_id["id"]}`, value)

    if(change_cap_data !== 1){
      const change_my_rel = await getRelationDataByPlayer("player_team_relation", my_id) 
      const find_rel_my_id = change_my_rel.find(e => e.activeStatus === 1)
      const value = {
        "activeStatus": 2,
      }
      const change_my_data = await updateData(`player_team_relation/${find_rel_my_id["id"]}`, value)
  
      if(change_my_data === 1){
        alert("not changed properly")
      }
      if(change_my_data !== 1){
        window.location.reload()
      }
    }

});
});

const bookCovers = document.querySelectorAll(".remove_player");
bookCovers.forEach((bookCover) => {
  bookCover.addEventListener("click", async () => {

    const remove_id = JSON.parse(bookCover.dataset.id);
    const person_data = players_list.find(
      (book) => book.id === remove_id
    );
    if (
      confirm(
        `Are you confrim to Remove "${person_data.userName}" From your team`
      )
    ) {
      const change_person_rel = await getRelationDataByPlayer("player_team_relation", remove_id) 
      const find_rel_id = change_person_rel.find(e => e.activeStatus === 2)
      const value = {
        "activeStatus": 0,
      }
      const cap_data = await updateData(`player_team_relation/${find_rel_id["id"]}`, value)
      if(cap_data !== 1){
        window.location.reload()
      }
    }
  });
});

}

function previousPage() {
  window.history.go(-1);
}

window.onload = teamEditPage();