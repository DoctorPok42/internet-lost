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
    this.ctx = ctx;
    this.sprite = sprite;
  }

  drawBackground() {
    this.ctx.fillStyle = "#f5f5f5";
    this.ctx.fillRect(0, 0, 800, 400);
  }

  drawLine(ctx) {
    const lineWidth = 800;
    const lineHeight = 20;
    const lineX = 0;
    const lineY = 370;

    ctx.drawImage(
      this.sprite,
      0,
      110,
      lineWidth,
      lineHeight,
      lineX,
      lineY,
      lineWidth,
      lineHeight
    );
  }
}

sprite.onload = () => {
  // Initialize canvas
  const canvas = document.createElement("canvas");

  canvas.width = 800;
  canvas.height = 400;

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get 2d context from canvas.");
  }

  // Create player
  const player = new Player(25, 276, sprite);

  // Create scene
  const scene = new Scene(ctx);

  // Draw background
  scene.drawBackground();
  scene.drawLine(ctx);

  // Draw player
  player.draw(ctx);

  // Handle keydown event
  // document.addEventListener("keydown", (e) => {
  //   switch (e.key) {
  //     case "ArrowUp":
  //       player.move(ctx, player.x, player.y - 10);
  //       break;
  //   }
  // })
}
