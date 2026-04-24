
async function showResults() {

    const response = await fetch(
        "http://localhost:3000/api/admin/candidates"
    );

    const candidates = await response.json();

    let html = "";

    candidates.forEach(candidate => {

        html += `
            <p>
                ${candidate.name}
                —
                Votes: ${candidate.votes}
            </p>
        `;

    });

    document.getElementById("results").innerHTML = html;

}

showResults();
