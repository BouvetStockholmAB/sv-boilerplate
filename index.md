---
title: Scripts and stylesheets
---

## Scripts and stylesheets

{% for file in site.static_files %}
<p>{{ file.path }}</p>
{% endfor %}




