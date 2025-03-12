// script.js
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");

    // Ajustar el tamaño del canvas al de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confetti = [];

    function crearConfeti() {
        for (let i = 0; i < 150; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 6 + 2,
                d: Math.random() * 6 + 2,
                color: `hsl(${Math.random() * 360}, 100%, 70%)`,
                tilt: Math.random() * 10 - 5
            });
        }
    }

    function dibujarConfeti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((c, i) => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
            ctx.fillStyle = c.color;
            ctx.fill();
        });
        moverConfeti();
    }

    function moverConfeti() {
        confetti.forEach((c, i) => {
            c.y += c.d;
            c.x += Math.sin(c.tilt);

            if (c.y > canvas.height) {
                c.y = -10;
                c.x = Math.random() * canvas.width;
            }
        });
    }

    function lanzarConfeti() {
        confetti = [];
        crearConfeti();
        setInterval(dibujarConfeti, 30);
    }

    window.lanzarConfeti = lanzarConfeti;
});
