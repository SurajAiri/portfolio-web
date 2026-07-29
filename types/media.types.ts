// Shared media model used by both projects and certificates so every
// gallery/lightbox/strip in the app can render off one consistent shape.

export type MediaKind = "image" | "gif" | "video" | "youtube" | "loom";

// What role this piece of media plays — lets a component pick "the one
// thumbnail" or "just diagrams" without extra fields.
export type MediaRole =
  | "thumbnail" // primary image shown on cards/grids
  | "demo" // screen recording / product walkthrough
  | "diagram" // architecture/flow diagrams
  | "screenshot"
  | "other";

export interface MediaItem {
  id: string; // stable id, e.g. "zensho-demo-1"
  kind: MediaKind;
  role: MediaRole;
  src: string; // internal path ("/projects/zensho/demo.gif") OR external URL (YouTube/Loom/CDN)
  poster?: string; // optional poster/thumbnail for video/youtube/loom (enables click-to-load facade).
  // For YouTube, if omitted, the UI derives https://img.youtube.com/vi/<id>/hqdefault.jpg automatically.
  caption?: string;
  order: number; // explicit sort order within the gallery
}
