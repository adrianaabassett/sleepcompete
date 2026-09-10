# SleepCompete 

[My Notes](notes.md)

SleepCompete is a personal health application that turns getting a good night's rest into a friendly competition. Users can log their sleep hours and compare them with their friend's data on sleep consistency and duration to see who is the ultimate sleep champion



### Elevator pitch

Have you struggled with sleep? Most Americans get less sleep than they truly need, and with distractions and stress that statistic is not likely to get better. SleepCompete is a sleep tracking app that keeps you accountable to your friends and family. Log your hours, maintain your sleep streaks, and climb the leaderboard to prove who truly gets the best rest!

### Design

![Design image](1.png)
![Design image](Friends.png)
![Design image](LogTimes.png)
![Design image](MyScores.png)
![Design image](MyScores(2).png)
![Design image](SignIn.png)
![Design image](Howtogetmoresleep.png)

## sequenceDiagram
    actor You
    actor Website
    actor Server
    You->>Website: Logs sleep duration (e.g., 8.5 hours)
    Website->>Server: POST /api/sleep
    Server-->>Website: Returns updated Leaderboard Data
    Website->>You: Displays your new rank
    Server->>Website: WebSocket broadcast to friends: "User just logged 8.5 hours!"

### Key features

- Secure Login: Users can create an account and log in securely.

- Sleep Tracking: A simple interface to manually log hours slept each night.

- Social Connections: Users can find and add friends.

- Dynamic Leaderboard: A ranking system that compares your weekly sleep average with your friends.
  
- Weekly/Monthly Graph: A graph that compares your weekly/monthly sleep data with your friends.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structural elements to build the application pages. See Above. 
- **CSS** - Styling the application to look clean, modern, and restful. Uses Flexbox/Grid for responsive design on mobile and desktop, similar to my previously made portfolio website.
- **React** - Provides a smooth, single-page application experience. Handles routing between the login, dashboard, and friends list, as well as reactive UI state for leaderboard updates.
- **Service** - Node.js/Express backend service to provide endpoints for user authentication, retrieving sleep data, and logging new sleep entries.
- **DB/Login** - MongoDB database to store user profiles, friend connections, and historical sleep logs. Secure user registration and login using bcrypt for password hashing.
- **WebSocket** - Real-time updates of scores on the leaderboards and graphs.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Git commit requirement)
- [ ] Proper use of Markdown
- [ ] A concise and compelling elevator pitch
- [ ] Description of key features
- [ ] Description of how you will use each technology including your 3rd party API and use of WebSocket
- [ ] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Rented EC2 server** - I did not complete this part of the deliverable.
- [ ] **Leased domain name** - I did not complete this part of the deliverable.
- [ ] **Server accessible** from my domain: [https://yourdomainnamehere.click](https://yourdomainnamehere.click) - I did not complete this part of the deliverable.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.
- [ ] **Uses BCrypt to hash passwords** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
