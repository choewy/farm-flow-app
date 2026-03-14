import { InfoNote } from '@app/shared/ui/InfoNote';

export function RoleFooter() {
  return (
    <InfoNote>
      * &quot;관리자&quot;와 &quot;기본&quot;은 시스템 필수 역할입니다. <br />* 시스템 필수 역할은 삭제할 수 없습니다.
    </InfoNote>
  );
}
