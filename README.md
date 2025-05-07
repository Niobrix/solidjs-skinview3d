<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solidjs-skinview3d&background=tiles&project=%20" alt="solidjs-skinview3d">
</p>

# solidjs-skinview3d

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)     [![NPM Last Update](https://img.shields.io/npm/last-update/%40niobrix%2Fsolidjs-skinview3d?style=for-the-badge&logo=npm&label=NPM&labelColor=cf1515)](https://www.npmjs.com/package/@niobrix/solidjs-skinview3d)


SolidJS wrapper component for [SkinView3D](https://github.com/bs-community/skinview3d), which allows you to easily integrate 3D Minecraft skin preview into your SolidJS application.

## Quick Start

Installation:

```bash
npm i solidjs-skinview3d
# or
yarn add solidjs-skinview3d
# or
pnpm add solidjs-skinview3d
```

Usage:

```tsx
import { SolidSkinView3D } from 'solidjs-skinview3d';

function App() {
  return (
    <div style={{ width: '300px', height: '400px' }}>
      <SolidSkinView3D
        skinUrl="skin.png"
        capeUrl="cape.png"
        width={300}
        height={400}
        autoRotate={true}
      />
    </div>
  );
}
```

## Component Properties

| Property | Type | Default | Description |
|----------|-----|-------------|----------|
| `width` | `number` | `300` | Component width in pixels |
| `height` | `number` | `400` | Component height in pixels |
| `skinUrl` | `string` | - | Minecraft skin URL |
| `capeUrl` | `string` | - | Minecraft cape URL |
| `className` | `string` | - | Additional CSS class for canvas |
| `background` | `string \| THREE.Color \| THREE.Texture` | - | Background for rendering |
| `zoom` | `number` | - | Camera zoom level |
| `fov` | `number` | `70` | Camera field of view in degrees |
| `autoRotate` | `boolean` | `false` | Enable automatic model rotation |
| `rotateSpeed` | `number` | `0.005` | Model rotation speed |
| `autoResize` | `boolean` | `false` | Auto-resize when parent element changes size |
| `showLoader` | `boolean` | `true` | Show loading indicator |
| `onReady` | `(viewer: SkinViewer) => void` | - | Callback after component initialization |
| `onSkinLoaded` | `() => void` | - | Callback after skin is loaded |
| `onSkinError` | `(error: Error) => void` | - | Callback when skin loading fails |
| `ears` | `boolean \| { textureType: 'standalone' \| 'skin', source: string }` | `false` | Enable ears for model |
| `backEquipment` | `'cape' \| 'elytra'` | `'cape'` | Type of back equipment (cape or elytra) |

## Reactivity Example

```tsx
import { createSignal } from 'solid-js';
import { SolidSkinView3D } from 'solidjs-skinview3d';

function App() {
  const [skinUrl, setSkinUrl] = createSignal('URL_to_skin');
  const [capeUrl, setCapeUrl] = createSignal('URL_to_cape');
  const [isElytra, setIsElytra] = createSignal(false);

  return (
    <div>
      <SolidSkinView3D
        skinUrl={skinUrl()}
        capeUrl={capeUrl()}
        backEquipment={isElytra() ? 'elytra' : 'cape'}
        width={300}
        height={400}
      />

      <button onClick={() => setIsElytra(!isElytra())}>
        {isElytra() ? 'Show Cape' : 'Show Elytra'}
      </button>
    </div>
  );
}
```

## Access to skinview3d API

The component provides access to the native skinview3d API through the `onReady` callback:

```tsx
import { SolidSkinView3D } from 'solidjs-skinview3d';
import { SkinViewer, WalkingAnimation } from 'skinview3d';

function App() {
  const handleReady = (viewer: SkinViewer) => {
    // Access to native skinview3d API
    viewer.animation = new WalkingAnimation();
    viewer.animation.speed = 0.8;

    // Adjust lighting
    viewer.globalLight.intensity = 0.7;
    viewer.cameraLight.intensity = 0.3;
  };

  return (
    <SolidSkinView3D
      skinUrl="URL_to_skin"
      onReady={handleReady}
    />
  );
}
```

## License

MIT
