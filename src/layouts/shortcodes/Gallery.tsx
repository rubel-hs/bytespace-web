import Image from "next/image";

type GalleryProps = {
  images: string;
  alt?: string;
  columns?: 2 | 3 | 4;
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

const Gallery = ({
  images,
  alt = "Gallery image",
  columns = 4,
}: GalleryProps) => {
  const imageSources = images.split("|").map((image) => image.trim());

  return (
    <div
      className={`not-prose my-8 grid gap-3 ${columnClasses[columns]}`}
      role="list"
    >
      {imageSources.map((src, index) => (
        <div key={src} className="overflow-hidden rounded-2xl" role="listitem">
          <Image
            src={src}
            alt={`${alt} ${index + 1}`}
            width={502}
            height={376}
            sizes={
              columns === 4
                ? "(max-width: 1023px) 50vw, 25vw"
                : "(max-width: 639px) 100vw, 50vw"
            }
            className="aspect-[4/3] h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
