const inputs = document.querySelectorAll("input[type ='text'], input[type ='email']");
const form = document.querySelector("form")
let pseudo, email;

//function pointant sur tous les inputs
const errorDisplay = (tag, message, valid) => {
    const floating = document.querySelector("." + tag + "-floating");
    const span = document.querySelector("." + tag + "-floating > span");

    if (!valid) {
        floating.classList.add("error");
        span.textContent = message;

    } else {
        floating.classList.remove("error");
        span.textContent = message;
    }
}

//checking pseudo avec regex
const pseudoCheck = (value) => {
    if (value.length > 0 && (value.length < 2 || value.length > 10)) {
        errorDisplay("pseudo", "le pseudo doit faire entre 2 et 10 caracteres");
        pseudo = null;

    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay("pseudo", "le pseudo ne doit pas contenir de caracteres speciaux");
        pseudo = null;

    } else {
        errorDisplay("pseudo", "", true);
        pseudo = value;
    }
}

//checking mail avec regex
const emailCheck = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "veuillez entrer un mail valide");
        email = null;
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
}

//Verification des inputs
inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        switch (e.target.id) {
            case "floatingPseudo":
                pseudoCheck(e.target.value);
                break;
            case "floatingInput":
                emailCheck(e.target.value);
                break;
            default:
                null;
        }
    })
})


//validation formulaire et redirection vers la page quiz
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (pseudo && email) {
        let btnStart = document.querySelector("#btnStart")
        btnStart.addEventListener("click", () => {

            //Envoi de login à partir de local storage
            localStorage.setItem("user", JSON.stringify({ pseudo, email }));
            document.location.href = "../index.html"; //redirection vers la page quiz
        })

    } else {
        alert("veuillez remplir tous les chants");
    }
})