import os
import zipfile

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            if file not in ["zip_project.py", "Project.zip", ".gitattributes", "README.md"] and "workfiles" not in root and "assets" not in root and ".git" not in root:
                ziph.write(os.path.join(root, file), 
                           os.path.relpath(os.path.join(root, file), 
                           os.path.join(path, '..')))

if __name__ == '__main__':
    zipf = zipfile.ZipFile('Project.zip', 'w', zipfile.ZIP_DEFLATED)
    zipdir('.', zipf)
    zipf.close()
