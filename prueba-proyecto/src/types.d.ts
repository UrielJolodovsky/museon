export interface MuseosProps {
    id: string
    name: string
    role: string
}

export interface CommentsProps {
    author: {
        name: string
    }
    content: string
    createdAt: string
}

export interface EventsProps{
    author: {
        name: string
        image: string
    }
    content: string
    createdAt: string
}