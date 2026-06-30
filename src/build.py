import os, re
# Monta decade/index.html a partir de src/shell.html + src/sections/*.
# Fonte de verdade = os fragmentos. Uma "aba" pode ser um arquivo unico
# (NN-nome.html) OU uma subpasta (NN-nome/shell.html + fragmentos marcados
# por <!--BUILD_CLASS:xxx-->), montada em 2 niveis. Editar fragmento, rodar, validar.
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), "index.html")
SECTIONS = os.path.join(HERE, "sections")
ORDER = ["intro","exec","landscape","assets","portfolio","references","appendix"]
FILES = {"intro":"01-intro.html","exec":"02-exec.html","landscape":"03-landscape.html",
         "assets":"04-assets.html","portfolio":"05-portfolio.html",
         "references":"06-references.html","appendix":"07-appendix.html"}
def read(p):
    with open(p, encoding="utf-8", newline="") as f: return f.read()
def render(name):
    base = FILES[name]
    sub = os.path.join(SECTIONS, os.path.splitext(base)[0])
    if os.path.isdir(sub):
        html = read(os.path.join(sub, "shell.html"))
        for cls in re.findall(r"<!--BUILD_CLASS:([a-z0-9-]+)-->", html):
            html = html.replace("<!--BUILD_CLASS:%s-->" % cls,
                                read(os.path.join(sub, cls + ".html")), 1)
        return html
    return read(os.path.join(SECTIONS, base))
out = read(os.path.join(HERE, "shell.html"))
for name in ORDER:
    token = "<!--BUILD_SECTION:%s-->" % name
    if token not in out:
        raise SystemExit("placeholder ausente no shell: " + token)
    out = out.replace(token, render(name), 1)
with open(OUT, "w", encoding="utf-8", newline="") as f:
    f.write(out)
print("built %s (%d chars)" % (OUT, len(out)))
