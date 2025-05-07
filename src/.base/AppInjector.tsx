import { createRoot } from "react-dom/client";
import { Block } from "../Block";

let root: any = null;

export const inject = (parentElementId: string, props: any) => {
  const container = document.getElementById(parentElementId);
  if (!container) return;
  
  root = createRoot(container);
  root.render(<Block {...props} />);
};

export const unmount = () => {
  if (root) {
    root.unmount();
    root = null;
  }
};