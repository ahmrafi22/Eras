import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/era/Icons";

const cloudMarquees = [
  {
    variant: "is-33",
    src: "/assets/img/6a0fa3c60405a99c8530535e_img_clouds_33.avif",
  },
  {
    variant: "is-47",
    src: "/assets/img/6a0fa3c6685d7bb04792137a_img_clouds_47.avif",
  },
  {
    variant: "is-02",
    src: "/assets/img/6a0fa3c6c9c3c584d9d78d85_img_clouds_02.avif",
  },
] as const;

type CloudMarqueeProps = {
  variant: string;
  src: string;
};

function CloudMarquee({ variant, src }: CloudMarqueeProps) {
  return (
    <div className="loc-w_clouds">
      <div className="marquee" data-marquee-css="">
        <div className="marquee_track" data-marquee-css="track">
          <div className="marquee_list" data-marquee-css="list">
            <div className="marquee_list_item">
              <img
                alt=""
                className={`clouds ${variant}`}
                loading="eager"
                src={src}
              />
            </div>
            <div className="marquee_list_item">
              <img
                alt=""
                className={`clouds ${variant}`}
                loading="eager"
                src={src}
              />
            </div>
          </div>
          <div className="marquee_list" data-marquee-css="list">
            <div className="marquee_list_item">
              <img
                alt=""
                className={`clouds ${variant}`}
                loading="eager"
                src={src}
              />
            </div>
            <div className="marquee_list_item">
              <img
                alt=""
                className={`clouds ${variant}`}
                loading="eager"
                src={src}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LocationMap() {
  return (
    <section className="section clip theme_on-color" data-bg="color">
      <div className="container">
        <div className="loc-w" data-parallax="w">
          <div className="loc-w_over-grad"></div>
          <div className="loc-w_over-grad"></div>
          {cloudMarquees.map((marquee) => (
            <CloudMarquee
              key={marquee.variant}
              variant={marquee.variant}
              src={marquee.src}
            />
          ))}
          <div className="loc-s">
            <div className="grid">
              <div className="loc-s_desc">
                <div className="b-desk">
                  <div className="loc-s_desc_line">
                    <div className="line-v" data-scroll-reveal="line"></div>
                  </div>
                  <h3 className="l1" data-scroll-reveal="p">
                    New Golden Mile, Estepona
                  </h3>
                  <div className="u-32"></div>
                  <h4 className="p1" data-scroll-reveal="p">
                    Costa del Sol
                  </h4>
                  <div className="u-32"></div>
                  <h5 className="p1" data-scroll-reveal="p">
                    Spain
                  </h5>
                </div>
                <div className="b-mob">
                  <div className="l1-list">
                    <div className="ico-16">
                      <div className="ico w-embed">
                        <ChevronLeftIcon height="100%" width="100%" />
                      </div>
                    </div>
                    <div className="l1">Drag to see more</div>
                    <div className="ico-16">
                      <div className="ico w-embed">
                        <ChevronRightIcon height="100%" width="100%" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="u-48"></div>
            <div className="loc-w_decor theme_on-brand">
              <div className="w-embed">
                <style>{`.loc-w_decor {
  clip-path: polygon(
    var(--_special-units---offset-l) 0,
    calc(100% - var(--_special-units---offset-r)) 0%,
    100% 101%,
    0 101%
  );
}`}</style>
              </div>
            </div>
          </div>
          <div className="loc-w_bg" data-parallax="img">
            <div className="loc-w_bg_img">
              <div className="pins-cms w-dyn-list">
                <div className="cms_empty-none w-dyn-empty"></div>
              </div>
              <div className="img-w h-auto">
                <img
                  alt="Coastal residential complex with pools, beachfront, roads, and distant mountains under clear blue sky."
                  className="img h-auto"
                  loading="eager"
                  src="/assets/img/6a15185e6803ae588479d12b_era-residence-master-plan.webp"
                />
                <div className="img-over-grad from-bot bot _100vh"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
