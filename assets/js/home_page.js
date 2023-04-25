const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get('unique_id')

let origin = window.location.origin 

function responsebtn(){
window.location.href = `${origin}/pages/nonteamplayer/response.html?unique_id=${phonenumber}`;
}
function jointeambtn(){
window.location.href = `${origin}/pages/nonteamplayer/jointeam.html?unique_id=${phonenumber}`;
}
function createteambtn(){
window.location.href = `${origin}/pages/nonteamplayer/createteam.html?unique_id=${phonenumber}`;
}

function matchInvitationBtn(){
    window.location.href = `${origin}/pages/teamplayer captain/match invitation.html?unique_id=${phonenumber}`;
    }

function myTeam(){
    window.location.href = `${origin}/pages/profile/teamprofile.html?unique_id=${phonenumber}`;
}
function teamResponse(){
    window.location.href = `${origin}/pages/teamplayer captain/team response.html?unique_id=${phonenumber}`;
}
function teamResponseNew(){
    window.location.href = `${origin}/pages/nonteamplayer/response.html?unique_id=${phonenumber}`;
}

function playerRequest(){
    window.location.href = `${origin}/pages/teamplayer captain/playerrequests.html?unique_id=${phonenumber}`;
}

function profilepage(){
    window.location.href = `${origin}/pages/profile/myprofile.html?unique_id=${phonenumber}`;
}
function myMatch(){
    window.location.href = `${origin}/pages/search and notification/calendar.html?unique_id=${phonenumber}`;
}

// upto above links for home page 

// options depending upon player team status (start)--------------------------
let unique_id = phonenumber;

// let user_detail = JSON.parse(localStorage.getItem('user_detail'))

    // here i get data from mockapi start
let endpoint = "users/";

let user_api_id = JSON.parse(localStorage.getItem("user_id"));

axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`)
.then ( res => {
    
 let person_data = res['data']

 homepageCondition(person_data)

})


        // here i get data from mockapi end


function homepageCondition(person_data){

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

// options depending upon player team status (end)--------------------------

// sidebar js work start ---------------------------------------------------
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


function createMatchBtn(){
    window.location.href = `/pages/teamplayer captain/creatematch.html?unique_id=${phonenumber}&my_name=${person_data["userName"]}&opponent_url=0&opponent_name=0&captain=0&type=0&opponent_id=0`;  
}
}
// sidebar js work end ---------------------------------------------------


document.querySelector(".playerdetailsdiv").addEventListener("click", profilepage)
document.querySelector(".playerimagediv").addEventListener("click", profilepage)

function previousPage(){
	window.history.go(-1)
}