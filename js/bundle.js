/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const BingoGame = __webpack_require__(1);
	const BingoView = __webpack_require__(3);
	const questions = __webpack_require__(4);
	const answers = __webpack_require__(6);

	$(() => {
	  const rootEl = $('.bingo');
	  const game = new BingoGame(questions, answers);
	  new BingoView(rootEl, game);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class BingoGame {
	  constructor(questions, answers) {
	    this.questions = this.shuffledQuestions(questions);
	    this.answers = answers;

	    this.board = this.newBoard();
	  }

	  // newBoard() {
	  //   return({
	  //     1: "tokenless",
	  //     2: "tokenless",
	  //     3: "tokenless",
	  //     4: "tokenless"
	  //   });
	  // }

	  newBoard() {
	    let board = [];
	    for (let i=0; i<4; i++) {
	      board.push("tokenless")
	    }
	    return board;
	  }

	  shuffledQuestions(questions) {
	    let result = [];
	    for (var questionNum in questions) {
	      if (questions.hasOwnProperty(questionNum)) {
	        result.push({key: questionNum, question: questions[questionNum]});
	      }
	    }
	    return result;
	  }

	  isWon() {
	    let won = false;
	    let segment;

	    for (let i=0; i<2; i+=2) {
	      segment = this.board.slice(i, i+2);

	      won = segment.every((el) => (
	        el==="token"
	      ));

	      if (won) return true;
	    }

	    for (let j=0; j<2; j++) {
	      for (let m=0; m<4; m++) {
	        segment = [];
	        if (m%2+j===0) {
	          segment.push(this.board[m]);
	        }
	      }

	      won = segment.every((el) => (
	        el==="token"
	      ));

	      if (won) return true;
	    }

	    return false;
	  }
	}

	module.exports = BingoGame;


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	class BingoView {
	  constructor($el, game) {
	    this.$el = $el;
	    this.game = game;

	    this.$el.on(
	      "click",
	      "li",
	      this.clickTile.bind(this)
	    );

	    this.setupBoard();
	    // this.render();
	  }

	  clickTile(e) {
	    const clickedTileIdx = $(e.currentTarget).index();

	    console.log(`You clicked tile ${clickedTileIdx}!`);
	  }

	  setupBoard() {
	    this.$el.empty();

	    let $board = $("<ul>");
	    let $tile;

	    for (let tileIdx = 0; tileIdx < 4; tileIdx++) {
	      $tile = $("<li>");
	      $board.append($tile);
	    }

	    this.$el.append($board);
	  }

	  render() {
	    
	  }
	}

	module.exports = BingoView;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const questions = {
	  1 : "Do you have any tiles that equal 3 - 2?",
	  2 : "Do you have any tiles that equal 1 + 1?",
	  3 : "Do you have any tiles that equal 6 - 3?",
	  4 : "Do you have any tiles that equal 1 + 3?",
	};

	module.exports = questions;


	// const questions = {
	//   1 : "Do you have any tiles that equal 3 - 2?",
	//   2 : 2,
	//   3 : 3,
	//   4 : 4,
	//   5 : 5,
	//   6 : 6,
	//   7 : 7,
	//   8 : 8,
	//   9 : 9,
	//   10 : 10,
	//   11 : 11,
	//   12 : 12,
	//   13 : 13,
	//   14 : 14,
	//   15 : 15,
	//   16 : 16,
	//   17 : 17,
	//   18 : 18,
	//   19 : 19,
	//   20 : 20,
	//   21 : 21,
	//   22 : 22,
	//   23 : 23,
	//   24 : 24,
	//   25 : 25
	// }


/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	const answers = {
	  1 : 1,
	  2 : 2,
	  3 : 3,
	  4 : 4,
	};

	module.exports = answers;


	// const answers = {
	//   1 : 1,
	//   2 : 2,
	//   3 : 3,
	//   4 : 4,
	//   5 : 5,
	//   6 : 6,
	//   7 : 7,
	//   8 : 8,
	//   9 : 9,
	//   10 : 10,
	//   11 : 11,
	//   12 : 12,
	//   13 : 13,
	//   14 : 14,
	//   15 : 15,
	//   16 : 16,
	//   17 : 17,
	//   18 : 18,
	//   19 : 19,
	//   20 : 20,
	//   21 : 21,
	//   22 : 22,
	//   23 : 23,
	//   24 : 24,
	//   25 : 25
	// };


/***/ }
/******/ ]);