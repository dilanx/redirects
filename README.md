# redirects

A GitHub action to generate static HTML files to handle redirects.

## Usage

**Workflow**

```yml
- name: Generate redirects
  uses: dilanx/redirects@v2
  with:
    redirect-configuration: 'redirects.yml' # default
```

**Configuration**

```yml
# https://github.com/dilanx/redirects

destination-directory: 'build' # default

redirects:
  - from: /old
    to: 'https://example.com/new'
    title: 'Title for embeds' # optional, default none
    description: 'Description for embeds' # optional, default none

seo:
  image: 'https://example.com/image-for-embeds' # optional, default none, only used if title is set
  theme-color: '#000000' # optional, default none, only used if title is set
  search-results: false # default
```
