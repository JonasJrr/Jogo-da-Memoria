const FRONT = "cardfront"
const BACK = "cardback"
const CARD = "card"
const ICON = "icon"

startGame();

function startGame() {
    initializeCards(game.createCardsFromTecs());
}

function initializeCards(cards) {
    var gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {

        var cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement);
    })
}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {

    var cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        var iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    var gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            } else {
                setTimeout(() => {
                    var firstCardView = document.getElementById(game.firstCard.id);
                    var secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);

            };
        }
    }

}

function restart() {
    game.clearCards();
    startGame();
    var gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}