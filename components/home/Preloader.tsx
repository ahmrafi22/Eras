import { BrandMark } from "@/components/era/BrandMark";
import { Decor } from "@/components/era/Decor";

export function Preloader() {
  return (
    <>
      <div className="landscape-cover">
        <div className="landscape-cover_img">
          <img
            alt=""
            className="img contain"
            loading="eager"
            src="/assets/img/6a068da7ad91b057365bf974_landscape.svg"
          />
        </div>
        <div className="landscape-cover_bg"></div>
      </div>
      <div className="master-preloader theme_on-dark" data-master-preloader=""></div>
      <div className="preloader theme_on-dark" data-preloader="">
      <div className="preloader_ctn">
        <div className="preloader_t">
          <div className="u-48"></div>
          <div className="s_logo">
            <div className="logo_symbol ico-48" data-part="ctn">
              <div className="logo w-embed">
                <BrandMark
                  aria-hidden={undefined}
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="preloader_c">
          <div className="grid">
            <div className="preloader_title-l">
              <div className="c1 a-center" data-part="h">
                Costa
              </div>
            </div>
            <div className="preloader_logo">
              <div className="h3 a-center" data-part="h">
                Era
                <br />
                Residence
              </div>
              <div className="preloader_logo_a">
                <div className="a2 preloader_a a-center" data-part="a">
                  Estepona
                </div>
              </div>
            </div>
            <div className="preloader_title-r">
              <div className="c1 a-center" data-part="h">
                del Sol
              </div>
            </div>
          </div>
        </div>
        <div className="preloader_b">
          <div className="grid">
            <div className="s_title">
              <div className="preloader_progress" data-part="line">
                <div className="preloader_progress_fill">
                  <div className="preloader_progress_track"></div>
                </div>
              </div>
              <div className="u-32"></div>
              <p className="l1 a-center" data-part="p">
                Era Residence
                <br />A place to return to.
              </p>
            </div>
          </div>
          <div className="u-48"></div>
        </div>
      </div>
      <div className="preloader_bg_arch">
        <div className="preloader_bg_arch_is-1"></div>
        <div className="preloader_bg_arch_is-2"></div>
      </div>
      <div className="preloader_bg">
        <div className="preloader_bg_a">
          <img
            alt=""
            className="img"
            loading="eager"
            src="/assets/img/preloader_bg.svg"
          />
        </div>
        <div className="preloader_bg_decor">
          <Decor data-wf--decor--variant="large" />
        </div>
      </div>
      </div>
    </>
  );
}
