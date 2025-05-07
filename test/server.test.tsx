import { describe, expect, it } from 'vitest'
import { isServer, renderToString } from 'solid-js/web'
import { SolidSkinView3D } from '../src'

describe('environment', () => {
  it('runs on server', () => {
    expect(typeof window).toBe('undefined')
    expect(isServer).toBe(true)
  })
})

describe('SolidSkinView3D', () => {
  it('renders on server', () => {
    const string = renderToString(() => <SolidSkinView3D />)
    expect(string).toContain('div')
    expect(string).toContain('canvas')
  })

  it('renders with props on server', () => {
    const string = renderToString(() =>
      <SolidSkinView3D
        skinUrl="test-skin.png"
        capeUrl="test-cape.png"
        width={400}
        height={600}
      />
    )
    expect(string).toContain('div')
    expect(string).toContain('canvas')
  })

  it('renders with advanced props on server', () => {
    const string = renderToString(() =>
      <SolidSkinView3D
        skinUrl="test-skin.png"
        capeUrl="test-cape.png"
        backEquipment="elytra"
        showLoader={true}
        className="custom-class"
        autoRotate={true}
        rotateSpeed={0.01}
        background="#1a1a1a"
      />
    )
    expect(string).toContain('div')
    expect(string).toContain('canvas')
    expect(string).toContain('custom-class')
  })

  it('renders with ears options on server', () => {
    const string = renderToString(() =>
      <SolidSkinView3D
        skinUrl="test-skin.png"
        ears={{
          textureType: 'standalone',
          source: 'test-ears.png'
        }}
      />
    )
    expect(string).toContain('div')
    expect(string).toContain('canvas')
  })
})
