const BingoGame = require('./game.js');
const BingoView = require('./view.js');
const questions = require('./questions.js');
const answers = require('./answers.js');

$(() => {
  const rootEl = $('.bingo');
  const game = new BingoGame(questions, answers);
  new BingoView(rootEl, game);
});
