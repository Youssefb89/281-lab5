// --- MODEL ---
let noteVoteData = [
    { id: 1, creator: "Adam", text: "This is the first sample note for the model.", upvoters: ["Youssef", "Sarah"], downvoters: ["John"] },
    { id: 2, creator: "Youssef", text: "Don't forget to submit the lab on GitHub!", upvoters: [], downvoters: ["Adam"] },
    { id: 3, creator: "Guest", text: "I prefer the dark theme for this app.", upvoters: ["Sarah", "Mike", "Jen"], downvoters: [] }
];

let currentUser = "Adam"; // Default starting user
let nextNoteId = 4;

// --- CONTROLLER ---
$(document).ready(() => {

    // 1. Initial Render
    buildList();

    // 2. Handle User Switching
    $(".dropdown-item.user-select").click(function(e) {
        e.preventDefault();
        currentUser = $(this).data("user"); 
        $("#currentUserDisplay").text(currentUser);
        buildList();
    });

    // 3. Handle Posting a New Note
    $("#postBtn").click(() => {
        let content = $("#noteContent").val().trim();
        if (content === "") return; 

        let newNote = {
            id: nextNoteId++,
            creator: currentUser,
            text: content,
            upvoters: [],
            downvoters: []
        };
        noteVoteData.push(newNote);
        
        $("#noteContent").val("");
        buildList();
    });

    // 4. Handle Voting
    $("#notesContainer").on("click", ".btn-upvote", function() {
        handleVote($(this).data("note-id"), "up");
    });

    $("#notesContainer").on("click", ".btn-downvote", function() {
        handleVote($(this).data("note-id"), "down");
    });
});

// Logic to handle upvoting/downvoting
function handleVote(noteId, voteType) {
    let note = noteVoteData.find(n => n.id === noteId);
    
    if (!note || note.creator === currentUser) return;

    let hasUpvoted = note.upvoters.includes(currentUser);
    let hasDownvoted = note.downvoters.includes(currentUser);

    if (voteType === "up") {
        if (hasUpvoted) {
            note.upvoters = note.upvoters.filter(user => user !== currentUser);
        } else {
            note.upvoters.push(currentUser);
            note.downvoters = note.downvoters.filter(user => user !== currentUser);
        }
    } else if (voteType === "down") {
        if (hasDownvoted) {
            note.downvoters = note.downvoters.filter(user => user !== currentUser);
        } else {
            note.downvoters.push(currentUser);
            note.upvoters = note.upvoters.filter(user => user !== currentUser);
        }
    }

    buildList();
}

// --- VIEW ---
function buildList() {
    let $container = $("#notesContainer");
    $container.empty();

    for (let note of noteVoteData) {
        let score = note.upvoters.length - note.downvoters.length;
        
        let isCreator = (note.creator === currentUser);
        let hasUpvoted = note.upvoters.includes(currentUser);
        let hasDownvoted = note.downvoters.includes(currentUser);
        let hasVoted = hasUpvoted || hasDownvoted;

        // Button styling based on your CSS and assignment photos
        let upvoteClass = hasUpvoted ? "btn-success" : "btn-light border";
        let downvoteClass = hasDownvoted ? "btn-danger" : "btn-light border";
        let disabledAttr = isCreator ? "disabled" : "";

        // Conditionally display the score box
        let scoreHTML = (isCreator || hasVoted) 
            ? `<span class="input-group-text bg-secondary-subtle" style="width: 45px; justify-content: center;">${score}</span>` 
            : ``;

        // Render the exact inline input-group structure
        let noteHTML = `
            <div class="input-group mb-3">
                <input type="text" class="form-control bg-secondary-subtle" value="${note.text}" readonly>
                <button class="btn ${upvoteClass} btn-upvote" data-note-id="${note.id}" ${disabledAttr}>&uarr;</button>
                <button class="btn ${downvoteClass} btn-downvote" data-note-id="${note.id}" ${disabledAttr}>&darr;</button>
                ${scoreHTML}
            </div>
        `;

        $container.append(noteHTML);
    }
}