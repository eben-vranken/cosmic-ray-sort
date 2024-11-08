import React from 'react';

interface ArrayProps {
    values: number[];
}

const Array: React.FC<ArrayProps> = ({ values }) => {
    return (
        <section className={`${values[0] === 0 && values[1] === 1 ? "bg-green-600" : 'bg-red-600 opacity-50'} inline-block px-4 py-2 border border-gray-300 rounded-md mr-2`}>
            [
            {values[0]}
            ,
            {values[1]}
            ]
        </section>
    );
};

export default Array;
