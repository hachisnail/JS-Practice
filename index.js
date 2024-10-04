const questions = [
    {
      question: "Who is known as the 'Father of Modern Philippine Literature'?",
      options: ["Jose Rizal", "Francisco Balagtas", "Nick Joaquin", "Andres Bonifacio"],
      correctAnswer: 2
    },
    {
      question: "Which Filipino artist is famous for his abstract paintings and is considered one of the National Artists for Visual Arts?",
      options: ["Fernando Amorsolo", "Juan Luna", "Vicente Manansala", "Benedicto Cabrera"],
      correctAnswer: 3
    },
    {
      question: "What is the title of the novel written by Jose Rizal that highlights social injustices in the Philippines during Spanish colonization?",
      options: ["El Filibusterismo", "Noli Me Tangere", "Florante at Laura", "Banaag at Sikat"],
      correctAnswer: 1
    },
    {
      question: "Which Filipino painter is known for his 'The Spoliarium' and won a gold medal at the Exposición Nacional de Bellas Artes in Madrid?",
      options: ["Juan Luna", "Fernando Amorsolo", "Carlos Francisco", "Ang Kiukok"],
      correctAnswer: 0
    },
    {
      question: "Who is the first female National Artist for Literature in the Philippines?",
      options: ["Lualhati Bautista", "F. Sionil José", "Edith Tiempo", "Jessica Hagedorn"],
      correctAnswer: 2
    },
    {
      question: "Which author wrote the acclaimed novel 'Ilustrado'?",
      options: ["José Rizal", "Miguel Syjuco", "Jessica Hagedorn", "Lualhati Bautista"],
      correctAnswer: 1
    },
    {
      question: "Which famous Filipino visual artist is known for his 'Bencab' artworks and contributions to contemporary art?",
      options: ["Jose Joya", "Benedicto Cabrera", "Francisco Coching", "Romulo Olazo"],
      correctAnswer: 1
    },
    {
      question: "What is the literary work of Francisco Balagtas that is considered a classic in Philippine literature?",
      options: ["Florante at Laura", "Noli Me Tangere", "A Portrait of the Artist as a Filipino", "Mga Ibong Mandaragit"],
      correctAnswer: 0
    },
    {
      question: "Which Filipino artist is celebrated for his detailed landscapes and depictions of rural life, earning the title of National Artist for Painting?",
      options: ["Vicente Manansala", "Fernando Amorsolo", "Juan Luna", "Carlos Francisco"],
      correctAnswer: 1
    },
    {
      question: "Who wrote the play 'A Portrait of the Artist as a Filipino'?",
      options: ["Bienvenido Santos", "Lualhati Bautista", "José Garcia Villa", "Carlos Bulosan"],
      correctAnswer: 3
    }
  ];
  


let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 50;

const startButton = document.getElementById("start-button");
const quizPage = document.getElementById("quiz-page");
const startPage = document.getElementById("start-page");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const resultPage = document.getElementById("result-page");
const resultsElement = document.getElementById("results");
const summaryElement = document.getElementById("summary");
const retakeButton = document.getElementById("retake-button");
const timerElement = document.getElementById("time");

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", showNextQuestion);
retakeButton.addEventListener("click", retakeQuiz);

function startQuiz() {
    startPage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 50;
    startTimer();
    showQuestion();
}

function startTimer() {
    /*simple timer that uses the setInterval function by using the value 1000 
    the interval is set to 1 second effectively creating a simple timer which 
    decrements the predetermined timer untill it reaches 0 where the quiz will 
    stopped and the result function will be called*/
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            showResults();
        }
    }, 1000);
}

function showQuestion() {
    //this function fetches the questions from the array with the variable currentQuestionIndex as the starting basis
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

   /*this line of code resets the options list displayed as to not stack the previus options, 
   this is becuase this code follows the single page application, meaing there is only one html 
   file and the other designs are hidden and only revealed when neede*/
    optionsElement.innerHTML = "";


    /*a loop is used to iterate from all of the options from the options array within the array of questions*/ 
    currentQuestion.options.forEach((option, index) => {
        optionsElement.innerHTML += `
            <div>
                <input type="radio" name="option" id="option${index}" value="${index}">
                <label for="option${index}">${option}</label>
            </div>
        `;
    });
}



function showNextQuestion() {
    /*this function retrieves the choosen index from the radio button so that the answer can be checked from the 
    actual correct answer that is stored in the array*/ 
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        /*the parseint function converts the output from the radio button into int, because if not done so the data
        type that is gonna be fetched is string which will be a hassle to compare with the int data typr*/
        const answerIndex = parseInt(selectedOption.value);
        const currentQuestion = questions[currentQuestionIndex];

        /*this block of code returns feedback on wether the answer is correct or wrong */
        if (answerIndex === currentQuestion.correctAnswer) {
            score++;
            showFeedback("Correct!", true); 
        } else {
            showFeedback(`Wrong! The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`, false);
        }


        /*this line updates the current index to move on to the next question wethen the questions array*/
        currentQuestionIndex++;
        setTimeout(() => {
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                clearInterval(timer);
                showResults();
            }
        }, 750); 
    } else {
        /*this custom function prevents the user from moving on to the next question without choosing an answer*/
        emptyOption();
    }
}

function showFeedback(message, isCorrect) {
    /*custom function to insert a div to the html in which a feedback can be displayed wether the answer is correct or not */
    const feedbackElement = document.createElement("div");
    feedbackElement.innerText = message;
    feedbackElement.style.fontSize = "2vw"; 
    feedbackElement.style.margin = "2vw 0"; 
    feedbackElement.style.color = isCorrect ? "green" : "red"; 
    feedbackElement.id = "feedback"; 

    
    const existingFeedback = document.getElementById("feedback");
    if (existingFeedback) {
        existingFeedback.remove();
    }

    optionsElement.prepend(feedbackElement); 
}

function emptyOption() {
    /*another custom function which is same with the showfeedback function but instead just dislpay 
    pick an answer to reference that the user has no pick an answer yet */
    const answerElement = document.createElement("div");
    answerElement.innerText = "Pick an answer!";
    answerElement.style.fontSize = "2vw"; 
    answerElement.style.margin = "2vw 0"; 
    answerElement.style.color = "gray";
    answerElement.id = "emptyAnswer"; 

    const existingAnser = document.getElementById("emptyAnswer");
    if (existingAnser) {
        existingAnser.remove();
    }
    
    setTimeout(() => {
        answerElement.id = "emptyAnswer"; 
        emptyAnswer.remove();
    }, 500); 

    optionsElement.prepend(answerElement); 
}



function showResults() {
    /*this function displays the time left and the score of the user that 
    took the quiz it also provides a button to retake the quiz*/
    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    resultsElement.innerHTML = `You scored ${score} out of ${questions.length}.`;
    summaryElement.innerHTML = `Time left: ${timeLeft} seconds.`;
}

function retakeQuiz() {
    /*resets the index to 0 and the time as to restart the quiz it also hides 
    the result page and reveals the start page again to restart the quiz */
    resultPage.classList.add("hidden");
    startPage.classList.remove("hidden");
    currentQuestionIndex = 0;
    timeLeft = 50; 
    timerElement.innerText = timeLeft;
}


