import { footer } from '../data/content'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__row">
        <div className="site-footer__brand">
          <img
            className="site-footer__logo"
            src="/uniandes-medicina.png"
            alt="Universidad de los Andes — Facultad de Medicina"
            width="184"
            height="40"
          />
          <p className="site-footer__faculty">Observatorio de Salud Pública</p>
        </div>

        <div className="site-footer__meta">
          <p>{footer.address}</p>
          <p>{footer.phone}</p>
        </div>

        <div className="site-footer__social">
          {footer.social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container site-footer__legal">
        {footer.legal.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </footer>
  )
}
