const backgroundText = document.querySelector('.bgSpan');
const backgroundX = document.querySelector('.line.X');
const backgroundY = document.querySelector('.line.Y');
const target = document.querySelector('.target');
document.addEventListener('mousemove', (e) => {
    backgroundText.textContent = `${e.clientX}px, ${e.clientY}px`;
    backgroundText.style.top = `${e.clientY}px`;
    backgroundText.style.left = `${e.clientX}px`;
    backgroundX.style.top = `${e.clientY}px`;
    backgroundY.style.left = `${e.clientX}px`;
    target.style.top = `${e.clientY}px`;
    target.style.left = `${e.clientX}px`;
});