let sqcolors = [
  { id: 0, name: "Brown", white: "faf1e4", black: "b58863", whited: "fdf4e7", blackd: "b58863", bgr: "d5a883", bgr2: "c59873" },
  { id: 1, name: "Darker Brown", white: "faf1e4", black: "994b1d", whited: "faf1e4", blackd: "994b1d", bgr: "b97b4d", bgr2: "a95b2d" },
  { id: 2, name: "Gray", white: "f1f1f1", black: "adadad", whited: "fdfdfd", blackd: "a6a6a6", bgr: "b6b6b6", bgr2: "b6b6b6" },
  { id: 3, name: "Green", white: "eafaea", black: "769656", whited: "f2fff2", blackd: "769656", bgr: "96b686", bgr2: "86a666" },
  { id: 4, name: "Brown-Yellow", white: "ffdaa6", black: "a86320", whited: "ffe3ad", blackd: "a5601c", bgr: "c5804c", bgr2: "b5702c" },
  { id: 5, name: "Blue", white: "e5e5fc", black: "7c8fbc", whited: "f7f7ff", blackd: "7c8fbc", bgr: "a0b2dc", bgr2: "8c9fcc" },
  { id: 6, name: "Darker Blue", white: "e5e5fc", black: "7185b7", whited: "f4f4ff", blackd: "7185b7", bgr: "9ab0d7", bgr2: "8195c7" },

  { id: 7, name: "Mustard", white: "faf1e4", black: "b09050", whited: "fdf5e8", blackd: "ac8c4c", bgr: "ccac75", bgr2: "bc9c5c" },
  { id: 8, name: "Beige", white: "e8cac2", black: "b18270", whited: "f7dfd8", blackd: "b18270", bgr: "c99c93", bgr2: "c19280" }, //"e8cac2", black: "b18270" 
  { id: 9, name: "Green Light", white: "f1faec", black: "b7c182", whited: "fbfff7", blackd: "b2b97a", bgr: "c2c98f", bgr2: "c2c98a" },  // white: "f1faec", black: "b7c182" 
  { id: 10, name: "Gray-Blue", white: "e8eff4", black: "a5afb4", whited: "ecf3f7", blackd: "959fa4", bgr: "b0b8c0", bgr2: "a5afb4" }, //white: "e8eff4", black: "a5afb4"
  { id: 11, name: "Turquoise", white: "e4edf6", black: "4c90b3", whited: "e7f1f8", blackd: "4c90b3", bgr: "6cb0d3", bgr2: "5ca0c3" },

  { id: 12, name: "Dark Gray", white: "cdcdcd", black: "666666", whited: "dddddd", blackd: "666666", bgr: "868686", bgr2: "767676" }, //  "cdcdcd", black: "666666"
  { id: 13, name: "Light Blue", white: "d5e2e8", black: "77b5e1", whited: "e4f0f6", blackd: "67a5d1", bgr: "8ac1e8", bgr2: "77b5e1" },  //"d5e2e8" "77b5e1"
  { id: 14, name: "Brown Yellow", white: "fadaa8", black: "d29355", whited: "ffe2b8", blackd: "c28345", bgr: "d4a065", bgr2: "d29355" }, // "fadaa8", black: "d29355"
  { id: 15, name: "Blue All", white: "c6d6eb", black: "91b2d1", whited: "dfeffd", blackd: "81a2c1", bgr: "9ab8d8", bgr2: "91b2d1" }, //"c6d6eb", black: "91b2d1" 
  { id: 16, name: "Blue Green", white: "d3f2f4", black: "93d0d1", whited: "efffff", blackd: "73c0b1", bgr: "9fdcdd", bgr2: "83d0c1" }, // d3f2f4  93d0d1
  { id: 17, name: "Blue Light", white: "dee6ea", black: "88a7b9", whited: "ecf4f8", blackd: "7897a9", bgr: "9ab7c9", bgr2: "88a7b9" },

];


  //{ id: 0, name: "Brown", white: "faf1e4", black: "b58863", whited: "faf1e4", blackd: "b58863" },
  //{ id: 1, name: "Darker Brown", white: "faf1e4", black: "994b1d", whited: "faf1e4", blackd: "994b1d" },
  //{ id: 2, name: "Gray", white: "f1f1f1", black: "adadad", whited: "fafafa", blackd: "a6a6a6" },
  //{ id: 3, name: "Green", white: "eafaea", black: "769656", whited: "efffef", blackd: "769656" },
  //{ id: 4, name: "Brown-Yellow", white: "ffdaa6", black: "a86320", whited: "ffdfaa", blackd: "a86320" },
  //{ id: 5, name: "Blue", white: "e5e5fc", black: "7c8fbc", whited: "f2f2ff", blackd: "7c8fbc" },
  //{ id: 6, name: "Darker Blue", white: "e5e5fc", black: "7185b7", whited: "f2f2ff", blackd: "7185b7" },

  //{ id: 7, name: "Mustard", white: "faf1e4", black: "b09050", whited: "faf1e4", blackd: "b09050" },
  //{ id: 8, name: "Beige", white:"e8cac2", black: "b18270" ,whited: "f5d8cc", blackd: "b18270" }, //"e8cac2", black: "b18270" 
  //{ id: 9, name: "Green Light", white: "f1faec", black: "b7c182" , whited: "f6fff2", blackd: "b2b97a" },  // white: "f1faec", black: "b7c182" 
  //{ id: 10, name: "Gray-Blue", white: "e8eff4", black: "a5afb4" , whited: "e8eff4", blackd: "959fa4" }, //white: "e8eff4", black: "a5afb4"
  //{ id: 11, name: "Turquoise", white: "e4edf6", black: "4c90b3", whited: "e4edf6", blackd: "4c90b3" },

  //{ id: 12, name: "Dark Gray", white:"cdcdcd", black: "666666", whited: "dadada", blackd: "666666" }, //  "cdcdcd", black: "666666"
  //{ id: 13, name: "Light Blue", white: "d5e2e8", black: "77b5e1", whited: "e1edf4", blackd: "67a5d1" },  //"d5e2e8" "77b5e1"
  //{ id: 14, name: "Brown Yellow", white: "fadaa8", black: "d29355", whited: "ffdfb5", blackd: "c28345" }, // "fadaa8", black: "d29355"
  //{ id: 15, name: "Blue All", white: "c6d6eb", black: "91b2d1", whited: "d2e2f7", blackd: "81a2c1" }, //"c6d6eb", black: "91b2d1" 
  //{ id: 16, name: "Blue Green", white: "d3f2f4", black: "93d0d1", whited: "defdff", blackd: "73c0b1" }, // d3f2f4  93d0d1
  //{ id: 17, name: "Blue Light", white: "dee6ea", black: "88a7b9", whited: "eaf2f6", blackd: "7897a9" },

//fillDialogColorsToCombo = function (id) {
//    $('#' + id).empty();
//    $.each(sqcolors, function (index, el) {
//        var str = "<option value='" + el.id + "," + el.white + "," + el.black + "'>" + el.id + "=" + el.name + "</option>";
//        $("#" + id).append(str);
//    });
//}
// ????????
fillDialogColorsToCombo1 = function (id, defsq) {
    $('#' + id).empty();
    var sel = '';
    $.each(sqcolors, function (index, el) {
        if (defsq != '' && defsq != null && index == defsq)
            sel = 'selected ';
        else sel = '';
        var str = "<option " + sel + "value='" + el.id + "," + el.white + "," + el.black + "'>" + el.id + "=" + el.name + "</option>";
        //var str = "<option " + sel + "value='" + el.id + "," + el.white + "," + el.black + "," + el.whited + "," + el.blackd + "'>" + el.id + "=" + el.name + "</option>";
        $("#" + id).append(str);
    });


}
fillDialogColorsToComboForCanvas = function (id, defsq) {
    $('#' + id).empty();
    var sel = '';
    $.each(sqcolors, function (index, el) {
        if (defsq != '' && defsq != null && index == defsq)
            sel = 'selected ';
        else sel = '';
        var str = "<option " + sel + "value='" + el.id + "," + el.whited + "," + el.blackd + "'>" + el.id + "=" + el.name + "</option>";
        $("#" + id).append(str);
    });
}
function matchMaxWidthMedia(w) {
    if (window.matchMedia('(max-width: ' + w + 'px)').matches) {
        return true;
    } else {
        return false;
    }
}

//0:5001,7000;5:5001:3000
parseCommand = function (cmd) {
    var cmdArr = [];
    var hnum = 0;
    var cmdparams = [];
    var cmd1 = '';
    var params = [];
    if (cmd && cmd!='') {
        var strArr = cmd.split(';');
        if (strArr.length > 0) {
            for (var i = 0; i < strArr.length; i++) {
                hnumToCmd = strArr[i].split(':');
                if (hnumToCmd.length ==2) {
                    hnum = parseInt(hnumToCmd[0]);
                    cmdparams = hnumToCmd[1].split(',');
                    if (cmdparams.length > 0) {
                        cmd1 = cmdparams[0];
                        cmdArr[hnum] = {};
                        if (cmd1 == 'T')
                            cmd1 = 5001;
                        else if (cmd1 == 'C')
                            cmd1 = 5020;
                        else if (cmd1 == 'W')
                            cmd1 = 5040;
                        cmdArr[hnum].cmd = parseInt(cmd1);
                        cmdArr[hnum].cmdparams = cmdparams;
                    }
                }
            }
        }
    }
    return cmdArr;
}

// for recorder 

buildCommands1 = function (cmd) {
    commandBuilder = 1;
    $('#recorder_commands').show();
    cmdArr = parseCommand(cmd);
    // fill rechmnum
    $('#rechmnum').empty();
    var totmoves = lastGame.RemarkVariationsList.length;
    for (i = 1; i <= totmoves; i++) {
        var str = "<option value='" + i + "'>" + i + "</option>";
        $("#rechmnum").append(str);
    }
    //rechmnum
}

setOneCommand = function () {
    var hnum = $("#rechmnum").val();
    var cmd1 = $('#rec_type').val();
    var txt = $('#rectext').val();
    var tim = $('#rec_waitsec').val();
    var cmdparams=[];
    //if (cmd1 == 'T')
    //    cmd1 = 5001;
    //else if (cmd1 == 'C')
    //    cmd1 = 5020;
    
    if (cmd1 == 'C' || cmd1 == 'T' || cmd1 == 'W') {
        cmdparams[0] = cmd1;
        cmdparams[1] = parseInt(tim) * 1000;
        cmdparams[2] = '';
        if (txt != '')
            cmdparams[2]= txt;
        cmdArr[hnum] = {};
      
        cmdArr[hnum].cmd = cmd1;
        cmdArr[hnum].cmdparams = cmdparams;
    }
    else
    {
        bootbox.alert('Please choose command !');
    }
}

getCommandString = function () {
    var str = '';
    var totmoves = lastGame.RemarkVariationsList.length;
    for (hnum = 1; hnum <= totmoves; hnum++) {
     
        if (cmdArr[hnum]) {

            var cmd1 = cmdArr[hnum].cmd;
            var cmdparams = cmdArr[hnum].cmdparams;
          
            if (cmd1 == '5001')
                cmd1 = 'T';
            else if (cmd1 == '5020')
                cmd1 = 'C';
            else if (cmd1 == '5040')
                cmd1 = 'W';
            if (cmdparams.length > 1) {
                timst = cmdparams[1];
                
            }
            str += hnum + ':' + cmd1 + ',' + timst; //+ ',' +
            if (cmdparams.length > 2) {
                text = cmdparams[2];
                if (text && text != '') {
                    str += ','+text;
                }
            }
            str += ';';
        }
    }
    return str;
}

setCommand = function (hn, cmd, params) {
    var hnum = parseInt(hn);
    var tim = 0;
    var timst;

    var mn = Math.floor((hnum-1) / 2);
    var sheer = (hnum-1) - mn * 2;
    var mnum = 1 + mn;     
    var col = sheer ? 'b' : 'w';

    $('#rechmnum').val(hnum);
    $('#recmnum').html(mnum);
    $('#recwb').html(col);
    var text = '';
    tim = 0;
    var befaf;
    if (cmdArr[hnum]) {
      
        var cmd1 = cmdArr[hnum].cmd;
        var cmdparams = cmdArr[hnum].cmdparams;
        if (cmdparams.length > 2) {
            text = cmdparams[2];
            if (text && text != '') {
                var textArr = text.split('|');
            }
        }
        if (cmd1 == '5001')
            cmd1 = 'T';
        else if (cmd1 == '5020')
            cmd1 = 'C';
        else if (cmd1 == '5040')
            cmd1 = 'W';
        if (cmdparams.length > 1) {
            timst = cmdparams[1];
            tim = parseInt(timst)/1000;
        }
        //cmdArr[hnum].cmd = parseInt(cmd1);
        befaf = 'B';
     
        $('#rec_type').val(cmd1);
      
        
        $('#rectext').val(text);
    }
    else {
        befaf = 'X';
        $('#rec_type').val('X');
        $('#rectext').val('');
        tim = 0;
    }
    befaf = 'B'; // any case
    $('#rec_befaft').val(befaf);
    $('#rec_waitsec').val(tim);
}

setSizesMain = function (moveswidthX) {

    var moveswidth = parseInt(moveswidthX);
    //setTimeout(function () {
    var fsh2 = 16; var fsh3 = 15; var fsres = 16; var halign = 'center'; var hmore = '';
    var fsmov = 16; var fssign20 = 15; var fssign15 = 15; var fscomm30 = 15; var fscomm = 15;// reg for move
    if (moveswidth > 350) { }
    if (moveswidth >= 300 && moveswidth <= 350) { }
    else if (moveswidth >= 250) { fsh2 = 15; fsh3 = 14; }
    else if (moveswidth >= 200) { fsmov = 15; fscomm30 = 14; fscomm = 14; fssign20 = 14; fssign15 = 14; fsh2 = 14; fsres = 14; fsh3 = 13; halign = 'left !important'; hmore = '; word-break: break-all;margin-left:10px !important;'; }
    else if (moveswidth >= 180) { fsmov = 14; fscomm30 = 13; fscomm = 13; fssign20 = 13; fssign15 = 13; fsh2 = 14; fsres = 14; fsh3 = 13; halign = 'left !important'; hmore = '; word-break: break-all;margin-left:6px !important;'; }
    else if (moveswidth >= 160) { fsmov = 13; fscomm30 = 13; fscomm = 13; fssign20 = 13; fssign15 = 13; fsh2 = 13; fsres = 13; fsh3 = 12; halign = 'left !important'; hmore = '; word-break: break-all;margin-left:0px !important;'; }

    var w = moveswidth + 375;
    $('#board_and_moves').attr('style', 'max-width:' + w + 'px !important;width:' + w + 'px !important;height:100%;height:374px;max-height:374px; margin:0px;margin-top:5px;'); //.css("width", w + "px !important;");
    //$('#board_and_moves').attr('style', 'max-width:' + w + 'px !important'); //..css("max-width", w + "px !important;");
    // 373 is for 375
    //var w1 = rightWidth + 23;            
    //$('#board_and_canvas').css("width", w1 + "px;")
    //$('#board_and_canvas').css("max-width", w1 + "px;");
    var w1 = moveswidth;
    $('#game_html').attr('style', 'width:' + w1 + 'px !important; height:460px !important;max-width:' + w1 + 'px !important;margin:0px;padding:0px;'); //..css("width", w1 + "px !important;");
    $('#game_html').height($('#board_html').height());
    //$('#game_html').attr('style', 'max-width:' + w1 + 'px !important'); //..css("max-width", w1 + "px !important;");

    $('#game_html h2').attr('style', 'font-size:' + fsh2 + 'px !important; text-align:' + halign + hmore);
    $('#game_html h3').attr('style', 'font-size:' + fsh3 + 'px !important; text-align:' + halign + hmore);
    $('#game_html .result').attr('style', 'font-size:' + fsres + 'px !important');
    if (moveswidth <= 160) $('#game_html .result').attr('style', 'display:none');
    
    $('#game_html .move').attr('style', 'font-size:' + fsmov + 'px !important');
    $('#game_html .sign20').attr('style', 'font-size:' + fssign20 + 'px !important');
    $('#game_html .sign15').attr('style', 'font-size:' + fssign15 + 'px !important');
    $('#game_html .comment30').attr('style', 'font-size:' + fscomm30 + 'px !important;margin-left:0px !important;margin-right:0px !important;');
    $('#game_html .comment').attr('style', 'font-size:' + fscomm + 'px !important;margin-left:0px !important;margin-right:0px !important;');
    $('#game_html .variant').attr('style', 'margin-left:12px !important;margin-right:0px !important;');


    // game_moves_html-> game_moves_html_wrap ??
    $('#game_moves_html::-webkit-scrollbar').attr('style', 'width: 0px !important; display: none !important;');
    // height must be less then 320 usual, because timerhdr1 is higher
    $('#game_moves_html_wrap').attr('style', 'height:280px !important;max-height:280px !important;overflow-y: hidden;scrollbar-width: none !important;-ms-overflow-style: none;overflow: -moz-scrollbars-none;');
    
    $('#timerhdr1').attr('style', 'height: 77px; max-height: 77px;overflow: hidden;');
    toptoMoveDiff = 105; // changed !


    
    //var w2 = moveswidth-30;
    //$('#game_moves_html').attr('style', 'width:' + w2 + 'px !important'); //..css("width", w2 + "px !important;");
    //$('#game_moves_html').attr('style', 'max-width:' + w2 + 'px !important'); //..css("max-width", w2 + "px !important;");
   // }, 100);
}
    
setMovesSizeByWidth = function (rightWidth) {
    var left1=50;
    if (rightWidth <= 180) {
        smboardsize = 124;
        left1 = 0;
    }
    else if (rightWidth <= 230) {
        smboardsize = 140;
        left1 = 10;
    }
    else {
        smboardsize = 164;
    }

    var css1 = 'width:' + smboardsize + 'px;height:' + smboardsize + 'px;margin-left:' + left1 + 'px;';
    if (p_lang == 'h') css1 = 'width:' + smboardsize + 'px;height:' + smboardsize + 'px;margin-right:' + left1 + 'px;';
    $('.smboard').attr('style', css1);

    for (var i = 0; i < smallBoards.length; i++) {
        smallBoards[i].resize();
        //$('.smboard').each(function (i) {
        //    var x = this;
        //    var y = this.lastChild;
        //    var y1 = y[0];
        //    y.resize();
        //});
    }
 
}

// for recorder typ 1
setMovesNoCanvas = function (typ, rightWidth) {
    var canvas = document.getElementById('rec_canvas');
    if (canvas && (typ == 1)) {
        $('#game_html').show();
        $('#rec_canvas').hide();
        $('#rec_canvas_wrap').hide();
    }
}
// for recorder typ 20
setCanvasNoMoves = function (typ, sq,cmdparams) {
    var col = sqcolors[sq];
    setCanvas(typ, col.whited, col.blackd, rightWidth, 0, cmdparams);

}
setRightWidth = function (typ,  cmdparams) {
    
    if (cmdparams) {
        if (cmdparams.length > 2) {
            var text = cmdparams[2];
            rightWidth = parseInt(text);
            setSizesMain(rightWidth);
            if (rightWidth < 100) {
                $('#rec_canvas').hide();
                $('#rec_canvas_wrap').hide();
            }
            else {
                //$('#rec_canvas').show();
                //$('#rec_canvas_wrap').show();
            }
            
        }
    }
    

}
// for recorder typ 10 , not in use yet
setCanvasOnPart = function (typ, sq) {
    var col = sqcolors[sq];
    setCanvas(typ, col.whited, col.blackd, rightWidth, 300, null);

}
// for recorder
setCanvas = function (typ, whitecol, blackcol, rightWidth, heightPartSize, cmdparams) {
    var canvas = document.getElementById('rec_canvas');  //document.querySelector('board_canvas'); // 
    var canvas_wrap = document.getElementById('rec_canvas_wrap');
    var rightcanvheight = 0;
    var ctx1;
    if (canvas && (typ == 22 || typ == 20 || typ == 10)) { // top,bottom+right  or just right
        if (typ == 22)
            rightcanvheight = 433;
        else // 20
            rightcanvheight = 372;
        var marginTop = 0;
        if (typ == 10) { // show game also on up
            marginTop = rightcanvheight - heightPartSize;
            rightcanvheight = heightPartSize;
            $('#game_html').show();
            $('#board_and_canvas').css("zindex", "1000;")
            $('#board_and_canvas').css("margin-top", marginTop+"px;")
        }
        else {
            $('#game_html').hide();
            $('#board_and_canvas').css("margin-top", 0 + "px;")
        }
        $('#rec_canvas').show();
        $('#rec_canvas_wrap').show();
        $('#board_and_canvas').css("max-width", '373' + "px !important;")
        $('#board_and_canvas').css("height", rightcanvheight + "px;")


        ctx1 = canvas.getContext('2d');
    
        canvas.style = 'width:' + rightWidth + 'px;height:' + rightcanvheight + 'px;margin:0px;padding:0px; border: 1px solid black;background-color:' + "#" + whitecol + ';';
        canvas.width = rightWidth;
        canvas.height = rightcanvheight;
        //canvas.style.width = rightWidth+'px';
        //canvas.style.height = rightcanvheight + 'px';

        
        canvas_wrap.width = rightWidth;
        canvas_wrap.height = rightcanvheight;
        canvas_wrap.style.width = rightWidth + 'px';
        canvas_wrap.style.height = rightcanvheight + 'px';

        ctx1.fillStyle = "#" + whitecol;
        ctx1.fillRect(0, 0,rightWidth,rightcanvheight); // canvas.width, canvas.height);
       
      
   
    }
    if ((typ == 22 || typ == 21)) {
        $('#rec_canvas_up').show(); $('#rec_canvas_up_wrap').show();
        $('#rec_canvas_down').show(); $('#rec_canvas_down_wrap').show();
        var canvas = document.getElementById('rec_canvas_up');
        if (canvas) {
            var ctx = canvas.getContext('2d');
            canvas.style = 'width:372px;height:30px; border: 1px solid black;background-color:' + "#" + whitecol + ';';
            ctx.fillStyle = "#" + whitecol;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        var canvas = document.getElementById('rec_canvas_down');
        if (canvas) {
            var ctx = canvas.getContext('2d');
            canvas.style = 'width:372px;height:30px; border: 1px solid black;background-color:' + "#" + whitecol + ';';
            ctx.fillStyle = "#" + whitecol;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    var textLeft = 70; var imgLeft = 40; var chesspmLeft = 95; var chesspmonlyLeft = 80; var fs = 20;
    var pmfs = 15; var pmtop = 350; var pmimtop = 320;
    if (rightWidth > 350) { }
    if (rightWidth >= 300 && rightWidth <= 350) { }
    else if (rightWidth >= 250) { textLeft = 50; imgLeft = 25; chesspmLeft = 80; var chesspmonlyLeft = 65; fs = 19; }
    else if (rightWidth >= 200) { textLeft = 30; imgLeft = 10; chesspmLeft = 60; var chesspmonlyLeft = 45; fs = 18; }
    else if (rightWidth >= 180) { textLeft = 21; imgLeft = 7; chesspmLeft = 55; var chesspmonlyLeft = 40; fs = 17; pmfs = 14;}
    else if (rightWidth >= 160) { textLeft = 16; imgLeft = 2; chesspmLeft = 45; var chesspmonlyLeft = 35; fs = 16; pmfs = 14;}
    // write text
    if (cmdparams && canvas) {
        if (cmdparams.length > 2) {
            var text = cmdparams[2];
            if(text && text!='') {
                var textArr = text.split('|');
                var top1 = 80;
                for (i = 0; i < textArr.length; i++) {
                   // setTimeout(function () {
                        ctx1.fillStyle = "#" + blackcol;
                        ctx1.font = ' bold ' + fs + 'px Verdana';
                        var txt = textArr[i].toUpperCase();
                        if (txt.indexOf('STOP') >= 0) {
                           // ctx1.fillText(txt, textLeft, top1);
                            var img = document.getElementById("stop");
                            ctx1.drawImage(img, textLeft+25, top1-45,50,50);
                        }
                        else 
                           ctx1.fillText(txt, textLeft, top1); // strokeText

                       
                        //ctx.fillStyle = "red";
                        //ctx.textAlign = "center";
                        //ctx.fillText("Hello World", canvas.width / 2, canvas.height / 2);
                    //ctx.rotate(Math.PI * 2 / (i * 6));
                    // canvas.fillStyle = "#ff0000";  //<======= here 

                   // }, 100);
                    top1 += 50;
                }
            }
        }
    }
    var withim = true;
    if (canvas) {
        ctx1.fillStyle = "#" + blackcol;
        ctx1.font = 'bold '+pmfs+'px Verdana ';
        if (withim) {
            ctx1.fillText('ChessPM.com', chesspmLeft, pmtop);
            var img = document.getElementById("mylogo1");
            ctx1.drawImage(img, imgLeft, pmimtop);
        }
        else
            ctx1.fillText('ChessPM.com', chesspmonlyLeft, pmtop);
    }
}

setCookie = function (key, value, days) {
    var expires = new Date();
    if (days) {
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    } else {
        document.cookie = key + '=' + value + ';expires=Fri, 30 Dec 9999 23:59:59 GMT;path=/';
    }
}

function clearAllTimeouts() {

    if (timeouts)
        for (var i = 0; i < timeouts.length; i++) {
            window.clearTimeout(timeouts[i]); // clear all the timeouts
        }
    timeouts = [];//empty the id array
}

function center(elm) {

    var board_offset = $('#board').offset();
    var offset = elm.offset();
    var width = elm.width();
    var height = elm.height();

    if (offset) {
        var center = { 'x': offset.left - board_offset.left + width / 2, 'y': offset.top - board_offset.top + height / 2 };

        return center;
    }
    else return null;
}



getBaseLink = function (getHm, setTop) {
 
    var ggn = parseInt(p_gamenum) + parseInt(p_gn); // bad
    if (lastGame != null)
        if (lastGame.GameId > 0) ggn = lastGame.GameId;
    var src = '';
    if (p_dbsrc && p_dbsrc != null) src = '&src=' + p_dbsrc;
    var hm = '';
    if (p_hmnum && p_hmnum != null && getHm) hm = '&hm=' + p_hmnum;
    var lat = '';
    if (p_lat && p_lat != null) lat = '&lat=' + p_lat;
    var mob = '';
    var top = '';
    if (p_top && p_top != null && p_top > 0) top = '&top=' + p_top;

    if (gameList && gameList.length > 1) {
        // show gn list
        var st = '';
        var x = 0;
        for (g = 0; g < gameList.length; g++) {
            game = gameList[g];
            st += game.GameId + ',';
            x++;
            if (x > 10) { x = 0; st += '<br/>'; }
        }
        st += '<br/>' + 'Current ' + ggn;
        return st;
    }

    //if (setMob && setMob > 0) mob = '&act=mob1';
    var lnk = 'http://www.chesspm.com/ChessChat/PgnViewer.htm?lt=12&gn=' + ggn + src + hm + lat + mob + top;
    return lnk;
}

function doUserRegister() {
    //showChessPMRegisterDialog1();
    var lang = 'en'; if (GL.lang == 'h') lang = 'he';
    var newpage = 'http://www.chesspm.com/UserDefault.aspx?lang=' + lang + '&act=mob1&ScreenXml=ChessNewUser';
    window.open(newpage);
}
showChessPMRegisterDialog1 = function (act) { 

   // $('#myModalChessPMNewUser').modal('show');
   // $('#myModalChessPMNewUser').appendTo("body");
}
//registerChessPMUser = function (act) {
//    var user = $('#inputUserId8').val();

//    var psw = $('#inputPsw8').val();
//    var disp = $('#dispName8').val();
//    if (disp) disp = disp.replace(/\'/gi, "");
//    var email = $('#email8').val();
//    if (email) email = email.replace(/\'/gi, "");
//    var country = $('#country8').val();
//    var nickName = $('#nickName8').val();
//    var Elo = $('#Elo8').val();

 
//}


function doUserForgot() {
    var lang = 'en'; if (GL.lang == 'h') lang = 'he';
    var newpage = 'http://www.chesspm.com/UserDefault.aspx?lang=' + lang + '&act=mob1&ScreenXml=ForgotPassword';
    window.open(newpage);
}

getMovesList = function () {
    var allStr = '';
    $('#game_moves_html .move').not(".variant .move").each(function (index) {
        var a = ''; if ($(this).attr('a')) a += $(this).attr('a');// =Q etc.
        allStr += $(this).attr('from') + $(this).attr('to') + a + ' ';
    });
    return allStr;
}

getMoveFromMovObject = function (mv, col) {
    var fr1 = algebraic(mv.StartPos);// board.squareNumNor(fromSquare);
    var to1 = algebraic(mv.EndPos);
    var pc = pieceCode(mv.OriginalPiece);
    if (pc == '') pc = 'P';
    var piece = col + pc;

    var move1 = piece + '-' + fr1 + '-' + to1;
    var eaten = 0;
    var MType = mv.MType;
    if (MType >= 16) {
        eaten = 1; MType -= 16;
        move1 += 'x';
    }
    if (MType > 0) {
        switch (MType) {
            case 1:
                move1 += '=Q';
                break;
            case 4:
                move1 += '=R';
                break;
            case 5:
                move1 += '=B';
                break;
            case 6:
                move1 += '=N';
                break;
            case 3:   //       EnPassant = 3,
                move1 += 'xx'; // 2 or 3
                break;
            case 2: // castle
                // King missing in move
                move1 = col + 'K' + '-' + algebraic(mv.StartPos) + '-' + algebraic(mv.EndPos);
                break;
                //case 16: //  PieceEaten = 16,
            default:
                break;
        }
    }
    return move1;
}

getResizedCanvas = function (canvas) {
    //var width = right - left;
    //var height = bottom - top;

    var canvas1 = document.createElement('canvas');
    //canvas1.width = width;
    //canvas1.height = height;
    var ctx1 = canvas1.getContext('2d');

    // clip just the non-transparent pixels and draw them to the in-memory canvas
    ctx1.drawImage(canvas, left, top, width, height, 0, 0, width, height);

}

function getSocialDiv(URL_FULL, TITLE, SITE_NAME, HASTAG) {
    return '<div id="socialSharing"><a href="http://www.facebook.com/sharer.php?u='
              + URL_FULL + '"><span id="facebook" class="fa-stack fa-lg"><i class="fa fa-facebook fa-stack-1x"></i></span></a>' +
           '<a href="http://twitter.com/share?text='
              + TITLE + '&url=' + URL_FULL + '&hashtags=' + HASTAG + '"><span id="twitter" class="fa-stack fa-lg"><i class="fa fa-twitter fa-stack-1x"></i></span></a>' +
           '<a href="http://pinterest.com/pin/create/button/?url='
              + URL_FULL + '&description=' + TITLE + '" class="pin-it-button" count-layout="horizontal"><span id="pinterest" class="fa-stack fa-lg"><i class="fa fa-pinterest-p fa-stack-1x"></i></span></a>' +
           '<a href="https://plus.google.com/share?url='
              + URL_FULL + '"><span id="googleplus" class="fa-stack fa-lg"><i class="fa fa-google-plus fa-stack-1x"></i></span></a>' +
           '<a href="https://www.linkedin.com/shareArticle?mini=true&url='
              + URL_FULL + '&title=' + TITLE + '&source=' + SITE_NAME + '"><span id="linkedin" class="fa-stack fa-lg"><i class="fa fa-linkedin fa-stack-1x"></i></span></a>' +
           '<a href="whatsapp://send?&text='
              + TITLE + URL_FULL + '" data-action="share/whatsapp/share"><span id="whatsapp" class="fa-stack fa-lg"><i class="fa fa-whatsapp fa-stack-1x"></i></span></a></div>';
}

lockScreen = function () {
    //if (lockScreenNew) {
    //if (board2) 
    //    board2.setScrollLocked(true);
    if (inFrame) {

    }
    if (board55)
        board55.setScrollLocked(true);
    var dd = document.getElementById('body'); if(dd)dd.className = 'lock-screen';
    locked = true;
    //$('#lockunlock').html('Unlock'); $('#lockunlock').attr('title', "Unlock Screen");
    //$('#ChessPM').hide();

    //}
    try {
        if (window.parent != null && window.parent.document != null) {
            var parentBody = window.parent.document.body;
            if (parentBody != null) parentBody.className = 'lock-screen';
        }
    } catch (e) { }
}
unlockScreen = function () {
    //if (lockScreenNew) {
    //board2.setScrollLocked(true);
    var dd = document.getElementById('body'); if (dd) dd.className = '';
    locked = false;
    //$('#lockunlock').html('Lock'); $('#lockunlock').attr('title', "Lock Screen");
    //$('#ChessPM').show();
    //}
    try {
        if (window.parent != null && window.parent.document != null) {
            var parentBody = window.parent.document.body;
            if (parentBody != null) parentBody.className = '';
        }
    } catch (e) { }
}


// functions for create qstring -> = decode
getParamFromHdr = function (hdr) {
    //var hdr = $('#Header').val(); // + ' : ' + aut;
    if (hdr && hdr != null)
        hdr = hdr.replace(/\./g, "!").replace(/ /g, "_").replace(/\//g, ".").replace(/&/g, "").replace(/\\/g, "").replace(/=/g, " ").replace(/#/g, "_");
    else hdr = '';
    return hdr;
}
getParamFromAuthor = function (hdr) {
    //var hdr = $('#Header').val(); // + ' : ' + aut;
    if (hdr && hdr != null)
        hdr = hdr.replace(/\./g, "!").replace(/\,/g, " ").replace(/ /g, "_").replace(/\//g, ".").replace(/&/g, "").replace(/\\/g, "").replace(/=/g, " ").replace(/#/g, "_");
    else hdr = '';
    return hdr;
}
getParamFromEventPrize = function (hdr) {
    //var hdr = $('#Header').val(); // + ' : ' + aut;
    if (hdr && hdr != null)
        hdr = hdr.replace(/\./g, "!").replace(/\,/g, " ").replace(/ /g, "_").replace(/\//g, ".").replace(/&/g, "").replace(/\\/g, "").replace(/=/g, " ").replace(/#/g, "_");
    else hdr = '';
    return hdr;
}

replaceAll = function (str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
escapeRegExp=function (string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
insertSmallDiagramDiv = function (fatherdiv,notsm) {
    // insert in dom 
    var boradst = 'board_s';
    if (!notsm && notsm == 1)
        boradst = 'board';
    LastSmallBoard++;
    var css1 = 'width:'+smboardsize+'px;height:'+smboardsize+'px;margin-left:50px;';
    if (p_lang == 'h') css1 = 'width:'+smboardsize+'px;height:'+smboardsize+'px;margin-right:50px;';
    ddiv = $('<div />').attr('id', boradst + LastSmallBoard).attr('style', css1).attr('class', 'smboard');
    fatherdiv.append(ddiv);
    if (lastBoardFen == '')
        lastBoardFen = start_Board_Fen;
    if (!p_ds || p_ds == '') p_ds = '2';
    var board1 = ChessBoard(boradst + LastSmallBoard, {

        showNotation: false,
        pieceTheme: 'Images/chesspieces/wikipedia'+p_ds+'/{piece}.png',
        square: g_sq,
        position: lastBoardFen  //chess.fen()

    });
    smallBoards.push(board1);
}

inSolve = function (msg) {
    $('#solvedivspan').html(msg);
}

inframe = function () {
    try {
        var r = window.self != window.top;
        if (r) {
            var ll = window.top.location;
            var ll1 = '';
            if (ll && ll.href) ll1 = ll.href.toLowerCase();
            if (ll1.indexOf('chesschat') < 0 && ll1.indexOf('localh') < 0) // gen
                r = 2;
        }        
        return r;
    }
    catch (e) {
        return 1;
    }
}



inFrame = inframe();
//if (inFrame) frameTop = window.parent.document.getElementById("framewrap").offsetTop;

//alert(inFrame);

adjustFrameHeight=function() {
    try {
        if(inFrame) {
            if (window.parent != null && window.parent.document != null) {
                if (document.getElementById("page-container")) {
                    var h = document.getElementById("page-container").scrollHeight;
                    // alert(h);
                    parent.AdjustIframeHeight(h);
                }
            }
        }
    } catch(e) {}
}

adjustBoard = function () {
    if (board)
        board.resize();
}
function doUserLogin() {
    $('#myModalLogin').modal('show');
}

function doModalLogin() {
    //unlockScreen();
    var us = $('#modaluser').val();
    var psw = $('#modalpsw').val();
    //$("#loading").show();
    //chatHub.server.connectWithDB(us, psw, 1);
    tryLogin(us, psw);
    $('#myModalLogin').modal('hide');
}

function doLogoff() {
   
    p_psw = '';
    p_auth = 0;
    setCookie('psw', p_psw, 7);
    setCookie('auth', p_auth, 7);
    setMenuByPsw();
}
showPlayButton = function () {
    $('#btn_replay').show(); $('#btn_replay_here').hide();
    $('#btn_replay_stop').hide();
}
showPlayHereButton = function () {
    $('#btn_replay').hide(); $('#btn_replay_here').show();
    $('#btn_replay_stop').hide();
}
setMenuByPsw = function() {
    if (!p_psw || p_psw == '') {
        $('#btn_save_board_server').hide();
        $('#btn_save_board_serverG').hide();
        $('#btn_new_position_game').hide();
        $('#btn_update_game').hide();
        $('#btn_save_game').hide();
        $('#btn_save_list').hide();
        $('#btn_new_puzzle').hide();
        $('#tologin').show();
        $('#tologoff').hide();
        $('#btn_get_pos_link').hide();
        $('#btn_save_list').hide();
        $('#btn_create_pgn1').hide();
        $('#engdiv').hide();
        // btn_save_game ?
        
    }
    else {
        $('#btn_save_board_server').show();
        $('#btn_save_board_serverG').show();
        $('#btn_new_position_game').show();
        $('#btn_update_game').show();
        $('#btn_save_game').show();
        $('#btn_save_list').show();
        $('#btn_new_puzzle').show();

        $('#tologin').hide();
        $('#tologoff').show();
        $('#btn_get_pos_link').show();
        $('#btn_save_list').show();
        $('#btn_create_pgn1').show();

        $('#engdiv').show();
    }
}