const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const team_id = urlParams.get("team_id");

const my_name = urlParams.get("my_name");

async function getDataById(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);

  const result = await data;

  return result.data;
}
function renderTeam(team) {
  const template = `
        <div class="area-content">
    <i class="fa-solid fa-location-dot"></i>
    <div>
        <h2>${team.area} (${team.count})</h2>
        <div class="pin">
            <i class="fa-solid fa-map-pin"></i>
            <p>${team.distric}</p>
        </div>
    </div>
    <a class="area-link" data-id="${team.id}">SELECT</a>
</div>
        `;
  return template;
}
async function areaSelectPage(){

const all_teams_axios = await axios.get(`http://localhost:3000/team_details_list`)
let all_teams = all_teams_axios.data

const my_team = await getDataById("team_details_list", team_id)

let jointeam = all_teams.filter(e => e.id !== my_team["id"])

console.log(jointeam);

const area_axios = await axios.get(`http://localhost:3000/area_list`)
let area = area_axios.data


const area_list = [];

for (let i = 0; i < jointeam.length; i++) {
  const area_id = jointeam[i]["address_id"]

  const find_id = area.find(e => e.id === area_id)

  const find_in_arealist = area_list.find(e => e.id === area_id)

  if(find_in_arealist){
    find_in_arealist["count"] += 1
  }else{
    find_id["count"] = 1
    area_list.push(find_id)
  }

}
console.log(area_list);



for (let index = 0; index < area_list.length; index++) {
  const team = area_list[index];
  const i = index;
  const template = renderTeam(team);

  document
    .querySelector(".area-background-color")
    .insertAdjacentHTML("beforeend", template);
}

const selectbtn = document.querySelectorAll(".area-link");
selectbtn.forEach((each) => {
  each.addEventListener("click", () => {
    const id_area = JSON.parse(each.dataset.id);

    const find_in_list = area_list.find(e => e.id === id_area)

    window.location.href = `../teamplayer captain/creatematch.html?my_name=${my_name}&opponent_url=https://iili.io/HXFAu87.png&opponent_name=${find_in_list["area"]}&captain=${find_in_list["distric"]}&type=2&opponent_id=${find_in_list["id"]}`;
  });
});


}

function previousPage() {
  window.history.go(-1);
}

window.onload = areaSelectPage();