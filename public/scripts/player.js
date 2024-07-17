// Player class
class Player {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.spriteWidth = 88;
    this.spriteHeight = 92;
    this.spriteBeginX = 1514;
    this.spriteLastX = 1602;
    this.jumpSpeed = 0;
    this.gravity = 0.4;
    this.isJumping = false;
    this.isDucking = false;
    this.frame = 0;
    this.frameCount = 0; // Counter for controlling animation speed
    this.frameRate = 10; // Change frame every 5 ticks
  }

  drawInitial(ctx) {
    const spriteX = 75;
    const spriteY = 0;

    ctx.drawImage(
      this.sprite, spriteX, spriteY, this.spriteWidth, this.spriteHeight, this.x,
      this.y, this.spriteWidth, this.spriteHeight
    );
  }

  clean(ctx) {
    ctx.clearRect(this.x, this.y, this.spriteWidth, this.spriteHeight);

    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
  }

  move(ctx) {
    this.clean(ctx);

    if (this.frameCount % this.frameRate === 0) {
      this.frame = (this.frame + 1) % 2;
    }

    let whichStep = this.frame === 0 ? this.spriteBeginX : this.spriteLastX;

    ctx.drawImage(
      this.sprite, whichStep, 0, this.spriteWidth, this.spriteHeight,
      this.x,
      this.isDucking ? this.y - 38 : this.y
      , this.spriteWidth, this.spriteHeight
    );

    this.frameCount++;

    if (this.frameCount > 1000) {
      this.frameCount = 0;
    }
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpSpeed = -17;
    }
  }

  update() {
    if (this.isJumping) {
      if (this.isDucking) {
        this.jumpSpeed += (this.gravity + 0.05);
      } else {
        this.jumpSpeed += this.gravity;
      }

      this.y += this.jumpSpeed;

      if (this.y >= 288) { // Ground level
        this.y = 288;
        this.isJumping = false;
        this.jumpSpeed = 0;
      }
    }
  }

  duck() {
    if (this.isJumping) return;

    this.y = 326;
    this.spriteWidth = 120;
    this.spriteBeginX = 1862;
    this.spriteLastX = 1980;
  }

  getHitbox() {
    return {
      x: this.x,
      y: this.y,
      width: this.spriteWidth,
      height: this.spriteHeight
    };
  }
}
