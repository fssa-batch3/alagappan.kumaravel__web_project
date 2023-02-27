const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get('unique_id')

let unique_id = phonenumber;

// find player team 

let team_list = JSON.parse(localStorage.getItem('team_details_list'));

function findPlayer(a) {
let index = a.teamMembers.indexOf(unique_id);
return a.teamMembers[index] == unique_id ;
}

let teamProfile = team_list.find(findPlayer);

// here i get team unique id 

let team_unique_id = teamProfile["uniqueId"];

const player_request_list = JSON.parse(localStorage.getItem('response_list'));

function findRequest(a) {
    return a.teamUniqueId == team_unique_id ;
    }

let request_list = player_request_list.filter(findRequest); // request list data

let player_request_id = []

for(let i=0;i<request_list.length; i++){
    if(request_list[i]["requestStatus"] == ""){
    let value = request_list[i]["playerUniqueId"];

    player_request_id.push(value)
    }
}

const all_player_list = JSON.parse(localStorage.getItem('user_detail'));

let players_data = []

for(i=0;i<player_request_id.length;i++){

	let player_number = player_request_id[i];

	function findPlayer(a) {
	return a.phoneNumber == player_number ;
	}	

	let player_object = all_player_list.find(findPlayer);

	players_data.push(player_object)

}

// here above we find the players who give request to this team

// now I am created template for show the request



for(i=0;i<players_data.length;i++){
    
        const player = players_data[i];
        const template1 = renderPlayer(player);
        document.querySelector(".players-request-content").insertAdjacentHTML("beforeend", template1);
    
    }
    


function renderPlayer(team) {
    const template = `
    <div class="player-request-div">
    <div class="popup_profile" data-id="${team["phoneNumber"]}"><img src="${team["imageUrl"]}" alt="image of ${team["userName"]}"></div>
        <div class="popup_profile" data-id="${team["phoneNumber"]}">
            <h2>${team["userName"]}</h2>
            <div><i class="fa-solid fa-location-dot"></i>
                <p>${team["area"]}</p>
        </div>
        </div>
    <div class="player_request_accept" data-id="${team["phoneNumber"]}">
        <i class="fa-regular fa-circle-check"></i>
        <p>Accept</p>
    </div>
    <div class="player_request_reject" data-id="${team["phoneNumber"]}">
        <i class="fa-regular fa-circle-xmark"></i>
        <p>Reject</p>
    </div>
</div>
    `
    return template;
}


let selectbtn = document.querySelectorAll(".popup_profile");
	selectbtn.forEach(each => {
      each.addEventListener("click", (event) => {
        popup.classList.add("open-popup")
		const person_data = players_data.find(book => book["phoneNumber"] === each.dataset.id);

        // players popup details start

        const player_popup_image = document.querySelector(".player_popup_image");
        player_popup_image.setAttribute("src" , person_data["imageUrl"]);
        player_popup_image.setAttribute("alt" , "image of  " + person_data["userName"]);

        const player_popup_username = document.querySelector(".player-name h3");
        player_popup_username.innerHTML = person_data["userName"];

        const player_popup_fullname = document.querySelector(".player-name p");
        player_popup_fullname.innerHTML = person_data["firstName"] + " " + person_data["lastName"];

        const player_popup_area = document.querySelector(".area_name_para");
        player_popup_area.innerHTML = person_data["area"] + ", " + person_data["distric"];

        const player_popup_about = document.querySelector(".player_about");  
        player_popup_about.innerHTML = person_data["about"]  
        
        const player_popup_age = document.querySelector(".player_age");  
        let date = person_data["dateOFBirth"];
        let dob = new Date(date);
        let today = new Date();
        let age = today.getTime() - dob.getTime();
        age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
        player_popup_age.innerHTML = age ;


        // players popup details start
      })
    })

// request accept or reject ;

const acceptBtn = document.querySelectorAll(".player_request_accept");
acceptBtn.forEach(accept => {
      accept.addEventListener("click", (event) => {
        const request_data = request_list.find(react => react["playerUniqueId"] === accept.dataset.id);

        request_data["requestStatus"] = true

        localStorage.setItem('response_list', JSON.stringify(player_request_list));

        const person_data = all_player_list.find(react => react["phoneNumber"] === accept.dataset.id);

        person_data["captainStatus"] = false

        // here we should find that players other request data that should delete from local storage

        localStorage.setItem('user_detail', JSON.stringify(all_player_list));

        const filter_player_request = player_request_list.filter(react => react["playerUniqueId"] === accept.dataset.id)

        for(let i=0; i<filter_player_request.length; i++){
           let index = player_request_list.indexOf(filter_player_request[i]);
           if(filter_player_request[i]["requestStatus"] == ""){
           player_request_list.splice(index, 1);
        }
        }

        localStorage.setItem('response_list', JSON.stringify(player_request_list));

        // here we should add player unique id in team details

        teamProfile["teamMembers"].push(accept.dataset.id)

        localStorage.setItem('team_details_list', JSON.stringify(team_list));

        location.reload()
    })
})
