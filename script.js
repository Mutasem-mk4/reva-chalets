document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Hero search form functionality
    const heroSearchBtn = document.querySelector('.search-btn');
    const heroCheckIn = document.getElementById('hero-check-in');
    const heroCity = document.getElementById('hero-city');
    const locationFilter = document.getElementById('location');
    
    if (heroCheckIn) {
        // Set minimum date to today for hero check-in
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0];
        heroCheckIn.min = todayFormatted;
    }
    
    if (heroSearchBtn && heroCheckIn && heroCity && locationFilter) {
        heroSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate inputs
            if (!heroCheckIn.value) {
                alert('Please select a check-in date');
                return;
            }
            
            if (!heroCity.value) {
                alert('Please select a city');
                return;
            }
            
            // Set the location filter to match the selected city
            locationFilter.value = heroCity.value;
            
            // Trigger the filter change event
            const changeEvent = new Event('change');
            locationFilter.dispatchEvent(changeEvent);
            
            // Scroll to chalets section
            document.getElementById('chalets').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Sample chalet data (in a real application, this would come from a database)
    const chalets = [
        {
            id: 1,
            name: 'Ajloun Forest Lodge',
            location: 'Ajloun',
            description: 'A serene retreat nestled in the Ajloun Forest Reserve with panoramic views of the oak and pine forests.',
            price: 120,
            priceCategory: 'mid',
            capacity: 4,
            features: {
                bedrooms: 2,
                bathrooms: 2,
                area: '120 m²'
            },
            amenities: ['Wi-Fi', 'Nature Trails', 'Eco-friendly', 'Mountain View'],
            image: 'https://images.unsplash.com/photo-1520984032042-162d526883e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
        },
        {
            id: 2,
            name: 'Dead Sea Luxury Villa',
            location: 'Dead Sea',
            description: 'Exclusive villa with private access to the mineral-rich waters of the Dead Sea and therapeutic mud treatments.',
            price: 350,
            priceCategory: 'luxury',
            capacity: 6,
            features: {
                bedrooms: 3,
                bathrooms: 2,
                area: '180 m²'
            },
            amenities: ['Wi-Fi', 'Spa Access', 'Mineral Pools', 'Therapeutic Mud'],
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
        },
        {
            id: 3,
            name: 'Petra Desert Retreat',
            location: 'Petra',
            description: 'Authentic Bedouin-style accommodation near the ancient city of Petra with stargazing opportunities.',
            price: 150,
            priceCategory: 'budget',
            capacity: 2,
            features: {
                bedrooms: 1,
                bathrooms: 1,
                area: '80 m²'
            },
            amenities: ['Wi-Fi', 'Desert Tours', 'Traditional Meals', 'Bedouin Experience'],
            image: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
        },
        {
            id: 4,
            name: 'Wadi Rum Luxury Camp',
            location: 'Wadi Rum',
            description: 'Exclusive desert camp in the heart of Wadi Rum with transparent dome rooms for stargazing.',
            price: 450,
            priceCategory: 'luxury',
            capacity: 8,
            features: {
                bedrooms: 4,
                bathrooms: 3,
                area: '250 m²'
            },
            amenities: ['Wi-Fi', 'Desert Safari', 'Stargazing Domes', 'Gourmet Dining'],
            image: 'https://images.unsplash.com/photo-1547636780-e41778614c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
        },
        {
            id: 5,
            name: 'Aqaba Beachfront Villa',
            location: 'Aqaba',
            description: 'Modern villa with direct access to the Red Sea coral reefs and vibrant marine life.',
            price: 200,
            priceCategory: 'mid',
            capacity: 4,
            features: {
                bedrooms: 2,
                bathrooms: 1,
                area: '100 m²'
            },
            amenities: ['Wi-Fi', 'Private Beach', 'Snorkeling Gear', 'Diving Access'],
            image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
        },
        {
            id: 6,
            name: 'Amman Urban Loft',
            location: 'Amman',
            description: 'Modern loft in the heart of Amman with easy access to historical sites, markets, and vibrant nightlife.',
            price: 180,
            priceCategory: 'budget',
            capacity: 4,
            features: {
                bedrooms: 2,
                bathrooms: 1,
                area: '110 m²'
            },
            amenities: ['Wi-Fi', 'City Tours', 'Rooftop Terrace', 'Cultural Experiences'],
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
        }
    ];

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        // Show button when user scrolls down 300px
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize the page
    displayChalets(chalets);
    setupEventListeners();

    // Function to display chalets based on filters
    function displayChalets(chaletsToDisplay) {
        const chaletListings = document.getElementById('chalet-listings');
        chaletListings.innerHTML = '';

        if (chaletsToDisplay.length === 0) {
            chaletListings.innerHTML = '<p class="no-results">No chalets match your search criteria. Please try different filters.</p>';
            return;
        }
        
        // Add helper tooltip for users
        const helperTip = document.createElement('div');
        helperTip.className = 'helper-tip';
        helperTip.innerHTML = '<i class="fas fa-info-circle"></i> Click on any chalet to view more details';
        chaletListings.appendChild(helperTip);
        
        // Auto-hide the helper tip after 5 seconds
        setTimeout(() => {
            helperTip.classList.add('fade-out');
            setTimeout(() => {
                helperTip.remove();
            }, 1000);
        }, 5000);

        chaletsToDisplay.forEach(chalet => {
            const chaletCard = document.createElement('div');
            chaletCard.className = 'chalet-card';
            chaletCard.innerHTML = `
                <div class="chalet-image">
                    <img src="${chalet.image}" alt="${chalet.name}">
                </div>
                <div class="chalet-details">
                    <h3 class="chalet-name">${chalet.name}</h3>
                    <div class="chalet-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${chalet.location}</span>
                    </div>
                    <div class="chalet-features">
                        <div class="feature">
                            <i class="fas fa-bed"></i>
                            <span>${chalet.features.bedrooms} Bedrooms</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-bath"></i>
                            <span>${chalet.features.bathrooms} Bathrooms</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-vector-square"></i>
                            <span>${chalet.features.area}</span>
                        </div>
                    </div>
                    <div class="chalet-price">
                        $${chalet.price} per night
                    </div>
                    <div class="chalet-actions">
                        <a href="#" class="btn btn-primary view-details" data-chalet-id="${chalet.id}">View Details</a>
                    </div>
                </div>
            `;
            chaletListings.appendChild(chaletCard);
        });

        // No Book Now buttons anymore

        // Add event listeners to the View Details buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const chaletId = this.getAttribute('data-chalet-id');
                const selectedChalet = chalets.find(chalet => chalet.id == chaletId);
                // In a real application, this would open a modal with more details
                alert(`${selectedChalet.name}\n\n${selectedChalet.description}\n\nAmenities: ${selectedChalet.amenities.join(', ')}`);
            });
        });
    }

    // Chalet select dropdown function removed

    // Function to set up event listeners
    function setupEventListeners() {
        // Filter change event listeners
        document.getElementById('location').addEventListener('change', applyFilters);
        document.getElementById('capacity').addEventListener('change', applyFilters);
        document.getElementById('price').addEventListener('change', applyFilters);

        // Booking form removed

        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                // In a real application, this would send the form data to a server
                alert('Thank you for your message. We will get back to you soon!');
                this.reset();
            }
        });

        // Newsletter form submission
        document.getElementById('newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim() !== '') {
                // In a real application, this would subscribe the email to a newsletter
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });

        // Modal event listeners removed

        // Date input validation removed
    }

    // Function to apply filters to chalets
    function applyFilters() {
        const locationFilter = document.getElementById('location').value;
        const capacityFilter = document.getElementById('capacity').value;
        const priceFilter = document.getElementById('price').value;

        let filteredChalets = chalets;

        // Apply location filter
        if (locationFilter !== 'all') {
            filteredChalets = filteredChalets.filter(chalet => {
                const locationMatch = locationFilter === 'amman' && chalet.location === 'Amman' ||
                                    locationFilter === 'petra' && chalet.location === 'Petra' ||
                                    locationFilter === 'wadi-rum' && chalet.location === 'Wadi Rum' ||
                                    locationFilter === 'dead-sea' && chalet.location === 'Dead Sea' ||
                                    locationFilter === 'aqaba' && chalet.location === 'Aqaba' ||
                                    locationFilter === 'ajloun' && chalet.location === 'Ajloun';
                return locationMatch;
            });
        }

        // Apply capacity filter
        if (capacityFilter !== 'all') {
            const capacity = parseInt(capacityFilter);
            if (capacity === 6) { // 6+ people
                filteredChalets = filteredChalets.filter(chalet => chalet.capacity >= capacity);
            } else {
                filteredChalets = filteredChalets.filter(chalet => chalet.capacity === capacity);
            }
        }

        // Apply price filter
        if (priceFilter !== 'all') {
            filteredChalets = filteredChalets.filter(chalet => chalet.priceCategory === priceFilter);
        }

        // Update the displayed chalets
        displayChalets(filteredChalets);
    }

    // Booking form validation removed

    // Function to validate the contact form
    function validateContactForm() {
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        // Simple validation
        if (name === '') {
            alert('Please enter your name.');
            return false;
        }

        if (email === '' || !isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        if (subject === '') {
            alert('Please enter a subject.');
            return false;
        }

        if (message === '') {
            alert('Please enter a message.');
            return false;
        }

        return true;
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper function to validate phone format
    function isValidPhone(phone) {
        // This is a simple validation, in a real application you might want to use a more sophisticated regex
        const phoneRegex = /^[\d\s\+\-\(\)]{10,15}$/;
        return phoneRegex.test(phone);
    }

    // Confirmation modal function removed
});