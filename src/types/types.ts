// types/index.ts
export interface PlanData {
    id: string; // or string based on your definition
    planId: string;
    planName: string;
    planRate: number;
    planDuration: string;
    planDescription: string;
}

export interface UserData {
    id: string;
    userId: string;
    userName: string;
    email: string;
    age: number;
    role: string;
    createdAt: string;
    updatedAt: string;
    startDate: string;
    endDate: string;
    paymentAmount: number;
    isActive: string;
}
