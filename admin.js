document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = checkAuthStatus();
    
    // Get current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Handle login page
    if (currentPage === 'admin.html') {
        setupLoginPage();
    }
    
    // Handle dashboard page
    if (currentPage === 'admin-dashboard.html') {
        if (!isLoggedIn) {
            // Redirect to login if not authenticated
            window.location.href = 'admin.html';
        } else {
            setupDashboard();
        }
    }
    
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
    
    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});

// Authentication Functions
function checkAuthStatus() {
    const token = localStorage.getItem('adminToken');
    const expiry = localStorage.getItem('tokenExpiry');
    
    if (!token || !expiry) {
        return false;
    }
    
    // Check if token is expired
    if (new Date().getTime() > parseInt(expiry)) {
        // Clear expired token
        localStorage.removeItem('adminToken');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('adminName');
        return false;
    }
    
    return true;
}

function setupLoginPage() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('login-error');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple authentication (in a real app, this would be a server request)
            if (username === 'admin' && password === 'admin123') {
                // Set authentication token (would be from server in real app)
                const token = 'sample-token-' + Math.random().toString(36).substring(2);
                const expiry = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
                
                localStorage.setItem('adminToken', token);
                localStorage.setItem('tokenExpiry', expiry);
                localStorage.setItem('adminName', 'Admin User');
                
                // Redirect to dashboard
                window.location.href = 'admin-dashboard.html';
            } else {
                // Show error
                errorMessage.textContent = 'Invalid username or password';
                errorMessage.style.display = 'block';
            }
        });
    }
}

function logout() {
    // Clear authentication data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('adminName');
    
    // Redirect to login page
    window.location.href = 'admin.html';
}

// Dashboard Functions
function setupDashboard() {
    // Set admin name
    const adminNameElement = document.getElementById('admin-name');
    if (adminNameElement) {
        adminNameElement.textContent = localStorage.getItem('adminName') || 'Admin';
    }
    
    // Setup tab navigation
    setupTabs();
    
    // Load initial data
    loadChalets();
    loadBookings();
    loadUsers();
    
    // Setup modal functionality
    setupModals();
    
    // Setup form handlers
    setupChaletForm();
    setupUserForm();
    setupBookingDetails();
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
}

function setupModals() {
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    
    // Get all elements that close the modal
    const closeButtons = document.querySelectorAll('.close-modal, #cancel-chalet, #cancel-user, #cancel-delete, #back-to-bookings');
    
    // Add click event to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Setup add chalet button
    const addChaletBtn = document.getElementById('add-chalet-btn');
    if (addChaletBtn) {
        addChaletBtn.addEventListener('click', function() {
            document.getElementById('chalet-modal-title').textContent = 'Add New Chalet';
            document.getElementById('chalet-form').reset();
            document.getElementById('chalet-id').value = '';
            document.getElementById('chalet-modal').style.display = 'block';
        });
    }
    
    // Setup add user button
    const addUserBtn = document.getElementById('add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            document.getElementById('user-modal-title').textContent = 'Add New User';
            document.getElementById('user-form').reset();
            document.getElementById('user-id').value = '';
            document.getElementById('user-modal').style.display = 'block';
        });
    }
}

// Sample data loading functions (in a real app, these would fetch from a server)
function loadChalets() {
    const chalets = [
        { id: 1, name: 'Ajloun Forest Lodge', location: 'Ajloun', price: 120, status: 'active' },
        { id: 2, name: 'Dead Sea Luxury Villa', location: 'Dead Sea', price: 350, status: 'active' },
        { id: 3, name: 'Petra Desert Retreat', location: 'Petra', price: 150, status: 'maintenance' },
        { id: 4, name: 'Aqaba Beachfront Chalet', location: 'Aqaba', price: 200, status: 'active' },
        { id: 5, name: 'Amman City View Suite', location: 'Amman', price: 180, status: 'inactive' }
    ];
    
    const chaletsTable = document.getElementById('chalets-table');
    if (chaletsTable) {
        const tbody = chaletsTable.querySelector('tbody');
        tbody.innerHTML = '';
        
        chalets.forEach(chalet => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${chalet.id}</td>
                <td>${chalet.name}</td>
                <td>${chalet.location}</td>
                <td>$${chalet.price}</td>
                <td><span class="status ${chalet.status}">${chalet.status}</span></td>
                <td class="actions">
                    <button class="edit-btn" data-id="${chalet.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${chalet.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        // Add event listeners to edit and delete buttons
        setupChaletActions();
    }
    
    // Update total chalets count
    const totalChaletsElement = document.getElementById('total-chalets');
    if (totalChaletsElement) {
        totalChaletsElement.textContent = chalets.length;
    }
}

function loadBookings() {
    const bookings = [
        { id: 1, customer: 'John Doe', chalet: 'Ajloun Forest Lodge', checkin: '2023-07-15', checkout: '2023-07-18', status: 'confirmed' },
        { id: 2, customer: 'Jane Smith', chalet: 'Dead Sea Luxury Villa', checkin: '2023-07-20', checkout: '2023-07-25', status: 'pending' },
        { id: 3, customer: 'Robert Johnson', chalet: 'Petra Desert Retreat', checkin: '2023-08-01', checkout: '2023-08-05', status: 'pending' },
        { id: 4, customer: 'Emily Davis', chalet: 'Aqaba Beachfront Chalet', checkin: '2023-08-10', checkout: '2023-08-15', status: 'confirmed' },
        { id: 5, customer: 'Michael Brown', chalet: 'Amman City View Suite', checkin: '2023-08-20', checkout: '2023-08-22', status: 'cancelled' },
        { id: 6, customer: 'Sarah Wilson', chalet: 'Dead Sea Luxury Villa', checkin: '2023-09-01', checkout: '2023-09-05', status: 'pending' },
        { id: 7, customer: 'David Miller', chalet: 'Ajloun Forest Lodge', checkin: '2023-09-10', checkout: '2023-09-12', status: 'pending' },
        { id: 8, customer: 'Lisa Taylor', chalet: 'Petra Desert Retreat', checkin: '2023-09-15', checkout: '2023-09-20', status: 'pending' }
    ];
    
    const bookingsTable = document.getElementById('bookings-table');
    if (bookingsTable) {
        const tbody = bookingsTable.querySelector('tbody');
        tbody.innerHTML = '';
        
        bookings.forEach(booking => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${booking.id}</td>
                <td>${booking.customer}</td>
                <td>${booking.chalet}</td>
                <td>${booking.checkin}</td>
                <td>${booking.checkout}</td>
                <td><span class="status ${booking.status}">${booking.status}</span></td>
                <td class="actions">
                    <button class="view-btn" data-id="${booking.id}"><i class="fas fa-eye"></i></button>
                    <button class="delete-btn" data-id="${booking.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        // Add event listeners to view and delete buttons
        setupBookingActions();
    }
    
    // Update pending bookings count
    const pendingBookingsElement = document.getElementById('pending-bookings');
    if (pendingBookingsElement) {
        const pendingCount = bookings.filter(booking => booking.status === 'pending').length;
        pendingBookingsElement.textContent = pendingCount;
    }
    
    // Setup booking status filter
    const bookingStatusFilter = document.getElementById('booking-status');
    if (bookingStatusFilter) {
        bookingStatusFilter.addEventListener('change', function() {
            const status = this.value;
            const rows = document.querySelectorAll('#bookings-table tbody tr');
            
            rows.forEach(row => {
                const statusCell = row.querySelector('td:nth-child(6) .status');
                if (status === 'all' || statusCell.classList.contains(status)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

function loadUsers() {
    const users = [
        { id: 1, name: 'Admin User', email: 'admin@revafarms.com', role: 'admin', joined: '2023-01-01' },
        { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user', joined: '2023-03-15' },
        { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'user', joined: '2023-04-20' },
        { id: 4, name: 'Robert Johnson', email: 'robert@example.com', role: 'user', joined: '2023-05-10' },
        { id: 5, name: 'Emily Davis', email: 'emily@example.com', role: 'user', joined: '2023-06-05' }
    ];
    
    const usersTable = document.getElementById('users-table');
    if (usersTable) {
        const tbody = usersTable.querySelector('tbody');
        tbody.innerHTML = '';
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.joined}</td>
                <td class="actions">
                    <button class="edit-btn" data-id="${user.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${user.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        // Add event listeners to edit and delete buttons
        setupUserActions();
    }
    
    // Update total users count
    const totalUsersElement = document.getElementById('total-users');
    if (totalUsersElement) {
        totalUsersElement.textContent = users.length;
    }
}

// Setup action handlers for tables
function setupChaletActions() {
    // Edit chalet buttons
    const editButtons = document.querySelectorAll('#chalets-table .edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chaletId = this.getAttribute('data-id');
            // In a real app, fetch chalet data from server
            // For demo, we'll use sample data
            const chalet = {
                id: chaletId,
                name: 'Ajloun Forest Lodge',
                location: 'Ajloun',
                price: 120,
                description: 'A serene retreat nestled in the Ajloun Forest Reserve with panoramic views.',
                bedrooms: 2,
                bathrooms: 2,
                capacity: 4,
                image: 'https://images.unsplash.com/photo-1520984032042-162d526883e0',
                status: 'active',
                amenities: ['Wi-Fi', 'Pool']
            };
            
            // Populate form
            document.getElementById('chalet-modal-title').textContent = 'Edit Chalet';
            document.getElementById('chalet-id').value = chalet.id;
            document.getElementById('chalet-name').value = chalet.name;
            document.getElementById('chalet-location').value = chalet.location;
            document.getElementById('chalet-price').value = chalet.price;
            document.getElementById('chalet-description').value = chalet.description;
            document.getElementById('chalet-bedrooms').value = chalet.bedrooms;
            document.getElementById('chalet-bathrooms').value = chalet.bathrooms;
            document.getElementById('chalet-capacity').value = chalet.capacity;
            document.getElementById('chalet-image').value = chalet.image;
            document.getElementById('chalet-status').value = chalet.status;
            
            // Set amenities checkboxes
            const amenityCheckboxes = document.querySelectorAll('input[name="amenities"]');
            amenityCheckboxes.forEach(checkbox => {
                checkbox.checked = chalet.amenities.includes(checkbox.value);
            });
            
            // Show modal
            document.getElementById('chalet-modal').style.display = 'block';
        });
    });
    
    // Delete chalet buttons
    const deleteButtons = document.querySelectorAll('#chalets-table .delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chaletId = this.getAttribute('data-id');
            const chaletName = this.closest('tr').querySelector('td:nth-child(2)').textContent;
            
            // Set delete confirmation message
            document.getElementById('delete-message').textContent = `Are you sure you want to delete the chalet "${chaletName}"?`;
            
            // Setup confirm delete button
            const confirmDeleteBtn = document.getElementById('confirm-delete');
            confirmDeleteBtn.onclick = function() {
                // In a real app, send delete request to server
                // For demo, just remove the row
                const row = button.closest('tr');
                row.remove();
                
                // Update total count
                const totalChaletsElement = document.getElementById('total-chalets');
                if (totalChaletsElement) {
                    totalChaletsElement.textContent = parseInt(totalChaletsElement.textContent) - 1;
                }
                
                // Hide modal
                document.getElementById('delete-confirm-modal').style.display = 'none';
            };
            
            // Show modal
            document.getElementById('delete-confirm-modal').style.display = 'block';
        });
    });
}

function setupBookingActions() {
    // View booking buttons
    const viewButtons = document.querySelectorAll('#bookings-table .view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            // In a real app, fetch booking data from server
            // For demo, we'll use sample data
            const booking = {
                id: bookingId,
                status: 'pending',
                checkin: '2023-07-20',
                checkout: '2023-07-25',
                guests: 2,
                price: '$700',
                customer: {
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    phone: '+1 234 567 8901'
                },
                chalet: {
                    name: 'Dead Sea Luxury Villa',
                    location: 'Dead Sea'
                },
                notes: 'Special request for early check-in if possible. Celebrating anniversary.'
            };
            
            // Populate booking details
            document.getElementById('booking-id').textContent = booking.id;
            document.getElementById('booking-status-detail').textContent = booking.status;
            document.getElementById('booking-checkin').textContent = booking.checkin;
            document.getElementById('booking-checkout').textContent = booking.checkout;
            document.getElementById('booking-guests').textContent = booking.guests;
            document.getElementById('booking-price').textContent = booking.price;
            document.getElementById('customer-name').textContent = booking.customer.name;
            document.getElementById('customer-email').textContent = booking.customer.email;
            document.getElementById('customer-phone').textContent = booking.customer.phone;
            document.getElementById('chalet-name-detail').textContent = booking.chalet.name;
            document.getElementById('chalet-location-detail').textContent = booking.chalet.location;
            document.getElementById('booking-notes-content').textContent = booking.notes || 'No notes provided.';
            
            // Show/hide action buttons based on status
            const confirmBtn = document.getElementById('confirm-booking');
            const cancelBtn = document.getElementById('cancel-booking');
            
            if (booking.status === 'pending') {
                confirmBtn.style.display = 'block';
                cancelBtn.style.display = 'block';
            } else if (booking.status === 'confirmed') {
                confirmBtn.style.display = 'none';
                cancelBtn.style.display = 'block';
            } else {
                confirmBtn.style.display = 'none';
                cancelBtn.style.display = 'none';
            }
            
            // Setup confirm and cancel buttons
            confirmBtn.onclick = function() {
                // In a real app, send confirmation request to server
                // For demo, just update the status
                document.getElementById('booking-status-detail').textContent = 'confirmed';
                const statusElement = button.closest('tr').querySelector('.status');
                statusElement.textContent = 'confirmed';
                statusElement.className = 'status confirmed';
                
                // Update pending count
                const pendingBookingsElement = document.getElementById('pending-bookings');
                if (pendingBookingsElement) {
                    pendingBookingsElement.textContent = parseInt(pendingBookingsElement.textContent) - 1;
                }
                
                // Hide confirm button
                confirmBtn.style.display = 'none';
            };
            
            cancelBtn.onclick = function() {
                // In a real app, send cancellation request to server
                // For demo, just update the status
                document.getElementById('booking-status-detail').textContent = 'cancelled';
                const statusElement = button.closest('tr').querySelector('.status');
                statusElement.textContent = 'cancelled';
                statusElement.className = 'status cancelled';
                
                // Update pending count if it was pending
                if (booking.status === 'pending') {
                    const pendingBookingsElement = document.getElementById('pending-bookings');
                    if (pendingBookingsElement) {
                        pendingBookingsElement.textContent = parseInt(pendingBookingsElement.textContent) - 1;
                    }
                }
                
                // Hide both buttons
                confirmBtn.style.display = 'none';
                cancelBtn.style.display = 'none';
            };
            
            // Show modal
            document.getElementById('booking-details-modal').style.display = 'block';
        });
    });
    
    // Delete booking buttons
    const deleteButtons = document.querySelectorAll('#bookings-table .delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            const customerName = this.closest('tr').querySelector('td:nth-child(2)').textContent;
            
            // Set delete confirmation message
            document.getElementById('delete-message').textContent = `Are you sure you want to delete the booking for "${customerName}"?`;
            
            // Setup confirm delete button
            const confirmDeleteBtn = document.getElementById('confirm-delete');
            confirmDeleteBtn.onclick = function() {
                // In a real app, send delete request to server
                // For demo, just remove the row
                const row = button.closest('tr');
                const statusElement = row.querySelector('.status');
                
                // Update pending count if it was pending
                if (statusElement.classList.contains('pending')) {
                    const pendingBookingsElement = document.getElementById('pending-bookings');
                    if (pendingBookingsElement) {
                        pendingBookingsElement.textContent = parseInt(pendingBookingsElement.textContent) - 1;
                    }
                }
                
                row.remove();
                
                // Hide modal
                document.getElementById('delete-confirm-modal').style.display = 'none';
            };
            
            // Show modal
            document.getElementById('delete-confirm-modal').style.display = 'block';
        });
    });
}

function setupUserActions() {
    // Edit user buttons
    const editButtons = document.querySelectorAll('#users-table .edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            // In a real app, fetch user data from server
            // For demo, we'll use sample data
            const user = {
                id: userId,
                firstname: 'John',
                lastname: 'Doe',
                email: 'john@example.com',
                role: 'user'
            };
            
            // Populate form
            document.getElementById('user-modal-title').textContent = 'Edit User';
            document.getElementById('user-id').value = user.id;
            document.getElementById('user-firstname').value = user.firstname;
            document.getElementById('user-lastname').value = user.lastname;
            document.getElementById('user-email').value = user.email;
            document.getElementById('user-role').value = user.role;
            
            // Clear password field for edit
            document.getElementById('user-password').value = '';
            
            // Show modal
            document.getElementById('user-modal').style.display = 'block';
        });
    });
    
    // Delete user buttons
    const deleteButtons = document.querySelectorAll('#users-table .delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            const userName = this.closest('tr').querySelector('td:nth-child(2)').textContent;
            
            // Set delete confirmation message
            document.getElementById('delete-message').textContent = `Are you sure you want to delete the user "${userName}"?`;
            
            // Setup confirm delete button
            const confirmDeleteBtn = document.getElementById('confirm-delete');
            confirmDeleteBtn.onclick = function() {
                // In a real app, send delete request to server
                // For demo, just remove the row
                const row = button.closest('tr');
                row.remove();
                
                // Update total count
                const totalUsersElement = document.getElementById('total-users');
                if (totalUsersElement) {
                    totalUsersElement.textContent = parseInt(totalUsersElement.textContent) - 1;
                }
                
                // Hide modal
                document.getElementById('delete-confirm-modal').style.display = 'none';
            };
            
            // Show modal
            document.getElementById('delete-confirm-modal').style.display = 'block';
        });
    });
}

// Form submission handlers
function setupChaletForm() {
    const chaletForm = document.getElementById('chalet-form');
    if (chaletForm) {
        chaletForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const chaletId = document.getElementById('chalet-id').value;
            const name = document.getElementById('chalet-name').value;
            const location = document.getElementById('chalet-location').value;
            const price = document.getElementById('chalet-price').value;
            
            // In a real app, send data to server
            // For demo, just update the table
            if (chaletId) {
                // Update existing chalet
                const row = document.querySelector(`#chalets-table .edit-btn[data-id="${chaletId}"]`).closest('tr');
                row.querySelector('td:nth-child(2)').textContent = name;
                row.querySelector('td:nth-child(3)').textContent = location;
                row.querySelector('td:nth-child(4)').textContent = '$' + price;
            } else {
                // Add new chalet
                const tbody = document.querySelector('#chalets-table tbody');
                const newId = parseInt(document.querySelector('#chalets-table tbody tr:last-child td:first-child').textContent) + 1;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${newId}</td>
                    <td>${name}</td>
                    <td>${location}</td>
                    <td>$${price}</td>
                    <td><span class="status active">active</span></td>
                    <td class="actions">
                        <button class="edit-btn" data-id="${newId}"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" data-id="${newId}"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                tbody.appendChild(row);
                
                // Update total count
                const totalChaletsElement = document.getElementById('total-chalets');
                if (totalChaletsElement) {
                    totalChaletsElement.textContent = parseInt(totalChaletsElement.textContent) + 1;
                }
                
                // Add event listeners to new buttons
                setupChaletActions();
            }
            
            // Hide modal
            document.getElementById('chalet-modal').style.display = 'none';
        });
    }
}

function setupUserForm() {
    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const userId = document.getElementById('user-id').value;
            const firstname = document.getElementById('user-firstname').value;
            const lastname = document.getElementById('user-lastname').value;
            const email = document.getElementById('user-email').value;
            const role = document.getElementById('user-role').value;
            
            // In a real app, send data to server
            // For demo, just update the table
            if (userId) {
                // Update existing user
                const row = document.querySelector(`#users-table .edit-btn[data-id="${userId}"]`).closest('tr');
                row.querySelector('td:nth-child(2)').textContent = firstname + ' ' + lastname;
                row.querySelector('td:nth-child(3)').textContent = email;
                row.querySelector('td:nth-child(4)').textContent = role;
            } else {
                // Add new user
                const tbody = document.querySelector('#users-table tbody');
                const newId = parseInt(document.querySelector('#users-table tbody tr:last-child td:first-child').textContent) + 1;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${newId}</td>
                    <td>${firstname} ${lastname}</td>
                    <td>${email}</td>
                    <td>${role}</td>
                    <td>${new Date().toISOString().split('T')[0]}</td>
                    <td class="actions">
                        <button class="edit-btn" data-id="${newId}"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" data-id="${newId}"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                tbody.appendChild(row);
                
                // Update total count
                const totalUsersElement = document.getElementById('total-users');
                if (totalUsersElement) {
                    totalUsersElement.textContent = parseInt(totalUsersElement.textContent) + 1;
                }
                
                // Add event listeners to new buttons
                setupUserActions();
            }
            
            // Hide modal
            document.getElementById('user-modal').style.display = 'none';
        });
    }
}

function setupBookingDetails() {
    // This function is already covered in setupBookingActions
    // It handles the booking details modal and actions
}