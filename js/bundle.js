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
	const BingoView = __webpack_require__(2);
	const questions = __webpack_require__(3);
	const answers = __webpack_require__(4);

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
	    this.shuffledAnswers = this.shuffledAs(answers);
	      // [{key: #, answer: "answer"}]
	        // .shuffledAnswers[tileIdx].answer
	    this.shuffledQuestions = this.shuffledQs(questions);
	    this.currentQuestionIndex = 0;
	    this.currentQuestion = () => (
	      this.shuffledQuestions[this.currentQuestionIndex]
	    );
	  }

	  modCurrentQuestion() {
	    this.currentQuestion().key = "token";
	  }

	  nextQuestionIndex() {
	    this.currentQuestionIndex += 1;
	    if (this.shuffledQuestions.length ===
	      this.currentQuestionIndex) {
	        this.currentQuestionIndex = 0;
	    }
	    // Error if all tiles are "token" -- this will never happen though in the real game.
	    if (this.currentQuestion().key === "token") {
	      this.nextQuestionIndex();
	    }
	  }

	  guess(index) {
	    if (this.currentQuestion().key === this.shuffledAnswers[index].key) {
	      this.shuffledAnswers[index].key = "token";
	      this.modCurrentQuestion();
	      this.nextQuestionIndex();
	      return true;
	    } else {
	      return false;
	    }
	  }

	  shuffledQs(questions) {
	    let result = [];
	    for (var questionNum in questions) {
	      if (questions.hasOwnProperty(questionNum)) {
	        result.push({
	          key: parseInt(questionNum),
	          question: questions[questionNum]
	        });
	      }
	    }
	    return result;
	  }

	  // Shuffle helper method (http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript)
	  shuffle(arr) {
	    var j, x, i;
	    for (var i = arr.length; i; i--) {
	      j = Math.floor(Math.random() * i);
	      x = arr[i - 1];
	      arr[i - 1] = arr[j];
	      arr[j] = x;
	    }
	  }

	  shuffledAs(answers) {
	    let result = [];

	    for (var i = 1; i <= 25; i++) {
	      result.push({key: i, answer: answers[i]});
	    }

	    this.shuffle(result);
	    return result;
	  }


	  isWon() {
	    let won, segment;

	    for (let i=0; i<=5; i+=5) {
	      segment = this.shuffledAnswers.slice(i, i+5);

	      won = segment.every((el) => (
	        el.key==="token"
	      ));
	      if (won) return true;
	    }

	    for (let j=0; j<5; j++) {
	      segment = [];
	      for (let m=0; m<25; m++) {
	        if (m%5===j) {
	          segment.push(this.shuffledAnswers[m]);
	        }
	      }

	      won = segment.every((el) => (
	        el.key==="token"
	      ));

	      if (won) return true;
	    }


	    segment = [
	      this.shuffledAnswers[4],
	      this.shuffledAnswers[8],
	      this.shuffledAnswers[12],
	      this.shuffledAnswers[16],
	      this.shuffledAnswers[20]
	    ];

	    won = segment.every((el) => (
	      el.key==="token"
	    ));

	    if (won) return true;


	    segment = [
	      this.shuffledAnswers[0],
	      this.shuffledAnswers[6],
	      this.shuffledAnswers[12],
	      this.shuffledAnswers[18],
	      this.shuffledAnswers[24]
	    ];

	    won = segment.every((el) => (
	      el.key==="token"
	    ));

	    if (won) return true;


	    return false;
	  }
	}

	module.exports = BingoGame;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class BingoView {
	  constructor($el, game) {
	    this.$el = $el;
	    this.game = game;

	    this.$el.on(
	      "click",
	      ".start",
	      this.clickStart.bind(this)
	    );

	    this.setupBoard();
	  }

	  clickStart() {
	    this.$el.on(
	      "click",
	      ".tokenless",
	      this.clickTile.bind(this)
	    );

	    this.render();
	  }

	  restart() {
	    location.reload();
	  }

	  clickPass() {
	    this.game.nextQuestionIndex();
	    this.render();
	  }

	  clickTile(e) {
	    const clickedTileIdx = $(e.currentTarget).index();

	    if (!this.game.guess(clickedTileIdx)) {
	      if (!$('.error').length) {
	        let $messageBox = this.$el.find('.message-box');

	        let $error = $('<div class="error">');
	        $error.text("Sorry, guess again!");

	        $messageBox.append($error);
	      }
	    } else {
	      this.render();
	    }

	    if (this.game.isWon()) {
	      let $congrats = $('<div class="congrats">').text(
	        "Congratulations, you won!"
	      );
	      let $modal = $('<div class="modal">');
	      $modal.append($congrats);

	      this.$el.append($modal);

	      this.$el.on(
	        "click",
	        ".modal",
	        this.restart.bind(this)
	      );
	    }
	  }

	  setupBoard() {
	    this.$el.empty();

	    let $title = $('<header class="title" />');
	    $title.text("Learning Bingo");

	    let $messageBox = $('<div class="message-box">');
	    let $start = $('<div class="start">');
	    $start.text("Start");
	    $messageBox.append($start);

	    let $question = $('<div class="question">');
	    let $board = $('<ul>');
	    let $tile;

	    for (var tileIdx = 0; tileIdx < 25; tileIdx++) {
	      $tile = $('<li>');
	      $tile.addClass("tokenless noclick");
	      $tile.text(this.game.shuffledAnswers[tileIdx].answer);
	      $board.append($tile);
	    }

	    let $buttonBox = $('<div class="button-box invisible">');

	    let $restart = $('<div class="restart">').text('Restart');
	    let $pass = $('<div class="pass">').text('Pass');

	    $buttonBox.append($pass, $restart);

	    this.$el.on(
	      "click",
	      ".restart",
	      this.restart.bind(this)
	    );

	    this.$el.on(
	      "click",
	      ".pass",
	      this.clickPass.bind(this)
	    );

	    this.$el.append($title, $messageBox, $question, $board, $buttonBox);
	  }

	  render() {
	    this.$el.find('.start').remove();
	    this.$el.find('.error').remove();

	    const $lis = this.$el.find('li');

	    this.game.shuffledAnswers.forEach((answer, answerIdx) => {
	      let current = $lis[answerIdx];
	      $(current).removeClass();

	      if (this.game.shuffledAnswers[answerIdx].key === "token") {
	        $(current).addClass("token");
	      } else {
	        $(current).addClass("tokenless");
	      }
	    });

	    const $question = this.$el.find('.question');
	    $question.text(this.game.currentQuestion().question);

	    this.$el.find('.button-box').removeClass('invisible');
	  }
	}

	module.exports = BingoView;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const questions = {
	  1 : "Do you have any tiles that equal 3 - 2?",
	  2 : "Do you have any tiles that equal 1 + 1?",
	  3 : "Do you have any tiles that equal 6 - 3?",
	  4 : "Do you have any tiles that equal 1 + 3?",
	  5 : "Do you have any tiles that equal 2 + 3?",
	  6 : "Do you have any tiles that equal 3 + 3?",
	  7 : "Do you have any tiles that equal 3 + 4?",
	  8 : "Do you have any tiles that equal 4 + 4?",
	  9 : "Do you have any tiles that equal 5 + 4?",
	  10 : "Do you have any tiles that equal 2 + 8?",
	  11 : "Do you have any tiles that equal 1 + 10?",
	  12 : "Do you have any tiles that equal 12 + 0?",
	  13 : "Do you have any tiles that equal 10 + 3?",
	  14 : "Do you have any tiles that equal 12 + 2?",
	  15 : "Do you have any tiles that equal 12 + 3?",
	  16 : "Do you have any tiles that equal 14 + 2?",
	  17 : "Do you have any tiles that equal 7 + 10?",
	  18 : "Do you have any tiles that equal 4 + 14?",
	  19 : "Do you have any tiles that equal 3 + 16?",
	  20 : "Do you have any tiles that equal 7 + 13?",
	  21 : "Do you have any tiles that equal 4 + 17?",
	  22 : "Do you have any tiles that equal 6 + 16?",
	  23 : "Do you have any tiles that equal 3 + 20?",
	  24 : "Do you have any tiles that equal 15 + 9?",
	  25 : "Do you have any tiles that equal 5 + 20?"
	};

	module.exports = questions;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const answers = {
	  1 : 1,
	  2 : 2,
	  3 : 3,
	  4 : 4,
	  5 : 5,
	  6 : 6,
	  7 : 7,
	  8 : 8,
	  9 : 9,
	  10 : 10,
	  11 : 11,
	  12 : 12,
	  13 : 13,
	  14 : 14,
	  15 : 15,
	  16 : 16,
	  17 : 17,
	  18 : 18,
	  19 : 19,
	  20 : 20,
	  21 : 21,
	  22 : 22,
	  23 : 23,
	  24 : 24,
	  25 : 25
	};

	module.exports = answers;


/***/ }
/******/ ]);