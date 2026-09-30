# Adding New Sections

This template builds page sections as React components in `src/layouts/partials/`. A section can receive content through a `data` prop, render shared content with `markdownify`, and be composed with other sections by a page component.

## Create the Section Component

Add a PascalCase component file under `src/layouts/partials/`. For a section with a title, introductory copy, and a content area, follow this structure:

```tsx
import { markdownify } from '@/lib/utils/textConverter';

const DiscoverYourPassion = ({ data }: { data: any }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-container">
          <div className="section-intro centralize">
            <h2
              className="title hasHighlight"
              dangerouslySetInnerHTML={markdownify(data.title)}
            />
            <p
              className="subtitle"
              dangerouslySetInnerHTML={markdownify(data.content)}
            />
          </div>
          <div className="section-content">
            {/* Add the section-specific content here. */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverYourPassion;
```

Replace `DiscoverYourPassion` with the section's name and update the inner content to match its data. Follow the existing component's prop and class conventions. If the section data shape is known, prefer a specific type over `any`.

Use `markdownify` for content fields that support Markdown. Keep the outer section/container structure and established CSS class names consistent with neighboring partials so existing layout styles apply.

## Add It to a Page

Import the partial into the page that should display it, then render it in the intended order and pass the section data:

```tsx
import DiscoverYourPassion from '@/layouts/partials/DiscoverYourPassion';

// Inside the page component:
<DiscoverYourPassion data={discoverYourPassion} />
```

For homepage sections, the composition is in `src/app/page.tsx`. Check where that page obtains its content and add or reuse the matching data there before rendering the section. Keep data loading in the page and presentation in the partial, following the existing separation of responsibilities.

## Verify

- Confirm the section appears in the intended page position.
- Check that all fields passed through `data` exist in the content source and that optional fields are handled safely.
- Run the project's lint or build check after adding the component and page integration.