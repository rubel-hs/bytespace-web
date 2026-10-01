import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        videoid: string;
        videotitle?: string;
      };
    }
  }
}

export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    author: string;
    tags: string[];
    date?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};

export type Author = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    social: [
      {
        name: string;
        icon: string;
        link: string;
      },
    ];
  };
  content?: string;
  slug?: string;
};

export type CoursePrice = {
  amount: number;
  currency: string;
  billing_label: string;
};

export type Course = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    preview_video?: string;
    date?: string;
    category: string;
    level: string;
    course_creator: string;
    price: CoursePrice;
    stats: {
      students: number;
      lesson_count: number;
      duration: string;
    };
    featured_lessons?: Array<{ title: string; duration: string }>;
    includes?: string[];
    modules?: Array<{ title: string; description: string }>;
    sneak_peek?: string[];
    key_points?: string[];
    draft?: boolean;
  };
  slug?: string;
  content: string;
};

export type CourseCreator = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    designation?: string;
    specialties?: string[];
    followers?: number;
    social?: Array<{ name: string; icon: string; link: string }>;
    draft?: boolean;
  };
  slug?: string;
  content: string;
};

export type CourseReview = {
  reviewer_name: string;
  reviewer_role?: string;
  reviewer_image?: string;
  rating: number;
  date: string;
  content: string;
};

export type CourseReviewCollection = {
  frontmatter: {
    course: string;
    reviews: CourseReview[];
    draft?: boolean;
  };
  slug?: string;
  content: string;
};

export type Feature = {
  button?: button;
  image: string;
  bullet_points?: string[];
  stats?: Array<{
    value: string;
    label: string;
  }>;
  content: string;
  title: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type Call_to_action = {
  enable?: boolean;
  title: string;
  description: string;
  images: Array<{
    src: string;
    width: number;
    height: number;
    className?: string;
    position: {
      top?: string | number;
      right?: string | number;
      bottom?: string | number;
      left?: string | number;
      width?: string | number;
    };
  }>;
  button: Button;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};
