document.addEventListener('DOMContentLoaded', function() {
    // Get the SVG element
    const logoSvg = document.getElementById('animated-logo-svg');
    
    // Check if the browser supports CSS animations
    const supportsAnimation = typeof document.createElement('div').style.animation !== 'undefined';
    
    // If animations are not supported, make all elements visible immediately
    if (!supportsAnimation) {
        const elements = logoSvg.querySelectorAll('#r-letter, #e-letter, #v-letter, #a-letter, #house-icon, #jordan-text');
        elements.forEach(function(element) {
            element.style.opacity = '1';
            element.style.fillOpacity = '1';
            element.style.strokeDashoffset = '0';
        });
        return;
    }
    
    // For browsers that support animations but might have issues with specific CSS properties
    // Apply animations with JavaScript as a fallback
    const rLetter = document.getElementById('r-letter');
    const eLetter = document.getElementById('e-letter');
    const vLetter = document.getElementById('v-letter');
    const aLetter = document.getElementById('a-letter');
    const houseIcon = document.getElementById('house-icon');
    const jordanText = document.getElementById('jordan-text');
    
    // Function to check if an element has animated (for browsers with partial animation support)
    function checkAnimation(element, property, expectedValue, fallbackAction) {
        // Wait a short time to see if CSS animations have started
        setTimeout(function() {
            const computedStyle = window.getComputedStyle(element);
            // If the animation hasn't applied the expected style, use the fallback
            if (computedStyle[property] !== expectedValue) {
                fallbackAction();
            }
        }, 100);
    }
    
    // Check and apply fallbacks if needed
    if (rLetter) {
        checkAnimation(rLetter, 'opacity', '0', function() {
            // Manual animation fallback
            rLetter.style.opacity = '0';
            setTimeout(() => { rLetter.style.opacity = '1'; }, 1000);
        });
    }
    
    if (houseIcon) {
        checkAnimation(houseIcon, 'opacity', '0', function() {
            houseIcon.style.opacity = '0';
            setTimeout(() => { 
                houseIcon.style.opacity = '1';
                // Simple bounce effect
                setInterval(() => {
                    houseIcon.style.transform = houseIcon.style.transform === 'translateY(-5px)' ? 
                        'translateY(0)' : 'translateY(-5px)';
                }, 1000);
            }, 1200);
        });
    }
    
    // Similar checks for other elements
    [eLetter, vLetter, aLetter].forEach((element, index) => {
        if (element) {
            checkAnimation(element, 'opacity', '0', function() {
                element.style.opacity = '0';
                setTimeout(() => { element.style.opacity = '1'; }, 800 + (index * 300));
            });
        }
    });
    
    if (jordanText) {
        checkAnimation(jordanText, 'opacity', '0', function() {
            jordanText.style.opacity = '0';
            jordanText.style.transform = 'translateY(-20px)';
            setTimeout(() => { 
                jordanText.style.opacity = '1';
                jordanText.style.transform = 'translateY(0)';
            }, 1500);
        });
    }
});