// Datos de productos (simulando una base de datos)
const products = [
    {
        id: 1,
        name: "Camiseta Básica",
        price: 19.99,
        category: "Hombre",
        image: "/api/placeholder/250/300"
    },
    {
        id: 2,
        name: "Vestido Casual",
        price: 49.99,
        category: "Mujer",
        image: "/api/placeholder/250/300"
    },
    {
        id: 3,
        name: "Jeans Slim Fit",
        price: 39.99,
        category: "Hombre",
        image: "/api/placeholder/250/300"
    },
    {
        id: 4,
        name: "Blusa Floral",
        price: 29.99,
        category: "Mujer",
        image: "/api/placeholder/250/300"
    },
    {
        id: 5,
        name: "Sudadera con Capucha",
        price: 34.99,
        category: "Hombre",
        image: "/api/placeholder/250/300"
    },
    {
        id: 6,
        name: "Falda Plisada",
        price: 24.99,
        category: "Mujer",
        image: "/api/placeholder/250/300"
    },
    {
        id: 7,
        name: "Pantalón Deportivo",
        price: 27.99,
        category: "Niños",
        image: "/api/placeholder/250/300"
    },
    {
        id: 8,
        name: "Camiseta Estampada",
        price: 22.99,
        category: "Niños",
        image: "/api/placeholder/250/300"
    }
];

// Carrito de compras
let cart = [];

// DOM Elements
const featuredProductsGrid = document.getElementById('featured-products-grid');
const cartCount = document.querySelector('.cart-count');
const newsletterForm = document.getElementById('newsletter-form');

// Cargar productos destacados
function loadFeaturedProducts() {
    featuredProductsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">€${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
            </div>
        `;
        
        featuredProductsGrid.appendChild(productCard);
    });
    
    // Añadir event listeners a los botones de "Añadir al Carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Añadir producto al carrito
function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Comprobar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.id === productId);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartCount();
        showAddedToCartMessage(product.name);
    }
}

// Actualizar contador de productos en el carrito
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Mostrar mensaje de producto añadido
function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.classList.add('cart-message');
    message.textContent = `¡${productName} añadido al carrito!`;
    
    // Estilos para el mensaje
    message.style.position = 'fixed';
    message.style.bottom = '20px';
    message.style.right = '20px';
    message.style.backgroundColor = '#ff4757';
    message.style.color = 'white';
    message.style.padding = '10px 20px';
    message.style.borderRadius = '4px';
    message.style.zIndex = '1000';
    
    document.body.appendChild(message);
    
    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Manejar envío del formulario de newsletter
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
        // Aquí se enviaría el email a un servicio de suscripción
        // Por ahora, solo mostraremos un mensaje
        
        const message = document.createElement('div');
        message.classList.add('newsletter-message');
        message.textContent = `¡Gracias por suscribirte con ${email}!`;
        
        // Estilos para el mensaje
        message.style.backgroundColor = '#4CAF50';
        message.style.color = 'white';
        message.style.padding = '10px';
        message.style.marginTop = '10px';
        message.style.borderRadius = '4px';
        
        this.appendChild(message);
        
        // Limpiar el campo de email
        emailInput.value = '';
        
        // Eliminar el mensaje después de 5 segundos
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
});

// Inicializar la página
function init() {
    loadFeaturedProducts();
    updateCartCount();
    
    // Efecto para el botón "Comprar Ahora" en el hero
    const heroBuyButton = document.querySelector('.hero .btn');
    heroBuyButton.addEventListener('click', () => {
        window.scrollTo({
            top: document.querySelector('.featured-products').offsetTop,
            behavior: 'smooth'
        });
    });
    
    // Agregar efecto hover a las tarjetas de categorías
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Iniciar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', init);