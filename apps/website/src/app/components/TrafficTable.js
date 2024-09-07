"use client";
import React, { useState } from "react";
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
  Chip,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { columns, vehicles as initialVehicles } from "../data"; // Renaming vehicles to initialVehicles
import { capitalize } from "../utils";

const statusColorMap = {
  active: "bg-green-200 text-green-700",
  inactive: "bg-red-200 text-red-700",
  parked: "bg-yellow-200 text-yellow-700",
};

const INITIAL_VISIBLE_COLUMNS = ["serial", "vehicleNumber", "name", "status", "spot", "fee", "vehicleType", "dateTime"];

export default function TrafficTable() {
  const [vehicles, setVehicles] = useState(initialVehicles); // State to hold vehicles data
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "serial",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredVehicles = [...vehicles];

    if (hasSearchFilter) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredVehicles;
  }, [vehicles, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];

      if (typeof first === "string") {
        const cmp = first.localeCompare(second);
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      } else {
        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
    });
  }, [sortDescriptor, items]);

  const handleDelete = (serial) => {
    // Filter out the vehicle with the matching serial number
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.serial !== serial);
    setVehicles(updatedVehicles);
  };

  const renderCell = React.useCallback((vehicle, columnKey) => {
    const cellValue = vehicle[columnKey];

    switch (columnKey) {
      case "name":
        return <span className="capitalize">{cellValue}</span>;
      case "status":
        return (
          <span className={`px-2 py-1 rounded-lg ${statusColorMap[vehicle.status]}`}>
            {capitalize(cellValue)}
          </span>
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
                <DropdownItem onClick={() => handleDelete(vehicle.serial)}>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return <span>{cellValue}</span>;
    }
  }, [vehicles]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-5 mt-16 self-start ml-20">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </span>
          <Input
            placeholder="Search by name..."
            onValueChange={onSearchChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <Table
          aria-label="Parking vehicle table"
          isHeaderSticky
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          className="min-w-[900px] w-full bg-white rounded-lg shadow-md"
        >
          <TableHeader columns={columns}>
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
          <TableBody emptyContent={"No vehicles found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.serial} className="hover:bg-gray-50">
                {(columnKey) => (
                  <TableCell className="px-4 py-2 text-sm text-gray-600">
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
          onClick={onPreviousPage}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:bg-gray-100"
        >
          Previous
        </Button>
        {Array.from({ length: pages }).map((_, index) => (
          <Button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 rounded ${page === index + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          disabled={page === pages}
          onClick={onNextPage}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:bg-gray-100"
        >
          Next
        </Button>
      </div>
    </>
  );
}
