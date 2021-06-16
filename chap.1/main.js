const backgroundText = document.querySelector('.bgSpan');
const backgroundX = document.querySelector('.line.X');
const backgroundY = document.querySelector('.line.Y');
const target = document.querySelector('.target');

window.addEventListener('load', () =>{
    const targetRect = target.getBoundingClientRect();
    const targetHalfWidth = targetRect.width / 2;
    const targetHalfHeight = targetRect.height / 2;

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
    
        backgroundText.textContent = `${x}px, ${y}px`;
        // backgroundText.style.top = `${e.clientY}px`;
        // backgroundText.style.left = `${e.clientX}px`;
        // backgroundX.style.top = `${e.clientY}px`;
        // backgroundY.style.left = `${e.clientX}px`;
        // target.style.top = `${e.clientY}px`;
        // target.style.left = `${e.clientX}px`;
    
        backgroundText.style.transform = `translate(${x}px, ${y}px)`;
        backgroundX.style.transform = `translate(0, ${y}px)`;
        backgroundY.style.transform = `translate(${x}px, 0)`;
        target.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeight}px)`;
    });
});
