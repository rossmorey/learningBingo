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

    for (let i=0; i<=5; i+=5) {
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
