---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

A comprehensive list of all pages, blog posts, and publications on this site. For search engines and web crawlers, an [XML version]({{ base_path }}/sitemap.xml) is also available.

<style>
.sitemap-section {
  margin-bottom: 2.5em;
}
.sitemap-section h2 {
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.6em;
  margin-bottom: 1.2em;
  color: #333;
  font-size: 1.4em;
  font-weight: 600;
}
.sitemap-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.sitemap-list li {
  margin-bottom: 0.8em;
  padding-left: 1.5em;
  position: relative;
  line-height: 1.6;
}
.sitemap-list li:before {
  content: "›";
  position: absolute;
  left: 0;
  color: #008080;
  font-weight: bold;
  font-size: 1.3em;
  line-height: 1.5;
}
.sitemap-list a {
  text-decoration: none;
  color: #404040;
  font-weight: 500;
  transition: color 0.2s ease;
}
.sitemap-list a:hover {
  color: #008080;
  text-decoration: underline;
}
.sitemap-meta {
  font-size: 0.85em;
  color: #888;
  margin-left: 0.5em;
  font-weight: normal;
}
.sitemap-icon {
  margin-right: 0.6em;
  color: #008080;
  width: 20px;
  text-align: center;
}
.sitemap-other-collection {
  margin-top: 1.8em;
  padding: 1em;
  background-color: #f9f9f9;
  border-left: 3px solid #008080;
  border-radius: 0 4px 4px 0;
}
.sitemap-other-collection h3 {
  margin-top: 0;
  margin-bottom: 1em;
  color: #555;
  font-size: 1.2em;
  font-weight: 600;
}
</style>

<div class="sitemap-section">
<h2><i class="fa fa-file sitemap-icon"></i>Pages</h2>
<ul class="sitemap-list">
{% for post in site.pages %}
  {% if post.title and post.permalink != "/404.html" %}
  <li>
    {% if post.permalink == "/cv/" %}
      <a href="{{ base_path }}/files/CV.pdf">{{ post.title }}</a>
    {% else %}
      <a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a>
    {% endif %}
    {% if post.date %}<span class="sitemap-meta">({{ post.date | date: "%Y-%m-%d" }})</span>{% endif %}
  </li>
  {% endif %}
{% endfor %}
</ul>
</div>

<div class="sitemap-section">
<h2><i class="fa fa-newspaper-o sitemap-icon"></i>Blog Posts</h2>
<ul class="sitemap-list">
{% for post in site.posts %}
  <li>
    <a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a>
    <span class="sitemap-meta">({{ post.date | date: "%Y-%m-%d" }})</span>
  </li>
{% endfor %}
{% if site.posts.size == 0 %}
  <li><em style="color: #999;">No blog posts yet.</em></li>
{% endif %}
</ul>
</div>

<div class="sitemap-section">
<h2><i class="fa fa-graduation-cap sitemap-icon"></i>Publications</h2>
<ul class="sitemap-list">
{% if site.publications.size == 0 %}
  <li><em style="color: #999;">No publications yet.</em></li>
{% endif %}
</ul>
</div>

{% assign has_other = false %}
{% for collection in site.collections %}
  {% if collection.label != "posts" and collection.label != "publications" and collection.docs.size > 0 %}
    {% assign has_other = true %}
  {% endif %}
{% endfor %}

{% if has_other %}
<div class="sitemap-section">
<h2><i class="fa fa-folder-open-o sitemap-icon"></i>Other Collections</h2>
{% for collection in site.collections %}
  {% if collection.label != "posts" and collection.label != "publications" and collection.docs.size > 0 %}
    <div class="sitemap-other-collection">
    <h3>{{ collection.label | capitalize }}</h3>
    <ul class="sitemap-list">
    {% for doc in collection.docs %}
      <li>
        <a href="{{ base_path }}{{ doc.url }}">{{ doc.title }}</a>
        {% if doc.date %}<span class="sitemap-meta">({{ doc.date | date: "%Y-%m-%d" }})</span>{% endif %}
      </li>
    {% endfor %}
    </ul>
    </div>
  {% endif %}
{% endfor %}
</div>
{% endif %}
