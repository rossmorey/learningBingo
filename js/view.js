class BingoView {
  constructor($el, game) {
    this.$el = $el;
    this.game = game;
    this.won = false;
    this.setupBoard();

    this.$el.on(
      "click",
      ".modal",
      this.clickStart.bind(this)
    );
  }

  setupBoard() {
    this.$el.empty();

    let $title = $('<div class="title" />').text("Blending Bingo");
    let $directions = $('<div class="directions" />').text(
      "Can you turn over five cards in a row?"
    );

    let $messageBox = $('<div class="message-box">');

    let $audioQuestion = $('<audio class="audio-question">');

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

    let $pass = $('<div class="pass">').text('Pass');
    let $replay = $('<div class="replay invisible">').text('Repeat Question');
    let $restart = $('<div class="restart">').text('Restart');

    $buttonBox.append($pass, $replay, $restart);

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

    let $modal = $('<div class="modal">');

    let $start = $('<div class="start">').text("Start");
    let $audioReminder = $('<div class="audio-reminder">').text(
      "(Make sure your sound is turned on.)"
    );
    $modal.append($directions, $audioReminder, $start);

    this.$el.append($audioQuestion, $title, $board, $messageBox, $buttonBox, $copyright, $modal);
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

  render() {
    if (!this.won) this.$el.find('.modal').remove();
    this.$el.find('.start').remove();
    this.$el.find('.error').remove();

    let $audioQuestion = this.$el.find('audio');
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
          "https://res.cloudinary.com/dhorsi7vf/image/upload/c_scale,w_120/v1473790535/back_g11vin.png"
        );
      } else {
        $(current).addClass("tokenless");
      }
    });

    this.$el.find('.button-box').removeClass('invisible');
    this.$el.find('.replay').removeClass('invisible');

    if (!this.won) $audioQuestion.trigger("play");
  }
}

module.exports = BingoView;
