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
document.getElementById('prev')?.addEventListener('click', () => setActive(currentIndex - 1));
document.getElementById('next')?.addEventListener('click', () => setActive(currentIndex + 1));

// Teclado (flechas)
window.addEventListener('keydown', (e) => {
    // Si estás escribiendo en un input/textarea, no interceptamos flechas
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;

    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActive(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActive(currentIndex + 1);
    }
});