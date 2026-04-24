function logout() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "role"
    );

    alert("Logged out Successfully");

    window.location.href =
    "login.html";

}