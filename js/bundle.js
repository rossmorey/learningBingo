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

	'use strict';

	var BingoGame = __webpack_require__(1);
	var BingoView = __webpack_require__(2);
	var questions = __webpack_require__(3);
	var answers = __webpack_require__(4);

	$(function () {
	  var rootEl = $('.bingo');
	  var game = new BingoGame(questions, answers);
	  new BingoView(rootEl, game);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BingoGame = function () {
	  function BingoGame(questions, answers) {
	    var _this = this;

	    _classCallCheck(this, BingoGame);

	    this.shuffledAnswers = this.shuffledQAs(answers, "answer");
	    this.shuffledQuestions = this.shuffledQAs(questions, "question");
	    this.currentQuestionIndex = 0;
	    this.currentQuestion = function () {
	      return _this.shuffledQuestions[_this.currentQuestionIndex];
	    };
	  }

	  _createClass(BingoGame, [{
	    key: "shuffledQAs",
	    value: function shuffledQAs(qAndAs, label) {
	      var result = [];

	      for (var i = 1; i <= 25; i++) {
	        var qA = { key: i };
	        qA[label] = qAndAs[i];
	        result.push(qA);
	      }

	      return this.shuffle(result);
	    }

	    // Shuffle helper method (http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript)

	  }, {
	    key: "shuffle",
	    value: function shuffle(arr) {
	      var result = arr.slice(0);

	      var j, x, i;
	      for (var i = result.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = result[i - 1];
	        result[i - 1] = result[j];
	        result[j] = x;
	      }

	      return result;
	    }
	  }, {
	    key: "guess",
	    value: function guess(index) {
	      if (this.currentQuestion().key === this.shuffledAnswers[index].key) {
	        this.shuffledAnswers[index].key = "token";
	        this.markCurrentQuestion();
	        this.nextQuestionIndex();
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: "nextQuestionIndex",
	    value: function nextQuestionIndex() {
	      this.currentQuestionIndex += 1;

	      if (this.shuffledQuestions.length === this.currentQuestionIndex) {
	        this.currentQuestionIndex = 0;
	      }

	      if (this.currentQuestion().key === "token") {
	        this.nextQuestionIndex();
	      }
	    }
	  }, {
	    key: "markCurrentQuestion",
	    value: function markCurrentQuestion() {
	      this.currentQuestion().key = "token";
	    }
	  }, {
	    key: "isWon",
	    value: function isWon() {
	      var _this2 = this;

	      var segment = void 0;
	      var won = false;

	      var checkSegment = function checkSegment() {
	        return segment.every(function (el) {
	          return el.key === "token";
	        });
	      };

	      // checks horizontal rows
	      for (var y = 0; y <= 20; y += 5) {
	        segment = this.shuffledAnswers.slice(y, y + 5);
	        if (checkSegment()) won = true;
	      }

	      //checks vertical columns
	      for (var j = 0; j < 5; j++) {
	        segment = [];
	        for (var m = 0; m < 25; m++) {
	          if (m % 5 === j) segment.push(this.shuffledAnswers[m]);
	        }
	        if (checkSegment()) won = true;
	      }

	      //checks diagonals
	      var diagCounts = [[4, 8, 12, 16, 20], [0, 6, 12, 18, 24]];

	      diagCounts.forEach(function (diagCount) {
	        segment = diagCount.map(function (count) {
	          return _this2.shuffledAnswers[count];
	        });
	        if (checkSegment()) won = true;
	      });

	      return won;
	    }
	  }]);

	  return BingoGame;
	}();

	module.exports = BingoGame;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BingoView = function () {
	  function BingoView($el, game) {
	    _classCallCheck(this, BingoView);

	    this.$el = $el;
	    this.game = game;

	    this.won = false;

	    this.setupBoard();

	    // Handle start-modal click
	    this.$el.on("click", ".modal", this.clickStart.bind(this));
	  }

	  _createClass(BingoView, [{
	    key: "setupBoard",
	    value: function setupBoard() {
	      var $audioQuestion = $('<audio class="audio-question">');

	      var $directions = $('<div class="directions" />').text("Can you turn over five cards in a row?");

	      var $start = $('<div class="start">').text("Start");

	      var $audioReminder = $('<div class="audio-reminder">').text("(Make sure your sound is turned on.)");

	      var $modal = $('<div class="modal">').append($directions, $audioReminder, $start);

	      var $title = $('<div class="title" />').text("Blending Bingo!");

	      var $board = $('<ul>');
	      var $tile = void 0,
	          $image = void 0;

	      for (var tileIdx = 0; tileIdx < 25; tileIdx++) {
	        $image = $('<img>').attr("src", this.game.shuffledAnswers[tileIdx].answer);
	        $tile = $('<li>').addClass("tokenless noclick").append($image);
	        $board.append($tile);
	      }

	      var $messageBox = $('<div class="message-box">');

	      var $pass = $('<div class="pass">').text('Pass');
	      var $replay = $('<div class="replay">').text('Repeat Question');
	      var $restart = $('<div class="restart">').text('Restart');

	      var $buttonBox = $('<div class="button-box">').append($pass, $replay, $restart);

	      var $copyright = $('<div class="copyright">').html("Bay Tree Learning Inc. &copy; 2016<br />All rights reserved.");

	      var $github = $('<div class="github">');
	      var $www = $('<div class="www">');

	      var $navContainer = $('<div class="nav">').append($github, $www);

	      // Click handlers
	      this.$el.on("click", ".replay", this.playAudio.bind(this));

	      this.$el.on("click", ".restart", this.restart.bind(this));

	      this.$el.on("click", ".pass", this.clickPass.bind(this));

	      this.$el.on("click", ".www", this.clickWww.bind(this));

	      this.$el.on("click", ".github", this.clickGithub.bind(this));

	      this.$el.on("click", ".tokenless", this.clickTile.bind(this));

	      // Render to DOM
	      this.$el.append($audioQuestion, $modal, $title, $board, $messageBox, $buttonBox, $copyright, $navContainer);
	    }
	  }, {
	    key: "clickStart",
	    value: function clickStart() {
	      this.render();
	    }
	  }, {
	    key: "clickGithub",
	    value: function clickGithub() {
	      window.location.href = "https://github.com/rossmorey/learningBingo";
	    }
	  }, {
	    key: "clickWww",
	    value: function clickWww() {
	      window.location.href = "http://www.rossmorey.com/";
	    }
	  }, {
	    key: "restart",
	    value: function restart() {
	      location.reload();
	    }
	  }, {
	    key: "playAudio",
	    value: function playAudio() {
	      $('audio').trigger("play");
	    }
	  }, {
	    key: "clickPass",
	    value: function clickPass() {
	      this.game.nextQuestionIndex();
	      this.render();
	    }
	  }, {
	    key: "clickTile",
	    value: function clickTile(e) {
	      var clickedTileIdx = $(e.currentTarget).index();

	      if (!this.game.guess(clickedTileIdx)) {
	        if (!$('.error').length) {
	          var $error = $('<div class="error">').text("Sorry, guess again!");
	          this.$el.find('.message-box').append($error);
	        }
	      } else {
	        if (this.game.isWon()) {
	          var $congrats = $('<div class="congrats">').text("Congratulations, you won!");

	          this.$el.append($('<div class="modal">').append($congrats));

	          this.$el.on("click", ".modal", this.restart.bind(this));

	          this.won = true;
	        }
	        this.render();
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this = this;

	      if (!this.won) this.$el.find('.modal').remove();
	      this.$el.find('.start').remove();
	      this.$el.find('.error').remove();

	      var $audioQuestion = this.$el.find('audio');
	      $audioQuestion.attr('src', this.game.currentQuestion().question);

	      var $lis = this.$el.find('li');
	      var cardBack = "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473790535/back_g11vin.png";

	      this.game.shuffledAnswers.forEach(function (answer, answerIdx) {
	        var current = $lis[answerIdx];
	        $(current).removeClass();

	        if (_this.game.shuffledAnswers[answerIdx].key === "token") {
	          $(current).addClass("token");
	          var image = $(current).children()[0];
	          $(image).attr("src", cardBack);
	        } else {
	          $(current).addClass("tokenless");
	        }
	      });

	      if (!this.won) $audioQuestion.trigger("play");
	    }
	  }]);

	  return BingoView;
	}();

	module.exports = BingoView;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var questions = {
	  1: "https://blendingbingo.s3-us-west-1.amazonaws.com/top.mp3",
	  2: "https://blendingbingo.s3-us-west-1.amazonaws.com/ten.mp3",
	  3: "https://blendingbingo.s3-us-west-1.amazonaws.com/pot.mp3",
	  4: "https://blendingbingo.s3-us-west-1.amazonaws.com/pin.mp3",
	  5: "https://blendingbingo.s3-us-west-1.amazonaws.com/pig.mp3",
	  6: "https://blendingbingo.s3-us-west-1.amazonaws.com/pen.mp3",
	  7: "https://blendingbingo.s3-us-west-1.amazonaws.com/pan.mp3",
	  8: "https://blendingbingo.s3-us-west-1.amazonaws.com/kiss.mp3",
	  9: "https://blendingbingo.s3-us-west-1.amazonaws.com/jet.mp3",
	  10: "https://blendingbingo.s3-us-west-1.amazonaws.com/jam.mp3",
	  11: "https://blendingbingo.s3-us-west-1.amazonaws.com/gum.mp3",
	  12: "https://blendingbingo.s3-us-west-1.amazonaws.com/doll.mp3",
	  13: "https://blendingbingo.s3-us-west-1.amazonaws.com/dog.mp3",
	  14: "https://blendingbingo.s3-us-west-1.amazonaws.com/dad.mp3",
	  15: "https://blendingbingo.s3-us-west-1.amazonaws.com/cat.mp3",
	  16: "https://blendingbingo.s3-us-west-1.amazonaws.com/can.mp3",
	  17: "https://blendingbingo.s3-us-west-1.amazonaws.com/bus.mp3",
	  18: "https://blendingbingo.s3-us-west-1.amazonaws.com/bun.mp3",
	  19: "https://blendingbingo.s3-us-west-1.amazonaws.com/bug.mp3",
	  20: "https://blendingbingo.s3-us-west-1.amazonaws.com/bib.mp3",
	  21: "https://blendingbingo.s3-us-west-1.amazonaws.com/bell.mp3",
	  22: "https://blendingbingo.s3-us-west-1.amazonaws.com/bed.mp3",
	  23: "https://blendingbingo.s3-us-west-1.amazonaws.com/bat.mp3",
	  24: "https://blendingbingo.s3-us-west-1.amazonaws.com/bag.mp3",
	  25: "https://blendingbingo.s3-us-west-1.amazonaws.com/sub.mp3"
	};

	module.exports = questions;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var answers = {
	  1: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787891/top_q56ktj.png",
	  2: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787887/ten_euz640.png",
	  3: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787883/pot_kyqlhh.png",
	  4: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787875/pin_khhxpw.png",
	  5: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787866/pig_ng6mng.png",
	  6: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787859/pen_bjzais.png",
	  7: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787851/pan_m6bqnr.png",
	  8: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787847/kiss_bw5zdg.png",
	  9: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787842/jet_b3oi7f.png",
	  10: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787831/jam_z1xeu6.png",
	  11: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787824/gum_kgfg05.png",
	  12: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787819/doll_jkfzi9.png",
	  13: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787814/dog_gsi7o1.png",
	  14: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787809/dad_nulvor.png",
	  15: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787805/cat_i37i9c.png",
	  16: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787802/can_jkiswi.png",
	  17: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787798/bus_q5ec9n.png",
	  18: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787792/bun_ner2bk.png",
	  19: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787788/bug_whwt6q.png",
	  20: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787781/bib_iybuod.png",
	  21: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787776/bell_qlqqvk.png",
	  22: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787771/bed_rv8tpq.png",
	  23: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787761/bat_hruwfm.png",
	  24: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787751/bag_xe72lg.png",
	  25: "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473788625/sub_seg5mm.png"
	};

	module.exports = answers;

/***/ }
/******/ ]);