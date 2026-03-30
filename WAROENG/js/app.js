// ====================================================
// WAROENG SANOEM HUMAIRA BERKAH - MAIN APPLICATION
// ====================================================

const AppStore = {
    user: null,
    products: [
        { id: 1, name: 'Beras Premium 5Kg', price: 75000, stock: 20, category: 'sembako', icon: '🌾' },
        { id: 2, name: 'Minyak Goreng 2L', price: 34000, stock: 15, category: 'sembako', icon: '🛢️' },
        { id: 3, name: 'Gula Pasir 1Kg', price: 16000, stock: 30, category: 'sembako', icon: '🍚' },
        { id: 4, name: 'Telur Ayam 1Kg', price: 28000, stock: 10, category: 'sembako', icon: '🥚' },
        { id: 5, name: 'Garam Halus 500g', price: 5000, stock: 50, category: 'sembako', icon: '🧂' },
        { id: 6, name: 'Kecap Manis 600ml', price: 15000, stock: 25, category: 'sembako', icon: '🍶' },
        { id: 7, name: 'Kopi Sachet 10x25g', price: 2500, stock: 150, category: 'minuman', icon: '☕' },
        { id: 8, name: 'Susu UHT 200ml', price: 5500, stock: 45, category: 'minuman', icon: '🥛' },
        { id: 9, name: 'Air Mineral 600ml', price: 3500, stock: 100, category: 'minuman', icon: '💧' },
        { id: 10, name: 'Teh Hijau Sachet 25x2g', price: 8000, stock: 30, category: 'minuman', icon: '🍵' },
        { id: 11, name: 'Mie Instan Goreng', price: 3000, stock: 100, category: 'snack', icon: '🍜' },
        { id: 12, name: 'Roti Tawar Putih', price: 12000, stock: 8, category: 'snack', icon: '🍞' },
        { id: 13, name: 'Keripik Kentang 75g', price: 8500, stock: 40, category: 'snack', icon: '🥒' },
        { id: 14, name: 'Biskuit Marie 330g', price: 10000, stock: 22, category: 'snack', icon: '🍪' },
        { id: 15, name: 'Rokok Kretek 16 Batang', price: 25000, stock: 50, category: 'rokok', icon: '🚬' },
        { id: 16, name: 'Rokok Mild 16 Batang', price: 28000, stock: 45, category: 'rokok', icon: '🚬' },
        { id: 17, name: 'Rokok Filter 12 Batang', price: 20000, stock: 35, category: 'rokok', icon: '🚬' },
        { id: 18, name: 'Rokok Premium 1 Batang', price: 3000, stock: 200, category: 'rokok', icon: '🚬' }
    ],
    cart: [],
    transactions: getFromLocalStorage('transactions') || [],
    customCategories: getFromLocalStorage('customCategories') || [],
    currentPage: 'pos',
    currentCategory: 'all'
};

const TokenCart = {
    items: [],
    total: 0
};

let currentPosMode = 'barang';
let currentTokenOperator = 'telkomsel';

// ============================================
// TOKEN OPERATOR DATA
// ============================================

const TokenOperators = {
    telkomsel: {
        name: 'Telkomsel',
        icon: '📱',
        packets: [
            { id: 'telkomsel_pulsa_5', name: 'Pulsa 5rb', price: 5000 },
            { id: 'telkomsel_pulsa_10', name: 'Pulsa 10rb', price: 10000 },
            { id: 'telkomsel_pulsa_20', name: 'Pulsa 20rb', price: 20000 },
            { id: 'telkomsel_pulsa_50', name: 'Pulsa 50rb', price: 50000 },
            { id: 'telkomsel_data_1gb', name: 'Data 1GB', price: 12000 },
            { id: 'telkomsel_data_3gb', name: 'Data 3GB', price: 25000 },
            { id: 'telkomsel_data_5gb', name: 'Data 5GB', price: 35000 },
            { id: 'telkomsel_data_10gb', name: 'Data 10GB', price: 60000 }
        ]
    },
    indosat: {
        name: 'Indosat Ooredoo',
        icon: '📡',
        packets: [
            { id: 'indosat_pulsa_5', name: 'Pulsa 5rb', price: 5000 },
            { id: 'indosat_pulsa_10', name: 'Pulsa 10rb', price: 10000 },
            { id: 'indosat_pulsa_20', name: 'Pulsa 20rb', price: 20000 },
            { id: 'indosat_pulsa_50', name: 'Pulsa 50rb', price: 50000 },
            { id: 'indosat_data_1gb', name: 'Data 1GB', price: 12000 },
            { id: 'indosat_data_3gb', name: 'Data 3GB', price: 25000 },
            { id: 'indosat_data_5gb', name: 'Data 5GB', price: 35000 }
        ]
    },
    xl: {
        name: 'XL Axiata',
        icon: '📞',
        packets: [
            { id: 'xl_pulsa_5', name: 'Pulsa 5rb', price: 5000 },
            { id: 'xl_pulsa_10', name: 'Pulsa 10rb', price: 10000 },
            { id: 'xl_pulsa_20', name: 'Pulsa 20rb', price: 20000 },
            { id: 'xl_pulsa_50', name: 'Pulsa 50rb', price: 50000 },
            { id: 'xl_data_1gb', name: 'Data 1GB', price: 9000 },
            { id: 'xl_data_3gb', name: 'Data 3GB', price: 20000 },
            { id: 'xl_data_5gb', name: 'Data 5GB', price: 30000 }
        ]
    },
    tri: {
        name: 'Three/Tri',
        icon: '📲',
        packets: [
            { id: 'tri_pulsa_3', name: 'Pulsa 3rb', price: 3000 },
            { id: 'tri_pulsa_5', name: 'Pulsa 5rb', price: 5000 },
            { id: 'tri_pulsa_10', name: 'Pulsa 10rb', price: 10000 },
            { id: 'tri_pulsa_20', name: 'Pulsa 20rb', price: 20000 },
            { id: 'tri_data_1gb', name: 'Data 1GB', price: 8000 },
            { id: 'tri_data_3gb', name: 'Data 3GB', price: 18000 },
            { id: 'tri_data_5gb', name: 'Data 5GB', price: 28000 }
        ]
    },
    smartfren: {
        name: 'Smartfren',
        icon: '📡',
        packets: [
            { id: 'smartfren_pulsa_5', name: 'Pulsa 5rb', price: 5000 },
            { id: 'smartfren_pulsa_10', name: 'Pulsa 10rb', price: 10000 },
            { id: 'smartfren_pulsa_20', name: 'Pulsa 20rb', price: 20000 },
            { id: 'smartfren_data_1gb', name: 'Data 1GB', price: 10000 },
            { id: 'smartfren_data_3gb', name: 'Data 3GB', price: 22000 }
        ]
    },
    emoney: {
        name: 'OVO / GoPay',
        icon: '💳',
        packets: [
            { id: 'ovo_10', name: 'OVO 10rb', price: 10000 },
            { id: 'ovo_25', name: 'OVO 25rb', price: 25000 },
            { id: 'ovo_50', name: 'OVO 50rb', price: 50000 },
            { id: 'ovo_100', name: 'OVO 100rb', price: 100000 },
            { id: 'gopay_10', name: 'GoPay 10rb', price: 10000 },
            { id: 'gopay_25', name: 'GoPay 25rb', price: 25000 },
            { id: 'gopay_50', name: 'GoPay 50rb', price: 50000 }
        ]
    },
    dana: {
        name: 'Dana / LinkAja',
        icon: '📱',
        packets: [
            { id: 'dana_10', name: 'Dana 10rb', price: 10000 },
            { id: 'dana_25', name: 'Dana 25rb', price: 25000 },
            { id: 'dana_50', name: 'Dana 50rb', price: 50000 },
            { id: 'dana_100', name: 'Dana 100rb', price: 100000 },
            { id: 'linkaja_10', name: 'LinkAja 10rb', price: 10000 },
            { id: 'linkaja_25', name: 'LinkAja 25rb', price: 25000 }
        ]
    },
    pln: {
        name: 'Token PLN',
        icon: '⚡',
        packets: [
            { id: 'pln_50', name: 'Token PLN 50rb', price: 50000 },
            { id: 'pln_100', name: 'Token PLN 100rb', price: 100000 },
            { id: 'pln_200', name: 'Token PLN 200rb', price: 200000 },
            { id: 'pln_500', name: 'Token PLN 500rb', price: 500000 }
        ]
    }
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    checkPersistentLogin();
    setupEventListeners();
    updateClock();
    updateDate();
    setInterval(updateClock, 1000);
    setInterval(updateDate, 60000);
    renderProductsGrid();
    setDefaultReportDate();
    updateCategoryOptions();
    updateTokenCart();
});

function checkPersistentLogin() {
    const savedUser = getFromLocalStorage('currentUser');
    if (savedUser) {
        AppStore.user = savedUser;
        showMainApp();
    }
}

function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    document.getElementById('userNameDisplay').textContent = AppStore.user || 'Admin';
    addNotification('Selamat datang di Waroeng Sanoem Humaira Berkah! 🙏', 'success', '🎉');
}

function setupEventListeners() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(this.dataset.page);
        });
    });

    const searchProduct = document.getElementById('searchProduct');
    if (searchProduct) searchProduct.addEventListener('input', renderProductsGrid);

    const paymentAmount = document.getElementById('paymentAmount');
    if (paymentAmount) paymentAmount.addEventListener('input', calculateChange);

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });

    const searchInventory = document.getElementById('searchInventory');
    if (searchInventory) searchInventory.addEventListener('input', renderInventoryTable);

    const reportDate = document.getElementById('reportDate');
    if (reportDate) reportDate.addEventListener('change', generateReport);
}

// ============================================
// NAVIGATION
// ============================================

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const pageEl = document.getElementById(page + 'Page');
    if (pageEl) pageEl.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) link.classList.add('active');
    });

    const titles = {
        'pos': 'Kasir / POS & Token Pulsa',
        'inventory': 'Manajemen Inventory',
        'reports': 'Laporan Penjualan',
        'settings': 'Pengaturan Sistem'
    };
    document.getElementById('pageTitle').textContent = titles[page] || 'Kasir / POS';
    AppStore.currentPage = page;

    if (page === 'inventory') renderInventoryTable();
    if (page === 'reports') generateReport();
    
    if (page === 'pos') {
        switchPosMode('barang');
    }
}

// ============================================
// POS MODE SWITCHER
// ============================================

function switchPosMode(mode) {
    currentPosMode = mode;
    
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.mode-btn').classList.add('active');
    
    document.querySelectorAll('.pos-mode').forEach(m => m.classList.remove('active'));
    
    if (mode === 'barang') {
        document.getElementById('barangMode').classList.add('active');
    } else if (mode === 'token') {
        document.getElementById('tokenMode').classList.add('active');
        selectTokenOperator('telkomsel');
    }
}

// ============================================
// TOKEN OPERATOR SELECTOR
// ============================================

function selectTokenOperator(operator) {
    currentTokenOperator = operator;
    
    document.querySelectorAll('.operator-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.operator-btn').classList.add('active');
    
    renderTokenPackets(operator);
}

function renderTokenPackets(operator) {
    const container = document.getElementById('tokenPacketContainer');
    const operatorData = TokenOperators[operator];
    
    let html = `
        <div class="token-packet-title">${operatorData.name} - Pilih Paket</div>
        <div class="token-packets">
    `;
    
    operatorData.packets.forEach(packet => {
        html += `
            <button class="token-packet-btn" onclick="addTokenToCart('${packet.id}', '${packet.name}', ${packet.price})">
                ${packet.name}<br>
                <span style="color: #1e3a8a; font-weight: 700; font-size: 11px;">${formatMoney(packet.price)}</span>
            </button>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

// ============================================
// CATEGORY MANAGEMENT
// ============================================

function openCategoryModal() {
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryModal').classList.add('show');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('show');
}

function saveCategory(e) {
    e.preventDefault();
    const name = document.getElementById('categoryName').value;
    const icon = document.getElementById('categoryIcon').value;

    if (!name || !icon) {
        addNotification('Lengkapi nama dan icon kategori!', 'danger', '❌');
        return;
    }

    AppStore.customCategories.push({ name, icon, id: 'custom_' + Date.now() });
    saveToLocalStorage('customCategories', AppStore.customCategories);
    updateCategoryOptions();
    addNotification(`Kategori "${name}" berhasil ditambahkan`, 'success', '➕');
    closeCategoryModal();
}

function updateCategoryOptions() {
    const select = document.getElementById('productCategory');
    if (!select) return;

    Array.from(select.options).forEach(option => {
        if (option.value.startsWith('custom_')) {
            option.remove();
        }
    });

    AppStore.customCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = `${cat.icon} ${cat.name}`;
        select.appendChild(option);
    });
}

// ============================================
// BARANG MODE - PRODUCTS
// ============================================

function filterByCategory(category) {
    AppStore.currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderProductsGrid();
}

function renderProductsGrid() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const searchTerm = document.getElementById('searchProduct').value.toLowerCase();
    let filtered = AppStore.products;

    if (AppStore.currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === AppStore.currentCategory);
    }

    if (searchTerm) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
    }

    grid.innerHTML = filtered.map(product => `
        <div class="product-card ${product.stock === 0 ? 'disabled' : ''}" 
             onclick="${product.stock > 0 ? `addToCart(${product.id})` : ''}">
            <div class="product-icon">${product.icon}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${formatMoney(product.price)}</div>
            <div style="font-size: 11px; color: #999; margin-top: 5px;">
                ${product.stock > 0 ? `Stock: ${product.stock}` : 'Stok Habis'}
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = AppStore.products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const existingItem = AppStore.cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.qty < product.stock) {
            existingItem.qty++;
        } else {
            addNotification('Stok ' + product.name + ' tidak cukup!', 'danger', '⚠️');
            return;
        }
    } else {
        AppStore.cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    addNotification(product.name + ' ditambahkan', 'info', '🛒');
}

function updateQty(productId, change) {
    const item = AppStore.cart.find(p => p.id === productId);
    if (!item) return;

    const product = AppStore.products.find(p => p.id === productId);
    item.qty += change;

    if (item.qty <= 0) {
        AppStore.cart = AppStore.cart.filter(p => p.id !== productId);
    } else if (item.qty > product.stock) {
        item.qty = product.stock;
    }

    updateCartUI();
}

function removeFromCart(productId) {
    const product = AppStore.products.find(p => p.id === productId);
    AppStore.cart = AppStore.cart.filter(item => item.id !== productId);
    addNotification(product.name + ' dihapus dari keranjang', 'warning', '🗑️');
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    if (AppStore.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Keranjang kosong</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = AppStore.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">${formatMoney(item.price)}</p>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                    <span class="qty-display">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-total">${formatMoney(item.price * item.qty)}</div>
                <button class="cart-item-delete" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    updateCartSummary();
}

function clearCart() {
    if (AppStore.cart.length === 0) {
        addNotification('Keranjang sudah kosong', 'danger', '❌');
        return;
    }
    
    if (window.confirm('Apakah Anda yakin ingin menghapus semua item?')) {
        AppStore.cart = [];
        updateCartUI();
        addNotification('Keranjang dibersihkan', 'warning', '🗑️');
    }
}

function updateCartSummary() {
    const subtotal = AppStore.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = formatMoney(subtotal);
    document.getElementById('tax').textContent = formatMoney(tax);
    document.getElementById('totalAmount').textContent = formatMoney(total);

    const qrisAmountEl = document.getElementById('qrisAmount');
    if (qrisAmountEl) {
        qrisAmountEl.textContent = formatMoney(total);
    }

    const btnCheckout = document.getElementById('btnCheckout');
    btnCheckout.disabled = AppStore.cart.length === 0;
}

function calculateChange() {
    const totalEl = document.getElementById('totalAmount');
    const totalText = totalEl.textContent.replace(/\D/g, '');
    const total = parseInt(totalText) || 0;
    const payment = parseInt(document.getElementById('paymentAmount').value) || 0;
    const change = payment - total;

    const changeEl = document.getElementById('changeAmount');
    if (change >= 0) {
        changeEl.textContent = formatMoney(change);
        changeEl.style.color = '#28a745';
    } else {
        changeEl.textContent = 'Kurang: ' + formatMoney(Math.abs(change));
        changeEl.style.color = '#dc3545';
    }
}

function selectPaymentMethod(method) {
    document.querySelectorAll('.payment-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.closest('.payment-tab').classList.add('active');

    document.querySelectorAll('.payment-method').forEach(pm => {
        pm.classList.remove('active');
    });

    if (method === 'cash') {
        document.getElementById('cashPayment').classList.add('active');
    } else if (method === 'qris') {
        document.getElementById('qrisPayment').classList.add('active');
    }
}

function processPayment() {
    if (AppStore.cart.length === 0) {
        addNotification('Keranjang kosong!', 'danger', '❌');
        return;
    }

    const paymentMethod = document.querySelector('.payment-tab.active');
    const isQRIS = paymentMethod && paymentMethod.textContent.includes('QRIS');

    const totalEl = document.getElementById('totalAmount');
    const totalText = totalEl.textContent.replace(/\D/g, '');
    const total = parseInt(totalText) || 0;

    if (!isQRIS) {
        const payment = parseInt(document.getElementById('paymentAmount').value) || 0;

        if (payment < total) {
            addNotification('Uang tidak cukup!', 'danger', '💸');
            return;
        }

        AppStore.cart.forEach(item => {
            const product = AppStore.products.find(p => p.id === item.id);
            if (product) {
                product.stock -= item.qty;
                if (product.stock === 0) {
                    addNotification('⚠️ ' + product.name + ' HABIS!', 'danger', '🚨');
                }
            }
        });

        const transaction = {
            id: 'TRX' + Date.now(),
            date: new Date(),
            items: AppStore.cart.map(item => ({
                name: item.name,
                qty: item.qty,
                price: item.price
            })),
            total: total,
            payment: payment,
            change: payment - total,
            method: 'TUNAI'
        };

        AppStore.transactions.push(transaction);
        saveToLocalStorage('transactions', AppStore.transactions);

        addNotification(
            `✅ PEMBAYARAN BERHASIL!\nTotal: ${formatMoney(total)}\nKembalian: ${formatMoney(payment - total)}`,
            'success',
            '💚'
        );

        if (document.getElementById('printReceipt').checked) {
            printReceipt(transaction);
        }

        resetPOS();
    } else {
        AppStore.cart.forEach(item => {
            const product = AppStore.products.find(p => p.id === item.id);
            if (product) {
                product.stock -= item.qty;
                if (product.stock === 0) {
                    addNotification('⚠️ ' + product.name + ' HABIS!', 'danger', '🚨');
                }
            }
        });

        const transaction = {
            id: 'TRX' + Date.now(),
            date: new Date(),
            items: AppStore.cart.map(item => ({
                name: item.name,
                qty: item.qty,
                price: item.price
            })),
            total: total,
            payment: total,
            change: 0,
            method: 'QRIS'
        };

        AppStore.transactions.push(transaction);
        saveToLocalStorage('transactions', AppStore.transactions);

        addNotification(
            `✅ PEMBAYARAN QRIS BERHASIL!\nTotal: ${formatMoney(total)}\nTerima kasih atas pembayaran Anda`,
            'success',
            '💚'
        );

        if (document.getElementById('printReceipt').checked) {
            printReceipt(transaction);
        }

        resetPOS();
    }
}

function resetPOS() {
    AppStore.cart = [];
    document.getElementById('paymentAmount').value = '';
    document.getElementById('searchProduct').value = '';
    updateCartUI();
    renderProductsGrid();
}

function printReceipt(transaction) {
    let receiptHtml = `
        <div style="font-family: monospace; max-width: 300px; margin: 20px auto; padding: 20px; border: 1px solid #ccc;">
            <div style="text-align: center; margin-bottom: 15px;">
                <h3 style="margin: 0; font-size: 14px;">Waroeng Sanoem Humaira Berkah</h3>
                <p style="margin: 5px 0; font-size: 11px;">Jl. Pendidikan No. 45, Kota Cirebon</p>
                <p style="margin: 0; font-size: 11px;">(0231) 123-4567</p>
            </div>
            <hr style="border: none; border-top: 1px dashed #000; margin: 10px 0;">
            <p style="margin: 5px 0; font-size: 11px;"><strong>ID:</strong> ${transaction.id}</p>
            <p style="margin: 5px 0; font-size: 11px;"><strong>Waktu:</strong> ${formatDateTime(transaction.date)}</p>
            <p style="margin: 5px 0; font-size: 11px;"><strong>Metode:</strong> ${transaction.method}</p>
            <hr style="border: none; border-top: 1px dashed #000; margin: 10px 0;">
            <table style="width: 100%; font-size: 11px;">
                <tr>
                    <th style="text-align: left;">Item</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Total</th>
                </tr>
    `;
    
    transaction.items.forEach(item => {
        const itemTotal = item.price * item.qty;
        receiptHtml += `
            <tr>
                <td>${item.name}</td>
                <td style="text-align: center;">${item.qty}</td>
                <td style="text-align: right;">${formatMoney(itemTotal)}</td>
            </tr>
        `;
    });

    receiptHtml += `
            </table>
            <hr style="border: none; border-top: 1px dashed #000; margin: 10px 0;">
            <p style="text-align: right; margin: 5px 0; font-size: 12px;"><strong>Total: ${formatMoney(transaction.total)}</strong></p>
            <p style="text-align: right; margin: 5px 0; font-size: 11px;">Pembayaran: ${formatMoney(transaction.payment)}</p>
    `;

    if (transaction.change > 0) {
        receiptHtml += `<p style="text-align: right; margin: 5px 0; font-size: 11px;">Kembalian: ${formatMoney(transaction.change)}</p>`;
    }

    receiptHtml += `
            <hr style="border: none; border-top: 1px dashed #000; margin: 10px 0;">
            <p style="text-align: center; font-size: 11px;">Terima Kasih atas Pembelian Anda</p>
            <p style="text-align: center; font-size: 10px; margin-top: 10px;">Semoga Berkah 🙏</p>
        </div>
    `;

    const printWindow = window.open('', '', 'height=600,width=500');
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
}

// ============================================
// TOKEN MODE - FUNCTIONS
// ============================================

function addTokenToCart(id, name, price) {
    TokenCart.items.push({
        id,
        name,
        price,
        timestamp: new Date()
    });
    
    updateTokenCart();
    addNotification(`${name} ditambahkan ke keranjang`, 'info', '🛒');
}

function updateTokenCart() {
    const container = document.getElementById('tokenCartItems');
    if (!container) return;

    TokenCart.total = 0;

    if (TokenCart.items.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 20px; font-size: 13px;">Keranjang token kosong</p>';
    } else {
        container.innerHTML = TokenCart.items.map((item, idx) => {
            TokenCart.total += item.price;
            return `
                <div class="token-cart-item">
                    <div>
                        <div class="token-cart-item-name">${item.name}</div>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <span class="token-cart-item-price">${formatMoney(item.price)}</span>
                        <button class="btn btn-danger" style="padding: 6px 10px; font-size: 12px;" onclick="removeTokenItem(${idx})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    const tokenTotalEl = document.getElementById('tokenTotal');
    if (tokenTotalEl) {
        tokenTotalEl.textContent = formatMoney(TokenCart.total);
    }

    const tokenCheckoutBtn = document.getElementById('tokenCheckoutBtn');
    if (tokenCheckoutBtn) {
        tokenCheckoutBtn.disabled = TokenCart.items.length === 0;
    }
}

function removeTokenItem(idx) {
    if (idx >= 0 && idx < TokenCart.items.length) {
        TokenCart.items.splice(idx, 1);
        updateTokenCart();
    }
}

function clearTokenCart() {
    if (TokenCart.items.length === 0) {
        addNotification('Keranjang token kosong', 'danger', '❌');
        return;
    }
    
    if (window.confirm('Bersihkan semua item token?')) {
        TokenCart.items = [];
        TokenCart.total = 0;
        updateTokenCart();
        addNotification('Keranjang token dibersihkan', 'warning', '🗑️');
    }
}

function checkoutToken() {
    if (TokenCart.items.length === 0) {
        addNotification('Keranjang token kosong!', 'danger', '❌');
        return;
    }

    const transaction = {
        id: 'TOKEN' + Date.now(),
        date: new Date(),
        type: 'token',
        operator: currentTokenOperator,
        items: TokenCart.items,
        total: TokenCart.total,
        payment: TokenCart.total,
        method: 'TUNAI'
    };

    AppStore.transactions.push(transaction);
    saveToLocalStorage('transactions', AppStore.transactions);

    addNotification(
        `✅ PEMBAYARAN TOKEN BERHASIL!\nTotal: ${formatMoney(TokenCart.total)}`,
        'success',
        '💚'
    );

    TokenCart.items = [];
    TokenCart.total = 0;
    updateTokenCart();
}

// ============================================
// INVENTORY FUNCTIONS
// ============================================

function renderInventoryTable() {
    const tbody = document.getElementById('inventoryBody');
    if (!tbody) return;

    const search = (document.getElementById('searchInventory').value || '').toLowerCase();
    const category = document.getElementById('categoryFilter').value || '';

    let filtered = AppStore.products;

    if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
    }

    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }

    tbody.innerHTML = filtered.map((product, idx) => {
        let status = 'success';
        let statusText = 'Normal';
        if (product.stock === 0) {
            status = 'danger';
            statusText = 'Habis';
        } else if (product.stock < 10) {
            status = 'warning';
            statusText = 'Menipis';
        }

        return `
            <tr>
                <td>#${String(product.id).padStart(3, '0')}</td>
                <td>${product.icon} ${product.name}</td>
                <td><span style="background: #e3f2fd; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${product.category}</span></td>
                <td>${formatMoney(product.price)}</td>
                <td><strong>${product.stock}</strong></td>
                <td><span class="badge badge-${status}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action edit" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn-action delete" onclick="deleteProduct(${product.id})">Hapus</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function openProductModal() {
    document.getElementById('productId').value = '';
    document.getElementById('productForm').reset();
    document.getElementById('productModalTitle').textContent = 'Tambah Barang Baru';
    document.getElementById('productModal').classList.add('show');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
}

function editProduct(id) {
    const product = AppStore.products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('productId').value = id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productIcon').value = product.icon;
    document.getElementById('productModalTitle').textContent = 'Edit Barang';
    document.getElementById('productModal').classList.add('show');
}

function saveProduct(e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('productId').value);
    const name = document.getElementById('productName').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const category = document.getElementById('productCategory').value;
    const icon = document.getElementById('productIcon').value || '📦';

    if (!name || !price || !category) {
        addNotification('Lengkapi semua field!', 'danger', '❌');
        return;
    }

    if (id) {
        const product = AppStore.products.find(p => p.id === id);
        if (product) {
            product.name = name;
            product.price = price;
            product.stock = stock;
            product.category = category;
            product.icon = icon;
        }
        addNotification('Barang berhasil diubah', 'success', '✏️');
    } else {
        const newId = Math.max(...AppStore.products.map(p => p.id), 0) + 1;
        AppStore.products.push({ id: newId, name, price, stock, category, icon });
        addNotification('Barang berhasil ditambahkan', 'success', '➕');
    }

    closeProductModal();
    renderInventoryTable();
    renderProductsGrid();
}

function deleteProduct(id) {
    if (window.confirm('Hapus barang ini?')) {
        const product = AppStore.products.find(p => p.id === id);
        AppStore.products = AppStore.products.filter(p => p.id !== id);
        AppStore.cart = AppStore.cart.filter(item => item.id !== id);
        renderInventoryTable();
        renderProductsGrid();
        addNotification('Barang ' + product.name + ' berhasil dihapus', 'success', '🗑️');
    }
}

// ============================================
// REPORTS FUNCTIONS
// ============================================

function setDefaultReportDate() {
    const reportDate = document.getElementById('reportDate');
    if (reportDate) {
        reportDate.valueAsDate = new Date();
    }
}

function updateReportType() {
    generateReport();
}

function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const reportDate = document.getElementById('reportDate').value;

    let filtered = [];
    const now = new Date();

    if (reportType === 'daily') {
        filtered = AppStore.transactions.filter(t => {
            const tDate = new Date(t.date).toISOString().split('T')[0];
            return tDate === reportDate;
        });
    } else if (reportType === 'weekly') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = AppStore.transactions.filter(t => new Date(t.date) >= weekAgo);
    } else if (reportType === 'monthly') {
        filtered = AppStore.transactions.filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
    }

    const totalSales = filtered.reduce((sum, t) => sum + t.total, 0);
    const average = filtered.length > 0 ? Math.round(totalSales / filtered.length) : 0;

    document.getElementById('reportTotal').textContent = formatMoney(totalSales);
    document.getElementById('reportCount').textContent = filtered.length;
    document.getElementById('reportAverage').textContent = formatMoney(average);

    const tbody = document.getElementById('reportsBody');
    if (filtered.length > 0) {
        tbody.innerHTML = filtered.map((t, idx) => `
            <tr>
                <td>${idx + 1}</td>
                <td>${t.id}</td>
                <td>${formatDateTime(t.date)}</td>
                <td><strong>${formatMoney(t.total)}</strong></td>
                <td>${t.method || 'TUNAI'}</td>
            </tr>
        `).join('');
    } else {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;">Tidak ada data transaksi untuk periode ini</td></tr>';
    }
}

// ============================================
// SETTINGS FUNCTIONS
// ============================================

function deleteTransactionHistory() {
    if (!window.confirm('Apakah Anda yakin ingin menghapus SEMUA riwayat transaksi? Tindakan ini TIDAK DAPAT DIBATALKAN!')) {
        return;
    }

    if (!window.confirm('PERHATIAN! Ini adalah peringatan terakhir. Data akan hilang selamanya!')) {
        return;
    }

    AppStore.transactions = [];
    saveToLocalStorage('transactions', AppStore.transactions);
    addNotification('Riwayat transaksi berhasil dihapus', 'success', '✨');
}

function resetFactorySettings() {
    if (!window.confirm('Apakah Anda yakin ingin MERESET SEMUA PENGATURAN ke pabrik? Semua data akan hilang!')) {
        return;
    }

    if (!window.confirm('PERINGATAN AKHIR! Semua data, produk, dan transaksi akan DIHAPUS. Lanjutkan?')) {
        return;
    }

    localStorage.clear();
    addNotification('Sistem telah direset ke pengaturan pabrik', 'success', '✨');
    setTimeout(() => {
        location.reload();
    }, 2000);
}

// ============================================
// AUTHENTICATION
// ============================================

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        AppStore.user = username;
        saveToLocalStorage('currentUser', username);
        showMainApp();
    } else {
        document.getElementById('loginError').style.display = 'block';
        addNotification('Login gagal! Username/Password salah', 'danger', '🔒');
        setTimeout(() => {
            document.getElementById('loginError').style.display = 'none';
        }, 3000);
    }
}

function handleLogout() {
    if (window.confirm('Keluar dari sistem?')) {
        localStorage.removeItem('currentUser');
        addNotification('Terima kasih telah menggunakan Waroeng Sanoem Humaira Berkah! 👋', 'info', '🌙');
        setTimeout(() => location.reload(), 1500);
    }
}