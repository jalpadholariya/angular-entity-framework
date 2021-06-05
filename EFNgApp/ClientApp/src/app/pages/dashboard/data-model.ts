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