import { BrandMark } from "@/components/era/BrandMark";

export function ResidenceRange() {
  return (
    <section className="section overflow-clip theme_on-brand" data-bg="light">
      <div className="container">
        <div className="apart-info-w" data-video-playpause="">
          <div className="apart-info-s">
            <div className="h-(--_units---u-48) flex-none"></div>
            <div className="divider">
              <div className="bg-(--_colors---base-1000--primary) w-[0.75px] h-full" data-scroll-reveal="line"></div>
            </div>
            <div className="h-(--_units---u-48) flex-none"></div>
            <div className="grid">
              <div className="s_title">
                <p className="l1 text-center" data-scroll-reveal="p">
                  A place to live — to return year after year
                </p>
              </div>
            </div>
            <div className="h-(--_units---u-160) flex-none"></div>
            <div className="grid">
              <div className="info-s_lead">
                <h3 className="h4 text-center" data-scroll-reveal="p">
                  Residences range from 104 to 244 sq.m., offering spacious
                  single level and duplex layouts with generous terraces and
                  rooftop solariums.
                </h3>
              </div>
            </div>
            <div className="h-(--_units---u-160) flex-none"></div>
            <div className="grid">
              <div className="info-s_desc">
                <p className="p1 text-center" data-scroll-reveal="p"></p>
                <div className="h-(--_units---u-32)"></div>
                <div className="s_logo">
                  <div className="logo_symbol ico-48" data-scroll-reveal="ctn">
                    <div className="logo w-embed">
                      <BrandMark height="100%" width="100%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-(--_units---u-48) flex-none"></div>
          </div>
          <div className="flower apart-info" data-parallax="ctn-down">
            <video
              className="video"
              {...{
                "webkit-playsinline": "webkit-playsinline",
              }}
              disablePictureInPicture
              loop
              muted
              playsInline
              poster="/assets/img/6a4afbe98eb07b9ca5b07e84_bougainvillea-flowers_04.avif"
            >
              <source
                src="/assets/video/bougainvillea-flowers_04.webm"
                type="video/webm"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
