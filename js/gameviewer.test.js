//http://localhost:34994/GameViewer.htm?test=1&fen=rnbqkbnr/pp1ppppp/8/8/2pPP3/5N2/PPP2PPP/RNBQKB1R_b_KQkq_d3_0_3&flip=1
// rnbqkbnr/pp2pppp/3p4/8/4P3/3B1N2/PPP2PPP/RNBQK2R_w_KQkq_-_0_5
// r3kbnr/pp1qpppp/2np4/8/4P1b1/2NBBN2/PPP1QPPP/R4RK1_b_kq_-_0_8
// r2qkb1r/pP2pppp/5n2/2p5/6b1/5N2/PPPP1PPP/RNBQKB1R_w_KQkq_-_0_6
//document.addEventListener("DOMContentLoaded", initFenPresets);
var fenPresets = {
  startpos: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR_w_KQkq_-_0_1",
  testenp: "rnbqkbnr/pp1ppppp/8/8/2pPP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3",
  test1: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R_w_KQkq_-_2_3",
  testWShortCastle: "rnbqkbnr/pp2pppp/3p4/8/4P3/3B1N2/PPP2PPP/RNBQK2R_w_KQkq_-_0_5",
  testBLongCastle: "r3kbnr/pp1qpppp/2np4/8/4P1b1/2NBBN2/PPP1QPPP/R4RK1_b_kq_-_0_8",
  testprom:"r2qkb1r/pP2pppp/5n2/2p5/6b1/5N2/PPPP1PPP/RNBQKB1R_w_KQkq_-_0_6",
  testBeforeEnpas:"2r3k1/1p2pp1p/r2p2p1/2nP4/p1P5/2R2P2/PP2BKPP/3R4 w - - 0 21",
};

function runChessTest() {
  var fen1 = document.getElementById("fen1").value.trim();
  fen1 = fen1.replace(/_/g, " ");
  var fen2 = document.getElementById("fen2").value.trim();
  fen2 = fen2.replace(/_/g, " ");
  var uci1 = document.getElementById("uci1").value.trim();
  var sq = document.getElementById("uci1").value.trim(); // now same
  var uci2 = document.getElementById("uci2").value.trim();
  var whiteToMove = document.getElementById("whiteToMove").checked;
  var wb = document.getElementById("whiteToMove").checked ? 'w' : 'b';
  var delay = parseInt(document.getElementById("delayMs").value || "0", 10);
  var cmd = document.getElementById("commandType").value;

  switch (cmd) {

    case "setfen":
      // EXISTING FUNCTION
      replaceViewFen(fen1); //, whiteToMove);
      break;
    case "setfen2":
      // EXISTING FUNCTION
      replaceFen(fen1); //, whiteToMove);
      break;
    case "setcolot":
      setPlayColor(wb);
      break;
    case "flip":
      doFlip();
      break;
    case "flipb":
      doFlip('b');
      break;
    case "set2fen_highlight":
      // EXISTING FUNCTION
      replaceViewLastMove(fen1, fen2, sq, true, 1);
      break;
    case "setfen_side_highlight":
      // EXISTING FUNCTION
      replaceViewLastFen(fen1, sq, 1, 'test');
      break;
    case "show2moves":
      // EXISTING FUNCTION
      doUciMoveAndAnswers(uci1, uci2);
      break;

    case "show1move":
      // EXISTING FUNCTION
      doUciMove(uci1, delay);
      break;
    case "show1movespecial":
      // EXISTING FUNCTION
      doUciMoveSpecial(uci1, delay);
      break;
    case "highlight":
      // EXISTING FUNCTION
      highlightSquare(uci1);
      break;

    default:
      alert("Unknown command");
  }
}

function applyFenPreset() {
  var sel = document.getElementById("fenPreset");
  var fenBox = document.getElementById("fen1");

  if (!sel || !fenBox)
    return;

  var val = sel.value;

  if (!val)
    return;

  // allow symbolic presets
  if (val === "startpos") {
    fenBox.value = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  } else {
    fenBox.value = val;
  }
}

function initFenPresets() {
  console.log("initFenPresets fired");

  var sel = document.getElementById("fenPreset");
  var fenBox = document.getElementById("fen1");

  if (!sel || !fenBox) {
    console.warn("fenPreset or fen1 not found");
    return;
  }

  // 1️⃣ Clear existing options except first
  sel.innerHTML = '<option value="">-- select --</option>';

  // 2️⃣ Add options dynamically from fenPresets
  for (var key in fenPresets) {
    if (!fenPresets.hasOwnProperty(key)) continue;
    var opt = document.createElement("option");
    opt.value = key;
    opt.textContent = key;  // can also use a nicer label if you want
    sel.appendChild(opt);
  }

  // 3️⃣ Add event listener
  sel.addEventListener("change", function () {
    var key = sel.value;
    if (!key) return;

    fenBox.value = fenPresets[key] || "";
  });
}



//initFenPresets();





