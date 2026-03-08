import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';

export type MenuSectionItemProps = {
  name: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  path: string;
  visible: boolean;
  color: string;
  background: string;
};

export type MenuSectionProps = {
  title: string;
  items: MenuSectionItemProps[];
};
