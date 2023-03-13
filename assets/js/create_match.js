const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get('unique_id');

const opponent_id = urlParams.get('opponent_id');

const opponent_url = urlParams.get('opponent_url');

const opponent_name = urlParams.get('opponent_name');

const opponent_cap_name = urlParams.get('captain');

const opponent_type = urlParams.get('type');

const cap_name = urlParams.get('my_name');

let team_list = JSON.parse(localStorage.getItem('team_details_list'));

let all_player_list = JSON.parse(localStorage.getItem('user_detail'));

function findPlayer(a) {
let index = a.teamMembers.indexOf(phonenumber);
return a.teamMembers[index] == phonenumber ;
}

let teamProfile = team_list.find(findPlayer);

console.log(teamProfile)

// here i show my team details

let my_team_image = document.querySelector(".teamimage")
my_team_image.setAttribute("src", teamProfile["teamImageUrl"]);
my_team_image.setAttribute("alt", teamProfile["teamName"] );

let team_name = document.querySelector(".my_team_name")
team_name.innerHTML = teamProfile["teamName"];

let my_name = document.querySelector(".my_name")
my_name.innerHTML = cap_name;

// here i show opponent details

if(opponent_url == 0){	
		
	let opp_image = document.querySelector(".opponent_image")
	opp_image.style.visibility = "hidden";

	}

if(opponent_name == 0){	
document.querySelector(".opponent_name").innerHTML = "Choose Opponent" ;

}
if(opponent_name != 0){
	document.querySelector(".opponent_name").innerHTML = opponent_name ;
}

if(opponent_name != 0){
	document.querySelector(".opp_captain").innerHTML =  opponent_cap_name;
}
if(opponent_type == 2){
	let a = document.querySelector(".select_opponent_div div i")
	a.setAttribute("class", "fa-solid fa-map-pin")
}
if(opponent_type == 1){
	let a = document.querySelector(".select_opponent_div div i")
	a.setAttribute("class", "fa-regular fa-copyright")
}

if(opponent_name != 0){	
let opp_image = document.querySelector(".opponent_image")
opp_image.setAttribute("src", opponent_url);
opp_image.setAttribute("alt", opponent_name );
}

if(opponent_type == 2){
	let toggle_button = document.querySelector(".toggle_button");
	toggle_button.style.left = "50%";

	let btn_color_1 = document.querySelector(".darkbtn");
	btn_color_1.style.color = "#f7f7f7";

	let btn_color_2 = document.querySelector(".lightbtn");
	btn_color_2.style.color = "#000";

    const select_team = document.querySelector(".select_opponent_div");
    select_team.addEventListener("click", selectTeam);

    function selectTeam(){
    window.location.href=`./area-select.html?unique_id=${phonenumber}&my_name=${cap_name}&team_id=${teamProfile["uniqueId"]}`;
}
}

function matchCreate(e){
    e.preventDefault();

    // let opponent = document.querySelector(".opp_captain").innerText;
	let opp_cap_name = document.querySelector(".opp_captain")

	if(opp_cap_name.style.visibility == "hidden" || opponent_cap_name == 0){
		document.querySelector(".alert_msg").innerText = "Select your opponent";
	}
	else{
    
	const match_unique_id = uuidv4();
	const match_request_id = uuidv4();
    const opp_type = opponent_type;
    const opp_id = opponent_id;
	const members = document.getElementById("members").value;	
	const type_of_match = document.getElementById("type_of_match").value ;	
	const players_from_age = document.getElementById("players_from_age").value ;
	const players_to_age = document.getElementById("players_to_age").value;
	const date_and_time = document.getElementById("date_and_time").value;
	const address = document.getElementById("address_details").value;
	const add_info = document.getElementById("add_info").value;
	let created_time = moment();
	let area = "";
	let distric = "";
	if(opp_type == 2){
		 area = opponent_name;
		distric = opponent_cap_name;
	}

	let match_object = {
		"matchUniqueId" : match_unique_id,
		"opponentArea" :{
			"area" : area,
			"distric" : distric
		},
		"friendType" : opp_type,
		"typeOfMatch" : type_of_match,
		"time" : date_and_time,
		"members" : members,
		"membersAge" :{
			"from" : players_from_age,
			"to" : players_to_age
		},
		"location" : address,
		"information" : add_info,
		"createdTime" : created_time,
	}

	let match_response = {
		"request_id" : match_request_id,
		"matchUniqueId" : match_unique_id,
		"team_id" : teamProfile["uniqueId"],
		"match_in_status" : 1 
	}

	// here i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
	let match_list = JSON.parse(localStorage.getItem('match_list')) || [];

	match_list.push(match_object);

	localStorage.setItem('match_list', JSON.stringify(match_list));

	let match_response_list = JSON.parse(localStorage.getItem('match_response_list')) || [];

	match_response_list.push(match_response);

	if(opp_type == 1){
		let team_2_details = {
			"request_id" : match_request_id,
			"matchUniqueId" : match_unique_id,
			"team_id" : teamProfile["uniqueId"],
			"match_in_status" : 2
		}
		match_response_list.push(team_2_details);
	}

	localStorage.setItem('match_response_list', JSON.stringify(match_response_list));

	window.location.href = `./team response.html?unique_id=${phonenumber}`  
	}

}


function submit(e){
	

}


const select_team = document.querySelector(".select_opponent_div");
    select_team.addEventListener("click", selectTeam);

    function selectTeam(){
    window.location.href=`./team-select.html?unique_id=${phonenumber}&my_name=${cap_name}&team_id=${teamProfile["uniqueId"]}`;
    }

function leftbtn(){
	document.querySelector(".opponent_name").innerHTML = "Choose Opponent" ;
	
	let opp_image = document.querySelector(".opponent_image")
	opp_image.style.visibility = "hidden";

	let opp_cap_name = document.querySelector(".opp_captain")
	opp_cap_name.style.visibility = "hidden";

	let opp_cap_icon = document.querySelector(".select_opponent_div div i")
	opp_cap_icon.style.visibility = "hidden";

	let toggle_button = document.querySelector(".toggle_button");
	toggle_button.style.left = "5%";

	let btn_color_1 = document.querySelector(".darkbtn");
	btn_color_1.style.color = "#000";

	let btn_color_2 = document.querySelector(".lightbtn");
	btn_color_2.style.color = "#f7f7f7";

    const select_team = document.querySelector(".select_opponent_div");
    select_team.addEventListener("click", selectTeam);

    function selectTeam(){
    window.location.href=`./team-select.html?unique_id=${phonenumber}&my_name=${cap_name}&team_id=${teamProfile["uniqueId"]}`;


    }
}


function rightbtn(){
	document.querySelector(".opponent_name").innerHTML = "Choose Opponent" ;
	
	let opp_image = document.querySelector(".opponent_image")
	opp_image.style.visibility = "hidden";

	let opp_cap_name = document.querySelector(".opp_captain")
	opp_cap_name.style.visibility = "hidden";

	let opp_cap_icon = document.querySelector(".select_opponent_div div i")
	opp_cap_icon.style.visibility = "hidden";

	let toggle_button = document.querySelector(".toggle_button");
	toggle_button.style.left = "50%";

	let btn_color_1 = document.querySelector(".darkbtn");
	btn_color_1.style.color = "#f7f7f7";

	let btn_color_2 = document.querySelector(".lightbtn");
	btn_color_2.style.color = "#000";

    const select_team = document.querySelector(".select_opponent_div");
    select_team.addEventListener("click", selectTeam);

    function selectTeam(){
    window.location.href=`./area-select.html?unique_id=${phonenumber}&my_name=${cap_name}&team_id=${teamProfile["uniqueId"]}`;
}

}


function backBtn(){
	window.location.href = `../homepage/hpexist.html?unique_id=${phonenumber}`

}

