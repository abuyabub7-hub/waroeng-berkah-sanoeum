// ==================== POS SYSTEM ====================

function renderPOS(filterText = '') {
    const grid = document.getElementById('pos-grid');
    grid.innerHTML = '';
    const filtered = products.filter(p => p.nama.toLowerCase().includes(filterText.toLowerCase()));
    
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        if (p.stok <= 0) {
            card.style.opacity = '0.5';
            card.style.cursor = 'not-allowed';
        } else {
            card.onclick = () => addToCart(p.id);
        }
        card.innerHTML = `
            <div class="product-icon">${p.icon}</div>
            <div class="product-name">${p.nama}</div>
            <div class="product-price">${formatRp(p.harga)}</div>
            <div class="product-stock">Sisa Stok: ${p.stok}</div>
        `;
        grid.appendChild(card);
    });
}

function filterProducts() {
    renderPOS(document.getElementById('search-product').value);
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    const c = cart.find(x => x.id === id);
    
    if (c) {
        if (c.qty < p.stok) c.qty++;
        else alert('Maksimal stok tercapai!');
    } else {
        cart.push({ ...p, qty: 1 });
    }
    updateCartUI();
}

function changeQty(id, delta) {
    const item = cart.find(c => c.id === id);
    const product = products.find(p => p.id === id);
    
    if (item) {
        item.qty += delta;
        if (item.qty > product.stok) {
            item.qty = product.stok;
            alert('Stok tidak mencukupi!');
        }
        if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#94a3b8; margin-top:20px;">Keranjang kosong</p>';
    }
    
    cart.forEach(item => {
        total += item.harga * item.qty;
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4 style="font-size:14px; margin-bottom:4px;">${item.nama}</h4>
                    <p style="font-size:13px; color:#64748b;">${formatRp(item.harga)}</p>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <button class="btn-qty" onclick="changeQty('${item.id}', -1)">-</button>
                    <span style="font-weight:600; width:20px; text-align:center;">${item.qty}</span>
                    <button class="btn-qty" onclick="changeQty('${item.id}', 1)">+</button>
                </div>
            </div>
        `;
    });
    
    document.getElementById('cart-subtotal').innerText = formatRp(total);
    document.getElementById('cart-total').innerText = formatRp(total);
    calculateChange();
}

function calculateChange() {
    const total = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    const bayar = parseInt(document.getElementById('input-bayar').value) || 0;
    const kembalianEl = document.getElementById('cart-kembalian');
    const btn = document.getElementById('btn-checkout');

    if (cart.length > 0 && bayar >= total) {
        kembalianEl.innerText = formatRp(bayar - total);
        kembalianEl.style.color = 'var(--success)';
        btn.disabled = false;
    } else {
        kembalianEl.innerText = "Uang Kurang";
        kembalianEl.style.color = 'var(--danger)';
        btn.disabled = true;
    }
    if (cart.length === 0) {
        kembalianEl.innerText = "Rp 0";
        btn.disabled = true;
    }
}

function checkout() {
    const total = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    const bayar = parseInt(document.getElementById('input-bayar').value) || 0;
    const kembalian = bayar - total;
    
    // Kurangi stok
    cart.forEach(c => {
        const p = products.find(x => x.id === c.id);
        if (p) p.stok -= c.qty;
    });

    // Simpan transaksi
    const newTrx = {
        id: 'TRX-' + Math.floor(Math.random() * 1000000),
        waktu: new Date(),
        total: total,
        bayar: bayar,
        kembalian: kembalian,
        items: cart.map(c => `${c.nama} (${c.qty}x)`).join(', ')
    };
    transactions.push(newTrx);

    alert(`✅ TRANSAKSI BERHASIL!\n\nTotal Tagihan: ${formatRp(total)}\nUang Dibayar: ${formatRp(bayar)}\nKembalian: ${formatRp(kembalian)}`);
    
    // Reset
    cart = [];
    document.getElementById('input-bayar').value = '';
    updateCartUI();
    renderPOS();
    renderTableBarang();
}