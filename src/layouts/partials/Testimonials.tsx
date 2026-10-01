"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Testimonial } from "@/types";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    enable?: boolean;
    title: string;
    description?: string;
    testimonials: Array<Testimonial>;
  };
}

const Testimonials = ({ data }: { data: PageData }) => {
  const { enable, title, description, testimonials } = data.frontmatter;

  if (!enable) return null;

  return (
    <section className="section-box isolate overflow-hidden bg-[#FAFAFA] py-16 sm:py-20 lg:py-18.5">
      <div
        aria-hidden="true"
        className="absolute -top-36 left-[35%] -z-10 h-168 w-2xl rounded-full blur-2xl lg:-top-34.5 lg:left-[calc(50%-325px)]"
        style={{
          background:
            "radial-gradient(circle, rgba(203, 252, 1, 0.4) 0%, rgba(203, 252, 1, 0.13) 53%, rgba(203, 252, 1, 0.03) 75%, rgba(203, 252, 1, 0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-44 left-[70%] -z-10 h-208 w-208 rounded-full blur-2xl lg:-top-60.25 lg:left-[calc(50%+122px)] lg:h-284.25 lg:w-284.25"
        style={{
          background:
            "radial-gradient(circle, rgba(203, 252, 1, 0.4) 0%, rgba(203, 252, 1, 0.13) 53%, rgba(203, 252, 1, 0.03) 75%, rgba(203, 252, 1, 0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-48 -left-90 -z-10 h-232 w-232 rounded-full blur-2xl lg:top-37.25 lg:-left-110.5 lg:h-284.25 lg:w-284.25"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 59, 226, 0.25) 0%, rgba(0, 59, 226, 0.08) 53%, rgba(0, 59, 226, 0.02) 75%, rgba(0, 59, 226, 0) 100%)",
        }}
      />

      <div className="container relative z-10">
        <div className="grid items-end gap-6 md:grid-cols-2 md:gap-10 lg:gap-10.75">
          <h2
            className="max-w-145 text-[2rem] leading-[1.2] tracking-[-0.01em] sm:text-[2.5rem] lg:text-[44px]"
            dangerouslySetInnerHTML={markdownify(title)}
          />
          {description && (
            <p
              className="max-w-145 text-base leading-[1.6] text-text sm:text-lg"
              dangerouslySetInnerHTML={markdownify(description)}
            />
          )}
        </div>

        <Swiper
          className="mt-12 overflow-visible! lg:mt-18"
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          centeredSlides
          loop
          loopAdditionalSlides={1}
          speed={500}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3, spaceBetween: 41 },
          }}
        >
          {testimonials.map((item: Testimonial, index: number) => (
            <SwiperSlide key={`${item.name}-${index}`} className="h-auto!">
              <article className="h-full rounded-3xl bg-body p-6 transition-shadow duration-300 hover:card-shadow">
                <ImageFallback
                  height={80}
                  width={80}
                  className="h-20 w-20 rounded-full object-cover"
                  src={item.avatar}
                  alt={`Portrait of ${item.name}`}
                />
                <div className="mt-6">
                  <h3
                    className="text-xl font-semibold leading-[1.2] tracking-[-0.01em]"
                    dangerouslySetInnerHTML={markdownify(item.name)}
                  />
                  <p
                    className="text-lg leading-[1.6] text-secondary"
                    dangerouslySetInnerHTML={markdownify(item.designation)}
                  />
                </div>
                <blockquote
                  className="mt-4 text-base leading-[1.6] text-text sm:mt-6 sm:text-lg"
                  dangerouslySetInnerHTML={markdownify(item.content)}
                />
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
