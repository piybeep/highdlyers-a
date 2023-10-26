export interface Card {
    id: string
    name: string
    read_time: string
    isFree: boolean
    link: string
    preview: string
    level: {
        id: string
        name: string
    }
}