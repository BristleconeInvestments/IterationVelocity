import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import Reports from "@/pages/Reports"
import Login from "@/pages/Login"

function App() {
  return (
    <>
      <SignedIn>
        <DashboardLayout>
          <Reports />
        </DashboardLayout>
      </SignedIn>
      <SignedOut>
        <Login />
      </SignedOut>
    </>
  )
}

export default App

