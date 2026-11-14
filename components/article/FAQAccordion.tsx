export default function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <section className="faq" aria-labelledby="faq">
      <h2 id="faq">Frequently Asked Questions</h2>
      {items.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
    </section>
  );
}
