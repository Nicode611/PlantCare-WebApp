export interface User {
    id: string;
    name: string | null;
    username: string;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    acceptAnyMail: boolean;
    acceptPlantcareMail: boolean;
    acceptTipsMail: boolean;
    language: string;
    theme: string;
}
