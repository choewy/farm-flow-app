import { useState } from 'react';

import { LogoutModal, MenuFooter, MenuSection, MenuUserProfile } from '@app/feature/menu';

export default function MenuPage() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);

  return (
    <div className="app-page">
      <MenuUserProfile />
      <MenuSection openLogoutModal={openLogoutModal} />
      <MenuFooter />
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </div>
  );
}
