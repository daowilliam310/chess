import bishopBlack from "../svg/blackbishop.svg"
import kingBlack from "../svg/blackking.svg"
import knightBlack from "../svg/blackknight.svg"
import pawnBlack from "../svg/blackpawn.svg"
import queenBlack from "../svg/blackqueen.svg"
import rookBlack from "../svg/blackrook.svg"
import bishopWhite from "../svg/whitebishop.svg"
import kingWhite from "../svg/whiteking.svg"
import knightWhite from "../svg/whiteknight.svg"
import pawnWhite from "../svg/whitepawn.svg"
import queenWhite from "../svg/whitequeen.svg"
import rookWhite from "../svg/whiterook.svg"

const pieceMap = {
    'p': {
      'b': pawnBlack,
      'w': pawnWhite
    },
    'n': {
      'b': knightBlack,
      'w': knightWhite
    },
    'q': {

        'b': queenBlack,
        'w': queenWhite
    },
    'r': {

        'b': rookBlack,
        'w': rookWhite
    },
    'k': {

        'b': kingBlack,
        'w': kingWhite,
    },
    'b': {

        'b': bishopBlack,
        'w': bishopWhite
    }
    // Add mappings for all other pieces
  };
  
  export default pieceMap;