import { Controller, useFormContext } from "react-hook-form";

export default function Input({
    label,
    name,
    type,
    rules,
    placeholder,
    ...rest
}) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <div>
            <label htmlFor={name} className="block mb-2">
                {label}
            </label>
            {errors[name] && (
                <p className="text-white">{errors[name].message}</p>
            )}

            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                        {...rest}
                    />
                )}
                rules={rules}
            />
        </div>
    );
}
