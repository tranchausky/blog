---
title: Home
layout: home
---

<h1>My Blog</h1>

<ul>
  {% for post in paginator.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

<div class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path }}">« Back</a>
  {% endif %}

  <span>Page {{ paginator.page }} / {{ paginator.total_pages }}</span>

  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path }}">Next »</a>
  {% endif %}
</div>
