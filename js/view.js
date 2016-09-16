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

    let $title = $('<div class="title" />').text("Blending Bingo!");

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
    const cardBack = "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473790535/back_g11vin.png"

    this.game.shuffledAnswers.forEach((answer, answerIdx) => {
      let current = $lis[answerIdx];
      $(current).removeClass();

      if (this.game.shuffledAnswers[answerIdx].key === "token") {
        $(current).addClass("token");
        let image = $(current).children()[0];
        $(image).attr(
          "src",
          cardBack
        );
      } else {
        $(current).addClass("tokenless");
      }
    });

    if (!this.won) $audioQuestion.trigger("play");
  }
}

module.exports = BingoView;
