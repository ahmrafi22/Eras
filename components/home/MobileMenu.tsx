import Link from "next/link";
import { BrandMark } from "@/components/era/BrandMark";

function Brand() {
  return (
    <div className="logo w-embed">
      <BrandMark
        aria-hidden={undefined}
        height="100%"
        width="100%"
      />
    </div>
  );
}

export function MobileMenu() {
  return (
    <div className="modal menu theme_on-dark" data-modal-menu="mob">
      <div className="modal_c">
        <div className="modal_menu" data-modal-container="">
          <div className="modal_menu_t">
            <div className="u-48 b-desk"></div>
            <div className="u-272 b-mob"></div>
            <div className="grid">
              <div className="modal_menu_title">
                <div className="modal_menu_a">
                  <div className="a1 text-center" data-part="a">
                    The
                  </div>
                </div>
                <div className="h1 text-center" data-part="h">
                  Menu
                </div>
              </div>
            </div>
          </div>
          <div className="modal_menu_c">
            <div className="grid">
              <div className="modal_menu_list">
                <Link
                  aria-current="page"
                  aria-label="Home"
                  className="link w-inline-block w--current"
                  data-modal-close="mob"
                  data-part="ctn"
                  hover-link=""
                  href="/"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div className="h6" hover="text">
                        Home
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div className="h6" hover="text">
                        Home
                      </div>
                    </div>
                  </div>
                </Link>
                <a
                  aria-label="Select an Apartment"
                  className="link w-inline-block"
                  data-modal-close="mob"
                  data-part="ctn"
                  hover-link=""
                  href="/apartments"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div className="h6" hover="text">
                        Select an Apartment
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div className="h6" hover="text">
                        Select an Apartment
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  aria-label="Book a call"
                  className="link w-inline-block"
                  data-modal-close="mob"
                  data-modal-cta-btn="book-a-call"
                  data-part="ctn"
                  hover-link=""
                  href="#"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div className="h6" hover="text">
                        Book a call
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div className="h6" hover="text">
                        Book a call
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  aria-label="Contact"
                  className="link w-inline-block"
                  data-modal-close="mob"
                  data-part="ctn"
                  hover-link=""
                  href="/contact"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div className="h6" hover="text">
                        Contact
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div className="h6" hover="text">
                        Contact
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="modal_menu_b">
            <div className="s_logo">
              <div className="logo_symbol ico-48" data-part="ctn">
                <Brand />
              </div>
            </div>
            <div className="u-48"></div>
          </div>
        </div>
      </div>
      <div className="modal_bg" data-modal-close="" data-modal-over=""></div>
    </div>
  );
}
