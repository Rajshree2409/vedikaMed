from pathlib import Path
import re
screens_dir = Path('src/components/MedApp/screens')
for p in screens_dir.glob('*.js'):
    text = p.read_text('utf8')
    if re.search(r'<PageHeader\b', text):
        # check if PageHeader is already imported from ../components
        if re.search(r"from \"\.\./components\"[\s\S]*PageHeader", text):
            continue
        # insert import { PageHeader } from "../components"; after first React import
        m = re.search(r"import React[\s\S]*?;\n", text)
        insert_at = m.end() if m else 0
        new_text = text[:insert_at] + 'import { PageHeader } from "../components";\n' + text[insert_at:]
        p.write_text(new_text,'utf8')
        print('Fixed PageHeader import in', p)
        # also remove PageHeader from any import from ./shared in this file
        shared_pattern = re.compile(r"import \{([\s\S]*?)\} from \"\.\/shared\";")
        m2 = shared_pattern.search(new_text)
        if m2:
            names = [n.strip() for n in m2.group(1).split(',') if n.strip()]
            names = [n for n in names if n != 'PageHeader']
            if names:
                replacement = 'import {\n  ' + ',\n  '.join(names) + '\n} from "./shared";'
            else:
                replacement = ''
            new_text = new_text[:m2.start()] + replacement + new_text[m2.end():]
            p.write_text(new_text,'utf8')
            print('Removed PageHeader from ./shared import in', p)
print('Done')
