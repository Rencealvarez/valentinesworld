const MILESTONES_KEY = 'valentines-milestones'

export function getMilestones() {
  try {
    const raw = localStorage.getItem(MILESTONES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveMilestones(milestones) {
  try {
    localStorage.setItem(MILESTONES_KEY, JSON.stringify(milestones))
  } catch (e) {
    console.warn('Could not save milestones', e)
  }
}
