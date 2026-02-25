const navSound = document.getElementById('navSound');

function playNavSound() {
    if (!navSound) return;

    navSound.currentTime = 0; // reinicia para permitir spam
    navSound.play().catch(() => {});
}

navSound.volume = 0.1;

const rail = document.getElementById('rail');
const cards = Array.from(rail.querySelectorAll('.card'));

let currentIndex = 0;

function setActive(index) {
    currentIndex = Math.max(0, Math.min(index, cards.length - 1));

    cards.forEach(c => c.classList.remove('is-active'));
    const active = cards[currentIndex];
    active.classList.add('is-active');

    active.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
    });
}

// Primera activa al cargar
window.addEventListener('DOMContentLoaded', () => setActive(0));

// Botones
document.getElementById('prev')?.addEventListener('click', () => {
    playNavSound();
    setActive(currentIndex - 1);
});

document.getElementById('next')?.addEventListener('click', () => {
    playNavSound();
    setActive(currentIndex + 1);
});
// Teclado (flechas + enter)
window.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;

    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        playNavSound();
        setActive(currentIndex - 1);
        return;
    }

    if (e.key === 'ArrowRight') {
        e.preventDefault();
        playNavSound();
        setActive(currentIndex + 1);
        return;
    }

    if (e.key === 'Enter') {
        e.preventDefault();
        const activeCard = cards[currentIndex];
        activeCard?.click();
    }
});