import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_newsletter: newsletter } = config.params;

  return (
    <footer className="border-t border-border bg-body text-footer-text">
      <div className="container py-12 sm:py-14 lg:py-17.5">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,528px)_1fr] lg:gap-23">
          <div>
            <div className="space-y-4">
              <Logo src="/images/logo_dark.png" />
              <p className="max-w-132 text-sm leading-[1.6]">
                {newsletter.description}
              </p>
            </div>

            <form
              className="mt-8 sm:mt-11.25"
              action={newsletter.action}
              method="post"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={newsletter.placeholder}
                  className="h-13 w-full rounded-full border border-border bg-body px-6 text-base outline-none transition-colors placeholder:text-footer-text focus:border-text-dark sm:max-w-94"
                />
                <button
                  type="submit"
                  className="btn btn-primary h-13 shrink-0 leading-[1.2]"
                >
                  {newsletter.button_label}
                </button>
              </div>
              <p className="mt-6 max-w-126 text-xs leading-[1.6]">
                {newsletter.disclaimer}
              </p>
            </form>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[167px_167px_166px] lg:gap-x-10"
          >
            {menu.footer.map((group) => (
              <div
                key={group.title || "browse-secondary"}
                className={group.title ? undefined : "lg:pt-12"}
              >
                {group.title && (
                  <h2 className="mb-6 text-base font-normal leading-6">
                    {group.title}
                  </h2>
                )}
                <ul className="space-y-4 text-sm leading-[1.6]">
                  {group.links.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.url}
                        className="transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-border pt-5.5 lg:mt-32.5">
          <div className="flex flex-col gap-4 text-xs leading-[1.6] sm:flex-row sm:items-center sm:justify-between">
            <p dangerouslySetInnerHTML={markdownify(copyright)} />
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {menu.footer_legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.url}
                    className="transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
