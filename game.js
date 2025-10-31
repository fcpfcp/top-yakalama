const player = document.getElementById('player');
const ball = document.getElementById('ball');
const scoreBoard = document.getElementById('scoreBoard');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const gameArea = document.getElementById('gameArea');

let playerX = gameArea.clientWidth / 2 - 30;
let ballX = Math.random() * (gameArea.clientWidth - 25);
let ballY = 0;
let score = 0;
let speed = 4; // Başlangıç hızı

// Oyuncuyu güncelle
function updatePlayer() {
  player.style.left = playerX + 'px';
}

// Klavye ile kontrol
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && playerX > 0) playerX -= 25;
  if (e.key === 'ArrowRight' && playerX < gameArea.clientWidth - 60) playerX += 25;
  updatePlayer();
});

// Mobil kontrol
leftBtn.addEventListener('touchstart', () => {
  if (playerX > 0) playerX -= 25;
  updatePlayer();
});

rightBtn.addEventListener('touchstart', () => {
  if (playerX < gameArea.clientWidth - 60) playerX += 25;
  updatePlayer();
});

// Oyun döngüsü
function updateGame() {
  ballY += speed;
  ball.style.top = ballY + 'px';
  ball.style.left = ballX + 'px';

  // Top yere ulaştı mı?
  if (ballY > gameArea.clientHeight - 45) {
    // Çarpışma kontrolü
    if (ballX > playerX - 20 && ballX < playerX + 60) {
      score++;
      scoreBoard.textContent = "Skor: " + score;

      // Zorluk arttır
      speed += 0.5;

      // Yeni top
      ballY = 0;
      ballX = Math.random() * (gameArea.clientWidth - 25);
    } else {
      scoreBoard.textContent = `Oyun Bitti! Skor: ${score}`;
      return; // oyun bitti
    }
  }

  requestAnimationFrame(updateGame);
}

updatePlayer();
updateGame();
