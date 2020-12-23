const startButton = document.querySelector('#startButton');
const resterButton = document.querySelectorAll('#restartButton');
const chipsWagered = document.querySelector('#chips-wagered');
const chips = document.querySelectorAll('.chips');
const totalChips = document.querySelector('#total-chips');
const dealerCardsSection = document.querySelector('.dealer-cards-container');
const playerCardsSection = document.querySelector('.player-cards-container');
const dealerTotalSpan = document.getElementById('dealer-total');
const playerTotalSpan = document.getElementById('player-total');

let currentChip = 0;
let dealerTotal = 0;
let playerTotal = 0;

let dealerCard1Value;
let dealerCard2Value;

let playerCard1Value;
let playerCard2Value;

const getChipsWagered = () => {
    chips.forEach(index => {
        index.addEventListener('click', () => {
            let selectedChip = parseInt(index.innerHTML);
            currentChip = selectedChip + currentChip;
            chipsWagered.textContent = currentChip;
        })
    })
}
getChipsWagered();

let cardsArray = [
    "clubs_ace", "clubs_2", "clubs_3", "clubs_4", "clubs_5", "clubs_6", "clubs_7", "clubs_8", "clubs_9", "clubs_jack", "clubs_queen", "clubs_king",
    "diamonds_ace", "diamonds_2", "diamonds_3", "diamonds_4", "diamonds_5", "diamonds_6", "diamonds_7", "diamonds_8", "diamonds_9", "diamonds_jack", "diamonds_queen", "diamonds_king",
    "spades_ace", "spades_2", "spades_3", "spades_4", "spades_5", "spades_6", "spades_7", "spades_8", "spades_9", "spades_jack", "spades_queen", "spades_king",
    "hearts_ace", "hearts_2", "hearts_3", "hearts_4", "hearts_5", "hearts_6", "hearts_7", "hearts_8", "hearts_9", "hearts_jack", "hearts_queen", "hearts_king"
]

const shuffleCardsDealer = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    const shuffledArr = a;

    const dealerCard1 = shuffledArr[0]
    const dealerCard2 = shuffledArr[1]

    if( dealerCard1.includes('king') || dealerCard1.includes('queen') || dealerCard1.includes('jack') ) dealerCard1Value = 10;
    if( dealerCard1.includes('ace') ) dealerCard1Value = 1;
    if( dealerCard1.includes('2') ) dealerCard1Value = 2;
    if( dealerCard1.includes('3') ) dealerCard1Value = 3;
    if( dealerCard1.includes('4') ) dealerCard1Value = 4;
    if( dealerCard1.includes('5') ) dealerCard1Value = 5;
    if( dealerCard1.includes('6') ) dealerCard1Value = 6;
    if( dealerCard1.includes('7') ) dealerCard1Value = 7;
    if( dealerCard1.includes('8') ) dealerCard1Value = 8;
    if( dealerCard1.includes('9') ) dealerCard1Value = 9;
    // console.log('Dealers 1st card: ' + dealerCard1Value)

    if( dealerCard2.includes('king') || dealerCard2.includes('queen') || dealerCard2.includes('jack') ) dealerCard2Value = 10;
    if( dealerCard2.includes('ace') ) dealerCard2Value = 1;
    if( dealerCard2.includes('2') ) dealerCard2Value = 2;
    if( dealerCard2.includes('3') ) dealerCard2Value = 3;
    if( dealerCard2.includes('4') ) dealerCard2Value = 4;
    if( dealerCard2.includes('5') ) dealerCard2Value = 5;
    if( dealerCard2.includes('6') ) dealerCard2Value = 6;
    if( dealerCard2.includes('7') ) dealerCard2Value = 7;
    if( dealerCard2.includes('8') ) dealerCard2Value = 8;
    if( dealerCard2.includes('9') ) dealerCard2Value = 9;
    // console.log('Dealers 2nd card: ' + dealerCard2Value)

    dealerCardsSection.innerHTML += `
        <img src="./assets/photos/cards/${shuffledArr[0]}.png" class="cards">
        <img src="./assets/photos/cards/card_back.png" class="cards">
    `
    // dealerTotal = dealerCard1Value + dealerCard2Value;
    // console.log(dealerTotal)
    // dealerTotalSpan.textContent = dealerTotal;
}
shuffleCardsDealer(cardsArray)


const shuffleCardsPlayer = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    const shuffledArr = a;

    const playerCard1 = shuffledArr[0]
    const playerCard2 = shuffledArr[1]

    if( playerCard1.includes('king') || playerCard1.includes('queen') || playerCard1.includes('jack') ) playerCard1Value = 10;
    if( playerCard1.includes('ace') ) playerCard1Value = 1;
    if( playerCard1.includes('2') ) playerCard1Value = 2;
    if( playerCard1.includes('3') ) playerCard1Value = 3;
    if( playerCard1.includes('4') ) playerCard1Value = 4;
    if( playerCard1.includes('5') ) playerCard1Value = 5;
    if( playerCard1.includes('6') ) playerCard1Value = 6;
    if( playerCard1.includes('7') ) playerCard1Value = 7;
    if( playerCard1.includes('8') ) playerCard1Value = 8;
    if( playerCard1.includes('9') ) playerCard1Value = 9;
    console.log('players 1st card: ' + playerCard1Value)

    if( playerCard2.includes('king') || playerCard2.includes('queen') || playerCard2.includes('jack') ) playerCard2Value = 10;
    if( playerCard2.includes('ace') ) playerCard2Value = 1;
    if( playerCard2.includes('2') ) playerCard2Value = 2;
    if( playerCard2.includes('3') ) playerCard2Value = 3;
    if( playerCard2.includes('4') ) playerCard2Value = 4;
    if( playerCard2.includes('5') ) playerCard2Value = 5;
    if( playerCard2.includes('6') ) playerCard2Value = 6;
    if( playerCard2.includes('7') ) playerCard2Value = 7;
    if( playerCard2.includes('8') ) playerCard2Value = 8;
    if( playerCard2.includes('9') ) playerCard2Value = 9;
    console.log('players 2nd card: ' + playerCard2Value)

    playerCardsSection.innerHTML += `
    <img src="./assets/photos/cards/${shuffledArr[0]}.png" class="cards">
    <img src="./assets/photos/cards/${shuffledArr[1]}.png" class="cards">
`
    playerTotal = playerCard1Value + playerCard2Value;
    console.log(playerTotal)
    playerTotalSpan.textContent = playerTotal;
}
shuffleCardsPlayer(cardsArray)




startButton.addEventListener('click', () => {

})



