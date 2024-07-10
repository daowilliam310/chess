<script>
  import { Chess } from 'chess.js';
  import { onMount } from 'svelte';
  import pieceMap from '../assets/chess-pieces.js'
 let chess = new Chess();
  let board = chess.board();
  let selectedSquare = null;
  let legalMoves = [];
   let whitePromotionPiece = 'q'; // Default promotion piece for white
  let blackPromotionPiece = 'q'; // Default promotion piece for black
let turn = 0;
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
      return pieceMap[square.type][square.color];
    }
    return null;
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

<h1 data-shadow='Chess'>Chess</h1>
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