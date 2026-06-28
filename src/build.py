import os
# Monta decade/index.html a partir de src/shell.html + src/sections/*.html.
# Fonte de verdade = estes fragmentos. Editar um fragmento, rodar este script, validar render.
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), "index.html")
ORDER = ["intro","exec","landscape","assets","portfolio","references","appendix"]
FILES = {"intro":"01-intro.html","exec":"02-exec.html","landscape":"03-landscape.html",
         "assets":"04-assets.html","portfolio":"05-portfolio.html",
         "references":"06-references.html","appendix":"07-appendix.html"}
def read(p):
    with open(p, encoding="utf-8", newline="") as f: return f.read()
out = read(os.path.join(HERE, "shell.html"))
for name in ORDER:
    token = "<!--BUILD_SECTION:%s-->" % name
    if token not in out:
        raise SystemExit("placeholder ausente no shell: " + token)
    out = out.replace(token, read(os.path.join(HERE, "sections", FILES[name])), 1)
with open(OUT, "w", encoding="utf-8", newline="") as f:
    f.write(out)
print("built %s (%d chars)" % (OUT, len(out)))
