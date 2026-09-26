import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/era/Icons";
import { featureSlides } from "@/lib/era/content";

export function BenefitsShowcase() {
  return (
    <section
      className="section z-2 theme_on-brand"
      data-bg="light"
      data-snap=""
    >
      <div className="container">
        <div className="benefits-w">
          <div className="benefits-s">
            <div className="grid fill">
              <div className="benefits-s_cms" data-slider="">
                <div className="benefits-s_cms_pag">
                  <div className="u-48"></div>
                  <div className="u-16"></div>
                  <div className="benefit-slide_img"></div>
                  <div className="u-16"></div>
                  <div
                    className="pag"
                    data-scroll-reveal="ctn"
                    data-slider="pag"
                  >
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
                      <div
                        className="pag_progress_fill"
                        data-slider="progress"
                      ></div>
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
                <div className="benefits-cms w-dyn-list">
                  <div className="benefits-cms_list w-dyn-items" role="list">
                    {featureSlides.map((slide) => (
                      <div
                        className="benefits-cms_list_item w-dyn-item"
                        data-reveal-first=""
                        data-slider="slide"
                        key={slide.id}
                        role="listitem"
                      >
                        <div className="benefit-slide">
                          <div className="benefit-slide_t">
                            <div className="u-48 b-desk"></div>
                            <div className="u-272 b-mob"></div>
                            <h3
                              className="h1 text-center b-desk"
                              data-scroll-reveal="h"
                              data-slider="h"
                            >
                              {slide.title}
                            </h3>
                            <div
                              className="h2 text-center b-mob"
                              data-scroll-reveal="h"
                              data-slider="h"
                            >
                              {slide.title}
                            </div>
                            <div className="u-48"></div>
                          </div>
                          <div className="benefit-slide_c">
                            <div className="u-16"></div>
                            <div className="benefit-slide_img">
                              <div
                                className="img-w"
                                data-scroll-reveal="slide"
                                data-slider="img"
                              >
                                <img
                                  alt={slide.image.alt}
                                  className="img"
                                  loading="eager"
                                  src={slide.image.src}
                                />
                              </div>
                            </div>
                            <div className="u-16"></div>
                          </div>
                          <div className="benefit-slide_b">
                            <div className="u-48"></div>
                            <div className="grid _8-columns">
                              <div className="benefit-slide_desc">
                                <p
                                  className="p1 text-center"
                                  data-scroll-reveal="p"
                                  data-slider="p"
                                >
                                  {slide.description}
                                </p>
                              </div>
                            </div>
                            <div className="u-48"></div>
                            <div className="grid _8-columns">
                              <div className="benefit-slide_cap">
                                <p
                                  className="l1 text-center"
                                  data-scroll-reveal="p"
                                  data-slider="p"
                                >
                                  {slide.caption}
                                </p>
                              </div>
                            </div>
                            <div className="u-48"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
