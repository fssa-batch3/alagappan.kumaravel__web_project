// some data get from login.js file

const endpoint = "users/";

const user_api_id = JSON.parse(localStorage.getItem("user_id"));

axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`).then((res) => {
  const person_data = res.data;

  showInEdit(person_data);
});

async function getarea(areaUniqueId) {
  const resp = await axios.get(
    `http://localhost:3000/area_list/${areaUniqueId}`
  );

  const objData = resp;

  console.log(objData);

  const area_data = objData.data;

  return area_data;
}

async function showInEdit(person_data) {
  document.getElementById("user_username").value = person_data.userName;
  document.getElementById("user_first_name").value = person_data.firstName;
  document.getElementById("user_last_name").value = person_data.lastName;
  document.getElementById("user_date_of_birth").value = person_data.dateOFBirth;
  document.getElementById("user_gender").value = person_data.gender;
  document.getElementById("user_game").value = person_data.game;

  const area_data = await getarea(person_data.areaUniqueId);

  document.getElementById("user_area").value = area_data.area;
  document.getElementById("user_distric").value = area_data.distric;
  document.getElementById("user_about").value = person_data.about;
  document.getElementById("user_image").value = person_data.imageUrl;

  const image_element = document.getElementById("team_image_show");
  image_element.setAttribute("src", person_data.imageUrl);

  const DOB_edit = document.querySelector("#user_date_of_birth");

  const max_value_1 = `${yyyy}-${mm}-${dd}`;
  DOB_edit.setAttribute("max", max_value_1);
}
