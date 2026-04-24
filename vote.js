const token =
localStorage.getItem("token");

if (!token) {

    alert("Please login first");

    window.location.href =
    "login.html";

}

async function loadCandidates() {

    const response =
    await fetch(
    "http://localhost:3000/api/admin/candidates"
    );

    const candidates =
    await response.json();

    let html = "";

    candidates.forEach(candidate => {

        html += `
        <div class="candidate">

        ${candidate.name}
        (${candidate.party})

        <button onclick="vote('${candidate._id}')">
        Vote
        </button>

        </div>
        `;

    });

    document.getElementById(
    "candidateList"
    ).innerHTML = html;

}

async function vote(candidateId) {

    const userId =
    prompt("Enter your User ID");

    const response =
    await fetch(
    "http://localhost:3000/api/vote",
    {
        method: "POST",

        headers: {
            "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
            userId,
            candidateId
        })
    });

    const data =
    await response.text();

    alert(data);

}

loadCandidates();

function logout() {

    localStorage.removeItem(
        "token"
    );

    alert("Logged out successfully");

    window.location.href =
    "login.html";

}