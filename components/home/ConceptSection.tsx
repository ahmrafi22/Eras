import { BrandMark } from "@/components/era/BrandMark";

export function ConceptSection() {
  return (
    <section className="section overflow-clip" data-bg="light" data-slow-scroll="">
      <div className="container loc">
        <div
          className="loc-scroll-area"
          data-scroll-horizontal=""
          data-video-playpause=""
        >
          <div className="loc-scroll-area_screen">
            <div className="loc-scroll-area_track">
              <div className="loc-info-w" data-parallax="w">
                <div className="loc-info-s" data-parallax="img-in">
                  <div className="loc-info-s_t">
                    <div className="h-(--_units---u-48) flex-none"></div>
                    <div className="h-(--_units---u-160) flex-none b-mob"></div>
                  </div>
                  <div className="loc-info-s_c">
                    <div className="grid">
                      <div className="s_title">
                        <h2 className="l1 text-center" data-part="p">
                          The concept
                        </h2>
                      </div>
                    </div>
                    <div className="h-(--_units---u-32) b-desk"></div>
                    <div className="h-(--_units---u-160) flex-none b-mob"></div>
                    <div className="grid">
                      <div className="info-s_lead">
                        <h3 className="h4 text-center" data-part="p">
                          ERA Residences is a boutique gated community of only
                          25 residences, designed around privacy, wellbeing
                          and timeless Mediterranean living
                        </h3>
                      </div>
                    </div>
                    <div className="h-(--_units---u-96) b-mob"></div>
                  </div>
                  <div className="loc-info-s_b">
                    <div className="grid">
                      <div className="info-s_desc">
                        <p className="p1 text-center" data-part="p">
                          Inspired by the atmosphere of Marbella’s golden era,
                          the project combines contemporary architecture with
                          warm materials, natural landscaping and carefully
                          curated spaces.
                        </p>
                        <div className="h-(--_units---u-32)"></div>
                        <div className="s_logo">
                          <div
                            className="logo_symbol ico-48"
                            data-part="ctn"
                          >
                            <div className="logo w-embed">
                              <BrandMark height="100%" width="100%" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-(--_units---u-48) flex-none"></div>
                  </div>
                </div>
                <div className="flower loc-info" data-parallax="ctn-down">
                  <video
                    className="video"
                    {...{
                      "webkit-playsinline": "webkit-playsinline",
                    }}
                    disablePictureInPicture
                    loop
                    muted
                    playsInline
                    poster="/assets/img/6a4afbe9f3a19844a4b0caed_bougainvillea-flowers_01.avif"
                  >
                    <source
                      src="/assets/video/bougainvillea-flowers_01.webm"
                      type="video/webm"
                    />
                  </video>
                </div>
              </div>
              <div className="loc-intro-w">
                <div className="loc-intro-s">
                  <div className="h-(--_units---u-48) flex-none b-desk"></div>
                  <div className="h-(--_units---u-160) flex-none b-mob"></div>
                  <div className="grid _13-columns fill">
                    <div className="loc-intro-s_cap">
                      <h4 className="c1 text-center" data-scroll-reveal="h">
                        Spain
                      </h4>
                    </div>
                    <div className="loc-intro-s_title">
                      <h3 className="h1" data-scroll-reveal="h">
                        <span className="loc-intro-s_title_line is-1">
                          New{" "}
                        </span>
                        <span className="loc-intro-s_title_line is-2 mob_a-right">
                          Golden{" "}
                        </span>
                        <span className="loc-intro-s_title_line">Mile</span>
                      </h3>
                    </div>
                    <div className="loc-intro-s_img">
                      <div className="h-(--_units---u-32) b-mob"></div>
                      <div className="img-w" data-scroll-reveal="slide">
                        <img
                          alt="Sunlit modern terrace with cushioned sofas, wooden tables, climbing plants, and ocean view under clear sky."
                          className="img"
                          loading="eager"
                          src="/assets/img/6a15723f346e4b3a6c0af26a_era-residence-terrace.webp"
                        />
                      </div>
                    </div>
                    <div className="loc-intro-s_desc">
                      <div className="h-(--_units---u-32) b-mob"></div>
                      <h3 className="h5" data-scroll-reveal="p">
                        Between Marbella and Estepona
                      </h3>
                      <div className="h-(--_units---u-16) flex-none"></div>
                      <p className="p1" data-scroll-reveal="p">
                        Surrounded by beaches, golf courses, wellness clubs and
                        established lifestyle destinations, the project combines
                        privacy with effortless connectivity to everything
                        essential for Mediterranean living. A location designed
                        not around movement — but around returning.
                      </p>
                      <div className="h-(--_units---u-96) b-mob"></div>
                    </div>
                    <div
                      className="loc-intro-s_btn"
                      data-scroll-reveal="ctn"
                    >
                      <div
                        className="btn-circle"
                        data-magnetic-btn=""
                        hover-btn-circle=""
                        hover-nav-item-trigger=""
                      >
                        <div
                          className="btn-circle_label"
                          data-magnetic-inner=""
                        >
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
                  <div className="h-(--_units---u-48) flex-none"></div>
                </div>
                <div className="flower loc-intro">
                  <video
                    className="video"
                    {...{
                      "webkit-playsinline": "webkit-playsinline",
                    }}
                    disablePictureInPicture
                    loop
                    muted
                    playsInline
                    poster="/assets/img/6a4afbe941e5e917a8f84c4a_bougainvillea-flowers_02.avif"
                  >
                    <source
                      src="/assets/video/bougainvillea-flowers_02.webm"
                      type="video/webm"
                    />
                  </video>
                </div>
              </div>
              <div className="loc-path-w">
                <div className="loc-path-s">
                  <div className="loc-path-s_t">
                    <div className="h-(--_units---u-48) flex-none b-desk"></div>
                    <div className="h-(--_units---u-160) flex-none b-mob"></div>
                  </div>
                  <div className="loc-path-s_c">
                    <div className="grid">
                      <div className="loc-path-s_title">
                        <h2 className="h3 text-center">
                          <span
                            className="loc-path-s_title_line"
                            data-scroll-reveal="h"
                          >
                            The coast you wanted{" "}
                          </span>
                          <span
                            className="loc-path-s_title_a a2"
                            data-scroll-reveal="a"
                          >
                            yours{" "}
                          </span>
                          <span
                            className="loc-path-s_title_line"
                            data-scroll-reveal="h"
                          >
                            this year
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="loc-path-s_b">
                    <div className="h-(--_units---u-48) flex-none b-mob"></div>
                    <div className="grid">
                      <div className="loc-path-s_path scrollbar-none">
                        <div className="loc-path-s_path_c">
                          <img
                            alt=""
                            className="img loc-path"
                            loading="eager"
                            src="/assets/img/6a51975c584436cfdd9e2406_loc_path.svg"
                          />
                          <img
                            alt=""
                            className="img h-auto"
                            data-scroll-reveal="ctn"
                            loading="eager"
                            src="/assets/img/6a51975cc959ee1e44045b0e_loc_path_labels.svg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="h-(--_units---u-48) flex-none"></div>
                  </div>
                </div>
                <div className="loc-path-w_flower">
                  <div className="flower loc-path">
                    <video
                      className="video"
                      {...{
                        "webkit-playsinline": "webkit-playsinline",
                      }}
                      disablePictureInPicture
                      loop
                      muted
                      playsInline
                      poster="/assets/img/6a4afbe988f8dc3c9bb1647a_bougainvillea-flowers_03.avif"
                    >
                      <source
                        src="/assets/video/bougainvillea-flowers_03.webm"
                        type="video/webm"
                      />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slow-scroll-trigger" data-slow-scroll=""></div>
        </div>
      </div>
    </section>
  );
}
