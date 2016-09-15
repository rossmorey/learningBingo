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

	    for (let i=0; i<=20; i+=5) {
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
	    this.won = false;
	  }

	  playAudio() {
	    $('audio').trigger("play");
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

	        this.won = true;
	      }
	      this.render();
	    }

	  }

	  setupBoard() {
	    this.$el.empty();

	    let $title = $('<div class="title" />');
	    $title.text("Blending Bingo");

	    let $messageBox = $('<div class="message-box">');
	    let $start = $('<div class="start">');
	    $start.text("Start");

	    let $question = $('<div class="question">');
	    let $audioQuestion = $('<audio class="audio-question">');
	    let $replay = $('<div class="replay invisible">').text('Replay Question');

	    this.$el.on(
	      "click",
	      ".replay",
	      this.playAudio.bind(this)
	    );

	    let $board = $('<ul>');
	    let $tile, $image;

	    for (var tileIdx = 0; tileIdx < 25; tileIdx++) {
	      $tile = $('<li>');
	      $tile.addClass("tokenless noclick");
	      $image = $('<img>').attr(
	        "src",
	        this.game.shuffledAnswers[tileIdx].answer
	      );
	      $tile.append($image);

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

	    let $copyright = $('<div class="copyright">').html(
	      "Bay Tree Learing Inc. &copy; 2016<br />All rights reserved."
	    );

	    this.$el.append($audioQuestion, $title, $start, $replay, $messageBox, $board, $buttonBox, $question, $copyright);
	  }

	  render() {
	    this.$el.find('.start').remove();
	    this.$el.find('.error').remove();

	    let $audioQuestion = this.$el.find('audio');
	    // source below should be question audio:
	    $audioQuestion.attr('src', this.game.currentQuestion().question);

	    const $lis = this.$el.find('li');

	    let image;

	    this.game.shuffledAnswers.forEach((answer, answerIdx) => {
	      let current = $lis[answerIdx];
	      $(current).removeClass();

	      if (this.game.shuffledAnswers[answerIdx].key === "token") {
	        $(current).addClass("token");
	        image = $(current).children()[0];
	        $(image).attr(
	          "src",
	          "http://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473790535/back_g11vin.png"
	        );
	      } else {
	        $(current).addClass("tokenless");
	      }
	    });

	    // const $question = this.$el.find('.question');
	    // $question.text(this.game.currentQuestion().question);

	    this.$el.find('.button-box').removeClass('invisible');
	    this.$el.find('.replay').removeClass('invisible');

	    if (!this.won) $audioQuestion.trigger("play");
	  }
	}

	module.exports = BingoView;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const questions = {
	  1 : "http://blendingbingo.s3-us-west-1.amazonaws.com/top.mp3",
	  2 : "http://blendingbingo.s3-us-west-1.amazonaws.com/ten.mp3",
	  3 : "http://blendingbingo.s3-us-west-1.amazonaws.com/pot.mp3",
	  4 : "http://blendingbingo.s3-us-west-1.amazonaws.com/pin.mp3",
	  5 : "http://blendingbingo.s3-us-west-1.amazonaws.com/pig.mp3",
	  6 : "http://blendingbingo.s3-us-west-1.amazonaws.com/pen.mp3",
	  7 : "http://blendingbingo.s3-us-west-1.amazonaws.com/pan.mp3",
	  8 : "http://blendingbingo.s3-us-west-1.amazonaws.com/kiss.mp3",
	  9 : "http://blendingbingo.s3-us-west-1.amazonaws.com/jet.mp3",
	  10 : "http://blendingbingo.s3-us-west-1.amazonaws.com/jam.mp3",
	  11 : "http://blendingbingo.s3-us-west-1.amazonaws.com/gum.mp3",
	  12 : "http://blendingbingo.s3-us-west-1.amazonaws.com/doll.mp3",
	  13 : "http://blendingbingo.s3-us-west-1.amazonaws.com/dog.mp3",
	  14 : "http://blendingbingo.s3-us-west-1.amazonaws.com/dad.mp3",
	  15 : "http://blendingbingo.s3-us-west-1.amazonaws.com/cat.mp3",
	  16 : "http://blendingbingo.s3-us-west-1.amazonaws.com/can.mp3",
	  17 : "http://blendingbingo.s3-us-west-1.amazonaws.com/bus.mp3",
	  18 : "http://blendingbingo.s3-us-west-1.amazonaws.com/bun.mp3",
	  19 : "http://blendingbingo.s3-us-west-1.amazonaws.com/bug.mp3",
	  20 : "http://blendingbingo.s3-us-west-1.amazonaws.com/bib.mp3",
	  21 : "http://blendingbingo.s3-us-west-1.amazonaws.com/bell.mp3",
	  22 : "http://blendingbingo.s3-us-west-1.amazonaws.com/bed.mp3",
	  23 : "http://blendingbingo.s3-us-west-1.amazonaws.com/bat.mp3",
	  24 : "http://blendingbingo.s3-us-west-1.amazonaws.com/bag.mp3",
	  25 : "http://blendingbingo.s3-us-west-1.amazonaws.com/sub.mp3"
	};

	module.exports = questions;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const answers = {
	  1 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787891/top_q56ktj.png",
	  2 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787887/ten_euz640.png",
	  3 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787883/pot_kyqlhh.png",
	  4 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787875/pin_khhxpw.png",
	  5 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787866/pig_ng6mng.png",
	  6 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787859/pen_bjzais.png",
	  7 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787851/pan_m6bqnr.png",
	  8 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787847/kiss_bw5zdg.png",
	  9 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787842/jet_b3oi7f.png",
	  10 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787831/jam_z1xeu6.png",
	  11 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787824/gum_kgfg05.png",
	  12 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787819/doll_jkfzi9.png",
	  13 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787814/dog_gsi7o1.png",
	  14 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787809/dad_nulvor.png",
	  15 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787805/cat_i37i9c.png",
	  16 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787802/can_jkiswi.png",
	  17 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787798/bus_q5ec9n.png",
	  18 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787792/bun_ner2bk.png",
	  19 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787788/bug_whwt6q.png",
	  20 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787781/bib_iybuod.png",
	  21 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787776/bell_qlqqvk.png",
	  22 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787771/bed_rv8tpq.png",
	  23 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787761/bat_hruwfm.png",
	  24 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473787751/bag_xe72lg.png",
	  25 : "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473788625/sub_seg5mm.png"
	};

	module.exports = answers;


/***/ }
/******/ ]);