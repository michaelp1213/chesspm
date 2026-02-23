var chess, board, move_n = -1;
var game = null;
var json = '';

var initial_fen;
var last_move;

var start_Board_Fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

var timeouts = [];
var LastSmallBoard = 0;

chess = new Chess();
chess.reset();
var engwb = 0;
var mywb = 3 - engwb;
if (mywb == 3) mywb = 0;
var engtime = '5_0';

var withoutBoard = 0;
var pieceNot = 0; // 1 for pieces
var COLUMNS = 'abcdefgh'.split('');
var playFromStart = 1;
var limitMoves = 0;

var lastTim = 0;
var GL = {};
GL.lang = 'e';
var ws = {};
ws.engid = ''; ws.wsnum = -1;
var board55;
var board;
var hboard10board;
var lastFen = '';
var lastBoardFen = '';
var lastGame;
var LastPgn;
var LastKeys='';
var LastHeaders = '';

var SaveUpd = 1;
var LastId = 0;
var inFrame = false;
var frameTop = 0; // in gen >50

// this works also on dynamic added items !
var ClickedMoveVarid = '';
var prevLine = '';
var locked = false;
var globalOppMove = '';
var playState = 1;
var gameStarted = 1; var viewStarted = 0;
var gameList = [];
var recording = {
    lastFen: '', mnum: 0, wb: 1,
    updated: false

}
var smboardsize = 164; // cal it * 8 + 4 at end !
var recordscreen = 0;
var boardscreen = 0;
var commandBuilder = 0;
var rightWidth = 200;
var toptoMoveDiff = 70;
var lastmove = {
    lastFen: '', mnum: 0, wb: 1, varid: '', id: ''


}
var pstack = [];
var smallBoards = [];
var tarrow;
var cmdArr = [];

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function paramValueIs(pid,val) {
    if (pid && pid != null && pid == val)
        return true;
    else return false;
}
var p_dom = getParameterByName('dom');
var p_domain = 'http://www.chesspm.com/';
if (p_dom == 'h')
    p_domain = 'http://www.hon4u.com/chess/';
else if (p_dom == 'i')
    p_domain = 'http://www.hon4u.co.il/chess/';
else if (p_dom == 'a')
    p_domain = 'http://www.atar12.co.il/chess/';
var p_link = getParameterByName('link');
var p_src = getParameterByName('src');
var p_dbsrc = getParameterByName('dbsrc');
var lt = getParameterByName('lt');
var p_wview = getParameterByName('wview');
var p_drag = getParameterByName('drag');
var p_gn = getParameterByName('gn');
var p_gnto = getParameterByName('gnto');
var p_annum = getParameterByName('annum');
var p_fname = getParameterByName('fn');
var p_solve = getParameterByName('solve');
var p_diag = getParameterByName('diag');
var p_player = getParameterByName('player');
var p_islist = 0;

// board
var p_d = getParameterByName('d');
var p_ds = getParameterByName('ds');
if (!p_ds || p_ds == '') p_ds = '4';
var p_fen = getParameterByName('fen');
// board
var p_fenpgn = getParameterByName('fenpgn');
var p_setup = getParameterByName('setup');
var p_flip = getParameterByName('flip');
if (p_gn && p_gn.length > 10)
    p_gn = p_gn.substring(0, 9);
var byfen = 0;
if (p_fen && p_fen != null && p_fen != '') {
    p_gn = 'fen' + p_fen;
    p_fen = p_fen.replace(/_/g, " ").replace(/\./g, "/").replace(/\!/g, ".");
    byfen = 1;
}

var p_hboard = getParameterByName('hboard');
if(p_hboard==null || p_hboard=='') p_hboard = getParameterByName('hb');
var p_sres = getParameterByName('sres');
var p_seval = getParameterByName('seval');
var p_play = getParameterByName('play');
var p_top = getParameterByName('top');
var p_pos = getParameterByName('pos');
var p_hm = getParameterByName('hm');
var p_mov = getParameterByName('mov');
var p_wb = getParameterByName('wb');
var p_score = getParameterByName('score');
var p_voice = getParameterByName('voice');
var p_vel = getParameterByName('vel');
var p_chooser = getParameterByName('chooser');

var p_glist = getParameterByName('glist');
var p_wday = getParameterByName('wday');
var p_last = getParameterByName('last');
var p_author = getParameterByName('author');
var p_find = getParameterByName('find');
var p_findfen = getParameterByName('findfen');
var p_search = getParameterByName('search');


var p_lat = getParameterByName('lat');
var p_tourn = getParameterByName('tourn');

var p_lang = getParameterByName('la');
var p_eng = getParameterByName('eng');
var p_act = getParameterByName('act');
var p_load = getParameterByName('load');
var p_sq = getParameterByName('sq');
var p_psw = getParameterByName('psw');
var p_auth = getParameterByName('auth');

if (p_act == 'deb') {
    window.onerror = function (msg, url, lineNo, columnNo, error) {
        var string = msg.toLowerCase();
        var substring = "script error";
        if (string.indexOf(substring) > -1) {
            alert('Script Error: See Browser Console for Detail');
        } else {
            var message = [
                'Message: ' + msg,
                'URL: ' + url,
                'Line: ' + lineNo,
                'Column: ' + columnNo,
                'Error object: ' + JSON.stringify(error)
            ].join(' - ');

            alert(message);
        }
    }
}
//if (p_sq && p_sq != '') {
//}
//else p_sq = '0';
var p_gamenum = 0;
var p_hmnum = p_hm;
var playVel = 0; if (p_vel) playVel = p_vel;
if (playVel == 0) playVel = 1;
var add_lang = p_lang;
if (add_lang != 'h') add_lang = '';
var issq = 1;
var g_sq = p_sq; // for game
if (p_sq == '' || p_sq == null || p_sq=='-1') {
    issq = 0; g_sq = '2';
}


getCookie = function (key) {
    return ('; ' + document.cookie).split('; ' + key + '=').pop().split(';').shift();
}
if (!p_psw || p_psw == '') {
    p_psw = getCookie('psw');
    if (!p_psw || p_psw == '')
      p_auth = getCookie('auth');
}
//alert(p_psw);


