CREATE DATABASE IF NOT EXISTS hotel_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE hotel_management;

CREATE TABLE IF NOT EXISTS rooms (
  room_number VARCHAR(10) PRIMARY KEY,
  room_type VARCHAR(80) NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  capacity TINYINT UNSIGNED NOT NULL,
  status ENUM('Available', 'Booked', 'Maintenance') NOT NULL DEFAULT 'Available',
  CHECK (price_per_night > 0),
  CHECK (capacity > 0)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS customers (
  customer_id VARCHAR(20) PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  address VARCHAR(255) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS bookings (
  booking_id VARCHAR(20) PRIMARY KEY,
  customer_id VARCHAR(20) NOT NULL,
  room_number VARCHAR(10) NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  number_of_guests TINYINT UNSIGNED NOT NULL,
  status ENUM('Confirmed', 'Pending', 'Cancelled') NOT NULL DEFAULT 'Pending',
  CONSTRAINT fk_bookings_customers
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_bookings_rooms
    FOREIGN KEY (room_number) REFERENCES rooms (room_number)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CHECK (check_out > check_in),
  CHECK (number_of_guests > 0)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS payments (
  payment_id VARCHAR(20) PRIMARY KEY,
  booking_id VARCHAR(20) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('Cash', 'Card', 'Bank Transfer') NOT NULL,
  payment_date DATE NOT NULL,
  status ENUM('Completed', 'Pending', 'Failed') NOT NULL DEFAULT 'Pending',
  CONSTRAINT fk_payments_bookings
    FOREIGN KEY (booking_id) REFERENCES bookings (booking_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CHECK (amount > 0)
) ENGINE = InnoDB;

INSERT INTO rooms (room_number, room_type, price_per_night, capacity, status)
VALUES
  ('101', 'Deluxe King', 140.00, 2, 'Available'),
  ('102', 'Deluxe Twin', 135.00, 2, 'Booked'),
  ('103', 'Standard Queen', 95.00, 2, 'Available');

INSERT INTO customers (customer_id, full_name, phone, email, address)
VALUES
  (
    'CUS-1001',
    'Rahim Ahmed',
    '+880 1712-345678',
    'rahim.ahmed@example.com',
    '12 Lake Road, Dhanmondi, Dhaka'
  ),
  (
    'CUS-1002',
    'Karim Hasan',
    '+880 1812-456789',
    'karim.hasan@example.com',
    '24 Station Road, Sylhet'
  ),
  (
    'CUS-1003',
    'Nusrat Jahan',
    '+880 1912-567890',
    'nusrat.jahan@example.com',
    '8 College Street, Chattogram'
  );

INSERT INTO bookings (
  booking_id,
  customer_id,
  room_number,
  check_in,
  check_out,
  number_of_guests,
  status
)
VALUES
  ('BK-1001', 'CUS-1001', '101', '2026-11-19', '2026-11-22', 2, 'Confirmed'),
  ('BK-1002', 'CUS-1002', '102', '2026-11-19', '2026-11-23', 1, 'Pending'),
  ('BK-1003', 'CUS-1003', '103', '2026-11-20', '2026-11-24', 2, 'Confirmed');

-- Customer details are available through the related booking.
INSERT INTO payments (
  payment_id,
  booking_id,
  amount,
  payment_method,
  payment_date,
  status
)
VALUES
  ('PMT-1001', 'BK-1001', 240.00, 'Card', '2026-11-18', 'Completed'),
  ('PMT-1002', 'BK-1002', 180.00, 'Cash', '2026-11-19', 'Pending'),
  (
    'PMT-1003',
    'BK-1003',
    320.00,
    'Bank Transfer',
    '2026-11-19',
    'Completed'
  );
