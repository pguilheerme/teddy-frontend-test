import type { CSSProperties, ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  style: CSSProperties;
}

export default function PageContainer({ children, style }: PageContainerProps) {
  return (
    <div style={style} className="page-container">
      {children}
    </div>
  );
}
