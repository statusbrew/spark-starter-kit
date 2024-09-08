// "use client";
// import React, { useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Input,
//   Button,
//   DropdownTrigger,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
// } from "@nextui-org/react";
// import { VerticalDotsIcon } from "./VerticalDotsIcon";
// import { SearchIcon } from "./SearchIcon";
// import { columns as tableColumns, failures as initialFailures } from "../failedData"; // Import from failedData.js
// import { capitalize } from "../../../../website/src/app/utils";

// // Status Color Map for issue resolution
// const statusColorMap = {
//   resolved: "bg-green-200 text-green-700",
//   inProcess: "bg-yellow-200 text-yellow-700",
//   notResolved: "bg-red-200 text-red-700",
// };

// export default function SystemFailuresTable() {
//   const [failures, setFailures] = useState(initialFailures); // State to hold failures data
//   const [filterValue, setFilterValue] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [sortDescriptor, setSortDescriptor] = useState({
//     column: "serial",
//     direction: "ascending",
//   });
//   const [page, setPage] = useState(1);

//   const filteredItems = React.useMemo(() => {
//     if (filterValue) {
//       return failures.filter((failure) =>
//         failure.userName.toLowerCase().includes(filterValue.toLowerCase())
//       );
//     }
//     return failures;
//   }, [failures, filterValue]);

//   const pages = Math.ceil(filteredItems.length / rowsPerPage);
//   const items = React.useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     return filteredItems.slice(start, end);
//   }, [page, filteredItems, rowsPerPage]);

//   const sortedItems = React.useMemo(() => {
//     return items.sort((a, b) => {
//       const first = a[sortDescriptor.column];
//       const second = b[sortDescriptor.column];

//       if (typeof first === "string") {
//         const cmp = first.localeCompare(second);
//         return sortDescriptor.direction === "descending" ? -cmp : cmp;
//       }
//       const cmp = first < second ? -1 : first > second ? 1 : 0;
//       return sortDescriptor.direction === "descending" ? -cmp : cmp;
//     });
//   }, [sortDescriptor, items]);

//   const handleResolve = (serial) => {
//     fetch(`/api/resolve-issue/${serial}`, { method: "POST" }) // Simulated API call
//       .then((response) => response.json())
//       .then(() => {
//         const updatedFailures = failures.map((failure) =>
//           failure.serial === serial ? { ...failure, status: "resolved" } : failure
//         );
//         setFailures(updatedFailures);
//       })
//       .catch((error) => {
//         console.error("Error resolving issue:", error);
//       });
//   };

//   const handleDelete = (serial) => {
//     const updatedFailures = failures.filter((failure) => failure.serial !== serial);
//     setFailures(updatedFailures);
//   };

//   const renderCell = React.useCallback((failure, columnKey) => {
//     const cellValue = failure[columnKey];

//     switch (columnKey) {
//       case "userName":
//         return <span className="capitalize">{cellValue}</span>;
//       case "status":
//         return (
//           <div className="flex items-center justify-between gap-2">
//             <span className={`px-2 py-1 rounded-lg ${statusColorMap[failure.status]}`}>
//               {capitalize(failure.status)}
//             </span>
//             {failure.status !== "resolved" && (
//               <Button
//                 size="sm"
//                 onPress={() => handleResolve(failure.serial)}
//                 className="bg-blue-500 text-white hover:bg-blue-600"
//               >
//                 Resolve
//               </Button>
//             )}
//           </div>
//         );
//       case "actions":
//         return (
//           <div className="relative flex justify-end items-center gap-2">
//             <Dropdown>
//               <DropdownTrigger>
//                 <Button isIconOnly size="sm" variant="light" className="text-gray-600">
//                   <VerticalDotsIcon />
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu>
//                 <DropdownItem onClick={() => handleDelete(failure.serial)}>Delete</DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         );
//       default:
//         return <span>{cellValue}</span>;
//     }
//   }, [failures]);

//   return (
//     <div className="w-11/12 my-[2rem]">
//       <div className="flex items-center justify-between mb-5 mt-16 self-start ml-6">
//         <div className="relative">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//             <SearchIcon className="w-5 h-5 text-gray-400" />
//           </span>
//           <Input
//             placeholder="Search by user name..."
//             onValueChange={(e) => setFilterValue(e.target.value)}
//             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto w-full">
//         <Table
//           aria-label="System failures table"
//           isHeaderSticky
//           sortDescriptor={sortDescriptor}
//           onSortChange={setSortDescriptor}
//           className="min-w-[900px] w-full bg-white rounded-lg shadow-md"
//         >
//           <TableHeader columns={tableColumns}>
//             {(column) => (
//               <TableColumn
//                 key={column.uid}
//                 align={column.uid === "actions" ? "center" : "start"}
//                 allowsSorting={column.sortable}
//                 className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
//               >
//                 {column.name}
//               </TableColumn>
//             )}
//           </TableHeader>
//           <TableBody emptyContent={"No issues found"} items={sortedItems}>
//             {(item) => (
//               <TableRow key={item.serial} className="hover:bg-gray-50">
//                 {(columnKey) => (
//                   <TableCell key={columnKey} className="px-4 py-2 text-sm text-gray-600">
//                     {renderCell(item, columnKey)}
//                   </TableCell>
//                 )}
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex justify-center mt-5 gap-2">
//         <Button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//           className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:bg-gray-100"
//         >
//           Previous
//         </Button>
//         {Array.from({ length: pages }).map((_, index) => (
//           <Button
//             key={index}
//             onClick={() => setPage(index + 1)}
//             className={`px-3 py-1 rounded ${
//               page === index + 1 ? "bg-purple-600 text-white" : "bg-gray-200 hover:bg-gray-300"
//             }`}
//           >
//             {index + 1}
//           </Button>
//         ))}
//         <Button
//           disabled={page === pages}
//           onClick={() => setPage(page + 1)}
//           className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:bg-gray-100"
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { columns as tableColumns } from "../failedData"; // Still using columns from local file for table structure
import { capitalize } from "../../../../website/src/app/utils";

// Status Color Map for issue resolution
const statusColorMap = {
  resolved: "bg-green-200 text-green-700",
  inProcess: "bg-yellow-200 text-yellow-700",
  notResolved: "bg-red-200 text-red-700",
};

export default function SystemFailuresTable() {
  const [failures, setFailures] = useState([]); // State to hold failures data fetched from the API
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "serial",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchFailures = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/register/getAdminSystemCrashes");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFailures(data); // Set the fetched data
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setError(error.message); // Handle error
        setLoading(false); // Stop loading on error
      }
    };

    fetchFailures();
  }, []);

  const filteredItems = React.useMemo(() => {
    if (filterValue) {
      return failures.filter((failure) =>
        failure.userName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return failures;
  }, [failures, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return items.sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];

      if (typeof first === "string") {
        const cmp = first.localeCompare(second);
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleResolve = (serial) => {
    fetch(`/api/resolve-issue/${serial}`, { method: "POST" }) // Simulated API call
      .then((response) => response.json())
      .then(() => {
        const updatedFailures = failures.map((failure) =>
          failure.serial === serial ? { ...failure, status: "resolved" } : failure
        );
        setFailures(updatedFailures);
      })
      .catch((error) => {
        console.error("Error resolving issue:", error);
      });
  };

  const handleDelete = (serial) => {
    const updatedFailures = failures.filter((failure) => failure.serial !== serial);
    setFailures(updatedFailures);
  };

  const renderCell = React.useCallback((failure, columnKey) => {
    const cellValue = failure[columnKey];

    switch (columnKey) {
      case "userName":
        return <span className="capitalize">{cellValue}</span>;
      case "status":
        return (
          <div className="flex items-center justify-between gap-2">
            <span className={`px-2 py-1 rounded-lg ${statusColorMap[failure.status]}`}>
              {capitalize(failure.status)}
            </span>
            {failure.status !== "resolved" && (
              <Button
                size="sm"
                onPress={() => handleResolve(failure.serial)}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Resolve
              </Button>
            )}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light" className="text-gray-600">
                  <VerticalDotsIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => handleDelete(failure.serial)}>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return <span>{cellValue}</span>;
    }
  }, [failures]);

  // Show loading state while fetching data
  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  // Show error if the API call fails
  if (error) {
    return <div className="flex justify-center items-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-11/12 my-[2rem]">
      <div className="flex items-center justify-between mb-5 mt-16 self-start ml-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </span>
          <Input
            placeholder="Search by user name..."
            onValueChange={(e) => setFilterValue(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <Table
          aria-label="System failures table"
          isHeaderSticky
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          className="min-w-[900px] w-full bg-white rounded-lg shadow-md"
        >
          <TableHeader columns={tableColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No issues found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.serial} className="hover:bg-gray-50">
                {(columnKey) => (
                  <TableCell key={columnKey} className="px-4 py-2 text-sm text-gray-600">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center mt-5 gap-2">
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:bg-gray-100"
        >
          Previous
        </Button>
        {Array.from({ length: pages }).map((_, index) => (
          <Button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 rounded ${
              page === index + 1 ? "bg-purple-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:bg-gray-100"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
