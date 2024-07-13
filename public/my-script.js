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

  getHitbox() {
    return {
      x: this.x,
      y: this.y,
      width: this.spriteWidth,
      height: this.spriteHeight
    };
  }
}

class Obstacle {
  constructor(x, y, sprite, type) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.type = type;
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
      this.spriteY = 2;
    } else {
      this.spriteWidth = 84;
      this.spriteHeight = 80;
      this.spriteX = 264;
      this.spriteY = 2;
    }

    this.speed = 2;
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

// Collision detection function
function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
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
  const player = new Player(25, 288, sprite);

  // Create scene
  let scene = new Scene(ctx, sprite);

  // Create obstacles
  let obstacles = [];

  function generateObstacle() {
    const obstacleTypes = {
      "cactusSmall": 311,
      "cactusLarge": 287,
      "bird": 230
    }
    const obstacleType = Object.keys(obstacleTypes)[Math.floor(Math.random() * Object.keys(obstacleTypes).length)];

    let obstacleY = obstacleTypes[obstacleType];

    obstacles.push(new Obstacle(800, obstacleY, sprite, obstacleType));
  }

  setInterval(() => {
    scene.clear();
    scene.drawBackground();
    player.update();
    player.move(ctx);
    scene.moveGround();

    obstacles.forEach((obstacle, index) => {
      obstacle.update();
      obstacle.draw(ctx);

      if (isColliding(player.getHitbox(), obstacle.getHitbox())) {
        over = true;
        alert("Game Over!");
        window.location.reload();
        obstacles = [];
      }

      if (obstacle.x < -obstacle.spriteWidth) {
        obstacles.splice(index, 1);
      }
    });
    scene.drawLine();
  }, 800 / 60);

  // Generate obstacles periodically
  window.addEventListener("load", () => {
    setInterval(generateObstacle, Math.floor(Math.random() * 2000) + 1000);
  });

  // Listen for key presses
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === " " || e.key === "Touch") {
      player.jump();
    }
  });
}
