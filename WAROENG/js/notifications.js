// ====================================================
// NOTIFICATION SYSTEM
// ====================================================

const NotificationStore = {
    notifications: [],
    maxNotifications: 15
};

function addNotification(message, type = 'info', icon = '') {
    const notification = {
        id: Date.now(),
        message: message,
        type: type,
        icon: icon,
        timestamp: new Date()
    };

    NotificationStore.notifications.unshift(notification);
    
    if (NotificationStore.notifications.length > NotificationStore.maxNotifications) {
        NotificationStore.notifications.pop();
    }

    updateNotificationUI();
    playNotificationSound(type);
}

function updateNotificationUI() {
    const badge = document.getElementById('notificationCount');
    const list = document.getElementById('notificationList');

    const unreadCount = NotificationStore.notifications.length;
    badge.textContent = unreadCount > 0 ? unreadCount : '0';

    if (unreadCount === 0) {
        list.innerHTML = `
            <div class="empty-notification">
                <i class="fas fa-inbox"></i>
                <p>Tidak ada notifikasi</p>
            </div>
        `;
    } else {
        list.innerHTML = NotificationStore.notifications.map(notif => `
            <div class="notification-item ${notif.type}">
                <div class="notification-icon">${notif.icon}</div>
                <div class="notification-content">
                    <p class="notification-message">${escapeHtml(notif.message)}</p>
                    <p class="notification-time">${formatTimeAgo(notif.timestamp)}</p>
                </div>
            </div>
        `).join('');
    }
}

function clearAllNotifications() {
    if (window.confirm('Bersihkan semua notifikasi?')) {
        NotificationStore.notifications = [];
        updateNotificationUI();
        addNotification('Notifikasi dibersihkan', 'info', '✨');
    }
}

function playNotificationSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch(type) {
            case 'success':
                const successFreqs = [800, 1000, 1200];
                successFreqs.forEach((freq, i) => {
                    const time = audioContext.currentTime + (i * 0.1);
                    oscillator.frequency.setValueAtTime(freq, time);
                    gainNode.gain.setValueAtTime(0.3, time);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
                });
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.35);
                break;
            case 'danger':
                oscillator.frequency.value = 600;
                gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            case 'warning':
                oscillator.frequency.value = 700;
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.4);
                break;
            default:
                oscillator.frequency.value = 500;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
        }
    } catch (e) {
        console.log('Audio notification not supported');
    }
}

function formatTimeAgo(timestamp) {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return Math.floor(diff / 60) + ' menit lalu';
    if (diff < 86400) return Math.floor(diff / 3600) + ' jam lalu';
    return formatDate(timestamp);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}