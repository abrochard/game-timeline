<script>
  import { onMount } from 'svelte';

 // The 100 civics questions and answers
 const civicsQuestionsData = [
   { "id": 1, "question": "What is the supreme law of the land?", "answer": ["The Constitution"] },
   { "id": 2, "question": "What does the Constitution do?", "answer": ["Sets up the government", "Defines the government", "Protects basic rights of Americans"] },
   { "id": 3, "question": "The idea of self-government is in the first three words of the Constitution. What are these words?", "answer": ["We the People"] },
   { "id": 4, "question": "What is an amendment?", "answer": ["A change (to the Constitution)", "An addition (to the Constitution)"] },
   { "id": 5, "question": "What do we call the first ten amendments to the Constitution?", "answer": ["The Bill of Rights"] },
   { "id": 6, "question": "What is one right or freedom from the First Amendment?*", "answer": ["Speech", "Religion", "Assembly", "Press", "Petition the government"] },
   { "id": 7, "question": "How many amendments does the Constitution have?", "answer": ["Twenty-seven (27)"] },
   { "id": 8, "question": "What did the Declaration of Independence do?", "answer": ["Announced our independence (from Great Britain)", "Declared our independence (from Great Britain)", "Said that the United States is free (from Great Britain)"] },
   { "id": 9, "question": "What are two rights in the Declaration of Independence?", "answer": ["Life", "Liberty", "Pursuit of happiness"] },
   { "id": 10, "question": "What is freedom of religion?", "answer": ["You can practice any religion, or not practice a religion."] },
   { "id": 11, "question": "What is the economic system in the United States?*", "answer": ["Capitalist economy", "Market economy"] },
   { "id": 12, "question": "What is the “rule of law”?", "answer": ["Everyone must follow the law.", "Leaders must obey the law.", "Government must obey the law.", "No one is above the law."] },
   { "id": 13, "question": "Name one branch or part of the government.*", "answer": ["Congress", "Legislative", "President", "Executive", "The courts", "Judicial"] },
   { "id": 14, "question": "What stops one branch of government from becoming too powerful?", "answer": ["Checks and balances", "Separation of powers"] },
   { "id": 15, "question": "Who is in charge of the executive branch?", "answer": ["The President"] },
   { "id": 16, "question": "Who makes federal laws?", "answer": ["Congress", "Senate and House (of Representatives)", "(U.S. or national) legislature"] },
   { "id": 17, "question": "What are the two parts of the U.S. Congress?*", "answer": ["The Senate and House (of Representatives)"] },
   { "id": 18, "question": "How many U.S. Senators are there?", "answer": ["One hundred (100)"] },
   { "id": 19, "question": "We elect a U.S. Senator for how many years?", "answer": ["Six (6)"] },
   { "id": 20, "question": "Who is one of your state’s U.S. Senators now?*", "answer": ["Charles E. Schumer", "Kirsten E. Gillibrand"] },
   { "id": 21, "question": "The House of Representatives has how many voting members?", "answer": ["Four hundred thirty-five (435)"] },
   { "id": 22, "question": "We elect a U.S. Representative for how many years?", "answer": ["Two (2)"] },
   { "id": 23, "question": "Name your U.S. Representative.", "answer": ["Daniel S. Goldman"] },
   { "id": 24, "question": "Who does a U.S. Senator represent?", "answer": ["All people of the state"] },
   { "id": 25, "question": "Why do some states have more Representatives than other states?", "answer": ["(Because of) the state’s population", "(Because) they have more people", "(Because) some states have more people"] },
   { "id": 26, "question": "We elect a President for how many years?", "answer": ["Four (4)"] },
   { "id": 27, "question": "In what month do we vote for President?*", "answer": ["November"] },
   { "id": 28, "question": "What is the name of the President of the United States now?*", "answer": ["Donald Trump"] },
   { "id": 29, "question": "What is the name of the Vice President of the United States now?", "answer": ["JD Vance"] },
   { "id": 30, "question": "If the President can no longer serve, who becomes President?", "answer": ["The Vice President"] },
   { "id": 31, "question": "If both the President and the Vice President can no longer serve, who becomes President?", "answer": ["The Speaker of the House"] },
   { "id": 32, "question": "Who is the Commander in Chief of the military?", "answer": ["The President"] },
   { "id": 33, "question": "Who signs bills to become laws?", "answer": ["The President"] },
   { "id": 34, "question": "Who vetoes bills?", "answer": ["The President"] },
   { "id": 35, "question": "What does the President’s Cabinet do?", "answer": ["Advises the President"] },
   { "id": 36, "question": "What are two Cabinet-level positions?", "answer": ["Secretary of Agriculture", "Secretary of Commerce", "Secretary of Defense", "Secretary of Education", "Secretary of Energy", "Secretary of Health and Human Services", "Secretary of Homeland Security", "Secretary of Housing and Urban Development", "Secretary of the Interior", "Secretary of Labor", "Secretary of State", "Secretary of Transportation", "Secretary of the Treasury", "Secretary of Veterans Affairs", "Attorney General", "Vice President"] },
   { "id": 37, "question": "What does the judicial branch do?", "answer": ["Reviews laws", "Explains laws", "Resolves disputes (disagreements)", "Decides if a law goes against the Constitution"] },
   { "id": 38, "question": "What is the highest court in the United States?", "answer": ["The Supreme Court"] },
   { "id": 39, "question": "How many justices are on the Supreme Court?", "answer": ["9"] },
   { "id": 40, "question": "Who is the Chief Justice of the United States now?", "answer": ["John Roberts"] },
   { "id": 41, "question": "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?", "answer": ["To print money", "To declare war", "To create an army", "To make treaties"] },
   { "id": 42, "question": "Under our Constitution, some powers belong to the states. What is one power of the states?", "answer": ["Provide schooling and education", "Provide protection (police)", "Provide safety (fire departments)", "Give a driver’s license", "Approve zoning and land use"] },
   { "id": 43, "question": "Who is the Governor of your state now?", "answer": ["Kathy Hochul"] },
   { "id": 44, "question": "What is the capital of your state?*", "answer": ["Albany"] },
   { "id": 45, "question": "What are the two major political parties in the United States?*", "answer": ["Democratic and Republican"] },
   { "id": 46, "question": "What is the political party of the President now?", "answer": ["Republican"] },
   { "id": 47, "question": "What is the name of the Speaker of the House of Representatives now?", "answer": ["Mike Johnson"] },
   { "id": 48, "question": "There are four amendments to the Constitution about who can vote. Describe one of them.", "answer": ["Citizens eighteen (18) and older (can vote).", "You don’t have to pay (a poll tax) to vote.", "Any citizen can vote. (Women and men can vote.)", "A male citizen of any race (can vote)."] },
   { "id": 49, "question": "What is one responsibility that is only for United States citizens?*", "answer": ["Serve on a jury", "Vote in a federal election"] },
   { "id": 50, "question": "Name one right only for United States citizens.", "answer": ["Vote in a federal election", "Run for federal office"] },
   { "id": 51, "question": "What are two rights of everyone living in the United States?", "answer": ["Freedom of expression", "Freedom of speech", "Freedom of assembly", "Freedom to petition the government", "Freedom of religion", "The right to bear arms"] },
   { "id": 52, "question": "What do we show loyalty to when we say the Pledge of Allegiance?", "answer": ["The United States", "The flag"] },
   { "id": 53, "question": "What is one promise you make when you become a United States citizen?", "answer": ["Give up loyalty to other countries", "Defend the Constitution and laws of the United States", "Obey the laws of the United States", "Serve in the U.S. military (if needed)", "Serve (do important work for) the nation (if needed)", "Be loyal to the United States"] },
   { "id": 54, "question": "How old do citizens have to be to vote for President?*", "answer": ["Eighteen (18) and older"] },
   { "id": 55, "question": "What are two ways that Americans can participate in their democracy?", "answer": ["Vote", "Join a political party", "Help with a campaign", "Join a civic group", "Join a community group", "Give an elected official your opinion on an issue", "Call Senators and Representatives", "Publicly support or oppose an issue or policy", "Run for office", "Write to a newspaper"] },
   { "id": 56, "question": "When is the last day you can send in federal income tax forms?*", "answer": ["April 15"] },
   { "id": 57, "question": "When must all men register for the Selective Service?", "answer": ["At age eighteen (18)", "Between eighteen (18) and twenty-six (26)"] },
   { "id": 58, "question": "What is one reason colonists came to America?", "answer": ["Freedom", "Political liberty", "Religious freedom", "Economic opportunity", "Practice their religion", "Escape persecution"] },
   { "id": 59, "question": "Who lived in America before the Europeans arrived?", "answer": ["American Indians", "Native Americans"] },
   { "id": 60, "question": "What group of people was taken to America and sold as slaves?", "answer": ["Africans", "People from Africa"] },
   { "id": 61, "question": "Why did the colonists fight the British?", "answer": ["Because of high taxes (taxation without representation)", "Because the British army stayed in their houses (boarding, quartering)", "Because they didn’t have self-government"] },
   { "id": 62, "question": "Who wrote the Declaration of Independence?", "answer": ["(Thomas) Jefferson"] },
   { "id": 63, "question": "When was the Declaration of Independence adopted?", "answer": ["July 4, 1776"] },
   { "id": 64, "question": "There were 13 original states. Name three.", "answer": ["New Hampshire", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Delaware", "Maryland", "Virginia", "North Carolina", "South Carolina", "Georgia"] },
   { "id": 65, "question": "What happened at the Constitutional Convention?", "answer": ["The Constitution was written.", "The Founding Fathers wrote the Constitution."] },
   { "id": 66, "question": "When was the Constitution written?", "answer": ["1787"] },
   { "id": 67, "question": "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.", "answer": ["(James) Madison", "(Alexander) Hamilton", "(John) Jay", "Publius"] },
   { "id": 68, "question": "What is one thing Benjamin Franklin is famous for?", "answer": ["U.S. diplomat", "Oldest member of the Constitutional Convention", "First Postmaster General of the United States", "Writer of “Poor Richard’s Almanac”", "Started the first free libraries"] },
   { "id": 69, "question": "Who is the “Father of Our Country”?", "answer": ["(George) Washington"] },
   { "id": 70, "question": "Who was the first President?*", "answer": ["(George) Washington"] },
   { "id": 71, "question": "What territory did the United States buy from France in 1803?", "answer": ["The Louisiana Territory", "Louisiana"] },
   { "id": 72, "question": "Name one war fought by the United States in the 1800s.", "answer": ["War of 1812", "Mexican-American War", "Civil War", "Spanish-American War"] },
   { "id": 73, "question": "Name the U.S. war between the North and the South.", "answer": ["The Civil War", "The War between the States"] },
   { "id": 74, "question": "Name one problem that led to the Civil War.", "answer": ["Slavery", "Economic reasons", "States’ rights"] },
   { "id": 75, "question": "What was one important thing that Abraham Lincoln did?*", "answer": ["Freed the slaves (Emancipation Proclamation)", "Saved (or preserved) the Union", "Led the United States during the Civil War"] },
   { "id": 76, "question": "What did the Emancipation Proclamation do?", "answer": ["Freed the slaves", "Freed slaves in the Confederacy", "Freed slaves in the Confederate states", "Freed slaves in most Southern states"] },
   { "id": 77, "question": "What did Susan B. Anthony do?", "answer": ["Fought for women’s rights", "Fought for civil rights"] },
   { "id": 78, "question": "Name one war fought by the United States in the 1900s.*", "answer": ["World War I", "World War II", "Korean War", "Vietnam War", "(Persian) Gulf War"] },
   { "id": 79, "question": "Who was President during World War I?", "answer": ["(Woodrow) Wilson"] },
   { "id": 80, "question": "Who was President during the Great Depression and World War II?", "answer": ["(Franklin) Roosevelt"] },
   { "id": 81, "question": "Who did the United States fight in World War II?", "answer": ["Japan, Germany, and Italy"] },
   { "id": 82, "question": "Before he was President, Eisenhower was a general. What war was he in?", "answer": ["World War II"] },
   { "id": 83, "question": "During the Cold War, what was the main concern of the United States?", "answer": ["Communism"] },
   { "id": 84, "question": "What movement tried to end racial discrimination?", "answer": ["Civil rights (movement)"] },
   { "id": 85, "question": "What did Martin Luther King, Jr. do?*", "answer": ["Fought for civil rights", "Worked for equality for all Americans"] },
   { "id": 86, "question": "What major event happened on September 11, 2001, in the United States?", "answer": ["Terrorists attacked the United States."] },
   { "id": 87, "question": "Name one American Indian tribe in the United States.", "answer": ["Cherokee", "Navajo", "Sioux", "Chippewa", "Choctaw", "Pueblo", "Apache", "Iroquois", "Creek", "Blackfeet", "Seminole", "Cheyenne", "Arawak", "Shawnee", "Mohegan", "Huron", "Oneida", "Lakota", "Crow", "Teton", "Hopi", "Inuit"] },
   { "id": 88, "question": "Name one of the two longest rivers in the United States.", "answer": ["Missouri (River)", "Mississippi (River)"] },
   { "id": 89, "question": "What ocean is on the West Coast of the United States?", "answer": ["Pacific (Ocean)"] },
   { "id": 90, "question": "What ocean is on the East Coast of the United States?", "answer": ["Atlantic (Ocean)"] },
   { "id": 91, "question": "Name one U.S. territory.", "answer": ["Puerto Rico", "U.S. Virgin Islands", "American Samoa", "Northern Mariana Islands", "Guam"] },
   { "id": 92, "question": "Name one state that borders Canada.", "answer": ["Maine", "New Hampshire", "Vermont", "New York", "Pennsylvania", "Ohio", "Michigan", "Minnesota", "North Dakota", "Montana", "Idaho", "Washington", "Alaska"] },
   { "id": 93, "question": "Name one state that borders Mexico.", "answer": ["California", "Arizona", "New Mexico", "Texas"] },
   { "id": 94, "question": "What is the capital of the United States?*", "answer": ["Washington, D.C."] },
   { "id": 95, "question": "Where is the Statue of Liberty?*", "answer": ["New York (Harbor)", "Liberty Island", "Also acceptable: New Jersey, near New York City, on the Hudson (River)"] },
   { "id": 96, "question": "Why does the flag have 13 stripes?", "answer": ["Because there were 13 original colonies", "Because the stripes represent the original colonies"] },
   { "id": 97, "question": "Why does the flag have 50 stars?*", "answer": ["Because there is one star for each state", "Because each star represents a state", "Because there are 50 states"] },
   { "id": 98, "question": "What is the name of the national anthem?", "answer": ["The Star-Spangled Banner"] },
   { "id": 99, "question": "When do we celebrate Independence Day?*", "answer": ["July 4"] },
   { "id": 100, "question": "Name two national U.S. holidays.", "answer": ["New Year’s Day", "Martin Luther King, Jr. Day", "Presidents’ Day", "Memorial Day", "Juneteenth", "Independence Day", "Labor Day", "Columbus Day", "Veterans Day", "Thanksgiving", "Christmas"] }
 ];


  // Use a reactive store/variable to maintain the master list of questions and their status
  let masterQuestions = civicsQuestionsData;

  let shuffledQuestions = [];
  let currentCardIndex = 0;
  let isFlipped = false;
  let correctCount = 0;

  $: currentCard = shuffledQuestions[currentCardIndex];
  $: totalRemaining = shuffledQuestions.length;

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const calculateCorrectCount = () => {
      correctCount = masterQuestions.filter(q => q.status === 'correct').length;
  }

  const shuffleAndRestart = (includeCorrect = false) => {
    isFlipped = false;
    currentCardIndex = 0;

    let questionsToShuffle = includeCorrect
        ? masterQuestions // Review All: includes all 100 questions
        : masterQuestions.filter(q => q.status !== 'correct'); // Normal Restart: removes 'correct' cards

    shuffledQuestions = shuffle(questionsToShuffle);

    if (shuffledQuestions.length === 0) {
        alert("🎉 You've correctly answered all questions! Click 'Review All' to start over.");
    }
  };

  const flipCard = () => {
    isFlipped = !isFlipped;
  };

  const nextCard = () => {
    if (currentCardIndex < shuffledQuestions.length - 1) {
      currentCardIndex++;
      isFlipped = false;
    } else {
        // Automatically restart when the end is reached
        shuffleAndRestart(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      isFlipped = false;
    }
  };

  const markCorrect = () => {
    if (!currentCard) return;

    // Find the question in the master list and update its status
    const questionIndex = masterQuestions.findIndex(q => q.id === currentCard.id);
    if (questionIndex !== -1) {
        masterQuestions[questionIndex].status = 'correct';
        masterQuestions = masterQuestions; // Reassign to trigger Svelte reactivity
    }

    calculateCorrectCount();
    // Move to the next card after marking
    nextCard();
  }

  const markIncorrect = () => {
      if (!currentCard) return;

      // Mark as unanswered so it remains in the queue
      const questionIndex = masterQuestions.findIndex(q => q.id === currentCard.id);
      if (questionIndex !== -1) {
          masterQuestions[questionIndex].status = 'unanswered';
          masterQuestions = masterQuestions; // Reassign to trigger Svelte reactivity
      }
      calculateCorrectCount();
      nextCard();
  }

  // Initialize the quiz when the component mounts
  onMount(() => {
    // Ensure all 100 questions are initialized with 'unanswered' status
    masterQuestions = civicsQuestionsData.map(q => ({ ...q, status: 'unanswered' }));
    shuffleAndRestart();
  });
</script>

<main>
  <h1>U.S. Civics Flashcards</h1>
  <p>Correctly answered: {correctCount} / {masterQuestions.length}</p>

  {#if totalRemaining > 0}
    <div class="card-container" on:click={flipCard} role="button" tabindex="0">
      <div class="card-content" class:flipped={isFlipped}>
        <div class="card-face front">
          <p class="question-number">Question {currentCard.id}</p>
          <p>{currentCard.question}</p>
          <p class="status-indicator" class:correct={currentCard.status === 'correct'}>
              {currentCard.status === 'correct' ? '✅ Correctly Answered' : 'Click to Reveal Answer'}
          </p>
        </div>
        <div class="card-face back">
          <h3>Answer:</h3>
          <ul>
            {#each currentCard.answer as ans}
              <li>{ans}</li>
            {/each}
        </div>
      </div>
    </div>

    <div class="progress">
      Card {currentCardIndex + 1} of {totalRemaining} (Remaining Questions)
    </div>

    <div class="controls feedback-controls">
      <button on:click|stopPropagation={markIncorrect} class="incorrect-button">
        Mark Incorrect
      </button>
      <button on:click|stopPropagation={markCorrect} class="correct-button">
        Mark Correct
      </button>
    </div>

    <div class="controls navigation-controls">
        <button on:click|stopPropagation={prevCard} disabled={currentCardIndex === 0}>
            &larr; Previous
        </button>
        <button on:click|stopPropagation={flipCard} class="flip-button">
            Flip Card
        </button>
        <button on:click|stopPropagation={nextCard} disabled={currentCardIndex === shuffledQuestions.length - 1}>
            Next &rarr;
        </button>
    </div>

    <div class="restart-options">
      <button on:click={() => shuffleAndRestart(false)} class="restart-button">
        Shuffle & Restart (Exclude Correct)
      </button>
      <button on:click={() => shuffleAndRestart(true)} class="review-all-button">
        Review All
      </button>
    </div>

  {:else}
    <div class="finished-message">
        <h2>🎉 All Questions Answered!</h2>
        <p>You have mastered all {masterQuestions.length} questions.</p>
        <button on:click={() => shuffleAndRestart(true)} class="review-all-button">
          Review All Questions
        </button>
    </div>
  {/if}
</main>

<style>
 /* Base Styles (Inherited from original) */
 :global(body) {
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   background-color: #f0f2f5;
   color: #333;
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
   margin: 0;
 }

 main {
   text-align: center;
   background: #fff;
   padding: 2rem;
   border-radius: 12px;
   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
   width: 90%;
   max-width: 600px;
 }

 h1 {
   color: #00529b;
   margin-bottom: 0.5rem;
 }

 /* Card Styles (Inherited from original) */
 .card-container {
   perspective: 1000px;
   min-height: 250px;
   cursor: pointer;
   margin: 2rem 0;
 }

 .card-content {
   position: relative;
   width: 100%;
   height: 100%;
   min-height: 250px;
   transform-style: preserve-3d;
   transition: transform 0.6s;
 }

 .card-content.flipped {
   transform: rotateY(180deg);
 }

 .card-face {
   position: absolute;
   width: 100%;
   height: 100%;
   backface-visibility: hidden;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding: 20px;
   box-sizing: border-box;
   border: 1px solid #ddd;
   border-radius: 8px;
   background-color: #f9f9f9;
 }

 .front {
   font-size: 1.5rem;
 }

 .question-number {
   font-size: 0.9rem;
   color: #777;
   position: absolute;
   top: 15px;
   left: 20px;
 }

 .back {
   transform: rotateY(180deg);
   background-color: #e6f3ff;
   align-items: flex-start;
 }

 .back ul {
   list-style: disc;
   padding-left: 20px;
   margin: 0;
   text-align: left;
 }

 .back h3 {
   margin: 0 0 10px 0;
 }

 .progress {
   margin-bottom: 1rem;
   color: #555;
   font-weight: bold;
 }

 .status-indicator {
   position: absolute;
   bottom: 15px;
   font-size: 0.85rem;
   color: #777;
 }
 .status-indicator.correct {
   color: #28a745;
   font-weight: bold;
 }

 /* Control Styles (Modified) */
 .controls {
   display: flex;
   justify-content: space-between;
   margin-bottom: 1rem;
   gap: 10px; /* Space between button groups */
 }

 .feedback-controls {
   margin-top: 1.5rem;
 }
 .navigation-controls {
   border-top: 1px solid #eee;
   padding-top: 1rem;
 }

 .feedback-controls button {
   flex: 1;
 }

 button {
   padding: 10px 15px;
   border: none;
   border-radius: 5px;
   background-color: #007bff;
   color: white;
   font-size: 0.9rem;
   cursor: pointer;
   transition: background-color 0.2s;
 }

 button:hover:not(:disabled) {
   background-color: #0056b3;
 }

 button:disabled {
   background-color: #cdd2d7;
   cursor: not-allowed;
 }

 .flip-button {
   background-color: #5d5d5d;
 }
 .flip-button:hover {
   background-color: #444;
 }

 .correct-button {
   background-color: #28a745;
 }
 .correct-button:hover {
   background-color: #218838;
 }

 .incorrect-button {
   background-color: #dc3545;
 }
 .incorrect-button:hover {
   background-color: #c82333;
 }

 .restart-options {
   display: flex;
   justify-content: space-around;
   gap: 10px;
   margin-top: 1rem;
 }

 .restart-button, .review-all-button {
   flex: 1;
   background-color: #6c757d;
 }
 .restart-button:hover, .review-all-button:hover {
   background-color: #5a6268;
 }

 .finished-message {
   padding: 30px;
   border: 2px dashed #00529b;
   border-radius: 8px;
 }

</style>
