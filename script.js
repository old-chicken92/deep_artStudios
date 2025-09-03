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

        // Carousel functionality
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const totalSlides = slides.length;

        function updateSlidePositions() {
            slides.forEach((slide, index) => {
                slide.className = 'carousel-slide';
                
                const position = (index - currentSlideIndex + totalSlides) % totalSlides;
                
                if (position === 0) {
                    slide.classList.add('active');
                } else if (position === 1) {
                    slide.classList.add('next');
                } else if (position === totalSlides - 1) {
                    slide.classList.add('prev');
                } else if (position < totalSlides / 2) {
                    slide.classList.add('hidden-right');
                } else {
                    slide.classList.add('hidden-left');
                }
            });

            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlideIndex].classList.add('active');
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            updateSlidePositions();
        }

        function prevSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            updateSlidePositions();
        }

        function goToSlide(index) {
            currentSlideIndex = index;
            updateSlidePositions();
        }

        // Auto-advance carousel every 5 seconds
        let autoSlideInterval = setInterval(nextSlide, 3500);

        // Pause auto-slide when hovering over carousel
        const carouselWrapper = document.getElementById('carouselWrapper');
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        carouselWrapper.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 3500);
        });

        // Navigation functionality
        document.getElementById('aboutBtn').addEventListener('click', function() {
            document.getElementById('mainContent').classList.add('hidden');
            document.getElementById('aboutContent').classList.remove('hidden');
            document.getElementById('aboutBtn').classList.add('hidden');
            document.getElementById('homeBtn').classList.remove('hidden');
        });

        document.getElementById('homeBtn').addEventListener('click', function() {
            document.getElementById('aboutContent').classList.add('hidden');
            document.getElementById('mainContent').classList.remove('hidden');
            document.getElementById('homeBtn').classList.add('hidden');
            document.getElementById('aboutBtn').classList.remove('hidden');
        });

        // Modal functionality
        function openModal(className) {
            const modal = document.getElementById('classModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            
            modalTitle.textContent = classInfo[className].title;
            modalDescription.textContent = classInfo[className].description;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        function closeModal() {
            document.getElementById('classModal').classList.add('hidden');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }

        function bookNow() {
            closeModal();
            document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        }

        // Smooth scrolling utility
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Close modal when clicking outside
        document.getElementById('classModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize carousel
            updateSlidePositions();
            
            // Add scroll animations for booking steps
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, observerOptions);
            
            // Observe booking steps
            document.querySelectorAll('.booking-step, .booking-step-final').forEach(step => {
                observer.observe(step);
            });
        });

        // Add parallax effect to hero background
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });