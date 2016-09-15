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
	    this.shuffledAnswers = this.shuffledQAs(answers, "answer");
	    this.shuffledQuestions = this.shuffledQAs(questions, "question");
	    this.currentQuestionIndex = 0;
	    this.currentQuestion = () => (
	      this.shuffledQuestions[this.currentQuestionIndex]
	    );
	  }

	  shuffledQAs(qAndAs, label) {
	    let result = [];

	    for (var i = 1; i <= 25; i++) {
	      let qA = {key: i};
	      qA[label] = qAndAs[i];
	      result.push(qA);
	    }

	    return this.shuffle(result);
	  }

	  // Shuffle helper method (http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript)
	  shuffle(arr) {
	    let result = arr.slice(0);

	    var j, x, i;
	    for (var i = result.length; i; i--) {
	      j = Math.floor(Math.random() * i);
	      x = result[i - 1];
	      result[i - 1] = result[j];
	      result[j] = x;
	    }

	    return result;
	  }

	  guess(index) {
	    if (this.currentQuestion().key === this.shuffledAnswers[index].key) {
	      this.shuffledAnswers[index].key = "token";
	      this.markCurrentQuestion();
	      this.nextQuestionIndex();
	      return true;
	    } else {
	      return false;
	    }
	  }

	  nextQuestionIndex() {
	    this.currentQuestionIndex += 1;

	    if (this.shuffledQuestions.length ===
	      this.currentQuestionIndex) {
	        this.currentQuestionIndex = 0;
	    }

	    if (this.currentQuestion().key === "token") {
	      this.nextQuestionIndex();
	    }
	  }

	  markCurrentQuestion() {
	    this.currentQuestion().key = "token";
	  }

	  isWon() {
	    let segment;
	    let won = false;

	    let checkSegment = () => (
	      segment.every((el) => (
	        el.key==="token"
	      ))
	    );

	    // checks horizontal rows
	    for (let i=0; i<=20; i+=5) {
	      segment = this.shuffledAnswers.slice(i, i+5);
	      if (checkSegment()) won = true;
	    }

	    //checks vertical columns
	    for (let j=0; j<5; j++) {
	      segment = [];
	      for (let m=0; m<25; m++) {
	        if (m%5===j) segment.push(this.shuffledAnswers[m]);
	      }
	      if (checkSegment()) won = true;
	    }

	    //checks diagonals
	    const diagCounts = [
	      [4,8,12,16,20],
	      [0,6,12,18,24]
	    ];

	    diagCounts.forEach((diagCount) => {
	      segment = diagCount.map((count) =>
	        (this.shuffledAnswers[count])
	      );
	      if (checkSegment()) won = true;
	    });

	    return won;
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

	    this.won = false;

	    this.setupBoard();

	    // Handle start-modal click
	    this.$el.on(
	      "click",
	      ".modal",
	      this.clickStart.bind(this)
	    );
	  }

	  setupBoard() {
	    let $audioQuestion = $('<audio class="audio-question">');

	    let $directions = $('<div class="directions" />').text(
	      "Can you turn over five cards in a row?"
	    );

	    let $start = $('<div class="start">').text("Start");

	    let $audioReminder = $('<div class="audio-reminder">').text(
	      "(Make sure your sound is turned on.)"
	    );

	    let $modal = $('<div class="modal">').append(
	      $directions,
	      $audioReminder,
	      $start
	    );

	    let $title = $('<div class="title" />').text("Blending Bingo");

	    let $board = $('<ul>');
	    let $tile, $image;

	    for (var tileIdx = 0; tileIdx < 25; tileIdx++) {
	      $image = $('<img>').attr(
	        "src",
	        this.game.shuffledAnswers[tileIdx].answer
	      );
	      $tile = $('<li>').addClass("tokenless noclick").append($image);
	      $board.append($tile);
	    }

	    let $messageBox = $('<div class="message-box">');

	    let $pass = $('<div class="pass">').text('Pass');
	    let $replay = $('<div class="replay">').text('Repeat Question');
	    let $restart = $('<div class="restart">').text('Restart');

	    let $buttonBox = $('<div class="button-box">').append(
	      $pass, $replay, $restart
	    );

	    let $copyright = $('<div class="copyright">').html(
	      "Bay Tree Learning Inc. &copy; 2016<br />All rights reserved."
	    );

	    let $github = $('<div class="github">');
	    let $www = $('<div class="www">');

	    let $navContainer = $('<div class="nav">').append(
	      $github, $www
	    );

	    // Click handlers
	    this.$el.on(
	      "click",
	      ".replay",
	      this.playAudio.bind(this)
	    );

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

	    this.$el.on(
	      "click",
	      ".www",
	      this.clickWww.bind(this)
	    );

	    this.$el.on(
	      "click",
	      ".github",
	      this.clickGithub.bind(this)
	    );

	    this.$el.on(
	      "click",
	      ".tokenless",
	      this.clickTile.bind(this)
	    );

	    // Render to DOM
	    this.$el.append(
	      $audioQuestion,
	      $modal,
	      $title,
	      $board,
	      $messageBox,
	      $buttonBox,
	      $copyright,
	      $navContainer
	    );
	  }

	  clickStart() {
	    this.render();
	  }

	  clickGithub() {
	    window.location.href = "https://github.com/rossmorey/learningBingo";
	  }

	  clickWww() {
	    window.location.href = "http://www.rossmorey.com/";
	  }

	  restart() {
	    location.reload();
	  }

	  playAudio() {
	    $('audio').trigger("play");
	  }

	  clickPass() {
	    this.game.nextQuestionIndex();
	    this.render();
	  }

	  clickTile(e) {
	    const clickedTileIdx = $(e.currentTarget).index();

	    if (!this.game.guess(clickedTileIdx)) {
	      if (!$('.error').length) {
	        let $error = $('<div class="error">').text("Sorry, guess again!");
	        this.$el.find('.message-box').append($error);
	      }
	    } else {
	      if (this.game.isWon()) {
	        let $congrats = $('<div class="congrats">').text(
	          "Congratulations, you won!"
	        );

	        this.$el.append(
	          $('<div class="modal">').append($congrats)
	        );

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

	  render() {
	    if (!this.won) this.$el.find('.modal').remove();
	    this.$el.find('.start').remove();
	    this.$el.find('.error').remove();

	    let $audioQuestion = this.$el.find('audio');
	    $audioQuestion.attr('src', this.game.currentQuestion().question);

	    const $lis = this.$el.find('li');

	    this.game.shuffledAnswers.forEach((answer, answerIdx) => {
	      let current = $lis[answerIdx];
	      $(current).removeClass();

	      if (this.game.shuffledAnswers[answerIdx].key === "token") {
	        $(current).addClass("token");
	        let image = $(current).children()[0];
	        $(image).attr(
	          "src",
	          "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473790535/back_g11vin.png"
	        );
	      } else {
	        $(current).addClass("tokenless");
	      }
	    });

	    if (!this.won) $audioQuestion.trigger("play");
	  }
	}

	module.exports = BingoView;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const questions = {
	  1 : "https://blendingbingo.s3-us-west-1.amazonaws.com/top.mp3",
	  2 : "https://blendingbingo.s3-us-west-1.amazonaws.com/ten.mp3",
	  3 : "https://blendingbingo.s3-us-west-1.amazonaws.com/pot.mp3",
	  4 : "https://blendingbingo.s3-us-west-1.amazonaws.com/pin.mp3",
	  5 : "https://blendingbingo.s3-us-west-1.amazonaws.com/pig.mp3",
	  6 : "https://blendingbingo.s3-us-west-1.amazonaws.com/pen.mp3",
	  7 : "https://blendingbingo.s3-us-west-1.amazonaws.com/pan.mp3",
	  8 : "https://blendingbingo.s3-us-west-1.amazonaws.com/kiss.mp3",
	  9 : "https://blendingbingo.s3-us-west-1.amazonaws.com/jet.mp3",
	  10 : "https://blendingbingo.s3-us-west-1.amazonaws.com/jam.mp3",
	  11 : "https://blendingbingo.s3-us-west-1.amazonaws.com/gum.mp3",
	  12 : "https://blendingbingo.s3-us-west-1.amazonaws.com/doll.mp3",
	  13 : "https://blendingbingo.s3-us-west-1.amazonaws.com/dog.mp3",
	  14 : "https://blendingbingo.s3-us-west-1.amazonaws.com/dad.mp3",
	  15 : "https://blendingbingo.s3-us-west-1.amazonaws.com/cat.mp3",
	  16 : "https://blendingbingo.s3-us-west-1.amazonaws.com/can.mp3",
	  17 : "https://blendingbingo.s3-us-west-1.amazonaws.com/bus.mp3",
	  18 : "https://blendingbingo.s3-us-west-1.amazonaws.com/bun.mp3",
	  19 : "https://blendingbingo.s3-us-west-1.amazonaws.com/bug.mp3",
	  20 : "https://blendingbingo.s3-us-west-1.amazonaws.com/bib.mp3",
	  21 : "https://blendingbingo.s3-us-west-1.amazonaws.com/bell.mp3",
	  22 : "https://blendingbingo.s3-us-west-1.amazonaws.com/bed.mp3",
	  23 : "https://blendingbingo.s3-us-west-1.amazonaws.com/bat.mp3",
	  24 : "https://blendingbingo.s3-us-west-1.amazonaws.com/bag.mp3",
	  25 : "https://blendingbingo.s3-us-west-1.amazonaws.com/sub.mp3"
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