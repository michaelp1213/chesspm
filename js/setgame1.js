
function makeCommand(cmd) {
    switch (cmd.cmd) {
        case 5001: // change to text of moves
            setMovesNoCanvas(1);
            break;
        case 5010: // change to canvas with text of moves
            setCanvasOnPart(10, g_sq);
            break;
        case 5020: // change to canvas no text of moves
            setCanvasNoMoves(20, g_sq, cmd.cmdparams);
            break;
        case 5040: // right size
            setRightWidth(40, cmd.cmdparams);
            break;
        default:
            break;
    }
}
function doReplay(waitmsec, cmdArr) {
    clearAllTimeouts();
    initial_position();
    scrollToTop();
    var len = getTotalMoves(); //TotlMoves; 
    if (limitMoves > 0) len = limitMoves;
    var wmsec
    var cnt = 1; // first wait too ! was 0
    if (p_play > '0') {
        $('#btn_replay').hide(); $('#btn_replay_here').hide();
        $('#btn_replay_stop').show();
    }
    var wtime = waitmsec * cnt;
    if (cmdArr) {
        if (cmdArr[0] && cmdArr[0] != null) {
            timeouts.push(setTimeout(makeCommand, wtime, cmdArr[0]));             
            if (cmdArr[0].cmd >= 5001 && cmdArr[0].cmd < 5050) {
                wmsec = parseInt(cmdArr[0].cmdparams[1]);
                wtime += wmsec;
            }
        }
    }
    for (var i = 1; i <= len; i++) {
        var madeCommand = false;
        if (cmdArr) {
            if (cmdArr[i] && cmdArr[i] != null) {                
                timeouts.push(setTimeout(makeCommand, wtime, cmdArr[i]));
                madeCommand = true;
                if (cmdArr[i].cmd >= 5001 && cmdArr[i].cmd < 5050) {
                    wmsec = parseInt(cmdArr[i].cmdparams[1]);
                    wtime += wmsec;
                }
            }
        }
        timeouts.push(setTimeout(next_move, wtime, ''));
        cnt++;
        wtime += waitmsec;

    }
    //makeCaptures(waitmsec, len);
    if (p_voice > 0) {
        timeouts.push(setTimeout(voiceAfterGame, waitmsec * (len + 1), ''));
    }
    timeouts.push(setTimeout(showPlayButton, waitmsec * cnt, '')); //wtime
     
}


function getMoveAndNumByElm(elm, moveObj) {
    moveObj.mnum = 0;
    moveObj.moveStr = '';
    moveObj.mid = 0;
    if (elm) {
        var id = elm.attr('id');
        if (id && id != null)
            moveObj.mid = parseInt(id.replace('mnum', ''));
        else
            return;
        var ch = elm.attr('c');
        p_hmnum = moveObj.mid;
        if (elm[0].innerHTML != null) {
            var moveStr = elm[0].innerHTML.trim();
            if (moveStr[0] >= '1' && moveStr[0] <= '9') {
                if ((p1 = moveStr.indexOf('…&nbsp;')) > 0) {
                    moveObj.mnum = parseInt(moveStr.substring(0, p1));
                    moveObj.moveStr = moveStr.substring(p1).replace('…&nbsp;', '').trim();
                }
                else if ((p2 = moveStr.indexOf('.&nbsp;')) > 0) {
                    moveObj.mnum = parseInt(moveStr.substring(0, p2));
                    moveObj.moveStr = moveStr.substring(p2).replace('.&nbsp;', '').trim();
                }
                else if ((p2 = moveStr.indexOf('.')) > 0) {
                    moveObj.mnum = parseInt(moveStr.substring(0, p2));
                    moveObj.moveStr = moveStr.substring(p2).replace('.', '').trim();
                }
            }
            else
                moveObj.moveStr = moveStr;
        }
        moveObj.ch = ch;
    }
}
function getActiveMoveAndNum(moveObj) {
    var elm = $('.move.active');
    getMoveAndNumByElm(elm, moveObj);
}
function doReplayFromHere(waitmsec, cmdArr) {
    clearAllTimeouts();
    scrollToTop();
    var moveObj = {};
    getActiveMoveAndNum(moveObj);
    if (moveObj.mid == 0) {
        doReplay(waitmsec, cmdArr);
        return;
    }
    var len = TotlMoves; if (limitMoves > 0) len = limitMoves;
    var cnt = 1; // first wait too ! was 0
    for (var i = moveObj.mid + 1; i <= len; i++) {

        timeouts.push(setTimeout(next_move, waitmsec * cnt, ''));
        cnt++;

    }
    if (p_voice > 0) {
        timeouts.push(setTimeout(voiceAfterGame, waitmsec * (cnt), ''));
    }
    timeouts.push(setTimeout(showPlayButton, waitmsec * cnt, ''));
}
function voiceAfterGame() {
    if (p_voice > 0) {
        var res = lastGame.result;
        if (res == 1)
            tellSentence('Applause', '1', '0');
        else if (res == 2)
            tellSentence('Applause', '0', '1');
        else
            tellSentence('Applause', '1', '2', '1', '2');
    }
}
function doReplayFromLast(waitmsec) {
    clearAllTimeouts();
    scrollToTop();
    // find move num
    var mnum = 0;
    var moveDiv = $('.move.active');
    if (moveDiv) {
        var attr1 = moveDiv.attr('id');
        if (attr1) {
            var id1 = attr1.replace('mnum', '');
            mnum = parseInt(id1);
        }
    }
    var len = TotlMoves - mnum;
    var cnt = 1; // first wait too ! was 0
    if (p_play > '0') {
        $('#btn_replay').hide(); $('#btn_replay_here').hide();
        $('#btn_replay_stop').show();
    }
    for (var i = 1; i <= len; i++) {

        timeouts.push(setTimeout(next_move, waitmsec * cnt, ''));
        cnt++;
    }
    if (p_voice > 0) {
        timeouts.push(setTimeout(voiceAfterGame, waitmsec * (len + 1), ''));
    }
    timeouts.push(setTimeout(showPlayButton, waitmsec * cnt, ''));
}
function doReplayNoTimeout() {
    clearAllTimeouts();
    initial_position();
    scrollToTop();
    var len = TotlMoves; if (limitMoves > 0) len = limitMoves;
    var cnt = 1; // first wait too ! was 0
    for (var i = 1; i <= len; i++) {
        next_move();
    }
    timeouts.push(setTimeout(showPlayButton, 1000, ''));
}


function getOneMoveSpan(numStr, mov, varid, getpgn,isch) {
    x = ''; // ??
    var pgn = '';
    helper = '';
    piece = pieceCode(mov.OriginalPiece, pieceNot);
    toMovStr = algebraic(mov.EndPos);
    toMovStrbase = toMovStr;
    fromMovStr = algebraic(mov.StartPos);
    if (mov.Type && !mov.MType) // !!!?????
        mov.MType = mov.Type;
    if (mov.MType == 18) {
        piece = '';
        if (mov.EndPos == 57 || mov.EndPos == 1)
            toMovStr = 'O-O';
        else
            toMovStr = 'O-O-O';
    }
    else if (mov.MType == 2) { //0-0
        piece = '';
        if (mov.EndPos == 57 || mov.EndPos == 1)
            toMovStr = 'O-O';
        else
            toMovStr = 'O-O-O';
    }
    var spec = 0; var tak = 0;
    if (mov.MType >= 16 && mov.MType <= 22) {
        spec = mov.MType - 16;
        tak = 1;
    }
    else {
        spec = mov.MType;
    }
    if (tak) { // x
        x = 'x'; if (p_lang == 'h') x = ':';
        if (mov.OriginalPiece <= 1 && (!mov.Helper))
            x = fromMovStr[0] + x;
    }
    var madd = '';
    if (spec == 3) { // x emp
        x = 'x'; if (p_lang == 'h') x = ':';
        if (mov.OriginalPiece <= 1)
            x = fromMovStr[0] + x;
    }
    else if (spec == 1) {
        if (p_lang == 'h') toMovStr += "=מה";
        else madd = "=Q";
    }
    else if (spec == 4) {
        if (p_lang == 'h') toMovStr += "=צ";
        else madd = "=R";
    }
    else if (spec == 5) {
        if (p_lang == 'h') toMovStr += "=ר";
        else madd = "=B";
    }
    else if (spec == 6) {
        if (p_lang == 'h') toMovStr += "=פ";
        else madd = "=N";
    }
    if (mov.Helper) {
        helper = mov.Helper;
    }
    toMovStr += madd;
    if (piece == '' && fromMovStr.length == 2 && toMovStr.length == 2) {
        if (fromMovStr[0] != toMovStr[0]) {
            helper = fromMovStr[0]; x = 'x'; if (p_lang == 'h') x = ':';
        }
    }
    html = '&nbsp;'+numStr + piece + helper + x + toMovStr;
    var mnum = (mov.MoveNum - 1) * 2 + 1;
    var wb = 1;
    if (!mov.MColorWhite && !mov.IsWhite) { mnum++; wb = 2; } // ??????????????
    var ch = '0';
    if (isch)
        ch = '1';
    if (!getpgn) {
        span = $('<span />').attr('class', 'move').attr('mnum', mov.MoveNum + '_' + wb).attr('id', 'mnum' + varid + mnum).attr('from', fromMovStr).attr('to', toMovStrbase).attr('a', madd).attr('fen', mov.fenAfter).attr('c', ch).html(html);
        return span;
    }
    else {
        return html;
    }
}

function getMovStrForHalfNum(halfnum, numForBlack) {
    // 21=11w
    var mnum = Math.floor((halfnum + 1) / 2);
    var isBlack = (halfnum + 1) - mnum * 2;
    if (!numForBlack) // && isBlack)
        return '';
    else if (isBlack)
        return mnum + '…'; // ...'; // …
    else // white
        return mnum + '.';
}
function getMovStrForMove(move, halfnum, ForBlackWhithNum, getpgn) {
    // 21=11w
    var mnum = move.MoveNum;
    if (mnum == 0)
        return getMovStrForHalfNum(halfnum, ForBlackWhithNum);
    var isBlack = !move.IsWhite;
    if (!ForBlackWhithNum && isBlack)
        return '';
    else if (isBlack && !getpgn)
        return mnum + '…&nbsp;'; // ...'; // …
    else if (!getpgn)
        return mnum + '.&nbsp;';
    else if (isBlack && getpgn) // getpgn
        return mnum + '... '; // ...'; // …
    else if (getpgn) // white getpgn 
        return mnum + '. ';
    else // ?
        return mnum + '. ';
}
// not working , to prepare
function getMovStrWithNumForMove(move, halfnum, numForBlack) {
    // 21=11w
    var mnum = move.MoveNum;
    if (mnum == 0)
        return getMovStrForHalfNum(halfnum, numForBlack);
    var isBlack = !move.IsWhite;
    if (numForBlack) // && isBlack)
        return ''; // + mnum + '… &nbsp;';
    else // white
        return mnum + '.';
}




function showRemarkVariantTree(topdiv, sublist, halfnum2, NumForBlack2, getpgn) {
    var div;
    var wwidth = $(window).width();
    NumForBlack = NumForBlack2;
    var si;
    var pgn = '';
    var varDivType = 0;
    if (sublist.length == 1 && sublist[0].ItemType == 5) {
        if (!getpgn) {
            div = $('<div />').attr('class', '').attr('style', 'display:inline;'); topdiv.append(div);
        }
    }
    else if (sublist.length == 1 && sublist[0].ItemType == 0) {
        if (!getpgn) {
            div = $('<div />').attr('class', '').attr('style', 'display:inline;'); topdiv.append(div);
        }
    }
    else {
        varDivType = 1;
        //if (p_lang == 'h') div = $('<div />').attr('class', 'varianth');
        //else
        if (!getpgn) {
            
            if (p_hboard == '22' || p_hboard == '14' || ((p_hboard == '11' || p_hboard == '12') && wwidth < 500))
                div = $('<div />').attr('class', 'comminline variant' + add_lang);
            else
                div = $('<div />').attr('class', 'variant' + add_lang);
            topdiv.append(div);
            span = $('<span />').html('( '); div.append(span);
        }
        else pgn += '( ';
    }
    var varid = 'v1x';
    for (si = 0; si < sublist.length; si++) {
        var subitem = sublist[si];
        if (subitem.ItemType == 1) { // variant move
            mov = subitem.Move;
            var NumForBlack = true; //!mov.IsWhite; // true;
            //NumForBlack2 = !mov.IsWhite; // ????????????
            lastFen = mov.fenAfter;
            lastBoardFen = mov.fenAfter;
            numStr = getMovStrForMove(mov, halfnum2, NumForBlack2, getpgn); // getMovStrForHalfNum(halfnum2, NumForBlack2);
            span = getOneMoveSpan(numStr, mov, varid, getpgn,0);
            if (!getpgn)
                div.append(span);
            else
                pgn += span + ' ';
            halfnum2++; // for next
            NumForBlack2 = false;
        }
        else if (subitem.ItemType == 0) {
            var txt1=subitem.Text.trim();
            if (txt1 != '') {
                if (!getpgn) {
                    //span = $('<span />').attr('class', 'comment' + add_lang).html(subitem.Text);
                    //div.append(span);


                    appendRemarkAndBoardInside(div, '', txt1);
                }
                else {
                    if (subitem.Text != '+' && subitem.Text != '#') // ??
                     pgn += ' { ' + subitem.Text + ' } ';
                }

                NumForBlack2 = true;
            }

        }
        else if (subitem.ItemType == 3) { // sign
            // ??????????? May be to remove space before sign - here
            if (!getpgn) {               
                var remst1 = subitem.Text;
                if (replaceSpecialChars)
                    remst1 = replaceSpecialChars(remst1);
                if (remst1.length > 2)
                    remst1 = ' ' + remst1;
                span = $('<span />').attr('class', 'sign15' + add_lang).html(remst1); // was sign10
                div.append(span);
            }
            else {
                if (subitem.Text != '+' && subitem.Text != '#')
                    pgn += getPgnMayBeSign(subitem.Text);
            }
            NumForBlack2 = false; // true;
        }
        else if (subitem.ItemType == 10) { // score - new         
            if (!getpgn) {
                var remst1 = subitem.Text;
                if (replaceSpecialChars)
                    remst1 = replaceSpecialChars(remst1);
                span = $('<span />').attr('class', 'sign20' + add_lang).html(remst1); 
                div.append(span);
            }
            else {
                if (subitem.Text != '+' && subitem.Text != '#')
                    pgn += ' { ' + subitem.Text + ' } ';;
            }
            NumForBlack2 = false; // true;
        }

        else if (subitem.ItemType == 6) { // diag
            if (getpgn) {
                pgn += ' {[#]} ';
            }
            else {
                if (p_hboard == '22' || p_hboard == '14' || ((p_hboard == '12') && wwidth < 500)) { }
                else {
                    //LastSmallBoard++;
                    lastBoardFen = subitem.Text;
                    insertSmallDiagramDiv(div);
                }
            }
        }
        else if (subitem.ItemType == 7) { // spec
            if (getpgn) {
                pgn += ' {[%' + subitem.Text + ']} ';
            }
            else {
            }
        }
        else if (subitem.ItemType == 5) { // command

            if (subitem.Text == "#" || subitem.Text == "[#]") { // diagram
                if (getpgn) {                  
                    pgn += ' {[#]} ';
                }
                else {

                    if (p_hboard == '22' || p_hboard == '14' || ((p_hboard == '12') && wwidth < 500)) { }
                    else {
                        //LastSmallBoard++;
                        insertSmallDiagramDiv(div);
                    }
                }

                NumForBlack2 = true;
            }
            else {
                if (!getpgn) {
                    span = $('<span />').attr('class', 'sign20' + add_lang).html(getDolarSign(subitem.Text));
                    div.append(span);
                }
                else {
                    if (subitem.Text != '+' && subitem.Text != '#')
                        pgn += ' ' + subitem.Text + ' ';
                }

                NumForBlack2 = false; // true;
            }
        }

        else if (subitem.ItemType == 2) { // subvariant
            var sublist2 = subitem.SubVariantList;
            var NumForBlack2c = !subitem.Move.IsWhite; //  NumForBlack2;
            var halfnum2c = subitem.Move.MoveNum * 2 - 2; // halfnum2;
            if (NumForBlack2c) halfnum2c++;
            var subpgn = showRemarkVariantTree(div, sublist2, halfnum2, NumForBlack2, getpgn);
            if (getpgn) {
                //pgn += ' ( ' + subpgn + ' ) ';
                pgn += subpgn;
            }
            halfnum2 = halfnum2c; NumForBlack2 = NumForBlack2c;
        }
    }

    if (varDivType == 1) {
        if (!getpgn)
        { span = $('<span />').html(' ) '); div.append(span); }
        else pgn += ' ) ';
    }

    if (getpgn)
        return pgn;
}

function getPgnMayBeSign(Text) {
    var pgn = '';
    if (Text == '!')
        pgn = ' $1 ';
    else if (Text == '?')
        pgn = ' $2 ';
    else if (Text == '!!')
        pgn = ' $3 ';
    else if (Text == '??')
        pgn = ' $4 ';
    else if (Text == '!?')
        pgn = ' $5 ';
    else if (Text == '?!')
        pgn = ' $6 ';

    else if (Text[0] == '!' || Text[0] == '?')
        pgn = ' ' + remvar.Text + ' ';
    else if (Text[0] >= '1' || Text[0] <= '9')
        pgn = ' $' + Text + ' ';
    else
        pgn = ' {' + Text + '} ';
    return pgn;
}

function getTextRemarkSpan(remst1, getpgn,  NumForBlack, afterRem) {
    var retObj = {};
    retObj.afterRem = 0;
    retObj.pgn = '';
    retObj.span = {};
    retObj.NumForBlack = NumForBlack; retObj.afterRem = afterRem;

    if (!getpgn) {
        var remst1 = remst1.trim();
        // may be add () or {} ?
        if (remst1.length < 18 && remst1.length > 0 && remst1[0] == '[') {
            if (remst1.substr(0, 5) == '[%clk') {
                var rem2 = remst1.replace('[%clk', '').replace(']', '');
               
                retObj.span = $('<span />').attr('class', 'comment5' + add_lang).html(rem2.trim());
            }
            else if (remst1.substr(0, 5) == '[%emt') {
                var rem2 = remst1.replace('[%emt', '').replace(']', '');

                retObj.span = $('<span />').attr('class', 'comment5' + add_lang).html('(' + rem2.trim() + ')');
            }
            else if (remst1.substr(0, 5) == '[%evt') {
                var rem2 = remst1.replace('[%emt', '').replace(']', '');

                retObj.span = $('<span />').attr('class', 'comment5' + add_lang).html(''); //'(' + rem2.trim() + ')');
            }

            else {
             
                if (replaceSpecialChars)
                    remst1 = replaceSpecialChars(remst1);
                retObj.span = $('<span />').attr('class', 'comment10' + add_lang).html(remst1);
                retObj.NumForBlack = true; retObj.afterRem++;
            }

        }
        else if (remst1.length < 10) {
           

            if (remst1 == '#') {
                remst1 = '&nbsp;Mate';
            }
            else if (remst1.toLowerCase() == 'zz') {
                remst1 = '&nbsp;Zugzwang';
            }
            else if (remst1.toLowerCase() == 'mzz') {
                remst1 = '&nbsp;Mutual Zugzwang';
            }
            retObj.span = $('<span />').attr('class', 'comment10' + add_lang).html(remst1);  

            retObj.NumForBlack = true; retObj.afterRem++;
            // no afterRem ??
        }
        else {
         

            if (replaceSpecialChars)
                remst1 = '&nbsp;' + replaceSpecialChars(remst1);


            if (p_hboard == '22' || p_hboard == '14' || ((p_hboard == '11' || p_hboard == '12') && wwidth < 500))
                retObj.span = $('<span />').attr('class', 'comminline comment30' + add_lang).html(remst1);
            else
                retObj.span = $('<span />').attr('class', 'comment30' + add_lang).html(remst1);
            retObj.NumForBlack = true; retObj.afterRem++;
        }
     

    }

    else { // getpgn
        
        if (remst1 != '+' && remst1 != '#') // ??
            retObj.pgn += ' { ' + remst1 + ' } ';
    }
    return retObj;
}

function showRemarkTree(RemarkVariationsList, i, getpgn) {
    afterRem = 0;
    var mov;
    var numStr = '';
    var pgn = '';
    // remark before move
    var halfnum = 0;
    var halfnum2 = 0;
    var NumForBlack = true;
    var NumForBlack2 = true;
    var varid = 'v1x';
    var wwidth = $(window).width();
    if (RemarkVariationsList[i]) {
        if (RemarkVariationsList[i].length > 0) {
            halfnum = i;
            halfnum2 = i;
            for (r = 0; r < RemarkVariationsList[i].length; r++) {
                //afterRem = 1;
                var len = RemarkVariationsList[i].length;
                remvar = RemarkVariationsList[i][r];
                // addVariant ??
                if (remvar.ItemType == 0) { // text
                    if (!remvar.Text) remvar.Text = '';
                    if (remvar.Text.trim() != '') {
                        var retObj = getTextRemarkSpan(remvar.Text, getpgn,  NumForBlack, afterRem);
                        span = retObj.span;
                        if (!getpgn) {
                            $('#game_moves_html').append(span);
                            NumForBlack = retObj.NumForBlack; afterRem = retObj.afterRem;
                        }
                        else
                            pgn += retObj.pgn;

                    }
                    else { // text empty

                    }

                }
                else if (remvar.ItemType == 3) { // sign or + may be
                    if (!getpgn) {                        
                        var txt = remvar.Text;
                        if (replaceSpecialChars)
                            txt = replaceSpecialChars(txt);
                        
                        if (txt.length > 2)
                            txt = ' ' + txt;
                        span = $('<span />').attr('class', 'sign15' + add_lang).html(txt);// was sign10
                        $('#game_moves_html').append(span);
                    }
                    else { // getpgn
                        if (remvar.Text == '+' || remvar.Text == '#')
                        { }
                        else
                            pgn += getPgnMayBeSign(remvar.Text);
                    }
                    NumForBlack = false; // true; // no afterrem
                }
                else if (remvar.ItemType == 10) { // Comp. Score
                    if (!getpgn) {
                        var txt = remvar.Text;
                        span = $('<span />').attr('class', 'sign20' + add_lang).html(txt);// was sign10 - new
                        $('#game_moves_html').append(span);
                    }
                    else { // getpgn
                        if (remvar.Text == '+' || remvar.Text == '#')
                        { }
                        else
                            pgn += ' { ' +remvar.Text + ' } ';
                    }
                    NumForBlack = false; // true; // no afterrem
                }
                else if (remvar.ItemType == 1) { // move
                    mov = remvar.Move;
                    lastBoardFen = mov.fenAfter;
                    lastFen = mov.fenAfter;
                    numStr = getMovStrForMove(mov, halfnum, NumForBlack, getpgn); // getMovStrForHalfNum(halfnum, NumForBlack);
                    span = getOneMoveSpan(numStr, mov, varid, getpgn,0);
                    if (!getpgn)
                        $('#game_moves_html').append(span);
                    else {
                        pgn += span + ' ';
                    }
                    NumForBlack = false;
                    halfnum2 = halfnum; // for subvar
                    halfnum++; // for next
                    afterRem++;
                }

                else if (remvar.ItemType == 6) { // diag
                    if (getpgn) {
                        pgn += ' {[#]} ';
                    }
                    else {
                        if (p_hboard == '22' || p_hboard == '14' || ((p_hboard == '12') && wwidth < 500)) { }
                        else {
                            fatherdiv = $('#game_moves_html');
                            lastBoardFen = remvar.Text;
                            insertSmallDiagramDiv(fatherdiv, 1);
                        }
                    }
                }
                else if (remvar.ItemType == 7) { // spec
                    if (getpgn) {
                        pgn += ' {[%'+remvar.Text+']} ';
                    }
                    else {
                    }
                }

                else if (remvar.ItemType == 5) { // command
                    if (remvar.Text == "#" || remvar.Text == "[#]") {

                        if (getpgn) {
                            if (remvar.Text == "[#]")
                                pgn += ' {' + remvar.Text + '} ';
                            else {
                                pgn += ' {[' + remvar.Text + ']} ';
                            }
                        }
                        else {

                            if (p_hboard == '22' || p_hboard == '14' || ((p_hboard == '12') && wwidth < 500)) { }
                            else {
                                fatherdiv = $('#game_moves_html');
                                insertSmallDiagramDiv(fatherdiv, 1);
                              

                            }
                        }
                        NumForBlack = true;
                        afterRem++;
                    }
                    else {
                        //if (p_lang == 'h') span = $('<span />').attr('class', 'sign10h').html(getDolarSign(remvar.Text));
                        //else
                        if (!getpgn) {
                            if (remvar.Text.length > 2)
                                remvar.Text = ' ' + remvar.Text;
                            span = $('<span />').attr('class', 'sign15' + add_lang).html(getDolarSign(remvar.Text)); // was sign10
                            $('#game_moves_html').append(span);
                        }
                        else {
                            if (remvar.Text != '+' && remvar.Text != '#')
                                pgn += remvar.Text; // ' { ' + remvar.Text + ' } ';
                        }
                        NumForBlack = false; //true;
                        // no afterRem
                    }
                }
                else if (remvar.ItemType == 2) { // subvariant
                    var sublist = remvar.SubVariantList;
                    //if (getpgn)
                    //    pgn += ' ( ';
                    var s = showRemarkVariantTree($('#game_moves_html'), sublist, halfnum2, NumForBlack2, getpgn);
                    if (getpgn)
                        pgn += s; //+ ' ) ';
                    afterRem++;
                }
            }
        }
    }
    if (getpgn)
        return pgn;
    else
        return afterRem;
}
var TotlMoves = 0;
function isRemCheck(j,RemarkVariationsList) {
    var i=j+1;
    var isch=0;
    if (RemarkVariationsList[i]) {
        if (RemarkVariationsList[i].length > 0) {


            remvar = RemarkVariationsList[i][0];
            if (remvar.ItemType == 3 && remvar.Text == '+')
                isch = 1;
        }
    }
    return isch;
}

//RemarksListOfList,
function createGameHtml(game_moves_html, problemList, result, RemarkVariationsList, movenum, wb, getpgn,mline) {
    //$('#game_moves_html').empty();
    var pgn = '';
    if (!getpgn)
        game_moves_html.empty();
    var span; var html; var piece; var numStr = ''; var toMovStr = ''; var fromMovStr = ''; var x = '';
    var white = 1;
    if (wb == 2) white = 0;
    var mnum = movenum - 1;
    if (mnum < 0) mnum = 0;
    var afterRem = 1;
    var varid = '';
    var first = true;
    var fatherdiv = $('#game_moves_html');
    var cnt = 0;
    var wwidth = $(window).width();
    if (p_hboard == '11') {
        $('#timerhdr1').attr('style', 'height: 128px; max-height: 128px;overflow: hidden;margin-left:128px;');
        toptoMoveDiff = 138; // change with timerhdr1      
        hboard10board.position(lastBoardFen);
    }
    else if (p_hboard == '12' || p_hboard == '14') {
        $('#timerhdr1').attr('style', 'height: 176px; max-height: 176px;overflow: hidden;margin-left:178px;');
        toptoMoveDiff = 184; // change with timerhdr1      
        hboard10board.position(lastBoardFen);
    }
    else if (p_hboard == '10') {
        hboard10board.position(lastBoardFen);
    }
    if (p_diag > 0 && !getpgn) { 
            //LastSmallBoard++;
            insertSmallDiagramDiv(fatherdiv);
    }
    if (getpgn && mline > 0) {
        pgn += '1. -- ';
    }
    var nlineop = 0;
    var prevlev = 0;
    var newvar = true;
    var prevmov = {};
    var first = 1; var firstmov = 1; var closchar = '';
    for (i = 0; i < problemList.length; i++) {
        cnt++;
        var mov;
        var numStr = '';
        afterRem = 0;

       
        mov = problemList[i];

        if (mov.OriginalPiece >= 0) {
            lastBoardFen = mov.fenAfter;
            if (white)
                mnum++;
        }
        if (!getpgn)
            afterRem = showRemarkTree(RemarkVariationsList, i, getpgn);
        else {


            var pgnadd = showRemarkTree(RemarkVariationsList, i, getpgn);
            pgn += ' ' + pgnadd + ' ';
            if (pgnadd.trim() != '') {
                var pgnt = pgnadd.trim();
                if (pgnt[0] == '$' && pgnt.length < 6)
                    afterRem = 0;
                else
                    afterRem = 1; // ???
            }
            else
                afterRem = 0;
        }



        if (mov.OriginalPiece == -1) {
            // main text
            var retObj = getTextRemarkSpan(mov.fenAfter, getpgn,  false, afterRem);
            span = retObj.span;
            if (!getpgn) {
               
               // NumForBlack = retObj.NumForBlack;
                afterRem = retObj.afterRem;
                if (mline > 0) {
                    if (!first) 
                        game_moves_html.append("<span style='font-weight:600;font-size:16px;'> "+closchar+"</span><br/>");
                    closchar = '';
                    //game_moves_html.append("<span style='font-weight:600;font-size:16px;'> - </span>");
                    //afterRem = true;
                    nlineop = 1; first = 0;
                    
                }
                $('#game_moves_html').append(span);
                
            }
            else
                pgn += retObj.pgn;
        }
        else if (mov.OriginalPiece == -2) {
            // main text
            var retObj = getTextRemarkSpan(mov.fenAfter, getpgn, false, afterRem);
            span = retObj.span;
            if (!getpgn) { 
                afterRem = retObj.afterRem;              
                $('#game_moves_html').append(span);               
            }
            else
                pgn += retObj.pgn;
        }
        else {
           

            var newline = false;
            if ((mline > 0) && (firstmov || mov.MoveNum < prevmov.MoveNum || (mov.MoveNum == prevmov.MoveNum && mov.MColorWhite))) {
                newline = true;
            }
            
            if (!getpgn) {
                if (newline && (!first || nlineop == 1) && closchar!='')
                    game_moves_html.append("<span style='font-weight:600;font-size:16px;'> "+closchar+"</span><br/><br/>");
                if (newline) {
                    closchar = ']';
                    game_moves_html.append("<span style='font-weight:600;font-size:16px;'> [ </span>");
                    afterRem = true; nlineop = 1;
                    first = 0; firstmov = 0;
                }
            }
            else {
                if (newline && i > 0)
                    pgn += " ) ";
                if (newline) {
                    pgn += " ( ";
                    afterRem = true; nlineop = 1;
                }
            }
            if (newline) { // && i > 0) {
                white = mov.MColorWhite;
                mnum = mov.MoveNum;
            }
            prevmov = mov;
            prevlev = mov.Level;




            if (first && wb == 2) {
                if (movenum > 1) mnum = movenum;
                else mnum = 1;
                if (!getpgn)
                    numStr = '' + mnum + '…&nbsp;';
                else
                    numStr = '' + mnum + '... ';
            }
            else if (white && !getpgn)
                numStr = '' + mnum + '.&nbsp;';
            else if (afterRem && !getpgn)
                numStr = '' + mnum + '…&nbsp;'; //'... &nbsp;';
            else if (white && getpgn)
                numStr = '' + mnum + '. ';
            else if (afterRem && getpgn)
                numStr = '' + mnum + '... '; //'... &nbsp;';
            else
                numStr = '';
            first = false;


            // main move
            var isch = isRemCheck(i, RemarkVariationsList);
            span = getOneMoveSpan(numStr, mov, varid, getpgn,isch);

           
            if (!getpgn)
                game_moves_html.append(span);
            else
                pgn += span + ' ';
            white = !white;

            if (p_hboard == '22' || p_hboard == '14' || ((p_hboard == '12') && wwidth < 500)) { }
            else {
                if (p_diag > 0 && !getpgn) {
                    if (cnt >= p_diag * 2) {

                        //LastSmallBoard++;
                        insertSmallDiagramDiv(fatherdiv);
                        cnt = 0;
                    }
                }
            }
        }
    }

 


    // remark after ??
    if (!getpgn)
        afterRem = showRemarkTree(RemarkVariationsList, problemList.length, getpgn);
    else {

        var pgnadd = showRemarkTree(RemarkVariationsList, problemList.length, getpgn);
        pgn += ' ' + pgnadd + ' ';
        if (pgnadd.trim() != '')
            afterRem = 1; // ???
        else
            afterRem = 0;
    }


    if (mline > 0 && nlineop) {
        if (!getpgn)
            fatherdiv.append("<span style='font-weight:600;font-size:16px;'> "+closchar+" </span>");
        else
            pgn += " ) ";
    }

    if (p_sres && p_sres == 0) { }
    else {
        span = $('<span />').attr('class', 'result').html(strResult(result, 0));
        //$('#game_moves_html').append(span);
        if (!getpgn)
            game_moves_html.append(span);
        else
            pgn += ' ' + strResult(result, 0);
    }
    if (getpgn)
        return pgn;
    else { }
    if (p_diag > 0 && !getpgn) {
       
        if (p_hboard == '22' || p_hboard == '14' || (( p_hboard == '12') && wwidth < 500)) { }
        else {
            //LastSmallBoard++;
            insertSmallDiagramDiv(fatherdiv);
        }
    }

    var br = $('<br />');
    fatherdiv.append(br);
}

function setGameChooser() {
    $('#game_chooser').change(function () {
        clearAllTimeouts();
        remove_arrows();
        remove_squares();
        var game_n = $(this).val();
        var game = gameList[game_n];
        p_gn = game.GameId;
        p_gamenum = game_n;
        if (p_solve > 0 && p_solve < 10 && p_islist == 1)
            setPuzzle(game, p_islist);
        else 
            setNewGame(game, p_hm);

    });
}



function getSideToMove(fen) {
  if (!fen) return null;

  const parts = fen.trim().split(/\s+/);
  return parts[1] === 'w' ? 'w' : 'b';
}

function setGameFen(game) {
    initial_fen = Boolean(game.GameFEN) ? game.GameFEN : start_Board_Fen;
    //alert(initial_fen);
    try {
        if (game.GameFEN && game.GameFEN != '') {
            var fenarr = game.GameFEN.split(' ');
            if (fenarr != null && fenarr.length > 5)
                movenum = parseInt(fenarr[5]);
        }
    }
    catch (e) { }
    lastFen = initial_fen;
    board.position(lastFen);
    lastBoardFen = lastFen;
}

function setPrizeFromHdr(game) {
    if (game.hdr && game.hdr != null) {
        var hdrarr = game.hdr.split(':');
        if (hdrarr.length > 1) {
            game.hdr = hdrarr[0].trim();
            game.pri = hdrarr[1].trim();
        }
    }
}

function setNewGame(game, hm, fp, tostart) {
  
    if (!hm || hm == '') {
        if (game.StartHmnum > 0)
            hm = game.StartHmnum;
    }
    $('#btn_replay').show(); $('#btn_replay_here').hide();
    $('#btn_replay_stop').hide();
    smallBoards = [];
    if (!game) {
        setEmptyBoard();
        return;
    }
    $('#timerhdr1').removeClass('timerhdr1_mob_hidden');
   // $('#engdiv').addClass('engdiv_mob_hidden');
    
    $('#game_moves_html .move').unbind();
    lastmove = null;
    //recording
    lastGame = game;
  LastPgn = game.GamePGN;
  LastKeys = game.keys;
  $('#keysval').val(LastKeys);
    setPrizeFromHdr(game);
  
    setGameColors(game);
    var onePlayer = 0;
    LastHeaders = getPgnHeader(lastGame, 1);
    $('#analyze_res').html(''); $('#analyze_res5').html(''); stopAnalysisIfNeeded();

    //setGameHeadersAll(game, 0);
    var wname = game.WhiteName == 'Player 1' ? '' : WhiteName(game);
    if ((game.PgnType == 3 || game.PgnType == 2 || game.PgnType == 13 || game.PgnType == 23 || wname == '') && game.Authors && game.Authors != '' && game.Stipulation) {
        setGameHeadersYaml(game);
    }
    else {
        setGameHeaders(game);

 
    }
  

    TotlMoves = game.problemList.length;
    var movenum = game.StartMoveNum; //movenum; //StartMoveNum; // movenum
    setGameFen(game);
    //var
  

    stopRecording(); $('#btn_refresh_1').hide();
    recording.updated = false;

    if (game.HideMov == 1) {
        if (!fp) initial_position();
        //lastFen = initial_fen;
        //return;
    }
    //game.RemarksListOfList,
    if (game.HideMov != 1) {
        createGameHtml($('#game_moves_html'), game.problemList, game.result, game.RemarkVariationsList, movenum, game.wb, 0,game.MultiLine);
        var last_move = $('#game_moves_html').find('.move').not(".variant .move").last();
        if (!fp)
            initial_position();
        //lastFen = initial_fen;

        if (hm && hm != '') {
            var list1 = $('.move').not('.variant .move');
            var list1xx = list1.filter('#mnum' + hm);
            make_move(list1xx);
        }
        if (tostart && tostart > 0) {
            initial_position();
        }
        else if (fp)
            setTimeout(function () {
                final_position();
            }, 100);

        if (withoutBoard == 1) {
            make_move($('#mnum' + TotlMoves));
            $('#analyze_fen').html('Fen: ' + lastFen);
        }
        if(p_flip=='1')
            board.flip();
    }
    hideShowGameBtns(game.HideMov, p_solve, game.PgnType);
    if (p_hboard != '10' && p_hboard != '11' && p_hboard != '12' && p_hboard != '14') {
        var noelo = 0;
        if ($('#game_html').css('height') == '245px') // mobile 
            noelo = 1;
        setTimeout(function () {
            $('#timerhdr1').addClass('timerhdr1_mob_hidden');
            setGameHeadersAll(lastGame, noelo);
            //setGameHeaders(lastGame, 1);
        }, 15000);
    }
    $("#game_moves_html .move").on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        clearAllTimeouts();
        make_move($(this), event);
        $('#analyze_res5').html('');
        stopAnalysisIfNeeded();
     
       
    });
    setTimeout(function () {
        if (document.getElementById("btn_next_move")) {
            document.getElementById("btn_next_move").focus();
            document.getElementById("buttons0").focus();
        }
    }, 500);
}
var gameList;



function game_list_html_load(gn, annum, p_hm) {
    var game;
    if (!gn)
        gn = 1;
    if (p_fname && p_fname != '') { }
    else
        p_fname = 'AnnotatedGames' + annum;
    $('#timerhdr').show();
    $('.timer').show();
    gameList = [];
    var servName = 'GetGameListFromPgnFile';
    var id = 1;
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/" + servName,
        data: "{'fn':'" + p_fname + "', 'id': '" + id + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {


            $('#game_chooser').empty();
            $('#game_chooser').unbind();
            gameList = JSON.parse(data.d);
            if (gameList != null && gameList.length > 0) {
                for (g = 0; g < gameList.length; g++) {
                    game = gameList[g];
                    $('#game_chooser').append($('<option>', {
                        value: g,
                        text: NamesOnList(game)
                    }));
                }
                $('.timer').hide();
                $('#timerhdr').hide();
                setGameChooser();
                setNewGame(gameList[gn - 1], p_hm);
            }
            else {
                $('.timer').hide();
                $('#timerhdr').hide();
            }

        },
        error: function (result) {
            if (p_act == 'deb')
                alert(result);
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();

        }
    });
}

function game_temp_html_load(gn, p_hm) {
    var game;
    $('#timerhdr').show();
    $('.timer').show();
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/GetGameFromPgnTempList",
        data: "{'num': " + gn + "}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            if (data.d == '') { emptyGame(gn); return; }
            var game = JSON.parse(data.d);
            $('#game_chooser').empty();
            $('#game_chooser').append($('<option>', {
                value: 0,
                text: NamesOnList(game)
            }));
            $('.timer').hide();
            $('#timerhdr').hide();
            setNewGame(game, p_hm);

        },
        error: function (result) {
            if (p_act == 'deb')
                alert(result);
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();
        }
    });
}

function game_fen_load(fen, p_hm) {
    var game = {};
    game.CurrentFEN = fen;
    game.GameFEN = fen;
    
    game.WhiteName = '';
    game.BlackName = '';
    game.GamePGN = '';
    game.PgnType = 0;
    game.bcol = -1;
    game.GameId = 0;
    game.problemList = [];
    game.RemarkVariationsList = [];
  setNewGame(game, p_hm);
  if(p_drag==1)
    board.setDraggable(true);
  if (p_wview == 1) {
    try {
      window.chrome.webview.postMessage("loaded");
    } catch (ee) { }
    return;
  }
    $('.timer').hide();
    $('#timerhdr').hide();
}

function game_html_load(gn, annum, p_hm) {
    LastId = gn;
    if (p_fname && p_fname != '') { }
    else
        p_fname = 'AnnotatedGames' + annum;
    $('#timerhdr').show();
    $('.timer').show();
    gameList = [];
    var servName = 'GetGameFromPgnFile';
    //if (p_src == 'dbpgn')
    //    servName = 'GetGameFromChessDbPgn';
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/" + servName,
        data: "{'fn':'" + p_fname + "', 'gamenum': '" + gn + "'}", //+ "', 'lat':'" + p_lat + ", 'psw':'" + p_psw +  "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            if (data.d == '') { emptyGame(gn); return; }
            var game = JSON.parse(data.d);
            $('#game_chooser').empty();
            $('#game_chooser').append($('<option>', {
                value: 0,
                text: NamesOnList(game)
            }));
            $('.timer').hide();
            $('#timerhdr').hide();
            setNewGame(game, p_hm);

        },
        error: function (result) {
            if (p_act == 'deb')
                alert(result);
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();
        }
    });
}

function game_text_load(gn, p_hm) {
    if (!gn)
        return;
    LastId = gn;
    $('#timerhdr').show();
    $('.timer').show();
    gameList = [];
    var servName = 'GetGameFromActDb';
    if (p_src == 'dbpgn' || p_src == 'pgn' || p_src == 'pgnd')
        servName = 'GetGameFromChessDbPgn';
    else if (p_src == 'temp')
        servName = 'GetGameFromChessDbTemp';
    else if (p_src == 'my')
      servName = 'GetGameFromChessDbMy';
    else if (p_src == 'tst')
      servName = 'GetGameFromChessDbTst';
    else if (p_src == 'hist')
        servName = 'GetGameFromHistoryPgn';
    else if (p_src == 'play')
        servName = 'GetGameFromPlayingPgn';
    var sc = p_score == 1;
    var param = 'solve=';
    if (p_solve && p_solve != null) param += p_solve;
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "', 'score':'" + sc + "', 'lat':'" + p_lat + "', 'psw':'" + p_psw + "', 'param':'" + param + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            if (data.d == '') { emptyGame(gn); return; }
            var game = JSON.parse(data.d);
            if (boardscreen && boardscreen == 1) { }
            else {
                $('#game_chooser').empty();
                $('#game_chooser').append($('<option>', {
                    value: 0,
                    text: NamesOnList(game)
                }));
            }
            $('.timer').hide();
            $('#timerhdr').hide();
            if (game && game != null) {
                if (boardscreen && boardscreen == 1) {
                    afterLoadBoard(game);
                }
                else if (p_solve && p_solve > 0 && p_solve < 10 || ((p_solve == 10 || p_solve == null) && game.HideMov > 10 && game.HideMov < 20)) { // && (game.HideMov==0 || game.HideMov>1)) {
                    if (p_solve == null)
                        p_solve = 10; // ???
                    setPuzzle(game,0);
                }
                else
                    setNewGame(game, p_hm);
            }

        },
        error: function (result) {
            if (p_act == 'deb')
                alert(result);
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();
        }
    });
}
//function game_from_text(pgn, pgn_type) {
//    var servName = 'GetGameByPgn';
//    //if (p_src == 'dbpgn' || p_src == 'pgn' || p_src == 'pgnd')
//    //    servName = 'GetGameByPgn';
//    //else if (p_src == 'temp')
//    //    servName = 'GetGameByPgn';
//    //else if (p_src == 'hist')
//    //    servName = 'GetGameByPgn';
//    //else if (p_src == 'play')
//    //    servName = 'GetGameByPgn';
//    if (pgn)
//        pgn = pgn.replace(/\'/gi, "\\\'");
//    $.ajax({
//        type: "POST",
//        url: "ws/ViewService.asmx/" + servName,
//        data: "{'pgn':'" + pgn + "', 'pgntype':" + pgn_type +  "}",

//        contentType: 'application/json',
//        dataType: "json",
//        success: function (data) {
     
//        },
//        error: function (result) {
//            tempdata = null;
//            $('.timer').hide();
//            $('#timerhdr').hide();
//        }
//    });
//}

function game_pgn_load(pgn, pgn_type, tostart,act) {

    $('#timerhdr').show();
    $('.timer').show();
    if (!act) act = 0;
    if (!pgn_type) pgn_type = '0';
    if (pgn)
        pgn = pgn.replace(/\'/gi, "\\\'");
    var gn = 1;
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/GetGameByPgn",
        data: "{'pgn':'" + pgn + "', 'pgntype':" + pgn_type + "}",  // , 'gamenum': '" + gn + "'

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            if (data.d == '') { emptyGame(gn); return; }
            var game = JSON.parse(data.d);
            $('.timer').hide();
            $('#timerhdr').hide();
            if (boardscreen && boardscreen == 1) {
                displaySpecTextAfterLoad(game);
            }
            else 
                setNewGame(game, null, 1, tostart);
        },
        error: function (result) {
            if (p_act == 'deb')
                alert(result);
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();
        }
    });
}

function game_html_db_load(gn, p_hm) {
    if (!gn)
        return;
    LastId = gn;
    $('#timerhdr').show();
    $('.timer').show();
    gameList = [];
    var servName = 'GetGameFromActDb';
    if (p_src == 'dbpgn' || p_src == 'pgn' || p_src == 'pgnd')
        servName = 'GetGameFromChessDbPgn';
    else if (p_src == 'temp' )
        servName = 'GetGameFromChessDbTemp';
    else if (p_src == 'my')
      servName = 'GetGameFromChessDbMy';
    else if (p_src == 'tst')
      servName = 'GetGameFromChessDbTst';
    else if (p_src == 'hist')
        servName = 'GetGameFromHistoryPgn';
    else if (p_src == 'play')
        servName = 'GetGameFromPlayingPgn';
    else if (p_src == 'games')
        servName = 'GetGameFromGames';
    var sc = p_score == 1;
    var param = 'solve=';
    if (p_solve && p_solve!=null) param += p_solve;
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/" + servName,
        data: "{'id': '" + gn + "', 'score':'" + sc + "', 'lat':'" + p_lat + "', 'psw':'" + p_psw + "', 'param':'" + param +  "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            if (data.d == '') { emptyGame(gn); return; }
            var game = JSON.parse(data.d);
            if (boardscreen && boardscreen == 1) { }
            else {
                $('#game_chooser').empty();
                $('#game_chooser').append($('<option>', {
                    value: 0,
                    text: NamesOnList(game)
                }));
            }
            $('.timer').hide();
            $('#timerhdr').hide();
            if (game && game != null) {
                if (boardscreen && boardscreen == 1) {
                    afterLoadBoard(game);
                }
                else if (p_solve && p_solve > 0 && p_solve < 10 || ((p_solve == 10 || p_solve == null) && game.HideMov > 10 && game.HideMov < 20)) { // && (game.HideMov==0 || game.HideMov>1)) {
                    if (p_solve == null)
                        p_solve = 10; // ???
                    setPuzzle(game,0);
                }
                else 
                    setNewGame(game, p_hm);
            }

        },
        error: function (result) {
            if (p_act == 'deb')
                alert(result);
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();
        }
    });
}

function game_html_db_list_load(gn, gnto, p_hm, p_glist, p_load, p_search) {
   
    if (p_load == null) p_load = 1;
    LastId = gn;
    //LastId = 0; // ....
    var game;
    gameList = [];
    $('.timer').show();
    $('#timerhdr').show();

    var servName = 'GetGameListFromActDb';
  var addSearch = ''; var withsearch = 0;
  var addData = '';
    if (p_src == 'temp' && ((p_glist != '' && p_glist != null) || (p_search != null && p_search !='') )) {
        servName = 'GetGameListFromDbByTempGlist';
        if (p_glist == null) p_glist = '';
        gn = p_glist; withsearch = 1;
    }
    else if ((p_glist != '' && p_glist != null) || (p_search != null && p_search != '')) {
        servName = 'GetGameListFromDbByGlist';
        if (p_glist == null) p_glist = '';
      gn = p_glist; withsearch = 1;
      if (!p_src) p_src = '';
      addData += ", 'src':'" + p_src + "'";
    }
    //p_lat
    else if (p_src == 'dbpgn' || p_src == 'pgn' || p_src == 'pgnd')
        servName = 'GetGameListFromChessDbPgn';
    else if (p_src == 'temp' )
        servName = 'GetGameListFromChessDbPgnTemp';
    else if (p_src == 'my')
        servName = 'GetGameListFromChessDbPgnMy';
    if (p_act == 'deb') {
      var data1 = "{'id':'" + gn + "', 'idto':'" + gnto + "', 'lat':'" + p_lat + "', 'load':'" + p_load + "', 'psw':'" + p_psw + "'" + addData + "}" + servName;
        alert(data1);
        $('.timer').hide();
        $('#timerhdr').hide();
    }
    if (withsearch) {  
        if(p_search == null)p_search='';
        addSearch = "','search':'"+p_search;        
    }
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/" + servName,

      data: "{'id':'" + gn + "', 'idto':'" + gnto + "', 'lat':'" + p_lat + "', 'load':'" + p_load + "', 'psw':'" + p_psw + addSearch + "'" + addData + "}",  // p_load

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {


            $('#game_chooser').empty();
            $('#game_chooser').unbind();
            gameList = JSON.parse(data.d);
            if (gameList != null && gameList.length > 0) {
                for (g = 0; g < gameList.length; g++) {
                    game = gameList[g];
                    $('#game_chooser').append($('<option>', {
                        value: g,
                        text: NamesOnList(game)
                    }));
                }
                $('.timer').hide();
                $('#timerhdr').hide();
                setGameChooser();
                if (p_solve && p_solve > 0 && p_solve < 10) // || ((p_solve == 10 || p_solve == null) && game.HideMov > 10 && game.HideMov < 20)) { // && (game.HideMov==0 || game.HideMov>1)) {
                {
                    setPuzzle(gameList[parseInt(p_chooser) - 1],1);
                }
                else
                   setNewGame(gameList[parseInt(p_chooser) - 1], p_hm);
            }
            else {
                $('.timer').hide();
                $('#timerhdr').hide();
            }

        },
        error: function (result) {
            if (p_act == 'deb')
                alert(result);
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();

        }
    });
}

// from Games tab
function game_html_db_list_load_by_id(p_hm, p_glist, p_load, p_tourn, xgn, dbsrc) {
    if (p_load == null) p_load = 1;
    var psw = p_psw;
    if(!psw)psw='';
    LastId = 0; // ....
    var game;
    $('.timer').show();
    $('#timerhdr').show();
    gameList = [];
    var tid = '0'; var isuser = 0;
    var servName = 'GetTournamentGamesListFromDB';
    var ispsw = 1;
    if (xgn && xgn != '' && xgn!=null) {
        if (xgn.length > 1 && xgn[0] == 'u') {
            isuser = 1; tid = xgn.substr(1);
        }
    }
    if (p_tourn && p_tourn!=null && p_tourn != '') {
        tid = p_tourn;
        servName = 'GetTournamentGamesListFromDB';
        ispsw = 0;
    }
    else if (xgn!=null && xgn != '' && isuser == 0) {
        tid = xgn;
        servName = 'GetGamesListFromDBByGameId';
    }
    else if (xgn != null && xgn != '' && isuser == 1) {         
        servName = 'GetGamesListFromDBByUser';
    }
    var dataParam;
    if (!ispsw)
        dataParam = "{'id':'" + tid + "', 'lat':'" + p_lat + "', 'load':'" + p_load + "'}";
    else 
        dataParam = "{'id':'" + tid + "', 'lat':'" + p_lat + "', 'load':'" + p_load + "', 'psw':'" + psw + "'}";
    if (p_tourn && p_tourn != null && p_tourn != "" && p_glist && p_glist != null && p_glist != "") {
        tid = p_tourn;
        servName = 'GetTournamentGamesListFromDBWithList';
        if (!dbsrc || dbsrc == null) dbsrc = '';
        if (!ispsw)
            dataParam = "{'id':'" + tid + "', 'lat':'" + p_lat + "', 'load':'" + p_load + "', 'glist':'" + p_glist + "', 'db':'" + dbsrc + "'}";
        else 
            dataParam = "{'id':'" + tid + "', 'lat':'" + p_lat + "', 'load':'" + p_load + "', 'glist':'" + p_glist + "', 'db':'" + dbsrc + "', 'psw':'" + psw +"'}";
    }
    //if (tid > 0)
    //    servName = 'GetTournamentGamesListFromDB';
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/" + servName,

        data: dataParam,  // p_load

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {


            $('#game_chooser').empty();
            $('#game_chooser').unbind();
            gameList = JSON.parse(data.d);
            if (gameList != null && gameList.length > 0) {
                for (g = 0; g < gameList.length; g++) {
                    game = gameList[g];
                    if (game && game.Scores != '') {
                        scoresToRemarksList(game, game.Scores);
                    }
                    $('#game_chooser').append($('<option>', {
                        value: g,
                        text: NamesOnList(game)
                    }));
                }
                $('.timer').hide();
                $('#timerhdr').hide();
                setGameChooser();
                setNewGame(gameList[parseInt(p_chooser) - 1], p_hm);
            }
            else {
                $('.timer').hide();
                $('#timerhdr').hide();
            }

        },
        error: function (result) {
            if (p_act == 'deb')
                alert(result);
            tempdata = null;
            $('.timer').hide();
            $('#timerhdr').hide();

        }
    });
}


function scroll_to_move(elm) {
    var divn = 'game_moves_html_wrap2';
    if (withoutBoard == 1)
        return;
    if (elm.position()) {
        var offset_top = elm.position().top;
        var scroll_top = $('#' + divn).scrollTop();
        var top = offset_top + scroll_top;
        top = top - toptoMoveDiff; if (top < 0) top = 0;
        if (p_link == '') {
            $('#' + divn).animate({

                scrollTop: top

            }, 380);
            setTimeout(function () {

                document.getElementById("" + divn).scrollTop = top;
                if (p_hboard == '10' || p_hboard == '11' || p_hboard == '12' || p_hboard == '14') {
                    dispMoveBoard(elm, null, lastBoardFen);
                }

            }, 350);
            if (recordscreen) {

            }
            
        }
    }

}



function playStack() {

    if (pstack.length == 0) return;
    var word = pstack.shift();
    if (word == '') return;
    console.log('playing ' + word);
    // $('#audio' + word).on('ended', playStack); // recur
    //$('#audio' + word).removeEventListener
    $('#audio' + word).unbind('ended');
    //$('#audio' + word).addEventListener('ended', function () {
    //    playStack();

    //});
    $('#audio' + word).on('ended', playStack); // recur
    tell(word); ///var obj =

}

function tell(word) {
    //var audObj = $('#audio' + word);
    $('#audio' + word)[0].playbackRate = 1.2;
    $('#audio' + word).trigger('play');
    //audObj.trigger('play');
    //return audObj;
}
function tellfast(word, fast) {

    $('#audio' + word)[0].playbackRate = fast;
    $('#audio' + word).trigger('play');

}
function tellSentence(p1, p2, p3, p4, p5, p6,p7) { //...args) { //
    pstack = [];
    if (p1 && p1 != '') pstack.push(p1);
    if (p2 && p2 != '') pstack.push(p2);
    if (p3 && p3 != '') pstack.push(p3);
    if (p4 && p4 != '') pstack.push(p4);
    if (p5 && p5 != '') pstack.push(p5);
    if (p6 && p6 != '') pstack.push(p6);
    if (p7 && p7 != '') pstack.push(p7);
    playStack();

}

function voiceFromMove(mnum, moveStr,ch) {
    //tellSentence('0'); return;
    var long = 1;
    if (!moveStr || moveStr.length < 2)
        return;
    var n = moveStr.lastIndexOf("&nbsp;");
    if (n >= 0) {
        moveStr = moveStr.substring(n + 6);
    }
    if (!moveStr || moveStr.length < 2)
        return;
    var c = moveStr[0];
    var piece = ''; var mv = ''; var helper = ''; var takes = ''; var promote = '';
    if (moveStr.length > 2 && c == 'B' || c == 'R' || c == 'K' || c == 'Q' || c == 'N') {
        // ..
        piece = c;
        if (long)
        {
            if (c == 'B') piece = 'Bishop';
            else if (c == 'N') piece = 'Knight';
            else if (c == 'R') piece = 'Rook';
            else if (c == 'Q') piece = 'Queen';
            else if (c == 'K') piece = 'King';
        }
        mv = moveStr.substring(1);
    }
    else if (moveStr == 'o-o' || moveStr == 'O-O' || moveStr == '0-0') {
        // ....
        if (long)
            tellSentence('castleshort');
        else 
            tellSentence('0', '0');
        return;
    }
    else if (moveStr == 'o-o-o' || moveStr == 'O-O-O' || moveStr == '0-0-0') {
        // ....
        if (long)
            tellSentence('castlelong');
        else 
            tellSentence('0', '0', '0');
        return;
    }
    else
        mv = moveStr;
    var check = '';
    if (mv.length >= 2) {
        mv = mv.replace('!?', '').replace('!', '').replace('?', '');
        if (mv.indexOf('x') == 2) { // Rfxd5
            takes = 'x';
            helper = mv[1];
            mv = mv.substring(0, 1) + mv.substring(3); //('x', ''); remove 2 chars
            if (p_lang == 'h') takes = ':';
        }
        else if (mv.indexOf('x') >= 0) {
            takes = 'x';
            mv = mv.replace('x', '');
            if (p_lang == 'h') takes = ':';
        }
        if (mv.length >= 2) {
            if (mv[0] >= 'a' && mv[0] <= 'h' && mv[1] >= 'a' && mv[1] <= 'h') {
                helper = mv[0];
                if(piece=='')
                    takes = 'x';
                mv = mv.substring(1);
            }
            var col = mv[0];
            var row = mv[1];
            if (mv.length > 2 && mv[2] == '+') {// check
                mv = mv.replace('+', '');
                check = 'check';
            }
            else if (ch && ch=='1') check = 'check';
            if (mv.length > 2) {// from
                if (mv[2] == '=') mv = mv.replace('=', '');
                if (mv.length > 2) {
                    promote = mv.substring(2).trim();
                    promote = promote[0].toLowerCase();
                    if (long) {
                        if (promote == 'b') promote = 'Bishop';
                        else if (promote == 'n') promote = 'Knight';
                        else if (promote == 'r') promote = 'Rook';
                        else if (promote == 'q') promote = 'Queen';
                        promote = promote.toLowerCase();
                    }
                    //if (lang == 'h') {
                    //    if (promote == 'b') promote = 'ר'; else if (promote == 'r') promote = 'צ'; else if (promote == 'k') promote = 'מה'; else if (promote == 'q') promote = ''; else if (promote == 'n') promote = 'פ';
                    //}

                }
            }
            piece = piece.toLowerCase();
         
            if (takes == 'x' && long)
                takes = 'takes';
            tellSentence(piece, helper, takes, col, row, promote, check);
        }
    }
    else
        return;
}
function draw_arrows(arrows_codes) {

    var squares_codes = arrows_codes.split(',');
    for (var i = 0; i < squares_codes.length; i++) {

        var color = squares_codes[i].charAt(0);
        var square_codes = squares_codes[i].substr(1);

        var square_code_from = square_codes.charAt(0) + square_codes.charAt(1);
        var square_code_to = square_codes.charAt(2) + square_codes.charAt(3);

        var square_from = $('#board').find('.square-' + square_code_from);
        var square_to = $('#board').find('.square-' + square_code_to);

        var center_from = center(square_from);
        var center_to = center(square_to);

        if (color == 'G') {

            draw_arrow(center_from, center_to, ['rgba(20, 94, 20, 0.75)', 'rgba(119, 219, 119, 0.7)']);

        }

    }

}

function dispMoveBoard(elm, ev, fen) {
    if (hboard10board && (p_hboard == '10' || p_hboard == '11' || p_hboard == '12' || p_hboard == '14')) {
        var top = 1; var left = 15;
        var gh = document.getElementById("game_moves_html").scrollTop;// $('#game_moves_html').height();
        if (ev && !elm[0]) { //&& !elm[0]
            if (ev.clientY > 200 - gh) top = ev.clientY - 152 - gh;
            else top = ev.clientY + 30 - gh;
            if (gh > 30)
                top = ev.clientY - gh + 30; // ??
            left = ev.clientX - 80;
        }
        else if (elm[0] && elm[0] != null) {
            if (elm[0].offsetTop > 200 - gh) top = elm[0].offsetTop - 146 - gh;
            else top = elm[0].offsetTop + 30 - gh;
            if (gh > 30)
                top = elm[0].offsetTop - gh + 30; // ??

            left = elm[0].offsetLeft - 50;
            var e = elm[0];
            //while ((p = e.offsetParent)) {

            //    e = p;
            //    left += e.offsetLeft;
            //    top += e.offsetTop;
            //}

        }
        // var ftop = $("#boardwrap").offset().top;
        //top -= ftop;

        //scroll_to_move

        // if (top > 300)
        //     top = 1;
        //top -= gh;
        if (top < 1) top = 1;
        if (top > 230) top = 230;
        
        var wwidth = $(window).width();
        if (left < 15) {
            if (wwidth < 500)
                left = 1;
            else left = 15;
        }
        else if (left + 165 > wwidth)
            left = wwidth - 165;
        if (p_hboard == '11' || p_hboard == '12' || p_hboard == '14') { top = 2; left = 2; }
        $('#game_uptomoves_html').attr('style', 'position:absolute;top:' + top + 'px;left:' + left + 'px;');
        hboard10board.position(fen);
    }
}

function make_move(elm,ev) {
    remove_arrows();
    $('#btn_prev_move').prop('disabled', false);
    $('#btn_initial_position').prop('disabled', false);
    lastBoardFen = elm.attr('fen');
    if (p_hboard == '10' || p_hboard == '11' || p_hboard == '12' || p_hboard == '14') {
       
    }
    else //if (p_hboard != '10' && p_hboard != '11' && p_hboard != '12' && p_hboard != '14')
       board.position(elm.attr('fen'));
    ClickedMoveVarid = '';
    var id = elm.attr('id');
    if (!id || id == null || id == 'undefined') return;
    p_hmnum = id.replace('mnum', '');
    if (id.indexOf('v') > 0) {
        var p1 = id.indexOf('x');
        ClickedMoveVarid = id.substr(0, p1 + 1).replace('mnum', '');
    }
    lastFen = lastBoardFen;

 


    lastmove.mnumstr = elm.attr('mnum');
    lastmove.lastFen = lastFen;
    lastmove.mnum = p_hmnum; lastmove.wb = 1;
    lastmove.varid = ClickedMoveVarid;
    lastmove.id = id;
    if (recording && recording != null) {
        if (recording.active) { // not change lastmove

        }
        else {
            recording.lastmove = lastmove;
        }

        recording.lastmoveidtoaddtext = id;
    }
    //recording.updated = true;
    $('#game_html .move').removeClass('active');
    elm.addClass('active');

    if (p_voice > 0) {
        var p1 = -1; var p2 = -1; var mnum = 0;
        var moveObj = {};
        getMoveAndNumByElm(elm, moveObj);
        if (moveObj.moveStr != '') {
            voiceFromMove(moveObj.mnum, moveObj.moveStr, moveObj.ch);
        }

    }

    if (withoutBoard == 1)
        return;

    scroll_to_move(elm);


    remove_squares();

    move_arrow(elm);


    var elm_next = elm;


    while (true) {

        elm_next = elm_next.next();

        if (elm_next.hasClass('evaluation')) {

            continue;

        } else if (elm_next.hasClass('arrows')) {

            var arrows_codes = elm_next.attr('arrows');

            setTimeout(function () {

                draw_arrows(arrows_codes);

            }, 240);

        } else if (elm_next.hasClass('squares')) {

            var squares_codes = elm_next.attr('squares');

            setTimeout(function (elm_next) {

                draw_squares(squares_codes);

            }, 240);

        } else {

            break;

        }

    }

    if (recordscreen && commandBuilder) {
        setCommand(p_hmnum);
       
    }

}

function next_move() {
    $('#analyze_res').html(''); $('#analyze_res5').html(''); stopAnalysisIfNeeded();
    $('#btn_prev_move').prop('disabled', false);
    $('#btn_initial_position').prop('disabled', false);
    var move_active = $('.move.active');
    if (move_active.length > 0) {

        move_active = move_active.nextAll('.move').first();

    } else {

        move_active = $('#game_html').find('.move').first();

    }

    if (move_active.length > 0) {

        make_move(move_active);

        if (move_active.is(last_move)) {

            $('#btn_next_move').prop('disabled', true);
            $('#btn_final_position').prop('disabled', true);

        }
    }

    $('#btn_prev_move').prop('disabled', false);
    $('#btn_initial_position').prop('disabled', false);

}

function move_by_hnum(num) {
    var id = 'mnum' + num;
    move_active = $('#' + id);
    if (move_active.length > 0) {

        make_move(move_active);

    } else {

        initial_position();

    }

    $('#btn_next_move').prop('disabled', false);
    $('#btn_final_position').prop('disabled', false);
}

function prev_move() {
    $('#analyze_res').html(''); $('#analyze_res5').html(''); stopAnalysisIfNeeded();
    var move_active = $('.move.active');
    if (move_active.length > 0) {

        move_active = move_active.prevAll('.move').first();

    } else {

        return;

    }

    if (move_active.length > 0) {

        make_move(move_active);

    } else {

        initial_position();

    }

    $('#btn_next_move').prop('disabled', false);
    $('#btn_final_position').prop('disabled', false);

}


