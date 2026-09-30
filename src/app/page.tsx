import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { getCategories, getCourses } from "@/lib/courseData";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import DiscoverYourPassion from "@/partials/DiscoverYourPassion";
import ExploreDiverseLearningPaths from "@/partials/ExploreDiverseLearningPaths";
import HeroSection from "@/partials/HeroSection";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import TrustedBrands from "@/partials/TrustedBrands";
import { Feature } from "@/types";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const courseCategories = getCategories();
  const courses = getCourses().toSorted((a, b) => {
    const firstDate = a.frontmatter.date
      ? new Date(a.frontmatter.date).valueOf()
      : 0;
    const secondDate = b.frontmatter.date
      ? new Date(b.frontmatter.date).valueOf()
      : 0;

    return secondDate - firstDate;
  });
  const { frontmatter } = homepage;
  const {
    banner,
    features,
    latest_courses,
    explore_diverse_learning_paths,
    trusted_brands,
  }: {
    banner: {
      title: string;
      image: string;
      content?: string;
      search?: {
        enable: boolean;
        placeholder?: string;
        button_label?: string;
      };
    };
    trusted_brands: {
      enable?: boolean;
      title: string;
      images: Array<{
        src: string;
        alt: string;
      }>;
    };
    latest_courses: {
      title: string;
      content: string;
    };
    explore_diverse_learning_paths: {
      title: string;
      content: string;
    };
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <HeroSection data={banner} />
      <TrustedBrands data={trusted_brands} />
      <DiscoverYourPassion
        data={latest_courses}
        courses={courses}
        categories={courseCategories}
      />
      <ExploreDiverseLearningPaths
        data={explore_diverse_learning_paths}
        categories={courseCategories}
      />

      {
        features && features.length > 0 && (
          <section className="section xl:py-30 xl:pb-10 overflow-hidden relative space-y-20">
            {features.map((feature, index: number) => (
              <div
                key={index}
                className="relative "

              >
                <div
                  aria-hidden="true"
                  className={`absolute size-72 rounded-full blur-3xl md:size-[38rem] ${index % 2 === 0
                      ? "left-20 -top-40 bg-primary/25"
                      : "-bottom-40 -left-32 bg-primary/30"
                    }`}
                />
                <div
                  aria-hidden="true"
                  className={`absolute size-80 rounded-full bg-secondary/15 blur-3xl md:size-[38rem] ${index % 2 === 0 ? "-right-52 -top-20" : "-bottom-52 -right-40"
                    }`}
                />

                <div className="container relative z-10">
                  <div className="row items-center justify-between gap-y-12 md:gap-y-0">
                    {feature.image && (
                      <div
                        className={`md:col-6 ${index % 2 === 0 ? "md:order-2" : "md:order-1"
                          }`}
                      >
                        <ImageFallback
                          src={feature.image}
                          height={index % 2 === 0 ? 1046 : 1079}
                          width={index % 2 === 0 ? 1055 : 880}
                          alt={feature.title}
                          sizes="(max-width: 767px) 100vw, 50vw"
                          className={`mx-auto h-auto w-full object-contain ${index % 2 === 0 ? "max-w-[600px]" : "max-w-[500px]"
                            }`}
                        />
                      </div>
                    )}
                    <div
                      className={`${feature.image ? "md:col-6 lg:col-5" : "md:col-12"} ${index % 2 === 0 ? "md:order-1" : "md:order-2"
                        }`}
                    >
                      <h2
                        className="mb-7 text-h2-sm lg:text-h2"
                        dangerouslySetInnerHTML={markdownify(feature.title)}
                      />
                      <p
                        className="mb-10 text-lg leading-8"
                        dangerouslySetInnerHTML={markdownify(feature.content)}
                      />
                      {feature.stats && (
                        <dl className="grid max-w-md grid-cols-3 gap-6">
                          {feature.stats.map((stat) => (
                            <div key={stat.label}>
                              <dd className="font-secondary text-3xl font-medium text-secondary md:text-4xl">
                                {stat.value}
                              </dd>
                              <dt className="mt-1 text-base md:text-lg">
                                {stat.label}
                              </dt>
                            </div>
                          ))}
                        </dl>
                      )}
                      {feature.bullet_points && (
                        <ul className="space-y-4">
                          {feature.bullet_points.map((bullet: string) => (
                            <li
                              className="relative pl-9 text-lg text-text-dark"
                              key={bullet}
                            >
                              <span className="absolute left-0 top-0.5 flex size-6 items-center justify-center rounded-full bg-secondary text-white">
                                <FaCheck className="size-3" />
                              </span>
                              <span dangerouslySetInnerHTML={markdownify(bullet)} />
                            </li>
                          ))}
                        </ul>
                      )}
                      {feature.button?.enable && (
                        <Link
                          className="btn btn-primary mt-5"
                          href={feature.button.link}
                        >
                          {feature.button.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </section>
        )
      }
      <CallToAction data={callToAction} />
      <Testimonials data={testimonial} />
    </>
  );
};

export default Home;
