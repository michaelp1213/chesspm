
function scrollToTop() {
    //$([document.documentElement, document.body]).animate({    
    var width = $(window).width();
    if (width < 700) {
        if (inFrame) {            
            //var x = 50;
            //if (frameTop > 50) // gen
            //    x = $("#boardwrap").offset().top + frameTop;                      
            //$('html, body', window.parent.document).animate({
            //    scrollTop: x
            //}, 3000);
 
        }
        else {
            $('html, body').animate({
                scrollTop: $("#boardwrap").offset().top
            }, 3000);
        }

    }
}

function getRemObjectT(typ, txt) {
    var remvar = {};
    remvar.ItemType = typ; // default
    var mov = {};
    remvar.Move = mov;
    remvar.Text = txt;
    remvar.SubVariantList = [];
    return remvar;
}
function getResType(rest, opp) {
    switch (rest) {
        case 0: return 'unknown';
        case 2: return 'mate';
        case 3: return opp+'resigned';
        case 4: return opp+'lost on time';
        case 5: return 'stalemate';
        case 6: return 'repetition';
        case 7: return 'nomaterial';
        case 8: return 'other draw';
        case 9: return 'agreement';
        case 10: return opp+'disconnected';
        case 11: return 'adjourned';
        case 15: return 'by engine';
        case 19: return 'too much moves';
        case 20: return 'evaluation';
        case 50: return 'fifty moves rule';
        default: return 'unknown';
       
    }   
}
function getRes(res) {
    switch (res) {
        case 1: return 'White won';
        case 2: return 'Black won';
        case 3: return 'Draw';       
        default: return 'Unknown';

    }
}
pgnPrepare = function () {
  var typ = $('#pgn_type').val();
 
    var pgn = '';
    var lf = '\r\n'; // var lf = '<br>';
    switch (typ) {
        case '0', '1': // pgn

            pgn += '[Event "' + '' + '"]' + lf;
            pgn += '[White "' + '' + '"]' + lf;
            pgn += '[Black "' + '' + '"]' + lf;
            pgn += '[WhiteElo "' + '' + '"]' + lf;
            pgn += '[BlackElo "' + '' + '"]' + lf;
            pgn += '[Result "' + '' + '"]' + lf;
            pgn += '[Annotator "' + '' + '"]' + lf;
            pgn += '[ECO "' + '' + '"]' + lf;
            pgn += '[Date "' + '' + '"]' + lf;
            pgn += '[FEN "' + '' + '"]' + lf;
            break;
        case '2':
            break;
        case '3': // yaml
            pgn += '---' + lf;
            pgn += 'authors:' + lf;
            pgn += '' + lf;
            pgn += 'distinction:' + lf;
            pgn += 'date:' + lf;
            pgn += 'algebraic:' + lf;
            pgn += 'white: [  ]' + lf;
            pgn += 'black: [  ]' + lf;
            pgn += 'fen: ' + lf;
            pgn += 'stipulation: ' + lf;
            pgn += 'solution: |' + lf;
            pgn += '' + lf;
            pgn += '' + lf;
            pgn += '' + lf;
            pgn += 'keywords:' + lf;
            pgn += '' + lf;

            break;
    }
  $('#pgn_text_area').val(pgn);
  $('#keysval').val('');
}

setByHboard = function (hboard) {
    if (hboard && hboard > 0) {

        if (hboard == 1) {
            $('#board_html').hide();
            withoutBoard = 1;
            changeColumnsNumber(2);
            $('#board_html_repl').show();
            $('#board_anal_repl').hide();
            $('#game_save').hide();

        }
        else if (hboard == 2) {
            $('#board_html').show();
            withoutBoard = 2;
            changeColumnsNumber(3);
            $('#board_html_repl').show();
            $('#board_anal_repl').hide();
            $('#game_save').hide();
        }
        else if (hboard == 3) {
            $('#board_html_repl').hide();
            $('#board_html').show();
            withoutBoard = 2;
            changeColumnsNumber(3);
            $('#board_anal_repl').show();
            $('#game_save').hide();

        }
        else if (hboard == 4) {
            $('#board_html_repl').hide();
            $('#board_html').show();
            withoutBoard = 2;
            changeColumnsNumber(3);
            $('#board_anal_repl').hide();
            $('#game_save').show();

        }
        else if (hboard == 5) { // reg ?
            $('#board_html_repl').hide();
            $('#board_html').show();
            withoutBoard = 0;
            changeColumnsNumber(2);
            $('#board_anal_repl').hide();
            $('#game_save').hide();

        }
        else if (hboard == 6) { // set pos ?
            $('#board_html_repl').hide();
            $('#board_html').show();
            withoutBoard = 0;
            changeColumnsNumber(2);
            $('#board_anal_repl').hide();
            $('#game_save').hide();
            $('#board_html_set').show();
            $('#board_html_inner').hide();


        }
        else if (hboard == 7) { // reg + save on server - image + pgn
            $('#board_html_repl').hide();
            $('#board_html').show();
            withoutBoard = 0;
            changeColumnsNumber(2);
            $('#board_anal_repl').hide();
            $('#game_save').hide();

        }
        else if (hboard == 10 || hboard == '11' || hboard == '12' || hboard == '14') { // no board - only text
            $('#board_html_repl').hide();
            $('#board_html').hide();
            withoutBoard = 0;
            changeColumnsNumber(1);
            $('#board_anal_repl').hide();
            $('#game_save').hide();
            $('#plhide').hide();
            
            // game_moves_html-> game_moves_html_wrap ??
            if ($('#game_html').css('height') == '245px') {// mobile 


                $('#game_html').css('max-height', '530px !important');
                $('#game_html').css('min-height', '530px !important');
                $('#game_html').css('height', '530px !important');
                var hh = 460;
                if (p_hboard == '11')
                    hh = 400;
                else if (p_hboard == '12' || p_hboard == '14')
                    hh = 350;
                $('#game_moves_html_wrap').css('min-height', hh + 'px !important');
                $('#game_moves_html_wrap').css('height', hh + 'px !important');
                $('#game_moves_html_wrap').css('max-height', hh + 'px !important');

                $('#game_html').addClass('game_html_bigger');
                //$('#game_moves_html').addClass('game_moves_html_bigger');
                $('#game_moves_html_wrap').addClass('game_moves_html_w_' + hh);

            }
            else { // big
                var hh = 400;
                if (p_hboard == '11')
                    hh = 400;
                else if (p_hboard == '12' || p_hboard == '14')
                    hh = 350;
                $('#game_moves_html_wrap').css('min-height', hh + 'px !important');
                $('#game_moves_html_wrap').css('height', hh + 'px !important');
                $('#game_moves_html_wrap').css('max-height', hh + 'px !important');
                $('#game_moves_html_wrap').addClass('game_moves_html_w_' + hh);
            }

        }
        if (hboard < 3) {
            engwb = $('#eng_color_chooser').val();
            mywb = 3 - engwb;
            if (mywb == 3) mywb = 0;
            engtime = $('#eng_time').val();

            $('#analyze_fen').html('Fen: ' + lastFen);
        }
    }
    else
        withoutBoard = 0;




}

intInsertVar = function () {
    lastmove = null;
}

doNewPositionGame = function () {
    //$('#game_dosave_btn').html('To Board');
    //clearAllTimeouts();
    //setByHboard(6);

    //$('#pgn_text_area').val('');
    //setPositionBoard();
    //SaveUpd = 11;
}

doSetPosition = function (frboard) {
    //$('#game_dosave_btn').html('To Board');
    clearAllTimeouts();
    setByHboard(6);
    //$('#pgn_type').val('1');
    disp_game_save_panel('To Board', '');
    //$('#pgn_text_area').val('');
    setPositionBoard(frboard);
    SaveUpd = 11;
}

//<iframe src="https://.../myvideo.html" allow="autoplay">

changeImagesColor = function (sq,prevsq) {
    // change class .white-1e1d7+g_sq
    // .black-3c85d+g_sq
    $(".white-1e1d7" + prevsq).removeClass("white-1e1d7" + prevsq).addClass("white-1e1d7" + sq);
    $(".black-3c85d" + prevsq).removeClass("black-3c85d" + prevsq).addClass("black-3c85d" + sq);

    $(".belowB" + prevsq).removeClass("belowB" + prevsq).addClass("belowB" + sq);
    $(".boardbackc" + prevsq).removeClass("boardbackc" + prevsq).addClass("boardbackc" + sq);

    // Put back .primary-color class + the clicked elements class with the added prefix "pm_".
    //.addClass('primary-color pm_' + $(this).attr('class'));
    g_sq = sq; // last sq
}


changeColumnsNumber = function (num) {
    //col-sm-12
    if (num == 3) {
        $('.col-sm-6').addClass('col-sm-4').removeClass('col-sm-6');
    }
    else if (num == 2) {
        $('.col-sm-4').addClass('col-sm-6').removeClass('col-sm-4');
    }
}

function draw_squares(squares_codes) {

    var squares_codes = squares_codes.split(',');
    for (var i = 0; i < squares_codes.length; i++) {

        var color = squares_codes[i].charAt(0);
        var square_code = squares_codes[i].substr(1);

        var square = $('#board').find('.square-' + square_code);

        square.addClass('square_' + color);

    }

}
function remove_squares() {
    if (withoutBoard == 1)
        return;
    $('#board .black-3c85d, #board .white-1e1d7').removeClass('square_G square_R');
    $('#board .black-3c85d2, #board .white-1e1d72').removeClass('square_G square_R');
}

function remove_arrows() {
    if (withoutBoard == 1)
        return;
    var c = document.getElementById("board_canvas");
	try {
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
	} catch(e) {}
}

function draw_arrow(p1, p2, colors) {
    if (withoutBoard == 1)
        return;
    var c = document.getElementById("board_canvas");
    var ctx = c.getContext("2d");
    ctx.save();


    // Rotate the context to point along the path
    var dx = p2.x - p1.x, dy = p2.y - p1.y, len = Math.sqrt(dx * dx + dy * dy);
    ctx.translate(p2.x, p2.y);
    ctx.rotate(Math.atan2(dy, dx));

    // line
    ctx.lineCap = 'round';

    ctx.strokeStyle = colors[0];
    ctx.fillStyle = colors[1];

    ctx.beginPath();
    ctx.moveTo(-25, 5);
    ctx.lineTo(-25, 10);
    ctx.lineTo(0, 0);
    ctx.lineTo(-25, -10);
    ctx.lineTo(-25, -5);
    ctx.lineTo(-len, -5);
    ctx.lineTo(-len, 5);
    ctx.lineTo(-25, 5);

    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.restore();

}

// 0-7 = 1 ; 0=a1 ; 63=h8
function algebraic(i) {
    var r = Math.floor(i / 8.0);
    var c = i - r * 8;
    //return 'abcdefgh'.substring(c, c + 1) + '12345678'.substring(r, r + 1);
    if (p_lang == 'h')
        return 'חזוהדגבא'.substring(c, c + 1) + '12345678'.substring(r, r + 1);
    else
        return 'hgfedcba'.substring(c, c + 1) + '12345678'.substring(r, r + 1);
}
function strResult(res, qm) {
    switch (res) {
        case 1:
            return '1-0';
        case 2:
            return '0-1';
        case 3:
            return '1/2-1/2';
        default:
            if (qm)
                return '?-?'; //1/2-1/2';
            else
                return '';
    }
}
function pieceCode(piece, pieceNot) {
    if (piece > 8) { // sometimes adds color=8
        piece -= 8;
    }
    switch (piece) {
        case 0:
            return '';
        case 1:
            return '';
        case 2:
            if (pieceNot)
                return '<span class="icon">♘</span>';
            else if (p_lang == 'h') return 'פ';
            else return "N";
        case 3:
            if (pieceNot)
                return '<span class="icon">♗</span>';
            else if (p_lang == 'h') return 'ר';
            else return "B";
        case 4:
            if (pieceNot)
                return '<span class="icon">♖</span>';
            else if (p_lang == 'h') return 'צ';
            else return "R";
        case 5:
            if (pieceNot)
                return '<span class="icon">♕</span>';
            else if (p_lang == 'h') return 'מה';
            else return "Q";
        case 6:
            if (pieceNot)
                return '<span class="icon">♔</span>';
            else if (p_lang == 'h') return 'מ';
            else return "K";

    }
}

function do_draw_arrow(move_elm) {
    if (tarrow && tarrow != null) {
        window.clearTimeout(tarrow);
    }
    var square_from = $('#board').find('.square-' + move_elm.attr('from'));
    var square_to = $('#board').find('.square-' + move_elm.attr('to'));
    var center_from = center(square_from);
    var center_to = center(square_to);

    tarrow=setTimeout(function () {

         draw_arrow(center_from, center_to, ['rgba(108, 39, 1, 0.75)', 'rgba(239, 231, 108, 0.7)']);

    }, 240);

}

function move_arrow(move_elm) {

    do_draw_arrow(move_elm);
    //var square_from = $('#board').find('.square-' + move_elm.attr('from'));
    //var square_to = $('#board').find('.square-' + move_elm.attr('to'));
    //var center_from = center(square_from);
    //var center_to = center(square_to);

    //setTimeout(function () {

    //    draw_arrow(center_from, center_to, ['rgba(108, 39, 1, 0.75)', 'rgba(239, 231, 108, 0.7)']);

    //}, 240);

}

function setEmptyBoard() {
    TotlMoves = 0;
    initial_fen = '';
    initial_position();
    lastFen = start_Board_Fen;
    $('#analyze_res').html('');
    $('#analyze_res5').html('');
    stopAnalysisIfNeeded();
    $('#game_moves_html').empty();
    $('#WhitePlayer').html('');
    $('#BlackPlayer').html('');
    $('#WhiteElo').html('');
    $('#BlackElo').html('');
    $('#against').html('');

    $('#result').html('');
    $('#event').html('');
    $('#eco').html('');
    $('#annotator').html('');
    $('#eventdate').html('');

    chess.reset();

    if (lastFen == '')
        lastFen = start_Board_Fen;
    board.position(lastFen);
    lastBoardFen = lastFen;
    stopRecording();
}

function oneHeader(key, value) {
    var lf = '<br>';
    return '[' + key + ' "' + value + '"]' + lf;
}
function getPgnHeader(game, useGameFEN, lastAnalFen) {
    var pgn = '';
    var lf = '<br>'; //'\n'; //'\r\n';
    if (!game.TournName) game.TournName = '';
    var isstip = 0;
    var isauthor = 0;
    var theauthor = '';
    if (game.Authors && game.Authors != null && game.Authors != '') {
        var p1 = game.Authors.indexOf('source');
        if (p1 > 0)
            theauthor = game.Authors.substring(0, p1);
        else
            theauthor = game.Authors;
       
        isauthor = 1;
    }
   
    var event = '';
    if (isauthor > 0) {
        if (!game.TournName || game.TournName == '')
            event = theauthor;
        else 
            event = game.TournName.replace('"', '').replace('"', '');
    }
    else
        event = game.TournName.replace('"', '').replace('"', '');
    pgn += oneHeader('Event', event); // '[Event "' + event + '"]' + lf;
    if (isauthor > 0)
        pgn += '[Author "' + theauthor + '"]' + lf;
    var stip = '';
    if (game.Stipulation) {
        stip = game.Stipulation.replace('"', '').replace('"', '');
        
        pgn += oneHeader('Stipulation', stip);
        isstip = 1;
        if (!game.result || game.result == '?' || game.result == '?-?') {
            isstip = 2;
            game.result = stip; // ?? byStipulation(stip);
            
            pgn += oneHeader('Result', game.result);
        }
        else if (game.result == '=') {
            game.result = 3;
            //pgn += oneHeader('Result', strResult(game.result, 1));
        }
        else if (game.result == '+') {
            game.result = 1;
            //pgn += oneHeader('Result', strResult(game.result, 1));
        }
    }
    if (game.Distinction) {
        dist = game.Distinction.replace('"', '').replace('"', '');
        pgn += oneHeader('Distinction', dist);      
    }

    var playerw = WhiteName(game);
    var playerb = BlackName(game);
    if (playerw == 'Player 1' || playerw == '') {
        if (isstip > 0) {
            if (isauthor > 0)
                playerw = theauthor;
            else 
                playerw = byStipulation(stip);
        }
    }
    if (playerb == 'Player 2' || playerb == '')
        playerb = '';
    
    pgn += oneHeader('White', playerw);
    pgn += oneHeader('Black', playerb);
    if (isstip<2)
        pgn += '[Result "' + strResult(game.result, 1) + '"]' + lf;
    if (game.WhiteElo && game.WhiteElo > 0)
        pgn += '[WhiteElo "' + game.WhiteElo + '"]' + lf;
    if (game.BlackElo && game.BlackElo > 0)
        pgn += '[BlackElo "' + game.BlackElo + '"]' + lf;
   
    if (game.Annotator)
        pgn += '[Annotator "' + game.Annotator + '"]' + lf;
    pgn += '[ECO "' + game.ECO + '"]' + lf;
    if (game.DateStr)
        pgn += '[Date "' + game.DateStr + '"]' + lf;
    if (lastAnalFen && lastAnalFen != '')
        initial_fen = lastAnalFen;
    else if (useGameFEN )
        initial_fen = game.GameFEN; // is used in headers
    if (initial_fen && initial_fen != 'undefined' && initial_fen != '')
        pgn += '[FEN "' + initial_fen + '"]' + lf;

    if (game.PgnType == 7) {
        if (game.StartOpening)
            pgn += oneHeader('Opening', game.StartOpening.replace(/\"/g, "").replace(/\'/g, "").trim());
        var _hoursPart;var _minutes
        if (game.Times && game.Times != '') {
            var Times = game.Times.split('_'); var timeSec; var incr;
            if (Times.length > 3)
            {
                try     {    
                    _hoursPart=parseInt(Times[0]);
                    timeSec = _hoursPart * 3600;                     
                    _minutes = parseInt(Times[1]);
                    timeSec += _minutes * 60;
                    _minutes = _minutes + _hoursPart * 60;
                    timeSec += parseInt(Times[2]);
                    incr = parseInt(Times[3]);
                }
                catch (e)
                {
                    timeSec = 300;// 
                    _minutes = 5;
                    _hoursPart = 0;
                    incr = 1;
                }
            }
            else if (Times.length > 2)
            {
                try
                {
                    _minutes = parseInt(Times[0]);
                    timeSec = _minutes * 60;
                    timeSec += parseInt(Times[1]);                    
                    incr = parseInt(Times[2]);                    
                }
                catch (e)
                {
                    timeSec = 300;// 
                    _minutes = 5;
                    _hoursPart = 0;
                    incr = 1;
                }
            }
            else if (Times.length > 0)
            {
                try
                {
                    if (Times[0].indexOf(":") > 0)
                    {
                        var TimesSec = Times[0].split(':');
                        if (TimesSec.length > 1)
                            timeSec = parseInt(TimesSec[0]) * 60 + parseInt(TimesSec[1]);
                        else
                            timeSec = parseInt(TimesSec[0]) * 60;
                    }
                    else
                    {
                        _minutes = parseInt(Times[0]);
                        timeSec = _minutes * 60;
                    }
                    if (Times.length > 1)
                    {
                        incr = parseInt(Times[1]);
                    }
                    else incr = 0;
                }
                catch (e)
                {
                    timeSec = 300;// 
                    _minutes = 5;
                    _hoursPart = 0;
                    incr = 1;
                }
            }
            else
            {
                timeSec = 300;// 
                incr = 1;
            }
            pgn += oneHeader('TimeControl', '' + timeSec + '+' + incr);
        }
    
    }
    return pgn;

}

function pgnDirectiveValue(pgn,dir) {
    if (!pgn || pgn == null) return '';
    var fen1 = '';
    var p = pgn.indexOf('['+dir+' ');
    if (p >= 0) {
        var pe = pgn.indexOf(']', p + dir.length+1);
        if (pe > 0) {
            fen1 = pgn.substr(p + dir.length + 1, pe - p - dir.length - 1);
            //if (dir=='FEN')
            fen1 = fen1.trim().replace(/\"/g, "");
        }
    }
    return fen1;
}

function byStipulation(stip,col) {
    if (!stip)
        return '';
    stip = stip.replace(/\"/g, "");
    switch (stip.trim()) {
        
          
        case '#2':
            return "Mate in 2";
        case '#3':
            return "Mate in 3";
        case '#4':
            return "Mate in 4";
        case '#5':
            return "Mate in 5";
        case 'h#2':
            return "Help Mate in 2";
        case 'h#3':
            return "Help Mate in 3";
        case 'h#4':
            return "Help Mate in 4";

        case 's#2':
            return "Self Mate in 2";
        case 's#3':
            return "Self Mate in 3";
        case 's#4':
            return "Self Mate in 4";
        case '+':
            if (col == 'b') // not sure what to put !!
                return "Win";
            else 
                return "White wins";
        case '1-0':
            return "White wins";
        case '0-1':
            return "Black wins";
        case '=':
        case '1/2-1/2':
            if (!col)
                return "Draw";
            else if (col == 'w')
                return "White to play and Draw";
            else if (col == 'b')
                return "Black to play and Draw";
            else
                return "Draw";
        default:
            if (stip != '' && stip[0] == '#' && stip.length<4) {
                stip = 'Mate in ' + stip.substring(1);
            }
            return stip;
    }
}

function setEmptyGame() {

    lastGame = {};
    var game = lastGame;
    game.GamePGN = '';
    LastPgn = game.GamePGN;

    game.TournName = '';
    game.WhiteEName = ''; game.WhiteName = '';
    game.BlackEName = ''; game.BlackName = '';
    game.Authors = '';
    game.Stipulation = '';
    game.WhiteElo = 0; game.BlackElo = 0;
    game.result = '';
    game.Annotator = '';

    game.ECO = '';
    game.DateStr = '';
    game.GameFEN = '';

    game.problemList = []; game.RemarkVariationsList = [];
    game.wb = 1;
}


emptyGame = function (gn) {
    $('.timer').hide();
    $('#timerhdr').hide();
    alert('Bad Game ' + gn);
}

// in save/replace only for pgn
setAutoHeaderInGameFenAndPgn = function (game,fen,pgn,setval) {
    var col = '';
    //var txt = $('#dselText').val();
    //fenOfPgn1
    game.hdr = '';
    game.Authors = '';
        var fenarr = fen.split(' ');
        if (fenarr != null && fenarr.length > 1) {
            col = fenarr[1];
            var prcolwb = (col == 'b') ? 'White' : 'Black';
        }

        
        var res = pgnDirectiveValue(pgn, 'Result');
        var event = pgnDirectiveValue(pgn, 'Event');
        var white = pgnDirectiveValue(pgn, 'White');
        var black = pgnDirectiveValue(pgn, 'Black');
        var yacaut = pgnDirectiveValue(pgn, 'Author');
        var date = pgnDirectiveValue(pgn, 'Date');
        var stipulation = pgnDirectiveValue(pgn, 'Stipulation');
        if (event == '?')
            event = '';
        date = date.replace(/\?/g, "");
        if (date.length >= 1 && date[0] == '.')
            date = date.replace(/\./g, "");
       
        if (date.length > 4) {
            datearr = date.split('/');
            if (datearr.length > 2) {
                if (datearr[0] > 1500)
                    date = datearr[0];
                else if (datearr[1] > 1500)
                    date = datearr[1];
                else if (datearr[2] > 1500)
                    date = datearr[2];
            }
            else if (datearr.length > 1) {
                if (datearr[0] > 1500)
                    date = datearr[0];
                else if (datearr[1] > 1500)
                    date = datearr[1];             
            }
            else// if (date.length >= 4)
               date = date.substring(0, 4);
        }
        var hdr = '';
     
        if (stipulation && stipulation != '')
            hdr = byStipulation(stipulation,col);
         else 
            hdr = byStipulation(res,col);
        if (hdr == res) // not found
        {
            if (col == 'b')
                hdr = 'Black to play';
            else
                hdr = 'White to play';
        }
        var auth = '';
        var pri = '';
        if (white.toLowerCase().substring(0, 6) == 'white ' || white.toLowerCase().substring(0, 6) == 'black ') // take from here
        {
            game.hdr=white;
            if (yacaut != '')
                game.Authors=yacaut + ' ' + date;
            else if (event != '')
                game.Authors=event + ' ' + date; // ? add date
        }
        else { // regular system
            game.hdr=hdr;
            auth = white;
            if (black && black != '' && black != '?') {
                if (black[0] == '(') {

                }
                else if (black[0] == '=') {

                }
                else

                auth += ' - ' + black;
            }
            if (auth.toLowerCase().indexOf('white') > 0) {
                game.hdr=auth;
                game.Authors='';  // includes all ???
            }
            else
                game.Authors=auth;
        }
        game.stipulation = stipulation;
        if (setval == 1) {
            //game.hdr , game.Authors already set
             
            game.TournName = removeEventBadChars(event); 
            game.DateStr = date;
            game.GameFEN = fen;
        }
}

fenOfPgn1 = function (pgn) {
    if (!pgn || pgn == null) return '';

    return pgnDirectiveValue(pgn, 'FEN'); //   fen1;
}
//game_pgn_load
getGameFenAndHeader = function (game) {
    //if (game && game != null) {
    //    var pgn_type = game.PgnType;
    //    var fen1 = game.GameFEN;
    //    if (pgn_type == 2 || pgn_type == 3) {
           
    //        var t = game.TournName;
    //        if (t == null) t = '';
    //        var d = game.DateStr;
    //        if (d == null) d = '';
    //        var a = game.Authors;
    //        if (a == null) a = '';
    //        var p = game.Distinction;
    //        if (p == null) p = '';
    //        var r = game.Stipulation;
    //        var res = byStipulation(r);
    //    }
    //    else {
    //        var pgn = game.GamePGN;
    //        var fen = fenOfPgn1(pgn);
            
    //        var fenarr = fen.split(' ');
    //        if (fenarr != null && fenarr.length > 1) {
    //            col = fenarr[1];
    //            var prcolwb = (col == 'b') ? 'White' : 'Black';
    //        }

            
    //        var res = pgnDirectiveValue(pgn, 'Result');
    //        var event = pgnDirectiveValue(pgn, 'Event');
    //        var white = pgnDirectiveValue(pgn, 'White');
    //        var black = pgnDirectiveValue(pgn, 'Black');
    //        var yacaut = pgnDirectiveValue(pgn, 'Author');
    //        var date = pgnDirectiveValue(pgn, 'Date');
    //        date = date.replace(/\?/g, "");
    //        if (date.length >= 1 && date[0] == '.')
    //            date = date.replace(/\./g, "");
    //        if (date.length >= 4)
    //            date = date.substring(0, 4);
    //        var hdr = '';
    //        //if (res == '0-1')
    //        //    hdr='Black to play and win';
    //        //else if (res == '1-0')
    //        //    hdr='White to play and win';
    //        //else if (res == '1/2-1/2')
    //        //  hdr='White to play and draw';
    //        hdr = byStipulation(res);
    //        if (hdr == res) // not found
    //        {
    //            if (col == 'b')
    //                hdr = 'Black to play';
    //            else
    //                hdr = 'White to play';
    //        }
    //        var auth = '';
    //        if (white.toLowerCase().substring(0, 6) == 'white ' || white.toLowerCase().substring(0, 6) == 'black') // take from here
    //        {
    //            //$('#Header').val(white);
    //            //if (yacaut != '')
    //            //    $('#Author').val(yacaut + ' ' + date);
    //            //else if (event != '')
    //            //    $('#Author').val(event + ' ' + date); // ? add date
    //        }
    //        else { // regular system
    //            //$('#Header').val(hdr);
    //            //auth = white;
    //            //if (black && black != '' && black != '?')
    //            //    auth += ' - ' + black;
    //            //if (auth.toLowerCase().indexOf('white') > 0) {
    //            //    $('#Header').val(auth);
    //            //    $('#Author').val('');  // includes all ???
    //            //}
    //            //else
    //            //    $('#Author').val(auth);
    //        }

    //    }
    //    //$('#fenText').val(fen1);
    //    ////getAutoHeader();
    //    //$('#Header').val(res);

    //    //$('#Author').val(a + ' ' + d);
    //    //display();
    //}
}

function WhiteName(game) {
    if (game.WhiteEName != null && game.WhiteEName != '') return game.WhiteEName;
    else return game.WhiteName == null ? '' : game.WhiteName;
}
function BlackName(game) {
    if (game.BlackEName != null && game.BlackEName != '') return game.BlackEName;
    else return game.BlackName == null ? '' : game.BlackName;
}
function NamesOnList(game) {
    // on list ; no need stipulation for type 1
    if ((game.PgnType == 3 || game.PgnType == 2 || game.PgnType == 13 || game.PgnType == 23) && game.Authors && game.Authors != '' && game.Stipulation) {
        return (byStipulation(game.Stipulation) + ': ' + game.Authors);

    }
    else {
        var wn = game.WhiteName;
        if(wn==null)
        return WhiteName(game);
      if (wn.substring(0, 5) == 'White' || wn.substring(0, 3) == 'Win' || wn.substring(0, 4) == 'Draw' || wn.substring(0, 1) == '#') { // etiud
        var hh = WhiteName(game);
        if (game.BlackName != '' && game.BlackName != '?') hh += '-' + BlackName(game);
        hh += ' ' + game.TournName;
        return hh.replace('=', ' ');
      }
      else if (game.BlackName == '' || game.BlackName == '?') { // etiud also
        var hh = WhiteName(game).replace('=', ' ');
        hh += ' ' + game.TournName;
        return hh;
      }
      else if (game.BlackName == 'Player 2') {
        var hh = WhiteName(game).replace('=', ' ');
        return hh;
      }
        else
            return (WhiteName(game) + '-' + BlackName(game)).replace('=',' ');
    }
}

function initial_position() {
  try {
    remove_arrows();
    $('#analyze_res').html('');
    $('#analyze_res5').html(''); //stopAnalysisIfNeeded();
    }
    catch (e) { }
    lastBoardFen = initial_fen;
    lastFen = initial_fen;
    board.position(initial_fen);
    lastBoardFen = lastFen;
    $('#game_html .move').removeClass('active');


    remove_squares();

    var first_move = $('#game_html').find('.move').first();


    $('#btn_prev_move').prop('disabled', true);
    $('#btn_initial_position').prop('disabled', true);

    $('#btn_next_move').prop('disabled', false);
    $('#btn_final_position').prop('disabled', false);

    if (first_move && first_move != null)
        scroll_to_move(first_move);

}


function final_position() {
    $('#analyze_res').html(''); $('#analyze_res5').html(''); stopAnalysisIfNeeded();

    //.not(".variant .move")
    var last_move = $('#game_html').find('.move').not(".variant .move").last();
    make_move(last_move);

    $('#btn_next_move').prop('disabled', true);
    $('#btn_final_position').prop('disabled', true);

    $('#btn_prev_move').prop('disabled', false);
    $('#btn_initial_position').prop('disabled', false);

}



function getCIRemGliph1(st) {
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
            return 'with'; // the idea';
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



function getRemGliph1(num) {
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
            if (p_lang == 'h') return 'נצחון ללבן';//'-+';
            else return '+−';
        case 19:
            if (p_lang == 'h') return 'נצחון לשחור';//'+-';
            else return '−+';
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

        case 141:
            return '&nbsp;Aimed against';
        case 143:
            return '&nbsp;Worse';
        case 144:
            return '&nbsp;Equivalent';

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



        default:
            if (num >= 1000) { // command
                return "";
            }
            else 
                return num;
    }
}
getRemGliph = function (num) {
    return getRemGliph1(num);
}
getCIRemGliph = function (st) {
    return getCIRemGliph1(st);
}
function addVariant() {
}

function hideShowGameBtns(HideMov,solve, PgnType) {
    if (HideMov == 1 || (solve==10 && (HideMov == 11 || HideMov==12)) || solve == 1 || solve == 2) {
        $('#btn_get_pgn_1').hide();
        $('#btn_create_pgn1').hide();
        // $('#btn_update_game').hide();
        $('#btn_save_game').hide();
         $('#btn_save_list').hide();
        $('#btn_get_pgn').hide();

        $('#btn_insert_line').hide();
        $('#btn_ins_text').hide();
        $('#btn_prom_line').hide();
        $('#btn_ins_diag').hide();
        $('#btn_ins_dolar').hide();
        $('#btn_del_line').hide();
        $('#btn_refresh_1').hide();
        $('#btn_dolar').hide();
        if ((solve == 10 && (HideMov == 11)) || solve == 1)
          $('#btn_get_fen_1').hide();
        

    }
    else if ((solve == 10 && HideMov == 13) || solve == 3) {
        $('#btn_get_pgn_1').hide();
        $('#btn_create_pgn1').hide();
       
        $('#btn_save_game').hide();
        $('#btn_save_list').hide();
        $('#btn_get_pgn').hide();

        $('#btn_insert_line').hide();
        $('#btn_ins_text').hide();
        $('#btn_prom_line').hide();
        $('#btn_ins_diag').hide();
        $('#btn_ins_dolar').hide();
        $('#btn_del_line').hide();
        $('#btn_refresh_1').hide();
        $('#btn_dolar').hide();



    }
    else {
        $('#btn_get_pgn_1').show();
        
            
        // $('#btn_update_game').hide();
         
        if (p_psw != null && p_psw != '') {
            $('#btn_save_game').show();
            $('#btn_save_list').show();
            $('#btn_create_pgn1').show();


        }
        else {
            if (PgnType && PgnType != null) {
                if (PgnType<=1) // show only yaml
                  $('#btn_get_pgn_1').hide();               
            }
        }
        $('#btn_get_pgn').show();
        $('#btn_insert_line').show();
        $('#btn_ins_text').show();
        $('#btn_prom_line').show();
        $('#btn_ins_diag').show();
        $('#btn_ins_dolar').show();
        $('#btn_del_line').show();
        $('#btn_refresh_1').show();
        $('#btn_dolar').show();
    }
}

function emptyNotCommonHeaders() {
    $('#annotator').html(''); $('#eventdate').html(''); $('#eco').html(''); $('#result').html('');
    $('#BlackPlayer').html(''); $('#against').html('');
    $('#BlackElo').html(''); $('#WhiteElo').html('');
}

function removeEventBadChars(t) {
    if (t) {
        //if (t.length >= 5 && (t.substr(0, 3) == 'I h' || t.substr(0, 3) == 'I i') || t.substr(0, 3) == 'I j') {
        if (t.length >= 5 && (t.substr(0, 2) == 'I ' || t.substr(0, 3) == 'II ') || t.substr(0, 4) == 'III ') {
            var pp = t.indexOf(' ');
            if (pp > 0) {
                var x = t.substring(pp + 1).trim();
                if (x.length > 2 && x[1] == ' ') {
                    t = x.substring(2).trim();
                }
            }
        }
         
    }
    return t;
}
function setGameHeaders(game,noelo) {
    var onePlayer = 0;
    var wname = game.WhiteName == 'Player 1' ? '' : WhiteName(game);
    emptyNotCommonHeaders();
   
    if (game.Stipulation && game.Stipulation != '') { // puzzle - my
        $('#WhitePlayer').html(byStipulation(game.Stipulation)); $('#BlackPlayer').html(''); onePlayer = 1;
        if (game.WhiteName != '' && game.BlackName != '') {// (game.TournName)
            var ev = '';
            ev=WhiteName(game) + ' - ' + BlackName(game);
           
            $('#event').html(ev);
        }
    }
    else {
        $('#WhitePlayer').html(wname.replace('=',' '));
        if (game.BlackName == 'Player 2' || game.BlackName == '?' || game.BlackName == '')
        { $('#BlackPlayer').html(''); onePlayer = 1; }
        else {
            var black = game.BlackName;
            if (black[0] == '(') {
                onePlayer = true;
            }
            else if (black[0] == '=') {
                onePlayer = true;
            }
            else 
                $('#BlackPlayer').html(BlackName(game));
        }
        if (noelo && noelo > 0) {
            //$('#BlackElo').html(''); $('#WhiteElo').html('');
        }
        else {
            if (game.WhiteElo && game.WhiteElo > 0)
                $('#WhiteElo').html('(' + game.WhiteElo + ')');
            else
                $('#WhiteElo').html('');
            if (game.BlackElo && game.BlackElo > 0)
                $('#BlackElo').html('(' + game.BlackElo + ')');
            else
                $('#BlackElo').html('');
        }

        if (onePlayer)
        { } // $('#against').html('');
        else
            $('#against').html('-');
        if (game.result && game.result != '?-?' && game.result != '*')
            $('#result').html(strResult(game.result, 1));
        if (game.TournName == '?')
            $('#event').html('');
        else {
            var t = game.TournName;
            if (t) {

                removeEventBadChars(t);             
                 
                $('#event').html(t);
            }
        }
        if (game.ECO && game.ECO != '')
            $('#eco').html('ECO: ' + game.ECO);
    }
    if (game.Annotator && game.Annotator != null && game.Annotator != '') {
        if (game.Annotator.substr(0, 3).toLowerCase() == 'win')
            $('#annotator').html('');
        else if (game.Annotator.substr(0, 2).toLowerCase() == 'mp')
            $('#annotator').html('');
        else if (game.Annotator.substr(0, 5).toLowerCase() == 'admin')
            $('#annotator').html('');
        else 
            $('#annotator').html('[' + game.Annotator + ']');
    }
    else
        $('#annotator').html('');
    if (game.DateStr && game.DateStr != '????.??.??')
        $('#eventdate').html(game.DateStr.replace('.??.??', '').replace('.??', ''));
}

function setGameHeadersYaml(game) {
    var wname = game.WhiteName == 'Player 1' ? '' : WhiteName(game);
    emptyNotCommonHeaders();

    $('#WhitePlayer').html(wname);
    $('#WhitePlayer').html(byStipulation(game.Stipulation));
    var ev = game.Authors;
    if (game.TournName && game.TournName != '?') {
        ev += '. ' + game.TournName;
        if (game.Distinction && game.Distinction != '?') {
            ev += '. ' + game.Distinction;
        }
    }
    else
        ev = 'Author : ' + ev;
    $('#event').html(ev);
    if (game.DateStr && game.DateStr != '????.??.??')
        $('#eventdate').html(game.DateStr.replace('.??.??', '').replace('.??', ''));
}

function setGameHeadersAll(game, noelo) {
    var wname = game.WhiteName == 'Player 1' ? '' : WhiteName(game);
    if ((game.PgnType == 3 || game.PgnType == 2 || game.PgnType == 13 || game.PgnType == 23 || wname == '') && game.Authors && game.Authors != '' && game.Stipulation) {
        setGameHeadersYaml(game);
    }
    else {
        setGameHeaders(game,noelo);
    }
}
function getDolarSign(st) {
    return replaceDolarRemark(st);
}

scoresToRemarksList = function (game, scores) {
    var ind = 0;
    var dScoreStr = '';
    var resStr = ''; var res = '';
    if (game && scores && scores != '') {
        scoresArr = scores.split(',');
        for (i = 0; i < scoresArr.length; i++) {
            score = scoresArr[i];
            if (score && score != '') {
                var col='';
                if (score.indexOf('w') > 0) {
                    col = 'w';
                }
                else if (score.indexOf('b') > 0) {
                    col = 'b';
                }
                if (score[0] == 'r') {
                    scoreOne = score.split(col);
                    if (scoreOne.length >= 2) {
                        res = scoreOne[0].replace('r','');
                        resStr = scoreOne[1];
                    }
                }
                else {
                ind++;
                if (col != '') {
                    scoreOne = score.split(col);
                    if (scoreOne.length >= 2) {
                        scorePts = scoreOne[1];
                        iScore = parseInt(scorePts);
                        if (iScore > 10000)  
                            dScoreStr = 'Mate in ' + (iScore - 10000)
                        else if (iScore < -10000)
                            dScoreStr = 'Mate in ' + (iScore + 10000) * (-1) 
                        else {
                            dScoreStr = iScore / 100.0;
                            if (iScore > 0)
                                dScoreStr = '+' + dScoreStr;
                        }
                        var remObj = getRemObjectT(10, dScoreStr);
                        try {
                            if (game.RemarkVariationsList != null) {
                                if (ind >= game.RemarkVariationsList.length)
                                    ind = game.RemarkVariationsList.length - 1;
                                if (!game.RemarkVariationsList[ind])
                                    game.RemarkVariationsList[ind] = [];

                                game.RemarkVariationsList[ind].push(remObj);
                            }
                        } catch (e) {
                            var x = e.message;
                        }
                    }
                }
                }
            }
        }
        if (game.problemList)
            ind = game.problemList.length;
        if (ind > 0 && resStr != '') {
            var res1 = getRes(parseInt(res));
            var opp = '';
            if (res == '1') opp = 'Black '; else if (res == '2') opp = 'White ';
            var resst = getResType(parseInt(resStr), opp);
           
            resStr = 'Result : ' + res1 + '.&nbsp;  Reason : ' + resst;
            var remObj = getRemObjectT(0, resStr);
            if (!game.RemarkVariationsList[ind])
                game.RemarkVariationsList[ind] = [];
            game.RemarkVariationsList[ind].push(remObj);
        }
    }
     
}

replaceDolarRemark = function (rem) {
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





function createLegalPgnMovesArray(fen, movesText, pgntype, fmovenum, wbs) {
    //var move = {
    //    color: turn,
    //    from: from,
    //    to: to,
    //    flags: flags,
    //    piece: board[from].type
    //};
    //game = new Chess();
    var id = 'boardxx';
    var game = {};
    if (fen != '')
        game = new Chess(fen);
    else
        game = new Chess();
    var board222 = new ChessBoard(id); // ??
    var pgnArr = [];
    var movesArr = movesText.split(' ');
    var longNot = 0;
    if (pgntype == 7 || pgntype == 8) longNot = 1; // Nf1-c2 and not wN-f1-c2
    var hnum = 1;
    for (i = 0; i < movesArr.length; i++) {
        var movestr = movesArr[i].trim();
        if (movestr == '') {

        }
        else if ((movestr.length < 4 && movestr[0] != 'O') || movestr[0] == '1' || movestr[0] == '2') { // num
            if (fmovenum > 1) {
                var p1 = movestr.indexOf('.');
                if (p1 > 0) {
                    var mn = Math.floor((hnum - 1) / 2);
                    var sheer = (hnum - 1) - mn * 2;
                    var mnum = fmovenum + mn;
                    var col = sheer ? 'b' : 'w';
                    movestr = mnum + movestr.substr(p1);
                }
            }
            pgnArr.push(movestr);
        }
        else { // move
            
            var out = {};
            
            var rc=board222.cbToCMove(movestr, out, longNot, wbs);
        
            var move1 = game.move(out.almove);
            if (move1) {
                var pgn1 = move1.san; // game.move_to_san_g(move1);
                var prevc = move1.color;
                wbs = prevc == 'w' ? 'b' : 'w'; // next
                pgnArr.push(pgn1);
            }
            hnum++;
        }
    }
    return pgnArr;
}



createPgnByPgnTypeOfGame = function (lastGame) {
    var movenum = 1;
    var pgn = '';
    if (lastGame.PgnType == 7 || lastGame.PgnType == 8) { // eng/hum.tourn
        // engines
        LastHeaders = getPgnHeader(lastGame, 1);
        var pgn1 = lastGame.GamePGN;
        var fen = lastGame.GameFEN;
        var str = lastGame.GameText; // only moves
        var fenarr = fen.split(' ');
        var fmovenum = 1;
        var wbs = 'w';
        if (fenarr != null && fenarr.length > 5) {
            fmovenum = parseInt(fenarr[5]);
            wbs = fenarr[1];
        }
        var pgnArr = createLegalPgnMovesArray(fen, str, lastGame.PgnType, fmovenum, wbs);
        pgn = LastHeaders + pgnArr.join(' ');
    }
    else {
        pgn = getPgnHeader(lastGame, 1);
        pgn += createGameHtml(null, lastGame.problemList, lastGame.result, lastGame.RemarkVariationsList, movenum, lastGame.wb, 1, lastGame.MultiLine);
        pgn = pgn.split('   ').join(' '); //, ' ').replace('  ', ' ').replace('  ', ' ');
        pgn = pgn.split('  ').join(' ');
    }
    return pgn;
}
//fen = game.fen();

//// bK-e8-g8 -> to chess.js move
//


function getTotalMoves() {
    var len = TotlMoves;
    return len;
}

setPuzzleFinal = function (notmsg) {
   
    if (!notmsg)
        inSolve('Solved OK !');
    else inSolve('');
  

    var game = lastGame;
    var movenum = game.StartMoveNum;
    createGameHtml($('#game_moves_html'), game.problemList, game.result, game.RemarkVariationsList, movenum, game.wb, 0, game.MultiLine);

    setGameHeadersAll(game, 0);
    
    
    hideShowGameBtns(game.HideMov, 0, game.PgnType);
    $("#game_moves_html .move").on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        clearAllTimeouts();
        make_move($(this), event);
        $('#analyze_res5').html('');
        stopAnalysisIfNeeded();
    });
 

    //$('#solvediv').show();
    
    board.setDraggable(false);
    $('#board_canvas').show();
    recording.active = false;

    $('#game_html').removeClass('game_html_mob_smaller');
    $('#game_moves_html').removeClass('game_moves_html_mob_smaller');
    $('#timerhdr1').removeClass('timerhdr_hidden'); //timerhdr_mob_hidden');
    //$('#engdiv').removeClass('engdiv_mob_hidden');
    $('#belowBoard0').show();
    //$('#belowBoard0').addClass('belowBoard_mob_hidden');


    //$('#solvediv').show();
    $('#solvHintBtn').hide(); $('#solvPlayBtn').hide(); $('#solvShowBtn').hide();
   

    unlockScreen();
    scrollToTop();
   
    setTimeout(function () {
        if (document.getElementById("btn_next_move")) {
            document.getElementById("btn_next_move").focus();
            document.getElementById("buttons0").focus();
        }
        }, 500);

    setTimeout(function () {
        //$('#game_chooserwr').show();
        $('#solvediv').hide();

    }, 3000);

    //$('#solvedivspan').html('');
    
}

setGameColors = function (game) {
    if (game!=null && p_sq == null || p_sq == '' || p_sq == '-1') {
        var prevsq = g_sq;
        g_sq = game.bcol;
        if (g_sq < 0 || g_sq == '')
            g_sq = 0;
        changeImagesColor(g_sq, prevsq);
    }
    else g_sq = p_sq;
    if (game != null && board && board != null)
        if (board.setSQ)
            board.setSQ(g_sq);
    if (inFrame < 2) { // not in gen 
       // var str = "<option " + sel + "value='" + el.id + "," + el.white + "," + el.black + "'>" + el.id + "=" + el.name + "</option>";
        var ob = sqcolors[g_sq];
        if (ob) {
            var bgr = ob.whited;
            var col = ob.blackd;
            if ($('#noframehdr')) {
                $('#spacer').css("background-color", bgr).css("color", col);

            }
            if ($('#body'))
                $('#body').css("background-color", bgr);//.css("color", col);
            // not works well from gen
            //if ($('#framewrap')) {
            //    if (window.parent != null && window.parent.document && window.parent.document  != null) {
            //        parent.setFrameWrapColor('#' + bgr); // + ' !important'
            //    }
            //}


            //    $('#framewrap').css("background-color", bgr+' !important');//.css("color", col);
            
             
        }
    }
    // board55 .. ??
}

setPuzzleError=function () {    
    var mmsgs = ['Blunder !', 'Fault !', 'Try again !', 'Wrong !', 'Error !', 'Mistake !', 'Wrong !', 'Wrong move !', 'Not correct !', 'Try again !'];
    var mmsg = mmsgs[Math.floor(Math.random() * mmsgs.length)];   
    inSolve(mmsg);     
}
function showGameByNum(game_n) {
    if (game_n >= 0 && game_n < gameList.length) {
        var game = gameList[game_n];
        remove_arrows();
        remove_squares();
        if (p_solve > 0 && p_solve < 10 && p_islist == 1)
            setPuzzle(game, p_islist);
        else
            setNewGame(game, p_hm);
    }
}
prevGame = function () {
    clearAllTimeouts();
    
    var v = $('#game_chooser').val();
    var game_n = parseInt(v) - 1;
    if (game_n >= 0) {
        //remove_arrows();
        initial_position();
        $('#game_chooser').val(game_n);
        showGameByNum(game_n);
    }
    //var game = gameList[game_n];

    //remove_arrows();
    //remove_squares();
    //setNewGame(game, p_hm);
}
nextGame = function () {
    clearAllTimeouts();
    
    var v = $('#game_chooser').val(); //.find('option:selected')
    var game_n = parseInt(v) + 1;
    if (game_n < gameList.length) {
        //remove_arrows();
        initial_position();
        $('#game_chooser').val(game_n);
        showGameByNum(game_n);
    }
}

replaceSpecialChars = function (text) {
    text = text.trim();
    var p1 = text.indexOf('threatx');
    if (p1 >= 0) {
        text = text.substring(0, p1) + 'threat:' + text.substring(p1+7);
    }
    if (text == '#') {
        text = '&nbsp;Mate';
    }
    else if (text.toLowerCase() == 'zz') {
        text = '&nbsp;Zugzwang';
    }
    else if (text.toLowerCase() == 'mzz') {
        text = '&nbsp;Mutual Zugzwang';
    }
    
    else {
        var p = text.indexOf('#');
        if (p >= 0) {
            text = replaceDolarRemark(text);
        }
    }
    //str2 = text;
    return text;
}
appendRemarkAndBoardInside = function (div, commentClassAdd, text) {
    var p = text.indexOf('[#]');
    var span = {};
    var pn = 0;
    if (p >= 0) {
        var str1 = ''; var str2 = '';
        pn = p + 3;
        if (p > 0) {
            str1 = text.substring(0, p);
            str2 = text.substring(pn);
        }
        else 
            str2 = text.substring(pn);
        if (str1.trim() != '') {
            span = $('<span />').attr('class', 'comment' + commentClassAdd + add_lang).html(str1);
            div.append(span);
        }

        var wwidth = $(window).width();
        if (p_hboard == '22' || p_hboard == '14' || ((p_hboard == '12') && wwidth < 500)) { }
        else {
            LastSmallBoard++;
            insertSmallDiagramDiv(div);
        }
    }
    else {
        /*
        text = text.trim();
        if (text == '#') {
            text = 'Mate';
        }
        else if (text.toLowerCase() == 'zz') {
            text = 'Zugzwang';
        }
        else if (text.toLowerCase() == 'mzz') {
            text = 'Mutual Zugzwang';
        }
        else {
            var p = text.indexOf('#');
            if (p >= 0) {
                text = replaceDolarRemark(text);
            }
        }
        */
        str2 ='&nbsp;'+replaceSpecialChars( text);
    }
    if (str2.trim() != '') {
        span = $('<span />').attr('class', 'comment' + commentClassAdd + add_lang).html(str2);
        div.append(span);
    }

     
}

