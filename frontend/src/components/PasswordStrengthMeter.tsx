import { Check, X } from 'lucide-react';

const PasswordCriteria = ({ password }: { password: string }) => {
    const criteria = [
        { label: "At least 12 characters", met: password.length >= 12 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contains a number", met: /\d/.test(password) },
        { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
    ];
    return (
        <div className='mt-2 space-y-1'>
            {criteria.map((item, index) => {
                return <div key={index} className='flex items-center text-sm font-medium'>
                    {item.met ? (
                        <Check className='size-4 text-green-600 mr-2' />
                    ) : (<X className='size-4 text-red-600 mr-2' />)}
                    <span className={item.met ? "text-green-600" : "text-red-600"}>
                        {item.label}
                    </span>
                </div>
            })}
        </div>
    )
}
const PasswordStrengthMeter = ({ password }: { password: string }) => {
    const getStrength = (pass: string) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (pass.match(/[a-z]/)) strength++;
        if(pass.match(/[A-Z]/)) strength++;
        if (pass.match(/\d/)) strength++;
        if (pass.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    };
    const strength = getStrength(password);

    const getColor = (strength: number) => {
        if (strength === 0) return "bg-red-600";
        if (strength === 1) return "bg-red-400";
        if (strength === 2) return "bg-yellow-500";
        if (strength === 3) return "bg-yellow-400";
        if (strength === 4) return "bg-green-400";
        return "bg-green-600";
    };

    const getStrengthText = (strength: number) => {
        if (strength === 0) return "Very Weak";
        if (strength === 1) return "Weak";
        if (strength === 2) return "Satisfactory";
        if (strength === 3) return "Fair";
        if (strength === 4) return "Good";
        return "Strong";
    };
    return (
        <div className="mt-2 space-y-4">
            <PasswordCriteria password={password} />
            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Your Password Strength</span>
                    <span className="text-sm text-gray-500">{getStrengthText(strength)}</span>
                </div>
                <div className='flex space-x-1'>
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                ${index < strength ? getColor(strength) : "bg-gray-600"}
        `}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PasswordStrengthMeter