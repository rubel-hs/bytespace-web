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
              <div className="mx-auto flex w-full max-w-[700px] flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:justify-center sm:gap-5">
                <label
                  data-search-trigger
                  className="flex h-[52px] min-h-[52px] w-full max-w-[460px] min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-full bg-white px-5 text-left text-text-light shadow-sm"
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
                  className="btn btn-primary h-[52px] min-h-[52px] w-full max-w-[460px] px-8 text-lg sm:w-auto sm:max-w-none"
                >
                  {data.search.button_label ?? "Search"}
                </button>
              </div>
            )}
          </div>
          {data.image && (
            <div className="col-12">
              <ImageFallback
                src={data.image}
                className="mx-auto translate-x-12"
                width="800"
                height="420"
                alt="data image"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/images/shape/shape_spring_teal.svg"
          alt=""
          width={267}
          height={387}
          loading="eager"
          className="shape-reveal shape-reveal--1 absolute left-[-4rem] lg:top-[20.5%] top-[36%] hidden w-56 md:block lg:left-[-7vw] lg:w-[clamp(310px,27vw,460px)]"
          sizes="(min-width: 1024px) 27vw, 224px"
        />
        <Image
          src="/images/shape/shape_teal_large.svg"
          alt=""
          width={213}
          height={372}
          className="shape-reveal shape-reveal--2 absolute right-[-5rem] lg:top-[19.5%] top-[36%] hidden w-48 md:block lg:right-[-6vw] lg:w-[clamp(224px,20vw,340px)]"
          sizes="(min-width: 1024px) 20vw, 192px"
        />
        <Image
          src="/images/shape/shape_spring_white_sm.svg"
          alt=""
          width={176}
          height={176}
          className="shape-reveal shape-reveal--3 absolute left-[15%] lg:top-[39%] top-[54%] hidden w-24 md:block lg:w-[clamp(128px,12vw,220px)]"
          sizes="(min-width: 1024px) 12vw, 96px"
        />
        <Image
          src="/images/shape/shape_cone.svg"
          alt=""
          width={190}
          height={189}
          className="shape-reveal shape-reveal--4 absolute right-[9%] lg:top-[39%] top-[54%] hidden w-28 md:block lg:right-[12%] lg:w-[clamp(176px,16vw,240px)]"
          sizes="(min-width: 1024px) 16vw, 80px"
        />
        <Image
          src="/images/shape/shape_dounut.svg"
          alt=""
          width={346}
          height={343}
          className="shape-reveal shape-reveal--5 absolute z-10 left-36 lg:left-46 top-[60%] lg:top-[55%] hidden w-56 md:block lg:w-[clamp(320px,30vw,480px)]"
          sizes="(min-width: 1024px) 30vw, 224px"
        />
        <Image
          src="/images/shape/shapte_spring_white_large.svg"
          alt=""
          width={317}
          height={332}
          className="shape-reveal shape-reveal--6 absolute right-[12%] bottom-[6%] hidden w-56 md:block lg:w-[clamp(280px,30vw,360px)]"
          sizes="(min-width: 1024px) 30vw, 224px"
        />
        {/* large circle */}
        <div className="shape-reveal shape-reveal--7 bg-primary w-1/2 max-w-287 aspect-square rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
      </div>
    </section>
  );
};

export default HeroSection;
