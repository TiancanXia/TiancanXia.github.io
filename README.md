# Tiancan Xia

Personal academic website: [tiancanxia.github.io](https://tiancanxia.github.io).

Built with Jekyll and deployed to GitHub Pages from `master`.

## Update content

| Content | Location |
| --- | --- |
| Biography, education and news | `_pages/about.md` |
| Publications | `_publications/*.md` |
| CV page | `_pages/cv.md` |
| Downloadable papers and CV | `files/` |
| Portrait | `images/profile.jpeg` |
| Profile links and site settings | `_config.yml` |

The publication index reads directly from `_publications/`. Edit each paper's metadata and citation there; do not maintain a second list in `_pages/publications.html`. Keep existing permalinks stable and match PDF filenames exactly, including capitalization.

Use the final publisher record for titles, authors, volume, issue and pages. If the record specifies only a year, omit an unverified publication month. `date` supports chronological sorting; `publication_year` and `publication_month` record the available publication-date precision.

## Local preview

Install Ruby and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve
```

Open [localhost:4000](http://localhost:4000). Restart the server after editing `_config.yml`.

```sh
bundle exec jekyll build
```

Pushes to `master` run the Pages workflow in `.github/workflows/jekyll.yml`.

## Credits

Based on [Academic Pages](https://github.com/academicpages/academicpages.github.io) and [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes). Theme code is covered by the [MIT license](LICENSE); papers retain their respective copyrights.
