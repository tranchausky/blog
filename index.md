---
title: Home
layout: home
---

<h1>My Blog</h1>

{% assign posts_per_page = 5 %}
{% assign page_num = page.page_num | default: 1 %}
{% assign start = posts_per_page | times: page_num | minus: posts_per_page %}
{% assign end = posts_per_page | times: page_num %}

{% assign sliced = site.posts | slice: start, posts_per_page %}
{% for post in sliced %}
  <h2>{{ post.title }}</h2>
{% endfor %}

{% if page_num > 1 %}
  <a href="/page{{ page_num | minus: 1 }}">← Trước</a>
{% endif %}
<a href="/page{{ page_num | plus: 1 }}">Sau →</a>
