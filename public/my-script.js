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
    this.jumpSpeed = 0;
    this.gravity = 0.5;
    this.isJumping = false;
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

  draw(ctx) {
    ctx.drawImage(
      this.sprite, this.spriteBeginX, 0, this.spriteWidth, this.spriteHeight,
      this.x, this.y, this.spriteWidth, this.spriteHeight
    );

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
      this.x, this.y, this.spriteWidth, this.spriteHeight
    );

    this.frameCount++;
  }

  clean(ctx) {
    ctx.clearRect(this.x, this.y, this.spriteWidth, this.spriteHeight);

    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpSpeed = -15;
    }
  }

  update() {
    if (this.isJumping) {
      this.y += this.jumpSpeed;
      this.jumpSpeed += this.gravity;

      if (this.y >= 286) { // Ground level
        this.y = 286;
        this.isJumping = false;
        this.jumpSpeed = 0;
      }
    }
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

  let time = 800;
  let over = false;

  // Create player
  const player = new Player(25, 286, sprite);

  // Create scene
  let scene = new Scene(ctx, sprite);

  setInterval(() => {
    scene.clear();
    scene.drawBackground();
    player.update();
    player.move(ctx);
    scene.drawLine();
    scene.moveGround();
  }, 800 / 60);

  // Listen for key presses
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === " " || e.key === "Touch") {
      player.jump();
    }
  });
}
