const toggleButton = document.querySelector('.filter-toggle-button');
const filterOptions = document.getElementById('filter-options');
const wishlist = document.getElementById('wishlist');
let allItems = []; // Pour stocker tous les produits chargés

function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
}

function renderWishlist(items) {
    wishlist.innerHTML = ''; // Vider la liste actuelle
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'wishlist-item';

        // Contenu HTML basé sur les données de l'item
        // 1. On gère l'affichage du prix
        let priceHtml = '';
        if (item.price !== null) {
            priceHtml = `<span class="item-price">${formatPrice(item.price)}`;
            if (item.originalPrice) {
                priceHtml += ` <del>${formatPrice(item.originalPrice)}</del>`;
            }
            priceHtml += `</span>`;
        }

        // 2. On gère l'affichage du tag
        const tagHtml = item.tag ? `<span class="tag">${item.tag}</span>` : '';

        // 3. On gère l'affichage des détails (bouton + texte) s'ils existent
        let detailsHtml = '';
        if (item.details) {
            detailsHtml = `
                <button class="learn-more-btn">En savoir plus</button>
                <div class="item-details hidden">
                    <p>${item.details}</p>
                </div>`;
        }

        const linkOpen = item.productUrl ? `<a href="${item.productUrl}" target="_blank">` : '<a>';
        const linkClose = '</a>';

        listItem.innerHTML = `
            ${linkOpen}
                <img src="${item.imageUrl}" alt="${item.title}">
            ${linkClose}
            <span class="item-title">${item.title}</span>
            ${priceHtml}
            ${tagHtml}
            ${detailsHtml}
        `;
        wishlist.appendChild(listItem);
    });
}

async function loadItems() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allItems = await response.json();
        renderWishlist(allItems);
    } catch (error) {
        console.error("Impossible de charger les produits:", error);
        wishlist.innerHTML = "<p>Erreur lors du chargement des articles. Veuillez réessayer plus tard.</p>";
    }
}

function sortWishlist(direction) {
    const sortedItems = [...allItems].sort((a, b) => {
        // Mettre les articles sans prix à la fin
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return direction === 'asc' ? a.price - b.price : b.price - a.price;
    });
    
    wishlist.style.opacity = '0';
    setTimeout(() => {
        renderWishlist(sortedItems);
        wishlist.style.opacity = '1';
    }, 200);
}

// --- Écouteurs d'événements ---

// Charger les articles au démarrage
document.addEventListener('DOMContentLoaded', loadItems);

toggleButton.addEventListener('click', () => {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', !isExpanded);
    filterOptions.classList.toggle('hidden');
    event.stopPropagation();
});

filterOptions.addEventListener('click', (event) => {
    if (event.target.classList.contains('sort-button')) {
        const sortDirection = event.target.dataset.sort;
        sortWishlist(sortDirection);
        filterOptions.classList.add('hidden');
        toggleButton.setAttribute('aria-expanded', 'false');
    }
});

document.addEventListener('click', () => {
    filterOptions.classList.add('hidden');
    toggleButton.setAttribute('aria-expanded', 'false');
});

wishlist.addEventListener('click', (e) => {
    if (e.target.classList.contains('learn-more-btn')) {
        e.target.nextElementSibling.classList.toggle('hidden');
    }
});
