// Initialize Feather Icons
feather.replace();

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length <= 1) { e.preventDefault(); return; }
        
        e.preventDefault();
        if (!mobileMenu.classList.contains('hidden')) { mobileMenu.classList.add('hidden'); }
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

revealElements.forEach(el => {
    observer.observe(el);
});

// Toast Notification
function showToast(message, type) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Function to generate a UUID
function generateUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

// Function to get or create a user identifier
function getUserIdentifier() {
    let userIdentifier = localStorage.getItem('userIdentifier');
    if (!userIdentifier) {
        userIdentifier = generateUUID();
        localStorage.setItem('userIdentifier', userIdentifier);
    }
    return userIdentifier;
}

// Function to fetch previous submissions
async function fetchPreviousSubmissions(identifier) {
    const response = await fetch(`/api/messages/${identifier}`);
    if (response.ok) {
        const submissions = await response.json();
        const submissionsContainer = document.getElementById('previous-submissions');
        if (submissions.length > 0) {
            submissionsContainer.innerHTML = '<h5>Previous Submissions:</h5>';
            const list = document.createElement('ul');
            submissions.forEach(submission => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${submission.name}, Email: ${submission.email}, Phone: ${submission.phone}, Message: ${submission.message}`;
                list.appendChild(listItem);
            });
            submissionsContainer.appendChild(list);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const userIdentifier = getUserIdentifier();
    document.getElementById('user-identifier').value = userIdentifier;
    fetchPreviousSubmissions(userIdentifier);

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showToast('Message sent successfully!', 'success');
            fetchPreviousSubmissions(userIdentifier);
        } else {
            showToast('Failed to send message.', 'error');
        }
    });
});


