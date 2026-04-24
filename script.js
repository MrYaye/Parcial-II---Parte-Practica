// ============ INICIALIZACIÓN ============
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbarEvents();
    initializeCardEvents();
    initializeButtonEvents();
    initializeSearchEvents();
});

// ============ NAVBAR EVENTS ============
function initializeNavbarEvents() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionName = this.textContent.trim();
            
            navLinks.forEach(l => {
                l.style.borderBottom = 'none';
                l.style.color = '#000000';
            });
            this.style.borderBottom = '3px solid #00a8e1';
            this.style.color = '#00a8e1';
            
            handleNavigation(sectionName);
        });
        
        link.addEventListener('mouseenter', function() {
            this.style.opacity = '0.7';
            this.style.cursor = 'pointer';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

// ============ MANEJO DE NAVEGACIÓN ============
function handleNavigation(section) {
    const cleanSection = section.toUpperCase();
    
    if (cleanSection.includes('DISNEY')) {
        scrollToSection('.explore-section');
        showNotification('📺 Navegando a Disney+...');
    } else if (cleanSection.includes('PARKS')) {
        scrollToSection('.vacation-section');
        showNotification('✈️ Navegando a Parks & Travel...');
    } else if (cleanSection.includes('MOVIES')) {
        scrollToSection('.coming-soon-section');
        showNotification('🎬 Navegando a Películas...');
    } else if (cleanSection.includes('SHOP')) {
        scrollToSection('.featured-section');
        showNotification('🛍️ Navegando a Tienda...');
    } else if (cleanSection.includes('MORE')) {
        scrollToSection('.offers-section');
        showNotification('⭐ Más Información...');
    }
}

// ============ FUNCIONES DE NAVEGACIÓN ============
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============ FEATURED CARDS EVENTS ============
function initializeCardEvents() {
    const cards = document.querySelectorAll('.featured-card');
    
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
    });
}

// ============ BUTTON EVENTS ============
function initializeButtonEvents() {
    const actionButtons = document.querySelectorAll('.btn-small, .btn-small-dark, .btn-vacation, .btn-offers');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cardTitle = this.closest('[class*="card"], section')?.querySelector('h3, h4')?.textContent || 'Acción';
            const buttonText = this.textContent;
            
            showNotification(`✅ ${buttonText}`);
            
            const originalText = this.textContent;
            const originalBg = this.style.backgroundColor;
            this.textContent = '✓ Procesando...';
            this.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = originalBg;
            }, 2000);
        });
    });
    
    const mainButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    mainButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification(`🎬 ${this.textContent}`);
        });
    });
}

// ============ SEARCH EVENTS ============
function initializeSearchEvents() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
        
        searchInput.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 10px rgba(0, 168, 225, 0.5)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });
    }
}

// ============ FUNCIONES DE BÚSQUEDA ============
function performSearch(query) {
    if (query.trim() === '') {
        showNotification('⚠️ Ingresa un término de búsqueda');
        return;
    }
    
    const results = searchContent(query);
    if (results.length === 0) {
        showNotification(`❌ Sin resultados para: "${query}"`);
    } else {
        showNotification(`✅ ${results.length} resultados encontrados`);
    }
    
    document.querySelector('.search-input').value = '';
}

function searchContent(query) {
    const lowerQuery = query.toLowerCase();
    const allTitles = Array.from(document.querySelectorAll('h3, h4')).map(el => el.textContent);
    
    return allTitles.filter(title => 
        title.toLowerCase().includes(lowerQuery)
    );
}

// ============ FUNCIÓN DE NOTIFICACIÓN ============
function showNotification(message) {
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #2ecc71;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============ ANIMACIONES ============
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
