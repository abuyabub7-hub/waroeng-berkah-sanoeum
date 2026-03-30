// ==================== REPORT SYSTEM ====================

function updateFilterInputs() {
    const type = document.getElementById('filter-type').value;
    document.getElementById('group-date').style.display = type === 'harian' ? 'flex' : 'none';
    document.getElementById('group-month').style.display = type === 'bulanan' ? 'flex' : 'none';
    document.getElementById('group-year').style.display = type === 'tahunan' ? 'flex' : 'none';
}

function generateReport() {
    const type = document.getElementById('filter-type').value;
    let filteredTrx = [];
    let periodeText = "";

    if (type === 'harian') {
        const dateVal = document.getElementById('filter-date').value;
        filteredTrx = transactions.filter(t => {
            const tDate = t.waktu.toISOString().split('T')[0];
            return tDate === dateVal;
        });
        periodeText = `Periode: Harian (${dateVal})`;
    } 
    else if (type === 'bulanan') {
        const monthVal = document.getElementById('filter-month').value;
        filteredTrx = transactions.filter(t => {
            const tMonth = t.waktu.toISOString().slice(0, 7);
            return tMonth === monthVal;
        });
        periodeText = `Periode: Bulanan (${monthVal})`;
    } 
    else if (type === 'tahunan') {
        const yearVal = document.getElementById('filter-year').value;
        filteredTrx = transactions.filter(t => t.waktu.getFullYear().toString() === yearVal);
        periodeText = `Periode: Tahunan (${yearVal})`;
    }

    // Update Header
    document.getElementById('print-periode').innerText = periodeText;

    // Kalkulasi Summary
    const totalRevenue = filteredTrx.reduce((sum, t) => sum + t.total, 0);
    document.getElementById('report-count').innerText = filteredTrx.length + " Transaksi";
    document.getElementById('report-revenue').innerText = formatRp(totalRevenue);

    // Render Tabel Laporan
    const tbody = document.getElementById('table-laporan');
    tbody.innerHTML = '';
    
    if (filteredTrx.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: #64748b;">Belum ada data transaksi pada periode ini.</td></tr>`;
    } else {
        filteredTrx.forEach(t => {
            tbody.innerHTML += `
                <tr>
                    <td><strong>${t.id}</strong></td>
                    <td>${formatDate(t.waktu)}</td>
                    <td style="font-size: 13px; color: #475569;">${t.items}</td>
                    <td style="font-weight: bold; color: var(--primary);">${formatRp(t.total)}</td>
                    <td style="font-size: 13px;">Bayar: ${formatRp(t.bayar)}<br>Kembali: ${formatRp(t.kembalian)}</td>
                </tr>
            `;
        });
    }
}