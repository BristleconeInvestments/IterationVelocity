import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import Reports from "@/pages/Reports"
import Login from "@/pages/Login"
import Documents from "@/pages/Documents"
import Settings from "@/pages/Settings"
import { FlagGuard } from "@/components/FlagGuard"
import { showSettings, showDocuments } from "@/lib/flags"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <SignedIn>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/reports" replace />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/documents" element={<FlagGuard flag={showDocuments}><Documents /></FlagGuard>} />
                    <Route path="/settings" element={<FlagGuard flag={showSettings}><Settings /></FlagGuard>} />
                  </Routes>
                </DashboardLayout>
              </SignedIn>
              <SignedOut>
                <Login />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

