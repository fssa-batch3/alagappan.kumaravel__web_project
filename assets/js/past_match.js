if (request_list !== undefined) {
  // for loop for completed match

  // console.log(completed_match_list);
  for (let i = 0; i < completed_match_list.length; i++) {
    const check = completed_match_list[i].matchUniqueId;

    // let match_in = check.find(phonenumber)

    const find = match_list.find(function (e) {
      const today = new Date(e.time);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const ans =
        e.matchUniqueId === check &&
        e.activeStatus === false &&
        tomorrow < new Date();

      return ans;
    });
    if (find) {
      completed_match.push(find);
    }
  }

  // console.log(completed_match);
}

// this loop is for completed match start ----------------

function completedMatchTemp(match_data, my_team, opp_team, won, loss, draw) {
  const temp = `<div class="past_result_container" data-id="${
    match_data.matchUniqueId
  }">
<div class="match_time">
	<p>${moment(match_data.time).add(0, "days").calendar()}</p>
</div>
<div class="past_result">
	<div class="my_team">
		<h2>${my_team.teamName}</h2>
		<div class="team_img">
			<img src="${my_team.teamImageUrl}" alt="${my_team.teamName}">
			<p>${my_team.teamName.slice(0, 3).toUpperCase()}</p>
		</div>
		
	</div>

	<div class="result">
	<p class="won">${won}</p>
	<P>-</P>
	<p class="draw">${draw}</p>
	<P>-</P>
	<p class="loss">${loss}</p>
	</div>

	<div class="opp_team">
		<h2>${opp_team.teamName}</h2>
		<div class="team_img">
			<p>${opp_team.teamName.slice(0, 3).toUpperCase()}</p>
			<img src="${opp_team.teamImageUrl}" alt="${opp_team.teamName}">
		</div>
		
	</div>
</div>
</div>
	`;

  return temp;
}
console.log(completed_match.length);

if (completed_match.length === 0) {
  const div_name = document.createElement("div");
  div_name.setAttribute("class", "no_content");

  const div_p = document.createElement("p");
  div_p.innerHTML = "(matches not played)";
  div_name.append(div_p);
  document.querySelector(".completed").append(div_name);
}

for (let i = 0; i < completed_match.length; i++) {
  const match_data = completed_match[i];
  console.log(match_data);
  const my_team_response = request_list.find(
    (e) =>
      e.matchUniqueId === match_data.matchUniqueId &&
      e.team_players.find((e) => e === phonenumber) === phonenumber
  ); // some error is there
  console.log(my_team_response);
  const my_team_score = score_resopnse.find(
    (e) =>
      e.matchUniqueId === match_data.matchUniqueId &&
      e.teamUniqueId === my_team_response.team_id
  );

  const my_team_obj = team_list.find(
    (e) => e.uniqueId === my_team_response.team_id
  );
  // console.log(my_team_score)

  const opp_team_response = request_list.find(
    (e) =>
      e.matchUniqueId === match_data.matchUniqueId &&
      e.team_id !== my_team_response.team_id
  );

  const opp_team_score = score_resopnse.find(
    (e) =>
      e.matchUniqueId === match_data.matchUniqueId &&
      e.teamUniqueId === opp_team_response.team_id
  );

  const opp_team_obj = team_list.find(
    (e) => e.uniqueId === opp_team_response.team_id
  );
  // console.log(opp_team_score)
  let won = 0;
  let loss = 0;
  let draw = 0;

  let my_draw = "nan";
  let my_loss;
  let my_won;
  let opp_draw = "nan";
  let opp_loss;
  let opp_won;

  if (my_team_score) {
    my_won = my_team_score.score.win;

    my_loss = my_team_score.score.loss;

    my_draw = my_team_score.score.draw;
  }
  if (opp_team_score) {
    opp_won = opp_team_score.score.win;

    opp_loss = opp_team_score.score.loss;

    opp_draw = opp_team_score.score.draw;
  }

  if (
    my_won === opp_loss &&
    my_loss === opp_won &&
    my_draw === opp_draw &&
    my_draw !== "nan" &&
    opp_draw !== "nan"
  ) {
    won = my_won;
    loss = my_loss;
    draw = my_draw;
  }

  const func = completedMatchTemp(
    match_data,
    my_team_obj,
    opp_team_obj,
    won,
    loss,
    draw
  );
  document.querySelector(".completed").insertAdjacentHTML("beforeend", func);
}

// this loop is for completed match end ----------------

// past match popup content start

function pastMvp() {
  const allbtn = document.querySelector(".result_nav button");

  allbtn.style.transition = ".5s";

  const btn1 = document.querySelector(".mvpbtn");

  btn1.style.color = "#ff8908";
  btn1.style.borderBottom = "2px solid #ff8908";

  const btn2 = document.querySelector(".playersbtn");

  btn2.style.color = "#000";
  btn2.style.border = "none";

  const btn3 = document.querySelector(".detailsbtn");

  btn3.style.color = "#000";
  btn3.style.border = "none";

  const content_1 = document.querySelector(".mvp_det");
  content_1.style.display = "block";

  const content_2 = document.querySelector(".past_match_players");
  content_2.style.display = "none";

  const content_3 = document.querySelector(".past_match_details");
  content_3.style.display = "none";
}
function pastPlayers() {
  const allbtn = document.querySelector(".result_nav button");

  allbtn.style.transition = ".5s";

  const btn1 = document.querySelector(".mvpbtn");

  btn1.style.color = "#000";
  btn1.style.border = "none";

  const btn2 = document.querySelector(".playersbtn");

  btn2.style.color = "#ff8908";
  btn2.style.borderBottom = "2px solid #ff8908";

  const btn3 = document.querySelector(".detailsbtn");

  btn3.style.color = "#000";
  btn3.style.border = "none";

  const content_1 = document.querySelector(".mvp_det");
  content_1.style.display = "none";

  const content_2 = document.querySelector(".past_match_players");
  content_2.style.display = "block";

  const content_3 = document.querySelector(".past_match_details");
  content_3.style.display = "none";
}

function pastDetails() {
  const allbtn = document.querySelector(".result_nav button");

  allbtn.style.transition = ".5s";

  const btn1 = document.querySelector(".mvpbtn");

  btn1.style.color = "#000";
  btn1.style.border = "none";

  const btn2 = document.querySelector(".playersbtn");

  btn2.style.color = "#000";
  btn2.style.border = "none";

  const btn3 = document.querySelector(".detailsbtn");

  btn3.style.color = "#ff8908";
  btn3.style.borderBottom = "2px solid #ff8908";

  const content_1 = document.querySelector(".mvp_det");
  content_1.style.display = "none";

  const content_2 = document.querySelector(".past_match_players");
  content_2.style.display = "none";

  const content_3 = document.querySelector(".past_match_details");
  content_3.style.display = "block";
}

// past match popup content end

// here i made a function for show the past match full result via popup --------

function pastMvpTemp(player, team) {
  const temp = `
	<tr class="past_player_tr">
	<td><img src="${player.imageUrl}" alt="${player.userName}"></td>
	<td class="players_name">${player.userName}</td>
	<td class="players_team_name">${team.teamName.slice(0, 3).toUpperCase()}</td>
	</tr>
	`;
  return temp;
}
function pastplayersTemp(player) {
  const temp = `
	<div class="players">
	<img src="${player.imageUrl}" alt="${player.userName}">
	<p>${player.userName}</p>
	</div>
	`;
  return temp;
}

const pastdetails = document.querySelectorAll(".past_result_container");
pastdetails.forEach((bookCover) => {
  bookCover.addEventListener("click", (event) => {
    const person_data = bookCover.dataset.id;
    const popup_result = document.getElementById("popup_result");
    popup_result.classList.add("open-popup");

    // here i get all data for show in popup card start -------------------------
    const match_data = match_list.find((e) => e.matchUniqueId === person_data);

    const my_team_response = request_list.find(
      (e) =>
        e.matchUniqueId === person_data &&
        e.team_players.find((e) => e === phonenumber) === phonenumber
    );

    const my_team_score = score_resopnse.find(
      (e) =>
        e.matchUniqueId === person_data &&
        e.teamUniqueId === my_team_response.team_id
    );

    const my_team_obj = team_list.find(
      (e) => e.uniqueId === my_team_response.team_id
    );

    const opp_team_response = request_list.find(
      (e) =>
        e.matchUniqueId === person_data &&
        e.team_id !== my_team_response.team_id
    );

    const opp_team_score = score_resopnse.find(
      (e) =>
        e.matchUniqueId === person_data &&
        e.teamUniqueId === opp_team_response.team_id
    );

    const opp_team_obj = team_list.find(
      (e) => e.uniqueId === opp_team_response.team_id
    );

    let won = 0;
    let loss = 0;
    let draw = 0;

    let my_draw = "nan";
    let my_loss;
    let my_won;
    let opp_draw = "nan";
    let opp_loss;
    let opp_won;

    if (my_team_score) {
      my_won = my_team_score.score.win;

      my_loss = my_team_score.score.loss;

      my_draw = my_team_score.score.draw;
    }
    if (opp_team_score) {
      opp_won = opp_team_score.score.win;

      opp_loss = opp_team_score.score.loss;

      opp_draw = opp_team_score.score.draw;
    }

    if (
      my_won === opp_loss &&
      my_loss === opp_won &&
      my_draw === opp_draw &&
      my_draw !== "nan" &&
      opp_draw !== "nan"
    ) {
      won = my_won;
      loss = my_loss;
      draw = my_draw;
    }
    // here i get all data for show in popup card end ---------------------------

    // here i insert the standard value in html from above data start ---------------
    document.getElementById("past_Won_score").innerHTML = won;
    document.getElementById("past_loss_score").innerHTML = loss;
    document.getElementById("past_draw_score").innerHTML = draw;

    document.querySelector("#past_my_team").innerHTML = my_team_obj.teamName;
    document
      .querySelector("#past_my_team_img")
      .setAttribute("src", my_team_obj.teamImageUrl);

    document.querySelector("#past_opp_team").innerHTML = opp_team_obj.teamName;
    document
      .querySelector("#past_opp_team_img")
      .setAttribute("src", opp_team_obj.teamImageUrl);

    document.querySelector("#past_match_time").innerHTML = moment(
      match_data.time
    )
      .add(0, "days")
      .calendar();
    document.querySelector("#past_match_type").innerHTML =
      match_data.typeOfMatch;
    document.querySelector("#past_match_location").innerHTML =
      match_data.location;
    document.querySelector("#past_match_info").innerHTML =
      match_data.information;

    document.querySelector(".my_team_players h4").innerHTML =
      my_team_obj.teamName.slice(0, 3).toUpperCase();
    document.querySelector(".opp_team_players h4").innerHTML =
      opp_team_obj.teamName.slice(0, 3).toUpperCase();
    // console.log((my_team_score["mvps"]).length)
    if (my_team_score) {
      for (let i = 0; i < my_team_score.mvps.length; i++) {
        const find_player = players_list.find(
          (e) => e.phoneNumber === my_team_score.mvps[i]
        );

        const func = pastMvpTemp(find_player, my_team_obj);
        document
          .querySelector("table.past_players_list tbody")
          .insertAdjacentHTML("beforeend", func);
      }
    }
    if (opp_team_score) {
      for (let i = 0; i < opp_team_score.mvps.length; i++) {
        const find_player = players_list.find(
          (e) => e.phoneNumber === opp_team_score.mvps[i]
        );

        const func = pastMvpTemp(find_player, opp_team_obj);
        document
          .querySelector("table.past_players_list tbody")
          .insertAdjacentHTML("beforeend", func);
      }
    }
    for (let i = 0; i < my_team_response.team_players.length; i++) {
      const find_player = players_list.find(
        (e) => e.phoneNumber === my_team_response.team_players[i]
      );

      const func = pastplayersTemp(find_player);
      document
        .querySelector(".my_team_players div")
        .insertAdjacentHTML("beforeend", func);
    }
    for (let i = 0; i < opp_team_response.team_players.length; i++) {
      const find_player = players_list.find(
        (e) => e.phoneNumber === opp_team_response.team_players[i]
      );
      const func = pastplayersTemp(find_player);
      document
        .querySelector(".opp_team_players div")
        .insertAdjacentHTML("beforeend", func);
    }

    // here i insert the standard value in html from above data end ---------------
  });
});

function ClosePopupResult() {
  document.querySelector("table.past_players_list tbody").innerHTML = "";
  document.querySelector(".my_team_players div").innerHTML = "";
  document.querySelector(".opp_team_players div").innerHTML = "";

  const popup = document.getElementById("popup_result");
  popup.classList.remove("open-popup");
}

function previousPage() {
  window.history.go(-1);
}
