export interface MuseosProps {
    id: string
    name: string
}

export interface CommentsProps {
    author: {
        name: string
        image: string
    }
    content: string
    createdAt: string
}