
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getFinancialReports, getOperationalMetrics, type FinancialReport, type OperationalMetric } from '@/services/mockData';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const financialChartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
    },
    expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const operationalChartConfig = {
    activeUsers: {
        label: "Active Users",
        color: "hsl(var(--chart-3))",
    },
    newSignups: {
        label: "New Signups",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig

export default function Reports() {
    const [financialData, setFinancialData] = useState<FinancialReport[]>([]);
    const [operationalData, setOperationalData] = useState<OperationalMetric[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [fin, ops] = await Promise.all([getFinancialReports(), getOperationalMetrics()]);
            setFinancialData(fin);
            setOperationalData(ops);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-8">Loading reports...</div>;

    const totalRevenue = financialData.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalNetIncome = financialData.reduce((acc, curr) => acc + curr.netIncome, 0);
    const currentActiveUsers = operationalData[operationalData.length - 1]?.activeUsers || 0;
    const latestChurn = operationalData[operationalData.length - 1]?.churnRate || 0;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <polyline points="17 11 19 13 23 9" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalNetIncome.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+15% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{currentActiveUsers.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+180 new users</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{latestChurn}%</div>
                        <p className="text-xs text-muted-foreground">-0.1% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Financial Overview</CardTitle>
                        <CardDescription>
                            Comparing Revenue vs Expenses over the last 6 months.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartContainer config={financialChartConfig} className="min-h-[300px] w-full">
                            <AreaChart data={financialData} margin={{ left: 12, right: 12 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area dataKey="revenue" fill="var(--color-revenue)" fillOpacity={0.4} stroke="var(--color-revenue)" radius={4} />
                                <Area dataKey="expenses" fill="var(--color-expenses)" fillOpacity={0.4} stroke="var(--color-expenses)" radius={4} />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                        <CardDescription>
                            Active users and new signups.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={operationalChartConfig} className="min-h-[300px] w-full">
                            <BarChart data={operationalData} margin={{ left: 12, right: 12 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short" })} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="activeUsers" fill="var(--color-activeUsers)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="newSignups" fill="var(--color-newSignups)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Financial Periods</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Period</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Expenses</TableHead>
                                <TableHead>Net Income</TableHead>
                                <TableHead className="text-right">Cash Flow</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {financialData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.period}</TableCell>
                                    <TableCell>${item.revenue.toLocaleString()}</TableCell>
                                    <TableCell>${item.expenses.toLocaleString()}</TableCell>
                                    <TableCell>${item.netIncome.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">${item.cashFlow.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
