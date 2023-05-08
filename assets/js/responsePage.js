const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

const my_id = JSON.parse(localStorage.getItem("user_id"));

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

async function getDataById(endpoint, user_api_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);

  const result = await data;

  return result.data;
}

async function responsePageLoad(){

const request_data = await getDataByPlayersId("response_list", my_id)

const all_request = request_data.filter(e => e.requestStatus !== 3);

const join_team_response = [];

for (let i = 0; i < all_request.length; i++) {
  const a = all_request[i].teamId;

  const b = await  getDataById("team_details_list", a) ;

  const c = await  getDataById("area_list", b["address_id"])

  b["address"] = c

  join_team_response.push(b);
}
  
console.log(all_request)
for (let i = 0; i < join_team_response.length; i++) {
  const div_teams = document.createElement("div");
  div_teams.setAttribute("class", "teams");

  const team_sub_div = document.createElement("div");
  team_sub_div.setAttribute("class", "teamssub");
  div_teams.append(team_sub_div);

  const team_image_div = document.createElement("div");
  team_image_div.setAttribute("class", "teamimagediv");
  team_sub_div.append(team_image_div);

  const team_image_button = document.createElement("button");
  team_image_button.setAttribute("type", "button");
  // team_image_button.setAttribute("onclick", "OpenPopup()");
  team_image_div.append(team_image_button);

  const team_image = document.createElement("img");
  team_image.setAttribute("class", "teamprofile");
  team_image.setAttribute("src", join_team_response[i].teamImageUrl);
  team_image.setAttribute("alt", `image of${join_team_response[i].teamName}`);
  team_image_button.append(team_image);

  const team_details_div = document.createElement("div");
  team_details_div.setAttribute("class", "teamdetaildiv");
  team_sub_div.append(team_details_div);

  const team_details_subdiv1 = document.createElement("div");
  team_details_div.append(team_details_subdiv1);

  const team_name_button = document.createElement("button");
  team_name_button.setAttribute("type", "button");
  // team_name_button.setAttribute("onclick", "OpenPopup()");
  team_details_subdiv1.append(team_name_button);

  const team_name_button_div1 = document.createElement("div");
  team_name_button.append(team_name_button_div1);

  const team_name_header = document.createElement("h2");
  team_name_header.innerText = join_team_response[i].teamName;
  team_name_button_div1.append(team_name_header);

  const team_name_button_div2 = document.createElement("div");
  team_name_button.append(team_name_button_div2);

  const icon_location = document.createElement("i");
  icon_location.setAttribute("class", "fa-solid fa-location-dot");
  team_name_button_div2.append(icon_location);

  const area_name_para = document.createElement("p");
  area_name_para.innerText = join_team_response[i].address.area;
  team_name_button_div2.append(area_name_para);

  const team_details_subdiv2 = document.createElement("div");
  team_details_div.append(team_details_subdiv2);

  const icon_handshake = document.createElement("i");
  icon_handshake.setAttribute("class", "fa-regular fa-handshake");
  team_details_subdiv2.append(icon_handshake);

  const open_for_players_details_para = document.createElement("p");
  open_for_players_details_para.innerText =
    join_team_response[i].openForPlayersDescription;
  team_details_subdiv2.append(open_for_players_details_para);

  const status_div = document.createElement("div");
  status_div.setAttribute("class", "statusdiv");
  div_teams.append(status_div);

  const status_para = document.createElement("p");
  const time = moment(all_request[i].createdTime);
  status_para.innerText = time.startOf("sec").fromNow();

  status_div.append(status_para);

  const result_data = all_request[i].requestStatus;

  let result_value = "";

  const status_para_bold = document.createElement("b");
  if (result_data === 1) {
    status_para_bold.setAttribute("class", "boldaccepted");
    result_value = "  (ACCEPTED)";
  } else if (result_data === 0) {
    status_para_bold.setAttribute("class", "boldrejected");
    result_value = "  (REJECTED)";
  } else {
    result_value = "  (Not yet Response)";
  }

  status_para_bold.innerText = result_value;
  status_para.append(status_para_bold);

  const delete_icon = document.createElement("i");
  delete_icon.setAttribute("class", "fa-solid fa-trash-can");
  delete_icon.setAttribute("data-id", all_request[i].id);
  status_div.append(delete_icon);

  if (result_data === 1) {
    delete_icon.style.visibility = "hidden";
  }
  const whatsapp_icon = document.createElement("i");
  whatsapp_icon.setAttribute("class", "fa-brands fa-whatsapp");
  status_div.append(whatsapp_icon);

  document.querySelector("main.response-main").append(div_teams);
}
// condition for delete request
const switchnewcap = document.querySelectorAll(".fa-trash-can");
switchnewcap.forEach((each) => {
  each.addEventListener("click", () => {  
    const request_data = each.dataset.id 
    const data = {
      "requestStatus": 3
    }
    // const lastpoint = ``
    // deleteRequest( ,data)

    location.reload();
  });
});

}

async function deleteRequest(endpoint ,data){
  axios
    .patch(`http://localhost:3000/${endpoint}`, data, {
      "Content-Type": "application/json",
    })

    .then((data) => {
      console.log(data);

      // localStorage.setItem("user_id", JSON.stringify(data.data.id));

      const queryString = window.location.search;

      const urlParams = new URLSearchParams(queryString);

      const phonenumber = urlParams.get("unique_id");

      window.location.href = `${origin}/pages/profile/myprofile.html?unique_id=${phonenumber}`;
    })
    .catch((error) => {
      console.log(error);
    });

}


function previousPage() {
  window.location.reload()
  window.history.go(-1);
 
}

window.onload = responsePageLoad();