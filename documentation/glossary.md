---
title: "Glossary"
description: "Glossary of terms used around Mesibo"
keywords: "glossary, mesibo, terms, definitions"
heading: Mesibo Glossary
notoc: true
noratings: true
redirect_from:
- /reference/glossary/
---
<!--
To edit/add/remove glossary entries, visit the YAML file at:
https://github.com/mesibo/mesibo.github.io/blob/master/_data/glossary.yaml

To get a specific entry while writing a page in the docs, enter Liquid text
like so:
{{ site.data.glossary["MAU"] }}
-->
<span id="glossaryMatch" />
<span id="topicMatch" />

## Glossary terms

To see a definition for a term, and all topics in the documentation that have
been tagged with that term, click any entry below:

{% for entry in site.data.glossary %}- [{{ entry[0] }}]
{% endfor %}

{% for entry in site.data.glossary %}[{{ entry[0] }}]: {{site.baseurl}}/documentation/glossary/?term={{ entry[0] }}
{: class="glossLink" data-content="{{ entry[1] | markdownify | strip_html | strip | truncatewords: 50, "..."}}" data-trigger="hover" id="popoverData{{ forloop.index }}" rel="popover" data-placement="bottom" data-original-title="Definition of: {{ entry[0]}}"}
{% endfor %}
