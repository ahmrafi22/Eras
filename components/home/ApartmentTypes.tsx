import { ChevronLeftIcon, ChevronRightIcon } from "@/components/era/Icons";
import { apartmentTypes } from "@/lib/era/content";

const apartmentDescriptions: Record<string, string> = {
  "ground-floor-basement":
    "Private basement, direct outdoor access and a dedicated lower level.",
  "ground-floor":
    "Step directly onto your terrace and into the communal gardens, blending indoor comfort with outdoor living.",
  "penthouse-duplex":
    "Two floors crowned with panoramic views and a private rooftop solarium — the ultimate expression of luxury living.",
};

const apartmentButtonLabels: Record<string, string> = {
  "ground-floor-basement": "Explore Ground + basement",
  "ground-floor": "Explore Ground floor",
  "penthouse-duplex": "Explore Penthouses",
};

export function ApartmentTypes() {
  return (
    <section className="section theme_on-brand" data-bg="light" data-snap="">
      <div className="container">
        <div className="apart-type-w">
          <div className="apart-type-s">
            <div className="u-48 b-desk"></div>
            <div className="u-96 b-mob"></div>
            <div className="grid fill">
              <div className="apart-type-s_cms" data-slider="">
                <div className="apart-type-cms w-dyn-list">
                  <div className="apart-type-cms_list w-dyn-items" role="list">
                    {apartmentTypes.map((apartment) => (
                      <div
                        key={apartment.id}
                        className="apart-type-cms_list_item w-dyn-item"
                        data-reveal-first=""
                        data-slider="slide"
                        role="listitem"
                      >
                        <div className="apart-type-slide">
                          <div className="apart-type-slide_t b-desk"></div>
                          <div className="apart-type-slide_c">
                            <div className="grid _8-columns">
                              <div className="apart-type-slide_data">
                                <div className="data-list">
                                  <div className="data-item">
                                    <h4
                                      className="l1 reg"
                                      data-scroll-reveal="p"
                                      data-slider="p"
                                    >
                                      Bedrooms
                                    </h4>
                                    <div className="u-8"></div>
                                    <h5
                                      className="h5"
                                      data-scroll-reveal="p"
                                      data-slider="p"
                                    >
                                      {apartment.bedrooms}
                                    </h5>
                                  </div>
                                  <div className="data-item">
                                    <h4
                                      className="l1 reg"
                                      data-scroll-reveal="p"
                                      data-slider="p"
                                    >
                                      Area up to
                                    </h4>
                                    <div className="u-8"></div>
                                    <h5
                                      className="h5"
                                      data-scroll-reveal="p"
                                      data-slider="p"
                                    >
                                      {apartment.area}
                                    </h5>
                                  </div>
                                </div>
                                <div className="u-48 b-mob"></div>
                              </div>
                              <div className="apart-type-slide_desc">
                                <p
                                  className="p1 mob_a-center"
                                  data-scroll-reveal="p"
                                  data-slider="p"
                                >
                                  {apartmentDescriptions[apartment.id]}
                                </p>
                                <div className="u-24"></div>
                                <div
                                  className="apart-type-slide_btn"
                                  data-scroll-reveal="ctn"
                                  data-slider="ctn"
                                >
                                  <a
                                    aria-label={apartmentButtonLabels[apartment.id]}
                                    className="btn w-inline-block"
                                    data-wf--btn--variant="sec"
                                    hover-btn=""
                                    hover-nav-item=""
                                    href={apartment.href}
                                  >
                                    <div className="btn_label">
                                      <div className="btn_label_text">
                                        <div className="l1" hover="text">
                                          {apartmentButtonLabels[apartment.id]}
                                        </div>
                                      </div>
                                      <div className="btn_label_text is-2">
                                        <div className="l1" hover="text">
                                          {apartmentButtonLabels[apartment.id]}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="btn_bg">
                                      <div className="btn_bg_fill" hover="bg"></div>
                                    </div>
                                  </a>
                                </div>
                                <div className="u-16 b-mob"></div>
                              </div>
                            </div>
                          </div>
                          <div className="apart-type-slide_b">
                            <div className="u-48 b-desk"></div>
                            <h3
                              className="h2 a-center"
                              data-scroll-reveal="h"
                              data-slider="h"
                            >
                              {apartment.title}
                            </h3>
                            <div className="u-32 b-mob"></div>
                          </div>
                          <div className="apart-type-slide_img-w">
                            <div className="apart-type-slide_img">
                              <div
                                className="img-w"
                                data-scroll-reveal="slide"
                                data-slider="img"
                              >
                                <img
                                  alt={apartment.image.alt}
                                  className="img"
                                  loading="eager"
                                  src={apartment.image.src}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="u-16"></div>
                <div className="pag" data-scroll-reveal="ctn" data-slider="pag">
                  <div className="pag_prev" data-slider="prev">
                    <div className="ico-16">
                      <div className="ico w-embed">
                        <ChevronLeftIcon height="100%" width="100%" />
                      </div>
                    </div>
                    <div className="pag_prev_label">
                      <div className="l1" data-slider="current">
                        00
                      </div>
                    </div>
                  </div>
                  <div className="pag_progress">
                    <div className="pag_progress_fill" data-slider="progress"></div>
                  </div>
                  <div className="pag_next" data-slider="next">
                    <div className="pag_prev_label">
                      <div className="l1" data-slider="next-num">
                        00
                      </div>
                    </div>
                    <div className="ico-16">
                      <div className="ico w-embed">
                        <ChevronRightIcon height="100%" width="100%" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="u-48"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
