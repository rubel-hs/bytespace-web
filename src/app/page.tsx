import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
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
      list: Array<{
        title: string;
        svg_source: string;
      }>;
    };
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <HeroSection data={banner} />
      <TrustedBrands data={trusted_brands} />
      <DiscoverYourPassion data={latest_courses} />
      <ExploreDiverseLearningPaths data={explore_diverse_learning_paths} />

      {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              {feature.image && (
                <div
                  className={`mb:md-0 mb-6 md:col-5 ${
                    index % 2 !== 0 && "md:order-2"
                  }`}
                >
                  <ImageFallback
                    src={feature.image}
                    height={480}
                    width={520}
                    alt={feature.title}
                  />
                </div>
              )}
              <div
                className={`${
                  feature.image ? "md:col-7 lg:col-6" : "md:col-12"
                } ${index % 2 !== 0 && feature.image && "md:order-1"}`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                {feature.stats && (
                  <dl className="grid grid-cols-3 gap-4">
                    {feature.stats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="text-sm">{stat.label}</dt>
                        <dd className="text-2xl font-bold">{stat.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {feature.bullet_points && (
                  <ul>
                    {feature.bullet_points.map((bullet: string) => (
                      <li className="relative mb-4 pl-6" key={bullet}>
                        <FaCheck className={"absolute left-0 top-1.5"} />
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
        </section>
      ))}

      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
