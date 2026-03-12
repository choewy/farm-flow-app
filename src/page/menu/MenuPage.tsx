import { useState } from 'react';

import { LogoutModal, MenuFooter, MenuSection, MenuUserProfile } from '@app/feature/menu';

export function MenuPage() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);

  return (
    <div className="flex flex-col space-y-8 p-1">
      <MenuUserProfile />
      <MenuSection openLogoutModal={openLogoutModal} />
      <MenuFooter />
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </div>
  );
}
