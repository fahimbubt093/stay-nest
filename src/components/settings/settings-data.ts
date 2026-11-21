export type HotelProfile = {
  hotelName: string;
  address: string;
  phone: string;
  email: string;
};

export type CurrencyCode = "USD" | "BDT";
export type TimeZone = "Asia/Dhaka" | "UTC";

export type SystemPreferences = {
  currency: CurrencyCode;
  timeZone: TimeZone;
  emailNotifications: boolean;
};

export type HotelSettings = {
  profile: HotelProfile;
  preferences: SystemPreferences;
};

export const initialHotelSettings: HotelSettings = {
  profile: {
    hotelName: "HotelPro Downtown",
    address: "12 Lake Road, Dhanmondi, Dhaka 1205",
    phone: "+880 2-55000000",
    email: "info@hotelpro.example.com",
  },
  preferences: {
    currency: "USD",
    timeZone: "Asia/Dhaka",
    emailNotifications: true,
  },
};
