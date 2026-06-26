import { tools } from "@/lib/content";

export default function Tools() {
  return (
    <section className="section tools-section" id="tools">
      <p className="tools-label">{tools.label}</p>
      <div className="tools-grid">
        {tools.items.map((tool, idx) => (
          <div key={idx} className="tool-cell">
            <span>{tool}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
