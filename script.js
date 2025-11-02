document.addEventListener('DOMContentLoaded', () => {
    // === Elemen Halaman ===
    const introPage = document.getElementById('introPage');
    const openMainBtn = document.getElementById('openMainBtn');
    const mainContent = document.getElementById('mainContent');
    const galleryBtn = document.getElementById('showGalleryBtn');
    const galleryContainer = document.getElementById('galleryContainer');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const heartRainContainer = document.querySelector('.heart-rain-container');

    let isGalleryVisible = false;

    // === Fungsi Hati Berjatuhan (Sama) ===
    function createHeart() {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
        heart.style.transform = `translateY(-${Math.random() * 20 + 10}vh)`;
        heartRainContainer.appendChild(heart);
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // === Event Listener ===

    // 1. Membuka Halaman Utama (Sama)
    openMainBtn.addEventListener('click', () => {
        introPage.classList.remove('active');
        setTimeout(() => {
            introPage.style.display = 'none';
            mainContent.classList.add('active');
            setInterval(createHeart, 300); // Buat hati setiap 300ms
        }, 500);
    });

    // 2. Tombol "Ya, Aku Sayang Kamu!" (Sama)
    yesBtn.addEventListener('click', () => {
        alert('Yess! Terima kasih banyak sayangku! Aku janji akan bahagiakan kamu terus! ❤️');
        yesBtn.textContent = 'TERIMA KASIH! 🥰';
        yesBtn.style.backgroundColor = '#4CAF50'; // Hijau tanda sukses
        noBtn.style.display = 'none'; 
    });

    // 3. Tombol "Belum Tahu..." (Sama)
    const moveNoButton = () => {
        const buttonWrapper = document.querySelector('.button-wrapper');
        const wrapperRect = buttonWrapper.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        let newTop = Math.random() * (wrapperRect.height - btnRect.height);
        let newLeft = Math.random() * (wrapperRect.width - btnRect.width);

        noBtn.style.top = newTop + 'px';
        noBtn.style.left = newLeft + 'px';
    };
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        moveNoButton();
        alert('Eits, nggak bisa! 😜 Kamu harus pilih "Iya"!'); 
    });


    // 4. Membuka/Menutup Galeri Foto (REVISI WARNA DI SINI)
    galleryBtn.addEventListener('click', () => {
        if (!isGalleryVisible) {
            galleryContainer.classList.add('show');
            galleryItems.forEach((item, index) => {
                item.style.animation = 'none';
                item.offsetHeight;
                item.style.animation = `popIn 0.6s ease-out forwards ${index * 0.15}s`;
                setTimeout(() => {
                    const captionOverlay = item.querySelector('.caption-overlay');
                    if (captionOverlay) {
                        captionOverlay.textContent = item.dataset.caption;
                        captionOverlay.style.transform = 'translateY(0)';
                    }
                }, (index * 0.15 + 0.5) * 1000);
            });
            galleryBtn.textContent = 'Tutup Galeri Kenangan 💔';
            
            // REVISI WARNA: Ganti warna merah jadi oranye/kuning (tanda hati-hati)
            galleryBtn.style.backgroundColor = '#f59e0b'; 
            
            isGalleryVisible = true;
        } else {
            galleryContainer.classList.remove('show');
            galleryItems.forEach((item) => {
                item.style.animation = 'none';
                const captionOverlay = item.querySelector('.caption-overlay');
                if (captionOverlay) {
                    captionOverlay.style.transform = 'translateY(100%)';
                }
            });
            galleryBtn.textContent = 'Lihat Betapa Indahnya Kenangan Kita! ✨';
            
            // REVISI WARNA: Kembalikan ke warna biru default
            galleryBtn.style.backgroundColor = '#3B82F6'; 
            
            isGalleryVisible = false;
        }
    });

    // Inisialisasi (Sama)
    introPage.classList.add('active');
});