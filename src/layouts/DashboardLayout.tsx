
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Home, BarChart2, Settings, FileText } from "lucide-react"
import { FlagGuard } from "@/components/FlagGuard"
import { showSettings, showDocuments } from "@/lib/flags"
import { useLocation, Link } from "react-router-dom"


export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation()
    const pathname = location.pathname

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <Sidebar>
                    <SidebarHeader>
                        <div className="px-4 py-6">
                            <h2 className="text-xl font-bold tracking-tight">Enterprise Reports</h2>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === "/"}>
                                    <Link to="/" className="flex items-center gap-2">
                                        <Home className="h-4 w-4" />
                                        <span>Overview</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname.startsWith("/reports")}>
                                    <Link to="/reports" className="flex items-center gap-2">
                                        <BarChart2 className="h-4 w-4" />
                                        <span>Reports</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <FlagGuard flag={showDocuments}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild isActive={pathname.startsWith("/documents")}>
                                        <Link to="/documents" className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            <span>Documents</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </FlagGuard>
                            <FlagGuard flag={showSettings}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild isActive={pathname.startsWith("/settings")}>
                                        <Link to="/settings" className="flex items-center gap-2">
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </FlagGuard>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
                <main className="flex-1 overflow-auto bg-background p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <SidebarTrigger />
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                    </div>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
