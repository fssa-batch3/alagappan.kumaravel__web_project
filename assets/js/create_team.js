let image_element = document.getElementById("team_image_show");
    image_element.setAttribute("src", "../../assets/images/defalt_team_image.png")



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

     let same_user_name = team_details_list.some(data => data.teamName == team_name );
            
    if(same_user_name){
        // alert("User name not available.");
        a = document.querySelector(".wrong_password").innerHTML = "Team name not available."
        return a;
    }


    else {
        let team_unique_id = uuidv4();

        let user_data = JSON.parse(localStorage.getItem('user_data'));

        let unique_id = user_data["phoneNumber"];
        
        let user_detail = JSON.parse(localStorage.getItem('user_detail'))
        
        
        function findPlayer(a) {
        return a.phoneNumber == unique_id ;
        }
        
        person_data = user_detail.find(findPlayer);
        
        person_data["captainStatus"] = true ;

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
        
        localStorage.setItem('team_details_list', JSON.stringify(team_details_list));
        
        document.querySelector('form').reset();

    	window.location.href = "../homepage/hpexist.html";


    }

}

function myFunction() {
        let image_input = document.getElementById("team_image").value;
        let image_element = document.getElementById("team_image_show");
        image_element.setAttribute("src", image_input)
        if(image_element.getAttribute("src") == ""){
            image_element.setAttribute("src", "../../assets/images/defalt_team_image.png")
        }

}

  



