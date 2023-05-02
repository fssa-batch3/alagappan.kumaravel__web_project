const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

const my_name = urlParams.get("my_name");

const team_list = JSON.parse(localStorage.getItem("team_details_list"));

const area_list = [];
for (let i = 0; i < team_list.length; i++) {
  const { area } = team_list[i].address;
  const { distric } = team_list[i].address;

  const object = {
    area,
    distric,
    count: 1,
  };
  const same = area_list.find((e) => e.area === area && e.distric === distric);
  if (!same) {
    area_list.push(object);
  }
  if (same) {
    same.count += 1;
  }
}
console.log(area_list);

function renderTeam(team, i) {
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
    <a class="area-link" data-id="${i}">SELECT</a>
</div>
        `;
  return template;
}

for (let index = 0; index < area_list.length; index++) {
  const team = area_list[index];
  const i = index;
  const template = renderTeam(team, i);

  document
    .querySelector(".area-background-color")
    .insertAdjacentHTML("beforeend", template);
}

const selectbtn = document.querySelectorAll(".area-link");
selectbtn.forEach((each) => {
  each.addEventListener("click", () => {
    const index_value = each.dataset.id;

    window.location.href = `../teamplayer captain/creatematch.html?unique_id=${phonenumber}&my_name=${my_name}&opponent_url=https://iili.io/HXFAu87.png&opponent_name=${area_list[index_value].area}&captain=${area_list[index_value].distric}&type=2&opponent_id=0`;
  });
});

function previousPage() {
  window.history.go(-1);
}
