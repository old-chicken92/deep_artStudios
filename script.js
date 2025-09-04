// Class information data
const classInfo = {
    essence: {
        title: "Essence",
        description: `This classic form of painting is revamped and expanded to include modern and trending styles, and a variety of fun subjects. Ranging in techniques from abstract to textured to realist - this class is suitable for everyone, from beginners to experts. You can choose to paint anything you see in front of you as we explore all the different ways we can translate reality onto a canvas. It's the most diverse and unique class there is, with lots of room for creativity and self-expression.`
    },
    immersion: {
        title: "Immersion", 
        description: `This ocean and beach painting class is our most laid back and easy going class there is! We will have you looking at the sea at every different angle, and appreciating the gentle beauty it bestows on us. This class has emphasis on capturing the vibrancy and beauty of a simple scene, with a practice of capturing movement and light through different brush strokes. This class is most suitable for beginners as well as our surfers and ocean lovers.`
    },
    nurturer: {
        title: "The Nurturer",
        description: `Paint some flowers to freshen your space. A 2 hour class where you look at a variety of styles and techniques to paint a beautiful floral arrangement. Proteas are the key subject for this class, with focus on capturing texture and form. We'll learn to paint in an abstract expressionist style, with broad brush strokes of movement and colour. Perfect for your living room or quiet space.`
    }
};

// Gallery/Carousel Logic
document.addEventListener('DOMContentLoaded', function() {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.gallery-image');
    const dots = document.querySelectorAll('.gallery-dot');
    const totalSlides = slides.length;

    function updateSlidePositions() {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (slides[currentSlideIndex]) {
            slides[currentSlideIndex].classList.add('active');
        }
        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateSlidePositions();
    }

    // Make goToSlide globally accessible
    window.goToSlide = function(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlideIndex = index;
            updateSlidePositions();
        }
    };

    // Initialize gallery
    if (totalSlides > 0) {
        updateSlidePositions();
        
        // Auto-rotation
        let autoSlideInterval = setInterval(nextSlide, 4000);

        // Pause on hover
        const galleryContainer = document.querySelector('.gallery-container');
        if (galleryContainer) {
            galleryContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            galleryContainer.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(nextSlide, 4000);
            });
        }
    }

    // Video Logic
    const video = document.querySelector('.class-video');
    const placeholder = document.querySelector('.video-placeholder');
    if (video) {
        video.addEventListener('canplay', function() {
            video.classList.remove('hidden');
            if (placeholder) placeholder.style.display = 'none';
        });
        if (video.readyState >= 3) {
            video.classList.remove('hidden');
            if (placeholder) placeholder.style.display = 'none';
        }
    }

    // Navigation
    const aboutBtn = document.getElementById('aboutBtn');
    const homeBtn = document.getElementById('homeBtn');
    const mainContent = document.getElementById('mainContent');
    const aboutContent = document.getElementById('aboutContent');

    if (aboutBtn) {
        aboutBtn.addEventListener('click', function() {
            mainContent.classList.add('hidden');
            aboutContent.classList.remove('hidden');
            aboutBtn.classList.add('hidden');
            homeBtn.classList.remove('hidden');
        });
    }

    if (homeBtn) {
        homeBtn.addEventListener('click', function() {
            aboutContent.classList.add('hidden');
            mainContent.classList.remove('hidden');
            homeBtn.classList.add('hidden');
            aboutBtn.classList.remove('hidden');
        });
    }

    // Modal event listeners
    const modal = document.getElementById('classModal');
    if (modal) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // Intersection observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.step-card, .class-card, .commission-content').forEach(element => {
        observer.observe(element);
    });
});

// Modal Functions
function openModal(className) {
    const modal = document.getElementById('classModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    if (modal && modalTitle && modalDescription && classInfo[className]) {
        modalTitle.textContent = classInfo[className].title;
        modalDescription.textContent = classInfo[className].description;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('classModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function bookNow() {
    closeModal();
    scrollToSection('booking');
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Parallax effect for hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroGallery = document.querySelector('.hero-gallery');
    if (heroGallery) {
        heroGallery.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});