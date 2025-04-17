// Common interface types for the application

// Navigation Link type
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// Color Block type
export interface ColorBlockType {
  name: string;
  color: string;
  hexCode: string;
}

// Brand Guidelines Section type
export interface GuidelineSection {
  title: string;
  description: string;
  icon: string;
  color?: string;
  link?: string;
}

// Product type
export interface Product {
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

// Animation controls
export interface AnimationControl {
  visible: boolean;
  onScreen: boolean;
}

// Resource type
export interface Resource {
  title: string;
  description: string;
  image: string;
  link: string;
}
