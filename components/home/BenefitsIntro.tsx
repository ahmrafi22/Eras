import { BrandMark } from "@/components/era/BrandMark";

export function BenefitsIntro() {
  return (
    <section className="section arch overflow-clip theme_on-brand">
      <div className="container">
        <div className="benefits-intro-w">
          <div className="benefits-intro-s">
            <div className="u-48 b-mob"></div>
            <div className="u-272 b-mob"></div>
            <div className="s_logo">
              <div className="info-s_logo_l">
                <div className="l1 text-center" data-scroll-reveal="p">
                  Costa
                </div>
              </div>
              <div
                className="logo_symbol ico-48"
                data-scroll-reveal="ctn"
              >
                <div className="logo w-embed">
                  <BrandMark height="100%" width="100%" />
                </div>
              </div>
              <div className="info-s_logo_r">
                <div className="l1 text-center" data-scroll-reveal="p">
                  del Sol
                </div>
              </div>
            </div>
            <div className="u-48"></div>
            <div className="divider">
              <div className="line-v" data-scroll-reveal="line"></div>
            </div>
            <div className="u-48"></div>
            <div className="grid">
              <div className="s_title">
                <p className="l1 text-center" data-scroll-reveal="p">
                  A place to live — to return year after year
                </p>
              </div>
            </div>
            <div className="u-96"></div>
            <div className="benefits-intro-s_title">
              <div className="benefits-intro-s_title_svg b-desk w-embed">
                <svg height="100%" viewBox="0 0 1600 1600" width="100%">
                  <defs>
                    <path
                      d="M 800,800 m -676,0 a 676,676 0 1,1 1352,0 a 676,676 0 1,1 -1352,0"
                      id="circle-desk"
                    ></path>
                  </defs>
                  <text
                    className="h4"
                    data-circle-text=""
                    fill="currentColor"
                    textAnchor="middle"
                  >
                    <textPath href="#circle-desk" startOffset="25%">
                      Three reasons to choose Era
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="benefits-intro-s_title_svg b-mob w-embed">
                <svg height="100%" viewBox="0 0 416 416" width="100%">
                  <defs>
                    <path
                      d="M 208,208 m -160,0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
                      id="circle-mob"
                    ></path>
                  </defs>
                  <text
                    className="h4"
                    data-circle-text=""
                    fill="currentColor"
                    textAnchor="middle"
                  >
                    <textPath href="#circle-mob" startOffset="25%">
                      Three reasons to choose Era
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
