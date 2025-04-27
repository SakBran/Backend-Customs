export interface RejectDTO {
    id: string;
    message: string;
    isReject?: boolean;
}

export interface DocaSendDTO {
    id: string;
    message: string;
    isReject?: boolean;
    userId: string;
}