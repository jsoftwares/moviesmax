export interface actorDTO {
    id: number;
    name: string;
    dateOfBirth: Date;
    picture: string;
    biography: string;
}

export interface actorCreationDTO {
    name: string;
    dateOfBirth?: Date;
    picture?: File;         // CREATE: used when creating a new actor and a picture is selected
    pictureURL?: string;     //EDIT: used when reading/displaying a picture path stored for user.
    biography?: string;
}

export interface actorMovieDTO {
    id: number;
    name: string;
    character: string;
    picture: string;
}