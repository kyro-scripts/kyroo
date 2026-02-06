// Sample data - In production, this would come from a backend API
const availableDomains = [
    {
        name: 'subhub.dev',
        description: 'Perfect for development projects and portfolios',
        available: 847,
        total: 1000,
        badge: 'popular',
        provider: 'Cloudflare'
    },
    {
        name: 'free.io',
        description: 'Great for side projects and experiments',
        available: 923,
        total: 1000,
        badge: 'new',
        provider: 'Vercel'
    },
    {
        name: 'mysite.app',
        description: 'Professional domain for web applications',
        available: 656,
        total: 1000,
        badge: 'popular',
        provider: 'Netlify'
    },
    {
        name: 'dev.zone',
        description: 'Developer-focused domain for tech projects',
        available: 789,
        total: 1000,
        badge: null,
        provider: 'Cloudflare'
    },
    {
        name: 'cloud.link',
        description: 'Cloud-native applications and services',
        available: 912,
        total: 1000,
        badge: 'new',
        provider: 'AWS Route 53'
    },
    {
        name: 'project.works',
        description: 'Showcase your work and projects',
        available: 534,
        total: 1000,
        badge: 'popular',
        provider: 'DigitalOcean'
    }
];

// User's claimed subdomains (stored in localStorage)
let userSubdomains = JSON.parse(localStorage.getItem('userSubdomains')) || [];

// DOM Elements
const subdomainInput = document.getElementById('subdomain-input');
const domainSelect = document.getElementById('domain-select');
const searchBtn = document.getElementById('search-btn');
const availabilityResults = document.getElementById('availability-results');
const domainsGrid = document.getElementById('domains-grid');
const subdomainsList = document.getElementById('subdomains-list');
const subdomainCount = document.getElementById('subdomain-count');
const claimModal = document.getElementById('claim-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const claimForm = document.getElementById('claim-form');
const contributeForm = document.getElementById('contribute-form');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderDomainCards();
    renderUserSubdomains();
    updateSubdomainCount();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', checkAvailability);
    subdomainInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAvailability();
    });
    
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    
    claimForm.addEventListener('submit', handleClaimSubmit);
    contributeForm.addEventListener('submit', handleContributeSubmit);
    
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            filterDomains(e.target.dataset.filter);
        });
    });
    
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Check subdomain availability
function checkAvailability() {
    const subdomain = subdomainInput.value.trim().toLowerCase();
    const domain = domainSelect.value;
    
    if (!subdomain) {
        showNotification('Please enter a subdomain name', 'warning');
        return;
    }
    
    if (!isValidSubdomain(subdomain)) {
        showNotification('Invalid subdomain. Use only letters, numbers, and hyphens.', 'danger');
        return;
    }
    
    const fullDomain = `${subdomain}.${domain}`;
    
    // Simulate checking availability
    const isTaken = userSubdomains.some(s => s.fullDomain === fullDomain) || Math.random() < 0.3;
    
    displayAvailabilityResults(subdomain, domain, fullDomain, isTaken);
}

// Validate subdomain
function isValidSubdomain(subdomain) {
    const regex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
    return regex.test(subdomain) && subdomain.length >= 3 && subdomain.length <= 63;
}

// Display availability results
function displayAvailabilityResults(subdomain, domain, fullDomain, isTaken) {
    const statusClass = isTaken ? 'taken' : 'available';
    const statusText = isTaken ? 'Taken' : 'Available';
    
    let html = `
        <div class="availability-card">
            <div class="availability-header">
                <div class="availability-domain">${fullDomain}</div>
                <div class="availability-status ${statusClass}">
                    <span class="status-dot"></span>
                    ${statusText}
                </div>
            </div>
    `;
    
    if (!isTaken) {
        html += `
            <button class="claim-btn" onclick="openClaimModal('${fullDomain}')">
                Claim This Subdomain
            </button>
        `;
    }
    
    if (isTaken) {
        const alternatives = generateAlternatives(subdomain, domain);
        html += `
            <div class="alternatives-section">
                <div class="alternatives-title">Available Alternatives</div>
                <div class="alternatives-grid">
                    ${alternatives.map(alt => `
                        <div class="alternative-item" onclick="openClaimModal('${alt}')">
                            <span class="alternative-name">${alt}</span>
                            <button class="claim-btn">Claim</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    
    availabilityResults.innerHTML = html;
    availabilityResults.classList.add('active');
}

// Generate alternative subdomain suggestions
function generateAlternatives(subdomain, domain) {
    const suffixes = ['app', 'dev', 'web', 'site', 'pro', 'hub'];
    const prefixes = ['my', 'get', 'the', 'new', 'try'];
    const alternatives = [];
    
    // Add suffix variations
    for (let i = 0; i < 2; i++) {
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        alternatives.push(`${subdomain}-${suffix}.${domain}`);
    }
    
    // Add prefix variations
    for (let i = 0; i < 2; i++) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        alternatives.push(`${prefix}${subdomain}.${domain}`);
    }
    
    // Add number variations
    alternatives.push(`${subdomain}${Math.floor(Math.random() * 100)}.${domain}`);
    alternatives.push(`${subdomain}${new Date().getFullYear()}.${domain}`);
    
    return alternatives.slice(0, 6);
}

// Open claim modal
function openClaimModal(fullDomain) {
    if (userSubdomains.length >= 5) {
        showNotification('You have reached the maximum of 5 subdomains', 'warning');
        return;
    }
    
    document.getElementById('modal-subdomain').textContent = fullDomain;
    claimModal.setAttribute('data-domain', fullDomain);
    claimModal.classList.add('active');
}

// Close modal
function closeModal() {
    claimModal.classList.remove('active');
}

// Handle claim form submission
function handleClaimSubmit(e) {
    e.preventDefault();
    
    const fullDomain = claimModal.getAttribute('data-domain');
    const targetUrl = document.getElementById('target-url').value;
    const recordType = document.getElementById('record-type').value;
    
    if (userSubdomains.some(s => s.fullDomain === fullDomain)) {
        showNotification('You already own this subdomain', 'warning');
        return;
    }
    
    const newSubdomain = {
        fullDomain,
        targetUrl,
        recordType,
        createdAt: new Date().toISOString()
    };
    
    userSubdomains.push(newSubdomain);
    localStorage.setItem('userSubdomains', JSON.stringify(userSubdomains));
    
    renderUserSubdomains();
    updateSubdomainCount();
    closeModal();
    
    // Clear form
    claimForm.reset();
    
    showNotification('Subdomain claimed successfully!', 'success');
    
    // Clear availability results
    availabilityResults.classList.remove('active');
    subdomainInput.value = '';
}

// Handle contribute form submission
function handleContributeSubmit(e) {
    e.preventDefault();
    
    const domainName = document.getElementById('domain-name').value;
    const dnsProvider = document.getElementById('dns-provider').value;
    const contactEmail = document.getElementById('contact-email').value;
    
    // In production, this would send data to backend
    showNotification('Thank you for contributing! We will review your domain.', 'success');
    
    contributeForm.reset();
}

// Render domain cards
function renderDomainCards(filter = 'all') {
    let domains = availableDomains;
    
    if (filter === 'popular') {
        domains = domains.filter(d => d.badge === 'popular');
    } else if (filter === 'new') {
        domains = domains.filter(d => d.badge === 'new');
    }
    
    domainsGrid.innerHTML = domains.map(domain => {
        const percentage = ((domain.total - domain.available) / domain.total * 100).toFixed(0);
        
        return `
            <div class="domain-card">
                <div class="domain-header">
                    <div class="domain-name">.${domain.name}</div>
                    ${domain.badge ? `<div class="domain-badge ${domain.badge}">${domain.badge}</div>` : ''}
                </div>
                <div class="domain-stats">
                    <div class="domain-stat">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M8 4v4l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        ${domain.available} available
                    </div>
                    <div class="domain-stat">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M5 7h6M5 10h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        ${percentage}% used
                    </div>
                </div>
                <div class="domain-description">
                    ${domain.description}
                </div>
                <button class="domain-action" onclick="selectDomain('${domain.name}')">
                    Use This Domain
                </button>
            </div>
        `;
    }).join('');
}

// Filter domains
function filterDomains(filter) {
    renderDomainCards(filter);
}

// Select domain from card
function selectDomain(domainName) {
    domainSelect.value = domainName;
    subdomainInput.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showNotification(`Selected .${domainName}`, 'success');
}

// Render user subdomains
function renderUserSubdomains() {
    if (userSubdomains.length === 0) {
        subdomainsList.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" opacity="0.3"/>
                    <path d="M32 20v24M20 32h24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <p>No subdomains claimed yet</p>
                <span>Search for a subdomain above to get started</span>
            </div>
        `;
        return;
    }
    
    subdomainsList.innerHTML = userSubdomains.map((subdomain, index) => `
        <div class="subdomain-item">
            <div class="subdomain-info">
                <div class="subdomain-url">${subdomain.fullDomain}</div>
                <div class="subdomain-target">
                    → <a href="${subdomain.targetUrl}" target="_blank">${subdomain.targetUrl}</a>
                    <span style="margin-left: 1rem; opacity: 0.5;">(${subdomain.recordType})</span>
                </div>
            </div>
            <div class="subdomain-actions">
                <button class="action-btn" onclick="editSubdomain(${index})">Edit</button>
                <button class="action-btn danger" onclick="deleteSubdomain(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Update subdomain count
function updateSubdomainCount() {
    subdomainCount.textContent = `${userSubdomains.length}/5 used`;
}

// Delete subdomain
function deleteSubdomain(index) {
    if (confirm('Are you sure you want to delete this subdomain?')) {
        userSubdomains.splice(index, 1);
        localStorage.setItem('userSubdomains', JSON.stringify(userSubdomains));
        renderUserSubdomains();
        updateSubdomainCount();
        showNotification('Subdomain deleted', 'success');
    }
}

// Edit subdomain
function editSubdomain(index) {
    const subdomain = userSubdomains[index];
    
    const newTargetUrl = prompt('Enter new target URL:', subdomain.targetUrl);
    if (newTargetUrl && newTargetUrl !== subdomain.targetUrl) {
        userSubdomains[index].targetUrl = newTargetUrl;
        localStorage.setItem('userSubdomains', JSON.stringify(userSubdomains));
        renderUserSubdomains();
        showNotification('Subdomain updated', 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const colors = {
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#6366f1'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.4s ease-out;
        max-width: 400px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Add animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Make functions globally accessible
window.openClaimModal = openClaimModal;
window.selectDomain = selectDomain;
window.deleteSubdomain = deleteSubdomain;
window.editSubdomain = editSubdomain;
