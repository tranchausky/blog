  let postsSearch = null;
  document.getElementById('search-input').addEventListener('input', async function () {
    const query = this.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');
    if (!postsSearch) {
      try {
        const res = await fetch('/search.json');
        postsSearch = await res.json();
      } catch (err) {
        console.error('Cannot get search.json:', err);
        return;
      }
    }

    resultsContainer.innerHTML = '';

    if (query === '') return;

    const matched = postsSearch.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.url.toLowerCase().includes(query)
    );

    if (matched.length === 0) {
      resultsContainer.innerHTML = '<li>Not found.</li>';
    } else {
      matched.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${post.url}">${post.title}</a>`;
        resultsContainer.appendChild(li);
      });
    }
  });

let posts = [];
let atpage = 1;
const limit = 5;

async function loadPosts() {
  try {
    const res = await fetch('/search.json');
    posts = await res.json();
    render(); // render trang đầu tiên
  } catch (err) {
    console.error('Cannot get search.json:', err);
  }
}

function render() {
  const start = (atpage - 1) * limit;
  const end = start + limit;
  const paginated = posts.slice(start, end);

  const container = document.getElementById('post-list');
  container.innerHTML = '';

  paginated.forEach(post => {
    const item = document.createElement('div');
    item.innerHTML = `<a href="${post.url}">${post.title}</a> <sup>${convertUlrDate(post.url)}</sup>`;
    container.appendChild(item);
  });

  document.getElementById('page-num').textContent = `Page ${atpage}`;
  updateButtons();
}

function nextPage() {
  if (atpage * limit >= posts.length) return;
  atpage++;
  render();
}

function prevPage() {
  if (atpage === 1) return;
  atpage--;
  render();
}

function updateButtons() {
  document.querySelector('#pagination button:nth-child(1)').disabled = (atpage === 1);
  document.querySelector('#pagination button:nth-child(3)').disabled = (atpage * limit >= posts.length);
}

// Gọi lúc đầu
loadPosts();

function convertUlrDate(url){
  const match = url.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
  if (match) {
    const [_, year, month, day] = match;
    const dateString = `${year}-${month}-${day}`;
    return dateString;
  } else {
    return '';
  }
}