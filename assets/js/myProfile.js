const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

// let user_detail = JSON.parse(localStorage.getItem('user_detail'))
const endpoint = "users/";

const user_api_id = JSON.parse(localStorage.getItem("user_id"));

if (user_api_id === null) {
  window.location.href = `${origin}/index.html`;
}

if (user_api_id !== null) {
  axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`).then((res) => {
    const person_data = res.data;

    myProfile(person_data);
  });
}

async function getarea(areaUniqueId) {
  const resp = await axios.get(
    `http://localhost:3000/area_list/${areaUniqueId}`
  );

  const objData = resp;

  console.log(objData);

  const area_data = objData.data;

  return area_data;
}

async function myProfile(person_data) {
  document.getElementById("user_username").innerText = person_data.userName;
  const a = moment(person_data.createDate);
  document.getElementById("create_date").innerText = `Since  ${a.format(
    "MMM Do YY"
  )}`;
  document.getElementById(
    "user_full_name"
  ).innerText = `${person_data.firstName} ${person_data.lastName}`;
  document.getElementById("user_date_of_birth").innerText =
    person_data.dateOFBirth;
  document.getElementById("user_gender").innerText = person_data.gender;

  const area_data = await getarea(person_data.areaUniqueId);

  document.getElementById("user_area").innerText = area_data.area;
  document.getElementById("user_distric").innerText = area_data.distric;
  document.getElementById("user_area_header").innerText = area_data.area;
  document.getElementById("user_phone_number").innerText =
    person_data.phoneNumber;
  document.getElementById("user_about").innerText = person_data.about;

  const player_image_url = person_data.imageUrl;
  const player_image = document.getElementById("player_image");
  if (player_image_url === "") {
    player_image.setAttribute(
      "src",
      "../../assets/images/defalt_player_image.webp"
    );
  } else {
    player_image.setAttribute("src", player_image_url);
  }

  // for range value start
  const username = person_data.userName;
  const firstname = person_data.firstName;
  const lastname = person_data.lastName;
  const dateofbirth = person_data.dateOFBirth;
  const { gender } = person_data;
  const { game } = person_data;
  const { area } = area_data;
  const { distric } = area_data;
  const { about } = person_data;
  const image = person_data.imageUrl;

  const person_data_range = {
    username,
    firstname,
    lastname,
    dateofbirth,
    gender,
    game,
    area,
    distric,
    about,
    image,
  };

  const emptyValues = new Set(["", null, undefined]);
  const null_count = Object.values(person_data_range).filter((x) =>
    emptyValues.has(x)
  ).length;
  let key_count = 0;

  // loop through each key/value
  for (const key in person_data_range) {
    // increase the count
    ++key_count;
  }
  // range calculation

  const range_value = 100 - (null_count / key_count) * 100;

  const range_input = document.querySelector(".range_cover");
  range_input.style.width = `${range_value}%`;

  document.querySelector(".range-label").innerHTML = `${Math.round(
    range_value
  )}%`;
}

// for range value end
function moveProfile() {
  window.location.href = `../profile/playerprofile.html?unique_id=${user_api_id}`;
}
