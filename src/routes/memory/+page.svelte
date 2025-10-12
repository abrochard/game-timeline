<script>
 import Games from '$lib/games.json';
 import Game from '$lib/Game.svelte';
 import { onMount } from 'svelte';
 import { Shuffle } from '$lib/sort.js';

 const Total = 8;

 // Game state variables
 let games = [];
 let cards = [];
 let flippedCards = [];
 let matchedPairs = 0;
 let moves = 0;
 let isChecking = false; // Prevents clicking while a pair is being evaluated
 let isGameOver = false;

 /**
  * Initializes or resets the game board.
  */
 function initializeGame() {
   // Create pairs from a random subset of games
   games = structuredClone(Shuffle(Games).slice(0, Total));

   // Create the card objects for the game board
   cards = Shuffle([...games, ...games]).map((game, index) => ({
     id: index,
     game: game,
     isFlipped: false,
     isMatched: false,
   }));

   // Reset game state
   flippedCards = [];
   matchedPairs = 0;
   moves = 0;
   isChecking = false;
   isGameOver = false;
 }

 /**
  * Handles the logic when a card is clicked.
  * @param {object} clickedCard - The card object that was clicked.
  */
 function handleCardClick(clickedCard) {
   // Ignore clicks if a check is in progress, if the card is already flipped, or if the game is over
   if (isChecking || clickedCard.isFlipped || isGameOver) {
     return;
   }

   // Flip the card
   clickedCard.isFlipped = true;

   cards = cards;

   flippedCards = [...flippedCards, clickedCard];

   // If two cards are flipped, check for a match
   if (flippedCards.length === 2) {
     moves++;
     isChecking = true;
     checkForMatch();
   }
 }

 /**
  * Checks if the two currently flipped cards are a match.
  */
 function checkForMatch() {
   const [card1, card2] = flippedCards;

   if (card1.game.slug === card2.game.slug) {
     // It's a match!
     card1.isMatched = true;
     card2.isMatched = true;
     matchedPairs++;
     flippedCards = [];
     isChecking = false;

     // Check if the game is won
     if (matchedPairs === Total) {
       isGameOver = true;
     }
   } else {
     // Not a match, flip them back after a short delay
     setTimeout(() => {
       card1.isFlipped = false;
       card2.isFlipped = false;

       cards = cards;

       flippedCards = [];
       isChecking = false;
     }, 1000);
   }
 }

 // Initialize the game when the component is first mounted
 onMount(initializeGame);
</script>

<div class="game-container">
  <h1>Memory Game</h1>

  <div class="stats">
    <span>Moves: <strong>{moves}</strong></span>
    <span>Matches: <strong>{matchedPairs} / {Total}</strong></span>
  </div>

  <div class="game-board">
    {#each cards as card (card.id)}
      <div
        class="card"
        class:flipped={card.isFlipped}
        class:matched={card.isMatched}
        on:click={() => handleCardClick(card)}
        role="button"
        tabindex="0"
        aria-label="Memory card"
        >
        <div class="card-face card-front">
          <img src="covers/cover_big/{card.game.slug}.jpg" alt="{card.game.slug}" />
        </div>
        <div class="card-face card-back">
        </div>
      </div>
    {/each}
  </div>

  {#if isGameOver}
    <div class="game-over">
      <h2>You Win! 🎉</h2>
      <p>You found all the pairs in {moves} moves.</p>
      <button on:click={initializeGame}>Play Again</button>
    </div>
  {/if}

  {#if !isGameOver}
    <button class="reset-button" on:click={initializeGame}>Reset Game</button>
  {/if}
</div>

<style>
 .game-container {
   display: flex;
   flex-direction: column;
   align-items: center;
   font-family: sans-serif;
   color: #333;
 }

 .stats {
   display: flex;
   justify-content: space-around;
   width: 320px;
   margin-bottom: 20px;
   font-size: 1.2rem;
 }

 .game-board {
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 10px;
   width: 528px;
   height: 704px;
   perspective: 1000px; /* For 3D effect */
 }

 .card {
   width: 100%;
   height: 100%;
   position: relative;
   cursor: pointer;
   transform-style: preserve-3d;
   transition: transform 0.6s;
   user-select: none;
   border-radius: 8px;
 }

 .card.flipped {
   transform: rotateY(180deg);
 }

 .card.matched {
   /* opacity: 0.5; */
   cursor: default;
 }

 .card-face {
   position: absolute;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 2.5rem;
   backface-visibility: hidden; /* Hides the back of the element */
   border-radius: 8px;
   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
 }

 .card-back {
   background-color: #4a90e2;
   color: white;
   font-size: 3rem;
 }

 .card-front {
   background-color: #f5f5f5;
   color: #333;
   transform: rotateY(180deg); /* Pre-rotated to be visible after flip */
 }

 .card-front img {
   width: 90%;
   height: 90%;
   object-fit: cover;
   border-radius: 5px;
 }

 .game-over {
   text-align: center;
   margin-top: 20px;
   padding: 20px;
   border-radius: 8px;
   background-color: #e8f5e9;
   border: 1px solid #a5d6a7;
 }

 button {
   margin-top: 15px;
   padding: 10px 20px;
   font-size: 1rem;
   font-weight: bold;
   color: white;
   background-color: #4CAF50;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   transition: background-color 0.3s;
 }

 button:hover {
   background-color: #45a049;
 }

 .reset-button {
   background-color: #f44336;
 }

 .reset-button:hover {
   background-color: #d32f2f;
 }
</style>
