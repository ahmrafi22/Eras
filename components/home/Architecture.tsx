export function Architecture() {
  return (
    <section className="section clip">
      <div className="container">
        <div className="arch-scroll-area" data-video-playpause="">
          <div className="arch-intro-s b-desk">
            <div className="w_bg">
              <div className="arch-intro-s_bg_l"></div>
              <div className="arch-intro-s_bg_r">
                <div className="w-embed"></div>
              </div>
              <div className="flower arch-intro-l">
                <video
                  className="video"
                  {...{
                    "webkit-playsinline": "webkit-playsinline",
                  }}
                  disablePictureInPicture
                  loop
                  muted
                  playsInline
                  poster="/assets/img/6a4afbe9a4873ec6185f295d_bougainvillea-flowers_05.avif"
                >
                  <source
                    src="/assets/video/bougainvillea-flowers_05.webm"
                    type="video/webm"
                  />
                </video>
              </div>
              <div className="flower arch-intro-r">
                <video
                  className="video"
                  {...{
                    "webkit-playsinline": "webkit-playsinline",
                  }}
                  disablePictureInPicture
                  loop
                  muted
                  playsInline
                  poster="/assets/img/6a4afbe9f3a19844a4b0caf0_bougainvillea-flowers_07.avif"
                >
                  <source
                    src="/assets/video/bougainvillea-flowers_07.webm"
                    type="video/webm"
                  />
                </video>
              </div>
            </div>
          </div>
          <div className="arch-w theme_on-color">
            <div className="arch-s">
              <div className="arch-s_t">
                <div className="u-48"></div>
                <h2 className="h1 a-center" data-fit-text="" data-text="h">
                  Architecture
                </h2>
                <div className="u-32"></div>
                <div className="grid">
                  <div className="arch-s_desc">
                    <p className="l1 a-center" data-text="p"></p>
                  </div>
                </div>
              </div>
              <div className="arch-s_b">
                <div className="grid">
                  <div className="arch-s_quote w-clearfix">
                    <div className="red-line"></div>
                    <h3 className="h5" data-part="p">
                      The architecture of ERA Residences balances clean
                      contemporary lines with Mediterranean warmth and texture
                    </h3>
                    <div className="u-64"></div>
                    <div className="grid _4-columns">
                      <div className="arch-s_author">
                        <div className="l1" data-part="p">
                          By Schiemann Weyers
                        </div>
                        <div className="l1 reg" data-part="p">
                          Architects OCWA Architects
                        </div>
                      </div>
                    </div>
                    <div className="u-160 b-desk"></div>
                  </div>
                  <div className="arch-s_btn b-desk" data-part="ctn">
                    <div
                      className="btn-circle"
                      data-magnetic-btn=""
                      data-modal-cta-btn="book-a-call"
                      hover-btn-circle=""
                      hover-nav-item-trigger=""
                    >
                      <div className="btn-circle_label" data-magnetic-inner="">
                        <a
                          aria-label="Book a call now"
                          className="nav-item w-inline-block"
                          hover-nav-item=""
                          href="#"
                        >
                          <div className="nav-item_label">
                            <div className="nav-item_label_text">
                              <div className="l1" hover="text">
                                Book a call now
                              </div>
                            </div>
                            <div className="nav-item_label_text is-2">
                              <div className="l1" hover="text">
                                Book a call now
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
                        aria-label="Book a call now"
                        className="btn-circle_link w-inline-block"
                        href="#"
                      ></a>
                    </div>
                  </div>
                </div>
                <div className="u-96"></div>
              </div>
            </div>
            <div className="w_bg">
              <div className="img-w" data-desk="off" data-parallax="w">
                <img
                  alt="Modern terrace apartments with green plants, flowering vines, and outdoor seating on a sunny day."
                  className="img"
                  data-parallax="img"
                  loading="eager"
                  src="/assets/img/6a0f8994091fd12c24e79c8a_img_cam_02.webp"
                />
                <div className="img-over-grad bot _100vh"></div>
                <div className="img-over-grad bot _100vh"></div>
              </div>
            </div>
          </div>
          <div className="_100vh b-desk"></div>
          <div className="_100vh b-desk"></div>
          <div className="arch_themes">
            <div className="arch_themes_light b-desk" data-bg="light"></div>
            <div className="arch_themes_color" data-bg="color"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
