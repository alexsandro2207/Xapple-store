const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numberIndicator = document.querySelector('.numbers');

let active = 0;
const total = items.length;
let timer = null;
const delay = 4000;

function renderSlider() {
  if (!items.length) return;

  items.forEach((item, index) => {
    item.classList.toggle('active', index === active);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === active);
  });

  if (numberIndicator) {
    numberIndicator.textContent = String(active + 1).padStart(2, '0');
  }
}

function update(direction) {
  if (!total) return;

  active = (active + direction + total) % total;
  renderSlider();
  restartAutoPlay();
}

function startAutoPlay() {
  if (!total) return;

  timer = setInterval(() => {
    update(1);
  }, delay);
}

function restartAutoPlay() {
  if (timer) {
    clearInterval(timer);
  }

  startAutoPlay();
}

if (prevButton) {
  prevButton.addEventListener('click', () => update(-1));
}

if (nextButton) {
  nextButton.addEventListener('click', () => update(1));
}

if (items.length) {
  renderSlider();
  startAutoPlay();
}

const showcase = document.querySelector('.product-showcase');

if (showcase) {
  showcase.addEventListener('mouseenter', () => {
    if (timer) {
      clearInterval(timer);
    }
  });

  showcase.addEventListener('mouseleave', () => {
    restartAutoPlay();
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    update(-1);
  }

  if (event.key === 'ArrowRight') {
    update(1);
  }
});

