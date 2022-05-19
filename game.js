var game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    tecs: ['bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: null,

    setCard: function (id) {

        var card = this.cards.filter(card => card.id === id)[0];
        console.log(card);
        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    createCardsFromTecs: function () {

        this.cards = [];

        this.tecs.forEach((tec) => {
            this.cards.push(this.createPairFromTech(tec));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromTech: function (tec) {

        return [{
            id: this.createIdWithTech(tec),
            icon: tec,
            flipped: false,
        }, {
            id: this.createIdWithTech(tec),
            icon: tec,
            flipped: false,
        }]
    },

    createIdWithTech: function (tec) {
        return tec + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        var currentIndex = this.cards.length;
        var randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
}