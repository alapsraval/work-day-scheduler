//glablal variables
let timerElement = document.querySelector("#timer");
let startButton = document.querySelector(".start-button");
let resetButton = document.querySelector(".reset-button");
let submitBtn = document.querySelector("#submit-btn");
let saveScoreBtn = document.querySelector("#save-score");

// let scoreElement = document.querySelector("#score");
let resultElement = document.querySelector("#result");
let questionForm = document.querySelector("#question-form");
let questionEl = document.querySelector("#question");
let optionsEl = document.querySelector("#options");
let questionID = 0;
let highScores = [];
let initials = document.querySelector("#initials");
let scoreForm = document.querySelector("#score-form");
let highScoresEl = document.querySelector("#high-scores");
let highScoreTableContainer = document.getElementById('high-score-table');
let highScoreBtn = document.querySelector(".high-score-btn");

let correctAlert = document.querySelector(".correct");
let incorrectAlert = document.querySelector(".incorrect");



// function declarations

function getHighScores() {
    highScores = JSON.parse(localStorage.getItem('highScores')) || [];
}

function setHighScores(score) {
    highScores.push(score);
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function showHighScores() {
    init();
    getHighScores();
    // while(highScoreTable.tBodies[0].rows.length > 0){
    //     highScoreTable.tBodies[0].rows[0].remove()
    // }

    //highScoreTable.tBodies[0].innerHTML = '';
    let highScoreTable = document.querySelector('#high-score-table table');

    if (highScoreTable) highScoreTable.remove();
    var newTable = document.createElement("table");
    newTable.classList.add('table');
    //create table header
    var tableHead = document.createElement("thead");
    let tableHeadRow = document.createElement("tr");
    let tableHeadCell1 = document.createElement("th");
    let tableHeadCellValue1 = document.createTextNode('Initials');
    tableHeadCell1.appendChild(tableHeadCellValue1);
    tableHeadRow.appendChild(tableHeadCell1);

    let tableHeadCell2 = document.createElement("th");
    let tableHeadCellValue2 = document.createTextNode('Score');
    tableHeadCell2.appendChild(tableHeadCellValue2);
    tableHeadRow.appendChild(tableHeadCell2);

    tableHead.appendChild(tableHeadRow);
    newTable.appendChild(tableHead);

    // create table rows with high score data
    var tableBody = document.createElement("tbody");
    for (let score of highScores) {
        let tableRow = document.createElement("tr");
        for (let columnName in score) {
            let tableCell = document.createElement("td");
            let tableCellValue = document.createTextNode(score[columnName]);
            tableCell.appendChild(tableCellValue);
            tableRow.appendChild(tableCell);
        }
        tableBody.appendChild(tableRow);
    }
    newTable.appendChild(tableBody);
    highScoreTableContainer.appendChild(newTable);

    resultElement.classList.add("d-none");
    highScoresEl.classList.remove("d-none");
    startButton.disabled = false;
}

function init() {
    timerCount = 50;
    questionID = 0;
    score = 0;
    clearInterval(timer);
    timerElement.textContent = timerCount;
    highScoresEl.classList.add("d-none");
    scoreForm.classList.add("d-none");
    resultElement.classList.add("d-none");
    questionForm.classList.add("d-none");
    correctAlert.classList.add("d-none");
    incorrectAlert.classList.add("d-none");
    getHighScores();
    startButton.disabled = false;
}

// event handlers

startButton.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", checkAnswer);
saveScoreBtn.addEventListener("click", saveResults);
resetButton.addEventListener("click", init);
highScoreBtn.addEventListener("click", showHighScores);

init();