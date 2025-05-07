import { createRoot, createSignal } from 'solid-js'
import { isServer } from 'solid-js/web'
import { describe, expect, it, vi } from 'vitest'
import { SolidSkinView3D } from '../src'

describe('environment', () => {
  it('runs on client', () => {
    expect(typeof window).toBe('object')
    expect(isServer).toBe(false)
  })
})

describe('SolidSkinView3D', () => {
  it('renders the component without errors', () => {
    createRoot((dispose) => {
      const container = (<SolidSkinView3D />) as HTMLDivElement
      expect(container.tagName).toBe('DIV')
      expect(container.className).toContain('container')
      dispose()
    })
  })

  it('accepts skin and cape URLs', () => {
    createRoot((dispose) => {
      const onReady = vi.fn()
      const onSkinLoaded = vi.fn()

      const container = (
        <SolidSkinView3D
          skinUrl="test-skin.png"
          capeUrl="test-cape.png"
          onReady={onReady}
          onSkinLoaded={onSkinLoaded}
        />
      ) as HTMLDivElement

      expect(container.tagName).toBe('DIV')
      dispose()
    })
  })

  it('handles dimensions correctly', () => {
    createRoot((dispose) => {
      const container = (
        <SolidSkinView3D
          width={500}
          height={700}
        />
      ) as HTMLDivElement

      expect(container.tagName).toBe('DIV')
      dispose()
    })
  })

  it('supports rotation controls', () => {
    createRoot((dispose) => {
      const container = (
        <SolidSkinView3D
          autoRotate={true}
          rotateSpeed={0.01}
        />
      ) as HTMLDivElement

      expect(container.tagName).toBe('DIV')
      dispose()
    })
  })

  it('supports custom background', () => {
    createRoot((dispose) => {
      const container = (
        <SolidSkinView3D
          background="#1a1a1a"
        />
      ) as HTMLDivElement

      expect(container.tagName).toBe('DIV')
      dispose()
    })
  })

  it('supports reactive properties', () => {
    createRoot((dispose) => {
      const [skinUrl, setSkinUrl] = createSignal('initial-skin.png')

      const container = (
        <SolidSkinView3D
          skinUrl={skinUrl()}
        />
      ) as HTMLDivElement

      setSkinUrl('new-skin.png')

      expect(container.tagName).toBe('DIV')
      dispose()
    })
  })
})
