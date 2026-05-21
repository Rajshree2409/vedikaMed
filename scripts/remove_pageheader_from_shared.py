from pathlib import Path
import re
screens_dir = Path('src/components/MedApp/screens')
for p in screens_dir.glob('*.js'):
    text = p.read_text('utf8')
    changed = False
    # remove 'PageHeader' from any ./shared import
    def repl(m):
        names = [n.strip() for n in m.group(1).split(',') if n.strip()]
        if 'PageHeader' in names:
            names = [n for n in names if n!='PageHeader']
            if names:
                return 'import {\n  ' + ',\n  '.join(names) + '\n} from "./shared";'
            else:
                return ''
        return m.group(0)
    new_text = re.sub(r'import \{([\s\S]*?)\} from "\.\/shared";', repl, text)
    if new_text != text:
        p.write_text(new_text,'utf8')
        print('Cleaned', p)
print('Done')
