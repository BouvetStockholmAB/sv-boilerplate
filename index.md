---
title: Scripts and stylesheets
---

## Scripts and stylesheets

<ul>
{% for file in site.static_files %}
    {% if file.path contains '/dist/' %}
        <li><a href="{{ file.path }}">{{ file.path }}</a> [file.modified_time]</li>
    {% endif %}
{% endfor %}
</ul>



