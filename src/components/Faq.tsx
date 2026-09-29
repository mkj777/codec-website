import { faqItems } from "../content/faq";
import "./components.css";

export function Faq() {
  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <h2 className="faq-heading" id="faq-heading">
        Questions, <span className="features-heading-muted">answered.</span>
      </h2>
      <div className="faq-list">
        {faqItems.map(({ question, answer }) => (
          <article className="faq-item" key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
