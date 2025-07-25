  let posts = null;
  document.getElementById('search-input').addEventListener('input', async function () {
    const query = this.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');
    if (!posts) {
      try {
        const res = await fetch('/search.json');
        posts = await res.json();
      } catch (err) {
        console.error('Cannot get search.json:', err);
        return;
      }
    }

    resultsContainer.innerHTML = '';

    if (query === '') return;

    const matched = posts.filter(post =>
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
