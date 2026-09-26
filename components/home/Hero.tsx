import { PlusIcon } from "@/components/era/Icons";

const heroPins = [
  { id: "crafted-to-endure", top: "62.5%", left: "57.5%" },
  { id: "light-flow", top: "58.3%", left: "26.9%" },
  { id: "your-private-sanctuary", top: "73.2%", left: "76.6%" },
] as const;

export function Hero() {
  return (
    <section className="section clip theme_on-color" id="hero">
      <div className="container">
        <div className="hero-scroll-area">
          <div className="hero-w" data-tabs-hero="">
            <div className="hero-s">
              <div className="u-48"></div>
              <div className="u-272 b-mob"></div>
              <div className="grid">
                <div className="hero-s_logo">
                  <h1
                    className="h1 a-center"
                    data-prevent-flicker=""
                    data-scroll-reveal="h"
                  >
                    Era <br />
                    Residence
                  </h1>
                  <div className="hero-s_logo_a">
                    <h2
                      className="a2"
                      data-prevent-flicker=""
                      data-scroll-reveal="a"
                    >
                      Estepona
                    </h2>
                  </div>
                </div>
              </div>
              <div className="u-48"></div>
              <div className="grid">
                <h3 className="hero-s_title h5">
                  <span
                    className="a-left"
                    data-prevent-flicker=""
                    data-scroll-reveal="h"
                  >
                    <div className="span">A place</div>
                  </span>
                  <div
                    className="hero-s_tabs"
                    data-prevent-flicker=""
                    data-scroll-reveal="ctn"
                  >
                    <a
                      aria-label="by day"
                      className="nav-item w-inline-block"
                      data-tab-trigger="day"
                      hover-nav-item-l2=""
                      {...{ "hover-tab": "" }}
                      href="#"
                    >
                      <div className="nav-item_label">
                        <div className="nav-item_label_text" hover="text">
                          <div className="l2">by day</div>
                        </div>
                        <div
                          className="nav-item_label_text is-2"
                          hover="text"
                        >
                          <div className="l2">by day</div>
                        </div>
                      </div>
                    </a>
                    <div className="hero-s_tabs_divider"></div>
                    <a
                      aria-label="by night"
                      className="nav-item w-inline-block"
                      data-tab-trigger="night"
                      hover-nav-item-l2=""
                      {...{ "hover-tab": "" }}
                      href="#"
                    >
                      <div className="nav-item_label">
                        <div className="nav-item_label_text" hover="text">
                          <div className="l2">by night</div>
                        </div>
                        <div
                          className="nav-item_label_text is-2"
                          hover="text"
                        >
                          <div className="l2">by night</div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <span
                    className="a-right"
                    data-prevent-flicker=""
                    data-scroll-reveal="h"
                  >
                    <div className="span">to return to</div>
                  </span>
                </h3>
              </div>
            </div>
            <div className="hero-w_bg">
              <div className="hero-w_bg_master">
                <div className="hero-w_bg_master_img">
                  <div className="pins-cms b-desk w-dyn-list">
                    <div className="pins-cms_list w-dyn-items" role="list">
                      {heroPins.map((pin) => (
                        <div
                          className="pins-cms_list_item w-dyn-item"
                          data-modal-tip-btn={pin.id}
                          data-pin={pin.id}
                          floating-tip-trigger={pin.id}
                          key={pin.id}
                          role="listitem"
                        >
                          <div className="pin" hover-pin="">
                            <div className="pin_dot" hover="bg">
                              <div
                                className="ico-16 theme_on-light"
                                hover="ico"
                              >
                                <div className="ico w-embed">
                                  <PlusIcon height="100%" width="100%" />
                                </div>
                              </div>
                            </div>
                            <div className="pin_bg">
                              <div
                                className="pin_bg_pulse"
                                data-pin-pulse=""
                              ></div>
                              <div
                                className="pin_bg_pulse"
                                data-pin-pulse=""
                              ></div>
                            </div>
                          </div>
                          <div className="style-css w-embed">
                            <style>{`[data-pin="${pin.id}"] {\n  top: ${pin.top};\n  left: ${pin.left};\n}`}</style>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="hero-w_bg_master_img_day"
                    data-tab-content="day"
                  >
                    <div className="img-w h-auto" data-tab="img">
                      <img
                        alt=""
                        className="img h-auto hero-img"
                        loading="eager"
                        src="/assets/img/6a25da81dce540a251389928_era-residence_gated-community_day.webp"
                      />
                    </div>
                  </div>
                  <div
                    className="hero-w_bg_master_img_night"
                    data-tab-content="night"
                  >
                    <div className="img-w h-auto" data-tab="img">
                      <img
                        alt=""
                        className="img h-auto hero-img"
                        loading="eager"
                        src="/assets/img/6a25da802c253b9e5e3d44f5_era-residence_gated-community_night.webp"
                      />
                    </div>
                  </div>
                  <div className="img-over-grad from-top _100vh"></div>
                  <div className="img-over-grad from-bot bot _6x"></div>
                  <div className="img-over-grad from-bot bot _6x"></div>
                </div>
                <div className="hero-s_b">
                  <div
                    className="hero-s_btn"
                    data-prevent-flicker=""
                    data-scroll-reveal="ctn"
                  >
                    <div className="e-auto">
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
                  <div className="u-32"></div>
                  <div className="grid">
                    <div className="hero-s_desc">
                      <p className="l1 a-center"></p>
                    </div>
                  </div>
                  <div className="u-48"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero_themes">
            <div className="hero_themes_color" data-bg="color"></div>
            <div className="hero_themes_light" data-bg="light"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
