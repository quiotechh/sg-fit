export const communityGoldGradient =
  "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)";

const AVATAR_GRADIENTS = [
  communityGoldGradient,
  "linear-gradient(135deg, #6c8ebf, #a8c4e0)",
  "linear-gradient(135deg, #7cb87c, #b8d8b8)",
  "linear-gradient(135deg, #bf6c8e, #e0a8c4)",
  "linear-gradient(135deg, #8e6cbf, #c4a8e0)",
];

// Deterministic pick so the same user always gets the same fallback color —
// no extra DB field needed, just hash the id into the palette.
export function getAvatarGradient(userId: string) {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash * 31 + userId.charCodeAt(i)) >>> 0;
  }
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];
}
