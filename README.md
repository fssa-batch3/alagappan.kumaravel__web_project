# Sportshub 

- Best practice use in moblie screen view 

- About : Sportshub helps you to connect with sports people.
    1. you can create your team and join your friends in your team.
    2. You can join with stranger team.
    3. make matches with new opponents or with your friend team

- persona : There are 3 personas 
    1. Captain of team
    2. Team players
    3. Non team players

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fssa-batch3_alagappan.kumaravel__web_project&metric=bugs)](https://sonarcloud.io/summary/new_code?id=fssa-batch3_alagappan.kumaravel__web_project)

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=fssa-batch3_alagappan.kumaravel__web_project)

This project is about play real sports game with new people
Problem Statement : https://docs.google.com/document/d/1mcNfaGt16Z_qDbZj0pBTLbLvu7Toq4d8/edit
User Flow : https://drive.google.com/drive/folders/1t_xNmzVZ8JNBcCaNPtnnRtuEmenp89TM
Wireframe : https://drive.google.com/drive/folders/17xy0GD2s1na0NdN5s6wVzIQRmvBmiEzk

### Completed module status

User profile Module (completed)

* sign up (completed)
* log in (completed)
* read profile (completed)
* Edit and Update (completed)
* Delete (completed)

Team Module (completed)

* Create a team profile (completed)
* Read team profile (completed)
* edit or Update team profile (completed)
* create join request to team (completed)
* Delete join Request to team. (completed)
* Accept or Reject join request. (completed)
* read status of join request response. (completed)
* remove player from team. (completed)
* exit player from team. (completed)
* Switch captain in team. (completed)
* delete team. (completed)


Match Module (Not completed)

* create match invitation. (completed)
* Accept or Reject invitation. (completed)
* delete invitation. (completed)
* read invitation response. (completed)
* read accepted match list. (completed)
* update the match result. (completed)
* read the match result. (completed)
* edit the match result. (completed)
* read the previous match details. (Not completed)
* read others team profile.(Not completed)
* read others players profile.(Not completed)


other module. (Not completed)
* chat with others with whatsapp link.(Not completed)
* notification option.(Not completed)


# User manual 

## Non team players
- initally new person is a non player of team

### Create an account (completed)
- Scenario 1: Successfully create an account
    - Steps:
        1. In index page click "Don't have an account yet" (or) click the menu button and navigate to the Sign Up page .
        2. Enter the required information such as phonenumber, Username, and password.
        3. User name and phone number should unique.
        4. Then next page Enter the required information such as DOB , gender, game (Now currently completed for cricket only), area, distric .
        5. Click the "Submit" button.

    - Expected Result:
        - The user is redirected to the Home page.
        - The user account created.
### View my profile (completed) 
- Scenario 1: Successfully view your profile 
    - Steps:
        1. Log in as a player.
        2. In home page click the "menu" button.
        3. Click on the player image you are redirected to the player profile page.
    - Expected Result:
        - The user can view their profile.

### Edit your profile (completed)
- Scenario 1: Successfully edit your profile 
    - Steps:
        1. Log in as a player.
        2. In home page click the "menu" button.
        3. Click on the player image you are redirected to the player profile page.
        4. Then click the "EDIT" button now you are redirected to the profile edit page.
        5. Update your account details.
        6. Click the "UPDATE" button.

    - Expected Result:
        - The user is edit their profile.


### Delete my profile (completed)
- Scenario 1: Successfully delete profile.
    - Steps:
        1. Log in as a player.
        2. Navigate to the player profile page.
        3. Click the "DELETE" button.
        4. Click "ok" of alert message 

    - Expected Result:
        - The user profile permanently deleted form storage.

### Log out your account (completed)
- Scenario 1: Successfully log out my profile
    - Steps:
        1. Log in as a player.
        2. Navigate to the home page.
        3. In home page click the "menu" button.
        4. Click on the player image you are redirected to the player profile page.
        5. Click "LOG OUT" button

    - Expected Result:
        - The user is Log out from the website.
        - The user redirected to the Index page.

### Log in into to your Account (completed)

- Scenario 1: Successfully login in to account. If you already have an account.
    - Steps:
        1. In index page enter the required information such as phonenumber, and password.
        2. Click the "login" button.
    - Expected Result:
        - The user is redirected to the user Home page.

## Join Team 
- types:
    1. You can create team. (then you will became team captain)
    2. you can join with your friend team (or) stranger team. (then you will became team player)

### sent request to team (Not completed)
- Scenario 1: Successfully sent request to team.
    - Steps:
        1. Log in as a non team player .
        2. In home page click the "Join to team" button.
        3. Now you can see the players needed team list. 
        4. Click on the "team image" you can see their profile ("View profile" button not yet complete)
        5. Select the starnger team (or) your friend team by their name (Search bar and filter team by area name are not yet complete)

    - Expected Result:
        - The request is sent to the respective team.
        - you are redirected to the Response page.

### View sent request to team (Not completed)
- Scenario 1: Successfully view request to team.
    - Steps:
        1. Log in as a non team player.
        2. Navigate to the Response page.
        3. View the list of request you sent to the team.
    - Expected Result:
        - The user can view the list of request sent to the team.

### Delete sent request to the team (completed)
- Scenario 1: Successfully Delete the sent request to the team
    - Steps:
        1. Log in as a non team player.
        2. Navigate to the Response page.
        3. Delete the request By Click the "Dust bin icon".
    - Expected Result:
        - The request is delete from the storage.


## Team Captain 

### Create a team (completed)
- Scenario 1: Successfully create a team
    - Steps:
        1. Log in as a non team player.
        2. In home page click the "Create team" button.
        3. Enter the required information uch as team name, area, distric, image, About and open for players description.
        4. Initially you should write your players requirements in that "open for players" field.
        5. click the "create my team" button.

    - Expected Result:
        - The user is redirected to the Home page.
        - The team created and that created person became a captain of that team.
        - The team will list on the "join to team" page by that other players can join in this team.

### View team profile (completed)
- Scenario 1: Successfully view team profile
    - Steps:
        1. Log in as a team player.
        2. Navigate to the team profile page by Click "My team" button in home page "menu" button.
        3. View the team profile.("matches" option not yet complete)

    - Expected Result:
        - The user can view their team profile.

### Accept (or) Reject players join request.(completed)
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
### Edit team profile (completed)
- Scenario 1: Successfully edit team profile 
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the team profile page.
        3. Click the "Pen Icon" button. You are redirected to the team profile edit page.
        4. Update the team details.
        5. Click the "UPDATE" button.

    - Expected Result:
        - The user's update their team profile.

### Turn off players required option (completed)
- Scenario 1: Successfully turn off players required option
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the team profile page.
        3. Click the "Pen Icon" button. You are redirected to the team profile edit page.
        4. Turn off the toggle button mentioned as "Open for players"

    - Expected Result:
        - The user's can turn off players required option

### Remove player in their team (completed)
- Scenario 1: Successfully remove player in their team 
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the team profile edit page.
        3. Click the "Member" button.
        4. You can see your team mates list 
        5. Click the "REMOVE" button and accept that alert message.

    - Expected Result:
        - The captain user's remove their team players from their team.

### Switch captain in team (completed)
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

### Delete team (completed)
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
## Make match 
- As a captain you can create match invitation like (which time you want to play , which ground) and sent that invitation to a particular team (or) a particular area.

### Create a match invitation (completed)
- Scenario 1: Successfully Create a match invitation 
    - Steps:
        1. Log in as a team captain.
        2. In home page Click the "Create Match" button
        3. You are redirected to the create match page.
        4. Click the toggle button to select opponent type (Friend / Public).
        5. If Friend means -> you should select the particular team (That invitation send to that person)
        6. If Public means -> You can select any particular area name (Then that invitation sent to all team who all are in that area)
        7. After select type Click "Choose opponent" name.
        8. Depending upon the opponent type you are redirected to the respective (team / area) page.
        9. In team you can click "image" to view their profile on popup.
        10. Click "SELECT" button to choose your opponent in (team / area) page.
        11. you are now redirected to create match page (You can edit what you have done previously)
        12. Then enter the required information such as member count, type of match, players max and min age, match time, match location(ground name), any additional information.
        13. After entering all details Click "CREATE" button.

    - Expected Result:
        - You are redirected to the Response page.
        - Your invitation is sent to the respective opponent
        - If friend means (invitation is sent to that person)
        - If public means (invitation sent to all team who all are in that area)
### Read my match Invitation status (completed)
- Scenario 1: Successfully Read my match Invitation status
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the home page.
        3. Click "response" button in home page.(available in side bar and bottom bar)
        4. you can read your created invitations list status.

    - Expected Result:
        - The user can read their created invitations list status.

### Delete my match Invitation (completed)
- Scenario 1: Successfully delete my match Invitation.
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the home page.
        3. Click "response" button in home page.(available in side bar and bottom bar)
        4. you can see your created invitations list.
        5. Click "dust bin icon" button.

    - Expected Result:
        - The user can delete his match invitation
### Accept or Reject others match Invitation.(completed)
- Scenario 1: Successfully accept or reject others match Invitation.
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the home page.
        3. Click "Invitation" button in home page available in side bar.
        4. you can see your match invitations list that others sent to you.
        5. Click "Accept"(or)"Reject" button.

    - Expected Result:
        - The user can delete his match invitation

### read accepted match list. (completed)
- Scenario 1: Successfully read the accepted match list.
    - Steps:
        1. Log in as a team player (or) team captain.
        2. Navigate to the home page.
        3. Click "My match" button in home page. It is available in side bar also available in bottom bar.
        4. you can see your upcoming match list.

    - Expected Result:
        - The user can read the accepted match list

### Update match result .(completed)
- Scenario 1: Successfully Update match result.
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the home page.
        3. Click "My match" button in home page. It is available in side bar also available in bottom bar.
        4. you are redirected to my match page.
        4. Click the "live" button. You can see live match list.
        5. you can update your score with in 24 hrs from game started time.
        6. Click "Update Score" button. It redirected to you in score update page.
        7. Enter your score in the given input field.
        8. In Bottom of that page you can see the list of your team mates.
        9. SELECT maximum two players, Who played well on that match (optional).
        10. Click "Update Score" button. 

    - Expected Result:
        - The user is redirected to my match page.
        - That match score is updated 
        - That score will compare and verify with opp team score.
        - (If both captain updated score correctly -> score will update)
        - (If both captain score noticed mismatch -> score will update as "draw")

- Scenario 2: Score not updated with in 24hrs .
    - Steps:

    - Expected Result:
        - score will update as "draw" .

    
### read update match result . (completed)
- Scenario 1: Successfully read update match result.
    - Steps:
        1. Log in as a team player (or) team captain.
        2. Navigate to the home page.
        3. Click "My match" button in home page. It is available in side bar also available in bottom bar.
        4. you are redirected to my match page.
        4. Click the "live" button. You can see live match list.
        5. If your score updated then It will shown in the respective field.

    - Expected Result:
        - The user is read update match result.

### Edit update match result . (completed)
- Scenario 1: Successfully edit update match result .
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the home page.
        3. Click "My match" button in home page. It is available in side bar also available in bottom bar.
        4. you are redirected to my match page.
        5. Click the "live" button. You can see live match list.
        6. you can update your score with in 24 hrs from game started time.
        7. Click "Update Score" button. It redirected to you in score update page.
        8. Enter your new score in the given input field.
        9. Click "Update Score" button. 

    - Expected Result:
        - The user is redirected to my match page.
        - That match score is updated 

### Read previous match details. (Not completed)
- Scenario 1: Successfully read previous match details.
    - Steps:
        1. Log in as a player.
        2. Navigate to the home page.
        3. Click "My match" button in home page. It is available in side bar also available in bottom bar.
        4. you are redirected to my match page.
        5. Click the "completed" button. You can see your previous match list.
        6. Click on any list you can see that details in popup.

    - Expected Result:
        - The user is read previous match details.

- Scenario 2: Successfully read previous match details.
    - Steps:
        1. Log in as a team captain.
        2. Navigate to the home page.
        3. Click "menu" button in home page and click on your image.
        4. you are redirected to my profile page.
        5. Click the "my cricket profile" button.you are redirected to my game stats page.
        6. click the "MATCHES" button. You can see your previous match list.
        6. Click on any list you can see that details in popup.

    - Expected Result:
        - The user is read previous match details.

### Read others team profile. (Not completed)
- Scenario 1: Successfully read others team profile.
    - Steps:
        1. Log in as a player .
        2. Navigate to the home page.
        3. Click "search bar" icon in home page. It is available in header.
        4. you are redirected to search page.
        5. Enter the team name in input field.
        6. you can see the the team list click on any team name 
        7. you are redirected to that team profile.


    - Expected Result:
        - The user is read others team profile.

- Scenario 2: Successfully read others team profile.
    - Steps:
        1. Log in as a team captain.
        2. While Creating match invitation. In select team page you can see "View profile" button in the popup
        3. Click that button
        4. you are redirected to that team profile.


    - Expected Result:
        - The user is read others team profile.

- Scenario 3: Successfully read others team profile.
    - Steps:
        1. Log in as a team captain.
        2. While reading upcoming match list. In my match page you can see list of matches
        3. click on any team name.
        4. you are redirected to that team profile.


    - Expected Result:
        - The user is read others team profile.

### Read others players profile. (Not completed)
- Scenario 1: Successfully read others team profile.
    - Steps:
        1. Log in as a player .
        2. Navigate to the home page.
        3. Click "search bar" icon in home page. It is available in header.
        4. you are redirected to search page.
        5. Enter the players name in input field.
        6. you can see the the players list click on any player name 
        7. you are redirected to that player profile.


    - Expected Result:
        - The user is read others player profile.

- Scenario 2: Successfully read others team profile.
    - Steps:
        1. Log in as a team captain.
        2. While Accept or Reject players request. In players request page you can see "View profile" button in the popup
        3. Click that button
        4. you are redirected to that player profile.


    - Expected Result:
        - The user is read others player profile.

- Scenario 3: Successfully read others team profile.
    - Steps:
        1. Log in as a players.
        2. While reading others team profile.
        3. click on "MEMBER" button 
        4. you can see that team players list.
        5. click on that any name.
        4. you are redirected to that player profile.


    - Expected Result:
        - The user is read others player profile.


## Team Players (Not captain) 
- The team players can explore all things like captain.
- But they can't accept or reject any invitation or a requests. only they can see what captain done.
- they have one option (exit from their team). 

### Exit from my team (completed)
 - Scenario 1: Successfully exit from my team.
    - Steps:
        1. Log in as a team players.
        2. Navigate to the my team profile page.
        3. In "MEMBER" option beside your name you have "EXIT" Option
        4. Click that and accept the alert message.

    - Expected Result:
        - The user can exit from their team and redirected to home page.

## Others 

### chat with others with whatsapp link (completed)

 - Scenario 1: Successfully chat with others with whatsapp link 
    - Steps:
        1. Log in as a team players.
        2. In this website where ever you see "Whatsapp" icon (like-> players profile page, team profile page, etc)
        3. click on that icon.

    - Expected Result:
        - The user can chat with others with whatsapp link.

