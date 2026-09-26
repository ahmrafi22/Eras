import { BrandMark } from "@/components/era/BrandMark";

const legalLinks = [
  {
    label: "Privacy policy",
    href: "https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a1576532e78ed7645599d9b_politica_privacidad_era_residence.pdf",
  },
  {
    label: "Terms of Use",
    href: "https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a1576732e78ed764559c153_terms_of_use_era_residence%20(1).pdf",
  },
] as const;

export function SiteFooter() {
  return (
    <section className="section theme_on-dark" data-bg="dark">
      <div className="container">
        <div className="footer-w">
          <a className="footer-s_s-top w-inline-block" href="#hero">
            <div className="l2">To top</div>
            <div className="s-down_arrow w-embed">
              <svg
                fill="none"
                height="100%"
                viewBox="0 0 48 12"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40.6345 9C40.8959 8.45299 41.1486 7.97436 41.3926 7.56411C41.6541 7.15385 41.9068 6.81197 42.1508 6.53846L2.99981 6.53846L2.99981 5.46154L42.1508 5.46154C41.9068 5.17094 41.6541 4.82051 41.3926 4.41026C41.1486 4 40.8959 3.52992 40.6345 3L41.5495 3C42.6475 4.24787 43.7979 5.17094 45.0005 5.76923L45.0005 6.23077C43.7979 6.81197 42.6475 7.73504 41.5495 9L40.6345 9Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </a>
          <div className="footer-s">
            <div className="footer-s_t"></div>
            <div className="footer-s_c">
              <div className="grid">
                <div className="footer-s_contact">
                  <div className="s_logo">
                    <div className="logo_symbol ico-64" data-text="ctn">
                      <div className="logo w-embed">
                        <BrandMark height="100%" width="100%" />
                      </div>
                    </div>
                  </div>
                  <div className="h-(--_units---u-32)"></div>
                  <div className="contact-cms w-dyn-list">
                    <div className="contact-cms_list w-dyn-items" role="list">
                      <div
                        className="contact-cms_list_item w-dyn-item"
                        role="listitem"
                      >
                        <a
                          className="nav-item w-inline-block"
                          href="tel:+34655408648"
                          target="_blank"
                        >
                          <div className="h2 text-center" data-text="h">
                            +34 (655) 408-648
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="h-(--_units---u-48) flex-none"></div>
                </div>
                <div className="footer-s_address">
                  <div className="loc-cms w-dyn-list">
                    <div className="loc-cms_list w-dyn-items" role="list">
                      <div
                        className="loc-cms_list_item w-dyn-item"
                        data-text="ctn"
                        role="listitem"
                      >
                        <h3 className="l1 reg text-center">Sales Office</h3>
                        <div className="h-(--_units---u-4)"></div>
                        <a
                          aria-label="Avenida Litoral, 29680 Estepona, Málaga, Spain"
                          className="nav-item w-inline-block"
                          hover-nav-item=""
                          href="https://maps.app.goo.gl/EzyfT2M6vR5aBdMu9"
                        >
                          <div className="nav-item_label">
                            <div className="nav-item_label_text">
                              <div className="l1" hover="text">
                                Avenida Litoral, 29680 Estepona, Málaga, Spain
                              </div>
                            </div>
                            <div className="nav-item_label_text is-2">
                              <div className="l1" hover="text">
                                Avenida Litoral, 29680 Estepona, Málaga, Spain
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-s_b">
              <div className="grid">
                <div className="footer-s_info">
                  <div className="l1" data-text="p">
                    Era Residence.
                  </div>
                  <div className="l1 reg no-wrap" data-text="p">
                    ©<span className="year">2026</span> All rights reserved
                  </div>
                  <div className="h-(--_units---u-12)"></div>
                  <div className="legal-cms w-dyn-list" data-text="p">
                    <div
                      className="legal-cms_list w-dyn-items"
                      data-comma-list=""
                      role="list"
                    >
                      {legalLinks.map((link) => (
                        <div
                          className="legal-cms_list_item w-dyn-item"
                          key={link.label}
                          role="listitem"
                        >
                          <a
                            aria-label={link.label}
                            className="nav-item w-inline-block"
                            hover-nav-item=""
                            href={link.href}
                          >
                            <div className="nav-item_label">
                              <div className="nav-item_label_text">
                                <div className="l1" hover="text">
                                  {link.label}
                                </div>
                              </div>
                              <div className="nav-item_label_text is-2">
                                <div className="l1" hover="text">
                                  {link.label}
                                </div>
                              </div>
                            </div>
                          </a>
                          <div className="l1" data-comma="">
                            ,
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="footer-s_credits">
                  <div className="credits" hover-nav-item-trigger="">
                    <a
                      aria-label="The First The Last"
                      className="credits_link w-inline-block"
                      href="https://thefirstthelast.agency/?utm_source=era-residence&amp;utm_medium=article&amp;utm_campaign=promo"
                      target="_blank"
                    ></a>
                    <div
                      className="credits_logo-w"
                      data-scrub-reveal="ctn"
                      data-text="ctn"
                    >
                      <div
                        className="credits_logo"
                        data-json="/assets/data/tftl-logo_white.json"
                      ></div>
                    </div>
                    <div className="h-(--_units---u-12)"></div>
                    <div className="l1 reg text-right flex-1" data-text="p">
                      Made by
                    </div>
                    <div data-text="p">
                      <a
                        aria-label="Thefirstthelast"
                        className="nav-item w-inline-block"
                        hover-nav-item=""
                        href="#"
                      >
                        <div className="nav-item_label">
                          <div className="nav-item_label_text">
                            <div className="l1" hover="text">
                              Thefirstthelast
                            </div>
                          </div>
                          <div className="nav-item_label_text is-2">
                            <div className="l1" hover="text">
                              Thefirstthelast
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-(--_units---u-48) flex-none"></div>
            </div>
          </div>
          <div className="footer-w_bg"></div>
        </div>
      </div>
    </section>
  );
}
