from tomd import Tomd

f = open("htmlfile.txt", "r")
html=f.read()
print Tomd(html).markdown
