// for friend list start

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

const team_list = JSON.parse(localStorage.getItem("team_details_list"));

const players_list = JSON.parse(localStorage.getItem("user_detail"));

function findPlayer(a) {
  const index = a.teamMembers.indexOf(phonenumber);
  return a.teamMembers[index] === phonenumber;
}

const teamProfile = team_list.find(findPlayer);

const my_team_id = teamProfile.uniqueId;

// console.log(my_team_id)
const match_list = JSON.parse(localStorage.getItem("match_list"));

const request_list = JSON.parse(localStorage.getItem("match_response_list"));

const match_request_list = request_list.filter(
  (e) => e.team_id === my_team_id && e.match_in_status === 1
);

const matchInvitaton = [];

for (let i = 0; i < match_request_list.length; i++) {
  const check = match_request_list[i].matchUniqueId;
  const find = match_list.find((e) => e.matchUniqueId === check);
  matchInvitaton.push(find);
}

console.log(matchInvitaton);
// match request card start

for (let i = 0; i < matchInvitaton.length; i++) {
  let opponent_team_object = "";

  if (matchInvitaton[i].friendType === 1) {
    const opponent_team_id = request_list.find(
      (e) =>
        e.matchUniqueId === matchInvitaton[i].matchUniqueId &&
        e.team_id !== my_team_id
    );

    opponent_team_object = team_list.find(
      (e) => e.uniqueId === opponent_team_id.team_id
    );
  }

  if (matchInvitaton[i].friendType === 2) {
    const area_result_filter = request_list.filter(
      (e) =>
        e.matchUniqueId === matchInvitaton[i].matchUniqueId &&
        e.team_id !== my_team_id
    );
    let opp_id = "";
    for (let j = 0; j < area_result_filter.length; j++) {
      const check = area_result_filter[j].match_in_status;
      if (check === 1) {
        opp_id = area_result_filter[j].team_id;
        break;
      }
    }

    opponent_team_object = team_list.find((e) => e.uniqueId === opp_id);
  }

  let captain = "";

  for (let j = 0; j < teamProfile.teamMembers.length; j++) {
    const a = teamProfile.teamMembers[j];

    const find = players_list.find((e) => e.phoneNumber === a);

    if (find.captainStatus === 1) {
      captain = find.userName;
    }
  }

  const div_class_invitation = document.createElement("div");
  div_class_invitation.setAttribute("class", "invitation");

  // div one

  const div_class_invitation_one = document.createElement("div");
  div_class_invitation_one.setAttribute("class", "invitation-one");
  div_class_invitation.prepend(div_class_invitation_one);

  const team_img_div = document.createElement("div");
  team_img_div.setAttribute("class", "teamimgdiv");
  div_class_invitation_one.prepend(team_img_div);
  let opp_team_url = "";
  let opp_team_name = "";
  if (opponent_team_object) {
    opp_team_url = opponent_team_object.teamImageUrl;
    opp_team_name = opponent_team_object.teamName;
  }
  if (!opponent_team_object) {
    opp_team_url = "https://iili.io/HXFAu87.png";
    opp_team_name = matchInvitaton[i].opponentArea.area;
  }

  const team_image = document.createElement("img");
  team_image.setAttribute("src", opp_team_url);
  team_image.setAttribute("alt", opp_team_name);
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
  team_name_subdiv_header.innerText = opp_team_name;
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
    ` (Age :${matchInvitaton[i].membersAge.from} to ${matchInvitaton[i].membersAge.to})`;
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

  // status div

  const div_class_invitation_four = document.createElement("div");
  div_class_invitation_four.setAttribute("class", "statusdiv");
  div_class_invitation.append(div_class_invitation_four);

  const div_class_invitation_four_p = document.createElement("p");
  div_class_invitation_four_p.innerText = moment(matchInvitaton[i].createdTime)
    .startOf("sec")
    .fromNow();
  div_class_invitation_four.append(div_class_invitation_four_p);

  const result_filter = request_list.filter(
    (e) =>
      e.matchUniqueId === matchInvitaton[i].matchUniqueId &&
      e.team_id !== my_team_id
  );

  let count = 0;
  let result_data = "";

  for (let k = 0; k < result_filter.length; k++) {
    const check = result_filter[k].match_in_status;
    if (check === 0) {
      count += 1;
    }

    if (check === 1) {
      result_data = check;
      break;
    }
    if (count > 0) {
      result_data = 0;
    }
    if (count === 0) {
      result_data = 2;
    }
  }

  let result_value = "";

  const status_para_bold = document.createElement("b");
  if (result_data === 1) {
    status_para_bold.setAttribute("class", "boldaccepted");
    result_value = "   ACCEPTED";
  } else if (result_data === 0) {
    status_para_bold.setAttribute("class", "boldrejected");
    if (count === 1) {
      result_value = "  REJECTED";
    }
    if (count > 1) {
      result_value = `  REJECTED (${count})`;
    }
  } else {
    result_value = "   Not yet Response";
  }

  status_para_bold.innerText = result_value;
  div_class_invitation_four_p.append(status_para_bold);

  const div_class_invitation_four_trash_icon = document.createElement("i");
  div_class_invitation_four_trash_icon.setAttribute(
    "class",
    "fa-solid fa-trash-can"
  );
  div_class_invitation_four_trash_icon.setAttribute(
    "data-id",
    matchInvitaton[i].matchUniqueId
  );
  div_class_invitation_four.append(div_class_invitation_four_trash_icon);

  if (result_data === 1) {
    div_class_invitation_four_trash_icon.style.visibility = "hidden";
  }

  const div_class_invitation_four_i = document.createElement("i");
  div_class_invitation_four_i.setAttribute("class", "fa-brands fa-whatsapp");
  div_class_invitation_four.append(div_class_invitation_four_i);

  document.querySelector(".team-response-main").append(div_class_invitation);
}

// match request card end
// delete match request start
const switchnewcap = document.querySelectorAll(".fa-trash-can");
switchnewcap.forEach((bookCover) => {
  bookCover.addEventListener("click", () => {
    const request_data = match_list.find(
      (e) => e.matchUniqueId === bookCover.dataset.id
    );

    const filter_response_list = request_list.filter(
      (e) => e.matchUniqueId === bookCover.dataset.id
    );

    for (let i = 0; i < filter_response_list.length; i++) {
      const value = filter_response_list[i];
      const request_index = request_list.indexOf(value);
      request_list.splice(request_index, 1);
    }

    localStorage.setItem("match_response_list", JSON.stringify(request_list));

    const match_index = match_list.indexOf(request_data);

    match_list.splice(match_index, 1);

    localStorage.setItem("match_list", JSON.stringify(match_list));

    location.reload();
  });
});
// delete match request end

function backBtn() {
  window.location.href = `../homepage/hpexist.html?unique_id=${phonenumber}`;
}
