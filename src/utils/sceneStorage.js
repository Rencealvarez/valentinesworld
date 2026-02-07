const SCENE_KEY = 'valentines-virtual-scene'

export function getSceneData() {
  try {
    const raw = localStorage.getItem(SCENE_KEY)
    const defaultData = { scene: 'park', items: [], messages: [], musicOn: true, photoDataUrl: null }
    return raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData
  } catch {
    return { scene: 'park', items: [], messages: [], musicOn: true, photoDataUrl: null }
  }
}

export function saveSceneData(data) {
  try {
    localStorage.setItem(SCENE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('Could not save scene', e)
  }
}
