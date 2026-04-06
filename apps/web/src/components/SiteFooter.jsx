export function SiteFooter() {
  return (
    <footer className="oui-footer">
      <div className="oui-container oui-footer-top">
        <div className="oui-footer-brand">
          <span className="oui-logo oui-logo--lg">
            Order<span className="oui-logo-accent">.uk</span>
          </span>
          <div className="oui-store-badges oui-store-badges--sm">
            <span className="oui-badge-store">App Store</span>
            <span className="oui-badge-store oui-badge-store--play">Google Play</span>
          </div>
          <div className="oui-social" aria-label="Social">
            <a href="#">FB</a>
            <a href="#">IG</a>
            <a href="#">TT</a>
            <a href="#">SC</a>
          </div>
        </div>
        <div className="oui-newsletter">
          <p>Get Exclusive Deals in your Inbox</p>
          <form className="oui-news-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" aria-label="Email" />
            <button type="submit" className="oui-btn-primary">
              Subscribe
            </button>
          </form>
        </div>
        <div className="oui-footer-links">
          <div>
            <strong>Legal Pages</strong>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
          </div>
          <div>
            <strong>Important Links</strong>
            <a href="#">Careers</a>
            <a href="#">Support</a>
          </div>
        </div>
      </div>
      <div className="oui-footer-bar">
        <div className="oui-container oui-footer-bar-inner">
          <span>© {new Date().getFullYear()} Order.uk. All rights reserved.</span>
          <div className="oui-footer-mini">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Pricing</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
