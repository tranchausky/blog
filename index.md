---
title: Home
layout: home
pagination:
  enabled: true
---

<h1>My Blog</h1>

<ul>
  {% for post in paginator.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
