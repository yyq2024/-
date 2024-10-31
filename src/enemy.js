export class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.color = '#ff0000';
    this.velocity = {
      x: 0,
      y: 2
    };
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.y += this.velocity.y;
  }
}