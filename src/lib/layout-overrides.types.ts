// Section identifiers — one per editable list, matching the 9 components.
export type SectionId =
  | "nav"
  | "focus"
  | "services"
  | "work"
  | "tools"
  | "stats"
  | "faq"
  | "contact"
  | "footer";

// Stable key for one item inside a section's list. Always a string, always derived
// from a content field that already uniquely identifies the item (never array index).
export type ItemKey = string;

// Generic per-item numeric/space override. Each field is optional — only fields the
// developer has actually changed in the editor are written out, so editing one card's
// offset never clobbers another field's default from content.ts.
export interface ItemSpacingOverride {
  /** Overrides `offsetPx` for Focus cards; horizontal stagger margin-left in px. */
  offsetPx?: number;
  /** Generic gap-after-this-item override, in px, additive on top of the section's
   *  existing Tailwind gap (rendered as inline marginBottom/marginRight). */
  gapAfterPx?: number;
  /** Reserved for future per-item size scaling. Not used by the v1 editor UI. */
  scale?: number;
}

// Special case: Contact's tags are already absolutely positioned (top/left/right/bottom +
// rotate via a literal CSS string in content.ts). The override stores a fully-resolved
// x/y pixel position relative to the Contact section's own bounding box.
export interface TagPositionOverride {
  xPx: number;
  yPx: number;
  /** Optional rotate override; omitted = keep content.ts's tag.rotate. */
  rotateDeg?: number;
}

// One section's override payload: an optional new ORDER (array of ItemKey, full
// permutation of that section's current keys) plus a per-key map of spacing overrides.
export interface SectionOverride {
  order?: ItemKey[];
  items?: Record<ItemKey, ItemSpacingOverride>;
}

// Contact is structurally different (position overrides, not spacing).
export interface ContactSectionOverride {
  order?: ItemKey[];
  items?: Record<ItemKey, TagPositionOverride>;
}

// Top-level shape of layout-overrides.ts's exported data. Every section is optional —
// an empty object `{}` is the valid "no overrides yet" state.
export interface LayoutOverrides {
  nav?: SectionOverride;
  focus?: SectionOverride;
  services?: SectionOverride;
  work?: SectionOverride;
  tools?: SectionOverride;
  stats?: SectionOverride;
  faq?: SectionOverride;
  contact?: ContactSectionOverride;
  footer?: SectionOverride;
}
