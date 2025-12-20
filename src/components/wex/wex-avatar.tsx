import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/**
 * WexAvatar - WEX Design System Avatar Component
 *
 * Image element with fallback for representing users or entities.
 * Uses namespace pattern: WexAvatar.Image, WexAvatar.Fallback
 *
 * @example
 * <WexAvatar>
 *   <WexAvatar.Image src="/profile.jpg" alt="John Doe" />
 *   <WexAvatar.Fallback>JD</WexAvatar.Fallback>
 * </WexAvatar>
 */

export const WexAvatar = Object.assign(Avatar, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

