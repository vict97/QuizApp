//Import question
import { quizData } from "./question.js"

//ciblage des elements à utiliser
const quiz = document.getElementById('quiz') //div container
const answerEls = document.querySelectorAll('.answer') //inputs de reponses
const questionEl = document.getElementById('question') //question à poser
const a_text = document.getElementById('a_text') //Label question a
const b_text = document.getElementById('b_text') //Label question b
const c_text = document.getElementById('c_text') //Label question c
const d_text = document.getElementById('d_text') //Label question d
const currentQuestionEL = document.getElementById('currentQuestion'); // span de la question courante
const submitBtn = document.getElementById('submit') //validation submit
let user = JSON.parse(localStorage.getItem("user")); //recuperation de login à partir de local storage


// variables de compteur de question et du score à afficher
let currentQuiz = 0
let score = 0

//Timer
let count_progress = document.querySelector('#count-progress')
let bar_progress = document.querySelector('#bar-progress')

//fonction progressBar
const progressBar = () => {
    let intervall = 30;

    //on compte de 30 à 0 par l'intervalle d'1 seconde avec la fonction countDown
    var counter = setInterval(time, 1000)

    //fonction de comptage
    function time() {
        intervall--;
        let progressWidth = (intervall / 3) * 10;

        if (intervall >= 0) {
            bar_progress.style.width = progressWidth + "%";
            count_progress.innerHTML = intervall;
            checkColors(progressWidth);
        } else {
            clearInterval(counter);
            bar_progress.style.width = "100%";
            currentQuiz++;
            //clearAllInterval();
            count_progress.innerHTML = "30";
            progressBar();
            loadQuiz()
        }
    }
}

progressBar()
count_progress.innerHTML = "30";

// fonction pour changer les couleurs de progress bar
const checkColors = (width) => {
    if (width > 50) {
        bar_progress.style.background = "green";
    } else if (width >= 20) {
        bar_progress.style.background = "orange"
    } else if (width >= 10 || width >= 3) {
        bar_progress.style.background = "red";
    } else {
        bar_progress.style.background = "green";
    }
}

//-----------------------------------------------//
// LES FONCTIONS
//-----------------------------------------------//
//fonction pour charger les questions
loadQuiz()

// remettre le timer à zéro
function loadQuiz() {
    deselectAnswers() // on deselectionne le radio

    const currentQuizData = quizData[currentQuiz];
    if (currentQuiz == quizData.length) {
        showResult();
    }
    //Reserver pour le bouton de la question terminer

    currentQuestionEL.innerHTML = (currentQuiz + 1);
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

//fonction qui deselectionne le radio pour la question suivante
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

//fonction qui retourne la reponse selectionnée
function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

//validation des questions reussis ou echouées
submitBtn.addEventListener('click', function response() {
    clearAllInterval();
    progressBar();
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
        }
        currentQuiz++
        if (currentQuiz < quizData.length) {
            count_progress.innerHTML = "30";
            loadQuiz()
        } else {
            showResult();
        }
    }
})

//affichage de resultat
function showResult() {
    if (score > 7) {
        quiz.innerHTML = `
        <div class="score-container">
            <div class="score-content">
                <div class="recupNom">
                    <p> ${user.pseudo}</p>
                </div>
                <div class="recupMail">
                    <p>${user.email}</p>
                </div>
            <div class="recupValid"><i class="fa fa-check" aria-hidden="true"></i></div>
            <div class="recupScore">
                <p>${score}/${quizData.length}</p>
            </div>
            <div class="btnValid">
                <button onclick=location.href="login/login.html" id="submit" class="btnAccueil">Accueil</button>
            </div>
        </div>
           `
    } else {
        quiz.innerHTML = `
            <div class="score-container">
                <div class="score-content">
                    <div class="recupNom">
                        <p> ${user.pseudo}</p>
                    </div>
                    <div class="recupMail">
                        <p>${user.email}</p>
                    </div>
                <div class="recupValidFaible"><i class="fa fa-close" aria-hidden="true"></i></div>
                <div class="recupScore">
                    <p>${score}/${quizData.length}</p>
                </div>
                <div class="btnValid">
                    <button onclick=location.href="login/login.html" id="submit" class="btnAccueil">Accueil</button>
                </div>
            </div>
           `
    }
}

//supprime les timer en cours
function clearAllInterval() {
    const interval_id = window.setInterval(function() {}, Number.MAX_SAFE_INTEGER);
    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
    }
    bar_progress.style.width = "100%";
}

//button quitter
let btnQuit = document.querySelector("#quit")

btnQuit.addEventListener("click", () => {
    showResult()
})