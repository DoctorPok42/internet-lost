const sprite = new Image();
sprite.src = "sprite.png";

// Player class
class Player {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.spriteWidth = 88;
    this.spriteHeight = 100;
    this.spriteBeginX = 1514;
    this.spriteLastX = 1602;
  }

  drawInitial(ctx) {
    const spriteX = 75;
    const spriteY = 0;

    ctx.drawImage(
      this.sprite,
      spriteX,
      spriteY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight
    );
  }

  draw(ctx) {
    const spriteX = 1602;
    const spriteY = 0;

    ctx.drawImage(
      this.sprite,
      spriteX,
      spriteY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight
    );
  }

  clean(ctx) {
    ctx.clearRect(this.x, this.y, this.spriteWidth, this.spriteHeight);

    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
  }

  move(ctx, x, y) {
    this.clean(ctx);

    this.x = x;
    this.y = y;

    this.draw(ctx);
  }
}

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
        segment.pos = Math.floor(Math.random() * 1600); // Generate a new random portion of the sprite
      }
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, 800, 400);
  }
}

sprite.onload = () => {
  // Initialize canvas
  const container = document.getElementById("container");
  const canvas = document.createElement("canvas");

  canvas.width = 800;
  canvas.height = 400;

  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get 2d context from canvas.");
  }

  // Create player
  const player = new Player(25, 286, sprite);

  // Create scene
  let scene = new Scene(ctx, sprite);

  function gameLoop() {
    scene.clear();
    scene.drawBackground();
    scene.drawLine();
    scene.moveGround();
    // player.update();
    // player.move(ctx);
    requestAnimationFrame(gameLoop);
  }

  gameLoop();

  // Listen for key presses
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === " ") {
      player.jump();
    }
  });
}
