import { humanize, markdownify } from "@/lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const categoryIcons: Record<string, string> = {
  design: "/images/icons/Design.svg",
  development: "/images/icons/Development.svg",
  "it-software": "/images/icons/IT & Software.svg",
  business: "/images/icons/Business.svg",
  marketing: "/images/icons/Marketing.svg",
  photography: "/images/icons/Photography.svg",
};

type ExploreDiverseLearningPathsProps = {
  data: {
    title: string;
    content: string;
  };
  categories: string[];
};

const ExploreDiverseLearningPaths = ({
  data,
  categories,
}: ExploreDiverseLearningPathsProps) => {
  const learningPaths = categories.flatMap((category) => {
    const icon = categoryIcons[category];

    return icon ? [{ category, icon }] : [];
  });

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
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 justify-center mx-auto">
              {learningPaths.map(({ category, icon }) => (
                <li key={category}>
                  <Link
                    href={`/categories/${category}`}
                    className="block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                  >
                    <article className="flex h-full min-h-36 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-body px-3 py-6 text-center transition-shadow duration-300 hover:card-shadow">
                      <Image
                        src={icon}
                        alt=""
                        width={60}
                        height={60}
                        aria-hidden="true"
                      />
                      <h3 className="font-primary text-base font-normal leading-tight">
                        {humanize(category)}
                      </h3>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreDiverseLearningPaths;
