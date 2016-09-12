class BingoGame {
  constructor(questions, answers) {
    this.questions = this.shuffledQuestions(questions);
    this.answers = answers;

    this.board = this.newBoard();
  }

  // newBoard() {
  //   return({
  //     1: "tokenless",
  //     2: "tokenless",
  //     3: "tokenless",
  //     4: "tokenless"
  //   });
  // }

  newBoard() {
    let board = [];
    for (let i=0; i<4; i++) {
      board.push("tokenless")
    }
    return board;
  }

  shuffledQuestions(questions) {
    let result = [];
    for (var questionNum in questions) {
      if (questions.hasOwnProperty(questionNum)) {
        result.push({key: questionNum, question: questions[questionNum]});
      }
    }
    return result;
  }

  isWon() {
    let won = false;
    let segment;

    for (let i=0; i<2; i+=2) {
      segment = this.board.slice(i, i+2);

      won = segment.every((el) => (
        el==="token"
      ));

      if (won) return true;
    }

    for (let j=0; j<2; j++) {
      for (let m=0; m<4; m++) {
        segment = [];
        if (m%2+j===0) {
          segment.push(this.board[m]);
        }
      }

      won = segment.every((el) => (
        el==="token"
      ));

      if (won) return true;
    }

    return false;
  }
}

module.exports = BingoGame;
