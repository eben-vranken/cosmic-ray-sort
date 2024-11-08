'use client'
import { useState } from "react";
import ArrayDisplay from "@/components/ArrayDisplay";

const SORT_CHECK_INTERVAL = 1000;

export default function Home() {
  const [itemsSorted, setItemsSorted] = useState(0);
  const [itemsUnsorted, setItemsUnsorted] = useState(1000);
  const [arrayCount, setArrayCount] = useState(1000);
  const [inputValue, setInputValue] = useState<string>(arrayCount.toString());

  const handleSortSuccess = () => {
    setItemsSorted((prevSorted) => prevSorted + 1);
    setItemsUnsorted((prevUnsorted) => prevUnsorted - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(inputValue, 10);
    if (count > 0 && count !== arrayCount) {
      setArrayCount(count);
      setItemsSorted(0);
      setItemsUnsorted(count);
    }
  };

  return (
    <section>
      <section className="p-5 flex flex-col border-b-2 border-black dark:border-white border-opacity-25 dark:border-opacity-25">
        <h1 className="text-xl font-bold">Cosmic-Ray Sort</h1>
        <span className="opacity-75">Status</span>
        <section className="flex items-center gap-x-6">
          <section className="flex flex-col">
            <span className="flex items-center gap-x-1">
              <span className="text-red-500 text-4xl animate-pulse">
                &#8903;
              </span>
              Items Unsorted
            </span>
            <span className="ml-[30px] opacity-50">{itemsUnsorted}</span>
          </section>
          <section className="flex flex-col">
            <span className="flex items-center gap-x-1">
              <span className="text-green-500 text-4xl animate-pulse">
                &#8903;
              </span>
              Items Sorted
            </span>
            <span className="ml-[30px] opacity-50">{itemsSorted}</span>
          </section>
        </section>

        {/* Input for array count */}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            min="1"
            className="p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
      </section>

      <ArrayDisplay
        onSortSuccess={handleSortSuccess}
        arrayCount={arrayCount}
        sortCheckInterval={SORT_CHECK_INTERVAL}
      />
    </section>
  );
}
