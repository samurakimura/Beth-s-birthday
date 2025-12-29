document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GLOBAL CONFETTI ON TOUCH/CLICK ---
    document.addEventListener('click', (e) => {
        // Prevent confetti when clicking specific interactive elements to avoid clutter
        if(e.target.closest('.gift-box-wrapper') || e.target.closest('video') || e.target.closest('#music-btn')) return;
        
        createConfetti(e.clientX, e.clientY);
    });

    function createConfetti(x, y) {
        const particleCount = 15;
        const colors = ['#ffbd00', '#ff006e', '#8338ec', '#3a86ff', '#ffffff'];

        for (let i = 0; i < particleCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.width = Math.random() * 8 + 4 + 'px';
            confetti.style.height = Math.random() * 8 + 4 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%'; // Circles
            confetti.style.pointerEvents = 'none'; // Don't block clicks
            confetti.style.zIndex = '9999';
            
            // Physics variables
            const velocityX = (Math.random() - 0.5) * 10;
            const velocityY = (Math.random() - 1) * 10;
            
            document.body.appendChild(confetti);

            // Animate using Web Animations API for performance
            const animation = confetti.animate([
                { transform: `translate(0, 0) scale(1)`, opacity: 1 },
                { transform: `translate(${velocityX * 20}px, ${velocityY * 20 + 200}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }

    // --- 2. MUSIC PLAYER ---
    document.addEventListener('DOMContentLoaded', () => {

    // --- 🎵 MUSIC & START OVERLAY LOGIC ---
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const overlay = document.getElementById('start-overlay');
    const enterBtn = document.getElementById('enter-btn');
    let playing = false;

    // 1. When "Enter Party" is clicked
    enterBtn.addEventListener('click', () => {
        // Start Music
        audio.play().then(() => {
            playing = true;
            musicBtn.innerText = "⏸";
        }).catch(error => {
            console.log("Audio playback failed:", error);
        });

        // Hide Overlay
        overlay.classList.add('fade-out');
        
        // Explosion of confetti to start the party
        createConfetti(window.innerWidth/2, window.innerHeight/2);
    });

    // 2. Toggle Button Logic (for later)
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if(playing) {
            audio.pause();
            musicBtn.innerText = "🎵";
        } else {
            audio.play();
            musicBtn.innerText = "⏸";
        }
        playing = !playing;
    });

    });
    // --- 3. BALLOON POP GAME ---
    const container = document.getElementById('balloon-container');
    const balloonColors = ['#7b2cbf', '#ff006e', '#ffbd00', '#3a86ff'];
    
    // Spawn 20 balloons
    for(let i=0; i<20; i++) {
        const b = document.createElement('div');
        b.className = 'balloon';
        b.style.left = Math.random() * 90 + 'vw';
        b.style.background = balloonColors[Math.floor(Math.random()*balloonColors.length)];
        b.style.animationDuration = (Math.random()*5 + 8) + 's'; // 8-13 seconds float
        b.style.animationDelay = Math.random()*5 + 's';
        
        b.addEventListener('click', function(e) {
            e.stopPropagation(); // Don't trigger global confetti
            // Pop effect
            createConfetti(e.clientX, e.clientY); // Trigger confetti specifically here
            this.style.transform = 'scale(1.5)';
            this.style.opacity = '0';
            setTimeout(() => this.remove(), 200);
        });
        container.appendChild(b);
    }

    // --- 4. CAKE SMASH ---
    window.smashCake = () => {
        const cake = document.querySelector('.cake-top');
        // Visual shake
        cake.style.transform = "scale(0.95) rotate(5deg)";
        setTimeout(() => cake.style.transform = "scale(1) rotate(0deg)", 100);
        
        // Explosion of confetti from center of screen
        createConfetti(window.innerWidth/2, window.innerHeight/2);
    };

    // --- 5. GIFT UNWRAP ---
    window.unwrapGift = () => {
        document.getElementById('gift-box').classList.add('open');
        setTimeout(() => {
            document.getElementById('love-letter').classList.add('reveal');
        }, 300);
    };
});