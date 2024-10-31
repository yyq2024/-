export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.color = '#00ff00';
    this.velocity = {
      x: 0,
      y: 0
    };
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Main body
    ctx.beginPath();
    ctx.moveTo(0, -this.radius);
    ctx.lineTo(-this.radius, this.radius * 0.5);
    ctx.lineTo(-this.radius * 0.5, this.radius * 0.3);
    ctx.lineTo(-this.radius * 0.5, this.radius);
    ctx.lineTo(this.radius * 0.5, this.radius);
    ctx.lineTo(this.radius * 0.5, this.radius * 0.3);
    ctx.lineTo(this.radius, this.radius * 0.5);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();

    // Cockpit
    ctx.beginPath();
    ctx.moveTo(0, -this.radius * 0.3);
    ctx.lineTo(-this.radius * 0.3, this.radius * 0.3);
    ctx.lineTo(this.radius * 0.3, this.radius * 0.3);
    ctx.closePath();
    ctx.fillStyle = '#00ccff';
    ctx.fill();

    // Engine flames
    ctx.beginPath();
    ctx.moveTo(-this.radius * 0.4, this.radius);
    ctx.lineTo(-this.radius * 0.2, this.radius + this.radius * 0.5);
    ctx.lineTo(0, this.radius);
    ctx.lineTo(this.radius * 0.2, this.radius + this.radius * 0.5);
    ctx.lineTo(this.radius * 0.4, this.radius);
    ctx.fillStyle = '#ff6600';
    ctx.fill();

    ctx.restore();
  }

  update() {
    this.x += this.velocity.x;
    
    // Keep player within canvas bounds
    if (this.x < this.radius) this.x = this.radius;
    if (this.x > 800 - this.radius) this.x = 800 - this.radius;
  }
}