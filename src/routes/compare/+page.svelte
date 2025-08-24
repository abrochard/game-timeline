<script>
 import Games from '$lib/games.json';
 import Game from '$lib/Game.svelte';

 let total = 25;
 let games = [];

 function start() {
   games = structuredClone(Games.toSorted((_) => {
     return Math.random() - .5;
   }).slice(0, total));
   pickNext();
 }

 function pickNext() {
   games.sort(() => {
     return Math.random() - .5;
   });
   games = games;
 }

 function select(side) {
   return () => {
     if (side == 'left') {
       games.splice(1, 1);
     } else {
       games.splice(0, 1);
     }
     games = games;
     pickNext();
   }
 }

</script>

<style>
 h3, h4 {
   text-align: center;
 }

 .flex {
   display: flex;
   width: 100%;
   justify-content: center;
   gap: 10px;
 }

 .card {
   border: 1px solid black;
   border-radius: 5px;
   padding: 20px;
   cursor: pointer;
   box-shadow: #363333 1px 1px 0 0;
 }

 .cursor-default {
   cursor: default;
 }

 input[type=range] {
   width: 500px;
 }

 input[type=button] {
   font-size: 20px;
   padding: 5px;
 }
</style>

<div>
  <div>
    {#if games.length >= 2}
      <h3>Remaining: {games.length}</h3>
      <div class="flex">
        <div class="card" on:click="{select('left')}">
          <Game game="{games[0]}"/>
        </div>
        <div class="card" on:click="{select('right')}">
          <Game game="{games[1]}"/>
        </div>
      </div>
    {:else if games.length == 1}
      <h3>Final game:</h3>
      <div class="flex">
        <div class="card cursor-default">
          <Game game="{games[0]}"/>
        </div>
      </div>
    {:else}
      <h3>Games pool: {total}</h3>
      <div class="flex">
        <input type="range" id="total" name="total" min="2" max="{Games.length}" bind:value="{total}" />
        <input type="button" value="Go" on:click="{start}" />
      </div>
    {/if}
  </div>
</div>
