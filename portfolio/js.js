    document.addEventListener('DOMContentLoaded', function() {
        // Navegación con botones laterales
        const leftArrow = document.querySelector('.nav-arrow-left');
        const rightArrow = document.querySelector('.nav-arrow-right');
        const sections = document.querySelectorAll('section');
        let currentSection = 0;

        function scrollToSection(index) {
            if (index >= 0 && index < sections.length) {
                sections[index].scrollIntoView({ behavior: 'smooth' });
                currentSection = index;
            }
        }

        leftArrow.addEventListener('click', () => {
            scrollToSection(currentSection - 1);
        });

        rightArrow.addEventListener('click', () => {
            scrollToSection(currentSection + 1);
        });

        // Matrix effect
        const canvas = document.getElementById('background-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        chars = chars.split('');
        
        const fontSize = 10;
        const columns = canvas.width/fontSize;
        
        let drops = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            
            for(let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i*fontSize, drops[i]*fontSize);
                
                if(drops[i]*fontSize > canvas.height && Math.random() > 0.975)
                    drops[i] = 0;
                
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 33);

        // Scroll horizontal con flechas
        let currentSection = 0;

        // Crear indicador de scroll
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '>> Desliza para navegar >>';
        document.body.appendChild(scrollIndicator);

        // Navegación con flechas
        document.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowRight' && currentSection < sections.length - 1) {
                currentSection++;
                sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            }
            if(e.key === 'ArrowLeft' && currentSection > 0) {
                currentSection--;
                sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Efecto de terminal para el texto
        function createTerminalEffect(element) {
            const text = element.textContent;
            element.textContent = '';
            let index = 0;

            function typeText() {
                if(index < text.length) {
                    element.textContent += text[index];
                    index++;
                    setTimeout(typeText, Math.random() * 50 + 20);
                }
            }

            typeText();
        }

        // Aplicar efecto terminal a elementos con clase .terminal-text
        document.querySelectorAll('.terminal-text').forEach(createTerminalEffect);
        //presentacion

        const text = `Hola bienvenidos! Soy Eduard un desarrollador Full Stack .NET con experiencia de más de un año en la creación de aplicaciones web con C#. 
        Mi enfoque se centra en construir soluciones digitales funcionales que resuelvan problemas concretos y ofrezcan una buena experiencia de usuario.
        
        Con formación en Análisis de Tecnologías de la Información y Programación, trabajo con tecnologías modernas tanto en frontend como en backend, aplicando las metodologías necesarias y buenas prácticas de desarrollo.
        
        Me gusta aprender y trabajar en equipo, tengo mucha curiosidad técnica y busco constantemente mejorar mis habilidades y mantenerme actualizado con las tendencias del desarrollo web.`;
        
            const typingElement = document.getElementById("typing-text");
            let index = 0;
        
            function type() {
              if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 5); // Velocidad de escritura 25ms por carácter)
              }
            }
        type();
          




        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");

        hamburger.addEventListener("click", () => {
          navLinks.classList.toggle("active");
        });
        let width, height;
        let particles = [];
        const particleCount = 80;
        let mouseX = 0, mouseY = 0;
        
        // Ajustar tamaño del canvas
        function resizeCanvas() {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
        }
        
        // Crear partículas
        function createParticles() {
          particles = [];
          for (let i = 0; i < particleCount; i++) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              radius: Math.random() * 3 + 1,
              color: '#64b5f6',
              speedX: Math.random() * 2 - 1,
              speedY: Math.random() * 2 - 1
            });
          }
        }
        
        // Dibujar partículas
        function drawParticles() {
          ctx.clearRect(0, 0, width, height);
          
          // Actualizar y dibujar cada partícula
          particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Rebotar en los bordes
            if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > height) particle.speedY *= -1;
            
            // Dibujar partícula
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Dibujar líneas entre partículas cercanas
            particles.forEach(otherParticle => {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = `rgba(30, 136, 229, ${0.2 - distance/150 * 0.2})`;
                ctx.stroke();
              }
            });
            
            // Interacción con el mouse
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const angle = Math.atan2(dy, dx);
              const force = (120 - distance) / 120;
              particle.x -= Math.cos(angle) * force * 2;
              particle.y -= Math.sin(angle) * force * 2;
            }
          });
          
          requestAnimationFrame(drawParticles);
        }
        
        // Inicializar
        window.addEventListener('resize', function() {
          resizeCanvas();
          createParticles();
        });
        
        window.addEventListener('mousemove', function(e) {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });
        
        resizeCanvas();
        createParticles();
        drawParticles();
              drawParticles();
          }
      });
