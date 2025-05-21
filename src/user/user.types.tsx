export interface UserData {
    id: string | number;
    name: string;
    email: string;
}


export interface UserContextType {
    user: UserData | null;
    isLoading: boolean;
    logout: () => Promise<void>;
    refreshUserData: () => Promise<void>;
}
