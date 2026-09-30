import { markdownify } from '@/lib/utils/textConverter';

const DiscoverYourPassion = ({ data }: { data: any })  => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-container">
          <div className="section-intro centralize">
            <h2 className="title hasHighlight  " dangerouslySetInnerHTML={markdownify(data.title)} />
            <p className="subtitle" dangerouslySetInnerHTML={markdownify(data.content)}></p>
          </div>
          <div className="section-content">

          </div>
        </div>

      </div>
    </section>
  );
};

export default DiscoverYourPassion;