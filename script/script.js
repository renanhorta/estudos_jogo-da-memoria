const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

startGame();


function startGame(){
    initializeCards(game.createCardFromTechs());
}

function  initializeCards(cards){

    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';

    game.cards.forEach(card => {

        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);

    })

}

function createCardContent(card, cardElement) {

    createCardFace (FRONT, card, cardElement);
    createCardFace (BACK, card, cardElement);

}

function createCardFace (face, card, element) { 

        let cardElmentFace = document.createElement("div");
        cardElmentFace.classList.add(face);

        if(face === FRONT){
            let iconElement = document.createElement("img");
            iconElement.classList.add(ICON);
            iconElement.src = "./images/" + card.icon + ".png";
            cardElmentFace.appendChild(iconElement);
        } else {
            cardElmentFace.innerHTML = "&lt/&gt";
        }

        element.appendChild(cardElmentFace);
}

function flipCard() {

    if(game.setCard(this.id)){
        this.classList.add("flip");
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if (game.chechGameOver()){

                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = "flex";
                }
            }else{
                setTimeout(()=>{
                let fristCardView = document.getElementById(game.fristCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);

                fristCardView.classList.remove("flip");
                secondCardView.classList.remove("flip");
                game.unFlipCards();
                }, 1000);
            }
        }
    }
}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
        gameOverLayer.style.display = "none";
}