let image_element = document.getElementById("team_image_show");
    image_element.setAttribute("src", "https://iili.io/HWEqLtp.webp")
    
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get('unique_id');


function createTeam(e) {

    e.preventDefault();  

    // hear i collect value from signUp form 
    let team_image_url = document.getElementById("team_image").value,	
	 team_name = document.getElementById("teamname").value,
	 area = document.getElementById("area").value,
     distric = document.getElementById("distric").value,
     about = document.getElementById("team_about").value,
     player_description = document.getElementById("team_player_description").value,
     
     create_date = moment();
     console.log(player_description)
     console.log(create_date)

     let team_details_list = JSON.parse(localStorage.getItem('team_details_list'))||[] ;

     let area_list = JSON.parse(localStorage.getItem('area_list'))||[];

     let same_user_name = team_details_list.some(data => data.teamName == team_name );
            
    if(same_user_name){
        a = document.querySelector(".wrong_password").innerHTML = "Team name not available."
        return a;
    }


    else {
        let team_unique_id = uuidv4();

        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);
    
        const phonenumber = urlParams.get('unique_id');
    
        let unique_id = phonenumber;
 
        let user_detail = JSON.parse(localStorage.getItem('user_detail'))
        
        
        function findPlayer(a) {
        return a.phoneNumber == unique_id ;
        }
        
        person_data = user_detail.find(findPlayer);
        
        person_data["captainStatus"] = 1 ;

        localStorage.setItem('user_detail', JSON.stringify(user_detail));


        let team_details = {
            "teamImageUrl" : team_image_url,
            "teamName" : team_name,
            "address" :{
                "area" : area,
                "distric" : distric
            },
            "dateOfJoin" : create_date,
            "uniqueId" : team_unique_id,
            "about" : about,
            "openForPlayers" : {
                "status" : true ,
                "description" : player_description
            },
            "teamMembers" : [person_data["phoneNumber"]]
        };
        let team_details_list = JSON.parse(localStorage.getItem('team_details_list')) || []
        
        team_details_list.push(team_details);
        
        // here i push data for area list

        area_name_same = area_list.some(e => e.area == area && e.distric == distric)

        if(!area_name_same){

        let area_object = {
            "area" : area,
            "distric" : distric,
            "count" : 1
        }

        area_list.push(area_object);

        localStorage.setItem('area_list', JSON.stringify(area_list))
    }
        if(area_name_same){
            let find = area_list.find(e => e.area == area && e.distric == distric);

            find["count"] += 1

            localStorage.setItem('area_list', JSON.stringify(area_list))
        }


        

        localStorage.setItem('team_details_list', JSON.stringify(team_details_list));
        
        document.querySelector('form').reset();

    	window.location.href = `../homepage/hpexist.html?unique_id=${phonenumber}`;


    }

}

function myFunction() {
        let image_input = document.getElementById("team_image").value;
        let image_element = document.getElementById("team_image_show");
        image_element.setAttribute("src", image_input)
        if(image_element.getAttribute("src") == ""){
            image_element.setAttribute("src", "https://iili.io/HWEqLtp.webp")
        }

}

  



