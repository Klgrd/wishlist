const toggleButton = document.querySelector('.filter-toggle-button');
const filterOptions = document.getElementById('filter-options');
const wishlist = document.getElementById('wishlist');

function sortWishlist(direction) {
    const items = Array.from(wishlist.querySelectorAll('.wishlist-item'));

    items.sort((a, b) => {
        const priceTextA = a.querySelector('.item-price').textContent;
        const priceTextB = b.querySelector('.item-price').textContent;

        const priceA = parseFloat(priceTextA.replace(',', '.').replace('€', '').replace(/\s/g, ''));
        const priceB = parseFloat(priceTextB.replace(',', '.').replace('€', '').replace(/\s/g, ''));

        if (direction === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });

    wishlist.style.opacity = '0';

    setTimeout(() => {
        wishlist.innerHTML = '';
        items.forEach(item => {
            wishlist.appendChild(item);
        });
        wishlist.style.opacity = '1';
    }, 200);

    console.log(`La liste a été triée par prix (${direction === 'asc' ? 'croissant' : 'décroissant'}) !`);
}

toggleButton.addEventListener('click', () => {
    event.stopPropagation();
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', !isExpanded);
    filterOptions.classList.toggle('hidden');
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

wishlist.addEventListener('click', (event) => {
    if (event.target.classList.contains('learn-more-btn')) {
        const item = event.target.closest('.wishlist-item');
        if (item) {
            const details = item.querySelector('.item-details');
            details.classList.toggle('hidden');
        }
    }
});
