import React, { useId } from "react"

type SelectProps = {
    options?: string[],
    label?: string,
    className?: string

} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ options = [], label, className = "", ...props }, ref) => {
        const id = useId();
        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <select
                    id={id}
                    ref={ref}
                    className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
)
export default Select