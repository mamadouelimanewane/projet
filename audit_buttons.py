import os
import re

directory = 'src/components/modules'
dead_elements = []

# Pattern to find tags like <Btn, <button, <a
tag_pattern = re.compile(r'<(Btn|button|a)\s+([^>]*?)(/?>)', re.DOTALL)

for filename in os.listdir(directory):
    if filename.endswith('.jsx'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            matches = tag_pattern.finditer(content)
            for match in matches:
                tag = match.group(1)
                props = match.group(2)
                
                # Check for dead onClick or href
                is_dead = False
                if tag in ['Btn', 'button']:
                    if 'onClick' not in props:
                        is_dead = True
                elif tag == 'a':
                    if 'href' not in props or props.strip() == 'href="#"':
                        if 'onClick' not in props:
                            is_dead = True
                
                # Exclude buttons that might be part of a larger component like <SectionHeader action={<Btn ... />}
                # Actually those are exactly what we want to catch if they are dead.
                
                if is_dead:
                    line_no = content.count('\n', 0, match.start()) + 1
                    dead_elements.append({
                        'file': filename,
                        'line': line_no,
                        'tag': tag,
                        'content': match.group(0).replace('\n', ' ').strip()
                    })

for el in dead_elements:
    print(f"FILE: {el['file']} | LINE: {el['line']} | TAG: {el['tag']} | CONTENT: {el['content']}")
