import React, { useState, useEffect, useCallback } from 'react';
import ArrayDisplayComponent from './Array';

interface ArrayDisplayProps {
    onSortSuccess: () => void;
    arrayCount: number;
    sortCheckInterval: number;
}

const ArrayDisplay: React.FC<ArrayDisplayProps> = ({ onSortSuccess, arrayCount, sortCheckInterval }) => {
    const [arrays, setArrays] = useState<number[][]>([]);
    const [isSorting, setIsSorting] = useState(false);

    useEffect(() => {
        const initialArrays = Array.from({ length: arrayCount }, () => [1, 0]);
        setArrays(initialArrays);
    }, [arrayCount]);

    const handleSortAttempt = useCallback(() => {
        if (isSorting) return;
        console.log("Checking if sorted!")
        setIsSorting(true);

        setTimeout(() => {
            const sortedArrays = arrays.map((array) => {
                if (checkArray(array)) {
                    onSortSuccess();
                }
                return array;
            });
            setArrays(sortedArrays);
            setIsSorting(false);
        }, 1000);
    }, [arrays, isSorting, onSortSuccess]);

    const checkArray = (arr: number[]) => {
        return arr.length === 2 && arr[0] === 0 && arr[1] === 1;
    };

    useEffect(() => {
        if (arrays.length === 0) return;

        const interval = setInterval(() => {
            handleSortAttempt();
        }, sortCheckInterval);

        return () => clearInterval(interval);
    }, [sortCheckInterval, arrays, handleSortAttempt]);

    return (
        <section className="p-5">
            <span>{isSorting ? 'Waiting for Cosmic Ray...' : 'Attempting Sort...'}</span>
            <section>
                {arrays.map((array, index) => (
                    <ArrayDisplayComponent key={index} values={array} />
                ))}
            </section>
        </section>
    );
};

export default ArrayDisplay;