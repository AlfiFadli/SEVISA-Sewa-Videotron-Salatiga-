
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#eff6ff',
                            100: '#dbeafe',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            800: '#1e40af',
                            900: '#1e3a8a',
                        }
                    },
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    

        let isLoggedIn = false;
        let isProfileComplete = false;
        let selectedLocationData = { title, address, size, priceNon, monthNon, hourNon, minuteNon };
        let currentUser = null;
        let selectedPortfolioItem = null;

        // USER DATABASE SYNCED WITH LOCALSTORAGE AND ADMIN PORTAL
        const DEFAULT_INITIAL_USERS = [
            { name: 'Budi Santoso', email: 'budi@gmail.com', password: 'password', company: 'PT Salatiga Digital Indo', phone: '081234567890', nik: '3373012345670001', address: 'Jl. Pemuda No. 12, Salatiga', position: 'Direktur Utama', category: 'perusahaan' }
        ];

        function getStoredUsers() {
            const saved = localStorage.getItem('sevisa_users');
            if (saved) {
                try { return JSON.parse(saved); } catch(e) {}
            }
            localStorage.setItem('sevisa_users', JSON.stringify(DEFAULT_INITIAL_USERS));
            return DEFAULT_INITIAL_USERS;
        }

        function saveStoredUsers(users) {
            localStorage.setItem('sevisa_users', JSON.stringify(users));
            window.dispatchEvent(new Event('storage'));
        }

        let registeredUsers = getStoredUsers();

        // 4 OFFICIAL VIDEOTRON LOCATIONS EXTRACTED FROM OFFICIAL BROSUR DISKOMINFO SALATIGA
        const VIDEOTRON_DATA = [
            {
                id: 'VDT-01',
                title: 'Pasar Rejosari',
                address: 'Jl. Hasanudin, Salatiga',
                kategori: 'nonrokok',
                lokasiCode: 'rejosari',
                layoutCode: 'landscape',
                size: '8 x 4 Meter',
                priceNon: '2.200.000',
                monthNon: '59.450.000',
                hourNon: '210.000',
                minuteNon: '3.800',
                traffic: '65.000+',
                ledSpec: 'P10 Outdoor DIP • 1920x1080',
                badgeText: 'LOKASI 1 (TOP TRAFFIC)'
            },
            {
                id: 'VDT-03',
                title: 'Selasar Kartini',
                address: 'Jl. Kartini, Salatiga',
                kategori: 'nonrokok',
                lokasiCode: 'kartini',
                layoutCode: 'landscape',
                size: '6 x 3 Meter',
                priceNon: '716.000',
                monthNon: '19.367.000',
                hourNon: '68.000',
                minuteNon: '1.300',
                traffic: '40.000+',
                ledSpec: 'P6 Outdoor LED • Pusat Edukasi Publik',
                badgeText: 'LOKASI 2 (PUSAT EDUKASI)'
            },
            {
                id: 'VDT-02',
                title: 'Blotongan',
                address: 'Jl. Semarang - Surakarta, Blotongan',
                kategori: 'nonrokok',
                lokasiCode: 'blotongan',
                layoutCode: 'portrait',
                size: '6 x 4 Meter',
                priceNon: '1.268.000',
                monthNon: '34.315.000',
                hourNon: '120.500',
                minuteNon: '2.200',
                traffic: '55.000+',
                ledSpec: 'P8 Outdoor LED • Gate Utara Salatiga',
                badgeText: 'LOKASI 3 (GATE UTARA)'
            },
            {
                id: 'VDT-04',
                title: 'Alun-Alun Salatiga',
                address: 'Lapangan Pancasila, Salatiga',
                kategori: 'nonrokok',
                lokasiCode: 'alunalun',
                layoutCode: 'dual',
                size: '10 x 5 Meter',
                priceNon: '698.000',
                monthNon: '18.881.000',
                hourNon: '66.200',
                minuteNon: '1.200',
                traffic: '60.000+',
                ledSpec: 'P10 Outdoor Dual • Alun-Alun Pancasila',
                badgeText: 'LOKASI 4 (ALUN-ALUN PANCASILA)'
            }
        ];

        // DYNAMIC PORTFOLIO SHOWCASE DATABASE (ADMIN UPDATED CONTENT READY)
        let PORTFOLIO_DATABASE = [
            {
                id: 'PORT-01',
                title: 'Promo Spesial Kuliner & Ritel Ramadhan',
                client: 'PT Salatiga Food & Beverages',
                location: 'Pasar Rejosari',
                type: 'video',
                mediaLabel: '🎥 Video Motion 1080p',
                category: 'komersial',
                dates: '1 - 15 Juli 2026',
                freq: '60x / Hari (30 Detik)',
                imgUrl: 'header_banner.jpg',
                description: 'Penayangan video komersial resolusi Full HD berdurasi 30 detik untuk mempromosikan promo produk makanan lokal Salatiga di persimpangan Pasar Rejosari selama 15 hari.'
            },
            {
                id: 'PORT-02',
                title: 'Campaign Mudik Minim Sampah 2026',
                client: 'Dinas Komunikasi dan Informatika Salatiga',
                location: 'Blotongan',
                type: 'layanan',
                mediaLabel: '🏛️ Iklan Layanan Publik',
                category: 'pemkot',
                dates: '10 - 25 April 2026',
                freq: '90x / Hari (15 Detik)',
                imgUrl: 'header_banner.jpg',
                description: 'Sosialisasi video motion gerakan peduli lingkungan dan kebersihan jalur mudik nasional yang disiarkan di videotron Blotongan pintu masuk kota.'
            },
            {
                id: 'PORT-03',
                title: 'Informasi Layanan Administrasi Kependudukan',
                client: 'Dinas Kependudukan & Pencatatan Sipil',
                location: 'Selasar Kartini',
                type: 'image',
                mediaLabel: '🖼️ Poster Digital HD',
                category: 'pemkot',
                dates: '1 - 30 Mei 2026',
                freq: '45x / Hari (30 Detik)',
                imgUrl: 'header_banner.jpg',
                description: 'Poster digital infografis layanan KTP digital & pencatatan sipil di Selasar Kartini kawasan pusat pendidikan & perkantoran Salatiga.'
            },
            {
                id: 'PORT-04',
                title: 'Festival Budaya & UMKM Salatiga 2026',
                client: 'Dinas Kebudayaan & Pariwisata Salatiga',
                location: 'Alun-Alun Salatiga',
                type: 'video',
                mediaLabel: '🎥 Video Teaser Event',
                category: 'event',
                dates: '1 - 7 Juni 2026',
                freq: '120x / Hari (30 Detik)',
                imgUrl: 'header_banner.jpg',
                description: 'Video motion teaser pengumuman pagelaran festival budaya tahunan di Alun-Alun Pancasila Salatiga dengan jangkauan pengunjung harian yang masif.'
            },
            {
                id: 'PORT-05',
                title: 'Peluncuran Produk Digital & Perbankan',
                client: 'Bank Jateng Cabang Salatiga',
                location: 'Pasar Rejosari',
                type: 'video',
                mediaLabel: '🎥 Video Motion 1080p',
                category: 'komersial',
                dates: '1 - 30 Agustus 2026',
                freq: '60x / Hari (30 Detik)',
                imgUrl: 'header_banner.jpg',
                description: 'Penayangan video promosi aplikasi mobile banking dan kredit modal usaha untuk para pedagang & pengusaha ritel Salatiga.'
            },
            {
                id: 'PORT-06',
                title: 'Edukasi Regulasi Pengamanan Kesehatan',
                client: 'Dinas Kesehatan Kota Salatiga',
                location: 'Selasar Kartini',
                type: 'layanan',
                mediaLabel: '🏛️ Iklan Layanan Publik',
                category: 'pemkot',
                dates: '1 - 15 September 2026',
                freq: '60x / Hari (15 Detik)',
                imgUrl: 'header_banner.jpg',
                description: 'Video sosialisasi gerakan hidup sehat dan panduan pencegahan penyakit menular bagi warga masyarakat di titik Selasar Kartini.'
            }
        ];

        // DEFAULT INITIAL ORDERS (SYNCED WITH LOCALSTORAGE AND ADMIN PORTAL)
        const DEFAULT_INITIAL_ORDERS = [
            {
                code: 'SVS-148972',
                userName: 'Alfi Fadli',
                company: 'Pt Mencari Cinta sejati',
                location: 'Selasar Kartini',
                dates: '2026-08-11 s.d. 2026-09-11 (5 Bulan • Standar • Rp 121.043.750)',
                file: 'logo savisa.jpeg',
                status: 'terkonfirmasi',
                statusLabel: 'TERKONFIRMASI & SIAP PENAYANGAN',
                statusDesc: '✅ <strong>Status: Terkonfirmasi & Siap Penayangan</strong><br>Selamat! Permohonan penyewaan videotron lokasi Selasar Kartini (5 Bulan) telah disetujui resmi oleh Diskominfo Kota Salatiga dan materi iklan siap disiarkan di layar videotron.',
                proofImg: 'header_banner.jpg'
            },
            {
                code: 'SVS-20260810-101',
                userName: 'Budi Santoso',
                company: 'PT Salatiga Digital Indo',
                location: 'Pasar Rejosari',
                dates: '2026-08-15 s.d. 2026-08-22 (7 Hari • Standar • Rp 15.400.000)',
                file: 'Video_Promosi_Produk.mp4',
                status: 'menunggu',
                statusLabel: 'MENUNGGU VERIFIKASI ADMIN DISKOMINFO',
                statusDesc: '📌 <strong>Status: Menunggu Verifikasi Admin Diskominfo</strong><br>Permohonan sewa Anda sedang berada dalam antrean peninjauan oleh tim admin Diskominfo Kota Salatiga. Estimasi proses verifikasi berkisar 1x24 jam kerja.',
                proofImg: 'header_banner.jpg'
            },
            {
                code: 'SVS-20260810-102',
                userName: 'Dinas Pariwisata Salatiga',
                company: 'Pemerintah Kota Salatiga',
                location: 'Blotongan',
                dates: '2026-08-18 s.d. 2026-08-25 (7 Hari • Standar • Rp 8.876.000)',
                file: 'Sosialisasi_Pariwisata.mp4',
                status: 'diproses',
                statusLabel: 'SEDANG DIPROSES / UJI TAYANG',
                statusDesc: '⚙️ <strong>Status: Sedang Diproses / Review Uji Tayang</strong><br>File materi iklan Anda sedang diuji kelayakan resolusi dan dijadwalkan oleh sistem penyiaran videotron Diskominfo Salatiga.',
                proofImg: 'header_banner.jpg'
            },
            {
                code: 'SVS-20260810-103',
                userName: 'Komunitas UMKM Salatiga',
                company: 'Brand Kuliner Salatiga',
                location: 'Alun-Alun Salatiga',
                dates: '2026-08-20 s.d. 2026-08-30 (10 Hari • Standar • Rp 6.980.000)',
                file: 'Poster_Promo_Event.png',
                status: 'terkonfirmasi',
                statusLabel: 'TERKONFIRMASI & SIAP PENAYANGAN',
                statusDesc: '✅ <strong>Status: Terkonfirmasi & Siap Penayangan</strong><br>Selamat! Permohonan penyewaan videotron Anda telah disetujui resmi oleh Diskominfo Kota Salatiga. Materi iklan siap ditayangkan sesuai jadwal.',
                proofImg: 'header_banner.jpg'
            }
        ];

        function getStoredOrders() {
            const saved = localStorage.getItem('sevisa_orders');
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch(e) {}
            }
            localStorage.setItem('sevisa_orders', JSON.stringify(DEFAULT_INITIAL_ORDERS));
            return DEFAULT_INITIAL_ORDERS;
        }

        function saveStoredOrders(orders) {
            localStorage.setItem('sevisa_orders', JSON.stringify(orders));
            window.dispatchEvent(new Event('storage'));
        }

        let orderDatabase = getStoredOrders();

        // DARK MODE TOGGLE SYSTEM WITH LOCAL STORAGE PERSISTENCE
        function toggleDarkMode() {
            const html = document.documentElement;
            const sunIcons = [document.getElementById('header-sun-icon'), document.getElementById('gate-sun-icon')];
            const moonIcons = [document.getElementById('header-moon-icon'), document.getElementById('gate-moon-icon')];

            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                html.classList.add('light');
                localStorage.setItem('sevisa_theme', 'light');
                sunIcons.forEach(ic => ic && ic.classList.add('hidden'));
                moonIcons.forEach(ic => ic && ic.classList.remove('hidden'));
            } else {
                html.classList.remove('light');
                html.classList.add('dark');
                localStorage.setItem('sevisa_theme', 'dark');
                moonIcons.forEach(ic => ic && ic.classList.add('hidden'));
                sunIcons.forEach(ic => ic && ic.classList.remove('hidden'));
            }
        }

        function initTheme() {
            const savedTheme = localStorage.getItem('sevisa_theme');
            const html = document.documentElement;
            const sunIcons = [document.getElementById('header-sun-icon'), document.getElementById('gate-sun-icon')];
            const moonIcons = [document.getElementById('header-moon-icon'), document.getElementById('gate-moon-icon')];

            if (savedTheme === 'dark') {
                html.classList.remove('light');
                html.classList.add('dark');
                moonIcons.forEach(ic => ic && ic.classList.add('hidden'));
                sunIcons.forEach(ic => ic && ic.classList.remove('hidden'));
            } else {
                html.classList.remove('dark');
                html.classList.add('light');
                sunIcons.forEach(ic => ic && ic.classList.add('hidden'));
                moonIcons.forEach(ic => ic && ic.classList.remove('hidden'));
            }
        }

        // 3D TOAST NOTIFICATION SYSTEM
        function show3DToast(title, message, type = 'success', customBtnText = 'SAYA MENGERTI →', customBtnOnClick = 'close3DToast()') {
            const modal = document.getElementById('custom-3d-toast-modal');
            const card = document.getElementById('toast-modal-card');
            const badge = document.getElementById('toast-3d-icon-badge');
            const titleEl = document.getElementById('toast-3d-title');
            const msgEl = document.getElementById('toast-3d-message');
            const btnContainer = document.getElementById('toast-3d-btn-container');

            titleEl.innerHTML = title;
            msgEl.innerHTML = message;

            btnContainer.innerHTML = `
                <button onclick="${customBtnOnClick}" class="w-full py-3.5 bg-gradient-to-r from-brand-800 via-brand-600 to-blue-600 hover:from-brand-700 hover:to-brand-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_5px_0_#1e3a8a] hover:shadow-[0_3px_0_#1e3a8a] hover:translate-y-[2px] active:translate-y-[5px] active:shadow-none transition-all duration-150">
                    ${customBtnText}
                </button>
            `;

            if (type === 'success') {
                badge.className = "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-[0_10px_25px_rgba(37,99,235,0.4)] border-2 border-white dark:border-slate-700 animate-3d-float bg-gradient-to-tr from-brand-800 via-brand-600 to-sky-400 text-white ring-4 ring-brand-100 dark:ring-brand-900/50 p-3.5";
                badge.innerHTML = `<svg class="w-9 h-9 fill-current drop-shadow-md" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
            } else if (type === 'error') {
                badge.className = "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-[0_10px_25px_rgba(225,29,72,0.4)] border-2 border-white dark:border-slate-700 animate-3d-float bg-gradient-to-tr from-rose-700 via-red-600 to-amber-500 text-white ring-4 ring-rose-100 dark:ring-rose-950 p-3.5";
                badge.innerHTML = `<svg class="w-8 h-8 fill-none stroke-current" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
            } else {
                badge.className = "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-[0_10px_25px_rgba(37,99,235,0.4)] border-2 border-white dark:border-slate-700 animate-3d-float bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-400 text-white ring-4 ring-blue-100 dark:ring-blue-950 p-3.5";
                badge.innerHTML = `<svg class="w-8 h-8 fill-none stroke-current" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
            }

            modal.classList.remove('hidden');
            modal.classList.add('flex');

            setTimeout(() => {
                card.classList.remove('scale-95', 'opacity-0');
                card.classList.add('scale-100', 'opacity-100');
            }, 20);
        }

        function close3DToast() {
            const modal = document.getElementById('custom-3d-toast-modal');
            const card = document.getElementById('toast-modal-card');

            card.classList.remove('scale-100', 'opacity-100');
            card.classList.add('scale-95', 'opacity-0');

            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }, 200);
        }

        // CUSTOM 3D CONFIRMATION MODAL SYSTEM FOR LOGOUT
        function show3DConfirm(title, message) {
            const modal = document.getElementById('custom-3d-confirm-modal');
            const card = document.getElementById('confirm-modal-card');
            
            document.getElementById('confirm-3d-title').innerText = title;
            document.getElementById('confirm-3d-message').innerText = message;

            modal.classList.remove('hidden');
            modal.classList.add('flex');

            setTimeout(() => {
                card.classList.remove('scale-95', 'opacity-0');
                card.classList.add('scale-100', 'opacity-100');
            }, 20);
        }

        function close3DConfirm() {
            const modal = document.getElementById('custom-3d-confirm-modal');
            const card = document.getElementById('confirm-modal-card');

            card.classList.remove('scale-100', 'opacity-100');
            card.classList.add('scale-95', 'opacity-0');

            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }, 200);
        }

        function handleLogout() {
            show3DConfirm('KELUAR DARI AKUN?', 'Apakah Anda yakin ingin keluar dari akun Anda saat ini?');
        }

        function executeLogoutAction() {
            close3DConfirm();

            isLoggedIn = false;
            isProfileComplete = false;
            currentUser = null;

            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';

            updateUserNavArea();
            updateProfileStatusUI();
            showPage('home');
            
            show3DToast('ℹ️ BERHASIL KELUAR', 'Anda telah keluar dari akun pengguna SEVISA.', 'info');
        }

        // DYNAMIC REAL-TIME RATE CALCULATOR FOR BOOKING FORM
        function getRawPriceNumber(priceStr) {
            if (!priceStr) return 0;
            return parseInt(priceStr.toString().replace(/\./g, ''), 10);
        }

        function calculateBookingPrice() {
    const checkedLocations = document.querySelectorAll('input[name="book-location"]:checked');
    const paketEl = document.getElementById('book-paket');
    const startEl = document.getElementById('book-start-date');
    const endEl = document.getElementById('book-end-date');
    const startTimeEl = document.getElementById('book-start-time');
    const endTimeEl = document.getElementById('book-end-time');

    if (!paketEl || !startEl || !endEl || !startTimeEl || !endTimeEl) return;

    const item = VIDEOTRON_DATA[0];
    const minuteRateStr = item.minuteNon || '0';
    
    const badgeEl = document.getElementById('calc-rate-badge');
    if (badgeEl) {
        badgeEl.innerText = 'Standar';
        badgeEl.className = 'px-2 py-0.5 bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[9px] font-bold rounded-md uppercase';
    }

    const unitDetailEl = document.getElementById('calc-unit-detail');
    const totalPriceEl = document.getElementById('calc-total-price');
    const rateMinEl = document.getElementById('calc-rate-minute');
    if (rateMinEl) rateMinEl.innerText = 'Rp ' + minuteRateStr;

    const rateMonthEl = document.getElementById('calc-rate-month');
    const rateDayEl = document.getElementById('calc-rate-day');
    const rateHourEl = document.getElementById('calc-rate-hour');
    if(rateMonthEl) rateMonthEl.innerText = '-';
    if(rateDayEl) rateDayEl.innerText = '-';
    if(rateHourEl) rateHourEl.innerText = '-';

    if (checkedLocations.length === 0) {
        if(unitDetailEl) unitDetailEl.innerText = 'Pilih lokasi terlebih dahulu';
        if(totalPriceEl) totalPriceEl.innerText = 'Rp 0';
        return null;
    }

    const startDate = startEl.value;
    const endDate = endEl.value;
    const startTime = startTimeEl.value;
    const endTime = endTimeEl.value;
    const paket = paketEl.value;

    if (!startDate || !endDate || !startTime || !endTime || !paket) {
        if(unitDetailEl) unitDetailEl.innerText = 'Lengkapi formulir di atas';
        if(totalPriceEl) totalPriceEl.innerText = 'Rp 0';
        return null;
    }

    if (startTime < "05:00" || startTime > "22:00" || endTime < "05:00" || endTime > "22:00") {
        if(unitDetailEl) unitDetailEl.innerHTML = '<span class="text-rose-500">Jam operasional 05:00 - 22:00</span>';
        if(totalPriceEl) totalPriceEl.innerText = 'Rp 0';
        return null;
    }

    const startD = new Date(startDate);
    const endD = new Date(endDate);
    if(endD < startD) {
        if(unitDetailEl) unitDetailEl.innerHTML = '<span class="text-rose-500">Tanggal tidak valid</span>';
        if(totalPriceEl) totalPriceEl.innerText = 'Rp 0';
        return null;
    }
    
    let diffTime = endD - startD;
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const startT = new Date(`1970-01-01T${startTime}:00`);
    const endT = new Date(`1970-01-01T${endTime}:00`);
    if(endT <= startT) {
        if(unitDetailEl) unitDetailEl.innerHTML = '<span class="text-rose-500">Jam selesai harus > jam mulai</span>';
        if(totalPriceEl) totalPriceEl.innerText = 'Rp 0';
        return null;
    }

    const totalMinutesPerDay = Math.ceil((endT - startT) / 60000);
    const totalMinutes = totalMinutesPerDay * diffDays;

    if (paket === 'alfa' && totalMinutesPerDay < 30) {
        if(unitDetailEl) unitDetailEl.innerHTML = '<span class="text-rose-500">Paket Alfa minimal 30 menit / hari</span>';
        if(totalPriceEl) totalPriceEl.innerText = 'Rp 0';
        return null;
    }
    if (paket === 'beta' && totalMinutesPerDay < 20) {
        if(unitDetailEl) unitDetailEl.innerHTML = '<span class="text-rose-500">Paket Beta minimal 20 menit / hari</span>';
        if(totalPriceEl) totalPriceEl.innerText = 'Rp 0';
        return null;
    }
    if (paket === 'event' && totalMinutesPerDay < 30) {
        if(unitDetailEl) unitDetailEl.innerHTML = '<span class="text-rose-500">Paket Event minimal 30 menit / hari</span>';
        if(totalPriceEl) totalPriceEl.innerText = 'Rp 0';
        return null;
    }

    let grandTotal = 0;
    let locNames = [];

    checkedLocations.forEach(chk => {
        locNames.push(chk.value);
        const vid = VIDEOTRON_DATA.find(v => v.title.toLowerCase().includes(chk.value.toLowerCase())) || VIDEOTRON_DATA[0];
        const minuteRate = getRawPriceNumber(vid.minuteNon);
        grandTotal += totalMinutes * minuteRate;
    });

    if(unitDetailEl) unitDetailEl.innerText = `${locNames.length} Lokasi x ${diffDays} Hari x ${totalMinutesPerDay} Menit`;
    if(totalPriceEl) totalPriceEl.innerText = 'Rp ' + grandTotal.toLocaleString('id-ID');

    return { totalMinutes, locNames, grandTotal, startDate, endDate, startTime, endTime, paket };
}

        // TRIGGER BOOKING FLOW WHEN USER CLICKS "AJUKAN PENYEWAAN" OR "PESAN SEWA SEKARANG"
        function triggerBookingFlow(locationTitle = null) {
    if (!isLoggedIn) {
        openAuthGateModal('login');
        show3DToast('ℹ️ SILAKAN MASUK AKUN', 'Untuk mengajukan penyewaan videotron, silakan <strong>Masuk Akun</strong> atau <strong>Daftar</strong> terlebih dahulu.', 'info');
        return;
    }

    if (!isProfileComplete) {
        showPage('profil');
        show3DToast('⚠️ LENGKAPI DATA DIRI', 'Silakan lengkapi data diri Anda secara menyeluruh terlebih dahulu untuk mengaktifkan izin penyewaan videotron.', 'error');
        return;
    }

    const checkboxes = document.querySelectorAll('input[name="book-location"]');
    checkboxes.forEach(chk => chk.checked = false);

    if (locationTitle) {
        checkboxes.forEach(chk => {
            if (chk.value.toLowerCase().includes(locationTitle.toLowerCase()) || locationTitle.toLowerCase().includes(chk.value.toLowerCase())) {
                chk.checked = true;
            }
        });
    } else {
        if(checkboxes.length > 0) checkboxes[0].checked = true;
    }

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('book-start-date').min = today;
    document.getElementById('book-end-date').min = today;

    openModal('booking-modal');
    calculateBookingPrice();
}

        function triggerBookingFlowFromPort() {
            closeModal('portfolio-modal-viewer');
            if (selectedPortfolioItem) {
                triggerBookingFlow(selectedPortfolioItem.location);
            } else {
                triggerBookingFlow();
            }
        }

        function handleAdFileSelect(event) {
            const file = event.target.files[0];
            const previewBadge = document.getElementById('file-preview-badge');
            const nameEl = document.getElementById('file-preview-name');
            const sizeEl = document.getElementById('file-preview-size');

            if (file) {
                nameEl.innerText = file.name;
                const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
                sizeEl.innerText = `${sizeMB} MB • ${file.type || 'Materi Iklan'}`;
                previewBadge.classList.remove('hidden');
            } else {
                previewBadge.classList.add('hidden');
            }
        }

        function submitBookingSewa(event) {
    event.preventDefault();
    const fileInput = document.getElementById('book-ad-file');

    if (!fileInput.files || fileInput.files.length === 0) {
        show3DToast('⚠️ MATERI IKLAN BELUM TERLAMPIR', 'Harap lampirkan file materi iklan (Video/PPT/Gambar/PDF) Anda!', 'error');
        return;
    }

    const calcResult = calculateBookingPrice();
    if(!calcResult) {
        show3DToast('⚠️ FORM TIDAK VALID', 'Silakan periksa kembali pilihan lokasi, jam, dan paket Anda.', 'error');
        return;
    }

    const existingOrders = getStoredOrders();
    let hasConflict = false;
    let conflictLoc = '';

    for (let order of existingOrders) {
        if (order.status === 'ditolak' || order.status === 'selesai') continue; 

        for (let loc of calcResult.locNames) {
            if (order.location.includes(loc)) {
                const match = order.dates.match(/(\d{4}-\d{2}-\d{2}) s\.d\. (\d{4}-\d{2}-\d{2})/);
                if (match) {
                    const oStart = match[1];
                    const oEnd = match[2];
                    
                    if (calcResult.startDate <= oEnd && calcResult.endDate >= oStart) {
                        const tMatch = order.dates.match(/Jam: (\d{2}:\d{2}) - (\d{2}:\d{2})/);
                        if (tMatch) {
                            const otStart = tMatch[1];
                            const otEnd = tMatch[2];
                            if (calcResult.startTime < otEnd && calcResult.endTime > otStart) {
                                hasConflict = true;
                                conflictLoc = loc;
                                break;
                            }
                        } else {
                            hasConflict = true;
                            conflictLoc = loc;
                            break;
                        }
                    }
                }
            }
        }
        if(hasConflict) break;
    }

    if (hasConflict) {
        show3DToast('🚨 KONFLIK JADWAL', `Lokasi <strong>${conflictLoc}</strong> sudah dipesan pada tanggal & jam tersebut. Silakan pilih waktu atau lokasi lain.`, 'error');
        return;
    }

    const fileName = fileInput.files[0].name;
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const bookingCode = 'SVS-' + randomSuffix;
    const locString = calcResult.locNames.join(', ');
    
    const newOrder = {
        code: bookingCode,
        userName: currentUser ? currentUser.name : 'Pengguna',
        company: currentUser ? (currentUser.company || 'Personal') : 'Personal',
        phone: currentUser ? (currentUser.phone || '') : '',
        location: locString,
        paket: calcResult.paket,
        dates: `${calcResult.startDate} s.d. ${calcResult.endDate} | Jam: ${calcResult.startTime} - ${calcResult.endTime} (${calcResult.totalMinutes} Menit • Rp ${calcResult.grandTotal.toLocaleString('id-ID')})`,
        file: fileName,
        status: 'menunggu',
        statusLabel: 'MENUNGGU VERIFIKASI',
        statusDesc: `📌 <strong>Status: Menunggu Verifikasi</strong><br>Permohonan sewa lokasi <strong>${locString}</strong> sedang dalam antrean verifikasi.`
    };

    orderDatabase.unshift(newOrder);
    saveStoredOrders(orderDatabase);
    closeModal('booking-modal');

    show3DToast(
        '🎉 PENGAJUAN BERHASIL!',
        `Kode Transaksi Pemesanan Anda:<br><strong class="text-xl font-black font-mono text-amber-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-500/40 inline-block my-2 shadow-inner tracking-wider">${bookingCode}</strong><br>Silakan pantau status transaksi Anda.`,
        'success',
        'LIHAT TRANSAKSI &rarr;',
        `showPage('daftar-transaksi')`
    );
}

        function navigateToStatusPage(code) {
            close3DToast();
            showPage('cek-status');
            
            const searchInput = document.getElementById('status-search-code');
            if (searchInput) searchInput.value = code;

            // KEEP RESULT CARD HIDDEN BY DEFAULT UNTIL USER CLICKS "CEK STATUS"
            const resultCard = document.getElementById('status-result-card');
            const emptyPrompt = document.getElementById('status-empty-prompt');
            if (resultCard) resultCard.classList.add('hidden');
            if (emptyPrompt) emptyPrompt.classList.remove('hidden');

            show3DToast(
                '🔑 KODE TRANSAKSI DISIAPKAN',
                `Kode <strong class="font-mono text-amber-500">${code}</strong> telah dimasukkan ke dalam kolom pencarian.<br><br>Klik tombol <strong>"Cek Status &rarr;"</strong> untuk menampilkan status & tahapan pengajuan secara lengkap.`,
                'info'
            );
        }

        function searchOrderStatus() {
            orderDatabase = getStoredOrders();
            const inputCode = document.getElementById('status-search-code').value.trim().toUpperCase();
            const resultCard = document.getElementById('status-result-card');
            const emptyPrompt = document.getElementById('status-empty-prompt');

            if (!inputCode) {
                if (resultCard) resultCard.classList.add('hidden');
                if (emptyPrompt) emptyPrompt.classList.remove('hidden');
                show3DToast('⚠️ MASUKKAN KODE TRANSAKSI', 'Harap masukkan Kode Transaksi Pemesanan Anda terlebih dahulu pada kolom yang tersedia!', 'error');
                return;
            }

            const foundOrder = orderDatabase.find(o => o.code === inputCode || (o.phone && o.phone === inputCode));

            if (!foundOrder) {
                if (resultCard) resultCard.classList.add('hidden');
                if (emptyPrompt) emptyPrompt.classList.remove('hidden');

                show3DToast(
                    '🚨 KODE TIDAK DITEMUKAN',
                    `Kode transaksi <strong>${inputCode}</strong> tidak ditemukan dalam sistem.<br><br>Silakan periksa kembali kode transaksi Anda atau gunakan tombol cepat demo.`,
                    'error'
                );
                return;
            }

            if (emptyPrompt) emptyPrompt.classList.add('hidden');
            if (resultCard) resultCard.classList.remove('hidden');

            renderOrderStatusCard(foundOrder);
        }

        function quickTestStatus(code) {
            document.getElementById('status-search-code').value = code;
            searchOrderStatus();
        }

        function renderOrderStatusCard(order) {
            document.getElementById('track-code-display').innerText = order.code;
            document.getElementById('track-location').innerText = order.location;
            document.getElementById('track-dates').innerText = order.dates;
            document.getElementById('track-user').innerText = `${order.userName} (${order.company})`;
            document.getElementById('track-file').innerText = order.file;

            // CLEAN MESSAGE BOX FORMATTING
            let noteContent = order.statusDesc || '';
            if (noteContent.includes('<br>')) {
                noteContent = noteContent.split('<br>').slice(1).join('<br>');
            } else {
                noteContent = noteContent.replace(/^(📌|⚙️|✅)\s*<strong>.*?<\/strong>\s*/g, '');
            }

            let boxHeader = '📌 <strong>Status: Menunggu Verifikasi Admin Diskominfo</strong>';
            let boxClass = 'p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium';

            if (order.status === 'diproses') {
                boxHeader = '⚙️ <strong>Status: Sedang Diproses / Review Uji Tayang</strong>';
                boxClass = 'p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-blue-900 dark:text-blue-200 leading-relaxed font-medium';
            } else if (order.status === 'terkonfirmasi') {
                boxHeader = '✅ <strong>Status: Terkonfirmasi & Siap Penayangan</strong>';
                boxClass = 'p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium';
            }

            const messageBoxEl = document.getElementById('track-status-message-box');
            if (messageBoxEl) {
                messageBoxEl.className = boxClass;
                messageBoxEl.innerHTML = `${boxHeader}<br>${noteContent || 'Materi iklan Anda telah disetujui resmi oleh Diskominfo Salatiga dan siap ditayangkan sesuai jadwal.'}`;
            }

            // RENDER PROOF OF BROADCAST PHOTO FROM ADMIN IF AVAILABLE
            const proofBox = document.getElementById('track-proof-box');
            const proofImg = document.getElementById('track-proof-img');
            if (order.proofImg && (order.status === 'diproses' || order.status === 'terkonfirmasi')) {
                if (proofImg) proofImg.src = order.proofImg;
                if (proofBox) proofBox.classList.remove('hidden');
            } else {
                if (proofBox) proofBox.classList.add('hidden');
            }

            const badgeContainer = document.getElementById('track-status-badge-container');
            const step1 = document.getElementById('step-track-1');
            const step2 = document.getElementById('step-track-2');
            const step3 = document.getElementById('step-track-3');

            const icon1 = document.getElementById('step-track-1-icon');
            const icon2 = document.getElementById('step-track-2-icon');
            const icon3 = document.getElementById('step-track-3-icon');

            [step1, step2, step3].forEach(step => {
                step.className = "bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-center space-y-1 opacity-50 transition duration-300";
            });

            if (order.status === 'menunggu') {
                badgeContainer.innerHTML = `
                    <span class="px-3.5 py-1.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-black text-xs uppercase tracking-wider rounded-xl border border-amber-300 dark:border-amber-800 flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                        <span>MENUNGGU VERIFIKASI DISKOMINFO</span>
                    </span>
                `;
                step1.className = "bg-amber-50 dark:bg-amber-950/60 border-2 border-amber-500 rounded-2xl p-3 text-center space-y-1 transition duration-300 shadow-md opacity-100";
                if (icon1) { icon1.className = "w-7 h-7 rounded-full bg-amber-500 text-white font-extrabold text-xs mx-auto flex items-center justify-center shadow-md animate-bounce"; icon1.innerText = "1"; }
                if (icon2) { icon2.className = "w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-extrabold text-xs mx-auto flex items-center justify-center"; icon2.innerText = "2"; }
                if (icon3) { icon3.className = "w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-extrabold text-xs mx-auto flex items-center justify-center"; icon3.innerText = "3"; }

            } else if (order.status === 'diproses') {
                badgeContainer.innerHTML = `
                    <span class="px-3.5 py-1.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-black text-xs uppercase tracking-wider rounded-xl border border-blue-300 dark:border-blue-800 flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span>SEDANG DIPROSES / UJI TAYANG</span>
                    </span>
                `;
                step1.className = "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400 rounded-2xl p-3 text-center space-y-1 opacity-80 transition duration-300";
                step2.className = "bg-blue-50 dark:bg-blue-950/60 border-2 border-blue-500 rounded-2xl p-3 text-center space-y-1 transition duration-300 shadow-lg opacity-100 scale-102";

                if (icon1) { icon1.className = "w-7 h-7 rounded-full bg-emerald-500 text-white font-extrabold text-xs mx-auto flex items-center justify-center shadow-sm"; icon1.innerText = "✓"; }
                if (icon2) { icon2.className = "w-7 h-7 rounded-full bg-blue-600 text-white font-extrabold text-xs mx-auto flex items-center justify-center shadow-md animate-pulse ring-4 ring-blue-100 dark:ring-blue-900/50"; icon2.innerText = "2"; }
                if (icon3) { icon3.className = "w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-extrabold text-xs mx-auto flex items-center justify-center"; icon3.innerText = "3"; }

            } else if (order.status === 'pembayaran_diverifikasi') {
                badgeContainer.innerHTML = `
                    <span class="px-3.5 py-1.5 bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-black text-xs uppercase tracking-wider rounded-xl border border-amber-400 flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                        <span>BUKTI BAYAR DIUNGGAH / VERIFIKASI BENDAHARA</span>
                    </span>
                `;
                step1.className = "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400 rounded-2xl p-3 text-center space-y-1 opacity-80 transition duration-300";
                step2.className = "bg-amber-50 dark:bg-amber-950/60 border-2 border-amber-500 rounded-2xl p-3 text-center space-y-1 transition duration-300 shadow-lg opacity-100";

                if (icon1) { icon1.className = "w-7 h-7 rounded-full bg-emerald-500 text-white font-extrabold text-xs mx-auto flex items-center justify-center shadow-sm"; icon1.innerText = "✓"; }
                if (icon2) { icon2.className = "w-7 h-7 rounded-full bg-amber-500 text-white font-extrabold text-xs mx-auto flex items-center justify-center shadow-md animate-bounce"; icon2.innerText = "⏳"; }
                if (icon3) { icon3.className = "w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-extrabold text-xs mx-auto flex items-center justify-center"; icon3.innerText = "3"; }

            } else if (order.status === 'terkonfirmasi') {
                badgeContainer.innerHTML = `
                    <span class="px-3.5 py-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-xs uppercase tracking-wider rounded-xl border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span>TERKONFIRMASI LUNAS & SIAP PENAYANGAN</span>
                    </span>
                `;
                step1.className = "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400 rounded-2xl p-3 text-center space-y-1 opacity-80 transition duration-300";
                step2.className = "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400 rounded-2xl p-3 text-center space-y-1 opacity-80 transition duration-300";
                step3.className = "bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 rounded-2xl p-3 text-center space-y-1 transition duration-300 shadow-lg opacity-100";

                if (icon1) { icon1.className = "w-7 h-7 rounded-full bg-emerald-500 text-white font-extrabold text-xs mx-auto flex items-center justify-center shadow-sm"; icon1.innerText = "✓"; }
                if (icon2) { icon2.className = "w-7 h-7 rounded-full bg-emerald-500 text-white font-extrabold text-xs mx-auto flex items-center justify-center shadow-sm"; icon2.innerText = "✓"; }
                if (icon3) { icon3.className = "w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold text-xs mx-auto flex items-center justify-center shadow-md ring-4 ring-emerald-100 dark:ring-emerald-900/50"; icon3.innerText = "✓"; }
            }

            // RENDER DYNAMIC ACTION BUTTONS (PAYMENT GATEWAY VS INVOICE PRINT)
            const payBtnContainer = document.getElementById('track-action-buttons-container');
            if (payBtnContainer) {
                if (order.status === 'diproses') {
                    payBtnContainer.innerHTML = `
                        <button onclick="openPaymentGatewayModal('${order.code}')" class="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xl transition flex items-center justify-center gap-2 animate-bounce">
                            <span>💳</span> BAYAR RETRIBUSI SEKARANG (PILIH TRANSAKSI) &rarr;
                        </button>
                    `;
                } else if (order.status === 'pembayaran_diverifikasi') {
                    payBtnContainer.innerHTML = `
                        <div class="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 font-bold text-center">
                            ⏳ Bukti Pembayaran Telah Dikirim! Menunggu Verifikasi Lunas Admin Diskominfo.
                        </div>
                    `;
                } else if (order.status === 'terkonfirmasi') {
                    payBtnContainer.innerHTML = `
                        <button onclick="openOfficialInvoiceModal()" class="w-full py-3.5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 hover:from-slate-800 hover:to-blue-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl border border-sky-400/40 shadow-lg transition flex items-center justify-center gap-2">
                            <span>📄</span> CETAK KUITANSI / INVOICE LUNAS RESMI (PDF) &rarr;
                        </button>
                    `;
                } else {
                    payBtnContainer.innerHTML = `
                        <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-500 font-medium text-center">
                            ℹ️ Kuitansi Lunas & Invoice Resmi akan aktif setelah permohonan disetujui & diverifikasi Lunas oleh Admin Diskominfo.
                        </div>
                    `;
                }
            }
        }

        // RENDER BERANDA VIDEOTRON CARDS (SHOW ONLY 2 STRATEGIC LOCATIONS: PASAR REJOSARI & SELASAR KARTINI)
        function renderVideotronCards(items) {
            const gridContainer = document.getElementById('videotron-card-grid');
            const emptyState = document.getElementById('filter-empty-state');
            const countBadge = document.getElementById('filter-count-badge');

            if (!gridContainer) return;

            const sourceData = (items && items.length > 0) ? items : getStoredUserLocations();

            // EXCLUSIVELY SHOW PASAR REJOSARI & SELASAR KARTINI ON BERANDA HOMEPAGE
            const displayItems = sourceData.filter(item => {
                const titleStr = (item.title || item.name || '').toLowerCase();
                const codeStr = (item.lokasiCode || '').toLowerCase();
                return titleStr.includes('rejosari') || titleStr.includes('kartini') || codeStr === 'rejosari' || codeStr === 'kartini';
            });

            const finalItems = displayItems.length > 0 ? displayItems : sourceData.slice(0, 2);

            if (emptyState) emptyState.classList.add('hidden');
            if (countBadge) countBadge.innerText = `Menampilkan ${finalItems.length} Titik Lokasi Paling Strategis (Pasar Rejosari & Selasar Kartini)`;

            let html = '';
            finalItems.forEach(item => {
                const titleStr = item.title || item.name || 'Videotron';
                const sizeStr = item.size || '8 x 4 Meter';
                const priceNonStr = item.priceNon || item.priceDay || '2.200.000';
                const priceRokokStr = item.priceRokok || '2.750.000';
                const badgeStr = item.badgeText || 'LOKASI UTAMA';
                const trafficStr = item.traffic || '95.000+';
                const ledSpecStr = item.ledSpec || 'P10 Outdoor DIP • 1920x1080';
                const addressStr = item.address || 'Salatiga';

                html += `
                    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between">
                        <div class="p-5 space-y-3">
                            <div class="w-full h-40 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative p-3 text-center overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-tr from-brand-900/40 via-brand-600/20 to-transparent"></div>
                                <div class="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-lg mb-1.5 relative z-10 font-black text-xs">
                                    ${sizeStr.split(' ')[0]}
                                </div>
                                <span class="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest relative z-10">${ledSpecStr}</span>
                                <span class="text-xs text-white font-bold mt-0.5 relative z-10">${titleStr}</span>
                            </div>

                            <div class="space-y-1.5">
                                <div class="flex items-center justify-between">
                                    <span class="px-2.5 py-0.5 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-sky-300 font-extrabold text-[9px] rounded-md border border-brand-200 dark:border-slate-700">${badgeStr}</span>
                                    <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400">${trafficStr} Kendaraan/Hari</span>
                                </div>
                                <h3 class="font-black text-slate-900 dark:text-white text-base pt-0.5">${titleStr}</h3>
                                <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">${addressStr}</p>
                            </div>
                        </div>

                        <div class="px-5 pb-5 pt-3 space-y-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                            <div class="space-y-1 text-xs">
                                <div class="flex justify-between items-center">
                                    <span class="text-slate-500 dark:text-slate-400 font-medium">Tarif Non-Rokok (Hari):</span>
                                    <span class="font-extrabold text-amber-600 dark:text-amber-400 text-xs">Rp ${priceNonStr}</span>
                                </div>
                                <div class="flex justify-between items-center text-slate-400">
                                    <span>Tarif Rokok (+25%):</span>
                                    <span class="font-semibold text-rose-600 dark:text-rose-400 text-xs">Rp ${priceRokokStr}</span>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <button onclick="openDetailLokasi('${titleStr}', '${addressStr}', '${sizeStr}', '${priceNonStr}', '${priceRokokStr}', '${item.monthNon || ''}', '${item.monthRokok || ''}', '${item.hourNon || ''}', '${item.hourRokok || ''}', '${item.minuteNon || ''}', '${item.minuteRokok || ''}')" class="py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition text-center border border-slate-200 dark:border-slate-700">
                                    Rincian Brosur
                                </button>
                                <button onclick="triggerBookingFlow('${titleStr}')" class="py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md transition text-center">
                                    Ajukan Sewa &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            gridContainer.innerHTML = html;
        }

        // RENDER TESTIMONI SHOWCASE GALLERY GRID
        function renderPortfolioGrid(items) {
            const container = document.getElementById('portfolio-grid-container');
            if (!container) return;

            if (items.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-2">
                        <span class="text-3xl">💬</span>
                        <h3 class="font-black text-slate-900 dark:text-white">Testimoni Tidak Ditemukan</h3>
                        <p class="text-xs text-slate-500">Belum ada testimoni pelanggan yang cocok dengan kriteria filter Anda.</p>
                    </div>
                `;
                return;
            }

            let html = '';
            items.forEach(item => {
                const stars = '⭐'.repeat(parseInt(item.rating || 5));
                html += `
                    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="text-sm tracking-widest text-amber-500 drop-shadow-sm">${stars}</span>
                                <span class="px-2 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-extrabold text-[9px] rounded-lg border border-red-200 dark:border-red-800/50">
                                    📍 ${item.location || 'Pasar Rejosari'}
                                </span>
                            </div>
                            
                            <p class="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed font-medium">
                                "${item.description || 'Pelayanan sangat memuaskan, tampilan videotron sangat cerah dan jelas.'}"
                            </p>
                        </div>

                        <div class="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <img src="${item.imgUrl || 'https://ui-avatars.com/api/?name='+encodeURIComponent(item.client)+'&background=random'}" alt="${item.client}" class="w-10 h-10 rounded-full object-cover border-2 border-brand-100 dark:border-slate-700">
                            <div>
                                <h4 class="font-extrabold text-slate-900 dark:text-white text-xs">${item.client}</h4>
                                <span class="text-[10px] text-brand-600 dark:text-sky-400 font-bold uppercase tracking-wider">${item.category || 'Instansi Pemerintah'}</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

        function openPortfolioModal(id) {
            const allPort = getMergedPortfolioData();
            const item = allPort.find(p => p.id === id);
            if (!item) return;

            selectedPortfolioItem = item;

            document.getElementById('port-modal-title').innerText = item.title;
            document.getElementById('port-modal-badge').innerText = item.location;
            document.getElementById('port-modal-media-type').innerText = item.mediaLabel;
            document.getElementById('port-modal-client').innerText = item.client;
            document.getElementById('port-modal-location').innerText = item.location;
            document.getElementById('port-modal-dates').innerText = item.dates;
            document.getElementById('port-modal-freq').innerText = item.freq;
            document.getElementById('port-modal-desc').innerText = item.description;

            const mediaWrapper = document.getElementById('port-modal-media-wrapper');
            const mediaSource = item.mediaUrl || item.imgUrl || 'header_banner.jpg';

            if (mediaWrapper) {
                if (item.type === 'video' || mediaSource.startsWith('data:video') || mediaSource.endsWith('.mp4')) {
                    mediaWrapper.innerHTML = `<video src="${mediaSource}" controls autoplay loop class="w-full h-full object-cover rounded-2xl"></video>`;
                } else if (item.type === 'ppt' || mediaSource.endsWith('.ppt') || mediaSource.endsWith('.pptx')) {
                    mediaWrapper.innerHTML = `
                        <div class="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-6 text-center space-y-3 relative">
                            <img src="${mediaSource.startsWith('data:image') ? mediaSource : 'header_banner.jpg'}" class="absolute inset-0 w-full h-full object-cover opacity-30">
                            <div class="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-2xl shadow-xl relative z-10">📊</div>
                            <span class="text-sm font-black text-amber-400 relative z-10 uppercase tracking-wider">Presentasi Slide (PPT / PPTX)</span>
                            <span class="text-xs text-slate-300 relative z-10 font-medium">${item.title}</span>
                        </div>
                    `;
                } else {
                    mediaWrapper.innerHTML = `
                        <img id="port-modal-img" src="${mediaSource}" alt="${item.title}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                            <div class="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl border border-white/40 cursor-pointer hover:scale-110 transition">
                                <svg class="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                        </div>
                    `;
                }
            }

            openModal('portfolio-modal-viewer');
        }

        function filterPortfolio(category) {
            const tabs = ['all', 'pemerintah', 'swasta', 'umkm'];
            tabs.forEach(t => {
                const btn = document.getElementById('port-filter-' + t);
                if (btn) {
                    btn.className = "px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 shrink-0 transition font-bold";
                }
            });

            const filterIdMap = {
                'all': 'all',
                'Instansi Pemerintah': 'pemerintah',
                'Perusahaan Swasta': 'swasta',
                'UMKM / Personal': 'umkm'
            };
            
            const activeBtn = document.getElementById('port-filter-' + filterIdMap[category]);
            if (activeBtn) {
                activeBtn.className = "px-3.5 py-2 rounded-xl bg-brand-600 text-white shadow-sm shrink-0 transition font-extrabold";
            }

            let filtered = getMergedPortfolioData();
            if (category !== 'all') {
                filtered = filtered.filter(p => p.category === category);
            }

            const locSelect = document.getElementById('port-location-select');
            if (locSelect && locSelect.value !== 'all') {
                filtered = filtered.filter(p => p.location === locSelect.value);
            }

            renderPortfolioGrid(filtered);
        }

        function applyPortfolioLocationFilter() {
            const locVal = document.getElementById('port-location-select').value;
            let filtered = PORTFOLIO_DATABASE;

            if (locVal !== 'all') {
                filtered = PORTFOLIO_DATABASE.filter(p => p.location === locVal);
            }

            renderPortfolioGrid(filtered);
        }

        function applyVideotronFilters() {
            const kategoriVal = document.getElementById('filter-kategori').value;
            const lokasiVal = document.getElementById('filter-lokasi').value;
            const layoutVal = document.getElementById('filter-layout').value;

            const filtered = VIDEOTRON_DATA.filter(item => {
                const matchKategori = (kategoriVal === 'all' || item.kategori === kategoriVal);
                const matchLokasi = (lokasiVal === 'all' || item.lokasiCode === lokasiVal);
                const matchLayout = (layoutVal === 'all' || item.layoutCode === layoutVal);
                return matchKategori && matchLokasi && matchLayout;
            });

            renderVideotronCards(filtered);
        }

        function resetVideotronFilters() {
            document.getElementById('filter-kategori').value = 'all';
            document.getElementById('filter-lokasi').value = 'all';
            document.getElementById('filter-layout').value = 'all';
            applyVideotronFilters();
        }

        function getStoredLocations() {
            const saved = localStorage.getItem('sevisa_locations');
            if (saved) {
                try { return JSON.parse(saved); } catch(e) {}
            }
            return [
                { id: 'VDT-01', name: 'Pasar Rejosari', address: 'Jl. Hasanudin, Salatiga', mapsUrl: 'https://maps.google.com/?q=Pasar+Rejosari+Salatiga', priceDay: '2.200.000' },
                { id: 'VDT-02', name: 'Blotongan', address: 'Jl. Semarang - Surakarta, Salatiga', mapsUrl: 'https://maps.google.com/?q=Blotongan+Salatiga', priceDay: '1.268.000' },
                { id: 'VDT-03', name: 'Selasar Kartini', address: 'Jl. Kartini, Salatiga', mapsUrl: 'https://maps.google.com/?q=Selasar+Kartini+Salatiga', priceDay: '716.000' },
                { id: 'VDT-04', name: 'Alun-Alun Salatiga', address: 'Jl. Pancasila, Salatiga', mapsUrl: 'https://maps.google.com/?q=Alun+Alun+Salatiga', priceDay: '698.000' }
            ];
        }

        const LOCATION_COORDINATES = {
            'Pasar Rejosari': { lat: -7.3305, lng: 110.5084, orientation: 'Utara - Selatan (Kawasan Pasar & Komersial Rejosari)', googleMaps: 'https://maps.google.com/?q=-7.3305,110.5084' },
            'Selasar Kartini': { lat: -7.3275, lng: 110.5012, orientation: 'Barat - Timur (Pusat Kota & Kawasan Kuliner Kartini)', googleMaps: 'https://maps.google.com/?q=-7.3275,110.5012' },
            'Blotongan': { lat: -7.3150, lng: 110.4910, orientation: 'Utara - Selatan (Gate Masuk Salatiga dari Semarang)', googleMaps: 'https://maps.google.com/?q=-7.3150,110.4910' },
            'Simpang ABC': { lat: -7.3392, lng: 110.5025, orientation: 'Timur - Barat (Persimpangan Jl. Jend. Sudirman & Argoyuwono)', googleMaps: 'https://maps.google.com/?q=-7.3392,110.5025' },
            'Argoyuwono': { lat: -7.3392, lng: 110.5025, orientation: 'Timur - Barat (Simpang ABC Argoyuwono)', googleMaps: 'https://maps.google.com/?q=-7.3392,110.5025' }
        };

        let detailLeafletMapInstance = null;

        function initDetailLeafletMap(title, address) {
            const locInfo = LOCATION_COORDINATES[title] || { lat: -7.3305, lng: 110.5084, orientation: 'Utara - Selatan (Kawasan Komersial Salatiga)', googleMaps: 'https://maps.google.com/?q=-7.3305,110.5084' };
            
            const coordsEl = document.getElementById('det-coords-text');
            const orientEl = document.getElementById('det-orientation-text');
            const gmapsLink = document.getElementById('det-google-maps-link');

            if (coordsEl) coordsEl.innerText = `${locInfo.lat}, ${locInfo.lng}`;
            if (orientEl) orientEl.innerText = locInfo.orientation;
            if (gmapsLink) gmapsLink.href = locInfo.googleMaps;

            setTimeout(() => {
                const container = document.getElementById('detail-leaflet-map');
                if (!container) return;

                if (detailLeafletMapInstance) {
                    detailLeafletMapInstance.remove();
                    detailLeafletMapInstance = null;
                }

                try {
                    detailLeafletMapInstance = L.map('detail-leaflet-map').setView([locInfo.lat, locInfo.lng], 16);

                    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
                        subdomains: 'abcd',
                        maxZoom: 19
                    }).addTo(detailLeafletMapInstance);

                    const customIcon = L.divIcon({
                        className: 'custom-leaflet-marker',
                        html: `
                            <div class="relative flex items-center justify-center w-9 h-9">
                                <span class="absolute w-9 h-9 rounded-full bg-sky-500/40 animate-ping"></span>
                                <div class="w-9 h-9 rounded-full bg-brand-600 text-white font-black text-sm flex items-center justify-center shadow-xl border-2 border-white">
                                    📍
                                </div>
                            </div>
                        `,
                        iconSize: [36, 36],
                        iconAnchor: [18, 36],
                        popupAnchor: [0, -36]
                    });

                    const marker = L.marker([locInfo.lat, locInfo.lng], { icon: customIcon }).addTo(detailLeafletMapInstance);
                    marker.bindPopup(`
                        <div class="p-1 space-y-1 text-xs font-sans">
                            <strong class="font-black text-slate-900 block text-xs">${title}</strong>
                            <span class="text-[10px] text-slate-500 block">${address || 'Kota Salatiga'}</span>
                            <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold text-[9px] rounded block text-center mt-1">
                                🟢 Titik Penayangan Aktif
                            </span>
                        </div>
                    `).openPopup();

                    detailLeafletMapInstance.invalidateSize();
                } catch(e) {
                    console.error('Leaflet Map Init Error:', e);
                }
            }, 150);
        }

        function getStoredUserLocations() {
            const saved = localStorage.getItem('sevisa_locations');
            if (saved) {
                try { return JSON.parse(saved); } catch(e) {}
            }
            return [
                {
                    id: 'VDT-01',
                    title: 'PASAR REJOSARI',
                    address: 'Jl. Hasanudin, Salatiga',
                    coords: '-7.3305, 110.5084',
                    orientation: 'Utara - Selatan (Kawasan Pasar & Komersial Rejosari)',
                    size: '8 x 4 Meter',
                    traffic: '120.000 Kendaraan/Hari',
                    badgeText: 'LOKASI 1 (TOP TRAFFIC)',
                    priceNon: '2.200.000',
                    monthNon: '59.450.000',
                    hourNon: '210.000',
                    minuteNon: '3.800',
                },
                {
                    id: 'VDT-02',
                    title: 'BLOTONGAN',
                    address: 'Jl. Semarang - Surakarta, Blotongan',
                    coords: '-7.3150, 110.4910',
                    orientation: 'Utara - Selatan (Gate Masuk Salatiga dari Semarang)',
                    size: '8 x 4 Meter',
                    traffic: '110.000 Kendaraan/Hari',
                    badgeText: 'LOKASI 2 (GATE UTARA)',
                    priceNon: '1.268.000',
                    monthNon: '34.315.000',
                    hourNon: '120.500',
                    minuteNon: '2.200',
                },
                {
                    id: 'VDT-03',
                    title: 'SELASAR KARTINI',
                    address: 'Jl. Kartini, Salatiga',
                    coords: '-7.3275, 110.5012',
                    orientation: 'Barat - Timur (Pusat Kota & Kawasan Kuliner Kartini)',
                    size: '8 x 4 Meter',
                    traffic: '85.000 Kendaraan/Hari',
                    badgeText: 'LOKASI 3 (PUSAT EDUKASI)',
                    priceNon: '716.000',
                    monthNon: '19.367.000',
                    hourNon: '68.000',
                    minuteNon: '1.300',
                },
                {
                    id: 'VDT-04',
                    title: 'ALUN-ALUN SALATIGA',
                    address: 'Lapangan Pancasila / Simpang ABC, Salatiga',
                    coords: '-7.3392, 110.5025',
                    orientation: 'Timur - Barat (Persimpangan Jl. Jend. Sudirman & Argoyuwono)',
                    size: '8 x 4 Meter',
                    traffic: '95.000 Kendaraan/Hari',
                    badgeText: 'LOKASI 4 (ALUN-ALUN PANCASILA)',
                    priceNon: '698.000',
                    monthNon: '18.881.000',
                    hourNon: '66.200',
                    minuteNon: '1.200',
                }
            ];
        }

        function renderUserLokasiPageCards() {
            const container = document.getElementById('user-lokasi-grid-container');
            if (!container) return;

            const locs = getStoredUserLocations();
            let html = '';

            locs.forEach((item, idx) => {
                const titleStr = item.title || item.name || 'Videotron';
                const coordsStr = item.coords || `${item.lat || -7.3305}, ${item.lng || 110.5084}`;
                const mapCardId = `card-map-dynamic-${idx}`;
                const gmapsLink = `https://maps.google.com/?q=${encodeURIComponent(coordsStr)}`;

                html += `
                    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
                        <div class="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
                            <div>
                                <span class="px-2.5 py-0.5 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-sky-300 font-extrabold text-[10px] rounded-md">${item.badgeText || 'TITIK LOKASI'}</span>
                                <h3 class="text-lg font-black text-slate-900 dark:text-white mt-1">${titleStr.toUpperCase()}</h3>
                                <p class="text-xs text-slate-500 dark:text-slate-400">${item.address}</p>
                            </div>
                            <span class="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[10px] rounded-lg border border-emerald-500/30">
                                ${coordsStr}
                            </span>
                        </div>

                        <!-- CARD LEAFLET MAP CONTAINER -->
                        <div id="${mapCardId}" style="height: 180px; width: 100%; position: relative; overflow: hidden;" class="rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner z-0"></div>

                        <div class="grid grid-cols-2 gap-3 text-xs">
                            <div class="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-2xl border border-blue-200 dark:border-blue-800 space-y-1">
                                

                            <div class="bg-rose-50 dark:bg-rose-950/40 p-3 rounded-2xl border border-rose-200 dark:border-rose-800 space-y-1">
                                <span class="font-extrabold text-rose-700 dark:text-rose-300 text-[11px] block uppercase">Tarif Rokok (+25%)</span>
                                <ul class="space-y-0.5 font-medium text-[11px] text-slate-700 dark:text-slate-300">
                                    <li><strong>Bulan:</strong> Rp ${item.monthRokok || '0'}</li>
                                    <li><strong>Hari:</strong> Rp ${item.priceRokok || '0'}</li>
                                    <li><strong>Jam:</strong> Rp ${item.hourRokok || '0'}</li>
                                    <li><strong>Menit:</strong> Rp ${item.minuteRokok || '0'}</li>
                                </ul>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <a href="${gmapsLink}" target="_blank" class="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-xl shadow transition text-center flex items-center justify-center gap-1">
                                📍 Google Maps GPS
                            </a>
                            <button onclick="openDetailLokasi('${titleStr}', '${item.address}', '${item.size || '8 x 4 Meter'}', '${item.priceNon}', '${item.priceRokok}', '${item.monthNon}', '${item.monthRokok}', '${item.hourNon}', '${item.hourRokok}', '${item.minuteNon}', '${item.minuteRokok}')" class="flex-1 py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-[11px] rounded-xl transition text-center border border-slate-200 dark:border-slate-700">
                                🔍 Detail Brosur
                            </button>
                            <button onclick="triggerBookingFlow('${titleStr}')" class="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[11px] rounded-xl shadow transition text-center">
                                Sewa &rarr;
                            </button>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

        let masterSalatigaMapInstance = null;
        const cardMapInstances = {};

        function initPageLokasiMaps() {
            renderUserLokasiPageCards();

            setTimeout(() => {
                if (typeof L === 'undefined') return;

                const masterContainer = document.getElementById('master-salatiga-map');
                const locs = getStoredUserLocations();

                if (masterContainer) {
                    if (masterSalatigaMapInstance) {
                        masterSalatigaMapInstance.remove();
                        masterSalatigaMapInstance = null;
                    }

                    try {
                        masterSalatigaMapInstance = L.map('master-salatiga-map').setView([-7.3280, 110.5010], 14);

                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; OpenStreetMap contributors',
                            maxZoom: 19
                        }).addTo(masterSalatigaMapInstance);

                        locs.forEach(item => {
                            const titleStr = item.title || item.name || 'Videotron';
                            const coordsStr = item.coords || `${item.lat || -7.3305}, ${item.lng || 110.5084}`;
                            const parts = coordsStr.split(',').map(s => parseFloat(s.trim()));
                            if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) return;

                            const customIcon = L.divIcon({
                                className: 'custom-leaflet-marker',
                                html: `
                                    <div class="relative flex items-center justify-center w-8 h-8">
                                        <span class="absolute w-8 h-8 rounded-full bg-brand-500/40 animate-ping"></span>
                                        <div class="w-8 h-8 rounded-full bg-brand-600 text-white font-black text-xs flex items-center justify-center shadow-xl border-2 border-white">
                                            📍
                                        </div>
                                    </div>
                                `,
                                iconSize: [32, 32],
                                iconAnchor: [16, 32],
                                popupAnchor: [0, -32]
                            });

                            const marker = L.marker([parts[0], parts[1]], { icon: customIcon }).addTo(masterSalatigaMapInstance);
                            marker.bindPopup(`
                                <div class="p-1.5 space-y-1 text-xs font-sans">
                                    <strong class="font-black text-slate-900 block text-xs">${titleStr}</strong>
                                    <span class="text-[10px] text-slate-500 block font-medium">${item.address}</span>
                                    <a href="https://maps.google.com/?q=${encodeURIComponent(coordsStr)}" target="_blank" class="px-2.5 py-1 bg-emerald-600 text-white font-extrabold text-[9px] rounded inline-block mt-1">
                                        📍 Buka Google Maps GPS &rarr;
                                    </a>
                                </div>
                            `);
                        });

                        setTimeout(() => { if (masterSalatigaMapInstance) masterSalatigaMapInstance.invalidateSize(); }, 300);
                    } catch(e) {}
                }

                locs.forEach((item, idx) => {
                    const mapCardId = `card-map-dynamic-${idx}`;
                    const container = document.getElementById(mapCardId);
                    if (!container) return;

                    if (cardMapInstances[mapCardId]) {
                        cardMapInstances[mapCardId].remove();
                        delete cardMapInstances[mapCardId];
                    }

                    const coordsStr = item.coords || `${item.lat || -7.3305}, ${item.lng || 110.5084}`;
                    const parts = coordsStr.split(',').map(s => parseFloat(s.trim()));
                    if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) return;

                    try {
                        const map = L.map(mapCardId, { zoomControl: false }).setView([parts[0], parts[1]], 15);
                        cardMapInstances[mapCardId] = map;

                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; OpenStreetMap contributors',
                            maxZoom: 19
                        }).addTo(map);

                        const customIcon = L.divIcon({
                            className: 'custom-leaflet-marker',
                            html: `
                                <div class="relative flex items-center justify-center w-7 h-7">
                                    <span class="absolute w-7 h-7 rounded-full bg-sky-500/40 animate-ping"></span>
                                    <div class="w-7 h-7 rounded-full bg-brand-600 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white">
                                        📍
                                    </div>
                                </div>
                            `,
                            iconSize: [28, 28],
                            iconAnchor: [14, 28]
                        });

                        L.marker([parts[0], parts[1]], { icon: customIcon }).addTo(map);
                        setTimeout(() => { if (cardMapInstances[mapCardId]) cardMapInstances[mapCardId].invalidateSize(); }, 300);
                    } catch(e) {}
                });

            }, 200);
        }

        window.addEventListener('storage', (e) => {
            if (!e.key || e.key === 'sevisa_locations') {
                renderUserLokasiPageCards();
                initPageLokasiMaps();
            }
        });

        function openDetailLokasi(title, address, size, priceNon, monthNon, hourNon, minuteNon) {
            selectedLocationData = { title, address, size, priceNon, monthNon, hourNon, minuteNon };
            document.getElementById('det-title').innerText = title;
            document.getElementById('det-address').innerText = address;
            document.getElementById('det-size').innerText = size;
            
            document.getElementById('det-rate-month-non').innerText = `Rp ${monthNon || '0'}`;
            document.getElementById('det-rate-day-non').innerText = `Rp ${priceNon || '0'}`;
            document.getElementById('det-rate-hour-non').innerText = `Rp ${hourNon || '0'}`;
            document.getElementById('det-rate-minute-non').innerText = `Rp ${minuteNon || '0'}`;

                                                
            switchDetailTab('deskripsi');
            showPage('detail-lokasi');
        }

        function switchDetailTab(tabName) {
            const tabs = ['deskripsi', 'lokasi', 'detail', 'tambahan'];
            tabs.forEach(t => {
                const btn = document.getElementById('tab-btn-' + t);
                const content = document.getElementById('tab-content-' + t);
                if (btn) btn.className = "flex-1 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition font-bold";
                if (content) content.classList.add('hidden');
            });

            const activeBtn = document.getElementById('tab-btn-' + tabName);
            const activeContent = document.getElementById('tab-content-' + tabName);
            if (activeBtn) activeBtn.className = "flex-1 py-2 rounded-lg bg-white dark:bg-slate-900 text-brand-600 dark:text-sky-400 shadow-sm transition font-extrabold";
            if (activeContent) activeContent.classList.remove('hidden');

            if (tabName === 'lokasi' && selectedLocationData) {
                initDetailLeafletMap(selectedLocationData.title, selectedLocationData.address);
            }
        }

        function downloadLocationSpecSheet(locTitleOverride) {
            let locTitle = locTitleOverride;
            if (!locTitle && selectedLocationData) {
                locTitle = selectedLocationData.title;
            }
            if (!locTitle) locTitle = 'Pasar Rejosari';

            const locInfo = LOCATION_COORDINATES[locTitle] || { lat: -7.3305, lng: 110.5084, orientation: 'Utara - Selatan (Kawasan Komersial Salatiga)', googleMaps: 'https://maps.google.com/?q=-7.3305,110.5084' };
            
            let item = VIDEOTRON_DATA.find(v => v.title.toLowerCase().includes(locTitle.toLowerCase()) || locTitle.toLowerCase().includes(v.title.toLowerCase()));
            if (!item && selectedLocationData) item = selectedLocationData;
            if (!item) {
                item = {
                    title: locTitle,
                    address: 'Kota Salatiga',
                    size: '8 x 4 Meter',
                    traffic: '95.000 Kendaraan / Hari',
                    priceNon: '2.200.000',
                    monthNon: '59.450.000',
                    hourNon: '210.000',
                    minuteNon: '3.800',
                };
            }

            const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            const docNo = 'SEVISA-BROSUR/' + new Date().getFullYear() + '/' + Math.floor(1000 + Math.random() * 9000);

            const pdfHtml = `
                <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; padding: 25px; color: #0f172a; max-width: 800px; margin: 0 auto; background: #ffffff;">
                    
                    <!-- HEADER KOP SURAT DISKOMINFO SALATIGA -->
                    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #1e3a8a; padding-bottom: 12px; margin-bottom: 15px;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <img src="logo.png" style="height: 55px; width: auto; object-fit: contain;">
                            <div>
                                <span style="background: #1e3a8a; color: #ffffff; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">PEMKOT SALATIGA</span>
                                <h2 style="margin: 2px 0 0 0; font-size: 15px; font-weight: 900; color: #0f172a; text-transform: uppercase;">DINAS KOMUNIKASI DAN INFORMATIKA</h2>
                                <span style="font-size: 10px; color: #475569; font-weight: 600;">Jl. Letjend Sukowati No. 51 Salatiga | Telp: (0298) 326767 | Web: sevisa.salatiga.go.id</span>
                            </div>
                        </div>
                        <div style="text-align: right; font-size: 9px; color: #64748b; font-family: monospace;">
                            <strong>NO. DOKUMEN:</strong><br>${docNo}<br>
                            <strong>TANGGAL:</strong> ${todayStr}
                        </div>
                    </div>

                    <!-- TITLE BANNER -->
                    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #ffffff; padding: 16px; border-radius: 12px; margin-bottom: 15px;">
                        <span style="background: #22c55e; color: #ffffff; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 20px; text-transform: uppercase;">BROSUR SPESIFIKASI SEVISA DISKOMINFO</span>
                        <h1 style="margin: 6px 0 2px 0; font-size: 20px; font-weight: 900; letter-spacing: -0.5px;">${item.title.toUpperCase()}</h1>
                        <p style="margin: 0; font-size: 11px; color: #93c5fd;">${item.address} • Kota Salatiga, Jawa Tengah</p>
                    </div>

                    <!-- LOKASI & KOORDINAT PETA -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 15px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 10px;">
                            <span style="font-size: 9px; font-weight: 800; color: #64748b; text-transform: uppercase; display: block;">📍 KOORDINAT GPS DIGITAL DISKOMINFO</span>
                            <strong style="font-size: 12px; color: #2563eb; font-family: monospace;">${locInfo.lat}, ${locInfo.lng}</strong>
                            <span style="font-size: 10px; color: #334155; display: block; margin-top: 4px;">Orientasi: <strong>${locInfo.orientation}</strong></span>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 10px;">
                            <span style="font-size: 9px; font-weight: 800; color: #64748b; text-transform: uppercase; display: block;">🚦 ESTIMASI TRAFIK KENDARAAN</span>
                            <strong style="font-size: 12px; color: #16a34a;">${item.traffic || '95.000 Kendaraan / Hari'}</strong>
                            <span style="font-size: 10px; color: #334155; display: block; margin-top: 4px;">Viewing Angle: <strong>Outdoor Wide Angle 140°</strong></span>
                        </div>
                    </div>

                    <!-- RINCIAN TABEL TARIF BROSUR RESMI -->
                    <div style="margin-bottom: 15px;">
                        <h3 style="font-size: 12px; font-weight: 900; color: #0f172a; margin-bottom: 8px; text-transform: uppercase; border-left: 4px solid #2563eb; padding-left: 8px;">
                            1. RINCIAN TABEL TARIF RETRIBUSI RESMI (PERWALI NO. 49 TAHUN 2018)
                        </h3>
                        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                            <thead>
                                <tr style="background: #0f172a; color: #ffffff; font-size: 10px; text-transform: uppercase;">
                                    <th style="padding: 8px; text-align: left; border: 1px solid #1e293b;">DURASI PENAYANGAN</th>
                                    
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px; font-weight: 700;">🗓️ Tarif 1 Bulan</td>
                                    <td style="padding: 8px; text-align: right; font-weight: 800; color: #2563eb;">Rp ${item.monthNon || '0'}</td>
                                    
                                </tr>
                                <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px; font-weight: 700;">📅 Tarif 1 Hari</td>
                                    <td style="padding: 8px; text-align: right; font-weight: 800; color: #2563eb;">Rp ${item.priceNon || '0'}</td>
                                    
                                </tr>
                                <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px; font-weight: 700;">⏰ Tarif 1 Jam</td>
                                    <td style="padding: 8px; text-align: right; font-weight: 800; color: #2563eb;">Rp ${item.hourNon || '0'}</td>
                                    
                                </tr>
                                <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 8px; font-weight: 700;">⏱️ Tarif 1 Menit</td>
                                    <td style="padding: 8px; text-align: right; font-weight: 800; color: #2563eb;">Rp ${item.minuteNon || '0'}</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- SPESIFIKASI HARDWARE LED SCREEN -->
                    <div style="margin-bottom: 15px;">
                        <h3 style="font-size: 12px; font-weight: 900; color: #0f172a; margin-bottom: 8px; text-transform: uppercase; border-left: 4px solid #2563eb; padding-left: 8px;">
                            2. SPESIFIKASI HARDWARE LED DISPLAY & BROADCAST SPEC
                        </h3>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center;">
                            <div style="background: #f1f5f9; padding: 8px; border-radius: 8px; border: 1px solid #cbd5e1;">
                                <span style="font-size: 8px; color: #64748b; font-weight: 800; display: block;">UKURAN SCREEN</span>
                                <strong style="font-size: 11px; color: #0f172a;">${item.size || '8 x 4 Meter'}</strong>
                            </div>
                            <div style="background: #f1f5f9; padding: 8px; border-radius: 8px; border: 1px solid #cbd5e1;">
                                <span style="font-size: 8px; color: #64748b; font-weight: 800; display: block;">PITCH LED</span>
                                <strong style="font-size: 11px; color: #0f172a;">P10 Outdoor DIP</strong>
                            </div>
                            <div style="background: #f1f5f9; padding: 8px; border-radius: 8px; border: 1px solid #cbd5e1;">
                                <span style="font-size: 8px; color: #64748b; font-weight: 800; display: block;">RESOLUSI DISPLAY</span>
                                <strong style="font-size: 11px; color: #0f172a;">1920 x 1080 Full HD</strong>
                            </div>
                            <div style="background: #f1f5f9; padding: 8px; border-radius: 8px; border: 1px solid #cbd5e1;">
                                <span style="font-size: 8px; color: #64748b; font-weight: 800; display: block;">JAM PENYIARAN</span>
                                <strong style="font-size: 11px; color: #0f172a;">06:00 - 23:00 WIB</strong>
                            </div>
                        </div>
                    </div>

                    <!-- REGULASI & KETENTUAN UMUM SEWA VIDEOTRON -->
                    <div style="background: #eff6ff; border: 1px dashed #3b82f6; padding: 10px 14px; border-radius: 10px; margin-bottom: 15px; font-size: 9px; color: #1e3a8a;">
                        <strong style="display: block; font-size: 10px; margin-bottom: 4px; text-transform: uppercase;">Ketentuan Umum Sewa Videotron Pemkot Salatiga:</strong>
                        <ul style="margin: 0; padding-left: 15px; line-height: 1.4;">
                            <li>Operasional Videotron mulai pukul 05.00 - 22.00 WIB.</li>
                            <li>Video Orientasi Landscape maks 1536x1024 (Pasar sapi: 1536×1024, Blotongan: 1296×720, Kartini: 864×576).</li>
                            <li>Video wajib dilengkapi subtitle & dikirimkan H-1 tanggal mulai tayang (Maksimal 50 MB).</li>
                            <li>Tidak mengandung SARA, Pornografi dan Pornoaksi. (Khusus paket event, tulis jam tayang pada catatan).</li>
                            <li>Pembayaran dilakukan dengan hadir ke BPKPD Kota Salatiga (Komplek Kantor Wali Kota, Jl Sukowati 51).</li>
                            <li>🕘 Jam operasional: Senin–Kamis pukul 08.00–14.30 WIB & Jumat 08.00-11.00 WIB.</li>
                            <li>Pertanyaan ke Nomor: <strong>+62 851-7337-2262</strong></li>
                        </ul>
                    </div>

                    <!-- STEMPEL DIGITAL & QR VERIFIKASI DISKOMINFO -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 8px; border-top: 1px solid #e2e8f0;">
                        <div style="font-size: 9px; color: #64748b;">
                            <span>Dokumen ini diterbitkan secara otomatis oleh Portal Resmi <strong>SEVISA</strong></span><br>
                            <span>Dinas Komunikasi dan Informatika Pemerintah Kota Salatiga</span>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 9px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">DISAHKAN OLEH:</div>
                            <div style="padding: 6px 12px; background: #0f172a; color: #ffffff; border-radius: 8px; font-size: 9px; font-weight: 900; letter-spacing: 1px;">
                                🛡️ DISKOMINFO SALATIGA
                            </div>
                        </div>
                    </div>

                </div>
            `;

            const element = document.createElement('div');
            element.innerHTML = pdfHtml;
            document.body.appendChild(element);

            show3DToast('⏳ MEMPROSES BROSUR PDF...', `Menyiapkan brosur spesifikasi resmi ${locTitle}...`, 'info');

            const opt = {
                margin:       [0.2, 0.2, 0.2, 0.2],
                filename:     `Brosur_Spesifikasi_SEVISA_${locTitle.replace(/\s+/g, '_')}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, logging: false },
                jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            if (window.html2pdf) {
                window.html2pdf().set(opt).from(element).save().then(() => {
                    document.body.removeChild(element);
                    show3DToast('📄 BROSUR PDF TERUNDUH', `Brosur Spesifikasi ${locTitle} berhasil dibuat & diunduh!`, 'success');
                }).catch(err => {
                    console.error('PDF Generation Error:', err);
                    document.body.removeChild(element);
                    window.print();
                });
            } else {
                document.body.removeChild(element);
                window.print();
            }
        }

        function openAuthGateModal(tab = 'login') {
            switchAuthGateTab(tab);
            openModal('auth-gate-screen');
        }

        function closeAuthGateModal() {
            closeModal('auth-gate-screen');
        }

        function switchAuthGateTab(tab) {
            const loginTab = document.getElementById('gate-tab-login');
            const regTab = document.getElementById('gate-tab-register');
            const loginForm = document.getElementById('gate-form-login');
            const regForm = document.getElementById('gate-form-register');

            if (tab === 'login') {
                loginTab.className = "flex-1 py-2 rounded-lg bg-white dark:bg-slate-900 text-brand-600 dark:text-sky-400 shadow-sm transition";
                regTab.className = "flex-1 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition";
                loginForm.classList.remove('hidden');
                regForm.classList.add('hidden');
            } else {
                regTab.className = "flex-1 py-2 rounded-lg bg-white dark:bg-slate-900 text-brand-600 dark:text-sky-400 shadow-sm transition";
                loginTab.className = "flex-1 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition";
                regForm.classList.remove('hidden');
                loginForm.classList.add('hidden');
            }
        }

        function handleGateAuth(event, type) {
            event.preventDefault();

            if (type === 'register') {
                const regName = document.getElementById('reg-name').value.trim();
                const regEmail = document.getElementById('reg-email').value.trim().toLowerCase();
                const regPass = document.getElementById('reg-password').value.trim();

                if (!regName || !regEmail || !regPass) {
                    show3DToast('⚠️ HARAP LENGKAPI KOLOM', 'Harap isi semua kolom pendaftaran nama, email, dan password!', 'error');
                    return;
                }

                const exists = registeredUsers.some(u => u.email === regEmail);
                if (exists) {
                    show3DToast('🚨 EMAIL SUDAH TERDAFTAR', 'Alamat email <strong>' + regEmail + '</strong> sudah terdaftar. Silakan lakukan Login.', 'error');
                    switchAuthGateTab('login');
                    document.getElementById('login-email').value = regEmail;
                    return;
                }

                const newUser = { name: regName, email: regEmail, password: regPass, company: '', phone: '', nik: '', address: '', position: '', category: 'personal' };
                registeredUsers.push(newUser);
                saveStoredUsers(registeredUsers);

                show3DToast(
                    '🎉 PENDAFTARAN AKUN BERHASIL!',
                    'Selamat <strong>' + regName + '</strong>! Akun Anda (' + regEmail + ') telah terdaftar secara resmi.<br><br>Silakan <strong>MASUK (LOGIN)</strong> menggunakan email & password Anda untuk melanjutkan pengisian Data Diri.',
                    'success'
                );

                document.getElementById('login-email').value = regEmail;
                document.getElementById('login-password').value = '';
                
                document.getElementById('reg-name').value = '';
                document.getElementById('reg-email').value = '';
                document.getElementById('reg-password').value = '';

                switchAuthGateTab('login');
                return;
            }

            if (type === 'login') {
                const loginEmail = document.getElementById('login-email').value.trim().toLowerCase();
                const loginPass = document.getElementById('login-password').value.trim();

                if (!loginEmail || !loginPass) {
                    show3DToast('⚠️ KOLOM KOSONG', 'Harap masukkan Email dan Kata Sandi Anda!', 'error');
                    return;
                }

                const foundUser = registeredUsers.find(u => u.email === loginEmail && u.password === loginPass);

                if (!foundUser) {
                    show3DToast(
                        '🚨 LOGIN GAGAL!',
                        'Email atau Kata Sandi yang Anda masukkan salah / tidak terdaftar.<br><br>Silakan periksa kembali atau lakukan Daftar Akun terlebih dahulu.',
                        'error'
                    );
                    return;
                }

                isLoggedIn = true;
                currentUser = foundUser;

                populateProfileFormData(foundUser);
                closeAuthGateModal();
                updateUserNavArea();

                if (foundUser.phone && foundUser.nik && foundUser.address) {
                    isProfileComplete = true;
                } else {
                    isProfileComplete = false;
                }
                updateProfileStatusUI();

                show3DToast(
                    '✨ SELAMAT DATANG DI SEVISA!',
                    'Halo <strong>' + foundUser.name + '</strong> 👋<br><br>Selamat datang di <strong>Portal Resmi Penyewaan Videotron Kota Salatiga</strong>. Silakan lengkapi Data Diri Anda jika ingin mengajukan penyewaan videotron.',
                    'success'
                );
            }
        }

        function populateProfileFormData(user) {
            if (!user) return;
            document.getElementById('prof-name').value = user.name || '';
            document.getElementById('prof-email').value = user.email || '';
            document.getElementById('prof-phone').value = user.phone || '';
            document.getElementById('prof-company').value = user.company || '';
            document.getElementById('prof-position').value = user.position || '';
            document.getElementById('prof-nik').value = user.nik || '';
            document.getElementById('prof-address').value = user.address || '';
            document.getElementById('prof-category').value = user.category || 'personal';

            document.getElementById('prof-display-name').innerText = user.name || 'Pengguna SEVISA';
            document.getElementById('prof-display-email').innerText = user.email || '';
        }

        function previewUserAvatar(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('profile-avatar-img').src = e.target.result;
                };
                reader.readAsDataURL(file);
                show3DToast('📸 FOTO PROFIL DIPERBARUI', 'Foto profil berhasil diunggah!', 'info');
            }
        }

        function updateUserNavArea() {
            const navArea = document.getElementById('nav-user-area');
            if (!navArea) return;

            if (isLoggedIn && currentUser) {
                navArea.innerHTML = `
                    <div class="flex items-center gap-2">
                        <button onclick="showPage('daftar-transaksi')" class="px-2.5 py-1.5 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 font-bold text-xs rounded-lg transition mr-1">Transaksi</button>
                        <button onclick="showPage('profil')" class="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition" title="Kelola Profil">
                            <div class="w-5 h-5 rounded-full bg-brand-600 text-white font-bold text-[10px] flex items-center justify-center">
                                ${currentUser.name.charAt(0)}
                            </div>
                            <span class="text-xs font-bold text-slate-800 dark:text-slate-100 max-w-[90px] truncate hidden sm:inline">${currentUser.name.split(' ')[0]}</span>
                        </button>
                        <button onclick="handleLogout()" class="p-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition border border-slate-200 dark:border-slate-800" title="Keluar Akun">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        </button>
                    </div>
                `;
            } else {
                navArea.innerHTML = `
                    <button onclick="openAuthGateModal('login')" class="px-3 py-1.5 text-xs font-bold text-brand-600 dark:text-sky-400 bg-brand-50 dark:bg-slate-800 hover:bg-brand-100 border border-brand-200 dark:border-slate-700 rounded-lg transition">
                        Masuk / Daftar
                    </button>
                `;
            }
        }

        function updateProfileStatusUI() {
            const banner = document.getElementById('profile-warning-banner');
            const dot = document.getElementById('profile-dot-status');
            const statusBadge = document.getElementById('prof-status-badge');
            const bannerText = document.getElementById('banner-status-text');

            if (isProfileComplete) {
                if (banner) banner.style.display = 'none';
                if (dot) {
                    dot.className = "w-2 h-2 rounded-full bg-emerald-500";
                    dot.title = "Profile Lengkap";
                }
                if (statusBadge) {
                    statusBadge.className = "px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px] rounded-full border border-emerald-200 dark:border-emerald-800";
                    statusBadge.innerText = "Status: Verified 100% Lengkap";
                }
            } else {
                if (banner && isLoggedIn) banner.style.display = 'flex';
                else if (banner) banner.style.display = 'none';

                if (dot) {
                    dot.className = "w-2 h-2 rounded-full bg-rose-500 animate-pulse";
                    dot.title = "Belum Lengkap";
                }
                if (statusBadge) {
                    statusBadge.className = "px-2.5 py-0.5 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-extrabold text-[10px] rounded-full border border-rose-200 dark:border-rose-800";
                    statusBadge.innerText = "Status: Belum Lengkap";
                }
                if (bannerText) bannerText.innerText = "Belum Lengkap";
            }
        }

        function saveUserProfile(event) {
            event.preventDefault();
            const profName = document.getElementById('prof-name').value.trim() || 'Pengguna';
            const company = document.getElementById('prof-company').value.trim();
            const position = document.getElementById('prof-position').value.trim();
            const phone = document.getElementById('prof-phone').value.trim();
            const email = document.getElementById('prof-email').value.trim();
            const address = document.getElementById('prof-address').value.trim();
            const nik = document.getElementById('prof-nik').value.trim();
            const category = document.getElementById('prof-category').value;

            if (!phone || !address || !nik || !company) {
                show3DToast('⚠️ KOLOM KOSONG', 'Harap lengkapi semua kolom data diri secara mendalam!', 'error');
                return;
            }

            if (currentUser) {
                currentUser.name = profName;
                currentUser.company = company;
                currentUser.position = position;
                currentUser.phone = phone;
                currentUser.email = email;
                currentUser.address = address;
                currentUser.nik = nik;
                currentUser.category = category;

                const idx = registeredUsers.findIndex(u => u.email === currentUser.email);
                if (idx !== -1) {
                    registeredUsers[idx] = currentUser;
                }
                saveStoredUsers(registeredUsers);
            }

            isProfileComplete = true;
            updateProfileStatusUI();
            updateUserNavArea();

            show3DToast(
                '🎉 DATA DIRI TERSIMPAN LENGKAP!',
                'Terima kasih <strong>' + profName + '</strong> (' + company + ')! Data diri Anda telah berhasil disimpan dan verifikasi izin penyewaan videotron telah aktif.',
                'success'
            );

            triggerBookingFlow();
        }

        const BLOG_ARTICLES_CONTENT = {
            'VDT-01': {
                subheading: '1. Pasar Rejosari Salatiga (Jl. Hasanudin)',
                p1: 'Pasang iklan videotron di kawasan Pasar Rejosari Salatiga menjadi pilihan utama bagi brand komersial yang menyasar pusat aktivitas perdagangan terbesar dengan arus kendaraan padat.',
                p2: 'Berdasarkan SK Wali Kota Salatiga No. 974/148/2022, tarif sewa harian produk non-rokok di Pasar Rejosari sebesar Rp 2.200.000 / Hari (atau Rp 59.450.000 / Bulan). ',
                p3: 'Kawasan ini memberikan paparan iklan visual 24 jam nonstop dengan daya jangkau lebih dari 65.000+ kendaraan per hari.'
            },
            'VDT-02': {
                subheading: '1. Blotongan Gate Utara Salatiga',
                p1: 'Pasang iklan videotron di titik Blotongan menyasar arus kendaraan antar-kota pada jalur utama Semarang - Surakarta di gerbang utara Kota Salatiga.',
                p2: 'Tarif sewa resmi harian produk non-rokok sebesar Rp 1.268.000 / Hari (Rp 34.315.000 / Bulan).',
                p3: 'Sangat cocok untuk branding produk ritel, otomotif, hingga sosialisasi program pemerintah.'
            },
            'VDT-03': {
                subheading: '1. Selasar Kartini Pusat Kota',
                p1: 'Videotron Selasar Kartini berada di pusat kawasan pendidikan, perkantoran, dan fasilitas umum Kota Salatiga.',
                p2: 'Tarif sewa resmi harian produk non-rokok sebesar Rp 716.000 / Hari (Rp 19.367.000 / Bulan).',
                p3: 'Media efektif untuk menjangkau audiens pelajar, mahasiswa, dan pejalan kaki di jantung kota.'
            },
            'VDT-04': {
                subheading: '1. Alun-Alun Salatiga',
                p1: 'Videotron Alun-Alun Salatiga terpasang di Lapangan Pancasila yang merupakan titik kumpul utama warga Salatiga.',
                p2: 'Tarif sewa resmi harian produk non-rokok sebesar Rp 698.000 / Hari (Rp 18.881.000 / Bulan).',
                p3: 'Menyediakan sudut pandang paparan luas bagi berbagai event publik dan promosi brand.'
            }
        };

        // DYNAMIC PORTFOLIO MERGER FROM LOCALSTORAGE CMS
        function getMergedPortfolioData() {
    let customSaved = localStorage.getItem('sevisa_portfolio');
    let customItems = customSaved ? JSON.parse(customSaved) : [];
    // Only show disetujui or items without status (legacy)
    let filtered = customItems.filter(i => !i.status || i.status === 'disetujui');
    return [...filtered, ...PORTFOLIO_DATABASE];
}

        function openBlogArticleDetail(articleKey) {
            let savedBlogs = localStorage.getItem('sevisa_blogs');
            let customBlogs = savedBlogs ? JSON.parse(savedBlogs) : [];
            let customFound = customBlogs.find(b => b.id === articleKey);

            let data = customFound || BLOG_ARTICLES_CONTENT[articleKey] || BLOG_ARTICLES_CONTENT['VDT-01'];
            
            document.getElementById('art-det-subheading').innerText = data.subheading || data.title;
            document.getElementById('art-det-p1').innerText = data.p1;
            document.getElementById('art-det-p2').innerText = data.p2;
            document.getElementById('art-det-p3').innerText = data.p3 || '';

            document.getElementById('blog-list-view').classList.add('hidden');
            document.getElementById('blog-detail-view').classList.remove('hidden');

            window.scrollTo({ top: document.getElementById('page-blog').offsetTop, behavior: 'smooth' });
        }

        function closeBlogArticleDetail() {
            document.getElementById('blog-detail-view').classList.add('hidden');
            document.getElementById('blog-list-view').classList.remove('hidden');

            window.scrollTo({ top: document.getElementById('page-blog').offsetTop, behavior: 'smooth' });
        }

        function showPage(pageId) {
            const pages = ['home', 'tentang', 'lokasi', 'detail-lokasi', 'proyek', 'blog', 'cek-status', 'profil', 'daftar-transaksi'];
            pages.forEach(p => {
                const el = document.getElementById('page-' + p);
                if (el) el.classList.add('hidden');

                const navBtn = document.getElementById('nav-' + p);
                if (navBtn) {
                    navBtn.className = "px-2.5 py-1.5 rounded-lg hover:text-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300 font-bold";
                }
            });

            const target = document.getElementById('page-' + pageId);
            if (target) target.classList.remove('hidden');

            const activeNav = document.getElementById('nav-' + pageId);
            if (activeNav) {
                activeNav.className = "px-2.5 py-1.5 rounded-lg text-brand-600 dark:text-sky-400 bg-brand-50 dark:bg-slate-800 font-black transition";
            }

            if (pageId === 'daftar-transaksi') {
        renderDaftarTransaksi();
    }
    if (pageId === 'home') {
                renderVideotronCards(getStoredUserLocations());
            }

            if (pageId === 'lokasi') {
                initPageLokasiMaps();
            }

            if (pageId === 'proyek') {
                renderPortfolioGrid(getMergedPortfolioData());
            }

            if (pageId === 'blog') {
                closeBlogArticleDetail();
            }

            if (pageId === 'cek-status') {
                const searchInput = document.getElementById('status-search-code');
                const resultCard = document.getElementById('status-result-card');
                const emptyPrompt = document.getElementById('status-empty-prompt');
                if (searchInput && searchInput.value.trim() !== '') {
                    searchOrderStatus();
                } else {
                    if (resultCard) resultCard.classList.add('hidden');
                    if (emptyPrompt) emptyPrompt.classList.remove('hidden');
                }
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // OPEN PAYMENT GATEWAY SELECTION MODAL
        function openPaymentGatewayModal(code) {
            const found = orderDatabase.find(o => o.code === code) || orderDatabase[0];
            document.getElementById('pay-modal-code').innerText = found.code;
            
            let priceMatch = found.dates.match(/Rp\s*[\d\.]+/);
            document.getElementById('pay-modal-amount').innerText = priceMatch ? priceMatch[0] : 'Rp 121.043.750';
            
            openModal('payment-gateway-modal');
        }

        function submitUserPaymentReceipt(e) {
            e.preventDefault();
            const code = document.getElementById('pay-modal-code').innerText;
            const fileInput = document.getElementById('pay-receipt-file');
            
            if (!fileInput.files || fileInput.files.length === 0) {
                show3DToast('⚠️ UPLOAD BUKTI BAYAR', 'Silakan lampirkan file bukti transfer Anda terlebih dahulu.', 'error');
                return;
            }
            
            let orders = getStoredOrders();
            const idx = orders.findIndex(o => o.code === code);
            if (idx !== -1) {
                orders[idx].status = 'pembayaran_diverifikasi';
                orders[idx].statusLabel = 'BUKTI BAYAR DIUNGGAH (VERIFIKASI BENDAHARA)';
                orders[idx].statusDesc = '🟠 <strong>Status: Bukti Pembayaran Diunggah</strong><br>Terima kasih! Bukti pembayaran retribusi Anda telah diterima dan sedang diperiksa oleh Bendahara Diskominfo Kota Salatiga.';
                orders[idx].paymentReceiptFile = fileInput.files[0].name;
                
                saveStoredOrders(orders);
                closeModal('payment-gateway-modal');
                renderOrderStatusCard(orders[idx]);
                
                show3DToast('✅ BUKTI BAYAR TERKIRIM', 'Bukti pembayaran Anda berhasil diunggah. Menunggu verifikasi Lunas dari Admin Diskominfo.', 'success');
            }
        }

        function openModal(id) {
            document.getElementById(id).classList.remove('hidden');
            document.getElementById(id).classList.add('flex');
        }

        function closeModal(id) {
            document.getElementById(id).classList.add('hidden');
            document.getElementById(id).classList.remove('flex');
        }

        // SYNC TENTANG KAMI FROM ADMIN CMS (LOCALSTORAGE)
        function renderAboutPageCMS() {
            let saved = localStorage.getItem('sevisa_about');
            if (saved) {
                try {
                    let about = JSON.parse(saved);
                    const titleEl = document.getElementById('about-page-title');
                    const descEl = document.getElementById('about-page-desc');
                    const taxEl = document.getElementById('about-page-tax');
                    if (titleEl && about.title) titleEl.innerText = about.title;
                    if (descEl && about.desc) descEl.innerText = about.desc;
                    if (taxEl && about.tax) taxEl.innerText = about.tax;
                } catch(e) {}
            }
        }

        // OPEN PRINTABLE INVOICE MODAL
        function openOfficialInvoiceModal() {
            const inputCode = document.getElementById('status-search-code').value.trim().toUpperCase() || 'SVS-148972';
            const found = orderDatabase.find(o => o.code === inputCode) || orderDatabase[0];

            document.getElementById('inv-no').innerText = `INV/SVS/2026/08/${found.code.replace('SVS-', '')}`;
            document.getElementById('inv-client-name').innerText = found.userName || 'Alfi Fadli';
            document.getElementById('inv-client-company').innerText = found.company || 'Personal';
            document.getElementById('inv-location').innerText = `Videotron ${found.location}`;
            document.getElementById('inv-dates').innerText = found.dates;
            document.getElementById('inv-file').innerText = `Materi: ${found.file}`;
            document.getElementById('inv-table-desc').innerText = `Sewa Layanan Penyiaran Videotron ${found.location} (${found.dates})`;

            openModal('official-invoice-modal');
        }

        // TOGGLE & SEND LIVE CHAT
        function toggleLiveChatDrawer() {
            const box = document.getElementById('chat-window-box');
            if (box.classList.contains('hidden')) {
                box.classList.remove('hidden');
                box.classList.add('flex');
                renderLiveChatMessages();
            } else {
                box.classList.add('hidden');
                box.classList.remove('flex');
            }
        }

        function openLiveChatDrawer() {
            const box = document.getElementById('chat-window-box');
            box.classList.remove('hidden');
            box.classList.add('flex');
            renderLiveChatMessages();
        }

        const DEFAULT_SAMPLE_CHATS = [
            { sender: 'user', userName: 'Alfi Fadli', text: 'Halo Admin Diskominfo! Mau tanya apakah slot Videotron Selasar Kartini untuk bulan September 2026 masih tersedia?', time: '10:15' },
            { sender: 'admin', userName: 'Admin Diskominfo', text: 'Halo Sdr/i Alfi Fadli! Slot Videotron Selasar Kartini masih tersedia. Silakan melakukan booking pengajuan sewa pada website.', time: '10:18' },
            { sender: 'user', userName: 'Budi Santoso', text: 'Selamat pagi Admin, berapa lama proses verifikasi bukti bayar retribusi PAD?', time: '10:45' }
        ];

        function getStoredChats() {
            const saved = localStorage.getItem('sevisa_chats');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
                } catch(e) {}
            }
            localStorage.setItem('sevisa_chats', JSON.stringify(DEFAULT_SAMPLE_CHATS));
            return DEFAULT_SAMPLE_CHATS;
        }

        function editUserChatMessage(idx) {
            let chats = getStoredChats();
            if (!chats[idx]) return;
            const currentText = chats[idx].text;
            const newText = prompt('Edit pesan obrolan Anda:', currentText);
            if (newText !== null && newText.trim() !== '') {
                chats[idx].text = newText.trim();
                chats[idx].time = (chats[idx].time || '').replace(' (diedit)', '') + ' (diedit)';
                localStorage.setItem('sevisa_chats', JSON.stringify(chats));
                window.dispatchEvent(new Event('storage'));
                renderLiveChatMessages();
                show3DToast('✏️ PESAN DIEDIT', 'Pesan obrolan Anda berhasil diperbarui.', 'success');
            }
        }

        function deleteUserChatMessage(idx) {
            if (confirm('Hapus pesan obrolan ini dari percakapan?')) {
                let chats = getStoredChats();
                chats.splice(idx, 1);
                localStorage.setItem('sevisa_chats', JSON.stringify(chats));
                window.dispatchEvent(new Event('storage'));
                renderLiveChatMessages();
                show3DToast('🗑️ PESAN DIHAPUS', 'Pesan obrolan telah dihapus.', 'info');
            }
        }

        function renderLiveChatMessages() {
            const container = document.getElementById('chat-messages-container');
            let chats = getStoredChats();

            let html = `
                <div class="bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200 p-3 rounded-2xl max-w-[85%] space-y-1 shadow-sm">
                    <strong class="font-bold text-[10px] text-blue-600 block">👤 Admin Diskominfo Salatiga</strong>
                    <p class="text-[11px] leading-relaxed">Halo! Selamat datang di layanan konsultasi penyewaan videotron resmi Kota Salatiga. Ada yang bisa kami bantu mengenai jadwal slot atau berkas pengajuan?</p>
                </div>
            `;

            chats.forEach((msg, idx) => {
                if (msg.sender === 'user') {
                    html += `
                        <div class="bg-emerald-600 text-white p-3 rounded-2xl max-w-[85%] ml-auto space-y-1 shadow-sm relative group">
                            <div class="flex items-center justify-between gap-2 border-b border-emerald-500/50 pb-1 mb-1">
                                <strong class="font-bold text-[10px] text-emerald-200">${msg.userName || 'Anda'} • ${msg.time || ''}</strong>
                                <div class="flex gap-1.5 opacity-90">
                                    <button onclick="editUserChatMessage(${idx})" title="Edit Pesan" class="hover:text-amber-300 transition text-[10px] font-bold">✏️ Edit</button>
                                    <button onclick="deleteUserChatMessage(${idx})" title="Hapus Pesan" class="hover:text-rose-300 transition text-[10px] font-bold">🗑️ Hapus</button>
                                </div>
                            </div>
                            <p class="text-[11px] leading-relaxed">${msg.text}</p>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200 p-3 rounded-2xl max-w-[85%] space-y-1 shadow-sm">
                            <strong class="font-bold text-[10px] text-blue-600 block">👤 Admin Diskominfo Salatiga • ${msg.time || ''}</strong>
                            <p class="text-[11px] leading-relaxed">${msg.text}</p>
                        </div>
                    `;
                }
            });

            container.innerHTML = html;
            container.scrollTop = container.scrollHeight;
        }

        function sendUserChatMessage(e) {
            e.preventDefault();
            const input = document.getElementById('chat-user-input');
            const msgText = input.value.trim();
            if (!msgText) return;

            let chats = getStoredChats();

            chats.push({
                sender: 'user',
                userName: currentUser ? currentUser.name : 'Pengguna',
                text: msgText,
                time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            });

            localStorage.setItem('sevisa_chats', JSON.stringify(chats));
            window.dispatchEvent(new Event('storage'));

            input.value = '';
            renderLiveChatMessages();
        }

        // LISTEN FOR CMS DATA UPDATES & REAL-TIME STATUS / CHAT CHANGES FROM ADMIN PORTAL (ADMIN.HTML)
        let storageDebounceTimer = null;
        window.addEventListener('storage', () => {
            if (storageDebounceTimer) cancelAnimationFrame(storageDebounceTimer);
            storageDebounceTimer = requestAnimationFrame(() => {
                orderDatabase = getStoredOrders();
                renderVideotronCards(getStoredUserLocations());
                renderPortfolioGrid(getMergedPortfolioData());
                renderAboutPageCMS();
                renderUserLokasiPageCards();
                renderLiveChatMessages();

                const searchInput = document.getElementById('status-search-code');
                const resultCard = document.getElementById('status-result-card');
                
                if (searchInput && searchInput.value.trim() !== '') {
                    const inputCode = searchInput.value.trim().toUpperCase();
                    const foundOrder = orderDatabase.find(o => o.code === inputCode || (o.phone && o.phone === inputCode));
                    if (foundOrder && resultCard && !resultCard.classList.contains('hidden')) {
                        renderOrderStatusCard(foundOrder);
                    }
                }
            });
        });

        // AUTO REFRESH LIVE CHAT MESSAGES EVERY 2 SECONDS IN BACKGROUND
        setInterval(() => {
            const box = document.getElementById('chat-window-box');
            if (box && !box.classList.contains('hidden')) {
                renderLiveChatMessages();
            }
        }, 2000);

        window.addEventListener('DOMContentLoaded', () => {
            initTheme();
            renderVideotronCards(getStoredUserLocations());
            renderUserLokasiPageCards();
            renderPortfolioGrid(getMergedPortfolioData());
            renderAboutPageCMS();
            updateUserNavArea();
            updateProfileStatusUI();
        });
    

// JABATAN VISIBILITY LOGIC
function toggleJabatanVisibility() {
    const cat = document.getElementById('prof-category').value;
    const pos = document.getElementById('prof-position');
    if(cat === 'perorangan') {
        if(pos) { pos.style.display = 'none'; pos.removeAttribute('required'); pos.value = ''; }
    } else {
        if(pos) { pos.style.display = 'block'; pos.setAttribute('required', 'true'); }
    }
}

// FAQ LOGIC
const DEFAULT_FAQS = [
    { q: "Bagaimana cara melakukan penyewaan?", a: "Pilih menu Beranda, klik tombol Sewa pada lokasi yang diinginkan, lengkapi formulir (Lokasi, Paket, Tanggal, Jam), dan unggah materi iklan Anda." },
    { q: "Bagaimana cara memilih paket?", a: "Pada form pemesanan, pilih antara Paket Alfa (min 30 menit), Paket Beta (min 20 menit), atau Paket Event (min 30 menit dengan jam spesifik)." },
    { q: "Bagaimana cara mengetahui status transaksi?", a: "Gunakan menu Cek Status dan masukkan nomor WhatsApp Anda, atau login ke akun Anda dan buka menu Daftar Transaksi." },
    { q: "Bagaimana sistem perhitungan tarif?", a: "Tarif dihitung berdasarkan durasi tayang dikalikan tarif per menit untuk lokasi yang dipilih. Waktu dibulatkan ke atas (kelipatan 1 menit)." }
];

function getStoredFAQs() {
    const saved = localStorage.getItem('sevisa_faqs');
    return saved ? JSON.parse(saved) : DEFAULT_FAQS;
}

function renderFAQs() {
    const container = document.getElementById('faq-accordion-container');
    if (!container) return;
    const faqs = getStoredFAQs();
    let html = '';
    faqs.forEach((faq, i) => {
        html += `
        <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <button onclick="document.getElementById('faq-ans-${i}').classList.toggle('hidden')" class="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-slate-800 dark:text-slate-200 transition">
                ${faq.q}
            </button>
            <div id="faq-ans-${i}" class="hidden p-4 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-sm">
                ${faq.a}
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    toggleJabatanVisibility();
    renderFAQs();
});


function renderDaftarTransaksi() {
    const container = document.getElementById('transaksi-list-container');
    if (!container) return;
    if (!isLoggedIn || !currentUser) {
        container.innerHTML = '<p class="text-slate-500">Silakan login untuk melihat transaksi.</p>';
        return;
    }

    const myOrders = orderDatabase.filter(o => o.userName === currentUser.name || o.phone === currentUser.phone);
    if (myOrders.length === 0) {
        container.innerHTML = '<div class="p-6 bg-slate-50 rounded-2xl text-center text-slate-500">Belum ada transaksi.</div>';
        return;
    }

    let html = '';
    myOrders.forEach(o => {
        let testiBtn = '';
        if (o.status === 'selesai' || o.status === 'terkonfirmasi') {
            testiBtn = `<button onclick="openTestimoniModal('${o.code}', '${o.location}')" class="mt-3 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-xs">Beri Testimoni</button>`;
        }
        
        html += `
        <div class="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
            <div class="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                <div>
                    <span class="font-mono font-bold text-brand-600 text-sm">${o.code}</span>
                    <h4 class="font-black text-slate-800 dark:text-white mt-1">${o.location}</h4>
                </div>
                <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-extrabold rounded-md uppercase border border-slate-200 dark:border-slate-700">${o.status}</span>
            </div>
            <div class="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <p><strong>Paket:</strong> ${o.paket || 'Standar'}</p>
                <p><strong>Waktu:</strong> ${o.dates}</p>
            </div>
            ${testiBtn}
        </div>
        `;
    });
    container.innerHTML = html;
}

function openTestimoniModal(code, location) {
    document.getElementById('testimoni-code').value = code;
    document.getElementById('testimoni-loc').value = location;
    openModal('testimoni-modal');
}

function submitTestimoni(e) {
    e.preventDefault();
    const loc = document.getElementById('testimoni-loc').value;
    const rating = document.getElementById('testimoni-rating').value;
    const desc = document.getElementById('testimoni-text').value;

    let customSaved = localStorage.getItem('sevisa_portfolio');
    let customItems = customSaved ? JSON.parse(customSaved) : [];

    customItems.push({
        id: 'TESTI-' + Math.floor(Math.random()*90000),
        title: 'Testimoni Pelanggan',
        client: currentUser.name,
        location: loc,
        type: 'image',
        mediaLabel: '📝 Testimoni',
        category: currentUser.category === 'perorangan' ? 'umkm' : currentUser.category,
        dates: new Date().toLocaleDateString('id-ID'),
        freq: '-',
        description: desc,
        rating: rating,
        status: 'menunggu'
    });

    localStorage.setItem('sevisa_portfolio', JSON.stringify(customItems));
    window.dispatchEvent(new Event('storage'));
    
    closeModal('testimoni-modal');
    show3DToast('✅ TESTIMONI TERKIRIM', 'Terima kasih atas testimoni Anda! Menunggu persetujuan admin sebelum ditampilkan.', 'success');
}
