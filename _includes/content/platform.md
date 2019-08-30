
        <div class="col-sm-12 col-md-12 col-lg-4 block">
            <div class="component">
                <div class="component-icon">
                    <a href="{{ include.url | relative_url }}"> <img src="{{ include.img | relative_url }}" alt="{{ include.title}}"> </a>
                </div>
                <h3 id="{{ include.id }}"><a href="{{ include.url | relative_url }}">{{include.title}}</a></h3>
                <p>{{ include.content }}</p>
            </div>
        </div>
