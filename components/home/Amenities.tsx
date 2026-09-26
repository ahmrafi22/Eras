import { amenities } from "@/lib/era/content";

const amenityDescriptions: Record<string, string> = {
  "gated-community":
    "Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard",
  "swimming-pool-2":
    "Saltwater swimming pool, Children’s pool, Sauna, jacuzzi and wellness shower",
  "swimming-pool":
    "Each parking space includes pre-installation for optional EV charging.",
  "spa-gym":
    "Designed exclusively for residents and their guests, the amenities at ERA encourage a slower and more balanced Mediterranean lifestyle",
  landscaping:
    "The landscaping concept was designed to soften the architecture and strengthen the connection between the residences and the Mediterranean environment.",
};

export function Amenities() {
  return (
    <div className="amen-scroll-area">
      <div className="scroll-area_screen">
        <section className="section overflow-clip theme_on-color">
          <div className="container">
            <div className="amen-w">
              <div className="amen-s">
                <div className="amen-s_cms" data-tabs="" data-tabs-hilight="ver">
                  <div className="amen-cms w-dyn-list">
                    <div className="amen-cms_list w-dyn-items" role="list">
                      {amenities.map((amenity) => (
                        <div
                          key={amenity.id}
                          className="amen-cms_list_item w-dyn-item"
                          data-reveal-first=""
                          data-tab-content={amenity.id}
                          role="listitem"
                        >
                          <div className="amen-slide" data-parallax="w">
                            <div className="amen-slide_b">
                              <div className="grid">
                                <div className="amen-slide_title">
                                  <h3
                                    className="l1"
                                    data-scroll-reveal="p"
                                    data-tab="p"
                                  >
                                    {amenity.label}
                                  </h3>
                                  <div className="u-32"></div>
                                </div>
                                <div className="amen-slide_desc w-clearfix">
                                  <div className="red-line"></div>
                                  <h4
                                    className="h5"
                                    data-scroll-reveal="p"
                                    data-tab="p"
                                  >
                                    {amenityDescriptions[amenity.id]}
                                  </h4>
                                </div>
                              </div>
                              <div className="u-48"></div>
                            </div>
                            <div className="amen-slide_img">
                              <div className="img-w" data-tab="slide">
                                <div className="img-w">
                                  <img
                                    alt={amenity.image.alt}
                                    className="img-p"
                                    data-parallax="img-in"
                                    loading="eager"
                                    src={amenity.image.src}
                                  />
                                </div>
                                <div className="img-over-grad from-top"></div>
                                <div className="img-over-grad from-bot _4x bot"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="amm-s_cms_tabs-w">
                    <div className="grid">
                      <div className="amm-s_cms_tabs">
                        <div className="amen-tabs-cms w-dyn-list">
                          <div
                            className="amen-tabs-cms_list w-dyn-items"
                            role="list"
                          >
                            {amenities.map((amenity) => (
                              <div
                                key={amenity.id}
                                className="amen-tabs-cms_list_item w-dyn-item"
                                role="listitem"
                              >
                                <div
                                  className="amen-tab"
                                  data-tab=""
                                  data-tab-trigger={amenity.id}
                                >
                                  <div className="h5" data-scroll-reveal="p">
                                    {amenity.label}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="amm-s_cms_tabs_line" data-scroll-reveal="line">
                          <div
                            className="amm-s_cms_tabs_line_hilight"
                            data-tab-hilight=""
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="amm-s_cms_btn-w b-desk">
                    <div className="grid">
                      <div className="amm-s_cms_btn" data-scroll-reveal="ctn">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="hero_themes">
        <div className="hero_themes_color" data-bg="color"></div>
        <div className="hero_themes_light" data-bg="light"></div>
      </div>
    </div>
  );
}
