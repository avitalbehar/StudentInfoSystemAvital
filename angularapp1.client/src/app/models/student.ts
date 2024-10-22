export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    country: string;
    gender: string;
    class: string;
    questionnaireStatus: string;
    personalProgramStatus: string;
    studentStatus: string;
    studentType: string;
    previousIdentificationNumber: string;
    imageUrl: string;
}

export type SortColumn = keyof Student; // המפתח משמש למיון
