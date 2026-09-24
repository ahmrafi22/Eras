import { PlusIcon } from "@/components/era/Icons";
import { projectDetails } from "@/lib/era/content";

export function ProjectDetails() {
  return (
    <section className="section clip" data-bg="light">
      <div className="container">
        <div className="other-w" data-video-playpause="">
          <div className="other-s">
            <div className="u-48"></div>
            <div className="grid">
              <div className="s_title">
                <p className="l1 a-center" data-scroll-reveal="p">
                  A place to live — to return year after year
                </p>
              </div>
            </div>
            <div className="u-48"></div>
            <div className="divider">
              <div className="line-v" data-scroll-reveal="line"></div>
            </div>
            <div className="u-64"></div>
            <div className="grid">
              <div className="other-s_cms">
                <div className="other-cms w-dyn-list">
                  <div className="other-cms_list w-dyn-items" role="list">
                    {projectDetails.map((detail) => (
                      <div
                        className="other-cms_list_item w-dyn-item"
                        key={detail.id}
                        role="listitem"
                      >
                        <div className="other-card" data-accordion-card="">
                          <div className="other-card_name">
                            <div className="other-card_name_label">
                              <h4
                                className="h3 a-center"
                                data-scroll-reveal="h"
                              >
                                {detail.label}
                              </h4>
                              <div
                                className="other-card_ico"
                                data-ico-plus=""
                                data-scroll-reveal="ctn"
                              >
                                <div className="ico-16">
                                  <div className="ico w-embed">
                                    <PlusIcon
                                      height="100%"
                                      width="100%"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="other-card_info"
                            data-accordion-card="content"
                          >
                            <div className="u-32"></div>
                            <div className="grid _6-columns">
                              <div className="other-card_info_desc">
                                {detail.id === "sales-marketing" ? (
                                  <>
                                    <div
                                      className="other-card_info_logo"
                                      data-accordion-card="ctn"
                                    >
                                      <img
                                        alt=""
                                        className="logo b"
                                        loading="eager"
                                        src="assets/img/6a1577b00ac578734e61941e_Unreal logo.svg"
                                      />
                                    </div>
                                    <div className="u-32"></div>
                                  </>
                                ) : null}
                                <p
                                  className="p1 a-center"
                                  data-accordion-card="p"
                                >
                                  {detail.content}
                                </p>
                                <div className="u-32"></div>
                                <div
                                  className="info_divider"
                                  data-accordion-card="ctn"
                                >
                                  <div className="line-h"></div>
                                </div>
                                <div className="u-48"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="u-160"></div>
          </div>
          <div className="flower other" data-parallax="ctn-down">
            <video
              className="video"
              {...{
                "webkit-playsinline": "webkit-playsinline",
              }}
              disablePictureInPicture
              loop
              muted
              playsInline
              poster="assets/img/6a4afbe9f3a19844a4b0caf0_bougainvillea-flowers_07.avif"
            >
              <source
                src="assets/video/bougainvillea-flowers_07.webm"
                type="video/webm"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
