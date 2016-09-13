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
