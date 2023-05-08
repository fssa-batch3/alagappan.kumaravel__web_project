const { origin } = window.location;

const image_element = document.getElementById("team_image_show");
image_element.setAttribute("src", "https://iili.io/HWEqLtp.webp");

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

async function playerTeamRelation(teamId) {
  const playerId = JSON.parse(localStorage.getItem("user_id"));

  const create_date = moment();

  const object = {
    teamId,
    playerId,
    dateOfJoin: create_date,
    activeStatus: 1,
  };

  console.log(object);
  await axios
    .post(`http://localhost:3000/player_team_relation`, object, {
      "Content-Type": "application/json",
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
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

      const team_object = result.data;

      await playerTeamRelation(team_object.id);

      window.location.href = `${origin}/pages/homepage/hpexist.html`;
    })
    .catch((error) => {
      console.log(error);
    });
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

async function createTeam(e) {
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

  // const team_details_list = JSON.parse(localStorage.getItem("team_details_list")) || [];

  // const area_list = JSON.parse(localStorage.getItem("area_list")) || [];

  // const same_user_name = team_details_list.some(
  //   (data) => data.teamName === team_name
  // );

  // if (same_user_name) {
  //   a = document.querySelector(".wrong_password").innerHTML = "Team name not available.";
  //   return a;
  // } else {

  const address_id = await findarea(area, distric);

  const urlParams = new URLSearchParams(queryString);

  const phonenumber = urlParams.get("unique_id");

  const unique_id = phonenumber;

  // const user_detail = JSON.parse(localStorage.getItem("user_detail"));

  // function findPlayer(a) {
  //   return a.phoneNumber === unique_id;
  // }

  // person_data = user_detail.find(findPlayer);

  // person_data.captainStatus = 1;

  // localStorage.setItem("user_detail", JSON.stringify(user_detail));

  const team_details = {
    teamImageUrl: team_image_url,
    teamName: team_name,
    dateOfJoin: create_date,
    address_id,
    about,
    openForPlayersStatus: true,
    openForPlayersDescription: player_description,
  };

  const endpoint = "team_details_list";

  await setData(endpoint, team_details);

  // const team_details_list =
  //   JSON.parse(localStorage.getItem("team_details_list")) || [];

  // team_details_list.push(team_details);

  // // here i push data for area list

  // area_name_same = area_list.some(
  //   (e) => e.area === area && e.distric === distric
  // );

  // if (!area_name_same) {
  //   const area_object = {
  //     area,
  //     distric,
  //     count: 1,
  //   };

  //   area_list.push(area_object);

  //   localStorage.setItem("area_list", JSON.stringify(area_list));
  // }
  // if (area_name_same) {
  //   const find = area_list.find(
  //     (e) => e.area === area && e.distric === distric
  //   );

  //   find.count += 1;

  //   localStorage.setItem("area_list", JSON.stringify(area_list));
  // }

  // localStorage.setItem(
  //   "team_details_list",
  //   JSON.stringify(team_details_list)
  // );

  // document.querySelector("form").reset();

  // }
}

function myFunction() {
  const image_input = document.getElementById("team_image").value;
  const image_element = document.getElementById("team_image_show");
  image_element.setAttribute("src", image_input);
  if (image_element.getAttribute("src") === "") {
    image_element.setAttribute("src", "https://iili.io/HWEqLtp.webp");
  }
}

function previousPage() {
  window.history.go(-1);
}
