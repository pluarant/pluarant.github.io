we are using https://jekyllrb.com/docs/configuration/options/

./config.yml - main config
./_config_authoring.yml - here we can define various global parameters etc like site name
./_includes/global-header.html - header
./_scss/_variables.scss - colors etc
./_data/toc.yml - menu
.._includes/archive-list.html - has version history for right side of
navigation bar
- use notags to disable tags at bottom and notoc to disable right hand side
TOC menu
****** Navigation menu *********
./_data/toc.yml
horizontalnav defines all the horizontal navs. 

- title: Support
  path: /support/
  node: support
  hide: yes
  resetnav: yes

1) For each node, it then makes vertical nav, so it is mandatory to have
horizontal nav to have vertical nav. We have added option to hide (default no)
so that we can generate vertical nav while hiding horizontal

2) it scans all the sections, is the current section path is part of previous
section , the menu is appended. We have added an otion resetnav(default no) to
override it

3) Horizontal nav can be highlighted if current path matches the path in
horizontalnav or sectionToHighlight matches node (we have disabled
sectionToHighlight)


********* Relative Path *******************
1) we need to use relative_url

2) for scss, we can use baseurl after front matter in scss. However jekyll first 
   combines all the scss files before processessing and hence we have defined a variable 
   in css/styles.css where all the files being imported and then we are using baseurl in 
   individual scss file (https://stackoverflow.com/questions/20037266/how-to-use-jekyll-baseurl-in-css-files)


******** diagrams and message sequence chart *******************
- https://github.com/yegor256/jekyll-plantuml
- http://plantuml.com/download
- https://github.com/jasonbellamy/jekyll-mermaid



************ Kramdown Markdown Reference ***********
https://kramdown.gettalong.org/quickref.html#tables


****** Syntax highlighting *******
https://sachingpta.gitlab.io/_posts/jekyll-pygments-rouge.html

https://www.greghendershott.com/2014/11/github-dropped-pygments.html
https://mycyberuniverse.com/syntax-highlighting-jekyll.html

List of short code for rogue syntax highlight
https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers

Other Doc repos
----------------
- https://github.com/rtfd/readthedocs.org/blob/master/docs/intro/import-guide.rst
- https://mademistakes.com/articles/using-jekyll-2016/
- https://webjeda.com/slides/
