import { contact } from '../data/content'
import './Contact.css'

export default function Contact() {
  return (
    <section id="contacto" className="contact">
      <div className="container contact__row">
        <div className="contact__intro">
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2>{contact.title}</h2>
        </div>

        <div className="contact__cards">
          <div className="contact__card">
            <p className="contact__card-label">Coordinación</p>
            <p className="contact__card-value">{contact.coordinator}</p>
            <a className="contact__card-link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>

          <div className="contact__card">
            <p className="contact__card-label">Twitter / X</p>
            <a className="contact__card-value contact__card-link" href={contact.twitter.href} target="_blank" rel="noreferrer">
              {contact.twitter.handle}
            </a>
          </div>

          <div className="contact__card">
            <p className="contact__card-label">Enlaces de interés</p>
            <ul className="contact__links">
              {contact.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
