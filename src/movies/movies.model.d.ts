export interface movieDTO {
    id: number;
    title: string;
    poster: string;
}

export interface movieCreationDTO {
    title: string;
    inTheatres: boolean;
    trailer: string;
    releaseDate?: Date;
    poster?: File;
    posterURL?: string;
}

export interface landingPageDTO {
    inTheaters?: movieDTO[];
    upcomingReleases?: movieDTO[];
}