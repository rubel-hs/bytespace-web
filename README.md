# Bytespace

Bytespace is a course marketplace built with Next.js. Courses, creators, reviews, and supporting page content are managed as Markdown files in the repository.

## Run locally

Requirements: Node.js 22+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).


Use the provided `pnpm` commands instead of running Next.js directly. They generate the theme CSS and searchable content data before starting or building the app.

## Technologies

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Markdown and MDX with YAML frontmatter
- pnpm

## Project structure

```text
src/
├── app/       # Routes, pages, and the root layout
├── content/   # Markdown content for courses, creators, reviews, and pages
├── config/    # Site, navigation, social, and theme settings
├── layouts/   # Reusable components, partials, and MDX shortcodes
├── lib/       # Content parsing, course relations, and utilities
└── styles/    # Tailwind entry point and shared styles
public/        # Images, videos, icons, and other static files
scripts/       # Theme and searchable JSON generators
```

### Content and course relations

Content lives in `src/content/`. The course marketplace uses three Markdown collections:

- `courses/` contains course details and references a creator with the `course_creator` slug.
- `course_creators/` contains creator profiles. A creator's courses are found from matching `course_creator` values.
- `course_reviews/` contains one review collection per course and references it with the `course` slug.

A slug is the Markdown filename without `.md`. For example, `course_creator: "codecraft-labs"` points to `course_creators/codecraft-labs.md`.

See `src/content/CONTENT_MODEL.md` for the required fields and relation rules.

### Theming and typography

Colors, font families, and the type scale are configured in `src/config/theme.json`. The development and build commands turn that configuration into `src/styles/generated-theme.css`; edit the JSON source, not the generated CSS file.

Tailwind and shared style layers are loaded from `src/styles/main.css`. Satoshi is used for body text and Poppins for headings by default, with both font families loaded in the root layout.
