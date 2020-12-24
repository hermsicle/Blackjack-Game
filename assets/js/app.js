const startButton = document.querySelector('#deal-button');
const restartButton = document.querySelector('#restartButton');
const chipsWagered = document.querySelector('#chips-wagered');
const chips = document.querySelectorAll('.chips');
const totalChips = document.querySelector('#total-chips');
const dealerCardsSection = document.querySelector('.dealer-cards-container');
const playerCardsSection = document.querySelector('.player-cards-container');
const dealerTotalSpan = document.getElementById('dealer-total');
const playerTotalSpan = document.getElementById('player-total');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const dealButton = document.getElementById('deal-button');

const dealerNewCardSection = document.querySelector('.dealer-new-cards');

let currentChip = 0;
let playerTotalChips = 500;
let selectedChip;

let dealerTotal = 0;
let playerTotal = 0;

let dealerCard1;
let dealerCard2;
let dealerCard1Value;   //ParsedInt of dealerCard
let dealerCard2Value;   //ParsedInt of dealerCard
let newDealerCard = 0;

let playerCard1;
let playerCard2;
let playerCard1Value;   //ParsedInt of playerCard
let playerCard2Value;   //ParsedInt of playerCard
let newPlayerCard = 0;

let shuffledArrDealer;
let shuffledArrPlayer;

let timer;

const getChipsWagered = () => {
    chips.forEach(index => {
        index.addEventListener('click', () => {
            selectedChip = parseInt(index.innerHTML);
            currentChip = selectedChip + currentChip;
            playerTotalChips = playerTotalChips - selectedChip;
            chipsWagered.textContent = currentChip;
            totalChips.textContent = playerTotalChips;
            console.log(selectedChip)
            console.log(playerTotalChips)
            console.log(currentChip)
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
//Checks Players Card on 'HIT'
const checkNumPlayer = (str) => {
    if( (str.includes('king')) || (str.includes('queen')) || (str.includes('jack')) )  newPlayerCard = 10
    else if( str.includes('ace') )  newPlayerCard = 1
    else if( str.includes('2') )  newPlayerCard = 2
    else if( str.includes('3') )  newPlayerCard = 3
    else if( str.includes('4') )  newPlayerCard = 4
    else if( str.includes('5') )  newPlayerCard = 5
    else if( str.includes('6') )  newPlayerCard = 6
    else if( str.includes('7') )  newPlayerCard = 7
    else if( str.includes('8') )  newPlayerCard = 8
    else if( str.includes('9') )  newPlayerCard = 9 
}
//Checks Dealers Card on 'STAND'
const checkNumDealer = (str) => {
    if( (str.includes('king')) || (str.includes('queen')) || (str.includes('jack')) )  newDealerCard = 10
    else if( str.includes('ace') )  newDealerCard = 1
    else if( str.includes('2') )  newDealerCard = 2
    else if( str.includes('3') )  newDealerCard = 3
    else if( str.includes('4') )  newDealerCard = 4
    else if( str.includes('5') )  newDealerCard = 5
    else if( str.includes('6') )  newDealerCard = 6
    else if( str.includes('7') )  newDealerCard = 7
    else if( str.includes('8') )  newDealerCard = 8
    else if( str.includes('9') )  newDealerCard = 9 
}
//Shuffles the cardsArrayForDealer
const shuffleCardsDealer = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    shuffledArrDealer = a;

    dealerCard1 = shuffledArrDealer[0]
    dealerCard2 = shuffledArrDealer[1]

    if( dealerCard1.includes('king') || dealerCard1.includes('queen') || dealerCard1.includes('jack') ) dealerCard1Value = 10;
    if( dealerCard1.includes('ace') ) dealerCard1Value = 11 || 1;
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
    if( dealerCard2.includes('ace') ) dealerCard2Value = 11 || 1;
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
        <img src="./assets/photos/cards/${shuffledArrDealer[0]}.png" class="cards">
        <div class="flip-container">
        <div class="card">
            <div class="card-front" id="card">
                <img src="./assets/photos/cards/card_back.png" class="cards">
            </div>
            <div class="card-back">
                <img src="./assets/photos/cards/${shuffledArrDealer[1]}.png" class="cards">
            </div>
        </div>
    `
    dealerTotal = dealerCard1Value + dealerCard2Value;
    // console.log('Dealer has: ' + dealerTotal)
    // dealerTotalSpan.textContent = dealerTotal;

}
// shuffleCardsDealer(cardsArray)

//Shuffles the CardsArray for Player
const shuffleCardsPlayer = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    shuffledArrPlayer = a;

    playerCard1 = shuffledArrPlayer[0]
    playerCard2 = shuffledArrPlayer[1]

    if( playerCard1.includes('king') || playerCard1.includes('queen') || playerCard1.includes('jack') ) playerCard1Value = 10;
    if( playerCard1.includes('ace') ) playerCard1Value = 11 || 1;
    if( playerCard1.includes('2') ) playerCard1Value = 2;
    if( playerCard1.includes('3') ) playerCard1Value = 3;
    if( playerCard1.includes('4') ) playerCard1Value = 4;
    if( playerCard1.includes('5') ) playerCard1Value = 5;
    if( playerCard1.includes('6') ) playerCard1Value = 6;
    if( playerCard1.includes('7') ) playerCard1Value = 7;
    if( playerCard1.includes('8') ) playerCard1Value = 8;
    if( playerCard1.includes('9') ) playerCard1Value = 9;
    // console.log('players 1st card: ' + playerCard1Value)

    if( playerCard2.includes('king') || playerCard2.includes('queen') || playerCard2.includes('jack') ) playerCard2Value = 10;
    if( playerCard2.includes('ace') ) playerCard2Value = 11 || 1;
    if( playerCard2.includes('2') ) playerCard2Value = 2;
    if( playerCard2.includes('3') ) playerCard2Value = 3;
    if( playerCard2.includes('4') ) playerCard2Value = 4;
    if( playerCard2.includes('5') ) playerCard2Value = 5;
    if( playerCard2.includes('6') ) playerCard2Value = 6;
    if( playerCard2.includes('7') ) playerCard2Value = 7;
    if( playerCard2.includes('8') ) playerCard2Value = 8;
    if( playerCard2.includes('9') ) playerCard2Value = 9;
    // console.log('players 2nd card: ' + playerCard2Value)

    playerCardsSection.innerHTML += `
    <img src="./assets/photos/cards/${shuffledArrPlayer[0]}.png" class="cards">
    <img src="./assets/photos/cards/${shuffledArrPlayer[1]}.png" class="cards">
`
    playerTotal = playerCard1Value + playerCard2Value;
    if(playerTotal === 21) {
        alert('Player has BLACKJACK!');
        const cardFront = document.getElementById('card')
        cardFront.style.transform = 'rotateY(180deg)'
        dealerTotalSpan.textContent = dealerTotal;
        playerTotalChips = playerTotalChips + (selectedChip * 2);
        totalChips.textContent = playerTotalChips;
    }
    // console.log('Player has: ' + playerTotal)
    playerTotalSpan.textContent = playerTotal;
}
// shuffleCardsPlayer(cardsArray)


//Create function that gets a card if hit is pressed
hitButton.addEventListener('click', () => {

    let newCardIndex = Math.floor(Math.random() * shuffledArrPlayer.length)

    let hitCard = shuffledArrPlayer[newCardIndex];
    // console.log('Players hit card: ' + hitCard)

    playerCardsSection.innerHTML  += `<img src="./assets/photos/cards/${hitCard}.png" class="cards">`

    //Convert the hitCard to a number
    checkNumPlayer(hitCard)

    // console.log(newPlayerCard)
    playerTotal += newPlayerCard
    // console.log(playerTotal)
    playerTotalSpan.textContent = playerTotal;

    if(playerTotal === 21) {
        alert('BLACKJACK');
        const cardFront = document.getElementById('card')
        cardFront.style.transform = 'rotateY(180deg)'
        dealerTotalSpan.textContent = dealerTotal;
        playerTotalChips += (currentChip * 2);
        totalChips.textContent = playerTotalChips;

        if(dealerTotal !== 21) {
            selectedChip = 0;
            chipsWagered.textContent = selectedChip;
        }
    }

    else if(playerTotal > 21) {
        console.log('You Have Went Over 21')
        alert('You have busted!')
        selectedChip = 0;
        chipsWagered.textContent = selectedChip;
        playerTotalChips = playerTotalChips + (currentChip * 2);
        totalChips.textContent = playerTotalChips;
    }
})

const drawCardDealer = (num) => {
    let targetNum = 17;
    let randomShuffledCard;

    while(num <= targetNum){
        // console.log(num) 
        if(num >= targetNum) {
            break;
        }            
        const randomIndex = Math.floor(Math.random() * shuffledArrDealer.length);
        randomShuffledCard = shuffledArrDealer[randomIndex];
        // console.log(randomShuffledCard)
        checkNumDealer(randomShuffledCard);
        dealerCardsSection.innerHTML  += `
        <img src="./assets/photos/cards/${randomShuffledCard}.png" class="cards">
        `
        // dealerCardsSection.innerHTML += randomShuffledCard;
        num += newDealerCard;
    }
    // console.log('New Dealer Total is: ' + num) 
    dealerTotalSpan.textContent = num;
    dealerTotal = num;
}

//StandButton Logic
standButton.addEventListener('click', () => {

    //Reveal Dealers Second Face Down Card
    const cardFront = document.getElementById('card')
    cardFront.style.transform = 'rotateY(180deg)'
    // console.log('Dealer has total of : ' + dealerTotal)
    dealerTotalSpan.textContent = dealerTotal;

    if(dealerTotal < 17) {
        drawCardDealer(dealerTotal)
    }
    
    console.log('Dealer Total is: ' + dealerTotal)
    console.log('Player Total Is: ' + playerTotal)

    if(dealerTotal === 21) {
        alert('Dealer Has Hit BlackJack!');
        selectedChip = 0;
        chipsWagered.textContent = selectedChip;
    }
    else if (dealerTotal > 21) {
        console.log('Dealer Lost')
        selectedChip = 0;
        chipsWagered.textContent = selectedChip;
        playerTotalChips = playerTotalChips + (currentChip * 2);
        totalChips.textContent = playerTotalChips;
    } 
    else if ( playerTotal > dealerTotal) {
        console.log('Player Won!!')
        playerTotalChips = playerTotalChips + (currentChip * 2);
        selectedChip = 0;
        totalChips.textContent = playerTotalChips;
        chipsWagered.textContent = selectedChip
    }
    else if(dealerTotal === playerTotal) {
        console.log('TIE')
        selectedChip = 0;
        chipsWagered.textContent = selectedChip;
        playerTotalChips = playerTotalChips + (currentChip * 2);
        totalChips.textContent = playerTotalChips;
    }
    else if(dealerTotal > playerTotal && dealerTotal <= 21 ){
        console.log('Dealer Won!');
        currentChip = 0;
        chipsWagered.textContent = selectedChip;
    }
})

startButton.addEventListener('click', () => {
    if(currentChip !== 0) {
        restart();
        shuffleCardsDealer(cardsArray)
        shuffleCardsPlayer(cardsArray)
    } else {
        alert('Place A Bet')
    }
})

restartButton.addEventListener('click', () => {
    dealerCardsSection.innerHTML = '';
    playerCardsSection.innerHTML = '';
    dealerTotalSpan.innerHTML = '';
    playerTotalSpan.innerHTML = '';
})

const restart = () => {
    dealerCardsSection.innerHTML = '';
    playerCardsSection.innerHTML = '';
    dealerTotalSpan.innerHTML = '';
    playerTotalSpan.innerHTML = '';
    dealerTotal = 0;
    playerTotal = 0;
}
