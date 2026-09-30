# Course content model

The course domain uses three Markdown collections:

- `courses`: course details, pricing, curriculum, media, and filter values.
- `course_creators`: creator profiles.
- `course_reviews`: one review file per course, containing all of that course's learner reviews.

## Relations

Relations use the target file's slug (its filename without `.md`):

```text
course_creators/purepearl-studio.md
                 ▲
                 │ courses.course_creator
courses/build-digital-asset.md
                 ▲
                 │ course_reviews.course
course_reviews/build-digital-asset.md
```

Do not store reverse arrays. A creator's courses are all course files whose `course_creator` matches the creator slug. Each course has one matching review file whose `course` value matches the course slug. Review count and average rating should be calculated from that file's `reviews` array.

## Required course frontmatter

Every file in `courses` must define:

- `category`: a single display-ready category used for filtering and related courses.
- `level`: a single display-ready difficulty level used for filtering.
- `course_creator`: the slug of a file in `course_creators`.

The title, description, image, price, stats, featured lessons, modules, inclusions, preview gallery, and key points mirror the information shown across the course detail and lesson screens.

## Required review frontmatter

Every review file must define `course` and a `reviews` array. Each item in `reviews` must define `reviewer_name`, `rating`, `date`, and `content`. Optional reviewer metadata such as `reviewer_role` and `reviewer_image` belongs on the individual review item.
