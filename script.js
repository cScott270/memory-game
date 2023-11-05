const gameContainer = document.getElementById("game");
const button = document.querySelector("button");
const reset = document.querySelector('.reset');
const score = document.querySelector('#score');
const hs = document.querySelector('#hs');
let card1 = null;
let card2 = null;
let noClick = false;
let count = 0;
let match = 0;

const highscore = JSON.parse(localStorage.getItem('highscore'))
if (highscore) {
  hs.innerText = `best score: ${highscore}`;
} else {
  hs.innerText = `best score: N/A`;
}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

button.addEventListener('click', function(e) {
  e.target.style.visibility = 'hidden';
  const game = document.querySelector('#game')
  game.style.visibility = 'visible';
  reset.style.visibility = 'visible';
});

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClick) return;
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target.classList['value']);
  let currentCard = event.target
  currentCard.style.backgroundColor = currentCard.classList['value'];
  if (!currentCard.classList.contains('flipped')){
    count++
  }
  
  if (!card1 || !card2) {
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    if (currentCard === card1) {
      card2 = null
    } else {
      card2 = currentCard
    }
    }
    score.innerText = `score: ${count}`;

  if (card1 && card2) {
    noClick = true;
    gif1 = card1.className;
    gif2 = card2.className;

    if (gif1 === gif2) {
      // console.log('good');
      // console.log(card1, card2); 
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      noClick = false;
      match++;
      if (match === COLORS.length/2 && count < (highscore || 1000)) {
        localStorage.setItem('highscore', JSON.stringify(count));
        hs.innerText = `best score ${count}`
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1 = null;
        card2 = null;
        noClick = false;
      }, 1000);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
reset.addEventListener('click', function() {
  game.innerHTML = '';
  shuffledColors = shuffle(COLORS);
  game.style.visibility = 'hidden';
  createDivsForColors(shuffledColors);
  button.style.visibility = 'visible';
  reset.style.visibility = 'hidden';
  count = 0;
  match = 0
});