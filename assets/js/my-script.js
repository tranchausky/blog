
  let posts = null;

  document.getElementById('search-input').addEventListener('input', async function () {
    const query = this.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');

    if (!posts) {
      try {
        const res = await fetch('/search.json');
        posts = await res.json();
      } catch (err) {
        console.error('Không thể tải search.json:', err);
        return;
      }
    }

    // Xóa kết quả cũ
    resultsContainer.innerHTML = '';

    if (query === '') return;

    // Lọc bài viết khớp tiêu đề
    const matched = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.url.toLowerCase().includes(query)
    );

    // Hiển thị kết quả
    if (matched.length === 0) {
      resultsContainer.innerHTML = '<li>Không tìm thấy bài viết.</li>';
    } else {
      matched.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${post.url}">${post.title}</a>`;
        resultsContainer.appendChild(li);
      });
    }
  });
