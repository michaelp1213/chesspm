



newPuzzle = function () {
    clearAllTimeouts();
    setByHboard(4);
    disp_game_save_panel('Set Pgn', '');
    SaveUpd = 15;
}

getPgnLastOrRecordedAndPut = function (pgn, div) {
    if (recording.updated) {

        bootbox.confirm("There are recording changes. To take them ?", function (result) {
            strconfirm = result;
            if (strconfirm == true) {
                // .... First get all [] directives inc.fen
                var pgnAdd = gameToPgn(); // LastPgn
                var n = pgn.lastIndexOf("\"]");
                if (n > 0) {

                    if (pgnAdd.trim()[0] = '[') { } // take only pgnadd ??
                    else 
                        pgn = pgn.substring(0, n) + ' \n' + pgnAdd;
                }
                else {
                    pgn = pgnAdd;
                }

                pgn = pgn.replace(/<br>/gi, '\n');
                div.val(pgn);
                return pgn;
            }
            else {
                if (pgn) {
                    div.val(pgn);
                    return pgn;
                }
                else
                    return '';
            }
        });
    }
    else {

        div.val(pgn);
        return pgn;
    }
}


addEngineMove = function (nmove, wb) {
    TotlMoves++;
    // change fen - include next move               
    chess.load(lastFen);
    var out = {};
    var fromMovStr = nmove.substring(0, 2);



    var piece = chess.getpiece(fromMovStr);
    board.engToCMove(wb, piece, nmove, out);
    var move1 = chess.move(out.almove);
    //chess.moves(nmove);
    // new fen
    lastFen = chess.fen();
    if (move1.san) {
        var ind = allPieces.indexOf(move1.san[0]);
        if (ind >= 0) {
            var pieceImg = pieceCode(ind + 2, pieceNot);
            move1.san = pieceImg + move1.san.substring(1);
        }

    }
    var helper = ''; var x = '';
    var takes = 0;
    if (move1.flags == 'c') {
        takes = 1;
        if (p_lang == 'h') x = ':';
        else x = 'x';
    }
    else if (move1.flags == 'k') { // castle
        if (move1.to[0] == 'g')
            x = 'O-O';
        else if (move1.to[0] == 'c')
            x = 'O-O-O';
    }
    if (piece == 'p' && takes == 1 && move1.from[0] != move1.to[0])
        helper = move1.from[0];
    span = addNewMoveSpan(move1.san, lastFen, TotlMoves, move1.from, move1.to, pieceImg, helper, x);
    make_move(span);
}

addNewMoveSpan = function (moveStr, fen, numid, from1, to1, pieceImg, helper, x, getpgn) {
    var mov;
    var numStr = '';
    var pgn = '';
    afterRem = 0;
    var mnum = Math.floor((numid + 1) / 2);
    var white = !((numid + 1) - mnum * 2);


    if (white && !getpgn)
        numStr = '' + mnum + '.&nbsp;';
    else if (afterRem && !getpgn)
        numStr = '' + mnum + '…&nbsp;'; //'... &nbsp;';
    else if (white && getpgn)
        numStr = '' + mnum + '. ';
    else if (afterRem && getpgn)
        numStr = '' + mnum + '... '; //'... &nbsp;';
    else
        numStr = '';

    var fromMovStr = from1; // moveStr.substring(0, 2);
    var toMovStrbase = to1; // moveStr.substring(2, 4);

    lastBoardFen = fen;
    if (!helper) helper = '';
    if (!x) x = '';
    if (!pieceImg)
        pieceImg = '';


    if (x.length > 2) // like castle
        html = numStr + pieceImg + x;
    else
        html = numStr + pieceImg + helper + x + toMovStrbase;
    if (getpgn) {
        pgn = html;
        return pgn;
    }
    else {

        var wb = white ? 1 : 2;
        span = $('<span />').attr('class', 'move').attr('mnum', mnum + '_' + wb).attr('id', 'mnum' + numid).attr('from', fromMovStr).attr('to', toMovStrbase).attr('fen', fen).html(html);


        $('#game_moves_html').append(span);
        span.click(function () {
            clearAllTimeouts();
            make_move($(this));
            $('#btn_prev_move').prop('disabled', false);
            $('#btn_initial_position').prop('disabled', false);
            $('#analyze_res5').html('');
            stopAnalysisIfNeeded();

        });
        return span;
    }
}

function getSquareFromNum(snum) {
    var rownum = Math.floor(snum / 8);
    var colnum = snum - rownum * 8;
    return COLUMNS[7 - colnum] + (rownum + 1);
}

function getPgnFromMovObjRemSubList(sublist, halfnum2, NumForBlack2) {
    var div;
    var pgn = '';
    var NumForBlack = NumForBlack2;
    var si;
    var varDivType = 0;

    pgn += ' ( ';
    var mnum;
    var varid = 'v1x';
    for (si = 0; si < sublist.length; si++) {
        var subitem = sublist[si];
        if (subitem.ItemType == 1) { // variant move
            mov = subitem.Move;
            mnum = mov.MoveNum; // ???
            pgn += getFullPgnFromMoveObjWithNum(mov, mnum, NumForBlack2);
            getFullPgnFromMoveObj(mov)

            halfnum2++; // for next
            NumForBlack2 = false;
        }
        else if (subitem.ItemType == 0) {
            if (subitem.Text.trim() != '') {
                pgn += ' {' + subitem.Text + '} ';

                NumForBlack2 = true;
            }

        }
        else if (subitem.ItemType == 3) { // sign

            pgn += ' ' + subitem.Text + ' '; // ' {' + subitem.Text + '} ';

            NumForBlack2 = true;
        }
        else if (subitem.ItemType == 5) { // command
            if (subitem.Text == "") { }
            else if (subitem.Text == "#") {
                pgn += ' {[' + subitem.Text + ']} ';

                NumForBlack2 = true;
            }
            else if (subitem.Text[0] == "$") {
                pgn += ' ' + subitem.Text + ' ';
            }
            else {
                pgn += ' {' + subitem.Text + '} ';
                NumForBlack2 = true;
            }
        }
        else if (subitem.ItemType == 2) { // subvariant
            var sublist2 = subitem.SubVariantList;
            var NumForBlack2c = !subitem.Move.IsWhite; //  NumForBlack2;
            var halfnum2c = subitem.Move.MoveNum * 2 - 2; // halfnum2;
            if (NumForBlack2c) halfnum2c++;
            pgn += ' ' + getPgnFromMovObjRemSubList(sublist2, halfnum2, NumForBlack2) + ' ';
            halfnum2 = halfnum2c; NumForBlack2 = NumForBlack2c;
        }
    }

    pgn += ' ) ';
    return pgn;
}
function getPgnFromMovObjRem(RemarkVariationsItem) {
    afterRem = 0;
    var mov;
    var numStr = '';
    // remark before move
    var halfnum = 0;
    var halfnum2 = 0;
    var NumForBlack = true;
    var NumForBlack2 = true;
    var varid = 'v1x';
    var pgn = '';
    if (RemarkVariationsItem.length > 0) {
        halfnum = i;
        halfnum2 = i;
        for (r = 0; r < RemarkVariationsItem.length; r++) {
            afterRem = 1;
            var len = RemarkVariationsItem.length;
            remvar = RemarkVariationsItem[r];
            // addVariant ??
            if (remvar.ItemType == 0) {
                if (remvar.Text.trim() != '') {

                    pgn += ' {' + remvar.Text + '} ';
                }
                else
                    afterRem = 0;

            }
            else if (remvar.ItemType == 3) { // sign
                pgn += ' ' + remvar.Text + ' '; // ' {' + remvar.Text + '} ';
                NumForBlack = true;
            }
            else if (remvar.ItemType == 1) { // move
                mov = remvar.Move;
                mnum = mov.MoveNum; // ???
                pgn += getFullPgnFromMoveObjWithNum(mov, mnum, NumForBlack); // getMovStrForMove(mov, halfnum, ForBlackWithMoveNum);
                //pgn += ' {' + remvar.Text + '} ';
                NumForBlack = false;
                halfnum2 = halfnum; // for subvar
                halfnum++; // for next
            }
            else if (remvar.ItemType == 5) { // command
                if (remvar.Text == "") { }
                else if (remvar.Text == "#") {
                    pgn += ' {[' + remvar.Text + ']} ';
                    NumForBlack = true;
                }
                else if (remvar.Text[0] == "$") {
                    pgn += ' ' + remvar.Text + ' ';
                }
                else {
                    pgn += ' {' + remvar.Text + '} ';
                    NumForBlack = true;
                }
            }
            else if (remvar.ItemType == 2) { // subvariant
                var sublist = remvar.SubVariantList;
                pgn += ' ' + getPgnFromMovObjRemSubList(sublist, halfnum2, NumForBlack2) + ' ';
            }
        }

    }
    return pgn;
}

function getFullPgnFromMoveObj(mov) {
    var piece = pieceCode(mov.OriginalPiece, false);
    var from1 = getSquareFromNum(mov.StartPos)
    var to1 = getSquareFromNum(mov.EndPos);
    var toc = '-';
    var add1 = '';
    if (mov.MType > 0) {
        if (mov.MType == 18) {
            return 'O-Oxxxx';
        }
        else if (mov.MType == 2 && (to1 == 'g1' || to1 == 'g8'))
            return 'O-O';
        else if (mov.MType == 2)
            return 'O-O-O';
        else if (mov.MType == 16)
            toc = 'x';
        else if (mov.MType == 3) // enp
            toc = 'x';
        if (toc == 'x' && p_lang == 'h') toc = ':';

        if (mov.MType == 1) add1 = '=Q';
        if (mov.MType == 4) add1 = '=R';
        if (mov.MType == 5) add1 = '=B';
        if (mov.MType == 6) add1 = '=N';
    }
    return piece + from1 + toc + to1 + add1;

}
function getFullPgnFromMoveObjWithNum(mov, mnum, setNumForBlack) {
    var mstr = getFullPgnFromMoveObj(mov);
    if (mov.MColorWhite || mov.IsWhite)
        mstr = '' + mnum + '. ' + mstr;
    else if (setNumForBlack)
        mstr = '' + mnum + '... ' + mstr;
    else
    { } // mnum++;
    return mstr + ' ';
}
function gameToPgn() {
    var mov;
    var mnum = 1;
    var pgn = '';
    var rem;
    for (i = 0; i < lastGame.problemList.length; i++) {
        if (lastGame.RemarkVariationsList[i]) {
            if (lastGame.RemarkVariationsList[i].length > 0)
                pgn += getPgnFromMovObjRem(lastGame.RemarkVariationsList[i]);
        }
        mov = lastGame.problemList[i];

        pgn += getFullPgnFromMoveObjWithNum(mov, mnum); // + ' ';
        if (mov.MColorWhite || mov.IsWhite) { }
        else mnum++;
    }
    if (lastGame.RemarkVariationsList[lastGame.problemList.length])
        pgn += getPgnFromMovObjRem(lastGame.RemarkVariationsList[lastGame.problemList.length]);

    pgn = LastHeaders + pgn;
    lastGame.pgn = pgn;
    LastPgn = pgn;
    return pgn;
}

function AddAnalVariation(move) {

    var move_active = $('.move.active');

    if (move_active.length != 0) {

        AddAnalToLastMove(move_active, move);
    }

}

function IfNoActiveMoveGotoEnd() {
    var move_active = $('.move.active');
    if (move_active.length == 0) {
        last_move = $('#game_html').find('.move').not(".variant .move").last();
        make_move(last_move);
        move_active = $('.move.active');
    }
}
function AddAnalToLastMove(moveDiv, move) {
    // analysis is after last move , so the variation is to next move ot for the end !!
    var white = 1;
    var span; var html; var piece; var numStr = ''; var toMovStr = ''; var fromMovStr = ''; var x = '';
    var evalRemark = '';
    if (move.engEval) evalRemark = move.engEval;
    var attr1 = moveDiv.attr('id');
    var attr2 = moveDiv.attr('fen');
    var attr3 = moveDiv.attr('to');
    var id1 = attr1.replace('mnum', '');
    var coltomov = attr2.substr(attr2.length - 9, 1);
    white = coltomov == 'b'; // who is next !
    var moveObj = move.engMoveObject;
    var remvar = { ItemType: 1, Move: moveObj, Text: move.engFullMove, SubVariantList: null }
    var idi = parseInt(id1) + 1; //next !!

    var last_move = $('#game_html').find('.move').not(".variant .move").last();
    var attr11 = last_move.attr('id');
    moveObj.MoveNum = Math.floor((idi + 1) / 2);
    //ClickedMoveVarid
    if (attr11 == attr1) { // add to end of game
        var serverObj = getMoveServerObject(moveObj);
        lastGame.problemList.push(serverObj); //moveObj);
        var ForBlackWithMoveNum = false;
        var newSpan = AddNewMoveToEnd(remvar, moveObj, idi, moveDiv, last_move, ForBlackWithMoveNum, evalRemark);
        make_move(newSpan);
    }
    else { // variation
        next_move();
        var moveDiv = $('.move.active');
        AddRemarkMove(remvar, moveObj, idi, moveDiv, ForBlackWithMoveNum, evalRemark);
    }
}

function getMoveServerObject(move) {
    var obj = {};
    obj.EndPos = move.EndPos;
    obj.fenAfter = move.fenAfter;
    obj.Helper = move.Helper;
    obj.MColorWhite = move.IsWhite;
    //obj.IsWhite = move.IsWhite;
    obj.MType = move.Type;
    obj.OriginalPiece = move.OriginalPiece;
    obj.StartPos = move.StartPos;
    obj.MoveNum = move.MoveNum;
    return obj;
}
function AddNewMoveToEnd(remvar, mov, halfnum, moveDiv, last_move, ForBlackWithMoveNum, evalRemark, getpgn) {
    var numStr = '';
    var varid = '';
    if (remvar.ItemType == 1) { // move
        mov = remvar.Move;
        lastBoardFen = mov.fenAfter;
        lastFen = mov.fenAfter;
        numStr = getMovStrForMove(mov, halfnum, ForBlackWithMoveNum, getpgn); // NumForBlack); // getMovStrForHalfNum(halfnum, NumForBlack);
        span = getOneMoveSpan(numStr, mov, varid, getpgn);
        if (!getpgn)
            last_move.after(span);
        else span += ' ';
        return span;
    }
}
function AddRemarkMove(remvar, mov, halfnum, moveDiv, ForBlackWithMoveNum, evalRemark, getpgn) {
    var numStr = '';
    var pgn = '';
    var varid = ClickedMoveVarid; //'v1x';
    var NewVar = false;
    if (varid == '') {
        NewVar = true;
        varid = 'v1x'; //?
    }
    var openvarSpan;
    if (NewVar) {
        varDivType = 1;
        //if (p_lang == 'h')
        //    div = $('<div />').attr('class', 'varianth');
        //else
        if (!getpgn) {
            div = $('<div />').attr('class', 'variant' + add_lang);
            moveDiv.after(div);

            openvarSpan = $('<span />').html('( '); div.append(openvarSpan);
            var closespan = $('<span />').html(' )'); div.append(closespan);
        }
        else {
            //?
            //pgn+='( '+
        }
    }
    if (remvar.ItemType == 1) { // move
        mov = remvar.Move;
        lastBoardFen = mov.fenAfter;
        lastFen = mov.fenAfter;
        numStr = getMovStrForMove(mov, halfnum, ForBlackWithMoveNum, getpgn); // getMovStrForHalfNum(halfnum, NumForBlack);
        span = getOneMoveSpan(numStr, mov, varid, getpgn);
        if (!getpgn)
            openvarSpan.after(span);
        else
            pgn += ' ';

    }
    if (getpgn) return pgn;
}

setFenAndGameOnBoard = function () {
    var fen = $('#inputFen2').val().trim();
    var inputEvent = $('#inputEvent').val().trim();
    var inputAnnotator = $('#inputAnnotator').val().trim();
    var inputWhite = $('#inputWhite').val().trim();
    var inputBlack = $('#inputBlack').val().trim();

    //var wb = $('#cb555').is(":checked");
    //alert(wb);
    //if (wb) board55.setPlayColor('w'); else board55.setPlayColor('b');
    //fen = board55.getFen();
    var lf = '\r\n';
    LastPgn = '[Event "' + inputEvent + '"]' + lf + '[FEN "' + fen + '"]' + lf + '[Annotator "' + inputAnnotator + '"]' + lf + '[White "' + inputWhite + '"]' + lf + '[Black "' + inputBlack + '"]' + lf;
    LastPgn += lf + $('#inputMoves').val().trim();
    //$('#pgn_text_area').val(LastPgn);
    lastBoardFen = fen;
    var underid = '#board_html_set'; //'#game_moves_html';
    $(underid).empty();
    $(underid).hide();
 
    clearAllTimeouts();
    setByHboard(4);

    //$('#pgn_type').val('1');
    disp_game_save_panel('Save', LastPgn);
    //$('#pgn_text_area').val(LastPgn);
    SaveUpd = 1;


    $("#myModalSetFenGame").modal('hide');
}

