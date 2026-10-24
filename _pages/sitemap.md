---
layout: research
title: "Sitemap"
permalink: /sitemap/
---

# Sitemap

- [Home]({{ '/' | relative_url }})
- [Publications]({{ '/publications/' | relative_url }})
- [Curriculum vitae]({{ '/cv/' | relative_url }})

## Papers

{% assign publications = site.publications | sort: 'date' | reverse %}
{% for post in publications %}
- [{{ post.title }}]({{ post.url | relative_url }})
{% endfor %}

[XML sitemap]({{ '/sitemap.xml' | relative_url }})
