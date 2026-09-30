import SeoMeta from "@/partials/SeoMeta";
import Image from "next/image";
import Link from "next/link";

const NotFound = async () => {
  return (
    <>
      <SeoMeta title={"Page Not Found"} />
      <section className="section-ph">
        
        <div className="container relative">
          <div className="row justify-center">
            <div className="col-12 text-center ">
              <Image
                src="/images/shape/404.svg"
                alt="404"
                width={920}
                height={358}
                className="mx-auto h-auto w-full max-w-[920px]"
                priority
              />
              <div className="-mt-16 md:-mt-28 flex flex-col items-center gap-8">
                <h1 className="font-secondary font-semibold text-white text-4xl md:text-7xl leading-[1.2] tracking-[-0.01em] max-w-[935px]">
                  The page you are looking for doesn&rsquo;t exist
                </h1>
                <p className="text-[#E5E6E8] text-lg leading-[1.6] max-w-[467px]">
                  Try to use a correct url or go back to homepage to start
                  again
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-3xl bg-primary px-6 py-3 font-primary font-medium text-lg leading-[1.2] text-footer-text"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
