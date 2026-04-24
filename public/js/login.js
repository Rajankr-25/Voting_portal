document.getElementById("loginForm").addEventListener(
    "submit",async function (event) {
         // Stop page refresh
        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        try {
            const response =
            await fetch(
                "http://localhost:3000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (data.token) {

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "role",
                data.role
            );

            alert("Login successful");

            if (data.role === "admin") {

                window.location.href =
                "admin.html";

            }

            else {

                window.location.href =
                "vote.html";

            }

        }

        else {

            alert(data.message);

        }

    }
    catch (error) {

        console.log(error);

        alert("Login failed");

    }
    
});
