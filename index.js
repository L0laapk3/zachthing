const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
	pawns.push(new Pawn(100 + 50 * i, 100, teams[i]));

let stars = [new Star(200, 200, teams[0])];


function draw() {
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
		pawn.draw(ctx);
	for (let star of stars)
		star.draw(ctx);
}

function update() {
	draw();
	requestAnimationFrame(update);
}
update();