export type ConcertResponse = {
    id: string;
    name: string;
    description: string;
    seat: number;
    createdAt: string;
};

export type HistoryResponse = {
    id: string;
    user: UserResponse;
    concert: ConcertResponse;
    action: string;
    createdAt: string;
};

export type UserResponse = {
    id: string;
    username: string;
    createdAt: string;
};
