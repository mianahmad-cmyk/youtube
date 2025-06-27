// Application State
let currentStep = 'landing';
let formData = {
    screenshot: null,
    paymentNumber: ''
};

// DOM Elements
const sections = {
    landing: document.getElementById('landing'),
    task: document.getElementById('task'),
    form: document.getElementById('form'),
    thankyou: document.getElementById('thankyou')
};

const buttons = {
    openTask: document.getElementById('openTaskBtn'),
    subscribe: document.getElementById('subscribeBtn'),
    subscribed: document.getElementById('subscribedBtn'),
    submit: document.getElementById('submitBtn')
};

const form = {
    element: document.getElementById('submissionForm'),
    screenshot: document.getElementById('screenshot'),
    paymentNumber: document.getElementById('paymentNumber'),
    fileName: document.getElementById('fileName'),
    fileUpload: document.getElementById('fileUpload')
};

// Navigation Functions
function showSection(sectionName) {
    // Hide all sections
    Object.values(sections).forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    sections[sectionName].classList.add('active');
    currentStep = sectionName;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openYouTubeChannel() {
    // Replace with actual YouTube channel URL
    const channelUrl = 'https://www.youtube.com/@NoCopyBeats-n7u';
    window.open(channelUrl, '_blank');
}

// Form Validation
function validateForm() {
    const hasScreenshot = formData.screenshot !== null;
    const hasPaymentNumber = formData.paymentNumber.trim().length > 0;
    
    buttons.submit.disabled = !(hasScreenshot && hasPaymentNumber);
    
    if (hasScreenshot && hasPaymentNumber) {
        buttons.submit.classList.remove('btn-disabled');
    } else {
        buttons.submit.classList.add('btn-disabled');
    }
}

// File Upload Handling
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        formData.screenshot = file;
        form.fileName.textContent = `✓ ${file.name}`;
        form.fileName.style.display = 'block';
        validateForm();
    }
}

// Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (formData.screenshot && formData.paymentNumber.trim()) {
        // In a real application, you would send this data to a server
        console.log('Form submitted:', {
            screenshot: formData.screenshot.name,
            paymentNumber: formData.paymentNumber
        });
        
        showSection('thankyou');
    }
}

// Payment Number Input Handling
function handlePaymentNumberChange(event) {
    formData.paymentNumber = event.target.value;
    validateForm();
}

// Drag and Drop Functionality
function handleDragOver(event) {
    event.preventDefault();
    form.fileUpload.classList.add('drag-over');
}

function handleDragLeave(event) {
    event.preventDefault();
    form.fileUpload.classList.remove('drag-over');
}

function handleDrop(event) {
    event.preventDefault();
    form.fileUpload.classList.remove('drag-over');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            form.screenshot.files = files;
            handleFileUpload({ target: { files: [file] } });
        }
    }
}

// Event Listeners
function initializeEventListeners() {
    // Navigation buttons
    buttons.openTask.addEventListener('click', () => showSection('task'));
    buttons.subscribe.addEventListener('click', openYouTubeChannel);
    buttons.subscribed.addEventListener('click', () => showSection('form'));
    
    // Form handling
    form.element.addEventListener('submit', handleFormSubmit);
    form.screenshot.addEventListener('change', handleFileUpload);
    form.paymentNumber.addEventListener('input', handlePaymentNumberChange);
    
    // Drag and drop
    form.fileUpload.addEventListener('dragover', handleDragOver);
    form.fileUpload.addEventListener('dragleave', handleDragLeave);
    form.fileUpload.addEventListener('drop', handleDrop);
    
    // File upload click handling
    form.fileUpload.addEventListener('click', () => {
        form.screenshot.click();
    });
}

// Phone Number Formatting
function formatPhoneNumber(value) {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 11 digits (Pakistani mobile numbers)
    const limited = digits.slice(0, 11);
    
    // Format as 03XX-XXXXXXX
    if (limited.length >= 4) {
        return limited.slice(0, 4) + '-' + limited.slice(4);
    }
    
    return limited;
}

// Enhanced phone number input
form.paymentNumber.addEventListener('input', function(event) {
    const formatted = formatPhoneNumber(event.target.value);
    event.target.value = formatted;
    handlePaymentNumberChange(event);
});

// Phone number validation
function validatePhoneNumber(number) {
    const digits = number.replace(/\D/g, '');
    return digits.length === 11 && digits.startsWith('03');
}

// Enhanced form validation
function validateForm() {
    const hasScreenshot = formData.screenshot !== null;
    const hasValidPaymentNumber = validatePhoneNumber(formData.paymentNumber);
    
    buttons.submit.disabled = !(hasScreenshot && hasValidPaymentNumber);
    
    // Visual feedback for phone number
    if (formData.paymentNumber.length > 0 && !hasValidPaymentNumber) {
        form.paymentNumber.style.borderColor = '#ef4444';
    } else {
        form.paymentNumber.style.borderColor = '#d1d5db';
    }
}

// Smooth animations
function addSmoothTransitions() {
    // Add loading states
    buttons.submit.addEventListener('click', function() {
        if (!this.disabled) {
            this.innerHTML = '<span class="loading-spinner"></span> Submitting...';
            this.disabled = true;
            
            // Simulate processing time
            setTimeout(() => {
                handleFormSubmit(new Event('submit'));
            }, 1000);
        }
    });
}

// Initialize Application
function initializeApp() {
    console.log('Task Reward App Initialized');
    
    // Set initial state
    showSection('landing');
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Add smooth transitions
    addSmoothTransitions();
    
    // Initial form validation
    validateForm();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Add some CSS for loading spinner
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #ffffff;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .drag-over {
        border-color: #3b82f6 !important;
        background-color: #eff6ff;
    }
    
    .btn-disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
    }
`;
document.head.appendChild(style);