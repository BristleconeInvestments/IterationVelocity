
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Home, BarChart2, Settings, FileText } from "lucide-react"
import { FlagGuard } from "@/components/FlagGuard"
import { showSettings, showDocuments } from "@/lib/flags"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
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
                                <SidebarMenuButton asChild>
                                    <a href="#" className="flex items-center gap-2">
                                        <Home className="h-4 w-4" />
                                        <span>Overview</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive>
                                    <a href="#" className="flex items-center gap-2">
                                        <BarChart2 className="h-4 w-4" />
                                        <span>Reports</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <FlagGuard flag={showDocuments}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a href="#" className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            <span>Documents</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </FlagGuard>
                            <FlagGuard flag={showSettings}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a href="#" className="flex items-center gap-2">
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </a>
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
