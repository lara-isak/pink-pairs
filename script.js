/* Game functionality:
  - create library of images
  - assign each image to one of the squares
  - click on the first square
  - clicked square gets saved to firstCard variable
  - click on the second square
  - clicked square gets saved to the secondCard variable
  - div image changes to one of the images from the library
  - if both images are the same, keep them visible
  - else change the background back to the default one
  - when all images are matched the game is over
  - on game restart images are randomly assigned to each of the squares 
*/

// create library of images
var images = [
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/dita_120x120.jpg?raw=true',
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/elsa1_120x120.jpg?raw=true',
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/olaf1_120x120.jpg?raw=true',
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/rihanna1_120x120.jpg?raw=true',
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/taylor1_120x120.jpg?raw=true',
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/torta1_120x120.jpg?raw=true',
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/dita_120x120.jpg?raw=true',
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/elsa1_120x120.jpg?raw=true',
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/olaf1_120x120.jpg?raw=true',
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/rihanna1_120x120.jpg?raw=true',
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/taylor1_120x120.jpg?raw=true',
  'https://github.com/lara-isak/dita-memory-game/blob/main/img/torta1_120x120.jpg?raw=true',
];

var card = document.querySelectorAll(".card");
var cardsFrame = document.querySelector("main");
var firstCard;
var secondCard;
var clickCount = 0;
var match = 0;


// assigning images to the squares
function addImages() {
  // loop through the divs which represent cards
  for(var i = 0; i < card.length; i++) {
    
    // create a random number between 0 - 11
    var rand = Math.floor(Math.random() * (images.length-1));

    /* 
      - add an image element to each card div
      - image src will be one of the images from images array
      - rand is used to randomize index of an image from array
      - innerHTML method can be used in this case because div element doesn't have any prior children
      - if it did have, the innerHTML() method would replace all prior children with the new child    below, img element
      - if we just need to insert new element(s) without eplacing the existing ones, we can use 
      .insertAdjacentHTML() method
     */
    card[i].innerHTML = "<img src='" + images[rand] + "' alt='img' class='hidden'>";

    // after an image has been added to the card div, we're removing that image from the images field so we don't have images repeating more than 2 times
    images.splice(rand, 1);
  } 
}

addImages();

cardsFrame.addEventListener("click", gameLogic);


function gameLogic(e) {
  // targets only cards and not the main div itself
  if(e.target.classList.contains("card")) {
    e.target.firstChild.classList.remove('hidden');

    if(clickCount === 0) {
      firstCard = e.target;
      clickCount++;
    }

    else {
      secondCard = e.target;
      clickCount--;

      if(firstCard.firstChild.src !== secondCard.firstChild.src) {
        // unable to click cards while the setTimeout() function is being executed
        cardsFrame.removeEventListener("click", gameLogic);
        // we need setTimeout() function here because otherwise the below lines of code are executing so fast that I'm not able to even see the image for the second card
        setTimeout( () => {
          firstCard.firstChild.classList.add("hidden");
          secondCard.firstChild.classList.add("hidden");
          cardsFrame.addEventListener("click", gameLogic);  
        }, 800);      
      }

      else {
        // if our images match, update the match count
        match++;
      }

      if(match === 6) {
        // game is done when all 6 images are matched
         console.log("You won!"); 
      }
    }
  }
}



