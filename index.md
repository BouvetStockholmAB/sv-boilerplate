---
title: Scripts and stylesheets
---

## {{ page.title }}

*Last build: {{ site.time | date: "%Y-%m-%d %H:%M" }}*

<ul>
{% for file in site.static_files %}
    {% if file.path contains '/dist/' %}
        <li><a href="{{ site.github.url | replace: 'http:', '' }}{{ file.path }}" title="Updated: {{ file.modified_time | date: "%Y-%m-%d %H:%M" }}">{{ site.github.url | replace: 'http:', '' }}{{ file.path }}</a></li>
    {% endif %}
{% endfor %}
</ul>

<p>GitHub repo: <a href="{{ site.github.repository_url }}">{{ site.github.project_title }}</a></p>

