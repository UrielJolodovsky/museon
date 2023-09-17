export interface MuseosProps {
    id: string
    subimage: string
    subname: string
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

export interface EventsProps {
    author: {
        name: string
        image: string
    }
    id: string
    content: string
    description: string
    fecha: string
}

export interface PortfolioProps {
    author: {
        name: string
        image: string
    }
    id: number
    name_portfolio: string
    content: string
}

export interface usuarioProps {
    tipo_usuario: string
}