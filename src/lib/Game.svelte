<script>
 export let game;

 if (!game.slug) {
   console.log(game);
 }

 const placeholder = 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png';
</script>

<style>
 .game {
   display: flex;
   flex-direction: column;
   background-color: white;
   padding: 10px 0px 10px 0px;
   border-radius: 5px;
   align-items: center;
   width: 100%;
   row-gap: 5px;
 }
 .header {
   display: flex;
   flex-direction: column;
   gap: 5px;
   max-width: 264px;
   width: 100%;
   align-items: flex-start;
 }
 .title {
   font-size: 26px;
 }
 .support {
   display: flex;
 }
 .support div {
   background-color: #bfcbd1;
   border-radius: 10px;
   padding: 5px;
 }
 img {
   max-width: 100%;
   border-radius: 3px;
 }

</style>

<div class="game">
  <div class="header">
    <div class="title">{game.title}</div>
    <div>
      <span>{game.date}</span>
      {#if game.completed}
        <span>✓</span>
      {/if}
    </div>
    <div class="support">
      {#each game.support as support}
        <div>{support}</div>
      {/each}
    </div>
  </div>
  <img src={game.slug ? `covers/cover_big/${game.slug}.jpg` : placeholder} alt="{game.slug}"
       loading="lazy" width="264" height="352"/>
</div>
