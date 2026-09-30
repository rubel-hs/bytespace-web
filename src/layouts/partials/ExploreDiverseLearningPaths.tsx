import { markdownify } from "@/lib/utils/textConverter";
import Image from "next/image";

type LearningPath = {
  title: string;
  svg_source: string;
};

type ExploreDiverseLearningPathsProps = {
  data: {
    title: string;
    content: string;
    list: LearningPath[];
  };
};

const ExploreDiverseLearningPaths = ({
  data,
}: ExploreDiverseLearningPathsProps) => {
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
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {data.list.map((path) => (
                <li key={path.title}>
                  <article className="flex h-full min-h-36 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-body px-3 py-6 text-center transition-shadow duration-300 hover:shadow-lg">
                    <Image
                      src={path.svg_source}
                      alt=""
                      width={60}
                      height={60}
                      aria-hidden="true"
                    />
                    <h3 className="font-primary text-base font-normal leading-tight">
                      {path.title}
                    </h3>
                  </article>
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
