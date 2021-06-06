export interface KeyMetrics {
    type: string,
    pnlYtd: string,
    pnlLtd: string,
    drawdownYTD: string,
    currentPnL: string,
    currentPrice: string,
    currentPosition: string,
}

export interface MetricsSection {
    label: string,
    kpi: number,
    trendUp? : boolean
}

export interface WidgetOptions {
    title: string,
    subTitle?: string
}

export interface ModelCommodity {
    type: string,
    date: string,
    position: number,
    newTradeAction: number,
    pnLDaily: number,
    contract: string,
    price: number,
    cumPnL: number,
    drawdownPnL: number,
}

export interface RecordsByCommodity {
    type: string,
    records: ModelCommodity[]
}