const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});


let teams = [
	new Team("#FDFD96"),
	new Team("#FF6F69"),
	new Team("#B39DDB"),
	new Team("#81D4FA"),
	new Team("#78D488"),
];
let pawns = [];
for (let i = 0; i < teams.length; i++)
	pawns.push(new Pawn(100 + 75 * i, 100, teams[i]));

let stars = [];
for (let i = 0; i < teams.length; i++)
	stars.push(new Star(100 + 75 * i, 200, teams[i]));



const stepSize = 10;
let lastUpdateTime = new Date().getTime();
let lastDrawTime = new Date().getTime();
function draw() {
	const t = new Date().getTime(), dt = t - lastDrawTime;
	lastDrawTime = t;

	// run steps
	while (lastUpdateTime < t) {
		update(stepSize);
		lastUpdateTime += stepSize;
	}

	// clear the canvas
	ctx.fillStyle = "#111";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// draw the grid
	const gridSize = 50;
	ctx.strokeStyle = '#fff3';
	ctx.shadowBlur = 0;
	for(let i = 0; i <= canvas.width; i += gridSize) {
		for(let j = 0; j <= canvas.height; j += gridSize) {
			ctx.strokeRect(i, j, gridSize, gridSize);
		}
	}
	// reveal grid
	let gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
	gradient.addColorStop(0, 'rgba(17, 17, 17, 0)');
	gradient.addColorStop(1, 'rgba(17, 17, 17, 0.9)');

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (let pawn of pawns)
		pawn.draw(ctx, dt);
	for (let star of stars)
		star.draw(ctx, dt);

	requestAnimationFrame(draw);
}
draw();


function update(dt) {
	for (let pawn of pawns)
		pawn.update(dt);
	for (let star of stars)
		star.update(dt);
}