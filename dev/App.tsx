import { Component, createSignal } from 'solid-js'
import styles from './App.module.css'
import SolidSkinView3D from 'src'

import skin from './skin.png'
import cape from './cape.png'

const App: Component = () => {
  const [skinUrl, setSkinUrl] = createSignal<string>(skin)
  const [capeUrl, setCapeUrl] = createSignal<string>(cape)

  const [isElytra, setIsElytra] = createSignal<boolean>(false)
  const [autoRotate, setAutoRotate] = createSignal<boolean>(true)

  const handleToggleEquipment = () => {
    setIsElytra(!isElytra())
  }

  const handleToggleRotation = () => {
    setAutoRotate(!autoRotate())
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>SolidSkinView3D Demo</h1>
        <div class={styles.viewerContainer}>
          <SolidSkinView3D
            width={300}
            height={400}
            skinUrl={skinUrl()}
            capeUrl={capeUrl()}
            backEquipment={isElytra() ? 'elytra' : 'cape'}
            autoRotate={autoRotate()}
            rotateSpeed={0.005}
            zoom={0.9}
            fov={70}
            showLoader={true}
          />
        </div>
        <div class={styles.controls}>
          <button onClick={handleToggleEquipment}>
            {isElytra() ? 'Show Cape' : 'Show Elytra'}
          </button>
          <button onClick={handleToggleRotation}>
            {autoRotate() ? 'Stop Rotation' : 'Enable Rotation'}
          </button>
        </div>
        <p>
          Example of using <code>SolidSkinView3D</code> component for displaying Minecraft skins.
        </p>
      </header>
    </div>
  )
}

export default App
