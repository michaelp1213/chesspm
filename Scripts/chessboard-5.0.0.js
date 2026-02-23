/*!
* chessboard.js v0.3.0
*
* Copyright 2013 Chris Oakman
* Released under the MIT license
* http://chessboardjs.com/license
*
* Date: 10 Aug 2013
*/

// start anonymous scope
; (function () {
'use strict';

var scrollLocked = false;
//------------------------------------------------------------------------------
// Chess Util Functions
//------------------------------------------------------------------------------
var COLUMNS = 'abcdefgh'.split('');

// michael - for chess
var BITS = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64
};

var RANK_1 = 7;
var RANK_2 = 6;
var RANK_3 = 5;
var RANK_4 = 4;
var RANK_5 = 3;
var RANK_6 = 2;
var RANK_7 = 1;
var RANK_8 = 0;

var SQUARES = {
    a8: 0, b8: 1, c8: 2, d8: 3, e8: 4, f8: 5, g8: 6, h8: 7,
    a7: 16, b7: 17, c7: 18, d7: 19, e7: 20, f7: 21, g7: 22, h7: 23,
    a6: 32, b6: 33, c6: 34, d6: 35, e6: 36, f6: 37, g6: 38, h6: 39,
    a5: 48, b5: 49, c5: 50, d5: 51, e5: 52, f5: 53, g5: 54, h5: 55,
    a4: 64, b4: 65, c4: 66, d4: 67, e4: 68, f4: 69, g4: 70, h4: 71,
    a3: 80, b3: 81, c3: 82, d3: 83, e3: 84, f3: 85, g3: 86, h3: 87,
    a2: 96, b2: 97, c2: 98, d2: 99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
};
var SQUARESNOR = {
    a8: 63, b8: 62, c8: 61, d8: 60, e8: 59, f8: 58, g8: 57, h8: 56,
    a7: 55, b7: 54, c7: 53, d7: 52, e7: 51, f7: 50, g7: 49, h7: 48,
    a6: 47, b6: 46, c6: 45, d6: 44, e6: 43, f6: 42, g6: 41, h6: 40,
    a5: 39, b5: 38, c5: 37, d5: 36, e5: 35, f5: 34, g5: 33, h5: 32,
    a4: 31, b4: 30, c4: 29, d4: 28, e4: 27, f4: 26, g4: 25, h4: 24,
    a3: 23, b3: 22, c3: 21, d3: 20, e3: 19, f3: 18, g3: 17, h3: 16,
    a2: 15, b2: 14, c2: 13, d2: 12, e2: 11, f2: 10, g2: 9,  h2: 8,
    a1: 7, b1: 6, c1: 5, d1: 4, e1: 3, f1: 2, g1: 1,  h1: 0
};
var PieceCodes = "PNBRQK";
function rank(i) {
    return i >> 4;
}

function file(i) {
    return i & 15;
}

function algebraic(i) {
    var f = file(i), r = rank(i);
    return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1);
}
function validMove(move) {
    // move should be a string
    if (typeof move !== 'string') return false;

    // move should be in the form of "e2-e4", "f6-d5"
    var tmp = move.split('-');
    if (tmp.length !== 2) return false;

    return (validSquare(tmp[0]) === true && validSquare(tmp[1]) === true);
}

function validSquare(square) {
    if (typeof square !== 'string') return false;
    return (square.search(/^[a-h][1-8]$/) !== -1);
}

function validPieceCode(code) {
    if (typeof code !== 'string') return false;
    return (code.search(/^[bw][KQRNBP]$/) !== -1);
}

// TODO: this whole function could probably be replaced with a single regex
function validFen(fen) {
    if (typeof fen !== 'string') return false;

    // cut off any move, castling, etc info from the end
    // we're only interested in position information
    fen = fen.replace(/ .+$/, '');

    // FEN should be 8 sections separated by slashes
    var chunks = fen.split('/');
    if (chunks.length !== 8 && chunks.length !== 9) return false;

    // check the piece sections
    for (var i = 0; i < 8; i++) {
        if (chunks[i] === '' ||
            chunks[i].length > 8 ||
            chunks[i].search(/[^kqrbnpKQRNBP1-8]/) !== -1) {
            return false;
        }
    }

    return true;
}

function validPositionObject(pos) {
    if (typeof pos !== 'object') return false;

    for (var i in pos) {
        if (pos.hasOwnProperty(i) !== true) continue;

        if (validSquare(i) !== true || validPieceCode(pos[i]) !== true) {
            return false;
        }
    }

    return true;
}

// convert FEN piece code to bP, wK, etc
function fenToPieceCode(piece) {
    // black piece
    if (piece.toLowerCase() === piece) {
        return 'b' + piece.toUpperCase();
    }

    // white piece
    return 'w' + piece.toUpperCase();
}

// convert bP, wK, etc code to FEN structure
function pieceCodeToFen(piece) {
    var tmp = piece.split('');

    // white piece
    if (tmp[0] === 'w') {
        return tmp[1].toUpperCase();
    }

    // black piece
    return tmp[1].toLowerCase();
}

//// convert FEN string to position object
//// returns false if the FEN string is invalid
//function fenToObj(fen) {
//    if (validFen(fen) !== true) {
//        return false;
//    }

//    var miscarr = fen.split(' ');
//    if (miscarr.length >= 2) {
//        if(miscarr[1]=='b') {CURRENT_FEN_COL}
//    }
//    // cut off any move, castling, etc info from the end
//    // we're only interested in position information
//    fen = fen.replace(/ .+$/, '');

//    var rows = fen.split('/');
//    var position = {};

//    var currentRow = 8;
//    for (var i = 0; i < 8; i++) {
//        var row = rows[i].split('');
//        var colIndex = 0;

//        // loop through each character in the FEN section
//        for (var j = 0; j < row.length; j++) {
//            // number / empty squares
//            if (row[j].search(/[1-8]/) !== -1) {
//                var emptySquares = parseInt(row[j], 10);
//                colIndex += emptySquares;
//            }
//                // piece
//            else {
//                var square = COLUMNS[colIndex] + currentRow;
//                position[square] = fenToPieceCode(row[j]);
//                colIndex++;
//            }
//        }

//        currentRow--;
//    }

//    return position;
//}

//// position object to FEN string
//// returns false if the obj is not a valid position object
//function objToFen(obj) {

//    if (validPositionObject(obj) !== true) {
//        return false;
//    }

//    var fen = '';

//    var currentRow = 8;
//    for (var i = 0; i < 8; i++) {
//        for (var j = 0; j < 8; j++) {
//            var square = COLUMNS[j] + currentRow;

//            // piece exists
//            if (obj.hasOwnProperty(square) === true) {
//                fen += pieceCodeToFen(obj[square]);
//            }

//                // empty space
//            else {
//                fen += '1';
//            }
//        }

//        if (i !== 7) {
//            fen += '/';
//        }

//        currentRow--;
//    }

//    // squeeze the numbers together
//    // haha, I love this solution...
//    fen = fen.replace(/11111111/g, '8');
//    fen = fen.replace(/1111111/g, '7');
//    fen = fen.replace(/111111/g, '6');
//    fen = fen.replace(/11111/g, '5');
//    fen = fen.replace(/1111/g, '4');
//    fen = fen.replace(/111/g, '3');
//    fen = fen.replace(/11/g, '2');
//    var col = CURRENT_FEN_COL;
//    if (col != 'b') col = 'w';//
//    fen+=' '+col+' - - 0 1'; ///.....
//    return fen;
//}

  window['ChessBoard'] = window['ChessBoard'] || function (containerElOrId, cfg) {
    'use strict';

    cfg = cfg || {};

    //------------------------------------------------------------------------------
    // Constants
    //------------------------------------------------------------------------------

    var MINIMUM_JQUERY_VERSION = '1.7.0',
      START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      START_POSITION = fenToObj(START_FEN);

    // use unique class names to prevent clashing with anything else on the page
    // and simplify selectors
    var CSS = {
      alpha: 'alpha-d2270',
      black: 'black-3c85d',
      board: 'board-b72b1',
      chessboard: 'chessboard-63f37',
      clearfix: 'clearfix-7da63',
      highlight1: 'highlight1-32417',
      highlight2: 'highlight2-9c5d2',
      notation: 'notation-322f9',
      smallfont: 'sfont',
      numeric: 'numeric-fc462',
      piece: 'piece-417db',
      row: 'row-5277c',
      sparePieces: 'spare-pieces-7492f',
      sparePiecesBottom: 'spare-pieces-bottom-ae20f',
      sparePiecesTop: 'spare-pieces-top-4028b',

      square: 'square-55d63',
      white: 'white-1e1d7'
    };

    //------------------------------------------------------------------------------
    // Module Scope Variables
    //------------------------------------------------------------------------------

    // DOM elements
    var containerEl,
      boardEl,
      draggedPieceEl,
      sparePiecesTopEl,
      sparePiecesBottomEl;

    // constructor return object
    var widget = {};

    //------------------------------------------------------------------------------
    // Stateful
    //------------------------------------------------------------------------------

    var ANIMATION_HAPPENING = false,
      BOARD_BORDER_SIZE = 2,
      CURRENT_ORIENTATION = 'white',
      PREV_POSITION = {},
      CURRENT_POSITION = {},
      CURRENT_FEN = '',
      CURRENT_FEN_COL, // current
      SQUARE_SIZE,
      allowPoint = true, // point from and point to
      checkDragColor = true,
      DRAGGABLE = false,
      DragHlight = false,
      DRAGGED_PIECE,
      DRAGGED_PIECE_LOCATION,
      DRAGGED_PIECE_SOURCE,
      DRAGGING_A_PIECE = false,
      DRAGGED_MANPIECE,
      DRAGGED_MANPIECE_LOCATION,
      DRAGGED_MANPIECE_SOURCE,
      DRAGGING_A_MANPIECE = false,
      SPARE_PIECE_ELS_IDS = {},
      SQUARE_ELS_IDS = {},
      LAST_MOVE_NUM = 1,// Michael
      LAST_MOVE_COLOR = 'b', // prev - Michael
      PLAY_ONLY_COLOR = '', // Michael
      AFFECT_IDS = {}, // Michael
      SQUARE_ELS_OFFSETS;

    //------------------------------------------------------------------------------
    // JS Util Functions
    //------------------------------------------------------------------------------

    // convert FEN string to position object
    // returns false if the FEN string is invalid
    function fenToObj(fen) {
      if (validFen(fen) !== true) {
        return false;
      }

      var miscarr = fen.split(' ');
      if (miscarr.length >= 2) {
        if (miscarr[1] == 'b') { CURRENT_FEN_COL = 'b' }
        else CURRENT_FEN_COL = 'w';
      }
      // cut off any move, castling, etc info from the end
      // we're only interested in position information
      fen = fen.replace(/ .+$/, '');

      var rows = fen.split('/');
      var position = {};

      var currentRow = 8;
      for (var i = 0; i < 8; i++) {
        var row = rows[i].split('');
        var colIndex = 0;

        // loop through each character in the FEN section
        for (var j = 0; j < row.length; j++) {
          // number / empty squares
          if (row[j].search(/[1-8]/) !== -1) {
            var emptySquares = parseInt(row[j], 10);
            colIndex += emptySquares;
          }
          // piece
          else {
            var square = COLUMNS[colIndex] + currentRow;
            position[square] = fenToPieceCode(row[j]);
            colIndex++;
          }
        }

        currentRow--;
      }

      return position;
    }

    // position object to FEN string
    // returns false if the obj is not a valid position object
    function objToFen(obj, bymovenum) {

      if (validPositionObject(obj) !== true) {
        return false;
      }

      var fen = '';

      var currentRow = 8;
      for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
          var square = COLUMNS[j] + currentRow;

          // piece exists
          if (obj.hasOwnProperty(square) === true) {
            fen += pieceCodeToFen(obj[square]);
          }

          // empty space
          else {
            fen += '1';
          }
        }

        if (i !== 7) {
          fen += '/';
        }

        currentRow--;
      }

      // squeeze the numbers together
      // haha, I love this solution...
      fen = fen.replace(/11111111/g, '8');
      fen = fen.replace(/1111111/g, '7');
      fen = fen.replace(/111111/g, '6');
      fen = fen.replace(/11111/g, '5');
      fen = fen.replace(/1111/g, '4');
      fen = fen.replace(/111/g, '3');
      fen = fen.replace(/11/g, '2');
      var col = CURRENT_FEN_COL;
      if (col != 'b') col = 'w';//
      fen += ' ' + col + ' - - 0 '; //1'; ///.....
      if (bymovenum && bymovenum > 0)
        fen += LAST_MOVE_NUM;
      else
        fen += '1';
      return fen;
    }

    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    function createId() {
      return 'xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/x/g, function (c) {
        var r = Math.random() * 16 | 0;
        return r.toString(16);
      });
    }

    function deepCopy(thing) {
      return JSON.parse(JSON.stringify(thing));
    }

    function parseSemVer(version) {
      var tmp = version.split('.');
      return {
        major: parseInt(tmp[0], 10),
        minor: parseInt(tmp[1], 10),
        patch: parseInt(tmp[2], 10)
      };
    }

    // returns true if version is >= minimum
    function compareSemVer(version, minimum) {
      version = parseSemVer(version);
      minimum = parseSemVer(minimum);

      var versionNum = (version.major * 10000 * 10000) +
        (version.minor * 10000) + version.patch;
      var minimumNum = (minimum.major * 10000 * 10000) +
        (minimum.minor * 10000) + minimum.patch;

      return (versionNum >= minimumNum);
    }

    //------------------------------------------------------------------------------
    // Validation / Errors
    //------------------------------------------------------------------------------

    function error(code, msg, obj) {
      // do nothing if showErrors is not set
      if (cfg.hasOwnProperty('showErrors') !== true ||
        cfg.showErrors === false) {
        return;
      }

      var errorText = 'ChessBoard Error ' + code + ': ' + msg;

      // print to console
      if (cfg.showErrors === 'console' &&
        typeof console === 'object' &&
        typeof console.log === 'function') {
        //console.log(errorText);
        if (arguments.length >= 2) {
          //console.log(obj);
        }
        return;
      }

      //alert errors
      if (cfg.showErrors === 'alert') {
        if (obj) {
          errorText += '\n\n' + JSON.stringify(obj);
        }
        window.alert(errorText);
        return;
      }

      // custom function
      if (typeof cfg.showErrors === 'function') {
        cfg.showErrors(code, msg, obj);
      }
    }

    // check dependencies
    function checkDeps() {
      // if containerId is a string, it must be the ID of a DOM node
      if (typeof containerElOrId === 'string') {
        // cannot be empty
        if (containerElOrId === '') {
          window.alert('ChessBoard Error 1001: ' +
            'The first argument to ChessBoard() cannot be an empty string.' +
            '\n\nExiting...');
          return false;
        }

        // make sure the container element exists in the DOM
        var el = document.getElementById(containerElOrId);
        if (!el) {
          //window.alert('ChessBoard Error 1002: Element with id "' +
          //    containerElOrId + '" does not exist in the DOM.' +
          //    '\n\nExiting...');
          return false;
        }

        // set the containerEl
        containerEl = $(el);
      }

      // else it must be something that becomes a jQuery collection
      // with size 1
      // ie: a single DOM node or jQuery object
      else {
        containerEl = $(containerElOrId);

        if (containerEl.length !== 1) {
          window.alert('ChessBoard Error 1003: The first argument to ' +
            'ChessBoard() must be an ID or a single DOM node.' +
            '\n\nExiting...');
          return false;
        }
      }

      // JSON must exist
      if (!window.JSON ||
        typeof JSON.stringify !== 'function' ||
        typeof JSON.parse !== 'function') {
        window.alert('ChessBoard Error 1004: JSON does not exist. ' +
          'Please include a JSON polyfill.\n\nExiting...');
        return false;
      }

      // check for a compatible version of jQuery
      if (!(typeof window.$ && $.fn && $.fn.jquery &&
        compareSemVer($.fn.jquery, MINIMUM_JQUERY_VERSION) === true)) {
        window.alert('ChessBoard Error 1005: Unable to find a valid version ' +
          'of jQuery. Please include jQuery ' + MINIMUM_JQUERY_VERSION + ' or ' +
          'higher on the page.\n\nExiting...');
        return false;
      }

      return true;
    }

    function validAnimationSpeed(speed) {
      if (speed === 'fast' || speed === 'slow') {
        return true;
      }

      if ((parseInt(speed, 10) + '') !== (speed + '')) {
        return false;
      }

      return (speed >= 0);
    }

    // validate config / set default options
    function expandConfig() {
      if (typeof cfg === 'string' || validPositionObject(cfg) === true) {
        cfg = {
          position: cfg
        };
      }

      // default for orientation is white
      if (cfg.orientation !== 'black') {
        cfg.orientation = 'white';
      }
      if (cfg.orientation !== 'black') {
        cfg.orientation = 'white';
      }
      CURRENT_ORIENTATION = cfg.orientation;

      // default for showNotation is true
      if (cfg.square !== '') {
        var sq = parseInt(cfg.square);
        if (sq >= 0 && sq < 20) {
          CSS.white += cfg.square;
          CSS.black += cfg.square;
        }
      }
      // default for draggable is false
      if (cfg.draggable !== true) {
        cfg.draggable = false;
      }
      else
        DRAGGABLE = true;
      if (cfg.draghighlight !== true) {
        cfg.draghighlight = false;
        DragHlight = false;
      }
      else
        DragHlight = true;

      // default for dropOffBoard is 'snapback'
      if (cfg.dropOffBoard !== 'trash') {
        cfg.dropOffBoard = 'snapback';
      }

      // default for sparePieces is false
      if (cfg.sparePieces !== true) {
        cfg.sparePieces = false;
      }

      // draggable must be true if sparePieces is enabled
      if (cfg.sparePieces === true) {
        cfg.draggable = true;
        DRAGGABLE = true;
      }
      if (cfg.allowPoint === false) {

        allowPoint = false;
      }
      else
        cfg.allowPoint = true;
      if (cfg.checkDragColor === false) {

        checkDragColor = false;
      }
      else
        cfg.checkDragColor = true;


      // default piece theme is wikipedia
      if (cfg.hasOwnProperty('pieceTheme') !== true ||
        (typeof cfg.pieceTheme !== 'string' &&
          typeof cfg.pieceTheme !== 'function')) {
        cfg.pieceTheme = '../Content/img/chesspieces/wikipedia/{piece}.png';
      }

      // animation speeds
      if (cfg.hasOwnProperty('appearSpeed') !== true ||
        validAnimationSpeed(cfg.appearSpeed) !== true) {
        cfg.appearSpeed = 200;
      }
      if (cfg.hasOwnProperty('moveSpeed') !== true ||
        validAnimationSpeed(cfg.moveSpeed) !== true) {
        cfg.moveSpeed = 200;
      }
      if (cfg.hasOwnProperty('snapbackSpeed') !== true ||
        validAnimationSpeed(cfg.snapbackSpeed) !== true) {
        cfg.snapbackSpeed = 50;
      }
      if (cfg.hasOwnProperty('snapSpeed') !== true ||
        validAnimationSpeed(cfg.snapSpeed) !== true) {
        cfg.snapSpeed = 25;
      }
      if (cfg.hasOwnProperty('trashSpeed') !== true ||
        validAnimationSpeed(cfg.trashSpeed) !== true) {
        cfg.trashSpeed = 100;
      }
      // MP
      //if (cfg.playOneColor !== 'true') {
      //    cfg.playOneColor = false;
      //}

      // make sure position is valid
      if (cfg.hasOwnProperty('position') === true) {
        if (cfg.position === 'start') {
          CURRENT_POSITION = deepCopy(START_POSITION);
          PREV_POSITION = deepCopy(CURRENT_POSITION);
          LAST_MOVE_COLOR = 'b';
        }

        else if (validFen(cfg.position) === true) {
          CURRENT_POSITION = fenToObj(cfg.position);
          PREV_POSITION = deepCopy(CURRENT_POSITION);
        }

        else if (validPositionObject(cfg.position) === true) {
          CURRENT_POSITION = deepCopy(cfg.position);
          PREV_POSITION = deepCopy(CURRENT_POSITION);
        }

        else {
          error(7263, 'Invalid value passed to config.position.', cfg.position);
        }
      }

      return true;
    }

    //------------------------------------------------------------------------------
    // DOM Misc
    //------------------------------------------------------------------------------

    // calculates square size based on the width of the container
    // got a little CSS black magic here, so let me explain:
    // get the width of the container element (could be anything), reduce by 1 for
    // fudge factor, and then keep reducing until we find an exact mod 8 for
    // our square size
    function calculateSquareSize() {

      var containerWidth1 = parseInt(containerEl.css('width'), 10);
      // defensive, prevent infinite loop
      if (!containerWidth1 || containerWidth1 <= 0) {
        return 0;
      }


      var containerWidth = Math.floor((containerWidth1 - 4) / 8) * 8 + 4; // have to be 4 diff.
      // pad one pixel
      var boardWidth = containerWidth - 1; // - 1; may be -8

      while (boardWidth % 8 !== 0 && boardWidth > 0) {
        boardWidth--;
      }
      //if (containerWidth1 - boardWidth > 9)
      //    boardWidth += 8; // ??
      return (boardWidth / 8);
    }

    // create random IDs for elements
    function createElIds() {
      // squares on the board
      //alert(createElIds);
      for (var i = 0; i < COLUMNS.length; i++) {
        for (var j = 1; j <= 8; j++) {
          var square = COLUMNS[i] + j;
          SQUARE_ELS_IDS[square] = square + '-' + createId();
        }
      }

      // spare pieces
      var pieces = 'KQRBNP'.split('');
      for (var i = 0; i < pieces.length; i++) {
        var whitePiece = 'w' + pieces[i];
        var blackPiece = 'b' + pieces[i];
        SPARE_PIECE_ELS_IDS[whitePiece] = whitePiece + '-' + createId();
        SPARE_PIECE_ELS_IDS[blackPiece] = blackPiece + '-' + createId();
      }
      for (var i = 0; i < 10; i++) {
        AFFECT_IDS[i] = 'aff' + i + createId();
      }
    }

    //------------------------------------------------------------------------------
    // Markup Building
    //------------------------------------------------------------------------------

    function buildBoardContainer() {
      var fs = ''; if (cfg.hasOwnProperty('boardSize') === true) { if (cfg.boardSize == 'small') fs = 's'; else if (cfg.boardSize == 'medium') fs = 'm'; }
      var html = '<div id="cboard11" class="' + CSS.chessboard + '">';

      if (cfg.sparePieces === true) {
        html += '<div class="' + CSS.sparePieces + ' ' +
          CSS.sparePiecesTop + fs + '"></div>';
      }

      html += '<div id="board21" class="' + CSS.board + '"></div>';

      if (cfg.sparePieces === true) {
        html += '<div class="' + CSS.sparePieces + ' ' +
          CSS.sparePiecesBottom + fs + '"></div>';
      }

      html += '</div>';

      return html;
    }

    /*
    var buildSquare = function(color, size, id) {
        var html = '<div class="' + CSS.square + ' ' + CSS[color] + '" ' +
        'style="width: ' + size + 'px; height: ' + size + 'px" ' +
        'id="' + id + '">';
        
        if (cfg.showNotation === true) {
        
        }
        
        html += '</div>';
        
        return html;
    };
    */

    function buildBoard(orientation) {
      if (orientation !== 'black') {
        orientation = 'white';
      }

      var html = '';

      // algebraic notation / orientation
      var alpha = deepCopy(COLUMNS);
      var row = 8;
      if (orientation === 'black') {
        alpha.reverse();
        row = 1;
      }
      var fs = ''; if (cfg.hasOwnProperty('boardSize') === true) { if (cfg.boardSize == 'small') fs = ' sfont'; else if (cfg.boardSize == 'medium') fs = ' mfont'; }
      var squareColor = 'white';
      for (var i = 0; i < 8; i++) {
        html += '<div class="' + CSS.row + '">';
        for (var j = 0; j < 8; j++) {
          var square = alpha[j] + row;

          html += '<div class="' + CSS.square + ' ' + CSS[squareColor] + ' ' +
            'square-' + square + '" ' +
            'style="width: ' + SQUARE_SIZE + 'px; height: ' + SQUARE_SIZE + 'px" ' +
            'id="' + SQUARE_ELS_IDS[square] + '" ' +
            'data-square="' + square + '">';

          if (cfg.showNotation === true) {
            // alpha notation
            if ((orientation === 'white' && row === 1) ||
              (orientation === 'black' && row === 8)) {

              html += '<div class="' + CSS.notation + fs + ' ' + CSS.alpha + '">' +
                alpha[j] + '</div>';
            }

            // numeric notation
            if (j === 0) {
              html += '<div class="' + CSS.notation + fs + ' ' + CSS.numeric + '">' +
                row + '</div>';
            }
          }

          html += '</div>'; // end .square

          squareColor = (squareColor === 'white' ? 'black' : 'white');
        }
        html += '<div class="' + CSS.clearfix + '"></div></div>';

        squareColor = (squareColor === 'white' ? 'black' : 'white');

        if (orientation === 'white') {
          row--;
        }
        else {
          row++;
        }
      }

      return html;
    }

    function buildPieceImgSrc(piece) {
      if (typeof cfg.pieceTheme === 'function') {
        return cfg.pieceTheme(piece);
      }

      if (typeof cfg.pieceTheme === 'string') {
        return cfg.pieceTheme.replace(/{piece}/g, piece);
      }

      // NOTE: this should never happen
      error(8272, 'Unable to build image source for cfg.pieceTheme.');
      return '';
    }

    function buildPiece(piece, hidden, id) {
      var wb = piece[0];
      var wbadd = ' ' + wb;
      //if (wb == 'w')
      //    wbadd
      var html = '<img src="' + buildPieceImgSrc(piece) + '" ';
      if (id && typeof id === 'string') {
        html += 'id="' + id + '" ';
      }
      html += 'alt="" ' +
        'class="' + CSS.piece + wbadd + '" ' +
        'data-piece="' + piece + '" ' +
        'style="width: ' + SQUARE_SIZE + 'px;' +
        'height: ' + SQUARE_SIZE + 'px;';
      if (DRAGGABLE)
        html += 'cursor: pointer;';
      if (hidden === true) {
        html += 'display:none;';
      }
      html += '" />';

      return html;
    }

    function buildSparePieces(color) {
      var pieces = ['wK', 'wQ', 'wR', 'wB', 'wN', 'wP'];
      if (color === 'black') {
        pieces = ['bK', 'bQ', 'bR', 'bB', 'bN', 'bP'];
      }

      var html = '';
      for (var i = 0; i < pieces.length; i++) {
        html += buildPiece(pieces[i], false, SPARE_PIECE_ELS_IDS[pieces[i]]);
      }

      return html;
    }

    //------------------------------------------------------------------------------
    // Animations
    //------------------------------------------------------------------------------

    function animateSquareToSquare(src, dest, piece, completeFn) {
      // get information about the source and destination squares
      var srcSquareEl = $('#' + SQUARE_ELS_IDS[src]);
      var srcSquarePosition = srcSquareEl.offset();
      var destSquareEl = $('#' + SQUARE_ELS_IDS[dest]);
      var destSquarePosition = destSquareEl.offset();

      // create the animated piece and absolutely position it
      // over the source square
      var animatedPieceId = createId();
      $('body').append(buildPiece(piece, true, animatedPieceId));
      var animatedPieceEl = $('#' + animatedPieceId);
      animatedPieceEl.css({
        display: '',
        position: 'absolute',
        top: srcSquarePosition.top,
        left: srcSquarePosition.left
      });

      // remove original piece from source square
      srcSquareEl.find('.' + CSS.piece).remove();

      // on complete
      var complete = function () {
        // add the "real" piece to the destination square
        destSquareEl.append(buildPiece(piece));

        // remove the animated piece
        animatedPieceEl.remove();

        // run complete function
        if (typeof completeFn === 'function') {
          completeFn();
        }
      };

      // animate the piece to the destination square
      var opts = {
        duration: cfg.moveSpeed,
        complete: complete
      };
      animatedPieceEl.animate(destSquarePosition, opts);
    }

    function animateSparePieceToSquare(piece, dest, completeFn) {
      var srcOffset = $('#' + SPARE_PIECE_ELS_IDS[piece]).offset();
      var destSquareEl = $('#' + SQUARE_ELS_IDS[dest]);
      var destOffset = destSquareEl.offset();

      // create the animate piece
      var pieceId = createId();
      $('body').append(buildPiece(piece, true, pieceId));
      var animatedPieceEl = $('#' + pieceId);
      animatedPieceEl.css({
        display: '',
        position: 'absolute',
        left: srcOffset.left,
        top: srcOffset.top
      });

      // on complete
      var complete = function () {
        // add the "real" piece to the destination square
        destSquareEl.find('.' + CSS.piece).remove();
        destSquareEl.append(buildPiece(piece));

        // remove the animated piece
        animatedPieceEl.remove();

        // run complete function
        if (typeof completeFn === 'function') {
          completeFn();
        }
      };

      // animate the piece to the destination square
      var opts = {
        duration: cfg.moveSpeed,
        complete: complete
      };
      animatedPieceEl.animate(destOffset, opts);
    }

    // execute an array of animations
    function doAnimations(a, oldPos, newPos) {
      ANIMATION_HAPPENING = true;

      var numFinished = 0;
      function onFinish() {
        numFinished++;

        // exit if all the animations aren't finished
        if (numFinished !== a.length) return;

        drawPositionInstant();
        ANIMATION_HAPPENING = false;

        // run their onMoveEnd function
        if (cfg.hasOwnProperty('onMoveEnd') === true &&
          typeof cfg.onMoveEnd === 'function') {
          cfg.onMoveEnd();
        }
      }

      for (var i = 0; i < a.length; i++) {
        // clear a piece
        if (a[i].type === 'clear') {
          $('#' + SQUARE_ELS_IDS[a[i].square] + ' .' + CSS.piece)
            .fadeOut(cfg.trashSpeed, onFinish);
        }

        // add a piece (no spare pieces)
        if (a[i].type === 'add' && cfg.sparePieces !== true) {
          $('#' + SQUARE_ELS_IDS[a[i].square])
            .append(buildPiece(a[i].piece, true))
            .find('.' + CSS.piece)
            .fadeIn(cfg.appearSpeed, onFinish);
        }

        // add a piece from a spare piece
        if (a[i].type === 'add' && cfg.sparePieces === true) {
          animateSparePieceToSquare(a[i].piece, a[i].square, onFinish);
        }

        // move a piece
        if (a[i].type === 'move') {
          animateSquareToSquare(a[i].source, a[i].destination, a[i].piece,
            onFinish);
        }
      }
    }

    // returns the distance between two squares
    function squareDistance(s1, s2) {
      s1 = s1.split('');
      var s1x = COLUMNS.indexOf(s1[0]) + 1;
      var s1y = parseInt(s1[1], 10);

      s2 = s2.split('');
      var s2x = COLUMNS.indexOf(s2[0]) + 1;
      var s2y = parseInt(s2[1], 10);

      var xDelta = Math.abs(s1x - s2x);
      var yDelta = Math.abs(s1y - s2y);

      if (xDelta >= yDelta) return xDelta;
      return yDelta;
    }

    // returns an array of closest squares from square
    function createRadius(square) {
      var squares = [];

      // calculate distance of all squares
      for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
          var s = COLUMNS[i] + (j + 1);

          // skip the square we're starting from
          if (square === s) continue;

          squares.push({
            square: s,
            distance: squareDistance(square, s)
          });
        }
      }

      // sort by distance
      squares.sort(function (a, b) {
        return a.distance - b.distance;
      });

      // just return the square code
      var squares2 = [];
      for (var i = 0; i < squares.length; i++) {
        squares2.push(squares[i].square);
      }

      return squares2;
    }

    // returns the square of the closest instance of piece
    // returns false if no instance of piece is found in position
    function findClosestPiece(position, piece, square) {
      // create array of closest squares from square
      var closestSquares = createRadius(square);

      // search through the position in order of distance for the piece
      for (var i = 0; i < closestSquares.length; i++) {
        var s = closestSquares[i];

        if (position.hasOwnProperty(s) === true && position[s] === piece) {
          return s;
        }
      }

      return false;
    }

    // calculate an array of animations that need to happen in order to get
    // from pos1 to pos2
    function calculateAnimations(pos1, pos2) {
      // make copies of both
      pos1 = deepCopy(pos1);
      pos2 = deepCopy(pos2);

      var animations = [];
      var squaresMovedTo = {};

      // remove pieces that are the same in both positions
      for (var i in pos2) {
        if (pos2.hasOwnProperty(i) !== true) continue;

        if (pos1.hasOwnProperty(i) === true && pos1[i] === pos2[i]) {
          delete pos1[i];
          delete pos2[i];
        }
      }

      // find all the "move" animations
      for (var i in pos2) {
        if (pos2.hasOwnProperty(i) !== true) continue;

        var closestPiece = findClosestPiece(pos1, pos2[i], i);
        if (closestPiece !== false) {
          animations.push({
            type: 'move',
            source: closestPiece,
            destination: i,
            piece: pos2[i]
          });

          delete pos1[closestPiece];
          delete pos2[i];
          squaresMovedTo[i] = true;
        }
      }

      // add pieces to pos2
      for (var i in pos2) {
        if (pos2.hasOwnProperty(i) !== true) continue;

        animations.push({
          type: 'add',
          square: i,
          piece: pos2[i]
        })

        delete pos2[i];
      }

      // clear pieces from pos1
      for (var i in pos1) {
        if (pos1.hasOwnProperty(i) !== true) continue;

        // do not clear a piece if it is on a square that is the result
        // of a "move", ie: a piece capture
        if (squaresMovedTo.hasOwnProperty(i) === true) continue;

        animations.push({
          type: 'clear',
          square: i,
          piece: pos1[i]
        });

        delete pos1[i];
      }

      return animations;
    }

    //------------------------------------------------------------------------------
    // Control Flow
    //------------------------------------------------------------------------------

    function drawPositionInstant() {
      // clear the board
      boardEl.find('.' + CSS.piece).remove();

      // add the pieces
      for (var i in CURRENT_POSITION) {
        if (CURRENT_POSITION.hasOwnProperty(i) !== true) continue;

        $('#' + SQUARE_ELS_IDS[i]).append(buildPiece(CURRENT_POSITION[i]));
      }
    }
    function drawPositionInstantWB(wb, square) {
      // clear the board - here only specific color
      if (wb == 'w')
        boardEl.find('.' + CSS.piece + '.w').remove();
      else // b
        boardEl.find('.' + CSS.piece + '.b').remove();
      // if piece deleted
      //delete CURRENT_POSITION[square];
      var x1 = boardEl.find('.square-' + square);
      var x2 = x1.children();
      if (x2 && x2.length > 0) x2[x2.length - 1].remove(); // may be 1=notation
      //boardEl.find('.square-' + square).children().find('.' + CSS.piece).remove();
      // add the pieces
      for (var i in CURRENT_POSITION) {
        if (CURRENT_POSITION.hasOwnProperty(i) !== true) continue;
        if (CURRENT_POSITION[i][0] == wb)
          $('#' + SQUARE_ELS_IDS[i]).append(buildPiece(CURRENT_POSITION[i]));
      }
    }

    function drawBoard() {
      //var fs = ''; if (cfg.hasOwnProperty('boardSize') === true) { if (cfg.boardSize == 'small') fs = 's'; else if (cfg.boardSize == 'medium') fs = 'm'; }
      boardEl.html(buildBoard(CURRENT_ORIENTATION));
      drawPositionInstant();

      if (cfg.sparePieces === true) {
        if (CURRENT_ORIENTATION === 'white') {
          sparePiecesTopEl.html(buildSparePieces('black'));
          sparePiecesBottomEl.html(buildSparePieces('white'));
        }
        else {
          sparePiecesTopEl.html(buildSparePieces('white'));
          sparePiecesBottomEl.html(buildSparePieces('black'));
        }
      }
    }

    // given a position and a set of moves, return a new position
    // with the moves executed
    function calculatePositionFromMoves(position, moves) {
      position = deepCopy(position);

      for (var i in moves) {
        if (moves.hasOwnProperty(i) !== true) continue;

        // skip the move if the position doesn't have a piece on the source square
        if (position.hasOwnProperty(i) !== true) continue;

        var piece = position[i];
        delete position[i];
        position[moves[i]] = piece;
      }

      return position;
    }

    function setCurrentPosition(position) {
      var oldPos = deepCopy(CURRENT_POSITION);
      PREV_POSITION = deepCopy(CURRENT_POSITION);
      var newPos = deepCopy(position);
      var oldFen = objToFen(oldPos);
      var newFen = objToFen(newPos);

      // do nothing if no change in position
      if (oldFen === newFen) return;

      // run their onChange function
      if (cfg.hasOwnProperty('onChange') === true &&
        typeof cfg.onChange === 'function') {
        cfg.onChange(oldPos, newPos);
      }

      // update state
      CURRENT_POSITION = position;
      //alert('setCurrentPosition');
    }
    function getSideToMove(fen) {
      if (!fen) return null;

      const parts = fen.trim().split(/\s+/);
      return parts[1] === 'w' ? 'w' : 'b';
    }

    // Michael ---
    function setNewMove(piece, fromSquare, toSquare, manual, myObj, doanim, fast) {

      //moveDone(piece + ':' + fromSquare + '-' + toSquare);
      // run their onMove function
      LAST_MOVE_COLOR = piece[0];
      if (cfg.hasOwnProperty('onMove') === true &&
        typeof cfg.onMove === 'function') {
        cfg.onMove(piece, fromSquare, toSquare, manual, myObj.takes, myObj.spec, myObj.replay, myObj.promote, doanim, fast, myObj.premove);
      }

    }

    // Michael -- check if there is check now
    function checkChecked() {
      //....

    }

    // Michael --
    function isPieceOnDiagonal(fromSquare, toSquare) {
      var midSquare = '';
      var midCol;
      var n1 = Math.abs(fromSquare.charCodeAt(0) - toSquare.charCodeAt(0));
      var midpiece;
      //var n2 = Math.abs(fromSquare.charCodeAt(1) - toSquare.charCodeAt(1));
      var isPiece = false;
      var ii = 0;
      if (fromSquare.charCodeAt(1) < toSquare.charCodeAt(1)) { // 1..8
        midCol = fromSquare.charCodeAt(0); //  - '0'.charCodeAt(0);
        //alert('' + midCol + ' ' + (fromSquare.charCodeAt(1) + 1) + ' ' + (toSquare.charCodeAt(1) + 1));
        for (ii = fromSquare.charCodeAt(1) + 1; ii <= toSquare.charCodeAt(1) - 1; ii++) {
          //alert('x');
          if (fromSquare.charCodeAt(0) < toSquare.charCodeAt(0)) // a..h
            midCol++;
          else
            midCol--;
          //alert(midCol);
          //alert(String.fromCharCode(midCol) + String.fromCharCode(ii));
          midpiece = CURRENT_POSITION[String.fromCharCode(midCol) + String.fromCharCode(ii)];
          //alert(midpiece);
          if (midpiece && midpiece != 'undefined' && midpiece.length > 1) {
            isPiece = true;
            break;
          }
        }
      }
      else { // 8..1
        midCol = toSquare.charCodeAt(0); //  - '0'.charCodeAt(0);
        //alert('' + midCol + ' ' + (fromSquare.charCodeAt(1) + 1) + ' ' + (toSquare.charCodeAt(1) + 1));
        for (ii = toSquare.charCodeAt(1) + 1; ii <= fromSquare.charCodeAt(1) - 1; ii++) {
          if (toSquare.charCodeAt(0) < fromSquare.charCodeAt(0)) // a..h
            midCol++;
          else
            midCol--;
          //alert(midCol);
          //alert(String.fromCharCode(midCol) + String.fromCharCode(ii));
          midpiece = CURRENT_POSITION[String.fromCharCode(midCol) + String.fromCharCode(ii)];
          if (midpiece && midpiece != 'undefined' && midpiece.length > 1) {
            isPiece = true;
            break;
          }
        }
      }
      if (isPiece) { } //alert('Piece on diagonal!');
      return isPiece;
    }

    // Michael --
    function moveOnDiagonal(fromSquare, toSquare) {
      var n1 = Math.abs(fromSquare.charCodeAt(0) - toSquare.charCodeAt(0));
      var n2 = Math.abs(fromSquare.charCodeAt(1) - toSquare.charCodeAt(1));
      if (n1 === n2) {
        if (isPieceOnDiagonal(fromSquare, toSquare))
          return false;
        else
          return true;
      }
      else
        return false;
    }

    // Michael --
    function moveByKnight(fromSquare, toSquare) {
      var n1 = Math.abs(fromSquare.charCodeAt(0) - toSquare.charCodeAt(0));
      var n2 = Math.abs(fromSquare.charCodeAt(1) - toSquare.charCodeAt(1));
      //alert(' ' + fromSquare + ' ' + toSquare+' '+n1 + ' ' + n2);
      if (n1 + n2 === 3 && (n1 == 1 || n2 == 1))
        return true;
      else
        return false;
    }

    // Michael --
    function moveByKing(fromSquare, toSquare, wb) {
      var n1 = Math.abs(fromSquare.charCodeAt(0) - toSquare.charCodeAt(0));
      var n2 = Math.abs(fromSquare.charCodeAt(1) - toSquare.charCodeAt(1));

      if (n1 < 2 && n2 < 2 && n1 + n2 < 3 && n1 + n2 > 0)
        return 1;
      else if (toSquare === 'g8' && wb === 'b' && fromSquare == 'e8') {
        var midpiece = CURRENT_POSITION['f8'];
        var rookpiece = CURRENT_POSITION['h8'];
        if (midpiece && midpiece != 'undefined')
          return 0;
        else if (rookpiece && rookpiece === 'bR')
          return 4;
        else
          return 0;
      }
      else if (toSquare === 'c8' && wb === 'b' && fromSquare == 'e8') {
        var midpiece = CURRENT_POSITION['d8'];
        var midpiece2 = CURRENT_POSITION['b8'];
        var rookpiece = CURRENT_POSITION['a8'];
        if (midpiece && midpiece != 'undefined')
          return 0;
        else if (midpiece2 && midpiece2 != 'undefined')
          return 0;
        else if (rookpiece && rookpiece === 'bR')
          return 5;
        else
          return 0;
      }
      else if (toSquare === 'g1' && wb === 'w' && fromSquare == 'e1') {
        var midpiece = CURRENT_POSITION['f1'];
        var rookpiece = CURRENT_POSITION['h1'];
        if (midpiece && midpiece != 'undefined')
          return 0;
        else if (rookpiece && rookpiece === 'wR')
          return 4;
        else
          return 0;
      }
      else if (toSquare === 'c1' && wb === 'w' && fromSquare == 'e1') {
        var midpiece = CURRENT_POSITION['d1'];
        var midpiece2 = CURRENT_POSITION['b1'];
        var rookpiece = CURRENT_POSITION['a1'];
        if (midpiece && midpiece != 'undefined')
          return 0;
        else if (midpiece2 && midpiece2 != 'undefined')
          return 0;
        else if (rookpiece && rookpiece === 'wR')
          return 5;
        else
          return 0;
      }
      else
        return 0;
    }

    // Michael -- returns 2 for empassant , 3 for promote
    function moveByPawn(fromSquare, toSquare, wb, taking) {
      //var n1 = Math.abs(fromSquare.charCodeAt(0) - toSquare.charCodeAt(0));
      //
      var mahpil = 1;
      if (wb === 'b') mahpil = -1;
      //alert(mahpil);
      var rc = 1;
      var n2 = (toSquare.charCodeAt(1) - fromSquare.charCodeAt(1)) * mahpil;
      var nfr1 = fromSquare.charCodeAt(0);

      //if (wb === 'w')
      //alert('' + prevMovePiece +' '+' '+prevMoveTarget+' '+ prevMoveSource + n2 + ' ' + wb + ' ' + Math.abs(fromSquare.charCodeAt(0) - toSquare.charCodeAt(0)));

      // empassant ?
      if (Math.abs(fromSquare.charCodeAt(0) - toSquare.charCodeAt(0)) == 1 && prevMovePiece[1] == 'P') {

        var np2 = Math.abs(prevMoveTarget.charCodeAt(1) - prevMoveSource.charCodeAt(1));
        //alert('Check emp np2='+np2);
        if (np2 == 2) {
          if ((toSquare[1] === '3' && fromSquare[1] == '4' && wb === 'b') || (toSquare[1] === '6' && fromSquare[1] == '5' && wb === 'w')) {
            if (toSquare[0] == prevMoveTarget[0]) {
              //alert('emp!');
              return 2;
            }
          }
        }
      }
      if (fromSquare[0] != toSquare[0] && !taking)
        return 0;
      if (fromSquare[0] == toSquare[0] && taking)
        return 0;
      // same column




      var midpiece;
      // taking
      if (taking && Math.abs(fromSquare.charCodeAt(0) - toSquare.charCodeAt(0)) == 1 && n2 == 1)
        rc = 1;
      else if (taking)
        return 0;

      // emassant not finished !!!!!!!!!!!!!!!!!!!!!



      else if (n2 == 1)
        rc = 1;
      else if (n2 == 2 && fromSquare[1] === '7' && wb === 'b') {
        midpiece = CURRENT_POSITION[fromSquare[0] + '6'];
        if (midpiece && midpiece != 'undefined' && midpiece.length > 1)
          return 0;
        else
          return 1;
      }
      else if (n2 == 2 && fromSquare[1] === '2' && wb === 'w') {
        midpiece = CURRENT_POSITION[fromSquare[0] + '3'];
        if (midpiece && midpiece != 'undefined' && midpiece.length > 1)
          return 0;
        else
          return 1;
      }
      else
        return 0;

      if (toSquare[1] === '8' && wb === 'w')
        rc = 3;
      if (toSquare[1] === '1' && wb === 'b')
        rc = 3;

      return rc;
    }

    function isPieceOnColumn(fromSquare, toSquare) {
      var midSquare = '';
      var midCol;
      //var n1 = Math.abs(fromSquare.charCodeAt(0) - toSquare.charCodeAt(0));
      var midpiece;
      //var n2 = Math.abs(fromSquare.charCodeAt(1) - toSquare.charCodeAt(1));
      var isPiece = false;
      var ii = 0;
      if (fromSquare.charCodeAt(1) < toSquare.charCodeAt(1)) { // 1..8
        midCol = fromSquare.charCodeAt(0); //  - '0'.charCodeAt(0);
        //alert('' + midCol + ' ' + (fromSquare.charCodeAt(1) + 1) + ' ' + (toSquare.charCodeAt(1) + 1));
        for (ii = fromSquare.charCodeAt(1) + 1; ii <= toSquare.charCodeAt(1) - 1; ii++) {

          //alert(String.fromCharCode(midCol) + String.fromCharCode(ii));
          midpiece = CURRENT_POSITION[String.fromCharCode(midCol) + String.fromCharCode(ii)];
          //alert(midpiece);
          if (midpiece && midpiece != 'undefined' && midpiece.length > 1) {
            isPiece = true;
            break;
          }
        }
      }
      else { // 8..1
        midCol = toSquare.charCodeAt(0); //  - '0'.charCodeAt(0);
        //alert('' + midCol + ' ' + (fromSquare.charCodeAt(1) + 1) + ' ' + (toSquare.charCodeAt(1) + 1));
        for (ii = toSquare.charCodeAt(1) + 1; ii <= fromSquare.charCodeAt(1) - 1; ii++) {

          //alert(String.fromCharCode(midCol) + String.fromCharCode(ii));
          midpiece = CURRENT_POSITION[String.fromCharCode(midCol) + String.fromCharCode(ii)];
          if (midpiece && midpiece != 'undefined' && midpiece.length > 1) {
            isPiece = true;
            break;
          }
        }
      }
      if (isPiece) { } //alert('Piece on diagonal!');
      return isPiece;
    }

    function isPieceOnRow(fromSquare, toSquare) {
      var midSquare = '';
      var midRow;
      //var n1 = Math.abs(fromSquare.charCodeAt(0) - toSquare.charCodeAt(0));
      var midpiece;
      //var n2 = Math.abs(fromSquare.charCodeAt(1) - toSquare.charCodeAt(1));
      var isPiece = false;
      var ii = 0;
      if (fromSquare.charCodeAt(0) < toSquare.charCodeAt(0)) { // a..h
        midRow = fromSquare.charCodeAt(1);
        //alert('' + midCol + ' ' + (fromSquare.charCodeAt(1) + 1) + ' ' + (toSquare.charCodeAt(1) + 1));
        for (ii = fromSquare.charCodeAt(0) + 1; ii <= toSquare.charCodeAt(0) - 1; ii++) {

          //alert(String.fromCharCode(midCol) + String.fromCharCode(ii));
          midpiece = CURRENT_POSITION[String.fromCharCode(ii) + String.fromCharCode(midRow)];
          //alert(midpiece);
          if (midpiece && midpiece != 'undefined' && midpiece.length > 1) {
            isPiece = true;
            break;
          }
        }
      }
      else { // h..a
        midRow = toSquare.charCodeAt(1);
        //alert('' + midCol + ' ' + (fromSquare.charCodeAt(1) + 1) + ' ' + (toSquare.charCodeAt(1) + 1));
        for (ii = toSquare.charCodeAt(0) + 1; ii <= fromSquare.charCodeAt(0) - 1; ii++) {

          //alert(String.fromCharCode(midCol) + String.fromCharCode(ii));
          midpiece = CURRENT_POSITION[String.fromCharCode(ii) + String.fromCharCode(midRow)];
          if (midpiece && midpiece != 'undefined' && midpiece.length > 1) {
            isPiece = true;
            break;
          }
        }
      }
      if (isPiece) { } //alert('Piece on diagonal!');
      return isPiece;
    }

    // Michael --
    function moveOnColumn(fromSquare, toSquare) {
      if (fromSquare[0] === toSquare[0]) {
        if (isPieceOnColumn(fromSquare, toSquare))
          return false;
        else
          return true;
      }
      else
        return false;
    }



    // Michael --
    function moveOnRow(fromSquare, toSquare) {
      if (fromSquare[1] === toSquare[1]) {
        if (isPieceOnRow(fromSquare, toSquare))
          return false;
        else
          return true;
      }
      else
        return false;
    }
    // Michael --
    function moveIsLegal(piece, fromSquare, toSquare, manual, myObj) {
      if (cfg.hasOwnProperty('checkLegal') === true && cfg.checkLegal === true) {
        // check here the legailty of the move !!
        var wb = piece[0];
        var pieceN = piece[1];
        //alert(pieceN + ' ' + LAST_MOVE_COLOR);
        var legal = false;
        var specialMove = 0;  // 0=illegal 1=legal_regular 2=empassant 3=promote 4=short_castle 5=long_castle
        // 
        if (cfg.hasOwnProperty('checkTurn') === true && cfg.checkTurn === true) {
          if (wb === LAST_MOVE_COLOR) {
            legal = false;
            return legal;
          }
        }
        //alert(' PLAY_ONLY_COLOR=' + PLAY_ONLY_COLOR + ' LAST_MOVE_COLOR=' + LAST_MOVE_COLOR + ' cfg.playOneColor=' + cfg.playOneColor);
        if (cfg.hasOwnProperty('playOneColor') === true && cfg.playOneColor === true && PLAY_ONLY_COLOR != '' && !manual) {
          if (PLAY_ONLY_COLOR === LAST_MOVE_COLOR) {
            legal = false;
            //alert('illegal color! PLAY_ONLY_COLOR=' + PLAY_ONLY_COLOR + ' LAST_MOVE_COLOR=' + LAST_MOVE_COLOR);
            return legal;
          }
        }

        var prevpiece = CURRENT_POSITION[toSquare];
        var taking = 0; if (prevpiece && prevpiece != 'undefined') if (prevpiece.length > 1) taking = 1;
        // black piece
        //alert(prevpiece);
        // taking himself ?
        if (taking) {
          if (prevpiece[0] == wb) {
            //legal = false;
            return 0;
          }
          myObj.takes = 1;
        }
        switch (pieceN) {
          case 'P':
            specialMove = moveByPawn(fromSquare, toSquare, wb, taking);
            //alert(memp);
            legal = specialMove > 0;

            if (specialMove == 2) {
              // empassant
            }
            else if (specialMove == 3) { // promote
              if (!manual) {
                if (cfg.hasOwnProperty('onPromote') === true &&
                  typeof cfg.onPromote === 'function') {
                  cfg.onPromote(wb, fromSquare, toSquare, myObj.takes);
                  return -10;
                }

              }
            }
            break;
          case 'N':
            legal = moveByKnight(fromSquare, toSquare);
            break;
          case 'B':
            legal = moveOnDiagonal(fromSquare, toSquare);
            break;
          case 'Q':
            legal = moveOnDiagonal(fromSquare, toSquare) || moveOnColumn(fromSquare, toSquare) || moveOnRow(fromSquare, toSquare);
            break;
          case 'K':
            specialMove = moveByKing(fromSquare, toSquare, wb);
            legal = specialMove > 0;
            // specialMove==4/5-> castles
            break;
          case 'R':
            legal = moveOnColumn(fromSquare, toSquare) || moveOnRow(fromSquare, toSquare);
            break;
          default:
            //legal = false;
            return 0;
            break;

        }
        if (legal && specialMove == 0)
          return 1;
        else if (legal && specialMove > 0) {
          //if (specialMove>1)
          //alert('special:' + specialMove);
          return specialMove;
        }
        else
          return 0;

      }
      else
        return 1;
    }




    function isXYOnSquare(x, y) {
      for (var i in SQUARE_ELS_OFFSETS) {
        if (SQUARE_ELS_OFFSETS.hasOwnProperty(i) !== true) continue;

        var s = SQUARE_ELS_OFFSETS[i];
        if (x >= s.left && x < s.left + SQUARE_SIZE &&
          y >= s.top && y < s.top + SQUARE_SIZE) {
          return i;
        }
      }

      return 'offboard';
    }

    // records the XY coords of every square into memory
    function captureSquareOffsets() {
      SQUARE_ELS_OFFSETS = {};

      for (var i in SQUARE_ELS_IDS) {
        if (SQUARE_ELS_IDS.hasOwnProperty(i) !== true) continue;

        SQUARE_ELS_OFFSETS[i] = $('#' + SQUARE_ELS_IDS[i]).offset();
      }
    }

    function removeSquareHighlights() {
      if (!DragHlight) return;
      boardEl.find('.' + CSS.square)
        .removeClass(CSS.highlight1 + ' ' + CSS.highlight2);
    }
    // newgpt
    function clearHighlights() {
      document.querySelectorAll(
        '.' + CSS.highlight1 + ', .' + CSS.highlight2
      ).forEach(el => {
        el.classList.remove(CSS.highlight1);
        el.classList.remove(CSS.highlight2);
      });
    }
    function snapbackDraggedPiece() {
      // there is no "snapback" for spare pieces
      if (DRAGGED_PIECE_SOURCE === 'spare') {
        trashDraggedPiece();
        return;
      }

      removeSquareHighlights();

      // animation complete
      function complete() {
        drawPositionInstant();
        draggedPieceEl.css('display', 'none');

        // run their onSnapbackEnd function
        if (cfg.hasOwnProperty('onSnapbackEnd') === true &&
          typeof cfg.onSnapbackEnd === 'function') {
          cfg.onSnapbackEnd(DRAGGED_PIECE, DRAGGED_PIECE_SOURCE,
            deepCopy(CURRENT_POSITION), CURRENT_ORIENTATION);
        }
      }

      // get source square position
      var sourceSquarePosition =
        $('#' + SQUARE_ELS_IDS[DRAGGED_PIECE_SOURCE]).offset();

      // animate the piece to the target square
      var opts = {
        duration: cfg.snapbackSpeed,
        complete: complete
      };
      draggedPieceEl.animate(sourceSquarePosition, opts);

      // set state
      DRAGGING_A_PIECE = false;
    }

    function trashDraggedPiece() {
      removeSquareHighlights();

      // remove the source piece
      var newPosition = deepCopy(CURRENT_POSITION);
      delete newPosition[DRAGGED_PIECE_SOURCE];
      setCurrentPosition(newPosition);

      // redraw the position
      drawPositionInstant();

      // hide the dragged piece
      draggedPieceEl.fadeOut(cfg.trashSpeed);

      // set state
      DRAGGING_A_PIECE = false;
    }
    // Michael
    function justTransferDraggedPiece(square) {
      if (!DRAGGED_PIECE || DRAGGED_PIECE == null) return;
      removeSquareHighlights();
      // update position
      var newPosition = deepCopy(CURRENT_POSITION);
      delete newPosition[DRAGGED_PIECE_SOURCE];
      newPosition[square] = DRAGGED_PIECE;
      CURRENT_POSITION = deepCopy(newPosition);
      DRAGGING_A_PIECE = false;
      draggedPieceEl.css('display', 'none');
      drawBoard();
    }
    function squareToFileRank(sq) {
      var file = sq.charCodeAt(0) - 'a'.charCodeAt(0); // 0..7
      var rank = parseInt(sq[1], 10) - 1;             // '1'->0, '8'->7
      return { file: file, rank: rank };
    }

    function fileRankToSquare(file, rank) {
      return String.fromCharCode('a'.charCodeAt(0) + file) + (rank + 1);
    }

    function justTransferFromTo(frsquare, tosquare, prompc) {
      removeSquareHighlights();

      var pc = CURRENT_POSITION[frsquare];
      if (prompc)
        pc = prompc;

      // Make a copy
      var newPosition = deepCopy(CURRENT_POSITION);

      // Remove piece from original square
      delete newPosition[frsquare];

      // Place piece on target square
      newPosition[tosquare] = pc;

      // ----- EN PASSANT CHECK -----
      if (pc === 'wP' || pc === 'bP') {
        var fr = squareToFileRank(frsquare);
        var to = squareToFileRank(tosquare);

        // Only diagonal moves (file changed)
        if (fr.file !== to.file) {

          // White pawn en passant
          if (pc === 'wP' && fr.rank === 4) { // 5th rank
            var capturedSquare = fileRankToSquare(to.file, 4); // 4th rank
            if (newPosition[capturedSquare] === 'bP') {
              delete newPosition[capturedSquare];
            }
          }

          // Black pawn en passant
          if (pc === 'bP' && fr.rank === 3) { // 4th rank
            var capturedSquare = fileRankToSquare(to.file, 3); // 5th rank
            if (newPosition[capturedSquare] === 'wP') {
              delete newPosition[capturedSquare];
            }
          }

        }
      }

//need set this !!!
     var manual=true;var doanim=false;var fast=false;
     var myObj = { takes: 0, spec: 0, replay: 0, promote: prompc, premove: 0 };
      setNewMove(pc, frsquare, tosquare, manual, myObj, doanim, fast); // ned know previous move - e.g. for empassant
      prevMovePiece = pc; prevMoveSource = frsquare; prevMoveTarget = tosquare;

     // LAST_MOVE_COLOR = pc[0]; // already in setNewMove
    
      CURRENT_FEN_COL = LAST_MOVE_COLOR=='w'?'b' : 'w';


      // Update global
      CURRENT_POSITION = deepCopy(newPosition);

      DRAGGING_A_PIECE = false;
      if (draggedPieceEl)
        draggedPieceEl.css('display', 'none');

      drawBoard();
    }



    //function justTransferFromTo(frsquare,tosquare,prompc) {
    //  //if (!DRAGGED_PIECE || DRAGGED_PIECE == null) return;
    //  removeSquareHighlights();
    //  var pc = CURRENT_POSITION[frsquare];
    //  if (prompc)
    //    pc = prompc;
    //  // update position
    //  var newPosition = deepCopy(CURRENT_POSITION);
    //  delete newPosition[frsquare];
    //  newPosition[tosquare] = pc;
    //  CURRENT_POSITION = deepCopy(newPosition);
    //  DRAGGING_A_PIECE = false;
    //  if (draggedPieceEl)
    //    draggedPieceEl.css('display', 'none');
    //  drawBoard();
    //}
    var prevMovePiece = '';
    var prevMoveSource = '';
    var prevMoveTarget = '';

    function checkCheckInThePosition(wb) {
      // if white is moving - check if no check to white king
      // first find king's place

      // the for every other volor piece check if threatening the king

      return false;
    }


    var POINTED_PIECE_SOURCE = '';
    var POINTED_PIECE_TARGET = '';
    function dropDraggedPieceOnSquare(square, manual, doanim, replay, movegiven, eaten, promote, castle, fast, premove1) {
      //alert(DRAGGED_PIECE + ',' + square);
      var LDRAGGED_PIECE = DRAGGED_PIECE;
      var LDRAGGED_PIECE_SOURCE = DRAGGED_PIECE_SOURCE;
      // new1
      if (manual) {
        LDRAGGED_PIECE = DRAGGED_MANPIECE;
        LDRAGGED_PIECE_SOURCE = DRAGGED_MANPIECE_SOURCE;
        POINTED_PIECE_SOURCE = '';
      }
      else {
        if (DRAGGED_PIECE_SOURCE == square && allowPoint) {
          draggedPieceEl.css('display', 'none');
          drawBoard();
          //if (cfg.hasOwnProperty('onBadMove') === true &&
          //    typeof cfg.onBadMove === 'function') {
          //    cfg.onBadMove(0);
          //}

          DRAGGING_A_PIECE = false;
          widget.doReset();
          widget.doEffect(1012, square, square);
          POINTED_PIECE_SOURCE = square;
          return;
        }
      }
      POINTED_PIECE_SOURCE = '';
      if (!LDRAGGED_PIECE || LDRAGGED_PIECE == null) {
        var xx11 = 4333;
        return;
      }
      removeSquareHighlights();

      var myObj = { takes: 0, spec: 0, replay: 0, promote: '', premove: premove1 };
      var specialMove = 1;
      if (movegiven) {
        myObj.takes = eaten;
        myObj.promote = promote.toUpperCase();
        if (eaten == 2) specialMove = 2;
        else if (promote != '') specialMove = 3;
        else if (castle == 1) {
          specialMove = 4;
        }
        else if (castle == 2) {
          specialMove = 5;
        }
        // check empassant !!
        if (LDRAGGED_PIECE[1] == 'P') {
          if (Math.abs(LDRAGGED_PIECE_SOURCE.charCodeAt(0) - square.charCodeAt(0)) == 1 && prevMovePiece[1] == 'P') {

            var np2 = Math.abs(prevMoveTarget.charCodeAt(1) - prevMoveSource.charCodeAt(1));
            //alert('Check emp np2='+np2);
            if (np2 == 2) {
              if ((square[1] === '3' && LDRAGGED_PIECE_SOURCE[1] == '4' && LDRAGGED_PIECE[0] === 'b') || (square[1] === '6' && LDRAGGED_PIECE_SOURCE[1] == '5' && LDRAGGED_PIECE[0] === 'w')) {
                if (square[0] == prevMoveTarget[0]) {
                  //alert('emp!');
                  specialMove = 2;
                }
              }
            }
          }
        }
      }
      else
        specialMove = moveIsLegal(LDRAGGED_PIECE, LDRAGGED_PIECE_SOURCE, square, manual, myObj);
      //alert(specialMove);
      var wb = LDRAGGED_PIECE[0]
      if (specialMove > 0) { // Michael
        // update position
        var newPosition = deepCopy(CURRENT_POSITION);
        delete newPosition[LDRAGGED_PIECE_SOURCE];
        newPosition[square] = LDRAGGED_PIECE;

        if (specialMove > 1) {
          // var wb = LDRAGGED_PIECE[0];
          if (specialMove == 2) { // emp
            delete newPosition[prevMoveTarget];
          }
          else if (wb === 'w' && specialMove == 4) {
            delete newPosition['h1'];
            newPosition['f1'] = 'wR';
          }
          else if (wb === 'w' && specialMove == 5) {
            delete newPosition['a1'];
            newPosition['d1'] = 'wR';
          }
          else if (wb === 'b' && specialMove == 4) {
            delete newPosition['h8'];
            newPosition['f8'] = 'bR';
          }
          else if (wb === 'b' && specialMove == 5) {
            delete newPosition['a8'];
            newPosition['d8'] = 'bR';
          }
          else if (wb === 'w' && specialMove == 3) { // promote
            if (myObj.promote == '') myObj.promote = 'Q';
            delete newPosition[square];
            newPosition[square] = 'w' + myObj.promote.toUpperCase(); // !! Change to wanted piece
          }
          else if (wb === 'b' && specialMove == 3) { // promote
            if (myObj.promote == '') myObj.promote = 'Q';
            delete newPosition[square];
            newPosition[square] = 'b' + myObj.promote.toUpperCase(); // !! Change to wanted piece
          }
        }

        // now check if there is check !

        var ischeck = checkCheckInThePosition(LDRAGGED_PIECE[0]);

        if (!ischeck) {
          setCurrentPosition(newPosition);
          //window.alert('Move piece ' + LDRAGGED_PIECE + ' to ' + square);
          myObj.spec = specialMove; myObj.replay = replay;
          // back func !
          setNewMove(LDRAGGED_PIECE, LDRAGGED_PIECE_SOURCE, square, manual, myObj, doanim, fast);
          // moveDone(LDRAGGED_PIECE + '-' + LDRAGGED_PIECE_SOURCE+'-'+square);
          //alert(specialMove);
          // get target square information
          var targetSquarePosition = $('#' + SQUARE_ELS_IDS[square]).offset();

          // animation complete event
          var completeDrop = function () {
            drawPositionInstant();
            //if (!manual) { // ???
            draggedPieceEl.css('display', 'none');
            //}
            //else {
            //    var x1 = 55555;
            //}

            prevMovePiece = LDRAGGED_PIECE; prevMoveSource = LDRAGGED_PIECE_SOURCE; prevMoveTarget = square;
            // execute their onSnapEnd function
            if (cfg.hasOwnProperty('onSnapEnd') === true &&
              typeof cfg.onSnapEnd === 'function') {
              cfg.onSnapEnd(LDRAGGED_PIECE_SOURCE, square, LDRAGGED_PIECE);
            }
          };

          if (manual) {
            var xx1 = 111;
          }
          // snap the piece to the target square
          // new1 try !!! 300520
          if (manual)
            doanim = false;
          if (doanim) {
            var opts = {
              duration: cfg.snapSpeed,
              complete: completeDrop
            };

            draggedPieceEl.animate(targetSquarePosition, opts);
            prevMovePiece = LDRAGGED_PIECE; prevMoveSource = LDRAGGED_PIECE_SOURCE; prevMoveTarget = square;
            if (cfg.hasOwnProperty('onMoveEnd') === true &&
              typeof cfg.onMoveEnd === 'function') {
              cfg.onMoveEnd();
            }
          }
          else {            


            drawPositionInstantWB(wb, square);
            // new1 try remove
            if (!manual) {
              draggedPieceEl.css('display', 'none');
            }
            else {
              // continue drag - I am dragging adter opp move
              var xx1 = 4444;
            }
            // }
            prevMovePiece = LDRAGGED_PIECE; prevMoveSource = LDRAGGED_PIECE_SOURCE; prevMoveTarget = square;
            // run their onMoveEnd function
            if (cfg.hasOwnProperty('onMoveEnd') === true &&
              typeof cfg.onMoveEnd === 'function') {
              cfg.onMoveEnd();
            }
          }


        }
        // set state
        if (!manual)
          DRAGGING_A_PIECE = false;
        else
          DRAGGING_A_MANPIECE = false;
      }
      else if (specialMove == -10) {
        //wait for responce - promote

        draggedPieceEl.css('display', 'none');
        drawBoard();
        // DRAGGING_A_PIECE = false;
        if (!manual)
          DRAGGING_A_PIECE = false;
        else
          DRAGGING_A_MANPIECE = false;
      }
      else { // Michael

        draggedPieceEl.css('display', 'none');
        drawBoard();
        if (cfg.hasOwnProperty('onBadMove') === true &&
          typeof cfg.onBadMove === 'function') {
          cfg.onBadMove(0);
        }
        // DRAGGING_A_PIECE = false;
        if (!manual)
          DRAGGING_A_PIECE = false;
        else
          DRAGGING_A_MANPIECE = false;
      }
    }

    // here only for my drag-not opp
    function beginDraggingPiece(source, piece, x, y) {
      // run their custom onDragStart function
      // their custom onDragStart function can cancel drag start
      if (typeof cfg.onDragStart === 'function' && cfg.onDragStart(source, piece, null, CURRENT_ORIENTATION) === false)
        // cfg.onDragStart(source, piece, deepCopy(CURRENT_POSITION), CURRENT_ORIENTATION) === false)
        return;


      // set state
      DRAGGING_A_PIECE = true;
      DRAGGED_PIECE = piece;
      DRAGGED_PIECE_SOURCE = source;

      // if the piece came from spare pieces, location is offboard
      if (source === 'spare') {
        DRAGGED_PIECE_LOCATION = 'offboard';
      }
      else {
        DRAGGED_PIECE_LOCATION = source;
      }

      // capture the x, y coords of all squares in memory
      captureSquareOffsets();

      // create the dragged piece
      draggedPieceEl.attr('src', buildPieceImgSrc(piece))
        .css({
          display: '',
          position: 'absolute',
          cursor: 'pointer',
          left: x - (SQUARE_SIZE / 2),
          top: y - (SQUARE_SIZE / 2)
        });

      if (source !== 'spare') {
        // highlight the source square and hide the piece
        //alert('high:'+source);
        if (DragHlight) {
          $('#' + SQUARE_ELS_IDS[source]).addClass(CSS.highlight1)
            .find('.' + CSS.piece).css('display', 'none');
        }
        else
          $('#' + SQUARE_ELS_IDS[source]).find('.' + CSS.piece).css('display', 'none');
      }
    }

    function updateDraggedPiece(x, y) {
      // put the dragged piece over the mouse cursor
      // my remove .......
      draggedPieceEl.css({
        left: x - (SQUARE_SIZE / 2),
        top: y - (SQUARE_SIZE / 2)
      });

      // get location
      var location = isXYOnSquare(x, y);

      // do nothing if the location has not changed
      if (location === DRAGGED_PIECE_LOCATION) return;

      // remove highlight from previous square
      if (DragHlight) {
        if (validSquare(DRAGGED_PIECE_LOCATION) === true) {
          $('#' + SQUARE_ELS_IDS[DRAGGED_PIECE_LOCATION])
            .removeClass(CSS.highlight2);
        }



        // add highlight to new square
        if (validSquare(location) === true) {
          $('#' + SQUARE_ELS_IDS[location]).addClass(CSS.highlight2);

          // my addition ------
          //var srcSquareEl = $('#' + SQUARE_ELS_IDS[location]);
          //var srcSquarePosition = srcSquareEl.offset();
          //draggedPieceEl.css({
          //    left: srcSquarePosition.left,
          //    top: srcSquarePosition.top
          //});

        }
      }
      // run onDragMove
      if (typeof cfg.onDragMove === 'function') {
        cfg.onDragMove(location, DRAGGED_PIECE_LOCATION,
          DRAGGED_PIECE_SOURCE, DRAGGED_PIECE,
          deepCopy(CURRENT_POSITION), CURRENT_ORIENTATION);
      }

      // update state
      DRAGGED_PIECE_LOCATION = location;
    }

    function stopDraggedPiece(location) {
      // determine what the action should be
      var action = 'drop';
      if (location === 'offboard' && cfg.dropOffBoard === 'snapback') {
        action = 'snapback';
      }
      if (location === 'offboard' && cfg.dropOffBoard === 'trash') {
        action = 'trash';
      }

      // run their onDrop function, which can potentially change the drop action
      if (cfg.hasOwnProperty('onDrop') === true &&
        typeof cfg.onDrop === 'function') {
        var newPosition = deepCopy(CURRENT_POSITION);

        // source piece is a spare piece and position is off the board
        //if (DRAGGED_PIECE_SOURCE === 'spare' && location === 'offboard') {...}
        // position has not changed; do nothing

        // source piece is a spare piece and position is on the board
        if (DRAGGED_PIECE_SOURCE === 'spare' && validSquare(location) === true) {
          // add the piece to the board
          newPosition[location] = DRAGGED_PIECE;
        }

        // source piece was on the board and position is off the board
        if (validSquare(DRAGGED_PIECE_SOURCE) === true && location === 'offboard') {
          // remove the piece from the board
          delete newPosition[DRAGGED_PIECE_SOURCE];
        }

        // source piece was on the board and position is on the board
        if (validSquare(DRAGGED_PIECE_SOURCE) === true &&
          validSquare(location) === true) {
          // move the piece
          delete newPosition[DRAGGED_PIECE_SOURCE];
          newPosition[location] = DRAGGED_PIECE;
        }

        var oldPosition = deepCopy(CURRENT_POSITION);

        var result = cfg.onDrop(DRAGGED_PIECE_SOURCE, location, DRAGGED_PIECE,
          newPosition, oldPosition, CURRENT_ORIENTATION);
        if (result === 'snapback' || result === 'trash' || result === 'transfer') {
          action = result;
        }
      }

      // do it!
      if (action === 'snapback') {
        snapbackDraggedPiece();
      }
      else if (action === 'transfer') {
        justTransferDraggedPiece(location);

        if (cfg.hasOwnProperty('onMoveEnd') === true &&
          typeof cfg.onMoveEnd === 'function') {
          cfg.onMoveEnd();
        }
      }
      else if (action === 'trash') {
        trashDraggedPiece();
      }
      else if (action === 'drop') {
        dropDraggedPieceOnSquare(location, false, true, 0, 0, 0, '', 0, 0);
      }
    }

    //------------------------------------------------------------------------------
    // Public Methods
    //------------------------------------------------------------------------------

    widget.setSQ = function (sq1) {
      var sq = parseInt(sq1);
      if (sq >= 0 && sq < 20) {
        CSS.white = 'white-1e1d7' + sq;
        CSS.black = 'black-3c85d' + sq;
      }
    }

    widget.setScrollLocked = function (islocked) {
      //scrollLocked=islocked;
    }
    // clear the board
    widget.clear = function (useAnimation) {
      widget.position({}, useAnimation);
    };


    // Michael
    function mask(str) {
      return str.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
    }
    function trim(str) {
      return str.replace(/^\s+|\s+$/g, '');
    }
    widget.cbToFullPgn = function (cbmove) {
      if (cbmove == '') return '';
      var marr = cbmove.split('-');
      DRAGGED_PIECE = marr[0];
      DRAGGED_PIECE_SOURCE = marr[1];
      var square = marr[2];
      if (square.length > 2) square = square.substr(0, 2);
      if (DRAGGED_PIECE.length > 1) {
        return DRAGGED_PIECE[1].toLowerCase() + DRAGGED_PIECE_SOURCE + '-' + square; // ?? castle
      } else return '';
    }

    widget.movCBObjToPgn = function (mov) {
      // return pieceCode(mov.OriginalPiece, false) + SQUARES[mov.StartPos] + '-' + board.SQUARES[mov.EndPos];
    }
    widget.squareNum = function (pos) {
      return SQUARES[pos];
    }
    widget.squareNumNor = function (pos) {
      return SQUARESNOR[pos];
    }

    widget.pieceCodeIndex = function (piece) {
      var ind = PieceCodes.indexOf(piece);
      if (ind < 0) return 0;
      else return ind + 1;
    }
    /* .move({ from: 'h7', <- where the 'move' is a move object (additional
    *         to :'h8',      fields are ignored)
    *         promotion: 'q',
    *      })
    */
    function chess_al_move(turn, piece, from, to, flags, promotion, captured) {
      var move = {
        //color: turn, // ...
        from: algebraic(from),
        to: algebraic(to),
        promotion: promotion

      };

      return move;
    }
    function chess_move(turn, piece, from, to, flags, promotion, captured) {
      var move = {
        color: turn,
        from: from,
        to: to,
        flags: flags,
        piece: piece
      };

      if (promotion) {
        move.flags |= BITS.PROMOTION;
        move.promotion = promotion;
      }

      if (captured > 0) {
        move.captured = 'p'; // .....
      }
      return move;
    }
    function getCIRemGliph(st) {
      switch (st) {
        case '3C':
          return 'passed pawn';
        case '5C':
          return 'diagonal';
        case '5E':
          return 'weak point';
        case '7C':
          return 'with counter-play';
        case '7E':
          return 'file';
        case '81':
          return 'queens side';
        case '82':
          return 'kings side';
        case 'A2':
          return 'white stands slightly better';
        case 'A3':
          return 'black stands slightly better';
        case 'A4':
          return 'black has the upper hand';
        case 'A5':
          return 'white has the upper hand';
        case 'A7':
          return 'with compensation for the material';
        case 'B0':
          return 'time';
        case 'B6':
          return 'development advantage';
        case 'BF':
          return 'centre';
        case 'C1':
          return 'greater board room';
        case 'C2':
          return 'zugzwang';
        case 'C4':
          return 'better is';
        case 'C5':
          return 'with the idea';
        case 'C8':
          return '♔';
        case 'CA':
          return '♕';
        case 'CB':
          return '♖';
        case 'CC':
          return '♗';
        case 'CD':
          return '♘';
        case 'CE':
          return '♙';
        case 'CF':
          return 'ending';
        case 'D2':
          return '♗♗ pair'; // pair
        case 'D3':
          return '♗♝'; //  bishops of opposite color
        case 'D4':
          return '♗♗ same color';
        case 'D5':
          return 'unclear';
        case 'EC':
          return 'only move';
        case 'EE':
          return 'with initiative';
        case 'EF':
          return 'with attack';
        default:
          return '';
      }
    }



    function getRemGliph(num) {
      switch (num) {
        case 1:
          return '&#33;';
        case 2:
          return '&#63;';
        case 3:
          return '‼';
        case 4:
          return '??';
        case 5:
          return '⁉';
        case 6:
          return '⁈';
        case 7:
          return '□';
        case 8:
          return '□';
        case 9:
          return 'worst move';
        case 10:
          return '='; //drawish position or even &#61;
        case 11:
          return '='; //equal chances, quiet position
        case 12:
          return '∞'; //equal chances, active position
        case 13:
          return '∞'; //unclear position
        case 14:
          return '⩲';
        case 15:
          return '⩱';
        case 16:
          return '±';
        case 17:
          return '∓';

        case 18:
          return '+−';
        case 19:
          return '−+';
        case 22:
          return '⨀';
        case 23:
          return '⨀';


        case 32:
          return '⟳';
        case 33:
          return '⟳';
        case 36:
          return '→';
        case 37:
          return '→';
        case 40:
          return '↑';

        case 40:
          return '↑';
        case 41:
          return '↑';
        case 132:
          return '⇆';
        case 133:
          return '⇆';

        case 140:
          return '∆';
        case 142:
          return '⌓';
        case 145:
          return 'RR';
        case 146:
          return 'N';

        case 239:
          return '⇔';
        case 240:
          return '⇗';
        case 242:
          return '⟫';
        case 243:
          return '⟪';

        case 244:
          return '✕';
        case 245:
          return '⊥';

        // https://en.wikipedia.org/wiki/Numeric_Annotation_Glyphs
        case 140:
          return '∆';
        case 142:
          return '⌓';
        case 145:
          return 'RR';
        case 146:
          return 'N';



        //case 140:
        //    return 'With the idea'; 
        case 141:
          return '&nbsp;Aimed against';
        //case 142:
        //    return 'Better';
        case 143:
          return '&nbsp;Worse';
        case 144:
          return '&nbsp;Equivalent';
        //case 145:
        //    return 'Editorial comment';
        //case 146:
        //    return 'Novelty';
        //case 220:
        //    return 'Diagram';

        default:
          return num;
      }
    }



    // engine move  e2e4   or e7e8q  or e5f6 -> to chess.js move
    widget.engToCMove = function (wb, piece, engmove, out) {
      var wbStr = '';
      var fromMovStr = engmove.substring(0, 2);
      var toMovStr = engmove.substring(2, 4);
      var after = '';
      if (engmove.length > 4) {
        after = engmove.substring(4);
        if (after) {
          after = after.replace('=', ''); //?
          if (after == 'q' || after == 'r' || after == 'b' || after == 'n') after = after.toUpperCase();
        }
      }
      if (wb == 1)
        wbStr = 'w';
      else
        wbStr = 'b';
      var cbmove = wbStr + piece.toUpperCase() + '-' + fromMovStr + '-' + toMovStr + after; // ???
      return this.cbToCMove(cbmove, out);
    }

    widget.cbToCMove = function (cbmove, out, longNot, wbs) { // bK-e8-g8 -> to chess.js move  wN-b1-c2
      // wbs mainly for o-o
      if (cbmove == '') return '';
      if (longNot) {
        var p1 = cbmove.indexOf('-');
        var p2 = cbmove.indexOf('X');
        if ((p1 == 2 || p2 == 2) && cbmove[0] != 'O') // pawn
          cbmove = 'P' + cbmove;
      }
      //var parse = move.match(/^([NBKRQ])?([abcdefgh12345678][12345678]?)?(x)?([abcdefgh][12345678])(=?[NBRQ])?/);
      var parse;
      if (longNot)  // Nb1-c2
        parse = cbmove.match(/^()([NBKRQP])()([abcdefgh][12345678])([-x])([abcdefgh][12345678])([x])?([x])?(=?[NBRQ])?/);
      else
        parse = cbmove.match(/^([wb])([NBKRQP])(-)([abcdefgh][12345678])([-x])([abcdefgh][12345678])([x])?([x])?(=?[NBRQ])?/);
      var marr = cbmove.split('-');
      // local not needed
      // var DRAGGED_PIECE = marr[0];
      // var DRAGGED_PIECE_SOURCE = marr[1];
      //var square = marr[2];
      var castle = 0;
      var eaten = 0;
      var to, from, flags = BITS.NORMAL, promotion = '';
      if (cbmove == 'bK-e8-g8') {
        castle = 1;
        from = SQUARES['e8'];
        to = SQUARES['g8'];
        flags = BITS.KSIDE_CASTLE;
      }
      else if (cbmove == 'bK-e8-c8') {
        castle = 2;
        from = SQUARES['e8'];
        to = SQUARES['c8'];
        flags = BITS.QSIDE_CASTLE;
      }
      else if (cbmove == 'wK-e1-g1') {
        castle = 1;
        from = SQUARES['e1'];
        to = SQUARES['g1'];
        flags = BITS.KSIDE_CASTLE;
      }
      else if (cbmove == 'wK-e1-c1') {
        castle = 2;
        from = SQUARES['e1'];
        to = SQUARES['c1'];
        flags = BITS.QSIDE_CASTLE;
      }
      else if (cbmove == 'O-O-O') {
        castle = 2;
        flags = BITS.QSIDE_CASTLE;
        eaten = 0;
        if (wbs == 'w') {
          from = SQUARES['e1'];
          to = SQUARES['c1'];
        }
        else {
          from = SQUARES['e8'];
          to = SQUARES['c8'];
        }
      }
      else if (cbmove == 'O-O') {
        castle = 1;
        flags = BITS.KSIDE_CASTLE;
        eaten = 0;
        if (wbs == 'w') {
          from = SQUARES['e1'];
          to = SQUARES['g1'];
        }
        else {
          from = SQUARES['e8'];
          to = SQUARES['g8'];
        }
      }

      if (castle > 0) {
        out.move = chess_move('', 'k', from, to, flags, promotion, eaten);
        out.almove = chess_al_move('', 'k', from, to, flags, promotion, eaten);
        return 0;
      }

      if (!parse) {
        //var e2 = 'x';
        return -1;
      }
      else if (!parse[2]) {
        var e1 = 'x';
      }
      var piece = '';
      if (parse) piece = parse[2].toLowerCase();
      if (piece == '' && longNot)
        piece = 'p';
      if (parse && parse[3] == 'x') {
        // capture
        flags = BITS.CAPTURE;
      }
      if (parse && parse[4] && parse[6]) {
        from = SQUARES[parse[4]];
        to = SQUARES[parse[6]];
        eaten = 0;
        var eatx = parse[5];
        if ((parse[5] == 'x' || parse[7] == 'x')) { eaten = 1; if (parse[8] == 'x') eaten = 2; }
        //if (square.length > 2) {
        if (parse.length > 3) {

          //if (square[2] == 'x') {
          //    eaten = 1;
          //    if (square.length > 3) if (square[3] == 'x') eaten = 2; // emp
          //}
          //else if (square[2] == '=' && square.length > 3) {
          //    promotion = square[3].toLowerCase();
          //}
          if (parse[7] && parse[7] != 'undefined') {
            //if (parse[7] == '=' && square.length > 3) {
            promotion = parse[7].replace('=', '').toLowerCase();
            // ?
            if (promotion == '' && parse[8] && parse[8] != 'undefined') {
              promotion = parse[8].replace('=', '').toLowerCase();
            }
            //}
          }
          // promotion?
          if (promotion == '') {
            if (parse[9]) {
              if (typeof parse[9][1] == 'undefined') {
                promotion = parse[9][0].toLowerCase();
              } else {
                promotion = parse[9][1].toLowerCase();
              }
            }
          }

        }

      }
      if (promotion != '') {
        var stam = 1;
      }
      if (from >= 0 && to >= 0 && flags) {
        out.move = chess_move(parse[1], parse[2].toLowerCase(), from, to, flags, promotion, eaten);
        out.almove = chess_al_move(parse[1], parse[2].toLowerCase(), from, to, flags, promotion, eaten);
      } else if (move.length > 0) {
        /* alert(move); // error in PGN, or in parsing. */
        ///return ..
      }
      return 0;
    }
    // from chess format
    widget.fromChessMove = function (move) {
      if (move == null) return '';
      var cbmove = move.color + move.piece.toUpperCase() + '-' + move.from + '-' + move.to;
      if (move.captured) if (move.captured != '') { cbmove += 'x'; }
      if (move.promotion) if (move.promotion != '') { cbmove += '=' + move.promotion.toUpperCase(); }

      return cbmove;
    }
    // simple parse, to validity check
    widget.parsePgnToArr = function (pgn, options) {
      if (!pgn && pgn == null) pgn = '';
      var newline_char = (typeof options === 'object' &&
        typeof options.newline_char === 'string') ?
        options.newline_char : '\r?\n';
      var regex = new RegExp('^(\\[(.|' + mask(newline_char) + ')*\\])' +
        '(' + mask(newline_char) + ')*' +
        '1.(' + mask(newline_char) + '|.)*$', 'g');

      /* get header part of the PGN file */
      var header_string = pgn.replace(regex, '$1');

      /* no info part given, begins with moves */
      if (header_string[0] !== '[') {
        header_string = '';
      }
      /* delete header to get the moves */
      var ms = pgn.replace(header_string, '').replace(new RegExp(mask(newline_char), 'g'), ' ');
      /* delete comments */
      ms = ms.replace(/(\{[^}]+\})+?/g, '');

      //!!!!!!!!! 
      // may be take in future my code from chess.load_pgn() !!!

      // my addition - if starts black
      ms = ms.replace(/\d+\.\s\.\.\./g, '');
      ms = ms.replace(/\d+\s\.\.\./g, '');
      ms = ms.replace(/\d+\.\s\.\./g, '');
      ms = ms.replace(/\d+\.\.\./g, '');
      ms = ms.replace(/\d+\.\./g, '');
      // delete move numbers  
      ms = ms.replace(/\d+\./g, '');


      /* trim and get array of moves */
      var moves = trim(ms).split(new RegExp(/\s+/));
      /* delete empty entries */
      moves = moves.join(',').replace(/,,+/g, ',').split(',');
      return moves;
    }

    // Michael --
    widget.doPromote = function (piece, wb, fsquare, tsquare, takes1) {
      //myObj.promote
      //alert(piece);
      var PREV_POSITION1 = deepCopy(CURRENT_POSITION);
      delete CURRENT_POSITION[fsquare];
      delete CURRENT_POSITION[tsquare];
      CURRENT_POSITION[tsquare] = wb + piece;
      //var PREV_POSITION1 = deepCopy(PREV_POSITION);
      setCurrentPosition(CURRENT_POSITION);
      PREV_POSITION = deepCopy(PREV_POSITION1);
      drawPositionInstant();
      var myObj = { takes: takes1, spec: 3, replay: 0, promote: piece, premove: 0 };
      setNewMove(wb + 'P', fsquare, tsquare, 0, myObj, 0, 0);
      // cfg.onMove(piece, fromSquare, toSquare, manual, myObj.takes, myObj.spec, myObj.replay);
    }

    // Michael --
    widget.replaceDolarRemark = function (rem) {
      var n; var p; var pp; var p1; var p2; var remst = ''; var txt1 = '';

      // replace '#' notation
      for (n = 1; n < 10; n++) {
        p = rem.indexOf('#');
        if (p >= 0) {
          pp = rem.indexOf(' ', p + 1);
          if (pp > 0) {
            txt1 = rem.substring(p, pp);

          }
          else {
            txt1 = rem.substring(p);
          }
          var spec = '';
          try {
            spec = txt1.substring(1);
          } catch (e) { }
          var repl = '';
          if (spec != '') {
            if (spec.length > 2) {
              repl = getCIRemGliph(spec.substring(0, 2));
              if (repl == '')
                remst = spec; // as is
              else
                remst = repl + spec.substring(2);
            }
            else if (spec.length == 2) {
              repl = getCIRemGliph(spec);
              if (repl == '')
                remst = spec; // as is
              else
                remst = repl;
            }
            else // <2
              remst = spec; // as is
          }
          else
            remst = '#'; // mate ??
          // replace
          if (pp > 0)
            rem = rem.substring(0, p) + remst + rem.substring(pp);

          else rem = rem.substring(0, p) + remst;
        }
      }
      // $
      for (n = 1; n < 10; n++) {
        p = rem.indexOf('$');
        remst = '';
        if (p >= 0) {
          pp = rem.indexOf(' ', p + 1);
          if (pp > 0) {
            txt1 = rem.substring(p, pp);

          }
          else {
            txt1 = rem.substring(p);
          }

          var p1 = txt1.indexOf('(');
          if (p1 > 0) { // $1000(1,5)
            var p2 = txt1.indexOf(')');
            if (p2 > 0) {
              var cmd = parseInt(txt1.substring(1, p1));
              var par1 = txt1.substring(p1 + 1, p2);
              var par2 = '';
              var p3 = par1.indexOf(',');
              if (p3 > 0) {
                par2 = par1.substring(p3 + 1);
                par1 = par1.substring(0, p3);
              }
              //doEffect(cmd, par1, par2);
              //if (deltime > 0)
              //    setTimeout(board2.doReset, deltime);

            }
            else {
              remst = txt1;
            }
          }
          else { // $1 , ...
            var num = 0;
            try {
              num = parseInt(txt1.substring(1));
            } catch (e) { num = 0; }
            if (num && num > 0) {
              remst = getRemGliph(num);
            }
          }
          // replace
          if (pp > 0) rem = rem.substring(0, p) + remst + rem.substring(pp);

          else rem = rem.substring(0, p) + remst;


        }
        else
          break;
      }

      //
      return rem;
    }
    widget.getRemGliph = function (num) {
      return getRemGliph(num);
    }
    widget.getCIRemGliph = function (st) {
      return getCIRemGliph(st);
    }
    widget.parseFewGamesPgn = function (st) {
      //return getCIRemGliph(st);
      var ishead = 0;
      var g = 0; var i = 0; var p = 0; var ps = 0; var pe = 0; var lastp = 0; var lastge = 0; var pgs = 0; var pge = 0; var gend = false;
      var st1;
      var mindiff = 4;
      var gArr = new Array();
      for (g = 0; g < 300; g++) {
        // one game
        gend = false;
        pgs = st.indexOf('[', lastge);
        if (pgs < 0) break;
        pge = pgs; lastge = pgs; ps = pgs + 1;
        // parse one game, find end
        // if (p >= 0) {
        do {
          pe = st.indexOf(']', ps);
          if (pe > 0) {
            ps = st.indexOf('[', pe + 1);
            if (ps < 0) { gend = true; lastge = st.length; }
            else if (ps - pe > mindiff) { // check if header - then too big diff
              p = st.indexOf(']', ps);
              if (p < 0) { gend = true; lastge = ps; }
              else {
                st1 = st.substring(ps, p);
                if (st1.indexOf('"') < 0) {// not header
                  pe = p;// cont
                }
                else { // new game
                  gend = true; lastge = ps;
                }
              }
            }
            else { }// cont
          }
          else { gend = true; lastge = ps; }
        }
        while (!gend);
        if (lastge - pgs > 5) {
          var gst = st.substring(pgs, lastge);
          gArr.push(gst);
        }
        //}
      }
      return gArr;
    }
    widget.doManualMove = function (movestr, doanim, replay, fast, premove) { // piece, fromSquare, toSquare) {
      var eaten = 0;
      var promote = '';
      var castle = 0;
      var marr = movestr.split('-');     
      DRAGGED_MANPIECE = marr[0];
      DRAGGED_MANPIECE_SOURCE = marr[1];
      var square = marr[2];
      if (movestr == 'bK-e8-g8') {
        castle = 1;
      }
      else if (movestr == 'bK-e8-c8') {
        castle = 2;
      }
      else if (movestr == 'wK-e1-g1') {
        castle = 1;
      }
      else if (movestr == 'wK-e1-c1') {
        castle = 2;
      }
      if (!square) return;
      if (square.length < 2) return;
      if (square.length > 2) {
        if (square[2] == 'x') {
          eaten = 1;
          if (square.length > 3) if (square[3] == 'x') eaten = 2; // emp
        }
        var p = square.indexOf('=');
        if (p > 1) {
          promote = square.substr(p + 1, 1);
        }
        if (square.indexOf('ooo') >= 0) castle = 2;
        else if (square.indexOf('oo') >= 0) castle = 1;
      }
      if (square.length > 2) square = square.substr(0, 2);
      dropDraggedPieceOnSquare(square, true, doanim, replay, 1, eaten, promote, castle, fast, premove); 
    };
    widget.doUciMove = function (movestr) { // e2e4 , g1f3
      promote = '';
      if (!movestr || movestr.length < 4)
        return false;
      else if (movestr.length > 4)
        promote = movestr.substring(4, 1);
      var fr1 = movestr.substring(0, 2);
      var to1 = movestr.substring(2, 4);
      justTransferFromTo(fr1, to1, promote); // also changes color !!
      return true;
    }
    /*
    // get or set config properties
    // TODO: write this, GitHub Issue #1
    widget.config = function(arg1, arg2) {
        // get the current config
        if (arguments.length === 0) {
        return deepCopy(cfg);
        }
    };
    */

    // remove the widget from the page
    widget.destroy = function () {
      // remove markup
      containerEl.html('');
      draggedPieceEl.remove();

      // remove event handlers
      containerEl.unbind();
    };

    // shorthand method to get the current FEN
    widget.fen = function () {
      return widget.position('fen');
    };

    // flip orientation
    widget.flip = function () {
      widget.orientation('flip');
    };

    widget.clearHighlights = function () {
      clearHighlights();
    }

    // gptnew
    widget.highlightSquare = function (square) {
      clearHighlights();
      const squareEl = document.querySelector(
        '.square-' + square
      );
      if (squareEl) {
        squareEl.classList.add(CSS.highlight1);
      }
    }

    // move pieces
    widget.move = function () {
      // no need to throw an error here; just do nothing
      if (arguments.length === 0) return;

      var useAnimation = true;

      // collect the moves into an object
      var moves = {};
      for (var i = 0; i < arguments.length; i++) {
        // any "false" to this function means no animations
        if (arguments[i] === false) {
          useAnimation = false;
          continue;
        }

        // skip invalid arguments
        if (validMove(arguments[i]) !== true) {
          error(2826, 'Invalid move passed to the move method.', arguments[i]);
          continue;
        }

        var tmp = arguments[i].split('-');
        moves[tmp[0]] = tmp[1];
      }

      // calculate position from moves
      var newPos = calculatePositionFromMoves(CURRENT_POSITION, moves);

      // update the board
      widget.position(newPos, useAnimation);

      window.alert('Move from ' + CURRENT_POSITION + ' to ' + newPos);
      // return the new position object
      return newPos;
    };
    widget.blackdown = function ()
    {
      CURRENT_ORIENTATION = 'black';
      drawBoard();
    }
    widget.whitedown = function ()
    {
      CURRENT_ORIENTATION = 'white';
      drawBoard();
    }
    widget.orientation = function (arg) {
        // no arguments, return the current orientation
        if (arguments.length === 0) {
            return CURRENT_ORIENTATION;
        }

        // set to white or black
        if (arg === 'white' || arg === 'black') {
            CURRENT_ORIENTATION = arg;
            drawBoard();
            return;
        }

        // flip orientation
        if (arg === 'flip') {
            CURRENT_ORIENTATION = (CURRENT_ORIENTATION === 'white') ? 'black' : 'white';
            drawBoard();
            return;
        }

        error(5482, 'Invalid value passed to the orientation method.', arg);
    };

    widget.position = function (position, useAnimation) {
        // no arguments, return the current position
        if (arguments.length === 0) {
            return deepCopy(CURRENT_POSITION);
        }

        // get position as FEN
        if (typeof position === 'string' && position.toLowerCase() === 'fen') {
            return objToFen(CURRENT_POSITION);
        }

        // default for useAnimations is true
        if (useAnimation !== false) {
            useAnimation = true;
        }

        // start position
        if (typeof position === 'string' && position.toLowerCase() === 'start') {
            position = deepCopy(START_POSITION);
            LAST_MOVE_COLOR = 'b';
        }

        // convert FEN to position object
        if (validFen(position) === true) {
            position = fenToObj(position);
        }

        // validate position objectcheckLegal
        if (validPositionObject(position) !== true) {
            error(6482, 'Invalid value passed to the position method.', position);
            return;
        }

        if (useAnimation === true) {
            // start the animations
            doAnimations(calculateAnimations(CURRENT_POSITION, position),
                CURRENT_POSITION, position);

            // set the new position
            setCurrentPosition(position);
        }
            // instant update
        else {
            setCurrentPosition(position);
            drawPositionInstant();
        }
    };

    widget.resize = function () {
        // calulate the new square size
        SQUARE_SIZE = calculateSquareSize();

        // set board width
        //boardEl.css('width', (SQUARE_SIZE * 8) + 'px');

        // set drag piece size
        draggedPieceEl.css({
            height: SQUARE_SIZE,
            width: SQUARE_SIZE
        });

        // spare pieces
        if (cfg.sparePieces === true) {
            containerEl.find('.' + CSS.sparePieces)
                .css('paddingLeft', (SQUARE_SIZE + BOARD_BORDER_SIZE) + 'px');
        }

        // redraw the board
        drawBoard();
    };

    // set the starting position
    widget.start = function (useAnimation) {
        widget.position('start', useAnimation);
        LAST_MOVE_COLOR = 'b';
        lastPlayedMoveIndex = -1;
        CURRENT_FEN = START_FEN;
        CURRENT_FEN_COL = 'w';
    };
    widget.setStartFenColor = function (col) {
             
        if (CURRENT_FEN == '') CURRENT_FEN = START_FEN;
        CURRENT_FEN_COL = col;
        var p = CURRENT_FEN.indexOf(' ');
        if (p > 0)
            CURRENT_FEN = CURRENT_FEN.substring(0, p+1) + col + CURRENT_FEN.substring(p+2);
        // START_POSITION = fenToObj(START_FEN);
    };
    widget.setPlayColor = function (col) {
        PLAY_ONLY_COLOR = col;
        LAST_MOVE_COLOR = 'b';
        if (col == 'b') LAST_MOVE_COLOR = 'w';
        CURRENT_FEN_COL = col;
    };
    widget.setMoveNum = function (num) {
        LAST_MOVE_NUM = num;
       
    };
    
    widget.changePlayColor = function () {
		// CURRENT_FEN_COL is next , LAST_MOVE_COLOR is before
        var col = 'w'; if (CURRENT_FEN_COL == 'w') col = 'b';
        PLAY_ONLY_COLOR = col;
        LAST_MOVE_COLOR = 'b';
        if (col == 'b') LAST_MOVE_COLOR = 'w';
        CURRENT_FEN_COL = col;
    };
    var plconn = {};
    var plumbArr = {};
    var plumbTot = 0;

    widget.doReset = function () {
        try {
            var i;
            for (i = 0; i < plumbTot; i++) {                 
                var pli = plumbArr[i];
                pli.detachEveryConnection();
                pli.deleteEveryEndpoint();
                pli.reset();
            }

        }
        catch (e)
        {
            var x = e.message;
        }
    }
    // Michael effect
    widget.doEffect = function (eftype, sq1, sq2) {
        var COLUMNS1 = 'abcdefgh'.split('');
        var square1 = sq1; // COLUMNS1[sq1[0]] + sq1[1];
        var square2 = sq2; // COLUMNS1[sq2[0]] + sq2[1];
        var id1 = SQUARE_ELS_IDS[square1];
        var id2 = SQUARE_ELS_IDS[square2];
        //jsPlumb.detachEveryConnection();
        //jsPlumb.deleteEveryEndpoint();
        //jsPlumb.reset();
        plumbTot++;
        var pli = jsPlumb.getInstance();
        plumbArr[plumbTot - 1] = pli;
        pli.setContainer($("cboard11"));

        switch (eftype) {
            case 1:
                //if (plconn) jsPlumb.detach(plconn);

                plconn = pli.connect({
                    source: id1,
                    target: id2,
                    anchors: ["Center", "Center"],
                    paintStyle: { lineWidth: 5, strokeStyle: 'rgba(0,255,0,0.5)' },
                    endpointStyle: { radius: 23 }
                });
                break;
            case 2:

                plconn = pli.connect({
                    source: id1,
                    target: id2,
                    anchors: ["Center", "Center"],
                    paintStyle: { strokeStyle: "blue", lineWidth: 5 },
                    endpointStyle: { radius: 23 }
                });
                break;
            case 3:

                plconn = pli.connect({
                    source: id1,
                    target: id1,
                    anchors: ["Center", "Center"],
                    paintStyle: { strokeStyle: 'rgba(0,255,0,0.5)', lineWidth: 1 },
                    endpointStyle: { radius: 23 }
                });
                pli.detachEveryConnection();
                break;
            case 1000:

                plconn = pli.connect({
                    source: id1,
                    target: id1,
                    anchors: ["Center", "Center"],
                    paintStyle: { strokeStyle: 'rgba(0, 0, 255, 0.15)', lineWidth: 1 },
                    //paintStyle: { strokeStyle: "blue", lineWidth: 5 },
                    endpointStyle: { radius: 23.5 }
                });

                //jsPlumb.detachEveryConnection();
                break;

            case 1015:
                pli.importDefaults({
                    Connector: ["Bezier", { curviness: 150 }],
                    Anchors: ["TopCenter", "BottomCenter"]
                });
                plconn = pli.connect({
                    source: id1,
                    target: id2
                });
                break;

            case 1010:
                var common = {
                    connector: ["Straight"],
                    anchor: ["Center", "Center"],
                    endpointStyle: { radius: 1 }
                };
                plconn = pli.connect({
                    source: id1,
                    target: id2,
                    paintStyle: { strokeStyle: "red", lineWidth: 3 },
                    endpointStyle: { fillStyle: "red", outlineColor: "red" },
                    overlays: [
                        ["Arrow", { width: 18, length: 18, location: 0.95 }]
                    ]
                }, common);
                break;
            case 1011:
                var common = {
                    connector: ["Straight"],
                    anchor: ["Center", "Center"],
                    endpointStyle: { radius: 2 }
                };
                plconn = pli.connect({
                    source: id1,
                    target: id2,
                    paintStyle: { strokeStyle: "yellow", lineWidth: 4 },
                    endpointStyle: { fillStyle: "yellow", outlineColor: "yellow" },
                    overlays: [
                        ["Arrow", { width: 18, length: 18, location: 0.95 }]
                    ]
                }, common);
                break;
            case 1012:
                var common = {
                    connector: ["Straight"],
                    anchor: ["Center", "Center"],
                    endpointStyle: { radius: 4 }
                };
                plconn = pli.connect({
                    source: id1,
                    target: id2,
                    paintStyle: { strokeStyle: "yellow", lineWidth: 4 },
                    endpointStyle: { fillStyle: "yellow", outlineColor: "yellow" },
                    overlays: [
                        ["Arrow", { width: 18, length: 18, location: 0.95 }]
                    ]
                }, common);
                break;
            case 1030:
                break;
            case 1032:
                break;
            default:
                break;
        }
        pli.repaintEverything();
    }

    var timeouts = [];
    function clearAllTimeouts() {
        //if (timer1) clearTimeout(timer1);
        if (timeouts)
            for (var i = 0; i < timeouts.length; i++) {
                window.clearTimeout(timeouts[i]); // clear all the timeouts
            }
        timeouts = [];//empty the id array
    }

    var manualMoveStr = '';
    var timer1 = 0;
    var lastPlayedMoveIndex = -1;

    widget.clearTimeouts = function () {
        clearAllTimeouts();
    }

    widget.playNextMove = function (mlist) {
        clearAllTimeouts();
        lastPlayedMoveIndex++; // 
        mlist = mlist.trim();
        var moves = mlist.split(/\s+/);
        if (moves.length > lastPlayedMoveIndex) {
            manualMoveStr = moves[lastPlayedMoveIndex];
            displayManualMoveWithReplay(manualMoveStr);
            return manualMoveStr;
        }
        else return "";
    }

    widget.prepareForViewFinalPos = function (mlist) {
        mlist = mlist.trim();
        var moves = mlist.split(/\s+/);
        lastPlayedMoveIndex = moves.length - 1;
    }
    widget.prepareForViewFinalPosIfNA = function (mlist) {
        if (lastPlayedMoveIndex < 0) {
            mlist = mlist.trim();
            var moves = mlist.split(/\s+/);
            lastPlayedMoveIndex = moves.length - 1;
        }
    }
    widget.setCfgCheckTurn = function (val) {
        cfg.checkTurn = val;
        cfg.checkLegal = val;
    }
    widget.getStartFen = function () {
        return CURRENT_FEN;
    }
    widget.getStartFenCol = function () {
        return CURRENT_FEN_COL;
    }
    widget.goToMoveNum = function (fen, prevCol, mlist, mnum, totmnum,game) {
        clearAllTimeouts();
        mlist = mlist.trim();
        var moves = mlist.split(/\s+/);
        var len = moves.length;
        if (totmnum == 0) {
            totmnum = len;
        }
        var lm = '';
        lastPlayedMoveIndex = totmnum - 1;
        if (lastPlayedMoveIndex >= mnum - 1) {

            if (len > 0 && moves[len - 1] == '') len--;
            if (lastPlayedMoveIndex >= len) lastPlayedMoveIndex = len - 1;
            var lastPlayedMoveIndexP = lastPlayedMoveIndex;
            if (CURRENT_FEN == '' && (fen == '')) {
                widget.start(false);
                if (game) game.load(START_FEN); // game.reset();
            }
            else if (fen == "")
                widget.setFen(CURRENT_FEN, CURRENT_FEN_COL);
                //widget.start(false);
            else
                widget.setFen(fen, prevCol); // CURRENT_FEN, CURRENT_FEN_COL); //
            lastPlayedMoveIndex = lastPlayedMoveIndexP;

            var i;
            for (i = 0; i < mnum; i++) {
                displayManualMoveNoAnimate(moves[i]);
                if(moves[i]!='')lm = moves[i];
            }
            lastPlayedMoveIndex = mnum - 1;
        }
        return lm;
    }
     
    widget.goMovesBack = function (mlist, movesb, game) {
        clearAllTimeouts();
        mlist = mlist.trim();
        if (lastPlayedMoveIndex >= movesb - 1) {
            var moves = mlist.split(/\s+/);
            var len = moves.length;
            if (len > 0 && moves[len - 1] == '') len--;
            if (lastPlayedMoveIndex >= len) lastPlayedMoveIndex = len - 1;
            var lastPlayedMoveIndexP = lastPlayedMoveIndex;
            widget.start(false);
            if (game) game.load(START_FEN); //game.reset();
            lastPlayedMoveIndex = lastPlayedMoveIndexP;

            var i;
            for (i = 0; i <= lastPlayedMoveIndex - movesb; i++) {
                displayManualMoveNoAnimate(moves[i]);
            }
            lastPlayedMoveIndex -= movesb;
        }
    }
    function gotoStartByFen(fen, prevCol) {
        if (fen == '') {
            widget.start(false);
            widget.doReset();
            //game = new Chess();
        }
        else {
            widget.setFen(fen, prevCol);
            //fen = legalFen(fen, 0);
            //game = new Chess(fen);
        }
    }

    widget.goMovesFromStart = function (mlist, movesf, game, fen, prevCol) {
        clearAllTimeouts();
        mlist = mlist.trim();
        var moves = mlist.split(/\s+/);
        var len = moves.length;
        if (len > 0 && moves[len - 1] == '') len--;
        if (lastPlayedMoveIndex >= len) lastPlayedMoveIndex = len - 1;
        var lastPlayedMoveIndexP = lastPlayedMoveIndex;
        gotoStartByFen(fen, prevCol);
        lastPlayedMoveIndex = lastPlayedMoveIndexP;
        var i;
        for (i = 0; i <= movesf; i++) { displayManualMoveNoAnimate(moves[i]); }
        lastPlayedMoveIndex = movesf;
    }
    widget.goMovesBackFromCurrentWithFen = function (mlist, movesb, game, fen, prevCol) {
        clearAllTimeouts();
        mlist = mlist.trim();
        if (lastPlayedMoveIndex >= movesb - 1) {
            var moves = mlist.split(/\s+/);
            var len = moves.length;
            if (len > 0 && moves[len - 1] == '') len--;
            if (lastPlayedMoveIndex >= len) lastPlayedMoveIndex = len - 1;
            var lastPlayedMoveIndexP = lastPlayedMoveIndex;
           
            gotoStartByFen(fen, prevCol);

            lastPlayedMoveIndex = lastPlayedMoveIndexP;

            var i;
            for (i = 0; i <= lastPlayedMoveIndex - movesb; i++) {
                displayManualMoveNoAnimate(moves[i]);
            }
            lastPlayedMoveIndex -= movesb;
        }
    }

    widget.replay = function (mlist, waitmsec, game) {
        //alert(mlist);
        if (game) game.load(START_FEN); //game.reset();
        clearAllTimeouts();
        widget.start();
        mlist = mlist.trim();
        var moves = mlist.split(/\s+/);
        var len = moves.length;
        //if (len > 0 && moves[len - 1] == '') len--;
        //if (len > 0 && moves[len - 1] == '') len--;
        var cnt = 1; // first wait too ! was 0
        for (var i = 0; i < len; i++) {
            // widget.doManualMove(moves[i]);
            //setTimeout(function () { widget.doManualMove(moves[i]); }, 1000 * i);
            manualMoveStr = moves[i];
            // window.clearTimeout(t1);
            if (manualMoveStr != '') {
                timeouts.push(setTimeout(displayManualMoveWithReplay, waitmsec * cnt, manualMoveStr)); //setTimeout(function () { displayManualMove(); }, 1000);
                cnt++;
            }


        }
        lastPlayedMoveIndex = moves.length - 1;
        // t1 = clearTimeout();
    }

    // game not in use here; makes all moves from current position
    // if startmov!=null then start with it
    widget.replayFromCurrent = function (mlist, waitmsec, game,maxlen, startmov) {
        clearAllTimeouts();
        mlist = mlist.trim();
        var moves = mlist.split(/\s+/);
        var len = moves.length;
        //if (len > 0 && moves[len - 1] == '') len--;
        //if (len > 0 && moves[len - 1] == '') len--;
        // var t1 = 0;
        var cnt = 1; // first wait too ! was 0
        if (maxlen && maxlen!=null) {
            if (maxlen > 0 && maxlen < len) len = maxlen;
        }
        var startfrom = 0;
        manualMoveStr = '';
        if (startmov && startmov != null)
            startfrom = startmov;
        for (var i = startfrom; i < len; i++) {
            // widget.doManualMove(moves[i]);
            //setTimeout(function () { widget.doManualMove(moves[i]); }, 1000 * i);
            manualMoveStr = moves[i];
            // window.clearTimeout(t1);
            if (manualMoveStr != '') {
                if (waitmsec == 0) { // imm.
                    displayManualMoveWithReplay(manualMoveStr);
                    cnt++;
                     
                }
                else {
                    timeouts.push(setTimeout(displayManualMoveWithReplay, waitmsec * cnt, manualMoveStr)); //setTimeout(function () { displayManualMove(); }, 1000);
                    cnt++;
                }
            }


        }
        if (cfg.hasOwnProperty('onReplayFinished') === true && typeof cfg.onReplayFinished === 'function') {
            timeouts.push(setTimeout(cfg.onReplayFinished, waitmsec * cnt, ''));

        }
        lastPlayedMoveIndex += moves.length;
        if (waitmsec == 0 && manualMoveStr!='') { // imm. - find who's move
            var lastCol = manualMoveStr[0];
            var nextCol = 'b';
            if (lastCol == 'b') nextCol = 'w';
            PLAY_ONLY_COLOR = nextCol;
            LAST_MOVE_COLOR = lastCol;
           
            CURRENT_FEN_COL = nextCol;

        }
        return LAST_MOVE_COLOR;
        // t1 = clearTimeout();
    }
    widget.setDraggable = function (tf) {
        DRAGGABLE = tf;
        cfg.draggable = tf;
    }
    widget.setAllowPoint = function (tf) {
        allowPoint = tf;
        cfg.allowPoint = tf;
    }
    widget.setFenTemp = function (fen, prevCol) {
        if (fen == '') fen = START_FEN;
        CURRENT_POSITION /* START_POSITION */ = fenToObj(fen);
        prevMovePiece = '';
        prevMoveSource = '';
        prevMoveTarget = '';
        LAST_MOVE_COLOR = prevCol; // 'b' / 'w'
           
        drawPositionInstant();
        //DRAGGING_A_PIECE = false;         
        drawBoard();
    }
    widget.setFen = function (fen, prevCol) {
        if (fen == '') fen = START_FEN; // START_POSITION;
        CURRENT_FEN = fen;
        CURRENT_FEN_COL = (prevCol == 'b' || prevCol=='') ? 'w' : 'b';
        CURRENT_POSITION /* START_POSITION */ = fenToObj(fen);
        PREV_POSITION = deepCopy(CURRENT_POSITION);
        // back :       objToFen 
        //CURRENT_POSITION = deepCopy(START_POSITION);
        // LAST_MOVE_COLOR = 'b';
        // redraw the position
        prevMovePiece = '';
        prevMoveSource = '';
        prevMoveTarget = '';
        //lastPlayedMoveIndex = -1;
        LAST_MOVE_COLOR = prevCol; // 'b' / 'w'
        drawPositionInstant();

        //DRAGGING_A_PIECE = false;
        //draggedPieceEl.css('display', 'none');
        drawBoard();
    }
    widget.setFenNoDraw = function (fen, prevCol) {
        if (fen == '') fen = START_FEN; // START_POSITION;
        CURRENT_FEN = fen;
        CURRENT_FEN_COL = (prevCol == 'b') ? 'w' : 'b';
        CURRENT_POSITION /* START_POSITION */ = fenToObj(fen);
        PREV_POSITION = deepCopy(CURRENT_POSITION);
           
        prevMovePiece = '';
        prevMoveSource = '';
        prevMoveTarget = '';
        //lastPlayedMoveIndex = -1;
        LAST_MOVE_COLOR = prevCol; // 'b' / 'w'
        // drawPositionInstant();

        //DRAGGING_A_PIECE = false;
        //draggedPieceEl.css('display', 'none');
        //drawBoard();
    }
    widget.resetInd = function () {
        lastPlayedMoveIndex = -1;
    }
    widget.getFen = function (bymovenum) {
        var fen = objToFen(CURRENT_POSITION, bymovenum);
        return fen;
    }


    // Michael - 1 move back
    widget.takeBack = function () {
        //alert(PREV_POSITION);
        CURRENT_POSITION = deepCopy(PREV_POSITION);
        prevMovePiece = '';
        prevMoveSource = '';
        prevMoveTarget = '';
        //DRAGGING_A_PIECE = false;

        drawBoard();
        //alert(LAST_MOVE_COLOR);
        if (LAST_MOVE_COLOR == 'b') LAST_MOVE_COLOR = 'w';
        else LAST_MOVE_COLOR = 'b';
        //alert(LAST_MOVE_COLOR);
    }

    function displayManualMove(manualMoveStr) {
        //alert(manualMoveStr);
        //if (manualMoveStr!='')
        widget.doManualMove(manualMoveStr, true, 0,0,0);
    }
    function displayManualMoveWithReplay(manualMoveStr) {
        //alert(manualMoveStr);
        //if (manualMoveStr!='')
        widget.doManualMove(manualMoveStr, true, 1,1,0);
    }
    function displayManualMoveNoAnimate(manualMoveStr) {
        //alert(manualMoveStr);
        //if (manualMoveStr!='')
        widget.doManualMove(manualMoveStr, false, 1,1,0);
    }


    //------------------------------------------------------------------------------
    // Browser Events
    //------------------------------------------------------------------------------

    function isTouchDevice() {
        return true;
        return ('ontouchstart' in document.documentElement);
    }

    // reference: http://www.quirksmode.org/js/detect.html
    function isMSIE() {
        return (navigator && navigator.userAgent &&
            navigator.userAgent.search(/MSIE/) !== -1);
    }

    function stopDefault(e) {
        e.preventDefault();
    }

    function mousedownSquare(e) {
        // do nothing if we're not draggable
        //console.log("mousedownSquare");
        if (cfg.draggable !== true) return;

        var square = $(this).attr('data-square');

        // no piece on this square
        if (!allowPoint && (validSquare(square) !== true || CURRENT_POSITION.hasOwnProperty(square) !== true)) {
            return;
        }

        var onlyPoint = false;
        var doDrag = true;
        var pcol='';
        var piec = CURRENT_POSITION[square];
        var mycol = false;
        var takestry = 0;
        if (piec && piec != '') {
            pcol = piec[0];
            if (pcol == PLAY_ONLY_COLOR) {
                mycol = true;
            }
            else {
                mycol = false;
                takestry = 1;
            }
        }
        else if (!allowPoint && checkDragColor)
            doDrag = false;
        if (!allowPoint && !mycol && checkDragColor) {
            doDrag=false;
            return;
        }
        else if (allowPoint && !mycol) {
          // may be takes
            if (POINTED_PIECE_SOURCE != null && DRAGGED_PIECE!=null) {
               
                    //var piec = CURRENT_POSITION[square];
                    // check if legal
                    var manual = false;
                    var myObj = { takes: takestry, spec: 0, replay: 0, promote: '', premove: 0 };
                    var specialMove = moveIsLegal(DRAGGED_PIECE, DRAGGED_PIECE_SOURCE, square, manual, myObj);
                    if (specialMove > 0) {
                      
                        stopDraggedPiece(square);
                        doDrag = false;
                    }
                
            }

        }
        if (doDrag)
            beginDraggingPiece(square, CURRENT_POSITION[square], e.pageX, e.pageY);
    }

    function touchstartSquare(e) {
        // do nothing if we're not draggable
        //console.log("touchstartSquare");

        if (cfg.draggable !== true) return;
       

        var square = $(this).attr('data-square');

        // no piece on this square
        //if (validSquare(square) !== true ||
        //    CURRENT_POSITION.hasOwnProperty(square) !== true) {
        //    return;
        //}
        // no piece on this square
        if (!allowPoint && (validSquare(square) !== true || CURRENT_POSITION.hasOwnProperty(square) !== true)) {
            return;
        }

     
    
        
        var onlyPoint = false;
        var doDrag = true;
        var pcol='';
        var piec = CURRENT_POSITION[square];
        var mycol = false;
        var takestry = 0;
        if (piec && piec != '') {
            pcol = piec[0];
            if (pcol == PLAY_ONLY_COLOR) {
                mycol = true;
            }
            else {
                mycol = false;
                takestry = 1;
            }
        }
        else if (!allowPoint && checkDragColor)
            doDrag = false;
        if (!allowPoint && !mycol && checkDragColor) {
            doDrag=false;
            return;
        }
        else if (allowPoint && !mycol && checkDragColor) {
            // may be takes
            if (POINTED_PIECE_SOURCE != null && DRAGGED_PIECE!=null) {
               
                //var piec = CURRENT_POSITION[square];
                // check if legal
                var manual = false;
                var myObj = { takes: takestry, spec: 0, replay: 0, promote: '', premove: 0 };
                var specialMove = moveIsLegal(DRAGGED_PIECE, DRAGGED_PIECE_SOURCE, square, manual, myObj);
                if (specialMove > 0) {
                      
                    stopDraggedPiece(square);
                    doDrag = false;
                }
                
            }

        }
        if (doDrag) {
            e = e.originalEvent;

            beginDraggingPiece(square, CURRENT_POSITION[square],
                e.changedTouches[0].pageX, e.changedTouches[0].pageY);

        }
    }

    function mousedownSparePiece(e) {
        // do nothing if sparePieces is not enabled
        if (cfg.sparePieces !== true) return;

        var piece = $(this).attr('data-piece');

        beginDraggingPiece('spare', piece, e.pageX, e.pageY);
    }

    function touchstartSparePiece(e) {
        // do nothing if sparePieces is not enabled
        if (cfg.sparePieces !== true) return;

        var piece = $(this).attr('data-piece');

        e = e.originalEvent;
        beginDraggingPiece('spare', piece,
            e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    }

    function mousemoveWindow(e) {
        // do nothing if we are not dragging a piece
        if (DRAGGING_A_PIECE !== true) return;

        updateDraggedPiece(e.pageX, e.pageY);
    }

    function touchmoveWindow(e) {
        // do nothing if we are not dragging a piece
        //console.log("touchmoveWindow");
        if (DRAGGING_A_PIECE !== true) return;

        // prevent screen from scrolling
        //e.preventDefault();
   
        updateDraggedPiece(e.originalEvent.changedTouches[0].pageX,
            e.originalEvent.changedTouches[0].pageY);
    }

    function mouseupWindow(e) {
        // do nothing if we are not dragging a piece
        //console.log("mouseupWindow");
        if (DRAGGING_A_PIECE !== true && !allowPoint) return;

        // get the location
        var location = isXYOnSquare(e.pageX, e.pageY);
        var legalClick = false;
       
        if (allowPoint && POINTED_PIECE_SOURCE != '' && POINTED_PIECE_SOURCE != location) {
            var val = validSquare(location);
            if (val) {
                var square = location;
                var piec = CURRENT_POSITION[square];
                // check if legal
                var manual = false;
                var myObj = { takes: 0, spec: 0, replay: 0, promote: '', premove: 0 };
                var specialMove = moveIsLegal(DRAGGED_PIECE, DRAGGED_PIECE_SOURCE, square, manual, myObj);
                if (specialMove > 0) {
                    legalClick = true;
                    stopDraggedPiece(location);
                }
            }           
        }
        if (!legalClick) {
            if (DRAGGING_A_PIECE !== true) return; // do nothing
            stopDraggedPiece(location);
        }
        else
            return;
    }

    function touchendWindow(e) {
        // do nothing if we are not dragging a piece
        //var dd = document.getElementById('body'); dd.className = '';
        //console.log("touchendWindow");
       
        if (DRAGGING_A_PIECE !== true) return;
       
        // get the location
        var location = isXYOnSquare(e.originalEvent.changedTouches[0].pageX,
            e.originalEvent.changedTouches[0].pageY);

        stopDraggedPiece(location);
      //  if(!scrollLocked) {
      //      var dd = document.getElementById('body'); dd.className = '';
      //  }
    }

    function mouseenterSquare(e) {
        // do not fire this event if we are dragging a piece
        // NOTE: this should never happen, but it's a safeguard
        if (DRAGGING_A_PIECE !== false) return;

        if (cfg.hasOwnProperty('onMouseoverSquare') !== true ||
            typeof cfg.onMouseoverSquare !== 'function') return;

        // get the square
        var square = $(e.currentTarget).attr('data-square');

        // NOTE: this should never happen; defensive
        if (validSquare(square) !== true) return;

        // get the piece on this square
        var piece = false;
        if (CURRENT_POSITION.hasOwnProperty(square) === true) {
            piece = CURRENT_POSITION[square];
        }

        // execute their function
        cfg.onMouseoverSquare(square, piece, deepCopy(CURRENT_POSITION),
            CURRENT_ORIENTATION);
    }

    function mouseleaveSquare(e) {
        // do not fire this event if we are dragging a piece
        // NOTE: this should never happen, but it's a safeguard
        if (DRAGGING_A_PIECE !== false) return;

        if (cfg.hasOwnProperty('onMouseoutSquare') !== true ||
            typeof cfg.onMouseoutSquare !== 'function') return;

        // get the square
        var square = $(e.currentTarget).attr('data-square');

        // NOTE: this should never happen; defensive
        if (validSquare(square) !== true) return;

        // get the piece on this square
        var piece = false;
        if (CURRENT_POSITION.hasOwnProperty(square) === true) {
            piece = CURRENT_POSITION[square];
        }

        // execute their function
        cfg.onMouseoutSquare(square, piece, deepCopy(CURRENT_POSITION),
            CURRENT_ORIENTATION);
    }

    //------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------

    function addEvents() {
        // prevent browser "image drag"
        $('body').on('mousedown mousemove', '.' + CSS.piece, stopDefault);

        // mouse drag pieces
        boardEl.on('mousedown', '.' + CSS.square, mousedownSquare);
        containerEl.on('mousedown', '.' + CSS.sparePieces + ' .' + CSS.piece,
            mousedownSparePiece);

        // mouse enter / leave square
        boardEl.on('mouseenter', '.' + CSS.square, mouseenterSquare);
        boardEl.on('mouseleave', '.' + CSS.square, mouseleaveSquare);

        //$('.' + CSS.square).css('cursor', 'pointer');
        // IE doesn't like the events on the window object, but other browsers
        // perform better that way
        if (isMSIE() === true) {
            // IE-specific prevent browser "image drag"
            document.ondragstart = function () { return false; };

            $('body').on('mousemove', mousemoveWindow);
            $('body').on('mouseup', mouseupWindow);
        }
        else {
            $(window).on('mousemove', mousemoveWindow);
            $(window).on('mouseup', mouseupWindow);
        }

        // touch drag pieces
        if (isTouchDevice() === true) {
            boardEl.on('touchstart', '.' + CSS.square, touchstartSquare);
            containerEl.on('touchstart', '.' + CSS.sparePieces + ' .' + CSS.piece,
                touchstartSparePiece);
            $(window).on('touchmove', touchmoveWindow);
            $(window).on('touchend', touchendWindow);

            //window.addEventListener('touchstart', touchmoveWindow, { passive: false });
            //window.addEventListener('touchstart', touchmoveWindow, { passive: false });
            //window.addEventListener('touchmove', touchmoveWindow, { passive: false });
            //window.addEventListener('touchmove', touchmoveWindow, { passive: false });

        }
    }

    function initDom() {
        // build board and save it in memory
        var fs = ''; if (cfg.hasOwnProperty('boardSize') === true) { if (cfg.boardSize == 'small') fs = 's'; else if (cfg.boardSize == 'medium') fs = 'm'; }
        containerEl.html(buildBoardContainer());
        boardEl = containerEl.find('.' + CSS.board);

        if (cfg.sparePieces === true) {
            sparePiecesTopEl = containerEl.find('.' + CSS.sparePiecesTop+fs);
            sparePiecesBottomEl = containerEl.find('.' + CSS.sparePiecesBottom+fs);
        }

        // create the drag piece
        var draggedPieceId = createId();
        $('body').append(buildPiece('wP', true, draggedPieceId));
        draggedPieceEl = $('#' + draggedPieceId);

        // get the border size
        BOARD_BORDER_SIZE = parseInt(boardEl.css('borderLeftWidth'), 10);

        // set the size and draw the board
        widget.resize();
    }

    function init() {
        if (checkDeps() !== true ||
            expandConfig() !== true) return;

        // create unique IDs for all the elements we will create
        createElIds();

        initDom();
        addEvents();
    }

    // go time
    init();

    // return the widget object
    return widget;

}; // end window.ChessBoard

// expose util functions
//window.ChessBoard.fenToObj = fenToObj;
//window.ChessBoard.objToFen = objToFen;

})(); // end anonymous wrapper
