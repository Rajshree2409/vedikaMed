from pathlib import Path
import re
screens_dir = Path('src/components/MedApp/screens')
for p in screens_dir.glob('*.js'):
    text = p.read_text('utf8')
    new_text = text
    # remove PageHeader from shared import
    new_text = re.sub(r"import \{([\s\S]*?)\} from \"\.\/shared\";",
                      lambda m: 'import {\n  ' + ',\n  '.join([n for n in [n.strip() for n in m.group(1).split(',')] if n and n!='PageHeader']) + '\n} from "./shared";' if any([n for n in [n.strip() for n in m.group(1).split(',')] if n and n!='PageHeader']) else '',
                      new_text)
    # if file uses <PageHeader and does not import PageHeader from ../components, add it
    if re.search(r'<PageHeader\b', new_text):
        if not re.search(r"from \"\.\./components\"[\s\S]*PageHeader", new_text):
            # try to find existing import from ../components
            m = re.search(r"import \{([\s\S]*?)\} from \"\.\./components\";", new_text)
            need = 'PageHeader'
            # also add style/layout/theme if used
            for sym in ['style','layout','theme']:
                if re.search(r'\b' + sym + r'\b', new_text):
                    need += ', ' + sym
            if m:
                names = [n.strip() for n in m.group(1).split(',') if n.strip()]
                for part in need.split(','):
                    name = part.strip()
                    if name not in names:
                        names.append(name)
                replacement = 'import {\n  ' + ',\n  '.join(names) + '\n} from "../components";'
                new_text = new_text[:m.start()] + replacement + new_text[m.end():]
            else:
                # insert after React import
                m2 = re.search(r"import React[\s\S]*?;\n", new_text)
                insert_at = m2.end() if m2 else 0
                new_text = new_text[:insert_at] + 'import { ' + need + ' } from "../components";\n' + new_text[insert_at:]
    if new_text != text:
        p.write_text(new_text,'utf8')
        print('Patched', p)
print('Done')
