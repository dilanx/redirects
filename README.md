# redirects

A GitHub action to generate static HTML files to handle redirects.

## Usage

**Workflow**

```yml
- name: Generate redirects
  uses: dilanx/redirects@v2
  with:
    redirect-configuration: 'redirects.yml' # default
    destination-directory: 'build' # default
```

**Configuration**

```yml
# https://github.com/dilanx/redirects

redirects:
  - from: /old
    to: 'https://example.com/new'
```
