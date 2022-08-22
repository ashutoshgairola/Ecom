
const submitButton = document.getElementById("btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const url = `http://localhost:3000/`;

submitButton.addEventListener("click", (e)=> {
e.preventDefault()

  fetch(`${url}users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
