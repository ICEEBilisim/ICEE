// --- Scroll Navbar Effect ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Mobile Menu Toggle ---
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('.reveal-on-scroll');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add("revealed");
            // If it contains a counter, trigger it
            const counters = entry.target.querySelectorAll('.counter');
            if (counters.length > 0) {
                runCounters(counters);
            }
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// --- Counter Animations ---
let countersRun = false;

function runCounters(counters) {
    if (countersRun) return;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const isFloat = counter.getAttribute('data-target').includes('.');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                counter.innerText = isFloat ? current.toFixed(1) : Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
    
    countersRun = true;
}

// Ensure hero counters run immediately if visible
setTimeout(() => {
    const heroCounters = document.querySelectorAll('.hero .counter');
    if(heroCounters.length > 0) {
        runCounters(heroCounters);
    }
}, 300);


// --- Form Submission Simulation ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        
        btn.innerText = 'Gönderiliyor...';
        btn.style.opacity = '0.7';
        
        // Simulating API call
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.opacity = '1';
            
            formStatus.innerHTML = '<span style="color: #00e5ff;">Mesajınız başarıyla iletildi. Teşekkür ederiz!</span>';
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }, 1500);
    });
}
