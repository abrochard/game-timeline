<script>
 import GamesJSON from '$lib/games.json';
 import Game from '$lib/Game.svelte';
 import ShuffleIcon from '$lib/ShuffleIcon.svelte';
 import {
   Shuffle,
   SortAlphaDesc,
   SortAlphaAsc,
   SortPlayedDateAsc,
   SortPlayedDateDesc
 } from '$lib/sort.js';

 const narrow = window.screen.width < 700;

 let games = GamesJSON.sort(SortPlayedDateAsc);

 function shuffle() {
   games = Shuffle(GamesJSON);
   window.scrollTo(0, 0);
 }
</script>

<style>
 :global(body) {
   margin: 0;
   position: relative;
   background-color: lightblue;
   font-family: sans-serif;
 }

 .timeline-line {
   border: 2px solid white;
   height: 100%;
   position: absolute;
   left: calc(50%);
 }

 .left {
   left: 10%;
 }

 .center {
   left: calc(50%);
 }

 .timeline-row {
   display: flex;
   padding-top: 10px;
   margin-bottom: 5px;
 }

 .item {
   width: 300px;
 }
 .wide-item {
   width: 75% !important;
 }

 .line {
   flex-basis: 10%;
   display: flex;
   flex-direction: column;
 }

 .dot {
   position: relative;
   top: 20%;
   border: 2px solid white;
 }

 .dot::after {
   z-index: 5;
   border-radius: 50px;
   background: white;
   width: 14px;
   height: 14px;
   content: '';
   position: absolute;
   right: -10px;
   top: -6px;
 }
 .dot-left::after {
   left: -7px;
 }

 .flex {
   display: flex;
   width: 50%;
 }

 .button {
   z-index: 10;
   position: fixed;
   left: 0;
   bottom: 0;
   border-radius: 50px;
   background: white;
   color: black;
   width: 40px;
   height: 40px;
   margin: 15px;
   padding: 7px;
   box-shadow: 2px 2px 14px 2px rgba(0,0,0,0.75)
 }

</style>

<div>
  <div class="button" on:click="{shuffle}">
    <ShuffleIcon/>
  </div>

  <div class="timeline-line {narrow ? 'left' : 'center'}"></div>
  {#each games as game, i}
    <div class="timeline-row">
      {#if narrow}
        <div style="width: 10%;"></div>
        <div class="line"><div class="dot dot-left"></div></div>
        <div class="item wide-item">
          <Game game="{game}"/>
        </div>
      {:else}
        <div class="flex" style="justify-content: flex-end;">
          {#if i % 2 == 1}
            <div class="item">
              <Game game="{game}"/>
            </div>
            <div class="line"><div class="dot"></div></div>
          {/if}
        </div>
        <div class="flex">
          {#if i % 2 == 0}
            <div class="line"><div class="dot dot-left"></div></div>
            <div class="item">
              <Game game="{game}"/>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {/each}
</div>
