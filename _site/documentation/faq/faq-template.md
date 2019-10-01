<!-- # {{ page.section | capitalize}} -->

<section class="faq">
	<ul>
		{% for entry in faq_data %}
			{% capture faq_link %}{{page.url}}#{{ entry[0] | slugify }}{% endcapture %}
			<li><a href="{{ faq_link | relative_url }}">{{ entry[0] }}</a></li>
		{% endfor %}
	</ul>

	{% for entry in faq_data %}
		<a name="{{ entry[0] | slugify}}"></a>
		<h3 id="{{ entry[0] | slugify}}">{{ entry[0] }}</h3>
		{{ entry[1] | markdownify }}
	{% endfor %}
</section>
