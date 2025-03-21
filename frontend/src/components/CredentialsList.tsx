import { useCredentialStore } from "@/stores/useCredentialsStore"
import { Trash, Copy, EyeIcon, EyeOff, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
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


const CredentialsList = () => {

  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});
  const { credentials, getAllCredentials, loading, deleteCredential } = useCredentialStore();

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
    getAllCredentials();
  }, [credentials]);


  if (loading) <LoadingSpinner />

  return (
    <div
      className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-7xl mx-auto'>
      <table className=' min-w-full divide-y divide-gray-700'>
        <thead className='bg-gray-700'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Account
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Password
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Webiste Url
            </th>
          </tr>
        </thead>

        <tbody className='bg-gray-800 divide-y divide-gray-700'>
          {credentials?.map((credential) => (
            <tr key={credential._id} className='hover:bg-gray-700'>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className="flex items-center justify-between w-[220px]">
                  <div className='text-sm font-medium text-white'>{credential.account}</div>
                  <Copy className="size-4 text-gray-300 cursor-pointer" onClick={() => { copyToClipboard(credential.account) }} />
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className="flex items-center justify-between w-[225px] gap-4">
                  <Input
                    disabled
                    id={credential._id}
                    type={isPasswordVisible(credential._id) ? "text" : "password"}
                    className='h-8 py-1 text-sm text-gray-50 bg-gray-800'
                    defaultValue={credential.password}
                  />
                  <div className="flex items-center gap-4">
                    <Copy className="size-4 text-gray-300 cursor-pointer" onClick={() => { copyToClipboard(credential.password) }} />
                    <div className="flex items-center cursor-pointer" onClick={() => { togglePasswordVisibility(credential._id) }}>
                      {isPasswordVisible(credential._id) ? (<EyeIcon className="size-4 text-gray-300" />) : (<EyeOff className="size-4 text-gray-300" />)}
                    </div>
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className="flex items-center justify-between w-[220px]">
                  <a href={credential.websiteUrl} target="_blank" className='transition-transform hover:translate-y-[-2px] hover:underline delay-75 underline-offset-4 decoration-2 text-sm text-gray-300 cursor-pointer font-medium'>{credential.websiteUrl.split("/")[2]}</a>
                  <Copy className="size-4 text-gray-300 cursor-pointer" onClick={() => { copyToClipboard(credential.websiteUrl!) }} />
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <div className="flex justify-center items-center gap-4">
                  <Link to={`/dashboard/${credential._id}`}><button
                    className='text-green-200 hover:text-green-400'
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CredentialsList