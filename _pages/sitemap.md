---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

A list of all the posts and pages found on the site. For you robots out there, there is an [XML version]({{ base_path }}/sitemap.xml) available for digesting as well.

<style>
.sitemap-section {
  margin-bottom: 2em;
}
.sitemap-section h2 {
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
  color: #333;
}
.sitemap-list {
  list-style: none;
  padding-left: 0;
}
.sitemap-list li {
  margin-bottom: 0.5em;
  padding-left: 1.2em;
  position: relative;
}
.sitemap-list li:before {
  content: "›";
  position: absolute;
  left: 0;
  color: #008080;
  font-weight: bold;
}
.sitemap-list a {
  text-decoration: none;
  color: #404040;
}
.sitemap-list a:hover {
  color: #008080;
  text-decoration: underline;
}
.sitemap-meta {
  font-size: 0.85em;
  color: #888;
  margin-left: 0.5em;
}
</style>

<div class="sitemap-section">
<h2><i class="fa fa-file"></i> Pages</h2>
<ul class="sitemap-list">
{% for post in site.pages %}
  {% if post.title %}
  <li>
    <a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a>
    {% if post.date %}<span class="sitemap-meta">({{ post.date | date: "%Y-%m-%d" }})</span>{% endif %}
  </li>
  {% endif %}
{% endfor %}
</ul>
</div>

<div class="sitemap-section">
<h2><i class="fa fa-newspaper"></i> Blog Posts</h2>
<ul class="sitemap-list">
{% for post in site.posts %}
  <li>
    <a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a>
    <span class="sitemap-meta">({{ post.date | date: "%Y-%m-%d" }})</span>
  </li>
{% endfor %}
{% if site.posts.size == 0 %}
  <li><em>No blog posts yet.</em></li>
{% endif %}
</ul>
</div>

<div class="sitemap-section">
<h2><i class="fa fa-graduation-cap"></i> Publications</h2>
<ul class="sitemap-list">
{% for post in site.publications %}
  <li>
    <a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a>
    <span class="sitemap-meta">({{ post.venue }}, {{ post.date | date: "%Y" }})</span>
  </li>
{% endfor %}
</ul>
</div>

{% assign has_other = false %}
{% for collection in site.collections %}
  {% if collection.label != "posts" and collection.label != "publications" and collection.docs.size > 0 %}
    {% unless has_other %}
      {% assign has_other = true %}
    {% endunless %}
  {% endif %}
{% endfor %}

{% if has_other %}
<div class="sitemap-section">
<h2><i class="fa fa-folder"></i> Other Collections</h2>
{% for collection in site.collections %}
  {% if collection.label != "posts" and collection.label != "publications" and collection.docs.size > 0 %}
    <h3 style="margin-top: 1.5em; color: #555;">{{ collection.label | capitalize }}</h3>
    <ul class="sitemap-list">
    {% for doc in collection.docs %}
      <li>
        <a href="{{ base_path }}{{ doc.url }}">{{ doc.title }}</a>
        {% if doc.date %}<span class="sitemap-meta">({{ doc.date | date: "%Y-%m-%d" }})</span>{% endif %}
      </li>
    {% endfor %}
    </ul>
  {% endif %}
{% endfor %}
</div>
{% endif %}
