// // // "use client";


// "use client";

// import { useState, useEffect } from 'react';

// const getData = () => {
//     // Access localStorage only in the browser (client side)
//     if (typeof window !== 'undefined') {
//         let data = localStorage.getItem("parkingFormData");
//         localStorage.removeItem("parkingFormData");
//         return JSON.parse(data); // Parse the data to JSON format
//     }
//     return null;
// };

// export default function Grid() {
//     const [parkingData, setParkingData] = useState(null);
//     const [gridData, setGridData] = useState([]);

//     // Create the grid (2D array) based on rangeOfPillars and noOfPillars
//     useEffect(() => {
//         const data = getData();
//         if (data) {
//             setParkingData(data);

//             const columns = getColumnRange(data.rangeOfPillars); // Get the column headers (A-Z)
//             const rows = parseInt(data.noOfPillars, 10); // Get the number of rows

//             // Create the initial grid based on minCarsPerPillar
//             const initialGrid = Array.from({ length: rows }, () =>
//                 Array.from({ length: columns.length }, () => data.minCarsPerPillar)
//             );

//             setGridData(initialGrid);
//         }
//     }, []);

//     // Function to get the column range based on the starting and ending pillars (e.g., A-Z)
//     const getColumnRange = (rangeOfPillars) => {
//         const [start, end] = rangeOfPillars.split("-");
//         let columns = [];
//         for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
//             columns.push(String.fromCharCode(i));
//         }
//         return columns;
//     };

//     // Handle cell click to change value
//     const handleCellChange = (rowIndex, colIndex) => {
//         const newValue = prompt("Enter new value for the cell:");
//         if (newValue !== null) {
//             setGridData((prevGrid) => {
//                 const updatedGrid = [...prevGrid];
//                 updatedGrid[rowIndex][colIndex] = newValue; // Update the cell value
//                 return updatedGrid;
//             });
//         }
//     };

//     // Save the grid data to the backend (can be used later with an API call)
//     const saveGridData = () => {
//         // Example to show how to handle the 2D grid data
//         console.log("Saved grid data: ", gridData);
//         // Make API call here to save data if needed
//     };

//     if (!parkingData) {
//         return <div>Loading...</div>;
//     }

//     const columns = getColumnRange(parkingData.rangeOfPillars);

//     return (
//         <div>
//             <h2 className="text-xl font-semibold mb-4">Parking Layout Grid</h2>
//             <table className="min-w-full border-collapse table-auto">
//                 <thead>
//                     <tr>
//                         <th className="border px-4 py-2">Pillar #</th>
//                         {columns.map((column) => (
//                             <th key={column} className="border px-4 py-2">{column}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {gridData.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                             <td className="border px-4 py-2">{rowIndex + 1}</td>
//                             {row.map((cell, colIndex) => (
//                                 <td
//                                     key={colIndex}
//                                     className="border px-4 py-2 text-center cursor-pointer"
//                                     onClick={() => handleCellChange(rowIndex, colIndex)}
//                                 >
//                                     {cell}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <button
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={saveGridData}
//             >
//                 Save Grid Data
//             </button>
//         </div>
//     );
// }


"use client";

import { useState, useEffect } from "react";

const getData = () => {
  if (typeof window !== "undefined") {
    let data = localStorage.getItem("parkingFormData");
    localStorage.removeItem("parkingFormData");
    return JSON.parse(data);
  }
  return null;
};

export default function Grid() {
  const [parkingData, setParkingData] = useState(null);
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    const data = getData();
    if (data) {
      setParkingData(data);

      const columns = getColumnRange(data.rangeOfPillars);
      const rows = parseInt(data.noOfPillars, 10);

      const initialGrid = Array.from({ length: rows }, () =>
        Array.from({ length: columns.length }, () => data.minCarsPerPillar)
      );

      setGridData(initialGrid);
    }
  }, []);

  const getColumnRange = (rangeOfPillars) => {
    const [start, end] = rangeOfPillars.split("-");
    if (start && end && start.length === 1 && end.length === 1) {
      let columns = [];
      for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
        columns.push(String.fromCharCode(i));
      }
      return columns;
    }
    return [];
  };

  const handleCellChange = (rowIndex, colIndex) => {
    const newValue = prompt("Enter new value for the cell:");
    if (newValue !== null) {
      setGridData((prevGrid) => {
        const updatedGrid = [...prevGrid];
        updatedGrid[rowIndex][colIndex] = newValue;
        return updatedGrid;
      });
    }
  };

  const saveGridData = () => {
    localStorage.setItem("gridData", JSON.stringify(gridData)); // Save grid data to localStorage
    alert("Grid data saved!");
  };

  if (!parkingData) {
    return <div>Loading...</div>;
  }

  const columns = getColumnRange(parkingData.rangeOfPillars);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Parking Layout Grid</h2>
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Pillar #</th>
            {columns.map((column) => (
              <th key={column} className="border px-4 py-2">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gridData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border px-4 py-2">{rowIndex + 1}</td>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className="border px-4 py-2 text-center cursor-pointer"
                  onClick={() => handleCellChange(rowIndex, colIndex)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={saveGridData}
      >
        Save Grid Data
      </button>
    </div>
  );
}
