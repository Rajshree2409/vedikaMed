from pathlib import Path
import re
screens_dir = Path('src/components/MedApp/screens')
extras = ['InlineMessage','ProductListCard','SearchResultCard','VedikaLogo','createAvatarLabel','getCategoryFromProduct']
for p in screens_dir.glob('*.js'):
    text = p.read_text('utf8')
    m = re.search(r"from \"\.\/shared\";", text)
    if not m:
        continue
    start = text.rfind('import {', 0, m.start())
    if start == -1:
        continue
    block = text[start:m.end()]
    names = re.findall(r'import \{([\s\S]*?)\} from "./shared";', block)
    if not names:
        continue
    current = names[0]
    existing = [n.strip() for n in current.split(',') if n.strip()]
    # keep extras only if actually referenced in file
    used_extras = [e for e in extras if re.search(r'\b' + re.escape(e) + r'\b', text)]
    # build updated list: existing non-extras + used_extras
    updated = [n for n in existing if n not in extras] + sorted(set(used_extras))
    new_block = 'import {\n  ' + ',\n  '.join(updated) + '\n} from "./shared";'
    new_text = text[:start] + new_block + text[m.end():]
    p.write_text(new_text, 'utf8')
    print('Updated', p)
print('Done')
