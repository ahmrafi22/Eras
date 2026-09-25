import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/era/Icons";
import { interiorGallery } from "@/lib/era/content";

export function Interiors() {
  return (
    <section className="section arch clip">
      <div className="container">
        <div className="interior-w">
          <div className="interior-s">
            <div className="u-272"></div>
            <div className="grid">
              <div className="interior-s_title">
                <h2 className="h1 a-center" data-scroll-reveal="h">
                  The
                  <br />
                  space
                  <br />
                  to
                </h2>
                <div className="interior-s_title_a">
                  <h3 className="a1 a-center" data-scroll-reveal="a">
                    Live in
                  </h3>
                </div>
              </div>
            </div>
            <div className="interior-s_imgs">
              <div
                className="interior-s_l"
                data-mob="off"
                data-parallax="ctn-down"
              >
                <div className="u-272"></div>
                <div className="grid _5-columns">
                  <div className="interior-s_l_img-w" data-video-playpause="">
                    <div className="interior-s_l_img">
                      <div className="img-w" data-scroll-reveal="slide">
                        <img
                          alt="Outdoor seating with modern chair, ottoman, table, and orange drink in a garden with pink flowers."
                          className="img"
                          loading="lazy"
                          src="/assets/img/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2.webp"
                        />
                      </div>
                    </div>
                    <div className="flower interior" data-parallax="ctn-up">
                      <video
                        className="video"
                        {...{
                          "webkit-playsinline": "webkit-playsinline",
                        }}
                        disablePictureInPicture
                        loop
                        muted
                        playsInline
                        poster="/assets/img/6a4afbe968be0cc0c1f5fef2_bougainvillea-flowers_06.avif"
                      >
                        <source
                          src="/assets/video/bougainvillea-flowers_06.webm"
                          type="video/webm"
                        />
                      </video>
                    </div>
                  </div>
                  <div className="interior-s_l_desc">
                    <div className="u-16"></div>
                    <h4 className="l1" data-scroll-reveal="p">
                      Optional upgrades are available: <br />• Private
                      jacuzzi <br />• EV charging point installation <br />•
                      Photovoltaic panels
                    </h4>
                    <div className="u-160 b-mob"></div>
                  </div>
                </div>
              </div>
              <div
                className="interior-s_r"
                data-mob="off"
                data-parallax="ctn-up"
              >
                <div className="grid _5-columns">
                  <div className="interior-s_r_img">
                    <div className="img-w" data-scroll-reveal="slide">
                      <img
                        alt="Sunlit terrace with cushioned seating, wooden tables, plants, flowering vine canopy, and ocean in the distance."
                        className="img"
                        loading="lazy"
                        src="/assets/img/6a15723f346e4b3a6c0af26a_era-residence-terrace.webp"
                      />
                    </div>
                  </div>
                  <div className="interior-s_r_lead w-clearfix">
                    <div className="u-16"></div>
                    <div className="red-line"></div>
                    <h4 className="h5" data-scroll-reveal="p">
                      Every detail was selected to create homes that feel
                      elegant, intuitive and effortless to live in
                    </h4>
                  </div>
                  <div className="interior-s_r_desc">
                    <div className="u-64"></div>
                    <p className="p1" data-scroll-reveal="p">
                      Underfloor heating throughout the property. Climate
                      automation systems. Smart lock access systems. Electrically
                      adjustable aluminium shutters. Schneider Electric DLIFE
                      switches and mechanisms .
                    </p>
                    <div className="u-96"></div>
                  </div>
                  <div className="interior-s_r_btn" data-scroll-reveal="ctn">
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
            <div className="u-272"></div>
            <div className="grid">
              <div className="interior-s_gallery-cms" data-slider="">
                <div className="gallery-cms w-dyn-list">
                  <div className="gallery-cms_list w-dyn-items" role="list">
                    {interiorGallery.map((image) => (
                      <div
                        className="gallery-cms_list_item w-dyn-item"
                        data-reveal-first=""
                        data-slider="slide"
                        key={image.id}
                        role="listitem"
                      >
                        <div className="gallery-slide">
                          <div
                            className="img-w"
                            data-scroll-reveal="slide"
                            data-slider="img"
                          >
                            <img
                              alt={image.alt}
                              className="img"
                              loading="lazy"
                              src={image.src}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="u-16"></div>
                <div className="interior-s_gallery-cms_pag">
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
              </div>
            </div>
            <div className="u-96"></div>
          </div>
          <div className="interior_themes">
            <div className="interior_themes_light-1" data-bg="light"></div>
            <div className="themes_row">
              <div className="interior_themes_dark-2" data-bg="dark"></div>
              <div className="interior_themes_light-2" data-bg="light"></div>
            </div>
            <div className="interior_themes_light-3" data-bg="light"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
