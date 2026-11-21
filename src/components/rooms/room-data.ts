export type RoomStatus = "Available" | "Booked" | "Maintenance";

export type Room = {
  roomNumber: string;
  roomType: string;
  price: number;
  capacity: number;
  status: RoomStatus;
};

export const sampleRooms: Room[] = [
  {
    roomNumber: "101",
    roomType: "Deluxe King",
    price: 140,
    capacity: 2,
    status: "Available",
  },
  {
    roomNumber: "102",
    roomType: "Deluxe Twin",
    price: 135,
    capacity: 2,
    status: "Booked",
  },
  {
    roomNumber: "103",
    roomType: "Standard Queen",
    price: 95,
    capacity: 2,
    status: "Available",
  },
  {
    roomNumber: "104",
    roomType: "Executive Suite",
    price: 220,
    capacity: 4,
    status: "Maintenance",
  },
  {
    roomNumber: "201",
    roomType: "Standard Queen",
    price: 105,
    capacity: 2,
    status: "Booked",
  },
  {
    roomNumber: "202",
    roomType: "Deluxe King",
    price: 150,
    capacity: 2,
    status: "Available",
  },
  {
    roomNumber: "203",
    roomType: "Executive Suite",
    price: 230,
    capacity: 4,
    status: "Booked",
  },
  {
    roomNumber: "204",
    roomType: "Deluxe Twin",
    price: 135,
    capacity: 2,
    status: "Available",
  },
];
