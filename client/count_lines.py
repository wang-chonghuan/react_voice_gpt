import os

def count_lines_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        return len(lines)

def count_lines_in_directory(directory, extensions):
    total_lines = 0
    for root, _, files in os.walk(directory):
        if "node_modules" in root:
            continue
        for file in files:
            if file.endswith(extensions):
                file_path = os.path.join(root, file)
                lines_in_file = count_lines_in_file(file_path)
                total_lines += lines_in_file
                print(f"{file_path}: {lines_in_file} lines")
    return total_lines

if __name__ == "__main__":
    project_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    extensions = ('.ts', '.tsx')
    total_lines = count_lines_in_directory(project_directory, extensions)
    print(f"\nTotal lines of TypeScript code: {total_lines}")
