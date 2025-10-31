// Menu Loader Module - Fetch and render menu from JSON
export async function loadMenu() {
    try {
        const response = await fetch('data/menu.json');
        const menuData = await response.json();
        
        renderMenuSection('burgers', menuData.burgers);
        renderMenuSection('sides', menuData.sides);
        renderMenuSection('beverages', menuData.beverages);
    } catch (error) {
        console.error('Error loading menu:', error);
    }
}

function renderMenuSection(sectionId, items) {
    const container = document.getElementById(`${sectionId}-container`);
    if (!container) return;

    container.innerHTML = items.map(item => `
        <div class="menu-item bg-forest/30 backdrop-blur-sm p-6 rounded-lg border border-gold/20 hover:border-gold/40 transition-all duration-300 group">
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <span class="text-4xl">${item.image}</span>
                        <h3 class="text-2xl font-display text-gold group-hover:text-gold-light transition-colors">
                            ${item.name}
                        </h3>
                    </div>
                    ${item.badge ? `
                        <span class="inline-block px-3 py-1 text-xs font-bold rounded-full ${getBadgeClass(item.badge)} mb-2">
                            ${item.badgeText || item.badge.toUpperCase()}
                        </span>
                    ` : ''}
                    <p class="text-gray-300 text-sm leading-relaxed">
                        ${item.description}
                    </p>
                </div>
                <div class="ml-4 flex-shrink-0">
                    <span class="text-2xl font-bold text-gold">$${item.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getBadgeClass(badge) {
    const badgeClasses = {
        'popular': 'bg-gold/20 text-gold',
        'new': 'bg-green-500/20 text-green-400',
        'premium': 'bg-purple-500/20 text-purple-400',
        'vegan': 'bg-emerald-500/20 text-emerald-400',
        'spicy': 'bg-red-500/20 text-red-400',
        'seasonal': 'bg-orange-500/20 text-orange-400'
    };
    return badgeClasses[badge] || 'bg-gold/20 text-gold';
}
