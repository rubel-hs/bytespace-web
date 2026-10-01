import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create an Account | ByteSpace",
  description: "Create your free ByteSpace account.",
};

const fields = [
  {
    id: "full-name",
    label: "Full Name",
    name: "name",
    type: "text",
    placeholder: "Jamie Davis",
    autoComplete: "name",
  },
  {
    id: "email",
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "designer@example.com",
    autoComplete: "email",
  },
  {
    id: "password",
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "********",
    autoComplete: "new-password",
  },
] as const;

export default function SignUpPage() {
  return (
    <div className="auth-page signup-page min-h-screen overflow-hidden text-light">
      <header className="mx-auto flex h-26 w-full max-w-299 items-center px-6 sm:h-30 xl:px-0">
        <Link
          href="/"
          aria-label="ByteSpace home"
          className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Image
            src="/images/favicon.png"
            alt=""
            width={29}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>
      </header>

      <main className="mx-auto grid w-full max-w-311.5 gap-12 px-6 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(460px,579px)] lg:items-start lg:gap-18 xl:gap-24 xl:px-0">
        <section
          className="flex min-w-0 flex-col lg:pl-6.25"
          aria-labelledby="signup-intro-title"
        >
          <div className="max-w-118.75">
            <h1
              id="signup-intro-title"
              className="text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-light"
            >
              Sign up and come in
            </h1>
            <p className="mt-4 text-lg leading-[1.6] text-light">
              The registration process is straightforward, uncomplicated, and
              efficient, allowing users to sign up quickly, easily, and at no
              cost
            </p>
          </div>

          <Image
            src="/images/signin_sgnup_image.png"
            alt="ByteSpace course previews and happy students"
            width={552}
            height={586}
            priority
            sizes="(max-width: 1023px) 0px, 552px"
            className="mt-14.5 hidden h-auto w-full max-w-138 lg:block"
          />
        </section>

        <section
          aria-labelledby="signup-form-title"
          className="w-full rounded-3xl bg-body px-6 py-10 text-footer-text shadow-sm sm:px-10 sm:py-12 lg:min-h-196 lg:px-15.75 lg:py-15.25"
        >
          <div className="flex min-h-full flex-col">
            <div>
              <p className="text-lg leading-[1.6] text-secondary">
                Create an Account
              </p>
              <h2
                id="signup-form-title"
                className="mt-0 max-w-113.25 text-[38px] font-semibold leading-[1.2] tracking-[-0.01em] text-footer-text sm:text-[44px]"
              >
                Welcome to ByteSpace
              </h2>
            </div>

            <form action="#" className="mt-10 flex flex-col" method="post">
              <div className="space-y-6">
                {fields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium leading-[1.2] text-footer-text"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      required
                      className="mt-2 h-13 w-full rounded-xl border border-[#e5e6e8] bg-body px-6 text-lg leading-[1.6] text-footer-text outline-none transition placeholder:text-text-light focus:border-secondary focus:ring-2 focus:ring-secondary/15"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-6 ml-auto h-11.5 leading-[1.2]"
              >
                Continue
              </button>
            </form>

            <p className="mt-30.5 text-center text-base leading-[1.6] text-text">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-secondary transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                Login
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
