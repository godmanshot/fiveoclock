export interface Bonus {
    id: number;
    name: string;
    bonus: number;
}

export interface UserBonus {
    balance: number;
    total_sum:number;
    bonus: Bonus;
}