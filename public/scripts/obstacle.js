class Obstacle {
  constructor(x, y, sprite, type) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.spriteY = 2;
    this.type = type;
    this.speed = 2;
    this.frame = 0;
    this.frameCount = 0; // Counter for controlling animation speed
    this.frameRate = 20; // Change frame every 5 ticks

    if (type === 'cactusSmall') {
      this.spriteWidth = 38;
      this.spriteHeight = 70;
      this.spriteX = 440;
      this.spriteY = 1;
    } else if (type === 'cactusLarge') {
      this.spriteWidth = 47;
      this.spriteHeight = 100;
      this.spriteX = 653;
    } else {
      this.spriteWidth = 84;
      this.spriteHeight = 80;
      this.spriteX = 264;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight,
      this.x, this.y, this.spriteWidth, this.spriteHeight
    );
  }

  update() {
    this.x -= this.speed;

    if (this.type === 'bird') {
      if (this.frameCount % this.frameRate === 0) {
        this.frame = (this.frame + 1) % 2;
      }

      this.spriteX = this.frame === 0 ? 264 : 356;

      this.frameCount++;
    }
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
