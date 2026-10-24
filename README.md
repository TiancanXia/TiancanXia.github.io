# Tiancan Xia

[Academic homepage](https://tiancanxia.github.io) · Jekyll · GitHub Pages

## Content

| Content | Source |
| --- | --- |
| Introduction and research | `_includes/research/home.html` |
| Education and awards | `_includes/research/background.html` |
| Contact | `_includes/research/contact.html` |
| Papers, citations and original abstracts | `_publications/*.md` |
| CV page and downloadable CV | `_pages/cv.md`, `files/CV.pdf` |
| Profile links | `_config.yml` |
| Portrait | `images/profile.jpeg` |

The homepage, publication index and paper detail pages share the publication collection. Edit paper metadata there; do not keep a second bibliography. Each `abstract` is the original text from the linked paper PDF, with PDF line breaks and ligatures normalized. Keep existing permalinks and match PDF filename capitalization exactly.

Use the final publisher record for authors, venue, volume, issue and pages. `publication_year` and optional `publication_month` reflect the available date precision; `date` supports sorting. `first_author` controls grouping.

## Preview and deploy

With Ruby and Bundler installed:

```sh
bundle install
bundle exec jekyll serve
```

Open [localhost:4000](http://localhost:4000). Restart after editing `_config.yml`.

```sh
bundle exec jekyll build
```

Pushes to `master` build and deploy through `.github/workflows/jekyll.yml`. Shared styles and interaction code are in `assets/css/research.css` and `assets/js/research.js`. Publications remain readable without JavaScript; motion respects the visitor's reduced-motion preference.

## Credits

Originally based on [Academic Pages](https://github.com/academicpages/academicpages.github.io) and [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes). Theme code retains the [MIT license](LICENSE); papers retain their respective copyrights.
