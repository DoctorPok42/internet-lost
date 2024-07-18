class Score {
  constructor(sprite, ctx) {
    this.sprite = sprite;
    this.ctx = ctx;
    this.score = 0;
    this.highScore = 1234;
    this.x = 660;
    this.y = 50;
    this.frameCount = 0;
    this.frameRate = 20;
  }

  draw() {
    // Convert score to string and pad with zeros
    const scoreString = this.score.toString().padStart(5, '0');
    const digitWidth = 20;
    const digitHeight = 23;
    const spriteX = 952;

    // Draw each digit of the score
    for (let i = 0; i < scoreString.length; i++) {
      const digit = parseInt(scoreString[i]);
      this.ctx.drawImage(
        this.sprite, spriteX + digit * digitWidth, 0, digitWidth, digitHeight,
        this.x + i * digitWidth, this.y, digitWidth, digitHeight
      );
    }

    // if the current score is higher than the high score, display HI message
    if (this.score > this.highScore && this.highScore !== 0) {
      this.ctx.drawImage(
        this.sprite, 1153, 0, 39, 23, 610, 50, 39, 23
      );
    }
  }

  drawHighScore() {
    const scoreString = this.highScore.toString()
    const digitWidth = 20;
    const digitHeight = 23;
    const spriteX = 952;

    for (let i = 0; i < scoreString.length; i++) {
      const digit = parseInt(scoreString[i]);
      this.ctx.drawImage(
        this.sprite, spriteX + digit * digitWidth, 0, digitWidth, digitHeight,
        this.x + i * digitWidth, this.y + 30, digitWidth, digitHeight
      );
    }

    this.ctx.fillStyle = "#f5f5f5aa";
    this.ctx.fillRect(this.x - 5, this.y + 27, 210, 30);
  }

  update() {
    if (this.frameCount % this.frameRate === 0) {
      this.score++;
    }

    this.frameCount++;

    if (this.frameCount > 1000) {
      this.frameCount = 0
    }
  }

  setHighScore(highScore) {
    this.highScore = highScore;
  }
}
