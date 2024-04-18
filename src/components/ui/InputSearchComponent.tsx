import React, { InputHTMLAttributes, ChangeEvent } from 'react';

interface InputPropsBuscar<T> extends InputHTMLAttributes<HTMLInputElement> {
    data: T[];
    setRecord: (filteredData: T[]) => void;
    columnToSearch: keyof T;
}

const InputSearchComponent = <T,>({ data, setRecord, columnToSearch, ...props }: InputPropsBuscar<T>) => {
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const filteredData = data.filter((record) => {
            return String(record[columnToSearch]).toLowerCase().includes(value.toLowerCase());
        });
        setRecord(filteredData);
    };

    return (
        <div className='text-right'>
            <input
                className="border border-gray-300 px-4 py-2 outline-none rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50/60 "
                {...props}
                onChange={handleChange}
            />
        </div>
    );
}

export default InputSearchComponent;