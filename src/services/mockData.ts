
export interface FinancialReport {
    id: string;
    period: string;
    revenue: number;
    expenses: number;
    netIncome: number;
    cashFlow: number;
}

export interface OperationalMetric {
    id: string;
    date: string;
    activeUsers: number;
    newSignups: number;
    churnRate: number;
}

export const getFinancialReports = async (): Promise<FinancialReport[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        { id: '1', period: 'Jan', revenue: 50000, expenses: 35000, netIncome: 15000, cashFlow: 12000 },
        { id: '2', period: 'Feb', revenue: 55000, expenses: 38000, netIncome: 17000, cashFlow: 10000 },
        { id: '3', period: 'Mar', revenue: 48000, expenses: 30000, netIncome: 18000, cashFlow: 15000 },
        { id: '4', period: 'Apr', revenue: 60000, expenses: 40000, netIncome: 20000, cashFlow: 18000 },
        { id: '5', period: 'May', revenue: 65000, expenses: 42000, netIncome: 23000, cashFlow: 20000 },
        { id: '6', period: 'Jun', revenue: 70000, expenses: 45000, netIncome: 25000, cashFlow: 22000 },
    ];
};

export const getOperationalMetrics = async (): Promise<OperationalMetric[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        { id: '1', date: '2024-01-01', activeUsers: 1200, newSignups: 50, churnRate: 1.2 },
        { id: '2', date: '2024-02-01', activeUsers: 1350, newSignups: 180, churnRate: 1.1 },
        { id: '3', date: '2024-03-01', activeUsers: 1500, newSignups: 200, churnRate: 1.0 },
        { id: '4', date: '2024-04-01', activeUsers: 1680, newSignups: 220, churnRate: 0.9 },
        { id: '5', date: '2024-05-01', activeUsers: 1850, newSignups: 250, churnRate: 0.95 },
        { id: '6', date: '2024-06-01', activeUsers: 2100, newSignups: 300, churnRate: 0.8 },
    ];
};
