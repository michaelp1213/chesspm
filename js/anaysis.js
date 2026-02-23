var analt;
var TransferGameOnAnalysis = 0; //
var lastAnalFen = '';
stopAnalysisIfNeeded = function () {
    if (ws && ws.engid != '' && ws.wsnum >= 0)
        stopAnalysis();
}

function stopAnalysis() {
    // ws.engid = res.engId; ws.wsnum = res.engWsNum;
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/StopAnalysys",
        data: "{'engid': '" + ws.engid + "', 'wsnum': '" + ws.wsnum + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var res = JSON.parse(data.d);


            var objDiv = document.getElementById("gameanalyze_res");
            objDiv.scrollTop = objDiv.scrollHeight;

            // ws.engid = res.engId; ws.wsnum = res.engWsNum;

            if (!res.finished) {

            }
            else {
                analStartStop(2);
                //ws.engid = ''; ws.wsnum = -1;
            }
        },
        error: function (result) {
            tempdata = null;
            $('#analyze_res5').html('Error');
        }
    });
}

function dispRes5Board(e,fen) {
    if (!p_ds || p_ds == '') p_ds = '2';
    var nearid = '#analyze_res5';
    var nearid1 = '#board_html';
    var id = 'boardRes5';
    ddiv = $('<div />').attr('id', id).attr('style', 'position:absolute;width:124px;height:124px;margin-left:10px;');
    $('#board_html').append(ddiv);
    board1 = ChessBoard(id, {
        showNotation: false,
        pieceTheme: 'Images/chesspieces/wikipedia' + p_ds + '/{piece}.png',
        square: g_sq,
        position: fen  //chess.fen()
    });
    var o = $(nearid).offset();
    var left1 = e.clientX - 115; if (left1 < 0) left1 = 0;
    var top1 = (e.clientY - 185); if (top1 < 0) top1 = 0;
    $(ddiv).css({ top: top1 + 'px', left: left1 + 'px', position: 'absolute' });
    $(ddiv).css("z-index", "10000");
}
var cntr = 0;
var lineArr = [];
function showLineOnRes5(ev, desc, line) {
    if (line.length > 200) line = line.substring(0, 200);
    lineArr = line.split(' ');
    var moveArr = [];
    var lineAll = '';
    lineAll += ev + ' ' + desc + ' ';
    var lastFen;
    var wb = 1;
    var fenarr = lastBoardFen.split(' ');
    if (fenarr != null && fenarr.length > 1) {
        if (fenarr[1] == 'b') wb = 2;
    }
    chess.load(lastBoardFen);

    var out = {};
    var max = 20; if (lineArr.length < max) max = lineArr.length;
    for (i = 0; i < max; i++) {
        var nmove = lineArr[i];
        var fromMovStr = nmove.substring(0, 2);

        var piece = chess.getpiece(fromMovStr);
        board.engToCMove(wb, piece, nmove, out);
        var move1 = chess.move(out.almove);
        wb = 3 - wb;
        if (move1 && move1.san)
         moveArr.push(move1.san);
    }



    for (i = 0; i < moveArr.length; i++) {
        lineAll += '<span class="linex5c" id="lineel' + i + '">' + moveArr[i] + '</span> ';
    }
    var lineStr = '<div style="display:inline;" id="linex5">' + lineAll + '</div>';
    var nearid1 = '#board_html';
    var id = '#boardRes5';
   
    $('#analyze_res5').html( lineStr);
    $('.linex5c').click(function (e) { // mouseover
        //cntr++;
        //if (cntr > 0) {
        //     cntr = 0;
        var id = e.target.id;
        var num = parseInt( id.replace('lineel', ''));
        //$(nearid1).parent().closest(id).remove();
        var nearid1 = '#board_html';
        var id1 = '#boardRes5';
        $(nearid1).children(id1).remove();
        //chess.fen(lastBoardFen);
        var lastFen;
        var wb = 1;
        var fenarr = lastBoardFen.split(' ');
        if (fenarr != null && fenarr.length > 1) {
            if (fenarr[1] == 'b') wb = 2;
        }
        chess.load(lastBoardFen);
      
        var out = {};
        if (num >= lineArr.length) num = lineArr.length - 1;
        for (i = 0; i <= num; i++) {
            var nmove = lineArr[i];
            var fromMovStr = nmove.substring(0, 2);

            var piece = chess.getpiece(fromMovStr);
            board.engToCMove(wb, piece, nmove, out);
            var move1 = chess.move(out.almove);
            wb = 3 - wb;
        }
        //chess.moves(nmove);
        // new fen
        lastFen = chess.fen();
        //$(nearid1).children(id).remove();
        dispRes5Board(e, lastFen);
        $('#boardRes5').click(function (e) { // mouseout
            var nearid1 = '#board_html';
            var id1 = '#boardRes5';
            $(nearid1).children(id1).remove(); //closest(id).remove();
        });
       // }

    });
    //$('.linex5c').mouseup(function (e) { // mouseout

    //    $(nearid1).children(id).remove(); //closest(id).remove();
    //});
 
}

function analStartStop(ss12) {
    var icon1; var tit; var tmpl;
    if (ss12 == 1) {
        icon1 = 'fa fa-times';
        tit = 'Stop Analysis';
        $('#analyze_res5').css('color', '#c22');
        
    }
    else { // 2 stop
        ws.engid = ''; ws.wsnum = -1;
        if(analt)clearTimeout(analt);
        icon1 = 'fa fa-gears'; //fa fa-external-link';
        //tmpl='<span class="icon-font-chess chess-board-search icon-font-primary"></span>';
         tit = 'Start Analysis';
        //tmpl = '<i class="' + icon1 + '" style="display:inline;background-color:#fff;" title="' + tit + '"></i>';
         $('#analyze_res5').css('color', '#555');
    }
    tmpl = '<i class="' + icon1 + '" style="display:inline;" title="' + tit + '"></i>'; // background-color:#fff;
    $('#analWrap').html(tmpl);
}

function setFenCastleEmpty(fen) {
    var nfen = fen;
    var fenarr = fen.split(' ');
    var cast = ''; var col = ''; var f = ''; var p3 = ''; var p4 = ''; var mn = '';
    if (fenarr != null && fenarr.length > 2) {
        cast = fenarr[2];
        f = fenarr[0];
        col = fenarr[1];
        cast = '-';
        if (fenarr.length > 3) p3 = fenarr[3];
        if (fenarr.length > 4) p4 = fenarr[4];
        if (fenarr.length > 5) mn = fenarr[5];
        nfen = (f + ' ' + col + ' ' + cast + ' ' + p3 + ' ' + p4 + ' ' + mn).trim();
    }
    lastAnalFen = nfen;
    return nfen;
}


function doPositionAnalysis(fen, scoretype, full) { // moveAdd,
    $('#analyze_res5').html('...'); $('#analyze_res1').html('Wait....');
    $('#engdiv').show();
    var engid = '?'; // 5
    var engwb = 0;
    var moveAdd = '';
    engtime = '1_1'; // ...
    var analType = 8;
    if (full && full == 1)
        engtime = '100_1'; // ...
    $('#analyze_res1').html('Wait ...');
    analStartStop(1);
    var fen1 = setFenCastleEmpty(lastFen); //.replace('KQkq', '-').replace('KQk', '-'); // ?
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/AnalyzeFen",
        data: "{'fen':'" + fen1 + "', 'engid': '" + engid + "', 'move': '" + '' + "', 'engwb': '" + engwb + "', 'engtime': '" + engtime + "', 'PutScoreType': '" + scoretype + "', 'AnalType': '" + analType + "'}",

        // url: "ws/ViewService.asmx/FullGameAnalysis",
        // data: "{'fen':'" + fen + "', 'engid': '" + engid + "', 'moves': '" + moveAdd + "', 'engtime': '" + engtime + "', 'scoretype': " + scoretype + "}",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var res = JSON.parse(data.d);
            //$('#analyze_res').html(res.engDesc);
             
            showLineOnRes5(getEval(res), res.engDesc, res.engLine);

            var objDiv = document.getElementById("gameanalyze_res");
            objDiv.scrollTop = objDiv.scrollHeight;
            // if (TransferGameOnAnalysis == 2)
            //     game_pgn_load(getPgnHeader(lastGame, 1) + res.engLine);
            ws.engid = res.engId; ws.wsnum = res.engWsNum;
            //if (res.isTemp) {
            if (!res.finished) {
                analt=setTimeout(function () {
                    getPositionAnalysisContinuation(res.engWsNum, res.engId, lastFen);
                }, 2000);
            }
            else {
               
                analStartStop(2);
            }
        },
        error: function (result) {
            tempdata = null;
            $('#analyze_res5').html('Error');
            //ws.engid = ''; ws.wsnum = -1;
            analStartStop(2);
        }
    });
}

function getPositionAnalysisContinuation(wsNum, engid, fen) {
    $('#analyze_res5').html('.....'); //  Wait again...'); // Keep waiting
    $('#engdiv').show();
    ws.engid = engid; ws.wsnum = wsNum;
    analStartStop(1);
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/PositionAnalysisCont",
        data: "{'wsNum':'" + wsNum + "','fen':'" + fen + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {

            var res = JSON.parse(data.d);
            if (res.engLine.length < 10 && prevLine.indexOf(res.engLine == 0))
                res.engLine = prevLine;
          
            showLineOnRes5(getEval(res), res.engDesc, res.engLine);
            prevLine = res.engLine;
   
            //if (res.isTemp || res.engRc == -10) {
            if (!res.finished) {
                //ws.wsnum = res.engWsNum;
                analt=setTimeout(function () {

                    getPositionAnalysisContinuation(res.engWsNum, engid, fen);

                }, 2000);

            }
            else {
                //ws.engid = ''; ws.wsnum = -1;
                analStartStop(2);
            }

        },
        error: function (result) {
            tempdata = null;
            $('#analyze_res5').html('Error');
            //ws.engid = ''; ws.wsnum = -1;
            analStartStop(2);
        }
    });

}

function doFullAnalysis(fen, moveAdd, scoretype) {
    $('#analyze_res1').html('Wait....'); $('#engdiv').show(); $('#engdiv').show();
    $('#gameanalyze_res').html('');
    var engid = '?'; // 5
    if (!engwb) engwb = 0;
    if (!moveAdd) moveAdd = '';
    engtime = '1_1'; // ...
    $('#analyze_res1').html('Wait ...');
    analStartStop(1);
    var fen1 = setFenCastleEmpty(fen);
    //TransferGameOnAnalysis=0;
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/FullGameAnalysis",
        data: "{'fen':'" + fen1 + "', 'engid': '" + engid + "', 'moves': '" + moveAdd + "', 'engtime': '" + engtime + "', 'scoretype': " + scoretype + "}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {

            var res = JSON.parse(data.d);
            $('#analyze_res1').html(res.engDesc);
            //for(i=0;i<res.) gameanalyze_res
            $('#gameanalyze_res').html(res.engLine);

            var objDiv = document.getElementById("gameanalyze_res");
            objDiv.scrollTop = objDiv.scrollHeight;


            if (TransferGameOnAnalysis == 2)
                game_pgn_load(getPgnHeader(lastGame, 1, lastAnalFen) + res.engLine, '1');

            if (res.isTemp) {
                analt=setTimeout(function () {

                    getFullAnalysisContinuation(res.engWsNum);

                }, 2000);

            }

        },
        error: function (result) {
            tempdata = null;
            $('#analyze_res1').html('Error');
            analStartStop(2);
        }
    });
}
function getFullAnalysisContinuation(wsNum) {
    $('#analyze_res1').html('Keep waiting...'); //  Wait again...'); // Keep waiting
    $('#engdiv').show();
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/FullGameAnalysisCont",
        data: "{'wsNum':'" + wsNum + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {

            var res = JSON.parse(data.d);
            if (res.engDesc != '')
                $('#analyze_res1').html(res.engDesc);
            if (!(res.engRc < 0)) {
                $('#gameanalyze_res').html(res.engLine);
                var objDiv = document.getElementById("gameanalyze_res");
                objDiv.scrollTop = objDiv.scrollHeight;
                if (TransferGameOnAnalysis == 2)
                    game_pgn_load(getPgnHeader(lastGame, 1, lastAnalFen) + res.engLine, '1');
            }
            if (res.isTemp || res.engRc == -10) {
                analt=setTimeout(function () {

                    getFullAnalysisContinuation(res.engWsNum);

                }, 2000);

            }
            else {
                analStartStop(2);
            }

        },
        error: function (result) {
            tempdata = null;
            $('#analyze_res1').html('Error');
            analStartStop(2);
        }
    });

}

function doAnalyze(moveAdd, engwb, showonboard, nmoveclear) {
    $('#analyze_res').html('Wait....'); $('#analyze_res1').html('Wait....');
    $('#engdiv').show(); $('#gameanalyze_res').html('');
    var engid = '?'; // 5
    if (!engwb) engwb = 0;
    if (!moveAdd) moveAdd = '';
    var analType = 6;
    var scoretype = 1; // not important here
    var fen1 = setFenCastleEmpty(lastFen);
    //
    $.ajax({
        type: "POST",
        url: "ws/ViewService.asmx/AnalyzeFen",
        data: "{'fen':'" + fen1 + "', 'engid': '" + engid + "', 'move': '" + moveAdd + "', 'engwb': '" + engwb + "', 'engtime': '" + engtime + "', 'PutScoreType': '" + scoretype + "', 'AnalType': '" + analType + "'}",

        contentType: 'application/json',
        dataType: "json",
        success: function (data) {

            var res = JSON.parse(data.d);
            var rc = -1;
            if (res.engDesc == "Engine is busy now") {
                $('#analyze_res1').html(res.engDesc);
            }
            else if (res.engDesc == "Engine not active now") {
                $('#analyze_res1').html(res.engDesc);
            }
            else {

                if (p_seval && p_seval > 0) {
                    $('#analyze_res').html(res.engFullMove + ' <span style="color:#a66;font-size:12px;">' + getEval(res) + '</span> ' + res.engDesc + '<br/><span style="color:#888;font-size:9px;"> ' + res.engLine.substring(0, 20) + '...</span>');
                    $('#analyze_res1').html(res.engFullMove + ' <span style="color:#a66;font-size:12px;">' + getEval(res) + '</span> ' + res.engDesc + '<br/><span style="color:#888;font-size:9px;"> ' + res.engLine.substring(0, 20) + '...</span>');
                }
                else {
                    $('#analyze_res').html(res.engFullMove + ' ' + getEval(res) + ' ' + res.engDesc);
                    $('#analyze_res1').html(res.engFullMove + ' ' + getEval(res) + ' ' + res.engDesc);
                }
                rc = 0;

            }
            if (res.engDesc == "Engine calc timeout") {
                rc = -1;
            }
            if (nmoveclear)
                $('#next_move').val('');
            if (showonboard && rc == 0) {
                addEngineMove(res.engMove, engwb);
            }
            if (rc == 0) {

                AddAnalVariation(res);
            }
        },
        error: function (result) {
            tempdata = null;
            $('#analyze_res').html('Error');
            $('#analyze_res1').html('Error');
        }
    });
}

sendMoveToEngine = function () {
    clearAllTimeouts();
    $('#engdiv').removeClass('engdiv_mob_hidden');
    var nmove = $('#next_move').val();
    if (nmove != '') {
        if (nmove.length < 4) {
            chess.load(lastFen);
            var move1 = chess.move(nmove);
            if (move1)
                nmove = move1.from + move1.to;
            else
                nmove = 'x'; // bad
        }
        addEngineMove(nmove, mywb);
    }
    if (nmove != 'x') // bad
        doAnalyze(nmove, engwb, true, true);
}
