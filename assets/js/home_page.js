const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get('unique_id')



function responsebtn(){
window.location.href = `../nonteamplayer/response.html?unique_id=${phonenumber}`;
}
function jointeambtn(){
window.location.href = `../nonteamplayer/jointeam.html?unique_id=${phonenumber}`;
}
function createteambtn(){
window.location.href = `../nonteamplayer/createteam.html?unique_id=${phonenumber}`;
}
// up to new home page person above 
function myTeam(){
    window.location.href = `../profile/teamprofile.html?unique_id=${phonenumber}`;
}
function teamResponse(){
    window.location.href = `../teamplayer captain/team response.html?unique_id=${phonenumber}`;
}


function playerRequest(){
    window.location.href = `../teamplayer captain/playerrequests.html?unique_id=${phonenumber}`;
}


function profilepage(){
    window.location.href = `../profile/myprofile.html?unique_id=${phonenumber}`;
}

let unique_id = phonenumber;

let user_detail = JSON.parse(localStorage.getItem('user_detail'))


function findPlayer(e) {
  return e.phoneNumber == unique_id ;x``
}

person_data = user_detail.find(findPlayer);

if(person_data["captainStatus"] != 2){
    let all = document.querySelectorAll(".not_in_team")

    all.forEach(e => e.style.display = "none")  

    if(person_data["captainStatus"] != 1){
        let all = document.querySelectorAll(".captain")

        all.forEach(e => e.style.display = "none") 
    }
}

if(person_data["captainStatus"] == 2){

    let all = document.querySelectorAll(".in_team")

    all.forEach(e => e.style.display = "none")  
    if(person_data["captainStatus"] != 1){
        let all = document.querySelectorAll(".captain")

        all.forEach(e => e.style.display = "none") 
    }
}

document.querySelector("#player_name").innerText = person_data["userName"];
document.querySelector("#player_number").innerText = person_data["phoneNumber"];


let player_image_url = person_data["imageUrl"] ;
let player_image = document.querySelector(".player_image");
if(player_image_url == ""){
player_image.setAttribute("src", "../../assets/images/defalt_player_image.webp");
}
else{
player_image.setAttribute("src", player_image_url);
}
// for range value start
let username = person_data["userName"],  
firstname =  person_data["firstName"] ,
lastname = person_data["lastName"] ,
dateofbirth = person_data["dateOFBirth"],
gender = person_data["gender"] ,
game = person_data["game"] ,
area = person_data["area"] ,
distric= person_data["distric"],
about = person_data["about"],
image = person_data["imageUrl"];

let person_data_range = { username, firstname, lastname,dateofbirth,gender,game,area,distric,about,image}


const emptyValues = new Set(["", null, undefined]);
let null_count = Object.values(person_data_range).filter(x => emptyValues.has(x)).length;
let key_count = 0;


// loop through each key/value
for(let key in person_data_range) {

    // increase the count
    ++key_count;
}
// range calculation

let range_value = 100-((null_count/key_count)*100);

let range_input = document.querySelector(".range_cover");
range_input.style.width = `${range_value}%`;


document.querySelector(".range-label").innerHTML = Math.round(range_value) + "%";
