//ffmpeg.bat
/*rem -- https://peterbeshai.com/blog/2018-10-28-p5js-ccapture/
rem copy this line and run from command line,  because % is dos-bat command
ffmpeg -r 4 -f image2 -s 540x540 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
rem ffmpeg -r 1/5 -i %07d.png -c:v libx264 -vf fps=25 -pix_fmt yuv420p out.mp4
*/
//ffmpeg -r 4 -f image2 -s 540x540 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

var capturer = {};
var captureOn = false;
var imgid = 0;
capturer = null;
var ctimeouts = [];
var capturetype = 0;
var commandBuilder = 0;
//var rightWidth = 200; // 300;
// the frame rate (frames per second)
//var fps = 30;
//var fmt = 'png';

//capturer = new CCapture({
//    verbose: true,
//    framerate: fps,
//   // motionBlurFrames: 16,
//    quality: 90,
//    format: fmt, // document.querySelector('input[name="encoder"]:checked').value,
//    workersPath: 'js/',
//    //onProgress: function (p) { progress.style.width = (p * 100) + '%' }
//});

setSizes = function (rightWidth) {
    var rightWidthI = parseInt(rightWidth);
    var f = window.frames[0];
    f.setSizesMain(rightWidthI);
}

//capturer.start();
startCapture = function (tim,typ,cmd1,test) {
  
    imgid = 0;
    var f = window.frames[0]; //.myIFrame;
    if (!tim || tim==0)
        tim = 5000;
    cmdArr = parseCommand(cmd1);
    f.callReplay(tim, cmdArr);
    captureOn = true;
    var len = f.getTotalMoves();
    var interval = 5;
    if (tim >= 15000) // more time per move - make more snapshots !
        interval = 15;
    else if (tim >= 10000)
        interval = 10;
    else if (tim >= 7000)
        interval = 7;
    else if (tim <= 3000)
        interval = 3;
    if(!test)
        makeCaptures(tim, len, 5, typ, cmdArr);
}
var changeImagesColor = function (sq) {
    var f = window.frames[0];
    f.changeImagesColor(sq);
}

var setRecordScreen = function (tf, rightWidth1) {
    var f = window.frames[0];
    //rightWidth = rightWidth1;
    f.recordscreen = tf;
    f.rightWidth = parseInt(rightWidth1);
    setTimeout(function () {
        f.setMovesSizeByWidth(f.rightWidth);
    }, 200);
    
    //if (f.rightWidth <= 180)
    //    f.smboardsize = 120;
    //else if (f.rightWidth <= 230)
    //    f.smboardsize = 140;
}
var afterLoad = function () {
    var f = window.frames[0];
 
    setTimeout(function () {
        //var x = f.game;
        $('#commands').val(f.lastGame.Commands);
        g_sq = f.lastGame.bcol;
        if (!g_sq || g_sq == null)
            g_sq = p_sq;
        fillDialogColorsToComboForCanvas('imageBgr', g_sq);
    }, 2000);
}

var setCanvasCapt = function (typ, whitecol,blackcol) {
    var f = window.frames[0];
    f.setCanvas(typ, whitecol, blackcol, f.rightWidth);
    
}
var setMovesNoCanvasCapt = function (typ) {
    var f = window.frames[0];
    f.setMovesNoCanvas(typ, f.rightWidth);

}
captureBoard = function () {
    var iframe = $('#frame1');
    var el1;
    

    if (capturetype && capturetype == 10) {
        el1 = $('#frame1').contents().find('#board_and_moves');
    }
    else if (capturetype && capturetype == 5) {
        el1 = $('#frame1').contents().find('#board_html');  
    }
    else if (capturetype && capturetype == 11) {
        el1 = $('#frame1').contents().find('#game_html'); //game_moves_html');// 
    }
    else if (capturetype && capturetype == 1) { // board and canvas around
        el1 = $('#frame1').contents().find('#board_and_canvas');
    }
    else {
        el1 = $('#frame1').contents().find('#board21');  
    }
    if (el1[0])
        el1 = el1[0];
    //var el1 = $('#buttons');
    
    var str = '0000000';
    var id=''+imgid;
    var nam = str.substr(0, 7 - id.length) + id + '.png';   
    imgid++;// start from 0 
    //function (canvas) {
    //html2canvas(el1, {
    //    onrendered: function (canvas) {
    //        //capturer.capture(canvas);

    //        //var img = canvas.toDataURL("image/png")
    //        //window.open(img);


    //        var myImage = canvas.toDataURL("image/png");
            
    //        myImage = myImage.replace("image/png", "image/octet-stream");
    //        var link = document.createElement("a");
    //        link.download = nam;
    //        link.href = myImage;
    //        link.click();



            
    //    }
    //});
    html2canvas(el1).then(  
    
        function (canvas) {
            //capturer.capture(canvas);

            //var img = canvas.toDataURL("image/png")
            //window.open(img);


            var myImage = canvas.toDataURL("image/png");
            
            myImage = myImage.replace("image/png", "image/octet-stream");
            var link = document.createElement("a");
            link.download = nam;
            link.href = myImage;
            link.click();



            
        }
     
   )
   
}
stopCapture = function () {
    captureOn = false;
    if (ctimeouts)
        for (var i = 0; i < ctimeouts.length; i++) {
            window.clearTimeout(ctimeouts[i]); // clear all the timeouts
        }    
    ctimeouts = [];
    
    var f = window.frames[0]; 
    f.clearAllTimeouts(); 
    
}

var cmdArr = [];

buildCommands = function (cmd) {

    var f = window.frames[0];
    f.buildCommands1(cmd);
    commandBuilder = 1;
    $('#recorder_commands').show();
}

getCommandStr = function () {

    var f = window.frames[0];
    return f.getCommandString();
  
}

makeCaptures = function (waitmsec, len, intrval, typ, cmdArr) {
    //if (all typ)
   
    capturetype = typ;
    if (captureOn) {
       
      var waitmseccap = waitmsec/ intrval;
      
    
      var addMsec = 0;
      if (cmdArr) {
          for (var i = 0; i <= len; i++) {
              if (cmdArr[i] && cmdArr[i] != null) {
                 // timeouts.push(setTimeout(makeCommand, wtime, cmdArr[i]));
                  
                  if (cmdArr[i].cmd >= 5001 && cmdArr[i].cmd < 5050) {
                      wmsec = parseInt(cmdArr[i].cmdparams[1]);
                      addMsec += wmsec;
                  }
              }
          }
      }
      var slices = (len + 3) * intrval;
      var slicesAdd = addMsec/waitmsec * intrval;
      for (var i = 0; i < slices+slicesAdd ; i++) {

          ctimeouts.push(setTimeout(captureBoard, waitmseccap * i, ''));
           

        }
    }
}
function render() {
    requestAnimationFrame(render);
    // rendering stuff ...
    capturer.capture(canvas);
}