var song
var fft
var img
let angle = 0
var arcade
var tails
let particles = [];

function preload() {
	song = loadSound('sonic.mp3');
	img = loadImage('green hill.jpg')
	img2 = loadImage('sonic title.jpg')
	img3 = loadImage('gh1.jpg')
	arcade = loadFont('Retro Gaming.ttf')
	tails = loadImage('miles.gif')


}

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	fft = new p5.FFT()


	img.filter(BLUR, 2)
	image(img2, 0, 0, width, height)
}




function keyPressed() {
	if (keyCode == LEFT_ARROW) {
		if (song.isPlaying()) {
			song.pause()
			noLoop()
		} else {
			song.play()
			loop()
		}
	}
}

function draw() {



	image(img2, 0, 0, width, height)
	textSize(50)
	textFont(arcade)
	stroke(0)
	strokeWeight(6)
	fill(255)

	text("PRESS 'UP' TO START!", 100, 850)
	if (keyCode == UP_ARROW) {
		background(0)

		image(img3, 0, 0, width, height)
		textSize(80)
		textFont(arcade)
		stroke(0)
		strokeWeight(6)
		fill(255)
		text("PRESS 'LEFT' TO GO!", 600, 850)
	}

	if (keyCode == LEFT_ARROW) {
		background(0);


		fft.analyze();
		amp = fft.getEnergy(20, 200);

		push();
		if (amp > 230) {
			rotate(random(-0.5, 0.5));
		}
		image(img, 0, 0, width, height)
		image(tails, mouseX, mouseY)
		img.filter(BLUR, 0.5)
		var alpha = map(amp, 0, 255, 0, 100);
		fill(0, alpha);
		noStroke();
		rect(0, 0, width, height);
		pop();
		textSize(100)
		textFont(arcade)
		stroke(0)
		strokeWeight(6)
		fill(255)

		text("GOTTA GO FAST!", 500, 850)

		stroke(255)
		strokeWeight(2)
		noFill()
		var wave = fft.waveform()

		beginShape()
		for (var i = 0; i < width; i++) {
			var index = floor(map(i, 0, width, 0, wave.length - 1))

			var x = i
			var y = wave[index] * 300 + height / 2
			vertex(x, y)

		}
		endShape()

		fft.analyze();
		bassVal = (int)(fft.getEnergy(200, 300));
		print(bassVal);
		lMidVal = (int)(fft.getEnergy("lowMid"));
		midVal = (int)(fft.getEnergy("mid"));
		hMidVal = (int)(fft.getEnergy("highMid"));
		trebVal = (int)(fft.getEnergy("treble"));
		translate(width / 2, height / 2);

		push()
		rotate(angle)
		noStroke();
		fill(22, 73, 242)
		ellipse(2, 2, bassVal * 2, bassVal * 2);

		noStroke();
		fill(31, 54, 184);
		ellipse(2, 2, lMidVal * 2, lMidVal * 2);

		noStroke();
		fill(68, 72, 255);
		ellipse(2, 2, midVal * 2, midVal * 2);

		noStroke();
		fill(26, 23, 209, 2);
		ellipse(2, 2, hMidVal * 4, hMidVal * 4);

		stroke(255);
		strokeWeight(2)
		fill(225, 211, 146);
		ellipse(2, 2, trebVal * 2, trebVal * 2);

		stroke(0)
		fill(0)
		ellipse(0, 0, 10, 8)

		stroke(255)
		strokeWeight(1)
		noFill()
		ellipse(0, 0, 100, 80)
		ellipse(0, 0, 150, 130)
		ellipse(0, 0, 200, 180)
		ellipse(0, 0, 250, 230)
		ellipse(0, 0, 300, 280)
		ellipse(0, 0, 350, 330)


		for (let t = -1; t <= 1; t += 2) {

			beginShape()
			stroke(250, 35, 35)
			strokeWeight(5)
			noFill()
			for (let i = 0; i <= 180; i += 0.5) {

				let index = floor(map(i, 0, 180, 0, wave.length - 1));

				let r = map(wave[index], -1, 1, 150, 350);

				let x = r * sin(i) * t;
				let y = r * cos(i);
				point(x, y);
			}

			pop()

			angle += degrees(12)

		}

	}




}

function mousePressed() {
	setup()
}