const canvas = document.getElementById("canvas-bg");
const ctx = canvas.getContext("2d");

let particlesArray;

// ضبط حجم الكانفاس لملء الشاشة
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// التعامل مع تغيير حجم الشاشة
window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});

// إنشاء كلاس للجزيئات (النقاط)
class Particle {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.size = Math.random() * 2 + 1; // حجم النقطة
		this.speedX = Math.random() * 1 - 0.5; // سرعة الحركة
		this.speedY = Math.random() * 1 - 0.5;
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;

		// ارتداد النقاط عند الحواف
		if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
		if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
	}
	draw() {
		ctx.fillStyle = "#00ff88"; // لون النقاط
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

// تهيئة المصفوفة
function init() {
	particlesArray = [];
	let numberOfParticles = (canvas.height * canvas.width) / 9000; // عدد النقاط بناءً على حجم الشاشة
	for (let i = 0; i < numberOfParticles; i++) {
		particlesArray.push(new Particle());
	}
}

// رسم الخطوط بين النقاط القريبة
function connect() {
	for (let a = 0; a < particlesArray.length; a++) {
		for (let b = a; b < particlesArray.length; b++) {
			let distance =
				(particlesArray[a].x - particlesArray[b].x) *
					(particlesArray[a].x - particlesArray[b].x) +
				(particlesArray[a].y - particlesArray[b].y) *
					(particlesArray[a].y - particlesArray[b].y);
			if (distance < (canvas.width / 7) * (canvas.height / 7)) {
				let opacityValue = 1 - distance / 20000;
				ctx.strokeStyle = "rgba(0, 255, 136," + opacityValue + ")"; // لون الخطوط
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
				ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
				ctx.stroke();
			}
		}
	}
}

// حلقة الأنيميشن
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
		particlesArray[i].draw();
	}
	connect();
}

init();
animate();
