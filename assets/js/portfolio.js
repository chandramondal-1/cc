document.addEventListener("DOMContentLoaded", () => {
    // 1. Mouse Glow Effect
    const mouseGlow = document.getElementById("mouse-glow");
    window.addEventListener("mousemove", (e) => {
        mouseGlow.style.setProperty("--x", `${e.clientX}px`);
        mouseGlow.style.setProperty("--y", `${e.clientY}px`);
    });

    // 2. Navbar Shrink on Scroll
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("shrink");
        } else {
            navbar.classList.remove("shrink");
        }
    });

    // 3. Typing Text Effect
    const typingText = document.getElementById("typing-text");
    const phrases = ["I Build Premium Websites.", "I Grow Modern Brands.", "I Create Digital Luxury."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    };
    type();

    // 4. Counter Animation
    const animateCounters = () => {
        const counters = document.querySelectorAll(".stat-number");
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.textContent;
            const increment = target / 50; // Adjust for speed

            if (count < target) {
                counter.textContent = Math.ceil(count + increment);
                setTimeout(animateCounters, 30);
            } else {
                counter.textContent = target;
            }
        });
    };

    // 5. Reveal Animation on Scroll (with Counter Trigger)
    const reveals = document.querySelectorAll(".reveal");
    let countersStarted = false;

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
                
                // Trigger counters when the stats section is visible
                if (el.querySelector(".stat-number") && !countersStarted) {
                    countersStarted = true;
                    animateCounters();
                }
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // 6. Button Ripple Effect
    document.querySelectorAll(".ripple-btn").forEach(button => {
        button.addEventListener("click", function (e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            let ripple = document.createElement("span");
            ripple.classList.add("ripple");
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            this.appendChild(ripple);
            setTimeout(() => { ripple.remove() }, 600);
        });
    });

    // 7. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 8. Card Tilt effect
    const cards = document.querySelectorAll(".card, .portfolio-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `translateY(-12px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = `translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });
});
