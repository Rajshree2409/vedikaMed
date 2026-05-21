from pathlib import Path
screens_dir = Path('src/components/MedApp/screens')
for p in screens_dir.glob('*.js'):
    s = p.read_text('utf8')
    idx = 0
    changed = False
    while True:
        j = s.find('from "./shared";', idx)
        if j == -1:
            break
        # find matching 'import {' before j
        i = s.rfind('import {', 0, j)
        if i == -1:
            idx = j+1
            continue
        block = s[i:j+len('from "./shared";')]
        # remove PageHeader token in block
        new_block = block.replace('PageHeader,\n', '')
        new_block = new_block.replace(',\n  PageHeader', '')
        new_block = new_block.replace('PageHeader', '')
        if new_block != block:
            s = s[:i] + new_block + s[j+len('from "./shared";'):]
            changed = True
            idx = i + len(new_block)
        else:
            idx = j+1
    if changed:
        p.write_text(s,'utf8')
        print('Fixed', p)
print('Done')
