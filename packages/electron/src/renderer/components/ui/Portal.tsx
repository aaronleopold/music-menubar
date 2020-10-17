import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// this file is not my original work, absolutely YOINKED from:
// https://github.com/kesne/HostyHosting/blob/830d92fefdb8c0545bd7b86318b8321f6fd9d3dd/packages/frontend/src/components/ui/util/Portal.tsx

export default function Portal({ children }: { children: React.ReactNode }) {
  const portalRef = useRef<HTMLDivElement | null>(null);

  if (!portalRef.current) {
    portalRef.current = document.createElement("div");
  }

  useEffect(() => {
    document.body.appendChild(portalRef.current!);

    return () => {
      document.body.removeChild(portalRef.current!);
    };
  }, []);

  return createPortal(children, portalRef.current);
}
