const gameInfo = document.querySelector("[data-game-info]");
const actionBtn = document.querySelector("[data-action-btn]");
const container = document.querySelector("[data-container]");

const getRandomNumber = () => Math.ceil(Math.random() * 6);

actionBtn.addEventListener("click", () => {
    
    render();
})

const render = () => {
    const player1 = getRandomNumber();
    const player2 = getRandomNumber();

    container.innerHTML = "";
    container.insertAdjacentHTML("afterbegin", `
        <svg class="dice dice-red">
            <use href="sprites.svg#dice-${player1}-icon"></use>
        </svg>
         <svg class="dice dice-blue">
            <use href="sprites.svg#dice-${player2}-icon"></use>
        </svg>
        `)

        if (player1 === player2) {
            gameInfo.textContent = "draw!";
            gameInfo.style.color = "#7067ee";
        } else if (player1 > player2) {
            gameInfo.textContent = "player 1 wins!";
            gameInfo.style.color = "#f76060";
        } else {
            gameInfo.textContent = "player 2 wins!";
            gameInfo.style.color = "#23a0f3";
        }
}

render();