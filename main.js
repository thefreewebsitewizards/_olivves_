// Mobile menu toggle
document.querySelector('button').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Sticky navigation
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection.offsetHeight;
    
    if (window.scrollY > heroHeight * 0.8) {
        header.classList.remove('nav-transparent');
        header.classList.add('nav-solid');
    } else {
        header.classList.add('nav-transparent');
        header.classList.remove('nav-solid');
    }
});

// Scroll animations
function checkVisibility() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 75,
                behavior: 'smooth'
            });
        }
    });
});

// Lightbox functionality
const portfolioImages = [
    "PO1.JPG",
    "PO2.JPG",
    "PO3.JPG",
    "PO4.JPG",
    "PO5.JPG",
    "PO6.JPG"
];

// Publication images array
const publicationImages = [
    "P1.JPG",
    "P2.JPG",
    "P3.JPG",
    "P4.JPG",
    "P5.JPG",
    "P6.JPG",
    "P7.JPG",
    "P8.JPG",
    "P9.JPG",
    "P10.JPG"
];

let currentSlide = 0;
let currentImageSet = 'portfolio'; // Track which image set is currently active

function openLightbox(index) {
    currentSlide = index - 1;
    currentImageSet = 'portfolio';
    document.getElementById('lightbox-img').src = portfolioImages[currentSlide];
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// New function for publication lightbox
function openPublicationLightbox(index) {
    currentSlide = index - 1;
    currentImageSet = 'publication';
    document.getElementById('lightbox-img').src = publicationImages[currentSlide];
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeSlide(n) {
    const currentImages = currentImageSet === 'portfolio' ? portfolioImages : publicationImages;
    
    currentSlide += n;
    
    if (currentSlide >= currentImages.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = currentImages.length - 1;
    }
    
    document.getElementById('lightbox-img').src = currentImages[currentSlide];
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
});

// Booking Modal Show/Hide Logic
const openBookingModalBtns = document.querySelectorAll('.open-booking-btn'); // Select all buttons with class
const closeBookingModalBtn = document.getElementById('close-booking-modal');
const bookingModal = document.getElementById('booking-modal');

if (openBookingModalBtns.length > 0 && closeBookingModalBtn && bookingModal) {
    // Add event listener to all booking buttons
    openBookingModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            bookingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeBookingModalBtn.addEventListener('click', () => {
        bookingModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Booking Carousel (Vanilla JS)
const carouselImages = document.getElementById('carousel-images');
const carouselImgs = carouselImages ? carouselImages.querySelectorAll('img') : [];
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
let bookingSlide = 0;

function updateCarousel() {
    if (carouselImages) {
        carouselImages.style.transform = `translateX(-${bookingSlide * 100}%)`;
    }
}

if (prevBtn && nextBtn && carouselImgs.length > 0) {
    prevBtn.addEventListener('click', () => {
        bookingSlide = (bookingSlide - 1 + carouselImgs.length) % carouselImgs.length;
        updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
        bookingSlide = (bookingSlide + 1) % carouselImgs.length;
        updateCarousel();
    });
    // Optional: Auto-slide every 5s
    setInterval(() => {
        bookingSlide = (bookingSlide + 1) % carouselImgs.length;
        updateCarousel();
    }, 5000);
}

// Show Measurements & Appearance only after selecting a rate
const rateSelect = document.getElementById('rate-select');
const detailsSection = document.getElementById('details-section');

if (rateSelect && detailsSection) {
    rateSelect.addEventListener('change', function() {
        if (this.value === "standard" || this.value === "tfp") {
            detailsSection.style.display = "block";
        } else {
            detailsSection.style.display = "none";
        }
    });
}

// Booking form submit (fake, just shows thank you)
const bookingForm = document.getElementById('booking-form');
const bookingSuccess = document.getElementById('booking-success');
if (bookingForm && bookingSuccess) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        bookingForm.style.display = "none";
        bookingSuccess.style.display = "block";
        setTimeout(() => {
            bookingSuccess.style.display = "none";
            bookingForm.style.display = "block";
            document.getElementById('close-booking-modal').click();
            bookingForm.reset();
        }, 2000);
    });
}

// Booking section automatic slideshow
let currentBookingSlide = 0;
const bookingSlides = document.querySelectorAll('.booking-slide');

function showNextBookingSlide() {
    if (bookingSlides.length > 0) {
        // Remove active class from current slide
        bookingSlides[currentBookingSlide].classList.remove('active');
        
        // Move to the next slide
        currentBookingSlide = (currentBookingSlide + 1) % bookingSlides.length;
        
        // Add active class to new slide
        bookingSlides[currentBookingSlide].classList.add('active');
    }
}

// Start automatic slideshow
if (bookingSlides.length > 0) {
    setInterval(showNextBookingSlide, 4000); // Change slide every 4 seconds
}
