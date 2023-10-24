interface NAVBAR_DATA_PROPS {
    title: string
    links: {
        text: string
        href: string
    }[]
}

export const NAVBAR_DATA: NAVBAR_DATA_PROPS[] = [
    {
        title: 'Материалы',
        links: [
            {
                text: 'Карточки',
                href: '/cards'
            },
            {
                text: 'Полезные статьи',
                href: '/articles'
            },
            {
                text: 'Планы уроков',
                href: '/lesson-plans'
            },
        ]
    },
    {
        title: 'Управление',
        links: [
            {
                text: 'Заявки',
                href: '/link'
            },
            {
                text: 'Мои данные',
                href: '/login'
            }
        ]
    }
]