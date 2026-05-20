const quotes = [
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    tags: ["readability", "craftsmanship"]
  },
  {
    text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    author: "Brian W. Kernighan",
    tags: ["debugging", "simplicity"]
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
    tags: ["readability", "philosophy"]
  },
  {
    text: "The best code is no code at all.",
    author: "Jeff Atwood",
    tags: ["simplicity", "minimalism"]
  },
  {
    text: "It's not a bug — it's an undocumented feature.",
    author: "Anonymous",
    tags: ["humor", "debugging"]
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    tags: ["problem-solving", "philosophy"]
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
    tags: ["craftsmanship", "performance"]
  },
  {
    text: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
    tags: ["simplicity", "efficiency"]
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    tags: ["readability", "humor"]
  },
  {
    text: "The most disastrous thing that you can ever learn is your first programming language.",
    author: "Alan Kay",
    tags: ["learning", "philosophy"]
  },
  {
    text: "Walking on water and developing software from a specification are easy if both are frozen.",
    author: "Edward V. Berard",
    tags: ["humor", "requirements"]
  },
  {
    text: "Truth can only be found in one place: the code.",
    author: "Robert C. Martin",
    tags: ["craftsmanship", "philosophy"]
  }
];

let current = 0;
let typing = false;

const quoteEl = document.getElementById('quote-text');
const authorEl = document.getElementById('quote-author');
const counterEl = document.getElementById('counter');
const tagRow = document.getElementById('tag-row');
const card = document.getElementById('card');

function pad(n) { return String(n).padStart(2, '0'); }

function typeText(el, text, speed = 22) {
  return new Promise(resolve => {
    el.textContent = '';
    let i = 0;
    typing = true;
    const tick = () => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i++);
        setTimeout(tick, speed);
      } else {
        typing = false;
        resolve();
      }
    };
    tick();
  });
}

function renderTags(tags) {
  tagRow.innerHTML = '';
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'tag active';
    span.textContent = `#${tag}`;
    tagRow.appendChild(span);
  });
}

async function showQuote(index, direction = 1) {
  if (typing) return;

  card.classList.add('fade');
  await new Promise(r => setTimeout(r, 300));

  const q = quotes[index];
  counterEl.textContent = `${pad(index + 1)} / ${pad(quotes.length)}`;
  authorEl.textContent = '';

  card.classList.remove('fade');
  await new Promise(r => setTimeout(r, 50));

  await typeText(quoteEl, q.text, 18);
  await typeText(authorEl, q.author, 40);
  renderTags(q.tags);
}

document.getElementById('next-btn').addEventListener('click', () => {
  current = (current + 1) % quotes.length;
  showQuote(current, 1);
});

document.getElementById('prev-btn').addEventListener('click', () => {
  current = (current - 1 + quotes.length) % quotes.length;
  showQuote(current, -1);
});

// Keyboard support
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') document.getElementById('next-btn').click();
  if (e.key === 'ArrowLeft') document.getElementById('prev-btn').click();
});

// Initial load
showQuote(0);
