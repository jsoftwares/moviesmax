export interface actorCreationDTO {
    name: string;
    dateOfBirth?: Date;
    picture?: File;         // CREATE: used when creating a new actor and a picture is selected
    pictureURL?: string;     //EDIT: used when reading/displaying a picture path stored for user.
}