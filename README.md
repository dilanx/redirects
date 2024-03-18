# generate-redirects

Generate static HTML files to handle redirects.

## Usage

```yml
- name: Generate redirects
  uses: dilanx/generate-redirects@v1
  with:
    redirect-configuration: 'redirects.txt' # default
    destination-directory: 'build' # default
```
