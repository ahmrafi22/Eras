export function FinalCta() {
  return (
    <section className="section theme_on-color" data-bg="color">
      <div className="container" data-footer-clip="">
        <div className="cta-w">
          <div className="cta-s">
            <div className="u-48"></div>
            <div className="grid">
              <div className="cta-s_desc">
                <p className="l1 a-center" data-scroll-reveal="p">
                  A short conversation is enough to understand which apartment
                  fits your use case — whether it is a family second home, a
                  longer stay, or a place to return to year after year.
                </p>
              </div>
            </div>
            <div className="u-272"></div>
            <div className="grid">
              <div className="cta-s_title">
                <h2 className="h1 a-center" data-scroll-reveal="h">
                  Perfect <br />
                  sea views
                </h2>
                <div className="u-32"></div>
                <h3 className="c1 a-center" data-scroll-reveal="h">
                  From rooftop terraces
                </h3>
                <div className="u-160"></div>
                <div className="cta-s_title_btn" data-scroll-reveal="ctn">
                  <div
                    className="btn-circle"
                    data-magnetic-btn=""
                    hover-btn-circle=""
                    hover-nav-item-trigger=""
                  >
                    <div className="btn-circle_label" data-magnetic-inner="">
                      <a
                        aria-label="View available apartments"
                        className="nav-item w-inline-block"
                        hover-nav-item=""
                        href="/apartments"
                      >
                        <div className="nav-item_label">
                          <div className="nav-item_label_text">
                            <div className="l1" hover="text">
                              View available apartments
                            </div>
                          </div>
                          <div className="nav-item_label_text is-2">
                            <div className="l1" hover="text">
                              View available apartments
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="btn-circle_bg w-embed">
                      <svg
                        data-circle=""
                        height="100%"
                        viewBox="0 0 208 208"
                        width="100%"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="104"
                          cy="104"
                          data-arc=""
                          fill="none"
                          r="103.5"
                          stroke="currentColor"
                          strokeWidth="1"
                          transform="rotate(-150 104 104)"
                        ></circle>
                        <circle
                          cx="104"
                          cy="104"
                          data-arc=""
                          fill="none"
                          r="103.5"
                          stroke="currentColor"
                          strokeWidth="1"
                          transform="rotate(30 104 104)"
                        ></circle>
                        <circle
                          cx="104"
                          cy="104"
                          fill="none"
                          r="103.5"
                          stroke="var(--_colors---base-1000--line)"
                          strokeWidth="1"
                        ></circle>
                      </svg>
                    </div>
                    <a
                      aria-label="View available apartments"
                      className="btn-circle_link w-inline-block"
                      href="/apartments"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w_bg">
            <div className="img-w" data-parallax="w">
              <img
                alt=""
                className="img-p"
                data-parallax="img"
                loading="eager"
                src="assets/img/6a0f88f3b81e88aabf6874e7_img_cta_1920.webp"
              />
              <div className="img-over-grad from-top _4x"></div>
              <div className="img-over-grad"></div>
              <div className="img-over-grad"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
