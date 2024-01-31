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

	draw(ctx) {
		this.drawSetup(ctx);
		ctx.beginPath();
		ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
		ctx.fill();
	}
}

class Star extends TeamObject {
	constructor(x, y, team) {
		super(x, y, team);
		this.charge = 0;
	}

	drawSetup(ctx) {
		super.drawSetup(ctx);
		ctx.shadowBlur = 25;
	}

	draw(ctx) {
		this.drawSetup(ctx);
		ctx.beginPath();
		ctx.arc(this.x, this.y, 20, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.stroke();
	}
}