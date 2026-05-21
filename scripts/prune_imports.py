from pathlib import Path
import re
screens_dir = Path('src/components/MedApp/screens')
modules = ['../components','../api','../data','./shared']
for p in screens_dir.glob('*.js'):
    text = p.read_text('utf8')
    new_text = text
    for mod in modules:
        # find import block for this module
        pattern = r"import \{([\s\S]*?)\} from \"" + re.escape(mod) + r"\";"
        m = re.search(pattern, new_text)
        if not m:
            continue
        imports_block = m.group(0)
        names_str = m.group(1)
        names = [n.strip() for n in names_str.split(',') if n.strip()]
        used = []
        for name in names:
            # skip if name likely a type or destructured alias (contains as)
            simple_name = name.split(' as ')[0].strip()
            if re.search(r'\b' + re.escape(simple_name) + r'\b', new_text[m.end():]):
                used.append(name)
        if used:
            new_block = 'import {\n  ' + ',\n  '.join(used) + '\n} from "' + mod + '";'
            new_text = new_text[:m.start()] + new_block + new_text[m.end():]
        else:
            # remove the import entirely
            new_text = new_text[:m.start()] + new_text[m.end():]
    if new_text != text:
        p.write_text(new_text,'utf8')
        print('Pruned', p)
print('Done')
