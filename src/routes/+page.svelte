<script>
 import "../app.css";
  import { Chess } from 'chess.js';
  import { onMount } from 'svelte';
  import pieceMap from '../assets/chess-pieces.js'
  import eggert from "../svg/eggert-2.svg"
  import eggOne from "../images/egg1.jpg"
  import eggTwo from "../images/egg2.jpg"
 let chess = new Chess();
  let board = chess.board();
  let selectedSquare = null;
  let legalMoves = [];
  let avatars = "https://www.cs.ucla.edu/wp-content/uploads/cs/eggert-2.jpg"; 
  let avatar3 = "hello"
  let avatars2 = "https://images.squarespace-cdn.com/content/v1/650b930d49bb6e16dbc86f4e/3b7c1a24-9459-4d47-8fde-5db01ded9ca8/levy-landing-no-bg-2.png";
   let whitePromotionPiece = 'q'; // Default promotion piece for white
  let blackPromotionPiece = 'q'; // Default promotion piece for black
let turn = 0;
let avatarCount = 1;
let moveHistory = [];
let isWhiteClicked =null;
let isBlackClicked = null;
  onMount(() => {
    updateMoveHistory();
    updateBoard();
    
  });


    function setWhitePromotionPiece(piece) {
    whitePromotionPiece = piece;
     switch(whitePromotionPiece) {
  case 'q':
    isWhiteClicked = 0;
    break;
  case 'r':
    isWhiteClicked = 1;
    break;
  case 'b':
    isWhiteClicked = 2;
    break;
    case 'n':
isWhiteClicked = 3;
    break;
}
  }

  function setBlackPromotionPiece(piece) {
    blackPromotionPiece = piece;
    switch(blackPromotionPiece) {
  case 'q':
    isBlackClicked = 0;
    break;
  case 'r':
    isBlackClicked = 1;
    break;
  case 'b':
    isBlackClicked = 2;
    break;
    case 'n':
isBlackClicked = 3;
    break;
}
  }
function updateMoveHistory() {


    moveHistory = chess.history();
    console.log(moveHistory)
}
  function updateBoard() {
    board = chess.board();
  }

  function handleSquareClick(row, col) {
    const notation = getSquareNotation(row, col);
    if (selectedSquare) {
      const moveConfig = { from: selectedSquare, to: notation };
if (chess.get(selectedSquare).type === 'p' && ('87654321'[row] === '1' || '87654321'[row] === '8')) {
    if (turn %2 == 0){
        moveConfig.promotion = whitePromotionPiece;
       
        }

        else {

moveConfig.promotion = blackPromotionPiece;


        }
      }

     try {
      const move = chess.move(moveConfig);
      
      if (move) {
        updateBoard();
        updateMoveHistory();
        selectedSquare = null;
        legalMoves = [];
        turn +=1;
        checkGameOver();
      } }
      
catch (error) {
   

        console.log('Invalid move from', selectedSquare, 'to', notation);
        
        selectedSquare = null;
        legalMoves = [];}
      
    }else {
      selectedSquare = notation;

      if ((chess.get(selectedSquare).color == 'b' && turn %2 == 0) || (chess.get(selectedSquare).color == 'w' && turn %2 != 0 && turn != 0)){
       alert("You can't play the other team's piece, genius");
        console.log(turn)
        selectedSquare = null;
        legalMoves = [];
      }
     
    else {
      legalMoves = chess.moves({ square: notation, verbose: true }).map(m => m.to);
      console.log('Selected square:', selectedSquare);
      console.log('Legal moves:', legalMoves);
      if (legalMoves.length == 0) {

        alert("No legal moves for this piece, pick another");
        legalMoves = [];
        selectedSquare = null;
      }}
    }
  }

  function handleSquareKeydown(event, row, col) {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSquareClick(row, col);
      event.preventDefault();
    }
  }

  function getSquareNotation(row, col) {
    const files = 'abcdefgh';
    return files[col] + (8 - row);
  }

  function checkGameOver() {
    if (chess.isCheckmate()) {
      alert('Checkmate!');
    } else if (chess.isStalemate()) {
      alert('Stalemate!');
    } else if (chess.isInsufficientMaterial()) {
      alert('Insufficient material');
    } else if (chess.isThreefoldRepetition()) {
      alert('Threefold repetition');
    } else if (chess.isDraw()) {
      alert('Draw!');
    } else if (chess.inCheck()) {
      alert('Check!');
    }
  }

  function isHighlighted(row, col) {
    const notation = getSquareNotation(row, col);
    return notation === selectedSquare || legalMoves.includes(notation);
  }

  function getPieceSVG(square) {
    if (square) {
      if (avatarCount %2 != 0){
      return pieceMap[square.type][square.color];}
    
    else {
      if (square.type == 'k' && square.color == 'w') {
return eggOne

      }
      else if (square.type == 'k' && square.color == 'b'){
return eggTwo

      }
      else{
        return pieceMap[square.type][square.color];}
      
    
    
  }
  }return null;}

  function changeAvatar() {
     console.log('Button clicked');
     if (avatarCount %2 == 0) {
avatarCount++;
      avatars = "https://images.squarespace-cdn.com/content/v1/650b930d49bb6e16dbc86f4e/3b7c1a24-9459-4d47-8fde-5db01ded9ca8/levy-landing-no-bg-2.png";
     }
     else {
avatarCount++;
      avatars = "https://www.cs.ucla.edu/wp-content/uploads/cs/eggert-2.jpg";
     }
    
    console.log("New avatar link: ", avatars)
    console.log("check")
    updateBoard();
  }
</script>



<style>
  .board {
    display: grid;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(8, 50px);
  }
  .square {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0;
  }
  .white { background-color: white; }
  .black { background-color: gray; }
  .highlight {
    background-color: yellow !important;
  }
  .legal-move {
    background-color: lightgreen !important;
  }
  .piece img {
    width: 100%;
    height: 100%;
  }
  .promotion-ui {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
  }
  .promotion-ui button {
  background-color: #ffcc00;
  border: 2px solid #990000;
  color: #990000;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.promotion-ui button:hover {
  background-color: #990000;
  color: #ffcc00;
  transform: scale(1.1);
}
.bg {
  width: 100%;
  height: 100vh;
  display: flex;
 
  align-items: center;
  justify-content: center;
  background-size: 300% 300%;
  background-image: linear-gradient(-45deg, yellow 0%,#2D68C4  25%, yellow 51%,#2D68C4 100%);
  -webkit-animation: AnimateBG 5s ease infinite;
          animation: AnimateBG 5s ease infinite;
}
.game {

    display:flex
}
.highlight {
    background-color: green;
  }

@-webkit-keyframes AnimateBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes AnimateBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}


@import url(https://fonts.googleapis.com/css?family=Righteous);

*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  }

html, body {
  height: 100%;
  }
  body {
    text-align: center;
    background-color: hsla(230,40%,50%,1);
    }
  body:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    font-size: 0;
    height: 100%;
    }

h1 {
  display: inline-block;
  color: white;
  font-family: 'Righteous', serif;
  font-size: 12em; 
  text-shadow: .03em .03em 0 hsla(230,40%,50%,1);
  }
  h1:after {
    content: attr(data-shadow);
    position: absolute;
    top: .06em; left: .06em;
    z-index: -1;
    text-shadow: none;
    background-image:
      linear-gradient(
        45deg,
        transparent 45%,
        hsla(48,20%,90%,1) 45%,
        hsla(48,20%,90%,1) 55%,
        transparent 0
        );
    background-size: .05em .05em;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  
    animation: shad-anim 15s linear infinite;
    }

@keyframes shad-anim {
  0% {background-position: 0 0}
  0% {background-position: 100% -100%}
  }
</style>

<div class="bg">
<div class = "left">
<h1 data-shadow='Chess'>Chess</h1>

<div class="avatar">
  <div class="w-24 rounded-full">
    <img src={(avatarCount %2) == 0 ? avatars : avatars2} />
  </div>
</div>
</div>
<label class="flex cursor-pointer gap-2">
</label>







  <div class="promotion-ui">
 

    <h3>Black Promotion</h3>
    <button class:highlight={isBlackClicked == 0 ? true : false} on:click={() => setBlackPromotionPiece('q')}>Queen</button>
    <button class:highlight={isBlackClicked == 1 ? true : false} on:click={() => setBlackPromotionPiece('r')}>Rook</button>
    <button class:highlight={isBlackClicked == 2 ? true : false} on:click={() => setBlackPromotionPiece('b')}>Bishop</button>
    <button class:highlight={isBlackClicked == 3 ? true : false} on:click={() => setBlackPromotionPiece('n')}>Knight</button>


       <h3>White Promotion</h3>
    <button class:highlight={isWhiteClicked == 0 ? true : false} on:click={() => setWhitePromotionPiece('q')}>Queen</button>
    <button  class:highlight={isWhiteClicked == 1 ? true : false} on:click={() => setWhitePromotionPiece('r')}>Rook</button>
    <button  class:highlight={isWhiteClicked == 2 ? true : false} on:click={() => setWhitePromotionPiece('b')}>Bishop</button>
    <button  class:highlight={isWhiteClicked == 3 ? true : false} on:click={() => setWhitePromotionPiece('n')}>Knight</button>
    <label class="swap swap-rotate">
  <!-- this hidden checkbox controls the state -->
  <input type="checkbox" />

  
  <svg on:click={() => changeAvatar()} width="800px" height="800px" viewBox="0 0 1024 1024"class = "swap-on h-10 w-10 fill-current"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M356.9 298.1s-32.2-25.4-62.4-20.5c-30.3 4.9-136.2 51.6-188.3 323.3s724.6 127.3 724.6 127.3 95.4-27.3 80.7-150.8c-14.7-123.5-97.9-275.3-159.7-292s-224.6 56.8-224.6 56.8l-170.3-44.1z" fill="#EAAD6A" /><path d="M761.8 750.4s77.3-18 67.2-126.7-54.9-213.1-72.9-248.9c-17.9-35.8-58.3-97.3-58.3-97.3L643 318l118.8 432.4z" fill="#D89660" /><path d="M527.2 826.8c168.6 5.4 271.3-91.7 256-225.9S668 208.1 527.2 198.5 272.4 525.3 272 647.5c-0.4 178 255.2 179.3 255.2 179.3z" fill="#FFDEB3" /><path d="M783.1 598c-12.8-112-84.4-310.3-189.5-378.6 77.3 88.2 128.5 240.8 139.1 333.8 15.3 134.2-87.4 231.3-256 225.9 0 0-102-0.6-177-45.9 66 89.7 227.4 90.7 227.4 90.7 168.6 5.4 271.3-91.7 256-225.9z" fill="#F4D0A4" /><path d="M928 601.4c0-112.7-89.7-338-207.5-338-16.2 0-32.4 4.5-48.6 13-41.5-53.7-90.9-90.1-144.8-90.1-58.2 0-111.2 42.4-154.5 103.2-22.6-17.3-45.8-26.1-69.1-26.1-117.8 0-207.5 225.3-207.5 338 0 101.9 72.8 158.3 204.8 159.1 36.4 41.2 94.3 66.6 171.9 74.4 0.3 0 0.5 0.1 0.8 0.1h0.3c16.9 1.7 34.5 2.7 53.2 2.7 106.4 0 183.5-27.4 227.7-78.7C866.5 749.6 928 693.9 928 601.4zM280.2 731.6c-75.8-4.4-155.8-32.2-155.8-130.2 0-102 82.9-309.7 179.2-309.7 17.4 0 35.3 7.2 53.4 21.3-49.7 78.9-84.3 180.2-96.2 261.3l-0.6 3.9c-0.6 4.5-1.2 8.9-1.7 13.3l-0.6 6c-0.4 3.9-0.7 7.7-0.9 11.5-0.1 1.9-0.3 3.8-0.4 5.7-0.3 5.5-0.5 10.9-0.5 16.1 0 9.1 0.5 17.9 1.4 26.4 0.3 2.4 0.7 4.7 1 7.1 0.8 6.1 1.8 12.1 3.1 18 0.6 2.4 1.2 4.8 1.9 7.2 1.5 5.7 3.2 11.2 5.1 16.6 0.8 2.1 1.5 4.1 2.4 6.1 2.3 5.7 5 11.3 7.8 16.7 0.5 0.9 0.9 1.8 1.4 2.7z m246.9 77.8c-11.1 0-22.5-0.4-33.9-1.1l19.8-55.1 49.3-15.2 35.2 16.5c7.1 3.4 15.5 0.3 18.8-6.8 3.3-7.1 0.3-15.5-6.8-18.8l-9.5-4.5 6-11.4c3.6-6.9 1-15.5-6-19.1-6.9-3.6-15.5-0.9-19.1 6l-6.5 12.5-4.9-2.3c-3.2-1.5-6.8-1.8-10.2-0.7l-52.9 16.3-26.2-27.8 9.5-32.3c2.2-7.5-2.1-15.4-9.6-17.6-7.6-2.2-15.4 2.1-17.6 9.6l-11.8 40.1c-1.4 4.8-0.2 10 3.3 13.7l31.8 33.8-21.8 60.6c-56.8-7.3-111.8-26.3-145.6-67.9-0.1-0.1-0.1-0.2-0.2-0.3l-0.9-1.2c-3.3-4.1-6.3-8.5-9.1-13.1-0.9-1.4-1.8-2.9-2.6-4.4-2.9-5.1-5.7-10.5-8.1-16.2-0.3-0.7-0.5-1.5-0.8-2.2-2.1-5.3-4-11-5.6-16.8-0.4-1.5-0.9-3-1.2-4.5-1.6-6.4-2.8-13.1-3.7-20.2-0.2-1.4-0.3-2.9-0.5-4.4-0.8-7.5-1.4-15.3-1.4-23.6 0-4.6 0.1-9.4 0.4-14.5 0-0.7 0.1-1.5 0.2-2.3 0.3-4.5 0.6-9 1.1-13.7 0.1-0.6 0.1-1.2 0.2-1.8 0.5-4.9 1.1-10 1.8-15.2 0.1-0.6 0.2-1.3 0.3-1.9 0.7-5.1 1.6-10.4 2.5-15.7 0.2-0.9 0.3-1.8 0.5-2.6 0.9-4.8 1.9-9.8 2.9-14.7 0.3-1.6 0.6-3.1 1-4.6 0.8-3.5 1.6-7.2 2.5-10.8 12.4-52.5 32.9-109.9 59.1-161.3 0.3-0.5 0.5-1 0.8-1.6 2.4-4.8 4.9-9.5 7.5-14.1 7.1-12.9 14.6-25.5 22.6-37.6 0-0.1 0-0.1 0.1-0.2 39.9-60.5 88.3-103.6 139.4-103.6 46.8 0 91.2 36 129 88.5 0.1 0.1 0.1 0.2 0.1 0.3 8.7 12 16.9 24.8 24.7 38 1.1 1.9 2.2 3.9 3.3 5.9 1.9 3.4 3.9 6.8 5.7 10.3 35.4 65.2 61.5 142.1 73.1 207.1 0.7 3.7 1.3 7.5 1.9 11.1 0.3 2.2 0.6 4.3 0.9 6.4 0.6 3.9 1.1 7.8 1.5 11.6 0.2 1.9 0.4 3.7 0.6 5.6 0.4 4 0.7 7.9 1 11.8 0.1 1.5 0.2 3.1 0.3 4.6 0.3 5.2 0.5 10.3 0.5 15.1 0 8.3-0.6 16-1.4 23.6-0.2 1.5-0.3 2.9-0.5 4.4-0.9 7-2.1 13.6-3.7 19.9-0.4 1.7-0.9 3.4-1.4 5.1-1.6 5.7-3.4 11.2-5.4 16.5-0.4 1.1-0.9 2.2-1.3 3.3-2.2 5.1-4.7 10-7.3 14.7-1 1.7-1.9 3.4-2.9 5-42.9 68.6-136.6 85.8-218.8 85.8zM776 728.1c0.3-0.6 0.6-1.3 0.9-2 2.7-5.3 5.2-10.9 7.4-16.5 0.7-1.8 1.4-3.5 2-5.3 1.9-5.5 3.5-11.1 5-16.9 0.5-2.1 1.2-4.1 1.6-6.3 1.3-5.9 2.2-11.9 3-18.1 0.3-2.2 0.7-4.2 0.9-6.4 0.8-8.3 1.3-16.9 1.3-25.8 0-5.2-0.2-10.6-0.5-16.2 0-0.4-0.1-0.8-0.1-1.3-4.9-89.5-46.1-220.5-109.1-313.8 10.8-5.2 21.5-7.8 31.9-7.8 96.2 0 179.2 207.7 179.2 309.7 0.2 71.4-41.4 113.9-123.5 126.7z" fill="#004364" /><path d="M527.1 261.2m-16.4 0a16.4 16.4 0 1 0 32.8 0 16.4 16.4 0 1 0-32.8 0Z" fill="#004364" /><path d="M461.6 301.7m-16.4 0a16.4 16.4 0 1 0 32.8 0 16.4 16.4 0 1 0-32.8 0Z" fill="#004364" /><path d="M586.2 285.3c-9 0-16.4 7.3-16.4 16.4 0 9 7.3 16.4 16.4 16.4 9 0 16.4-7.3 16.4-16.4-0.1-9.1-7.4-16.4-16.4-16.4z" fill="#004364" /><path d="M415.6 358.5m-16.4 0a16.4 16.4 0 1 0 32.8 0 16.4 16.4 0 1 0-32.8 0Z" fill="#004364" /><path d="M482.3 358.5m-16.4 0a16.4 16.4 0 1 0 32.8 0 16.4 16.4 0 1 0-32.8 0Z" fill="#004364" /></svg>


 
  <svg on:click={() => changeAvatar()} width="800px" height="800px" viewBox="0 0 24 24" fill="none" class = "swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg">
<path d="M22.0008 12.0001C22.0008 8.71493 20.4167 5.79978 17.9707 3.97681C17.9906 4.14847 18 4.32307 18 4.50006C18 6.81633 16.25 8.72388 14 8.9726V5.00006L13 7.00006H11L10 5.00006V8.9726C7.75002 8.72388 6 6.81633 6 4.50006C6 4.32307 6.01022 4.14847 6.0301 3.97681C3.58409 5.79978 2 8.71493 2 12.0001C2 13.178 2.20406 14.3084 2.57812 15.358C3.00138 15.1296 3.48575 15.0001 4.00038 15.0001C5.58039 15.0001 6.87512 16.2215 6.99182 17.7717C7.52359 17.292 8.22826 17.0001 9.00075 17.0001C10.6576 17.0001 12.0008 18.3432 12.0008 20.0001C12.0008 18.3432 13.3431 17.0001 15 17.0001C15.7725 17.0001 16.4768 17.292 17.0086 17.7717C17.1253 16.2215 18.4212 15.0001 20.0012 15.0001C20.5158 15.0001 20.9998 15.1296 21.4231 15.358C21.7971 14.3084 22.0008 13.178 22.0008 12.0001Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</label>
  </div>

<div class="board">
  {#each board as row, rowIndex}
    {#each row as square, colIndex}
      <button 
        type="button" 
        class="square {(rowIndex + colIndex) % 2 === 0 ? 'white' : 'black'}" 
        class:highlight={isHighlighted(rowIndex, colIndex) && selectedSquare === getSquareNotation(rowIndex, colIndex)}
        class:legal-move={isHighlighted(rowIndex, colIndex) && selectedSquare !== getSquareNotation(rowIndex, colIndex)}
        on:click={() => handleSquareClick(rowIndex, colIndex)}
        on:keydown={(event) => handleSquareKeydown(event, rowIndex, colIndex)}
        aria-label="{square ? square.color + ' ' + square.type : ''} at {getSquareNotation(rowIndex, colIndex)}"
      >
        {#if getPieceSVG(square)}
          <img src={getPieceSVG(square)} alt="{square.color} {square.type}" />
        {/if}
      </button>
    {/each}
  {/each}
</div>

<table class="move-history">
  <thead>
    <tr>
      <th>#</th>
      <th>White</th>
      <th>Black</th>
    </tr>
  </thead>
  <tbody>
    {#each moveHistory as move, index}
      {#if index % 2 === 0}
        <tr>
          <td>{Math.floor(index / 2) + 1}</td>
          <td>{move}</td>
          <td>{moveHistory[index + 1] ? moveHistory[index + 1]: ''}</td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>


</div>