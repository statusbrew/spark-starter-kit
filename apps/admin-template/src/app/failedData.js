const columns = [
  { name: "Serial No.", uid: "serial", sortable: true },
  { name: "Vehicle Number", uid: "vehicleNumber", sortable: true },
  { name: "User Name", uid: "userName", sortable: true },
  { name: "Payment Failure Error Type", uid: "errorType", sortable: true },
  { name: "Issue Description", uid: "issueDescription", sortable: true },
  { name: "Date|Time", uid: "dateTime", sortable: true },
  { name: "Status", uid: "status", sortable: false },
];

const failures = [
  {
    serial: 1,
    vehicleNumber: "ABC123",
    userName: "John Doe",
    errorType: "Card Declined",
    issueDescription: "Payment failed due to card expiration",
    dateTime: "2024-09-07 10:30 AM",
    status: "notResolved",
  },
  {
    serial: 2,
    vehicleNumber: "XYZ456",
    userName: "Jane Smith",
    errorType: "Network Error",
    issueDescription: "Payment failed due to network interruption",
    dateTime: "2024-09-07 11:00 AM",
    status: "inProcess",
  },
  {
    serial: 3,
    vehicleNumber: "LMN789",
    userName: "Alice Johnson",
    errorType: "Insufficient Funds",
    issueDescription: "Payment failed due to insufficient funds",
    dateTime: "2024-09-07 11:30 AM",
    status: "notResolved",
  },
  {
    serial: 4,
    vehicleNumber: "JKL012",
    userName: "Bob Williams",
    errorType: "Card Expired",
    issueDescription: "Payment failed due to expired card",
    dateTime: "2024-09-07 12:00 PM",
    status: "inProcess",
  },
  {
    serial: 5,
    vehicleNumber: "DEF345",
    userName: "Charlie Brown",
    errorType: "Authentication Failure",
    issueDescription: "Payment failed due to authentication error",
    dateTime: "2024-09-07 12:30 PM",
    status: "resolved",
  },
];

export { columns, failures };
