// ==================== PRODUCT MANAGEMENT ====================

function renderTableBarang() {
    const tbody = document.getElementById('table-barang');
    tbody.innerHTML = '';
    
    products.forEach(p => {
        let status = p.stok > 5 ? `<span class="status-badge status-ready">Aman</span>` : 
                     (p.stok > 0 ? `<span class="status-badge status-low">Menipis</span>` : 
                      `<span class="status-badge status-low" style="background:#000; color:#fff;">Habis</span>`);
        
        tbody.innerHTML += `
            <tr>
                <td><strong>${p.id}</strong></td>
                <td>${p.icon} ${p.nama}</td>
                <td>${formatRp(p.harga)}</td>
                <td>${p.stok} unit</td>
                <td>${status}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="openModal('${p.id}')">Edit</button>
                    <button class="action-btn btn-delete" onclick="deleteProduct('${p.id}')">Hapus</button>
                </td>
            </tr>
        `;
    });
}

function openModal(id = null) {
    document.getElementById('product-modal').style.display = 'flex';
    
    if (id) {
        document.getElementById('modal-title').innerText = 'Edit Barang';
        const p = products.find(x => x.id === id);
        document.getElementById('form-id').value = p.id;
        document.getElementById('form-nama').value = p.nama;
        document.getElementById('form-harga').value = p.harga;
        document.getElementById('form-stok').value = p.stok;
        document.getElementById('form-icon').value = p.icon;
    } else {
        document.getElementById('modal-title').innerText = 'Tambah Barang Baru';
        document.getElementById('form-id').value = '';
        document.getElementById('form-nama').value = '';
        document.getElementById('form-harga').value = '';
        document.getElementById('form-stok').value = '';
        document.getElementById('form-icon').value = '';
    }
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function saveProduct() {
    const id = document.getElementById('form-id').value;
    const nama = document.getElementById('form-nama').value;
    const harga = parseInt(document.getElementById('form-harga').value);
    const stok = parseInt(document.getElementById('form-stok').value);
    const icon = document.getElementById('form-icon').value || '📦';

    if (!nama || isNaN(harga) || isNaN(stok)) {
        alert('Mohon isi dengan benar!');
        return;
    }

    if (id) {
        const index = products.findIndex(p => p.id === id);
        products[index] = { id, nama, harga, stok, icon };
    } else {
        const maxIdNum = products.reduce((max, p) => Math.max(max, parseInt(p.id.replace('BRG', ''))), 0);
        products.push({
            id: 'BRG' + String(maxIdNum + 1).padStart(3, '0'),
            nama,
            harga,
            stok,
            icon
        });
    }

    closeModal();
    renderTableBarang();
    renderPOS();
    alert('Data disimpan!');
}

function deleteProduct(id) {
    if (confirm('Hapus barang ini?')) {
        products = products.filter(p => p.id !== id);
        cart = cart.filter(c => c.id !== id);
        renderTableBarang();
        renderPOS();
        updateCartUI();
    }
}