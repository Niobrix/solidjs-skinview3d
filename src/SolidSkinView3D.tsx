import { SkinViewer, WalkingAnimation } from 'skinview3d';
import { Component, createEffect, createSignal, onCleanup, onMount } from 'solid-js';

import styles from './SolidSkinView3D.module.css';
import { SolidSkinView3DProps } from './types';

/**
 * Component for displaying 3D Minecraft skin model
 * Based on skinview3d library
 */
const SolidSkinView3D: Component<SolidSkinView3DProps> = (props) => {
  const [viewer, setViewer] = createSignal<SkinViewer | null>(null);
  const [isLoading, setIsLoading] = createSignal(true);
  let canvasRef: HTMLCanvasElement | undefined;
  let animationId: number | null = null;
  let animation: WalkingAnimation | null = null;

  onMount(() => {
    if (!canvasRef) return;

    const skinViewerOptions: any = {
      canvas: canvasRef,
      alpha: true,
      width: props.width || 300,
      height: props.height || 400,
      fov: props.fov || 70,
    };

    if (props.background) {
      skinViewerOptions.background = props.background;
    }

    const skinViewer = new SkinViewer(skinViewerOptions);
    setViewer(skinViewer);

    const orbitControls = skinViewer.controls;
    orbitControls.enableRotate = true;
    orbitControls.enableZoom = true;
    orbitControls.enablePan = false;

    if (props.zoom !== undefined) {
      skinViewer.camera.position.z = props.zoom;
    }

    if (props.autoRotate) {
      const rotateSpeed = props.rotateSpeed || 0.005;

      const animate = () => {
        skinViewer.playerObject.rotation.y += rotateSpeed;
        animationId = requestAnimationFrame(animate);
      };

      animate();
    }

    const handleSkinLoaded = () => {
      setIsLoading(false);
      if (props.onSkinLoaded) {
        props.onSkinLoaded();
      }
    };

    const handleSkinError = (error: Error) => {
      setIsLoading(false);
      if (props.onSkinError) {
        props.onSkinError(error);
      }
    };

    if (props.skinUrl) {
      setIsLoading(true);

      // Properly handle the ears parameter for skinview3d
      const skinOptions: { ears?: boolean } = {};
      if (typeof props.ears === 'boolean') {
        skinOptions.ears = props.ears;
      } else if (props.ears) {
        // If ears is an object, first load skin, then load ears separately
        skinOptions.ears = false;
      }

      skinViewer
        .loadSkin(props.skinUrl, skinOptions)
        .then(() => {
          // If ears is an object with source, load ears separately
          if (props.ears && typeof props.ears !== 'boolean') {
            skinViewer.loadEars(props.ears.source, { textureType: props.ears.textureType });
          }
          handleSkinLoaded();
        })
        .catch(handleSkinError);
    } else {
      setIsLoading(false);
    }

    if (props.capeUrl) {
      skinViewer.loadCape(props.capeUrl, {
        backEquipment: props.backEquipment || 'cape'
      });
    }

    animation = new WalkingAnimation();
    skinViewer.animation = animation;

    if (props.onReady) {
      props.onReady(skinViewer);
    }

    const handleResize = () => {
      if (props.autoResize) {
        const parent = canvasRef.parentElement;
        if (parent) {
          skinViewer.setSize(parent.clientWidth, parent.clientHeight);
        }
      }
    };

    if (props.autoResize) {
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    onCleanup(() => {
      if (props.autoResize) {
        window.removeEventListener('resize', handleResize);
      }

      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }

      if (viewer()) {
        viewer()?.dispose();
      }
    });
  });

  // Update skin when URL changes
  createEffect(() => {
    const currentViewer = viewer();
    if (currentViewer && props.skinUrl) {
      setIsLoading(true);

      // Properly handle the ears parameter for skinview3d
      const skinOptions: { ears?: boolean } = {};
      if (typeof props.ears === 'boolean') {
        skinOptions.ears = props.ears;
      } else if (props.ears) {
        // If ears is an object, first load skin, then load ears separately
        skinOptions.ears = false;
      }

      currentViewer
        .loadSkin(props.skinUrl, skinOptions)
        .then(() => {
          // If ears is an object with source, load ears separately
          if (props.ears && typeof props.ears !== 'boolean') {
            currentViewer.loadEars(props.ears.source, { textureType: props.ears.textureType });
          }

          setIsLoading(false);
          if (props.onSkinLoaded) {
            props.onSkinLoaded();
          }
        })
        .catch((error: Error) => {
          setIsLoading(false);
          if (props.onSkinError) {
            props.onSkinError(error);
          }
        });
    }
  });

  createEffect(() => {
    const currentViewer = viewer();
    if (currentViewer && props.capeUrl !== undefined) {
      if (props.capeUrl) {
        currentViewer.loadCape(props.capeUrl, {
          backEquipment: props.backEquipment || 'cape'
        });
      } else {
        currentViewer.loadCape(null);
      }
    }
  });

  createEffect(() => {
    const currentViewer = viewer();
    if (currentViewer && props.backEquipment && props.capeUrl) {
      currentViewer.loadCape(props.capeUrl, {
        backEquipment: props.backEquipment
      });
    }
  });

  createEffect(() => {
    const currentViewer = viewer();
    if (currentViewer && (props.width || props.height)) {
      currentViewer.setSize(
        props.width || currentViewer.width,
        props.height || currentViewer.height
      );
    }
  });

  createEffect(() => {
    const currentViewer = viewer();
    if (currentViewer && props.background !== undefined) {
      currentViewer.background = props.background;
    }
  });

  createEffect(() => {
    const currentViewer = viewer();
    if (currentViewer && props.zoom !== undefined) {
      currentViewer.camera.position.z = props.zoom;
    }
  });

  createEffect(() => {
    const currentViewer = viewer();
    if (currentViewer && props.fov !== undefined) {
      currentViewer.fov = props.fov;
    }
  });

  createEffect(() => {
    if (props.autoRotate) {
      if (animationId === null && viewer()) {
        const rotateSpeed = props.rotateSpeed || 0.005;

        const animate = () => {
          const currentViewer = viewer();
          if (currentViewer) {
            currentViewer.playerObject.rotation.y += rotateSpeed;
          }
          animationId = requestAnimationFrame(animate);
        };
        animate();
      }
    } else if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });

  return (
    <div class={styles.container}>
      <div class={styles.wrapper}>
        <canvas ref={canvasRef} class={`${styles.canvas} ${props.className || ''}`} />
        {props.showLoader !== false && isLoading() && (
          <div class={styles.loader}>
            <div class={styles.spinner} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SolidSkinView3D;
