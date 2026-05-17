export interface UserData {
    id: string | number;
    name: string;
    email: string;
    profileId?: number;
    schoolId?: number;
}


export interface UserContextType {
    user: UserData | null;
    isLoading: boolean;
    logout: () => Promise<void>;
    refreshUserData: () => Promise<void>;
}
