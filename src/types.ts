import { SkinViewer } from 'skinview3d';
import * as THREE from 'three';

export interface SolidSkinView3DProps {
  /**
   * Component width in pixels
   */
  width?: number;

  /**
   * Component height in pixels
   */
  height?: number;

  /**
   * Minecraft skin URL
   */
  skinUrl?: string;

  /**
   * Minecraft cape URL
   */
  capeUrl?: string;

  /**
   * Additional CSS class for canvas
   */
  className?: string;

  /**
   * Background for rendering (hex color, THREE.Color or THREE.Texture)
   */
  background?: string | THREE.Color | THREE.Texture;

  /**
   * Camera zoom level
   */
  zoom?: number;

  /**
   * Camera field of view in degrees
   */
  fov?: number;

  /**
   * Enable automatic model rotation
   */
  autoRotate?: boolean;

  /**
   * Model rotation speed (only works when autoRotate=true)
   */
  rotateSpeed?: number;

  /**
   * Enable automatic resizing when parent element size changes
   */
  autoResize?: boolean;

  /**
   * Show loading indicator
   */
  showLoader?: boolean;

  /**
   * Callback called after component initialization
   */
  onReady?: (viewer: SkinViewer) => void;

  /**
   * Callback called after skin is loaded
   */
  onSkinLoaded?: () => void;

  /**
   * Callback called when skin loading fails
   */
  onSkinError?: (error: Error) => void;

  /**
   * Enable ears for model
   */
  ears?: boolean | {
    textureType: 'standalone' | 'skin';
    source: string;
  };

  /**
   * Type of back equipment (cape or elytra)
   */
  backEquipment?: 'cape' | 'elytra';
}
