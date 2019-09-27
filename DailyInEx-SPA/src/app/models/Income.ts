export interface Income {
    id: number;
    amount: number;
    isCash: boolean;
    isCheck: boolean;
    checkNo: string;
    bankName: string;
    particular: string;
    date: string;
}