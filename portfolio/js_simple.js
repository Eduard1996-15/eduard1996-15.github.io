document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll horizontal con botones
    let currentSection = 0;
    const sections = document.querySelectorAll('section');

    window.scrollHorizontal = function(direction) {
        currentSection += direction;
        
        if (currentSection < 0) currentSection = 0;
        if (currentSection >= sections.length) currentSection = sections.length - 1;
        
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
    };

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            scrollHorizontal(1);
        } else if (e.key === 'ArrowLeft') {
            scrollHorizontal(-1);
        }
    });

    // Efecto de tipeo para el texto "Sobre mí"
    const text = `Hola bienvenidos! Soy Eduard un desarrollador Full Stack .NET con experiencia de más de un año en la creación de aplicaciones web con C#. 
Mi enfoque se centra en construir soluciones digitales funcionales que resuelvan problemas concretos y ofrezcan una buena experiencia de usuario.

Con formación en Análisis de Tecnologías de la Información y Programación, trabajo con tecnologías modernas tanto en frontend como en backend, aplicando las metodologías necesarias y buenas prácticas de desarrollo.

Me gusta aprender y trabajar en equipo, tengo mucha curiosidad técnica y busco constantemente mejorar mis habilidades y mantenerme actualizado con las tendencias del desarrollo web.`;
    
    const typingElement = document.getElementById("typing-text");
    if (typingElement) {
        let index = 0;
        
        function type() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 15); // Velocidad de escritura
            }
        }
        type();
    }

    // Menú hamburguesa
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Efecto Matrix discreto en el background
    const canvas = document.getElementById('background-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>?/|\\~`';
        chars = chars.split('');
        
        const fontSize = 12;
        const columns = canvas.width / fontSize;
        
        let drops = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fondo más sutil
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = 'rgba(0, 255, 0, 0.8)'; // Verde más brillante
            ctx.font = fontSize + 'px monospace';
            
            for(let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 50); // Más rápido para mayor fluidez
        
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Zoom para imagen del diploma
    const diplomaImg = document.querySelector('.education-image img');
    if (diplomaImg) {
        diplomaImg.style.cursor = 'zoom-in';
        diplomaImg.addEventListener('click', function() {
            // Crear modal para zoom
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: zoom-out;
            `;
            
            const zoomedImg = document.createElement('img');
            zoomedImg.src = this.src;
            zoomedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
            `;
            
            modal.appendChild(zoomedImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    }
});
