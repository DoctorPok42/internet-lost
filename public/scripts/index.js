const sprite = new Image();
sprite.src = "sprite.png";

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
    player.update(container);
    player.move(ctx);
    scene.moveGround();

    obstacles.forEach((obstacle, index) => {
      obstacle.update();
      obstacle.draw(ctx);

      if (isColliding(player.getHitbox(), obstacle.getHitbox())) {
        container.style.transform = "translateY(0) !important";
        alert("Game Over!");
        window.location.reload();
        obstacles = [];
      }

      if (obstacle.x < -obstacle.spriteWidth) {
        obstacles.splice(index, 1);
      }
    });
    scene.drawLine();
  }, 400 / 60);

  // Generate obstacles periodically
  window.addEventListener("load", () => {
    setInterval(generateObstacle, Math.floor(Math.random() * 2000) + 1000);
  });

  // Listen for key presses
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === " ") {
      player.jump();
      container.style.transform = "translateY(-1px)";
    }

    if (e.key === "ArrowDown") {
      player.isDucking = true;
      player.duck();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowDown") {
      player.isDucking = false;
      player.y = 288;
      player.spriteWidth = 88;
      player.spriteHeight = 92;
      player.spriteBeginX = 1514;
      player.spriteLastX = 1602;
    }
  });

  window.addEventListener("touchstart", (e) => {
    player.jump();
    container.style.transform = "translateY(-1px)";
  });
}
