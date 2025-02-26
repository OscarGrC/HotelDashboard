export interface AuthResponseInterface {
    token: string;
    user: {
        name: string;
        email: string;
    };
}
