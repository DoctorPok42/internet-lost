class Scene {
  constructor(ctx, srpite) {
    this.x = 0;
    this.y = 370;
    this.ctx = ctx;
    this.sprite = srpite;
    this.speed = 2; // Speed of ground movement
    this.segments = [
      { x: 0, pos: Math.floor(Math.random() * 1500) },
      { x: 900, pos: Math.floor(Math.random() * 1500) }
    ];
  }

  drawBackground() {
    this.ctx.fillStyle = "#f5f5f5";
    this.ctx.fillRect(0, 0, 800, 400);
  }

  drawLine() {
    const lineWidth = 900;
    const lineHeight = 25;
    const lineY = 370;

    for (const segment of this.segments) {
      this.ctx.drawImage(
        this.sprite, segment.pos, 102, lineWidth, lineHeight, segment.x, lineY, lineWidth, lineHeight
      );
    }
  }

  // move ground to the left with a certain speed
  moveGround() {
    for (const segment of this.segments) {
      segment.x -= this.speed;
      if (segment.x <= -900) {
        segment.x = 900;
        segment.pos = Math.floor(Math.random() * 1500); // Generate a new random portion of the sprite
      }
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, 800, 400);
  }
}
