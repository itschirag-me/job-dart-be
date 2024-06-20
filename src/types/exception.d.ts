export type Exception = {
    code: number;
    message: string;
    errorMessage?: string;
} & Error;