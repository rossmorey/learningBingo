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
    $audioQuestion.attr('src', "./beep.mp3");

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

    const $question = this.$el.find('.question');
    $question.text(this.game.currentQuestion().question);



    this.$el.find('.button-box').removeClass('invisible');
    this.$el.find('.replay').removeClass('invisible');
    $audioQuestion.trigger("play");
  }
}

module.exports = BingoView;
