document
.getElementById("registerForm")
.addEventListener(
    "submit",
    async function (event) {

        // Stop page reload
        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        try {

            const response =
            await fetch(
                "http://localhost:3000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data =
            await response.text();

            alert(data);

            // Redirect to login page
            window.location.href =
            "login.html";

        }

        catch (error) {

            console.log(error);

            alert("Registration failed");

        }

    }
);