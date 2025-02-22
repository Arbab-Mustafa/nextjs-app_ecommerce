"use client";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import debounce from 'lodash/debounce';

interface Product {
  _id: string;
  name: string;
  newPrice: number;
  category: string;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Debounced search function
  const debouncedSearch = debounce(async (query: string) => {
    if (query.length < 1) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, 300); // 300ms delay

  useEffect(() => {
    debouncedSearch(searchTerm);
    
    // Cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <button 
            onClick={() => router.back()} 
            className="text-xl p-2"
          >
            <IoIosArrowBack />
          </button>
          <div className="flex-1 mx-2">
            <input
              type="text"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="px-4">
        {isLoading ? (
          <div className="py-4 text-center text-gray-500">Searching...</div>
        ) : searchResults.length > 0 ? (
          <div className="">
            {searchResults.slice(0,5).map((product) => (
                <Link 
                href={`/products/${product.category.split(' ')[0]}/${product.name.replace(/\s+/g, '-').replaceAll("+", "-plus").toLowerCase()}`} 
                key={product._id}
                className="block"
                >
                <div className="py-3 flex justify-between items-center">
                  <div>
                  <div className="text-xs">{product.name}</div>
                  {/* <div className="text-xs text-gray-500">{product.category}</div> */}
                  </div>
                  {/* <div className="text-sm font-medium">
                  ₹{product.newPrice.toLocaleString()}
                  </div> */}
                </div>
                </Link>
            ))}
          </div>
        ) : searchTerm.length > 0 ? (
          <div className="py-4 text-center text-gray-500">
            No products found
          </div>
        ) : (
          <div className="py-4 text-center text-gray-500">
            Start typing to search products
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;