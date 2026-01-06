export interface FilmResponse {
    readonly id: number,
    readonly title: string,
    readonly releaseDate: string,
    readonly length: number
    readonly cover: string,
    readonly collection: Collection
}

export interface Film {
    readonly id: number,
    readonly title: string,
    readonly releaseDate: string,
    readonly length: number
    readonly cover: string,
    readonly collectionId: number
}

export interface Collection {
    readonly id: number,
    readonly name: string
}

export interface Filter {
    readonly query: string,
    readonly includeUnreleased: boolean,
    readonly collectionId: number
    readonly sort: Sort
}

export type Sort = "A-Z" | "Z-A" | "Latest" | "Oldest" | "Longest" | "Shortest"

