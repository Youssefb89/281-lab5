# ENSE 281 - Lab 5: jQuery and DOM (Note-Vote Prototype)

## Student Information
* **Name:** Youssef Abdelaziz
* **SID:** 200511755
* **Course:** ENSE 281 - Software Engineering Management
* **University:** University of Regina

## Lab Overview
This lab builds upon the HTML and CSS established in Lab 3 to create a front-end prototype of a multi-user message posting application using JavaScript and jQuery. The application follows a strict Model-View-Controller (MVC) pattern where all user interactions update a central JavaScript data model first, which then triggers a complete re-render of the View.

### Features & Voting Rules
* **User Switching:** A dropdown menu allows simulating the application from the perspective of different users (e.g., Adam, Youssef, Guest).
* **Posting Notes:** Users can input text to add new notes to the global feed.
* **Voting Logic:**
  * If a user wrote a note, they cannot vote on it, but they can always see the score.
  * If a user did not write the note and has not yet voted, the score is hidden.
  * Upvoting turns the button green and reveals the score.
  * Downvoting turns the button red and reveals the score.
  * Users can toggle their votes on/off, or switch directly between an upvote and a downvote, updating the score dynamically.

## Technologies Used
* **HTML5:** Semantic page structure.
* **CSS / Bootstrap 5:** Styling, layout, and UI components (Accordion, Dropdowns).
* **JavaScript & jQuery 4.0.0:** DOM manipulation, event handling, and MVC architecture.
* **Bootstrap Icons:** Up and down arrows for the voting interface.

## How to Run
1. Ensure `index.html`, `index.css`, and `script.js` are in the same directory.
2. Open `index.html` in a modern web browser (Chrome or Firefox recommended).
3. Log in (the login form visually targets the main app screen) and use the "Switch User" dropdown inside the header to test the voting permissions.

## Files Included
* `index.html`: The main structure of the application.
* `index.css`: Custom styling and animations.
* `script.js`: Contains the MVC logic, mock JSON data, and jQuery event listeners.
* `README.md`: Project documentation.

## References
* Lab Manual: ENSE 281 Lab 5 by Adam Tilson.