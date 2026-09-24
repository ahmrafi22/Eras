import { Decor } from "@/components/era/Decor";

export function CookieNotice() {
  return (
    <div className="cookies" data-cookies="">
      <div className="cookies_c">
        <div className="grid">
          <div
            className="cookies_card"
            id="w-node-a93c3093-e77a-7926-27af-e0a2d9898e16-d9898e13"
          >
            <div className="cookies_card_t">
              <div className="l1 reg b-mob">Cookies</div>
              <div className="cookies_card_title b-desk">
                <div className="a1 a-center">Cookies</div>
              </div>
            </div>
            <div className="cookies_card_b">
              <div className="l1 a-center mob_a-left">
                This website uses cookies to ensure you get the best experience on
                website.
              </div>
              <div className="u-24"></div>
              <div className="cookies_card_btn-list">
                <a
                  aria-label="Accept"
                  className="link w-inline-block"
                  data-cookies="accept"
                  hover-link=""
                  href="#"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div className="h6" hover="text">
                        Accept
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div className="h6" hover="text">
                        Accept
                      </div>
                    </div>
                  </div>
                </a>
                <div className="h6">/</div>
                <a
                  aria-label="Decline"
                  className="link w-inline-block"
                  data-cookies="decline"
                  hover-link=""
                  href="#"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div className="h6" hover="text">
                        Decline
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div className="h6" hover="text">
                        Decline
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="card_decor">
              <Decor variant="medium" data-wf--decor--variant="med" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
