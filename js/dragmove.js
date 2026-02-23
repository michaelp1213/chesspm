var nMove = {
    orient: 'w',
    color: 'w',
    my: 1,
    opp: 0,
    dragCol: '',
    dragMy: -1,
    pre: '',
    state: 0,
    mywb: 'w',
    oppwb: 'b',
    drag: 0,
    //....
    mnum: 0,
    wtime: 0,
    btime: 0,
    set: function (myOrOpp, color, mnum) {
        if (myOrOpp == 1) { this.my = 1; this.opp = 0; }
        else { this.my = 0; this.opp = 1 }
        this.color = color;
        this.pre = ''; this.drag = 0;
        this.mnum = mnum;
    },
    next: function (mnum) {
        this.my = 1 - this.my; this.opp = 1 - this.opp;
        if (this.color == 'w') this.color = 'b'; else this.color = 'w';
        this.pre = ''; this.drag = 0;
        this.mnum = mnum;
    },
    init: function (orient, color, state) {
        this.orient = orient; this.color = color; this.mywb = color;
        this.oppwb = color == 'w' ? 'b' : 'w';
        if (orient == 'w') { this.my = 1; this.opp = 0; }
        else { this.my = 0; this.opp = 1; }
        this.state = state; this.drag = 0;
        this.mnum = 0;
        this.wtime = 0; this.btime = 0;
    }

};
var lastSentMoveNum = 0;
var lastSentMove = '';
var lastSentMoveServer = '';
var lastSentMoveServerApp = '';
var lastSentMoveTimer;
var globalRemarks = {};
var doShowRemarks = 1;
var globalEffects = {};
var doShowEffects = 1;

function replayFinished() {

}
function moveBadDone(typ) {

}
function isPremove() {
    return false;
    // add function if premove allowed !
    // ....
    if (nMove.dragCol == nMove.mywb && nMove.dragCol != nMove.color && nMove.state == 1)
        return true;
    else {
        return false;
    }
}
function onMoveEnd() {
    if (isPremove() && nMove.pre != '')
    { }
}

function dragMove(loc, pieceloc, source, piece, position, orientation) {
    if (isPremove()) {
        nMove.drag = 2;
        nMove.pre = piece + '-' + source + '-' + loc;
    }
    return;
}

function dragStart(source, piece, position, orientation) {
    // if bad then return false
    if (piece != '') {
        nMove.dragCol = piece[0];
        nMove.drag = 1; nMove.pre = '';
    }
    return true;
}
function promotePiece(wb, fromSquare, toSquare, takes) {
    overlay(wb, fromSquare, toSquare, takes);
}
function promote(piece, wb, fsquare, tsquare, takes) {
    el = document.getElementById("overlay");
    el.style.visibility = "hidden";
    board.doPromote(piece, wb, fsquare, tsquare, takes);
}
function overlay(wb, fromSquare, toSquare, takes) {
    var div = $('#overlayimg');
    div.empty();
    // div.append("[<a href='#' onclick='overlay()'>close</a>]");
    var pcs = 'QRBN';
    for (i = 0; i < 4; i++) {
        var st = ' <img src="/Content/img/chesspieces/wikipedia/' + wb + pcs[i] + '.png" style="width:40px;height:40px;cursor:pointer;" onclick="promote(\'' + pcs[i] + '\',\'' + wb + '\',\'' + fromSquare + '\',\'' + toSquare + '\',' + takes + ');" />';
        div.append(st);
    }
    el = document.getElementById("overlay");
    el.style.visibility = "visible";
}

function toChat(msg) {


}
function showAllNotation() {
    $('#solvHintBtn').hide(); $('#solvPlayBtn').hide(); $('#solvShowBtn').hide();
    clearAllTimeouts();
    setPuzzleFinal(1);
}

function listOfMovesForRec(game) {
    var prolemMovesList = [];
    var mov = {};
    if (game.problemList != null) {
        if (game.MultiLine > 0 && game.SolIndexes && game.SolIndexes.length > 0) {
            for (s = 0; s < game.SolIndexes.length; s++) {
                ind = game.SolIndexes[s];
                if (ind < game.problemList.length)
                    prolemMovesList.push(game.problemList[ind]);
            }
            game.MainInd1 = 0;
        }
        else 
            for (m = 0; m < game.problemList.length; m++) {
                mov = game.problemList[m];
                if (mov.OriginalPiece >= 0) {
                    prolemMovesList.push(mov);
                }
            }
    
    }
    return prolemMovesList;
}

function hintAllGame() { 
    var list = recording.problemList;
    var finProb = false;
    if (list != null) {
    
        var l = list.length;
        var tot = (l - lastSentMoveNum+2) / 2;
        var cnt = 0; // first  wait 1500
        var waitmsecp = 3500;
        for (var i = 1; i <= tot; i++) {

            timeouts.push(setTimeout(hintOneMove, waitmsecp * cnt+1500, ''));
            cnt++;

        }

    }
    if (recording.active) {
        if (!locked)
            lockScreen();
    }
    
}

function hintOneMove() {
   
    var list = recording.problemList;
    var finProb = false;
    if (list != null) {
       
        lastSentMoveNum++;
      
        // my side
        var mv = list[lastSentMoveNum - 1];
     
        mnum = parseInt(recording.mnum);
        var ncol = 'w';
        if (recording.wb == 2)
            ncol = 'b';
    
        probOppMove = getMoveFromMovObject(mv, ncol);
        
            board.doManualMove(probOppMove, true, 1, 0, 0);
            if (lastSentMoveNum > list.length) {  
                setPuzzleFinal();
                return;
            }
        
        recording.startvar = false;
     
            board.setMoveNum(mnum);
            newfen = board.getFen(true);

            if (lastSentMoveNum > list.length) {  
                setPuzzleFinal();
                return;
            }
        // next - opp
            mv = list[lastSentMoveNum-1];
            ncol = ncol == 'w' ? 'b' : 'w';
            recording.wb = recording.wb == 1 ? 2 : 1;
            probOppMove = getMoveFromMovObject(mv, ncol);
            recording.wb = recording.wb == 1 ? 2 : 1; // for next
            setTimeout(function () {
                board.doManualMove(probOppMove, true, 1, 0, 0);
            }, 500);
            // opp is last ?
            if (lastSentMoveNum >= list.length) {  
                finProb = true;
            }
            if (finProb) {
                setTimeout(function () {
                    setPuzzleFinal();
                }, 700);
            }
            lastSentMoveNum--; // return - added later
    }
    if (recording.active) {
        if (!locked)
            lockScreen();
    }
}

//var board2 = board;
// board move
function moveDone(piece, fromSquare, toSquare, manual, takes, spec, replay, promote, doanim, dofast, premove) { //(move) {
    var finProb = false;
    if (game == 'undefined')
        game = null;
    var fast = 0;
    var oppMove = ''; var probOppMove = '';
    var moveToOpp = '';
    var pgnMove = '';
    var remsent = 0;
    lastSentMoveNum++;
    playState = recording.playState;
    if ((playState == 0 || (gameStarted <= 0 && viewStarted <= 0) || (playState == 14 && replay == 0) || (playState == 4 && replay == 0)) ) {

        board.takeBack();
        lastSentMoveNum--;

        return;
    }
    var toCont = true;
    var mnum = 0; var ncol = 'w';
    if (toCont) {
        lastSentMove = '' + piece + '-' + fromSquare + '-' + toSquare;
        moveToOpp = lastSentMove;
        if (takes > 0) {
            moveToOpp += 'x';
        }
        if (promote != '') {
            moveToOpp += '=' + promote;
        }
        var out = {};
        board.cbToCMove(moveToOpp, out);
        mnum = parseInt(recording.mnum);

        if (piece[0] == 'w' && !(recording.mainLine && recording.startvar)) {
            ncol = 'b';
            mnum++;
            recording.mnum = mnum;
        }
        else if (piece[0] == 'w')
            ncol = 'b';
        else { }
        var newfen = '';
        if (playState != 2) {
            board.setPlayColor(ncol);

            board.setMoveNum(mnum);
            newfen = board.getFen(true);
        }
          

        if (playState != 14 && playState != 2 && game && game != null) {
            var move1 = game.move(out.almove);
            var legal = true;

            if (!move1) legal = false;
            //}
            if (!legal) {
                board.takeBack(); toCont = false; lastSentMove = ''; moveToOpp = '';
                lastSentMoveNum--;
                //if(game&&game!=null)
                //    game.undo_move();
                toChat("TakeBack 2 illegal move " + out.almove.from + out.almove.to + ' (' + piece + fromSquare + toSquare + ')'); //+' playState:'+playState);
            }
        }
        if (toCont) {
            // if problem - find if ok
            if (playState == 2 && !manual) { // || playState == 12 || playState == 20 || playState == 22) ) {
                inSolve('');
                var list = recording.problemList;
                if (list != null) {
                    if (lastSentMoveNum> list.length ) {
                        setPuzzleFinal();
                        return;
                    }
                    var mv = list[lastSentMoveNum - 1];
                    var fr1 = board.squareNumNor(fromSquare);
                    var to1 = board.squareNumNor(toSquare);
                    var eq = mv.StartPos == fr1 && mv.EndPos == to1;
                    //var pcs = 'QRBN';
                    if (promote && promote != '' && mv.MType>0) {
                        var mt=mv.MType;
                        if (mv.MType >= 16 && mv.MType <= 22) {
                            mt = mt - 16;
                            //tak = 1;
                        }
                        else {
                             
                        }
                        eq = eq && ((promote == 'B' && mt == 5) || (promote == 'N' && mt == 6) || (promote == 'R' && mt == 4) || (promote == 'Q' && mt == 1));
                    }
                    if (eq) {
                        // ok
                        //board.setPlayColor(ncol);

                        board.setMoveNum(mnum);
                        newfen = board.getFen(true);

                       // ProbSolMoveNum++;
                        //ProbSolMoveNum++;
                        if (lastSentMoveNum >= list.length) {
                            setPuzzleFinal();
                            return;
                        }
                        mv = list[lastSentMoveNum];


           
                        
                        probOppMove = getMoveFromMovObject(mv,ncol);

                        // opp is last ?
                        if (lastSentMoveNum + 1 >= list.length) {
                            finProb = true;
                        }
                       
                    }
                    else { // bad
                       

                                    board.takeBack();
                                    lastSentMoveNum--;
                                   
                                    setPuzzleError();
                                    return;
                    }
                }
            }
           

            // this is premove ??? change this to other check !
            if (!manual) {            // || (nMove.pre!=''&& playState==1)

                if (playState == 1 || playState == 5) { // ??? // playState != 3 && playState != 2 && playState != 12 && playState != 20 && playState != 22 && playState != 4 && playState != 14) {
                  

                }
                else if (playState == 3) {
     
                }
            }
            else if (premove == 1 && (playState == 1 || playState == 5)) {
                lastSentMove = moveToOpp; // ????
     
            }
                //oppMove
            else if (playState == 1) {
                if (nMove.pre != '') {
                    oppMove = nMove.pre;
                }
            }
            else if (doShowRemarks && doanim) { // anim for prob, not in moveclick
   
            }

          var moveStr = lastSentMoveNum + '.' + lastSentMove;// temp
          if (p_wview == 1) {
            try {
				var mv11=manual?"m:"+moveToOpp : "dm:"+moveToOpp;
              window.chrome.webview.postMessage(mv11); // lastSentMove);
            } catch (ee) { }
            return;
          }
            var previd = recording.lastdivid;
            recording.lastmoveidtoaddtext = previd;
            var mstr = '';
            if (recording.startvar) {
                recording.lastvaridnum = 1;
            }
                //    mstr += '<div class="variant">' + '<span>(</span>';
                //    recording.lastvaridnum = 1;
                //}
            else
                recording.lastvaridnum++;
            if (playState!=2)
                recording.updated = true;
            lastSentArr = lastSentMove.split('-');
            var pgnMove = '';
            var piec = lastSentArr[0].substring(1, 2);
            if (piec == 'P') piec = '';
            pgnMove = piec + lastSentArr[1];
            if (takes > 0) pgnMove += 'x'; else pgnMove += '-';
            pgnMove += lastSentArr[2];
            if (promote && promote != '')
                pgnMove += '=' + promote;
            var mnumstr = ''; // ' '
            var col1 = ncol == 'w' ? 2 : 1; // curcol
            if (recording.startvar || col1 == 1) {
                if (col1 == 1)
                    mnumstr = mnum + '' + '. ';
                else
                    mnumstr = mnum + '' + '... ';
            }
            var newid = '';
            if (recording.mainLine) {
                newid = 'mnum' + recording.lastvaridnum;
            }
            else {
                newid = recording.fatherid + 'nx' + recording.lastvaridnum; //'mnumv1x2'; // ..
            }
            var fen1 = newfen; // ???
            //attr('mnum', mnum + '_' + wb)

            mstr += '<span class="move" id="' + newid + '" mnum="' + '' + mnum + col1 + '" from="' + lastSentArr[1] + '" to="' + lastSentArr[2] + '" fen="' + fen1 + '">' + '&nbsp;'+ mnumstr + pgnMove + '</span>';
            //if (recording.startvar) {
            //    mstr += '<span> )</span></div>';


            //}
            recording.lastdivid = newid;

            recording.startvar = false;
            recording.varlevel = 0;
            if (previd == 'game_moves_html')
                $("#" + previd).html(mstr); // inside
            else
                $("#" + previd).after(mstr);


            $('#game_moves_html').animate({ scrollTop: $('#game_moves_html').prop('scrollHeight') });
        
            var mtype = 0;
            if (takes > 0) mtype += 16;
            // ... more - castle,...
            var squareFromCode = board.squareNumNor(lastSentArr[1])
            var squareCode = board.squareNumNor(lastSentArr[2])

            if (playState != 2) {
                if (recording.mainLine) {
                    var movobj = getMoveObject(mnum, (col1 == 1), mtype, fen1, squareFromCode, squareCode, '', board.pieceCodeIndex(piec));
                    recording.problemList.push(movobj);
                }
                else {
                  var remvar = getRemMoveObject(mnum, (col1 == 1), mtype, fen1, squareFromCode, squareCode, '', board.pieceCodeIndex(piec));
                  if (recording.currentRemVarSubList)
                    recording.currentRemVarSubList.push(remvar);//currentRemVarList
                }
            }
   

            if (ncol == 'w') { $('#PlayerBlackInMove').hide(); $('#PlayerWhiteInMove').show(); }
            else { $('#PlayerBlackInMove').show(); $('#PlayerWhiteInMove').hide(); }

            if (takes > 0) {
            }
            else if (spec == 5 || spec == 4) { // castles
            }
            else if (spec == 3) {// queens
            }
            else {
            }
 
            if (lastSentMove != '' && remsent == 0 && (replay == 0 || (premove == 1 && playState == 1))) {
            }

            if (playState != 14 && game && game != null) {
  
            }
        }

    }
    else { // bad

    }
    if (playState == 3 && replay == 0 && moveToOpp != '') {
    }
    globalOppMove = oppMove;
    if (probOppMove != '') {
        var oppMove1 = probOppMove;
        probOppMove = '';
        setTimeout(function () {
            toChat("Problem move " + oppMove1);
            board.doManualMove(oppMove1, true, 0, 0, 1);
        }, 500);
        if (finProb) {
            setTimeout(function () {
                setPuzzleFinal();
            }, 700);
        }
    }



}

setPuzzle = function (game, islist) {
    p_islist = islist;
    if (!game || game == null) return;
    //if (game.PgnType == 13 || game.PgnType == 23) game.PgnType = 3;
    hideShowGameBtns(game.HideMov, p_solve, game.PgnType);
    $('#game_html').addClass('game_html_mob_smaller');
    $('#game_moves_html').addClass('game_moves_html_mob_smaller');
    $('#timerhdr1').addClass('timerhdr_hidden'); //timerhdr_mob_hidden');
    $('#engdiv').addClass('engdiv_mob_hidden');
    $('#belowBoard0').hide(); //.addClass('belowBoard_mob_hidden');
    $('#solvediv').show();
    $('#solvHintBtn').show(); $('#solvPlayBtn').show(); $('#solvShowBtn').show();
    if (p_islist)
        $('#game_chooserwr').show();
    else 
        $('#game_chooserwr').hide();
    if (p_solve == 1 || (p_solve==10 && game.HideMov==11)) {
        $('#solvHintBtn').hide(); $('#solvPlayBtn').hide(); $('#solvShowBtn').hide();
    }
    else if (p_solve == 2 || (p_solve == 10 && game.HideMov == 12)) {
        $('#solvPlayBtn').hide();
        $('#solvShowBtn').hide();
        
    }

   
    setGameFen(game);
    lastGame = game;
    setPrizeFromHdr(game);
    setGameColors(game);
    board.setDraggable(true);
    $('#board_canvas').hide(); // this is bad for dragging
    recording.playState = 2;
    recording.active = true;
    recording.mainLine = true;

  

    if (lastFen && lastFen != '') {
        var fenarr = lastFen.split(' ');
        if (fenarr != null && fenarr.length > 1)
            recording.col = fenarr[1];
    }
    else recording.col = 'w';
    recording.problemList = listOfMovesForRec(lastGame); // lastGame.problemList;
    TotlMoves = recording.problemList.length;
    var ncol = 'w';
    recording.mnum = 1;

 
    
    //recording.lastdivid = id;
    //recording.fatherid = recording.lastmove.id;
    recording.startvar = true;
    recording.varlevel = 0;
    recording.lastvaridnum = 0;
    var previd = recording.lastdivid;
  
    if (recording.mainLine) {
        previd = 'game_moves_html';
        recording.fatherid = previd;
        recording.lastdivid = previd;
    }
    var addind = 0;
    if (lastGame.MultiLine > 0) {
        addind = lastGame.MainInd1;
    }
    lastSentMoveNum = addind;
    if (p_hm && p_hm != '') {
        //var list1 = $('.move').not('.variant .move');
        //var list1xx = list1.filter('#mnum' + p_hm);
        //make_move(list1xx);
        var addhm = parseInt(p_hm);
        addhm = addhm ;
        if (addhm > 0) {
            var mn = Math.floor( addhm / 2);
            var sheer = addhm-mn * 2;
            recording.mnum = 1 + mn;
            if (sheer)
                recording.col = recording.col == 'w' ? 'b' : 'w';
            mov = recording.problemList[addhm - 1];
            if (mov) {
                
                lastFen = mov.fenAfter;
                //board.setPlayColor(recording.col);
                board.setMoveNum(recording.mnum);
                // eliminates bad piece position
                setTimeout(function () {
                    board.position(lastFen);
                }, 350);
                              
                lastSentMoveNum += addhm;
            }
        }
    }

    recording.wb = recording.col == 'w' ? 1 : 2;
    if (!recording.mainLine)
        ncol = recording.wb == 1 ? 'b' : 'w';
    board.setPlayColor(recording.col);
    if (ncol == 'w') { $('#PlayerBlackInMove').hide(); $('#PlayerWhiteInMove').show(); }
    else { $('#PlayerBlackInMove').show(); $('#PlayerWhiteInMove').hide(); }
    if (recording.wb == 2) {
        board.flip();
    }

    chess.load(lastFen);
 
    
  var txt = 'Drag the pieces to solve this';
  if (game.result == 1)
    txt = 'Solve - White Wins (1-0)';
  else if (game.result == 3)
    txt = 'Solve - Draw (1/2-1/2)';
  else if (game.Stipulation == '#2' || game.Stipulation == '"#2"')
    txt = 'Solve - Mate in 2';
    if (p_solve < 3 || (p_solve == 10 && game.HideMov < 13)) txt += ' puzzle.'; else txt += '.';
    $('#solvedivspan').html(txt);
  

    lockScreen();
}
