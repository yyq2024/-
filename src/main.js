import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { Bullet } from './bullet.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('scoreEl');
const startMenu = document.getElementById('startMenu');
const startButton = document.getElementById('startButton');
const gameInfo = document.querySelector('.game-info');

canvas.width = 800;
canvas.height = 600;

let score = 0;
let player;
let enemies = [];
let bullets = [];
let animationId;
let enemySpawnInterval;
let gameStarted = false;

function init() {
  player = new Player(canvas.width / 2, canvas.height - 100);
  score = 0;
  enemies = [];
  bullets = [];
  scoreEl.innerHTML = score;
  
  if (enemySpawnInterval) clearInterval(enemySpawnInterval);
  enemySpawnInterval = setInterval(spawnEnemy, 1000);
}

function spawnEnemy() {
  const x = Math.random() * (canvas.width - 30);
  enemies.push(new Enemy(x, -30));
}

function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!gameStarted) return;

  player.draw(ctx);
  player.update();

  // Update and draw bullets
  bullets.forEach((bullet, bulletIndex) => {
    bullet.update();
    bullet.draw(ctx);

    if (bullet.y + bullet.radius < 0) {
      bullets.splice(bulletIndex, 1);
    }
  });

  // Update and draw enemies
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update();
    enemy.draw(ctx);

    // Check collision with player
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (dist < player.radius + enemy.radius) {
      gameOver();
    }

    // Check collision with bullets
    bullets.forEach((bullet, bulletIndex) => {
      const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
      if (dist < bullet.radius + enemy.radius) {
        enemies.splice(enemyIndex, 1);
        bullets.splice(bulletIndex, 1);
        score += 100;
        scoreEl.innerHTML = score;
      }
    });

    if (enemy.y > canvas.height) {
      enemies.splice(enemyIndex, 1);
    }
  });
}

function gameOver() {
  cancelAnimationFrame(animationId);
  clearInterval(enemySpawnInterval);
  gameStarted = false;
  startMenu.style.display = 'block';
  gameInfo.style.display = 'none';
  alert('游戏结束！得分：' + score);
}

function startGame() {
  gameStarted = true;
  startMenu.style.display = 'none';
  gameInfo.style.display = 'block';
  init();
}

// Event listeners
startButton.addEventListener('click', startGame);

addEventListener('keydown', ({ key }) => {
  if (!gameStarted) return;
  
  switch (key) {
    case 'ArrowLeft':
      player.velocity.x = -5;
      break;
    case 'ArrowRight':
      player.velocity.x = 5;
      break;
    case ' ':
      bullets.push(new Bullet(player.x, player.y));
      break;
  }
});

addEventListener('keyup', ({ key }) => {
  if (!gameStarted) return;

  if (key === 'ArrowLeft' && player.velocity.x < 0) {
    player.velocity.x = 0;
  }
  if (key === 'ArrowRight' && player.velocity.x > 0) {
    player.velocity.x = 0;
  }
});

// Start animation loop
animate();