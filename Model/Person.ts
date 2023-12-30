export type Person = {
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    room:number;
    image?:string;
}

export const createContact = (id:string, firstName:string, lastName:string, email:string, roomNumber: number, image?:string):Person => ({
        id:id,
        firstName:firstName,
        lastName:lastName,
        email:email,
        room:roomNumber,
        image:image
    })