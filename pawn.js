"use strict";

class Position {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Team {
	constructor(color) {
		this.color = color;
	}

	drawSetup(ctx) {
		ctx.fillStyle = this.color;
		ctx.strokeStyle = "#0000";
		ctx.shadowColor = this.color;
	}
}

class TeamObject extends Position {
	constructor(x, y, team) {
		super(x, y);
		this.team = team;
	}

	drawSetup(ctx) {
		this.team.drawSetup(ctx);
	}
}

class Pawn extends TeamObject {
	constructor(x, y, team) {
		super(x, y, team);
	}

	drawSetup(ctx) {
		super.drawSetup(ctx);
		ctx.shadowBlur = 10;
	}

	update(dt) {
	}

	draw(ctx, dt) {
		this.drawSetup(ctx);
		ctx.beginPath();
		ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
		ctx.fill();
	}
}

class Star extends TeamObject {
	constructor(x, y, team) {
		super(x, y, team);
		this.animationTime = 0;
		this.angOffset = Math.PI / 2;//Math.random() * Math.PI * 2;

		this.charge = 0;
		this.chargeSpeed = Math.random() * .002;
	}

	drawSetup(ctx) {
		super.drawSetup(ctx);
		ctx.shadowBlur = 30;
	}

	update(dt) {
		this.charge += dt * this.chargeSpeed;
	}

	draw(ctx, dt) {
    this.drawSetup(ctx);

    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2, false);
		ctx.fill();
    ctx.stroke();

		this.animationTime += dt * this.chargeSpeed;
		ctx.shadowBlur = 0;	
		ctx.beginPath();
		let ang = Math.PI * (this.animationTime % 2);
		ctx.arc(this.x + Math.cos(this.angOffset + ang) * 20, this.y + Math.sin(this.angOffset + ang) * 20, 3, 0, Math.PI * 2, false);
		ctx.arc(this.x + Math.cos(this.angOffset - ang) * 20, this.y + Math.sin(this.angOffset - ang) * 20, 3, 0, Math.PI * 2, false);
		ctx.fill();
	
		ctx.stroke();
		ctx.strokeStyle = "#0000";
		ctx.lineWidth = 1;

		// text box
		const boxWidth = 22, boxHeight = 14, cornerRadius = 5;
		ctx.fillStyle = "#111";
		ctx.beginPath();
		ctx.moveTo(this.x - boxWidth / 2 + cornerRadius, this.y - boxHeight / 2);
		ctx.arcTo(this.x + boxWidth / 2, this.y - boxHeight / 2, this.x + boxWidth / 2, this.y + boxHeight / 2, cornerRadius);
		ctx.arcTo(this.x + boxWidth / 2, this.y + boxHeight / 2, this.x - boxWidth / 2, this.y + boxHeight / 2, cornerRadius);
		ctx.arcTo(this.x - boxWidth / 2, this.y + boxHeight / 2, this.x - boxWidth / 2, this.y - boxHeight / 2, cornerRadius);
		ctx.arcTo(this.x - boxWidth / 2, this.y - boxHeight / 2, this.x + boxWidth / 2, this.y - boxHeight / 2, cornerRadius);
		ctx.closePath();
		ctx.fill();

		// text
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = this.team.color;
		ctx.fillText(Math.floor(this.charge), this.x, this.y);
	}
}


class Base extends TeamObject {
	constructor(x, y, team) {
		super(x, y, team);
		this.charge = 0;
	}


}