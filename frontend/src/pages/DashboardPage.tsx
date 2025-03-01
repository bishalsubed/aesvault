import CreateCredentialsForm from "@/components/CreateCredentialsForm";
import CredentialsList from "@/components/CredentialsList";
import { Key, PlusCircle } from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "create", label: "Create Credential", icon: PlusCircle },
  { id: "credentials", label: "Credentials", icon: Key },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("credentials")

  return (
    <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-[-2] bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      <div className="relative container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-green-700 text-center">Dashboard</h1>
      </div>
      <div className='flex justify-evenly mb-8'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${activeTab === tab.id
              ? "bg-green-700 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            <tab.icon className='mr-2 h-5 w-5' />
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "create" && <CreateCredentialsForm />}
      {activeTab === "credentials" && <CredentialsList />}
    </div>
  )
}

export default DashboardPage