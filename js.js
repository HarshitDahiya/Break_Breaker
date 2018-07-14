var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

var score=0

var x = canvas.width/2
var y = canvas.height-60
var ballRadius = 14
var dx=4
var dy=-4

var a=0
var b=0
var c=50
var d=70
var e=0
var f=0

var paddleHeight = 15
var paddleWidth = 90
var paddleX = (canvas.width - paddleWidth) / 2
var paddleY = canvas.height - paddleHeight

var paddleDx=7
var rightPressed
var leftPressed

function keyDownHandler(event) {
	if (event.keyCode == 39){
		rightPressed = true
	}
	else if (event.keyCode == 37) {
		leftPressed = true
	}
}

function keyUpHandler(event) {
	if (event.keyCode == 39){
		rightPressed = false
	}
	else if (event.keyCode == 37) {
		leftPressed = false
	}
}

document.onkeydown = keyDownHandler    //document.addEventlistener('keydown', keyDownHandler, false)
document.onkeyup = keyUpHandler

function drawBall() {
	ctx.beginPath()
	ctx.arc(x , y , ballRadius , 0 , Math.PI*2)
	ctx.fillStyle = "rgb(" + a + "," + b + "," + c + ")"
	ctx.fill()
	ctx.closePath()
}

function drawPaddle() {
	ctx.beginPath()
	ctx.rect(paddleX , paddleY , paddleWidth , paddleHeight)
	ctx.fillStyle = "rgb(" + d + "," + e + "," + f + ")"
	ctx.fill()
	ctx.closePath()
}

function draw() {
	ctx.clearRect(0 , 0 , canvas.width , canvas.height)

	drawBall()
	drawPaddle()

	Score.innerHTML = "SCORE: " + score
	
	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx
		a = Math.floor(Math.random()*180)
		b = Math.floor(Math.random()*180)
		c = Math.floor(Math.random()*180)
	}
	
	/*if (y + dy < ballRadius || (y + dy > canvas.height - paddleHeight - ballRadius && x + dx > paddleX && x + dx < paddleX + paddleWidth)) {
		dy = -dy
	}*/
	if(y + dy < ballRadius){
		dy=-dy
		a = Math.floor(Math.random()*180)
		b = Math.floor(Math.random()*180)
		c = Math.floor(Math.random()*180)
	}

	if (y + dy > canvas.height - paddleHeight - ballRadius && x + dx > paddleX && x + dx < paddleX + paddleWidth) {
		dy=-dy
		a = Math.floor(Math.random()*180)
		b = Math.floor(Math.random()*180)
		c = Math.floor(Math.random()*180)
		d = Math.floor(Math.random()*180)
		e = Math.floor(Math.random()*180)
		f = Math.floor(Math.random()*180)

		if (rightPressed && dx<0) {
			if (dx<-2 || dx>2) {
				dx-=2	
			}
		}
		if (leftPressed && dx>0) {
			if (dx<-2 || dx>2) {
				dx+=2
			}
		}

		if (rightPressed && dx>0) {
			if (dx<-2 || dx>2) {
				dx-=2
			}
		}
		if (leftPressed && dx<0) {
			if (dx<-2 || dx>2) {
				dx+=2
			}
		}

		score += 1

	}

	else if (y - 5*dy > canvas.height) {
		alert("GamE OveR")
		location.reload()
	}

	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += paddleDx
	}
	else if (leftPressed && paddleX > 0) {
		paddleX -= paddleDx
	}

	x += dx
	y += dy

	requestAnimationFrame(draw)
}

requestAnimationFrame(draw)