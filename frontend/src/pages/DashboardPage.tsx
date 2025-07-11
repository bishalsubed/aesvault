import { useCredentialStore } from "@/stores/useCredentialsStore";
import { Key, PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { NavLink, Outlet } from 'react-router-dom'

const tabs = [
  { id: "create", label: "Create Credential", icon: PlusCircle },
  { id: "credentials", label: "Credentials", icon: Key },
];

const DashboardPage = () => {
  const { getAllCredentials } = useCredentialStore();

  useEffect(() => {
    getAllCredentials();
  }, [])


  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(120%_80%_at_50%_0%,rgba(34,197,94,0.08)_0,rgba(255,255,255,0)_100%)]" />
      <div className="relative container max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-700 tracking-tight">Dashboard</h1>
          <p className="text-gray-600 mt-2 text-sm">Manage your credentials with ease</p>
        </div>
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.id}
              className={({ isActive }) =>
                `flex items-center gap-1 px-4 py-2 mx-2 rounded-md transition-colors
                    ${isActive ? 'bg-green-700 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'}`
              }
            >
              <tab.icon className="h-[19px] w-[19px] " />
              {tab.label}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </div>

  )
}

export default DashboardPage