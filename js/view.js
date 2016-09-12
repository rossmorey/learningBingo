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
