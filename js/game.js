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
