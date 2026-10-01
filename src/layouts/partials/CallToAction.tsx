import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const CallToAction = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section className="relative min-h-122 overflow-hidden bg-secondary text-body">
          <div
            aria-hidden="true"
            className="absolute inset-0 text-body opacity-12"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 2px, transparent 2px), linear-gradient(to bottom, currentColor 2px, transparent 2px)",
              backgroundSize: "120px 120px",
            }}
          />

          {data.frontmatter.images.map((shape) => (
            <Image
              key={shape.src}
              aria-hidden="true"
              className={`pointer-events-none absolute block select-none scale-[0.4] md:scale-[0.6] xl:scale-[1] ${shape.className}`}
              src={shape.src}
              width={shape.width}
              height={shape.height}
              alt=""
            />
          ))}

          <div className="container relative flex min-h-122 items-center justify-center py-16">
            <div className="mx-auto flex w-full max-w-241 flex-col items-center gap-10 text-center">
              <h2
                dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
                className="m-0 max-w-177.5 text-[2rem] leading-[1.2] tracking-[-0.01em] text-light md:text-[44px]"
              />
              <p
                dangerouslySetInnerHTML={markdownify(
                  data.frontmatter.description,
                )}
                className="m-0 max-w-241 text-base leading-[1.6] text-light md:text-lg"
              />
              {data.frontmatter.button.enable && (
                <Link
                  className="btn btn-primary px-6 py-3 leading-[1.2]"
                  href={data.frontmatter.button.link}
                >
                  {data.frontmatter.button.label}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
