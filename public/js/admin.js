const role = localStorage.getItem("role");

if (!role) {
    alert("Please login first");
    window.location.href = "login.html";
}

else if (role !== "admin") {
    alert("Access denied");
    window.location.href = "login.html";
}

// Add Candidate 

document
.getElementById("candidateForm")
.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const party =
            document.getElementById("party").value;

        const response =
        await fetch(
            "http://localhost:3000/api/admin/addCandidate",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    name,
                    party
                })
            }
        );

        const data =
        await response.text();

        alert(data);

    }
);


async function viewVoters() {

    const response =
    await fetch(
        "http://localhost:3000/api/admin/voters"
    );

    const voters =
    await response.json();

    let html = "";

    voters.forEach(voter => {

        html += `
        <div class="candidate">

        Name: ${voter.name}
        <br>

        Email: ${voter.email}
        <br>

        Has Voted:
        ${voter.hasVoted}

        </div>
        `;

    });

    document.getElementById(
        "voterList"
    ).innerHTML = html;

}


// View Candidates 

async function viewCandidates() {

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

        <br><br>

        <button onclick="editCandidate('${candidate._id}')">
        Edit
        </button>

        <button onclick="deleteCandidate('${candidate._id}')">
        Delete
        </button>

        </div>
        `;

    });

    document.getElementById(
        "candidateList"
    ).innerHTML = html;

}

async function deleteCandidate(id) {

    const confirmDelete =
    confirm(
        "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    const response =
    await fetch(
        `http://localhost:3000/api/admin/deleteCandidate/${id}`,
        {
            method: "DELETE"
        }
    );

    const data =
    await response.text();

    alert(data);

    viewCandidates();

}