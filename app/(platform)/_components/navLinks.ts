/**
 * Single source of truth for the primary navigation, shared by the desktop
 * bar (Navbar) and the mobile menu (MobileMenu) so the two can never drift.
 */
export type NavLink = {
  name: string;
  link: string;
};

export const MENU_LINKS: NavLink[] = [
  { name: 'About', link: '/about' },
  { name: 'Bestsellers', link: '/bestsellers' },
  { name: 'Hit Us Up', link: '/hit-us-up' },
];
