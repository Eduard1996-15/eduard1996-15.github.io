    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        });
      });
      
  
      document.addEventListener('DOMContentLoaded', function() {
        const canvas = document.getElementById('background-canvas');
        const ctx = canvas.getContext('2d');
        
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
      });