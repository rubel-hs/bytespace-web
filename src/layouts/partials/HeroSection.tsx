import HeroParallaxShapes from "@/components/HeroParallaxShapes";
import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

type HeroSectionData = {
  title: string;
  content?: string;
  image?: string;
  search?: {
    enable: boolean;
    placeholder?: string;
    button_label?: string;
  };
};

const HeroSection = ({ data }: { data: HeroSectionData }) => {
  return (
    <section
      className="section bg-secondary/90 pt-40 xl:pt-42 pb-0 relative overflow-hidden isolate"
      style={{
        backgroundImage: "url('/images/shape/grids.svg')",
        backgroundPosition: "top left",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container relative z-20">
        <div className="row justify-center">
          <div className="lg:col-9 mb-8 text-center">
            <h1
              className="mb-4 text-h1 xl:text-7xl text-white"
              dangerouslySetInnerHTML={markdownify(data.title)}
            />
            <p
              className="mb-18 text-gray-300 text-lg"
              dangerouslySetInnerHTML={markdownify(data.content ?? "")}
            />
            {data.search?.enable && (
              <div className="mx-auto flex w-full max-w-175 flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:justify-center sm:gap-5">
                <label
                  data-search-trigger
                  className="flex h-13 min-h-13 w-full max-w-115 min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-full bg-white px-5 text-left text-text-light shadow-sm"
                >
                  <FaSearch aria-hidden="true" className="size-5 shrink-0" />
                  <input
                    type="search"
                    readOnly
                    aria-label={data.search.placeholder ?? "Search"}
                    placeholder={data.search.placeholder ?? "Search..."}
                    className="min-w-0 flex-1 cursor-pointer border-0 bg-transparent p-0 text-left text-lg text-text-light placeholder:text-text-light focus:ring-0 focus:outline-none"
                  />
                </label>
                <button
                  type="button"
                  data-search-trigger
                  className="btn btn-primary h-13 min-h-13 w-full max-w-115 px-8 text-lg sm:w-auto sm:max-w-none"
                >
                  {data.search.button_label ?? "Search"}
                </button>
              </div>
            )}
          </div>
          {data.image && (
            <div className="col-12">
              <div className="relative mx-auto w-200 max-w-full translate-x-12">
                <ImageFallback
                  src={data.image}
                  className="h-auto w-full"
                  width="800"
                  height="420"
                  alt="data image"
                  priority
                />
                <Image
                  src="/images/ui-ux-design.png"
                  alt="UI/UX Design: 200 courses and 1000+ students"
                  width={296}
                  height={105}
                  loading="eager"
                  className="absolute left-0 top-[18%] z-20 hidden h-auto w-[26%] drop-shadow-md md:block"
                  sizes="208px"
                />
                <Image
                  src="/images/happy-students.png"
                  alt="Happy students: 4.5 rating from 240 reviews and over 2000 students"
                  width={387}
                  height={182}
                  loading="eager"
                  className="absolute left-[-10%] top-[57%] z-20 hidden h-auto w-[34%] drop-shadow-md md:block"
                  sizes="272px"
                />
                <Image
                  src="/images/leading_progress.png"
                  alt="Learning progress: 55%"
                  width={348}
                  height={197}
                  loading="eager"
                  className="absolute left-[70%] top-[20%] z-20 hidden h-auto w-[31%] drop-shadow-md md:block"
                  sizes="248px"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <HeroParallaxShapes />
    </section>
  );
};

export default HeroSection;
