// for friend list start

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

const my_id = JSON.parse(localStorage.getItem("user_id"));

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

async function getTeamMatchLsit(endpoint, team_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}`, {
    params: {
      createdTeam: team_id,

    },
  });
  const response = await data;

  const team_players_id = response.data;

  return team_players_id;
}

async function getMatchResList(endpoint, team_id) {
  const data = axios.get(`http://localhost:3000/${endpoint}`, {
    params: {
      matchUniqueId: team_id,
    },
  });
  const response = await data;

  const team_players_id = response.data;

  return team_players_id;
}
async function getMatchResListByTeam(endpoint, team_id) {
    const data = axios.get(`http://localhost:3000/${endpoint}`, {
      params: {
        team_id: team_id,
        match_in_status: 2,
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

async function matchInvitatonPage() {

// const team_list = JSON.parse(localStorage.getItem("team_details_list"));

// const players_list = JSON.parse(localStorage.getItem("user_detail"));



// function findPlayer(a) {
//   const index = a.teamMembers.indexOf(phonenumber);
//   return a.teamMembers[index] === phonenumber;
// }

// const teamProfile = team_list.find(findPlayer);

// const my_team_id = teamProfile.uniqueId;

// const match_list = JSON.parse(localStorage.getItem("match_list"));

// const request_list = JSON.parse(localStorage.getItem("match_response_list"));

// const match_request_list = request_list.filter(
//   (e) => e.team_id === my_team_id && e.match_in_status === 2
// );

// console.log(match_request_list);


// console.log(matchInvitaton);

// for public list end

// console.log(public_data)

// [{}]   // filtered

// [{}, {}]   // area filtered

// [ {}, {}, {} ]  = [  ...arr1, ...arr2 ]

// new Set(), new Map()


const relation_object = await getRelationDataByPlayer(
    "player_team_relation",
    my_id
  );
  const find_team_id = relation_object.find((e) => e.activeStatus !== 0);
  
  const team_unique_id = find_team_id.teamId;
  
  const teamProfile = await getDataById("team_details_list", team_unique_id)
  
  const my_team_id = teamProfile.id;

  const all_team_request = await getMatchResListByTeam("match_response_list", my_team_id)
  
console.log(all_team_request)
  const matchInvitaton = [];

for (let i = 0; i < all_team_request.length; i++) {
  const check = all_team_request[i].matchUniqueId;

  const match_data = await getDataById("match_list", check)

  if (match_data["activeStatus"] === 1) {
    matchInvitaton.push(match_data);
  }
}
  
  console.log(matchInvitaton)
  // match request card start
  let count = 0;
  let result_data = "";
  

for (let i = 0; i < matchInvitaton.length; i++) {

  const opponent_team_id = matchInvitaton[i]["createdTeam"]

  const opponent_team_object = await getDataById("team_details_list", opponent_team_id)

  const div_class_invitation = document.createElement("div");
  div_class_invitation.setAttribute("class", "invitation");

  // div one

  const div_class_invitation_one = document.createElement("div");
  div_class_invitation_one.setAttribute("class", "invitation-one");
  div_class_invitation.prepend(div_class_invitation_one);

  const team_img_div = document.createElement("div");
  team_img_div.setAttribute("class", "teamimgdiv");
  div_class_invitation_one.prepend(team_img_div);

  const team_image = document.createElement("img");
  team_image.setAttribute("src", opponent_team_object.teamImageUrl);
  team_image.setAttribute("alt", opponent_team_object.teamName);
  team_img_div.prepend(team_image);

  const team_name_div = document.createElement("div");
  team_name_div.setAttribute("class", "teamnamediv");
  div_class_invitation_one.append(team_name_div);

  const team_name_subdiv = document.createElement("div");
  team_name_subdiv.setAttribute("class", "teamnamesubdiv");
  team_name_div.append(team_name_subdiv);

  const team_name_subdivnthchild1 = document.createElement("div");
  team_name_subdiv.prepend(team_name_subdivnthchild1);

  const team_name_subdiv_header = document.createElement("h2");
  team_name_subdiv_header.innerText = opponent_team_object.teamName;
  team_name_subdivnthchild1.append(team_name_subdiv_header);

  const team_name_subdivnthchild2 = document.createElement("div");
  team_name_subdiv.append(team_name_subdivnthchild2);

  let friend = "";
  let class_type = "";

  if (matchInvitaton[i].friendType === 1) {
    friend = "Friend";
    class_type = "frnd";
  }
  if (matchInvitaton[i].friendType === 2) {
    friend = "Public";
    class_type = "public";
  }

  const team_name_subdiv_para = document.createElement("p");
  team_name_subdiv_para.setAttribute("class", class_type);
  team_name_subdiv_para.innerText = friend;
  team_name_subdivnthchild2.append(team_name_subdiv_para);

  // div two

  const div_class_invitation_two = document.createElement("div");
  div_class_invitation_two.setAttribute("class", "invitation-two");
  div_class_invitation.append(div_class_invitation_two);

  const div_class_invitation_two_subdiv1 = document.createElement("div");
  div_class_invitation_two.prepend(div_class_invitation_two_subdiv1);

  const team_name_subdiv_typeheader = document.createElement("p");
  team_name_subdiv_typeheader.innerText = "Type";
  div_class_invitation_two_subdiv1.append(team_name_subdiv_typeheader);

  const team_name_subdiv_typevalue = document.createElement("p");
  team_name_subdiv_typevalue.innerText = matchInvitaton[i].typeOfMatch;
  div_class_invitation_two_subdiv1.append(team_name_subdiv_typevalue);

  const div_class_invitation_two_subdiv2 = document.createElement("div");
  div_class_invitation_two.append(div_class_invitation_two_subdiv2);

  const team_name_subdiv_timeheader = document.createElement("p");
  team_name_subdiv_timeheader.innerText = "Time";
  div_class_invitation_two_subdiv2.append(team_name_subdiv_timeheader);

  const team_name_subdiv_timevalue = document.createElement("p");

  const match_time = matchInvitaton[i].time;

  team_name_subdiv_timevalue.innerText = moment(match_time)
    .add(0, "days")
    .calendar();
  div_class_invitation_two_subdiv2.append(team_name_subdiv_timevalue);

  // div three

  const div_class_invitation_three = document.createElement("div");
  div_class_invitation_three.setAttribute("class", "invitation-three");
  div_class_invitation.append(div_class_invitation_three);

  const div_class_invitation_three_subdiv1 = document.createElement("div");
  div_class_invitation_three.append(div_class_invitation_three_subdiv1);

  const div_class_invitation_three_icon1 = document.createElement("i");
  div_class_invitation_three_icon1.setAttribute(
    "class",
    "fa-regular fa-copyright"
  );
  div_class_invitation_three_subdiv1.append(div_class_invitation_three_icon1);

  const captain_id = matchInvitaton[i]["createdBy"]

  const captain_obj = await getDataById("users", captain_id)

  const captain = captain_obj["userName"]

//   for (let j = 0; j < opponent_team_object.teamMembers.length; j++) {
//     const a = opponent_team_object.teamMembers[j];

//     const find = players_list.find((e) => e.phoneNumber === a);

//     if (find.captainStatus === 1) {
//       captain = find.userName;
//     }
//   }
  const div_class_invitation_three_para1 = document.createElement("p");
  div_class_invitation_three_para1.innerText = captain; //not enter
  div_class_invitation_three_subdiv1.append(div_class_invitation_three_para1);

  const div_class_invitation_three_subdiv2 = document.createElement("div");
  div_class_invitation_three.append(div_class_invitation_three_subdiv2);

  const div_class_invitation_three_icon2 = document.createElement("i");
  div_class_invitation_three_icon2.setAttribute(
    "class",
    "fa-solid fa-people-group"
  );
  div_class_invitation_three_subdiv2.append(div_class_invitation_three_icon2);

  const div_class_invitation_three_para2 = document.createElement("p");
  div_class_invitation_three_para2.innerText =
    `${matchInvitaton[i].members}  Members` +
    ` (Age :${matchInvitaton[i].membersAgeFrom} to ${matchInvitaton[i].membersAgeTo})`;
  div_class_invitation_three_subdiv2.append(div_class_invitation_three_para2);

  const div_class_invitation_three_subdiv3 = document.createElement("div");
  div_class_invitation_three.append(div_class_invitation_three_subdiv3);

  const div_class_invitation_three_icon3 = document.createElement("i");
  div_class_invitation_three_icon3.setAttribute(
    "class",
    "fa-solid fa-location-dot"
  );
  div_class_invitation_three_subdiv3.append(div_class_invitation_three_icon3);

  const div_class_invitation_three_para3 = document.createElement("p");
  div_class_invitation_three_para3.innerText = matchInvitaton[i].location;
  div_class_invitation_three_subdiv3.append(div_class_invitation_three_para3);

  const div_class_invitation_three_subdiv4 = document.createElement("div");
  div_class_invitation_three.append(div_class_invitation_three_subdiv4);

  const div_class_invitation_three_icon4 = document.createElement("i");
  div_class_invitation_three_icon4.setAttribute(
    "class",
    "fa-solid fa-circle-info"
  );
  div_class_invitation_three_subdiv4.append(div_class_invitation_three_icon4);

  const div_class_invitation_three_para4 = document.createElement("p");
  div_class_invitation_three_para4.innerText = matchInvitaton[i].information;
  div_class_invitation_three_subdiv4.append(div_class_invitation_three_para4);

  // accept reject btn

  const div_accept_reject = document.createElement("div");
  div_accept_reject.setAttribute("class", "accept-reject");
  div_class_invitation.append(div_accept_reject);

  const div_reject_button = document.createElement("button");
  div_reject_button.innerText = "Reject";
  div_reject_button.setAttribute("type", "button");
  div_reject_button.setAttribute("class", "reject-btn");
  div_reject_button.setAttribute("data-id", matchInvitaton[i].id);
  div_accept_reject.append(div_reject_button);

  const div_accept_button = document.createElement("button");
  div_accept_button.innerText = "Accept";
  div_accept_button.setAttribute("type", "button");
  div_accept_button.setAttribute("class", "accept-btn");
  div_accept_button.setAttribute("data-id", matchInvitaton[i].id);
  div_accept_reject.append(div_accept_button);

  // div four

  const div_class_invitation_four = document.createElement("div");
  div_class_invitation_four.setAttribute("class", "invitation-four");
  div_class_invitation.append(div_class_invitation_four);

  const div_class_invitation_four_subdiv = document.createElement("div");
  div_class_invitation_four_subdiv.setAttribute("class", "timetaken");
  div_class_invitation_four.append(div_class_invitation_four_subdiv);

  const div_class_invitation_four_i = document.createElement("i");
  div_class_invitation_four_i.setAttribute("class", "fa-regular fa-clock");
  div_class_invitation_four_subdiv.append(div_class_invitation_four_i);

  const div_class_invitation_four_p = document.createElement("p");

  const { createdTime } = matchInvitaton[i];
  div_class_invitation_four_p.innerText = moment(createdTime)
    .startOf("sec")
    .fromNow();
  div_class_invitation_four_subdiv.append(div_class_invitation_four_p);

  document.querySelector(".match-invitation-main").append(div_class_invitation);
}

const selectbtn = document.querySelectorAll(".accept-btn");
selectbtn.forEach((each) => {
  each.addEventListener("click", async() => {
    const match_id = JSON.parse(each.dataset.id)
    const data = {
      "activeStatus": 0,
    }
    const reset_match_data = await updateData(`match_list/${match_id}`, data)

    const find_my_request = await  getMatchResList("match_response_list", my_team_id, match_id)

    if(reset_match_data !== 1){
        const change = {
            "match_in_status": 1,
          }
        const update_request = await updateData(`match_response_list/${find_my_request[0]["id"]}`, change)
        if(update_request !== 1){

          const my_all_teammates = await getRelationDataByTeam("player_team_relation", my_team_id)
          const my_team_members = my_all_teammates.filter(e => e.activeStatus !== 0)
    
            for (let i = 0; i < my_team_members.length; i++) {
              const a = my_team_members[i]["playerId"]
              const obj = {
                "matchRequestId": update_request["id"],
                "player_id": a,
                "mvpStatus" : 0,
              }
             await setData("match_team_members", obj)

             }
            
        }

    }
    location.reload();
  });
});

const rejectbtn = document.querySelectorAll(".reject-btn");
rejectbtn.forEach((each) => {
  each.addEventListener("click", async () => {
    
    const match_id = JSON.parse(each.dataset.id)

    const find_my_request = await  getMatchResList("match_response_list", my_team_id, match_id)

        const change = {
            "match_in_status": 0,
          }
        await updateData(`match_response_list/${find_my_request[0]["id"]}`, change)
    location.reload();
  });
});

}
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

async function getMatchResList(endpoint, team_id, match_id) {
    const data = axios.get(`http://localhost:3000/${endpoint}`, {
        params: {
        matchUniqueId: match_id,
        team_id : team_id,
        },
    });
    const response = await data;
    
    const team_players_id = response.data;
    
    return team_players_id;
}

function previousPage() {
  window.history.go(-1);
}

window.onload = matchInvitatonPage();