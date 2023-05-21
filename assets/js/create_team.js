const image_element = document.getElementById("team_image_show");
image_element.setAttribute("src", "https://iili.io/HgXhh8X.jpg");

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

function createTeam(e) {
  e.preventDefault();

  // hear i collect value from signUp form
  const team_image_url = document.getElementById("team_image").value;
  const team_name = document.getElementById("teamname").value;
  const area = document.getElementById("area").value;
  const distric = document.getElementById("distric").value;
  const about = document.getElementById("team_about").value;
  const player_description = document.getElementById(
    "team_player_description"
  ).value;

  const create_date = moment();
  console.log(player_description);
  console.log(create_date);

  const team_details_list =
    JSON.parse(localStorage.getItem("team_details_list")) || [];

  const area_list = JSON.parse(localStorage.getItem("area_list")) || [];

  const same_user_name = team_details_list.some(
    (data) => data.teamName == team_name
  );

  if (same_user_name) {
    a = document.querySelector(".wrong_password").innerHTML =
      "Team name not available.";
    return a;
  } else {
    const team_unique_id = uuidv4();

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const phonenumber = urlParams.get("unique_id");

    const unique_id = phonenumber;

    const user_detail = JSON.parse(localStorage.getItem("user_detail"));

    function findPlayer(a) {
      return a.phoneNumber == unique_id;
    }

    person_data = user_detail.find(findPlayer);

    person_data.captainStatus = 1;

    localStorage.setItem("user_detail", JSON.stringify(user_detail));

    const team_details = {
      teamImageUrl: team_image_url,
      teamName: team_name,
      address: {
        area,
        distric,
      },
      dateOfJoin: create_date,
      uniqueId: team_unique_id,
      about,
      openForPlayers: {
        status: true,
        description: player_description,
      },
      teamMembers: [person_data.phoneNumber],
    };
    const team_details_list =
      JSON.parse(localStorage.getItem("team_details_list")) || [];

    team_details_list.push(team_details);

    // here i push data for area list

    area_name_same = area_list.some(
      (e) => e.area == area && e.distric == distric
    );

    if (!area_name_same) {
      const area_object = {
        area,
        distric,
        count: 1,
      };

      area_list.push(area_object);

      localStorage.setItem("area_list", JSON.stringify(area_list));
    }
    if (area_name_same) {
      const find = area_list.find(
        (e) => e.area == area && e.distric == distric
      );

      find.count += 1;

      localStorage.setItem("area_list", JSON.stringify(area_list));
    }

    localStorage.setItem(
      "team_details_list",
      JSON.stringify(team_details_list)
    );

    document.querySelector("form").reset();

    window.location.href = `../homepage/hpexist.html?unique_id=${phonenumber}`;
  }
}

function myFunction() {
  const image_input = document.getElementById("team_image").value;
  const image_element = document.getElementById("team_image_show");
  image_element.setAttribute("src", image_input);
  if (image_element.getAttribute("src") == "") {
    image_element.setAttribute("src", "https://iili.io/HWEqLtp.webp");
  }
}

function previousPage() {
  window.history.go(-1);
}
