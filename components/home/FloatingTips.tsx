import { Decor } from "@/components/era/Decor";

const floatingTips = [
  {
    id: "crafted-to-endure",
    title: "Crafted to Endure",
    body: "Natural stone façades were selected for their timeless appearance, durability and ease of maintenance, allowing the architecture to age beautifully over time",
  },
  {
    id: "light-flow",
    title: "Light & Flow",
    body: "Terraces, rooftop solariums and expansive openings maximize natural light while creating a seamless indoor outdoor lifestyle.",
  },
  {
    id: "your-private-sanctuary",
    title: "Your Private Sanctuary",
    body: "Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard apartment building.",
  },
] as const;

export function FloatingTips() {
  return (
    <div className="floating-tips w-dyn-list">
      <div className="floating-tips_list w-dyn-items" role="list">
        {floatingTips.map((tip) => (
          <div
            className="floating-tip w-dyn-item"
            floating-tip={tip.id}
            key={tip.id}
            role="listitem"
          >
            <div className="floating-tip-card">
              <div className="floating-tip-card_t">
                <h1 className="h5">{tip.title}</h1>
              </div>
              <div className="floating-tip-card_b">
                <p className="p1">{tip.body}</p>
              </div>
              <div className="card_decor">
                <Decor variant="medium" data-wf--decor--variant="med" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
