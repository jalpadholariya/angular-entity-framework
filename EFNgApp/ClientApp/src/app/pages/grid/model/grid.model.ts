export interface SymbolModel {
    currency: string;
    description: string;
    displaySymbol: string;
    figi: string;
    mic: string;
    symbol: string;
    type: string;
}

export interface Subscriptions {
    symbol: string;
    rules: Rule[];
}

export interface Rule {
    type: string;
    operator: string;
    number: number;
}
