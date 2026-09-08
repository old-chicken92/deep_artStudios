// Class information data
const classInfo = {
    coffeepaint: {
        title: "Coffee & Canvas",
        description: `A fun, down-to-earth painting class that you can book for your family and friends. You choose the location, and we’ll come to you! It runs for 2 hours on Saturday mornings from 10am to 12pm. We bring the paint and coffee, you just bring yourself!`
    },
    artaperol: {
        title: "Art & Aperol",
        description: `Placeholder description — details coming soon.`
    },

    paintGather: {
        title: "Paint & Gather",
        description: `Our mobile painting class - we come to you! Design the class however you like and we'll make it happen!`
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
    const forSaleBtn = document.getElementById('forSaleBtn');
    const homeBtn = document.getElementById('homeBtn');
    const mainContent = document.getElementById('mainContent');
    const aboutContent = document.getElementById('aboutContent');
    const forSaleContent = document.getElementById('forSaleContent');

    if (aboutBtn) {
        aboutBtn.addEventListener('click', function() {
            mainContent.classList.add('hidden');
            aboutContent.classList.remove('hidden');
            forSaleContent.classList.add('hidden');
            aboutBtn.classList.add('hidden');
            forSaleBtn.classList.add('hidden');
            homeBtn.classList.remove('hidden');
        });
    }

    if (forSaleBtn) {
        forSaleBtn.addEventListener('click', function() {
            mainContent.classList.add('hidden');
            aboutContent.classList.add('hidden');
            forSaleContent.classList.remove('hidden');
            aboutBtn.classList.add('hidden');
            forSaleBtn.classList.add('hidden');
            homeBtn.classList.remove('hidden');
        });
    }

    if (homeBtn) {
        homeBtn.addEventListener('click', function() {
            aboutContent.classList.add('hidden');
            forSaleContent.classList.add('hidden');
            mainContent.classList.remove('hidden');
            homeBtn.classList.add('hidden');
            aboutBtn.classList.remove('hidden');
            forSaleBtn.classList.remove('hidden');
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
    document.querySelectorAll('.step-card, .class-card').forEach(element => {
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
