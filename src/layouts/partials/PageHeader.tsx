import Breadcrumbs from "@/components/Breadcrumbs";
import { humanize } from "@/lib/utils/textConverter";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <section className="section-ph">
      <div className="container text-center">
        <div className="text-white  ">
          <h1 className="text-white font-bold">{humanize(title)}</h1>
          <Breadcrumbs className="mt-6 text-white" />
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
