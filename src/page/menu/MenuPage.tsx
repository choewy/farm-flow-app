import { MenuFooter, MenuSection, MenuUserProfile } from '@app/feature/menu';

export function MenuPage() {
  return (
    <div className="flex flex-col space-y-8 p-1">
      <MenuUserProfile />
      <MenuSection />
      <MenuFooter />
    </div>
  );
}
