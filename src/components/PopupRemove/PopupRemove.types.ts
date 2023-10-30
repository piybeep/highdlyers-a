type entities = 'cards' | 'levels' | 'lesson-plans' | 'check-lists'

export interface PopupRemoveProps {
    id: string
    entity: entities
    message?: string
}