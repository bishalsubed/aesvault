import { useCredentialStore } from "@/stores/useCredentialsStore"
import { Trash, Copy, EyeIcon, EyeOff, Pencil, Loader, Search } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Link } from "react-router-dom";
import { Pagination } from "./pagination";


const CredentialsList = () => {

  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { credentials, getAllCredentials, loading, deleteCredential, getCredentialByWebsiteUrl } = useCredentialStore();
  const postPerPage = 5;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  let paginatedCredentials = credentials.slice(firstPostIndex, lastPostIndex);

  const isPasswordVisible = (id: string) => {
    return visiblePasswords[id] ?? false;
  };


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const togglePasswordVisibility = (id: string) => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) {
      const isVisible = inputElement.type === "text";
      inputElement.type = isVisible ? "password" : "text";

      setVisiblePasswords((prev) => ({
        ...prev,
        [id]: !isVisible,
      }));
    }
  }

  useEffect(() => {
    const updatedVisibility: { [key: string]: boolean } = {};
    credentials.forEach((credential) => {
      const inputElement = document.getElementById(credential._id) as HTMLInputElement;
      if (inputElement) {
        updatedVisibility[credential._id] = inputElement.type === "text";
      }
    });
    setVisiblePasswords(updatedVisibility);
  }, [credentials]);


  useEffect(() => {
    getAllCredentials();
  }, [])

  useEffect(() => {
    const fetchSearchedCredentials = setTimeout(() => {
      if (searchTerm.length > 0) {
        setCurrentPage(1);
        getCredentialByWebsiteUrl(searchTerm);
        paginatedCredentials = credentials.slice(firstPostIndex, lastPostIndex);
      } else {
        getAllCredentials();
      }
    }, 300)

    return () => clearTimeout(fetchSearchedCredentials)
  }, [searchTerm])

  useEffect(() => {
    setTotalPages(Math.ceil(credentials.length / postPerPage));
  }, [credentials.length, paginatedCredentials]);


  if (loading) <LoadingSpinner />

  return (
    <>
      <div className="bg-gray-900 text-white hidden min-[900px]:block shadow-xl rounded-xl overflow-hidden max-w-7xl mx-auto pb-6">
        <div className="flex items-center justify-between gap-4 px-6 py-4 sticky top-0 z-30 bg-gray-900/80 backdrop-blur-lg">
          <h2 className="text-lg font-semibold text-white">Password Overview</h2>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              className="w-full pl-10 pr-4 py-2 text-sm rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400"
              type="text"
              placeholder="Website URL..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader className="h-8 w-8 text-white animate-spin" />
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-700 text-sm">
            <thead className="bg-gray-800 text-gray-400 uppercase tracking-wide text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Account</th>
                <th className="px-6 py-3 text-left">Password</th>
                <th className="px-6 py-3 text-left">Website</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {credentials.length > 0 ? (
                paginatedCredentials.map((credential, index) => (
                  <tr key={credential._id} className={`group ${index % 2 ? 'bg-gray-800/30' : ''} hover:bg-gray-800/60 transition`}>
                    <td className="px-6 py-4">
                      <div className="flex justify-between items-center max-w-[220px]">
                        <span>{credential.account}</span>
                        <Copy className="h-4 w-4 cursor-pointer text-gray-400" onClick={() => copyToClipboard(credential.account)} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 max-w-[250px]">
                        <Input
                          disabled
                          id={credential._id}
                          type={isPasswordVisible(credential._id) ? "text" : "password"}
                          className="h-8 py-1 text-sm bg-gray-900 text-white border border-gray-700 w-full"
                          defaultValue={credential.password}
                        />
                        <div className="flex items-center gap-2">
                          <Copy className="h-4 w-4 cursor-pointer text-gray-400" onClick={() => copyToClipboard(credential.password)} />
                          {isPasswordVisible(credential._id)
                            ? <EyeIcon className="h-4 w-4 cursor-pointer text-gray-400" onClick={() => togglePasswordVisibility(credential._id)} />
                            : <EyeOff className="h-4 w-4 cursor-pointer text-gray-400" onClick={() => togglePasswordVisibility(credential._id)} />
                          }
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-between items-center max-w-[230px]">
                        <a
                          href={credential.websiteUrl}
                          target="_blank"
                          className="text-gray-300 hover:text-white hover:underline underline-offset-2 transition-all"
                        >
                          {credential.websiteUrl.split("/")[2]}
                        </a>
                        <Copy className="h-4 w-4 cursor-pointer text-gray-400" onClick={() => copyToClipboard(credential.websiteUrl)} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-4">
                        <Link to={`/dashboard/${credential._id}`}>
                          <button className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition">
                            <Pencil className="h-4 w-4 text-white" />
                          </button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="p-2 rounded-full bg-gray-700 hover:bg-red-600 transition">
                              <Trash className="h-4 w-4 text-white" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your credential and remove your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-red-500 text-white hover:bg-red-600" onClick={() => deleteCredential(credential._id)}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-6">Add credentials to get started</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>

      <Card className="bg-gray-800 text-white block min-[900px]:hidden shadow-lg rounded-lg overflow-hidden max-w-7xl">
        <CardHeader>
          <CardTitle>
            <div className='flex justify-between items-center gap-5'>
              <span className='underline underline-offset-4 text-xl'>Credentials</span>
              <div className="relative flex items-center">
                <Search className='absolute size-5 left-2' />
                <Input
                  className='w-full pl-10 pr-4 py-2 text-sm rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400'
                  type="text"
                  placeholder="Webiste url..."
                  onChange={(e) => { setSearchTerm(e.target.value) }}
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {loading ? (
              <div className='flex justify-center'>
                <Loader className='size-8 text-white animate-spin' />
              </div>
            ) : (
              credentials.length > 0 ? (
                <>
                  {paginatedCredentials?.map((credential) => (
                    <div key={credential._id} className="flex flex-col gap-2 mb-8 mt-2">
                      <div className='flex justify-between items-center'>

                        <Link to={`/credential/${credential._id}`}> <div className='text-base font-semibold cursor-pointer active:underline decoration-slate-300 decoration-2 underline-offset-4'>
                          {credential.websiteUrl.split("/")[2].charAt(0).toUpperCase() + credential.websiteUrl.split("/")[2].slice(1)}
                        </div>
                          <p className="text-sm text-gray-400 font-semibold">{credential.account}</p>
                        </Link>

                        <div className="flex justify-center items-center gap-4">
                          <Link to={`/dashboard/${credential._id}`}><button
                            className='text-slate-300 hover:text-slate-100'
                          >
                            <Pencil className='h-5 w-5' />
                          </button>
                          </Link>


                          <AlertDialog>
                            <AlertDialogTrigger asChild><button
                              className='text-red-400 hover:text-red-300'
                            >
                              <Trash className='h-5 w-5' />
                            </button></AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your credential
                                  and remove your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 text-white hover:bg-red-600" onClick={() => deleteCredential(credential._id)}>Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      <div className="border-b-2 border-gray-600"></div>
                    </div>
                  ))
                  }
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />

                </>

              ) : (
                <div className='text-center text-gray-400'>Add credentials to get Started</div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </>

  )
}

export default CredentialsList