---
title: Scripts and stylesheets
---

## Scripts and stylesheets

<ul>
{% for file in site.static_files %}
    {% if file.path contains '/dist/' %}
        <li><a href="{{ file.path }}">{{ file.path }}</a> [{{ file.modified_time | date: "%Y-%m-%d %H:%M" }}]</li>
    {% endif %}
{% endfor %}
</ul>

<p>GitHub repo: <a href="{{ site.github.repository_url }}">{{ site.github.project_title }}</a></p>

<p>Last update: {{ site.time | date: "%Y-%m-%d %H:%M" }}</p>



