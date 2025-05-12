// Highlight active section in navigation
const sections = document.querySelectorAll('.full-page-section');
const navLinks = document.querySelectorAll('nav a');
const mobileNavLinks = document.getElementById('mobile-nav-links');

function getCurrentSection() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    return current;
}

function updateNav() {
    const current = getCurrentSection();
    navLinks.forEach(link => {
        link.classList.remove('border-b-2', 'border-discord-accent', 'text-discord-accent');
        link.classList.add('dark:hover:bg-discord-hover', 'hover:bg-gray-100');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('border-b-2', 'border-discord-accent', 'text-discord-accent');
            link.classList.remove('dark:hover:bg-discord-hover', 'hover:bg-gray-100');
        }
    });

    if (mobileNavLinks) {
        const mobileLinks = mobileNavLinks.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.classList.remove('text-discord-accent');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('text-discord-accent');
            }
        });
    }
}

const hamburgerMenu = document.getElementById('hamburger-menu');
const hamburgerIcon = hamburgerMenu.querySelector('i');

if (hamburgerMenu && mobileNavLinks) {
    hamburgerMenu.addEventListener('click', () => {
        mobileNavLinks.classList.toggle('hidden');
        if (hamburgerIcon.classList.contains('fa-bars')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });

    mobileNavLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavLinks.classList.add('hidden');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        });
    });
}

window.addEventListener('scroll', updateNav);
window.addEventListener('load', updateNav);

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDarkMode = document.documentElement.classList.contains('dark');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    }
});

document.querySelectorAll('a[href="index.html#hero"]').forEach(link => {
    link.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    });


    // Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;
    
    // Function to pause all videos
    function pauseAllVideos() {
        const videos = document.querySelectorAll('.carousel-item video');
        videos.forEach(video => {
            video.pause();
        });
    }
    
    // Function to update carousel
    function updateCarousel(index) {
        // Pause all videos first
        pauseAllVideos();
        
        // Hide all items
        carouselItems.forEach(item => {
            item.classList.add('hidden');
            item.classList.remove('active');
        });
        
        // Show current item
        carouselItems[index].classList.remove('hidden');
        carouselItems[index].classList.add('active');
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.classList.add('opacity-40');
            dot.classList.remove('opacity-70');
        });
        dots[index].classList.add('active');
        dots[index].classList.add('opacity-70');
        dots[index].classList.remove('opacity-40');
        
        // Update current index
        currentIndex = index;
    }
    
    // Event listeners for prev/next buttons
    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = carouselItems.length - 1;
        updateCarousel(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= carouselItems.length) newIndex = 0;
        updateCarousel(newIndex);
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });
    
    // Fix for touch devices - reset button states after touch
    const buttons = [prevBtn, nextBtn];
    buttons.forEach(button => {
        button.addEventListener('touchend', function() {
            // Small delay to allow the click to register first
            setTimeout(() => {
                this.blur(); // Remove focus
            }, 100);
        });
    });
    
    // Also add touch handling for dots
    dots.forEach(dot => {
        dot.addEventListener('touchend', function() {
            setTimeout(() => {
                this.blur();
            }, 100);
        });
    });
    
    // Add controls to videos
    const videos = document.querySelectorAll('.carousel-item video');
    videos.forEach(video => {
        video.setAttribute('controls', '');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form element
    const contactForm = document.querySelector('form[name="contact"]');
    
    if (contactForm) {
      // Create status message elements
      const formStatus = document.getElementById('form-status');
      
      // Set the form action attribute to your Formspree endpoint
      // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
      contactForm.setAttribute('action', 'https://formspree.io/f/xblozrdn');
      contactForm.setAttribute('method', 'POST');
      
      contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerText;
        submitButton.innerText = 'Sending...';
        submitButton.disabled = true;
        
        // Reset status message
        formStatus.className = 'mt-4 text-center';
        formStatus.textContent = 'Sending your message...';
        formStatus.classList.remove('hidden', 'text-green-500', 'text-red-500');
        formStatus.classList.add('text-gray-500');
        
        // Collect form data
        const formData = new FormData(this);
        
        try {
            // Send the form data to Formspree
            const response = await fetch(contactForm.action, {
              method: 'POST',
              body: formData,
              headers: {
                'Accept': 'application/json'
              }
            });
            
            const result = await response.json();
            
            if (response.ok) {
              // Show success message
              formStatus.textContent = 'Message sent successfully! Thank you for contacting me.';
              formStatus.classList.remove('text-gray-500', 'text-red-500');
              formStatus.classList.add('text-green-500');
              contactForm.reset(); // Clear form fields
              
              // Hide the message after 5 seconds (5000 milliseconds)
              setTimeout(() => {
                formStatus.classList.add('hidden');
              }, 5000);
            } else {
              // Show error message based on Formspree response
              formStatus.textContent = result.error || 'Failed to send message. Please try again later.';
              formStatus.classList.remove('text-gray-500', 'text-green-500');
              formStatus.classList.add('text-red-500');
              
              // Hide the error message after 5 seconds
              setTimeout(() => {
                formStatus.classList.add('hidden');
              }, 5000);
            }
          } catch (error) {
            console.error('Error:', error);
            formStatus.textContent = 'Something went wrong. Please try again later.';
            formStatus.classList.remove('text-gray-500', 'text-green-500');
            formStatus.classList.add('text-red-500');
            
            // Hide the error message after 5 seconds
            setTimeout(() => {
              formStatus.classList.add('hidden');
            }, 5000);
          } finally {
            // Reset button state
            submitButton.innerText = originalButtonText;
            submitButton.disabled = false;
          }
      });
    }
  });

  function copyEmail(event) {
    event.preventDefault();
    
    // Your actual email to be copied
    const email = "adityagirish812@gmail.com";
    const emailLabel = document.getElementById('email-label');
    const originalText = emailLabel.textContent;
    
    navigator.clipboard.writeText(email)
        .then(() => {
            // Change text to "Copied!"
            emailLabel.textContent = "Email Copied!";
            
            // Reset text after 2 seconds
            setTimeout(() => {
                emailLabel.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}


document.getElementById('see-more-btn').addEventListener('click', function() {
    document.getElementById('short-content').classList.add('hidden');
    document.getElementById('full-content').classList.remove('hidden');
});

document.getElementById('see-less-btn').addEventListener('click', function() {
    document.getElementById('full-content').classList.add('hidden');
    document.getElementById('short-content').classList.remove('hidden');
});