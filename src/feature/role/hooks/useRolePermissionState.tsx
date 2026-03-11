import { useState } from 'react';

import { PermissionKey } from '@app/shared/models';

export function useRolePermissionState(init: PermissionKey[] = []) {
  const [permissionKeys, setPermissionKeys] = useState<PermissionKey[]>(init);

  const onClickHandler = (permissionKey: PermissionKey) => {
    setPermissionKeys((prev) =>
      prev.includes(permissionKey) ? prev.filter((prevPermissionKey) => prevPermissionKey !== permissionKey) : [...prev, permissionKey],
    );
  };

  return {
    permissionKeys,
    onClickHandler,
  };
}
