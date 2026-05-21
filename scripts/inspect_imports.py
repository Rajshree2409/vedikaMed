from pathlib import Path
screens_dir = Path('src/components/MedApp/screens')
for p in sorted(screens_dir.glob('*.js')):
    text = p.read_text('utf8')
    for i, line in enumerate(text.splitlines(), 1):
        if 'from "../api"' in line and 'theme' in line:
            print('theme import in', p, 'line', i, line)
        if 'from "../api"' in line and 'theme' in line and line.strip().startswith('import'):
            print('theme import statement in', p, 'line', i, line)
PY