# Sportshub 

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fssa-batch3_alagappan.kumaravel__web_project&metric=bugs)](https://sonarcloud.io/summary/new_code?id=fssa-batch3_alagappan.kumaravel__web_project)

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=fssa-batch3_alagappan.kumaravel__web_project)

This project is about play real sports game with new people
Problem Statement : https://docs.google.com/document/d/1mcNfaGt16Z_qDbZj0pBTLbLvu7Toq4d8/edit
User Flow : https://drive.google.com/drive/folders/1t_xNmzVZ8JNBcCaNPtnnRtuEmenp89TM
Wireframe : https://drive.google.com/drive/folders/17xy0GD2s1na0NdN5s6wVzIQRmvBmiEzk

user profile CRUD
* sign up
* log in
* read profile
* Edit and Update
* Delete 

Team CRUD 

* Create a team profile
* Read team profile
* edit or Update team profile
* create join request to team
* Delete join Request to team.
* Accept or Reject join request
* read status of join request response.
* remove player from team 
* exit player from team
* Switch captain in team
* delete team


Match CRUD

* create match invitation.
* Accept or Reject invitation.
* delete invitation
* read invitation response 
* read accepted match list
* update the match result 
* read the match result
* edit the match result
* read the previous match details

others
* chat with others with whatsapp link
* search players and team name
* notification option


# Sportshub 
- Best practice use in moblie screen view 

- About : Sportshub helps you to connect with sports people.
    1. you can create your team and join your friends in your team.
    2. You can join with stranger team.

- persona : There are 3 personas 
    1. Captain of team
    2. Team players
    3. Non team players

## Non team players
- initally new person is a non player of team

### Create an account
- Scenario 1: Successfully create an account
    - Steps:
        1. In index page click "Don't have an account yet" (or) click the menu button and navigate to the Sign Up page .
        2. Enter the required information such as phonenumber, Username, and password.
        3. User name and phone number should unique.
        4. Then next page Enter the required information such as DOB , gender, game (Now currently completed for cricket only), area, distric .
        5. Click the "Submit" button.

    - Expected Result:
        - The user is redirected to the Home page.

### Log in into to your Account 

- Scenario 1: Successfully login in to account. If you already have an account.
    - Steps:
        1. In index page enter the required information such as phonenumber, and password.
        2. Click the "login" button.
    - Expected Result:
        - The user is redirected to the user Home page.


### Edit your profile 
- Scenario 1: Successfully edit your profile 
    - Steps:
        1. Log in as a player.
        2. In home page click the "menu" button.
        3. Click on the player image you are redirected to the player setting page.
        4. Then click the "EDIT" button now you are redirected to the profile edit page.
        5. Update your account details.
        6. Click the "UPDATE" button.

    - Expected Result:
        - The user is edit their profile.

### View my profile 
- Scenario 1: Successfully view your profile 
    - Steps:
        1. Log in as a player.
        2. Navigate to the player setting page.
        3. click on "my cricket profile" you are redirected to the player profile page.
        4. Three options availble (profile, matches, team)
        5. matches (Not yet complete)
    - Expected Result:
        - The user can view their profile.

### Delete my profile
- Scenario 1: Successfully delete profile.
    - Steps:
        1. Log in as a player.
        2. Navigate to the player setting page.
        3. Click the "DELETE" button.
        4. Click "ok" of alert message 

    - Expected Result:
        - The user profile permanently deleted form storage.

## Join Team
- types:
    1. You can create team. (you became team captain)
    2. you can join with your friend team (or) stranger team. (you became team player)

### sent request to team 
- Scenario 1: Successfully sent request to team.
    - Steps:
        1. Log in as a non team profile .
        2. In home page click the "Join to team" button.
        3. Now you can see the players needed team list. 
        4. Click on the "team image" you can see their profile ("View profile" button not yet complete)
        5. Select the starnger team (or) your friend team by their name (Search bar and filter team by area name are not yet complete)

    - Expected Result:
        - The request is sent to the respective team.
        - you are redirected to the Response page.

### View sent request to team 
- Scenario 1: Successfully view request to team.
    - Steps:
        1. Log in as a non team profile.
        2. Navigate to the Response page.
        3. View the list of request you sent to the team.
    - Expected Result:
        - The user can view the list of request sent to the team.

### Delete sent request to the team 
- Scenario 1: Successfully Delete the sent request to the team
    - Steps:
        1. Log in as a non team profile.
        2. Navigate to the Response page.
        3. Delete the request By Click the "Dust bin icon".
    - Expected Result:
        - The request is delete from the storage.


## Team Captain 

### Create a team 
- Scenario 1: Successfully create a team
    - Steps:
        1. Log in as a non team profile.
        2. In home page click the "Create team" button.
        3. Enter the required information uch as team name, area, distric, image, About and open for players description.
        4. Initially you should write your players requirements in that "open for players" field.
        5. click the "create my team" button.

    - Expected Result:
        - The user is redirected to the Home page.
        - The team created and that created person became a captain of that team.
        - The team will list on the "join to team" page by that other players can join in this team.

### View team profile 
- Scenario 1: Successfully view team profile
    - Steps:
        1. Log in as a team player.
        2. Navigate to the team profile page by Click "My team" button in home page "menu" button.
        3. View the team profile.("matches" option not yet complete)

    - Expected Result:
        - The user can view their team profile.

### Accept (or) Reject players join request. 
- Scenario 1: Successfully accept (or) reject players join request.
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the players request page by Click "players request" button in home page "menu" button.
        3. Click on the "players image" you can see their profile ("View profile" button not yet complete)
        4. If you want to accept that player click the "Tick icon" button.
        5. If you want to reject that player click the "cross icon" button.

    - Expected Result:
        - If accepted that player included in thier team.
        - if rejeted that response will sent to that player(they can see that response in their response page)
### Edit team profile 
- Scenario 1: Successfully edit team profile 
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the team profile page.
        3. Click the "Pen Icon" button. You are redirected to the team profile edit page.
        4. Update the team details.
        5. Click the "UPDATE" button.

    - Expected Result:
        - The user's update their team profile.

### Remove player in their team 
- Scenario 1: Successfully remove player in their team 
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the team profile edit page.
        3. Click the "Member" button.
        4. You can see your team mates list 
        5. Click the "REMOVE" button and accept that alert message.

    - Expected Result:
        - The captain user's remove their team players from their team.

### Switch captain in team  
- Scenario 1: Successfully Switch captain in their team 
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the team profile edit page.
        3. Click the "Member" button.
        4. You can see "SWITCH CAPTAIN" button 
        5. After click that you can see your team mates name 
        6. Select the person.

    - Expected Result:
        - The caption of that team position was changed to that selected person.
        - The user became a normal team player(non captain) and you are redirected to team profile page.

### Delete team  
- Scenario 1: Successfully delete their team 
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the team profile edit page.
        3. You can see "DELETE" button 
        4. Click and accept the alert message.

    - Expected Result:
        - You are redirected to the Home page.
        - Every one in that team will kick out from that team 
        - That team profile will became deactive






## Team Players (Not captain) 
- The team players can explore all things like captain.
- But they can't accept or reject any invitation or a requests. only they can see what captain done.
- they have one option (exit from their team). 

### Exit from my team 
- Scenario 1: Successfully exit from my team.
    - Steps:
        1. Log in as a team players.
        2. Navigate to the my team profile page.
        3. In "MEMBER" option beside your name you have "EXIT" Option
        4. Click that and accept the alert message.

    - Expected Result:
        - The user can exit from their team and redirected to home page.

