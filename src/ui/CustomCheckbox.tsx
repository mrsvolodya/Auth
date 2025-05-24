import React from "react";

interface CustomCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  labelClassName?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  className = "",
  labelClassName = "flex justify-end text-gray-700 text-sm w-full",
}) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <div className="flex items-center justify-end gap-2 w-full">
      <div className={`${labelClassName} cursor-pointer`} onClick={handleClick}>
        {label}
      </div>
      <div className=" w-4 h-4 flex">
        <div
          onClick={handleClick}
          className={`w-4 h-4 rounded cursor-pointer ${
            checked ? "bg-blue-600" : "border border-gray-400 bg-white"
          } ${className}`}
        >
          {checked && (
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
