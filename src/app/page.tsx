"use client";

import { useState, type FormEvent } from "react";
import { initialHotelSettings } from "@/components/settings/settings-data";
import { sampleRooms } from "@/components/rooms/room-data";

const hotel = initialHotelSettings.profile;
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: initialHotelSettings.preferences.currency,
  maximumFractionDigits: 0,
});

const roomPresentation: Record<
  string,
  { description: string; image: string }
> = {
  "Deluxe King": {
    description:
      "A calm, spacious retreat with a king bed and thoughtful details.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85",
  },
  "Deluxe Twin": {
    description:
      "A light-filled room with twin beds, made for a comfortable shared stay.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85",
  },
  "Standard Queen": {
    description:
      "An inviting essential with a queen bed and everything you need to unwind.",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=85",
  },
  "Executive Suite": {
    description:
      "Extra room to settle in, relax, and make the most of your stay.",
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=85",
  },
};

type RoomOffer = {
  roomType: string;
  price: number;
  capacity: number;
  availableCount: number;
  description: string;
  image: string;
};

const roomOffers = Object.values(
  sampleRooms.reduce<Record<string, RoomOffer>>((offers, room) => {
    if (room.status !== "Available") {
      return offers;
    }

    const presentation = roomPresentation[room.roomType];
    const current = offers[room.roomType];
    offers[room.roomType] = {
      roomType: room.roomType,
      price: current ? Math.min(current.price, room.price) : room.price,
      capacity: Math.max(current?.capacity ?? 0, room.capacity),
      availableCount: (current?.availableCount ?? 0) + 1,
      description: presentation.description,
      image: presentation.image,
    };
    return offers;
  }, {}),
);

const heroImage =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=85";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    title: "A comfortable stay",
    description:
      "Thoughtful rooms and restful spaces make it easy to feel at home.",
    icon: "stay",
  },
  {
    title: "Restaurant & dining",
    description:
      "Take a seat and enjoy a relaxed meal, from a slow breakfast to dinner.",
    icon: "dining",
  },
  {
    title: "Spa & wellness",
    description:
      "Make a little time to reset and find a quieter pace during your stay.",
    icon: "wellness",
  },
  {
    title: "Here to help",
    description:
      "Our welcoming team is ready to help make your visit a smooth one.",
    icon: "service",
  },
] as const;

const guestReviews = [
  {
    quote:
      "A lovely, peaceful place to come back to after a busy day. The team made us feel welcome from the moment we arrived.",
    name: "A happy guest",
    location: "Dhaka",
  },
  {
    quote:
      "The room was comfortable, the booking was simple, and everything we needed was close by.",
    name: "A returning guest",
    location: "Bangladesh",
  },
  {
    quote:
      "Warm hospitality and a restful stay. We would be glad to visit again.",
    name: "A recent guest",
    location: "Bangladesh",
  },
];

function ServiceIcon({ name }: { name: (typeof services)[number]["icon"] }) {
  const paths = {
    stay: (
      <>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5.5 10v10h13V10M9 20v-6h6v6" />
      </>
    ),
    dining: (
      <>
        <path d="M7 3v7M4.5 3v4a2.5 2.5 0 0 0 5 0V3M7 9.5V21" />
        <path d="M16 3v18M16 3c3 2 4 5 4 8h-4" />
      </>
    ),
    wellness: (
      <>
        <path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" />
        <path d="M9 12h6M12 9v6" />
      </>
    ),
    service: (
      <>
        <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 13h3v6H6a2 2 0 0 1-2-2v-4ZM20 13h-3v6h1a2 2 0 0 0 2-2v-4ZM17 20a5 5 0 0 1-5 2" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("");
  const [search, setSearch] = useState<{
    guests: number;
    roomType: string;
  } | null>(null);
  const [dateError, setDateError] = useState("");

  const visibleRooms = search
    ? roomOffers.filter(
        (room) =>
          room.capacity >= search.guests &&
          (!search.roomType || room.roomType === search.roomType),
      )
    : roomOffers;

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (checkOut <= checkIn) {
      setDateError("Choose a check-out date after your check-in.");
      return;
    }

    setDateError("");
    setSearch({ guests: Number(guests), roomType });
    document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleRoomBooking(selectedRoomType: string) {
    setRoomType(selectedRoomType);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#24352f]">
      <header className="relative z-20 border-b border-[#e9e5dc] bg-[#fbfaf7]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a
            aria-label={`${hotel.hotelName} home`}
            className="flex items-center gap-3"
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1d4439] text-sm font-semibold tracking-wide text-white">
              H
            </span>
            <span className="text-lg font-semibold tracking-tight text-[#1d4439] sm:text-xl">
              {hotel.hotelName}
            </span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a
                className="text-sm font-medium text-[#53615a] transition hover:text-[#a47b43]"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className="hidden rounded-full bg-[#1d4439] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#15362d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4439] md:inline-flex"
            href="#booking"
          >
            Book now
          </a>

          <button
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dcd8ce] text-[#1d4439] md:hidden"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full border-t border-[#e9e5dc] bg-[#fbfaf7] px-5 py-4 shadow-lg md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col">
              {navigation.map((item) => (
                <a
                  className="py-3 text-sm font-medium text-[#53615a]"
                  href={item.href}
                  key={item.label}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                className="mt-2 rounded-full bg-[#1d4439] px-5 py-3 text-center text-sm font-semibold text-white"
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book now
              </a>
            </div>
          </nav>
        )}
      </header>

      <section
        className="relative isolate overflow-hidden bg-[#1d4439] bg-cover bg-center"
        id="home"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(15, 35, 29, 0.78), rgba(15, 35, 29, 0.24)), url("${heroImage}")`,
        }}
      >
        <div className="mx-auto flex min-h-[670px] max-w-7xl flex-col justify-center px-5 pb-12 pt-20 sm:px-8 sm:pb-16 lg:min-h-[720px] lg:px-10">
          <div className="max-w-2xl text-white">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#f0d7ad] sm:text-sm">
              A warm welcome in the heart of Dhaka
            </p>
            <h1 className="font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Stay a little closer to what matters.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              Find a comfortable place to pause, reconnect, and enjoy the best
              of the city with thoughtful hospitality at every turn.
            </p>
          </div>

          <form
            className="mt-12 grid gap-3 rounded-2xl bg-white p-4 shadow-2xl shadow-black/15 sm:grid-cols-2 sm:p-5 lg:grid-cols-[1fr_1fr_0.8fr_1.2fr_auto] lg:items-end lg:gap-4"
            id="booking"
            onSubmit={handleSearch}
          >
            <div className="min-w-0">
              <label
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#7b817b]"
                htmlFor="check-in"
              >
                Check-in
              </label>
              <input
                className="h-12 w-full rounded-lg border border-[#e7e5df] bg-white px-3 text-sm text-[#24352f] outline-none focus:border-[#1d4439] focus:ring-2 focus:ring-[#1d4439]/10"
                id="check-in"
                onChange={(event) => {
                  setCheckIn(event.target.value);
                  setDateError("");
                }}
                required
                type="date"
                value={checkIn}
              />
            </div>
            <div className="min-w-0">
              <label
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#7b817b]"
                htmlFor="check-out"
              >
                Check-out
              </label>
              <input
                className="h-12 w-full rounded-lg border border-[#e7e5df] bg-white px-3 text-sm text-[#24352f] outline-none focus:border-[#1d4439] focus:ring-2 focus:ring-[#1d4439]/10"
                id="check-out"
                min={checkIn || undefined}
                onChange={(event) => {
                  setCheckOut(event.target.value);
                  setDateError("");
                }}
                required
                type="date"
                value={checkOut}
              />
            </div>
            <div className="min-w-0">
              <label
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#7b817b]"
                htmlFor="guests"
              >
                Guests
              </label>
              <select
                className="h-12 w-full rounded-lg border border-[#e7e5df] bg-white px-3 text-sm text-[#24352f] outline-none focus:border-[#1d4439] focus:ring-2 focus:ring-[#1d4439]/10"
                id="guests"
                onChange={(event) => setGuests(event.target.value)}
                value={guests}
              >
                {[1, 2, 3, 4].map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#7b817b]"
                htmlFor="room-type"
              >
                Room type
              </label>
              <select
                className="h-12 w-full rounded-lg border border-[#e7e5df] bg-white px-3 text-sm text-[#24352f] outline-none focus:border-[#1d4439] focus:ring-2 focus:ring-[#1d4439]/10"
                id="room-type"
                onChange={(event) => setRoomType(event.target.value)}
                value={roomType}
              >
                <option value="">Any room type</option>
                {roomOffers.map((room) => (
                  <option key={room.roomType} value={room.roomType}>
                    {room.roomType}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="h-12 rounded-lg bg-[#a47b43] px-6 text-sm font-semibold text-white transition hover:bg-[#8e6837] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a47b43] sm:col-span-2 lg:col-span-1"
              type="submit"
            >
              Search rooms
            </button>
            {dateError && (
              <p className="text-sm text-red-700 sm:col-span-2 lg:col-span-5" role="alert">
                {dateError}
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-10">
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-[#e6e3d9] sm:min-h-[460px]">
          <div
            aria-label="A peaceful hotel pool surrounded by greenery"
            className="absolute inset-0 bg-cover bg-center"
            role="img"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85")',
            }}
          />
          <div className="absolute bottom-5 left-5 rounded-xl bg-white/95 px-5 py-4 shadow-lg sm:bottom-7 sm:left-7">
            <p className="text-sm font-semibold text-[#1d4439]">
              Thoughtful stays, made personal
            </p>
            <p className="mt-1 text-xs text-[#737b74]">
              Your welcome starts here
            </p>
          </div>
        </div>
        <div id="about">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a47b43]">
            Welcome to {hotel.hotelName}
          </p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-[#1d4439] sm:text-5xl">
            A familiar feeling, wherever the day takes you.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#647069]">
            Whether you are visiting for work, exploring the city, or simply
            taking time away, we want your stay to feel easy from the moment you
            arrive. Settle into a comfortable room, enjoy a thoughtful meal, and
            let our friendly team take care of the details.
          </p>
          <a
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1d4439] transition hover:text-[#a47b43]"
            href="#services"
          >
            Discover our hospitality <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="bg-[#f1efe8] px-5 py-20 sm:px-8 sm:py-24 lg:px-10" id="services">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a47b43]">
              The little things matter
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[#1d4439] sm:text-5xl">
              Everything for a better stay
            </h2>
            <p className="mt-4 text-base leading-7 text-[#647069]">
              A few thoughtful comforts make all the difference.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                className="rounded-2xl border border-[#e5e1d7] bg-[#fbfaf7] p-6 sm:p-7"
                key={service.title}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7ede7] text-[#1d4439]">
                  <ServiceIcon name={service.icon} />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-[#24352f]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#707a73]">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10" id="rooms">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a47b43]">
              Find your place
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[#1d4439] sm:text-5xl">
              Rooms for slowing down
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#647069]">
              Choose a room that feels right, with comfort and a good night&apos;s
              rest waiting at the end of the day.
            </p>
          </div>
          <a
            className="shrink-0 text-sm font-semibold text-[#1d4439] underline decoration-[#a47b43] decoration-2 underline-offset-4"
            href="#booking"
          >
            Plan your stay
          </a>
        </div>

        {search && (
          <p className="mt-7 text-sm text-[#647069]" role="status">
            {visibleRooms.length > 0
              ? `Showing room types for ${search.guests} ${
                  search.guests === 1 ? "guest" : "guests"
                }.`
              : "No room types match those preferences. Try a different guest count or room type."}
          </p>
        )}

        <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleRooms.map((room) => (
            <article
              className="overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-sm"
              key={room.roomType}
            >
              <div
                aria-label={`${room.roomType} hotel room`}
                className="h-60 bg-cover bg-center"
                role="img"
                style={{ backgroundImage: `url("${room.image}")` }}
              />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#24352f]">
                      {room.roomType}
                    </h3>
                    <p className="mt-1 text-sm text-[#7b817b]">
                      Up to {room.capacity} guests
                    </p>
                  </div>
                  <p className="shrink-0 text-right">
                    <span className="block text-lg font-semibold text-[#1d4439]">
                      {currency.format(room.price)}
                    </span>
                    <span className="text-xs text-[#7b817b]">from / night</span>
                  </p>
                </div>
                <p className="mt-4 min-h-12 text-sm leading-6 text-[#707a73]">
                  {room.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#efede7] pt-5">
                  <span className="text-xs text-[#7b817b]">
                    {room.availableCount}{" "}
                    {room.availableCount === 1 ? "room" : "rooms"} currently listed
                  </span>
                  <button
                    className="rounded-full border border-[#1d4439] px-4 py-2 text-sm font-semibold text-[#1d4439] transition hover:bg-[#1d4439] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4439]"
                    onClick={() => handleRoomBooking(room.roomType)}
                    type="button"
                  >
                    Book now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#1d4439] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e2c697]">
              The {hotel.hotelName} difference
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Thoughtful hospitality, from check-in to goodnight.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              We believe a great stay is made of simple things done well:
              welcoming people, comfortable rooms, and time to enjoy your visit.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {[
              {
                title: "Comfort you can count on",
                text: "A restful place to recharge, with the essentials taken care of.",
              },
              {
                title: "A genuinely warm welcome",
                text: "Friendly people who are happy to help make your visit easier.",
              },
              {
                title: "Simple, convenient booking",
                text: "Find a room and plan your stay without any fuss.",
              },
              {
                title: "A place to enjoy",
                text: "Relax, share a meal, and make time for the things that matter.",
              },
            ].map((reason, index) => (
              <div className="border-t border-white/20 pt-5" key={reason.title}>
                <span className="text-sm font-semibold text-[#e2c697]">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{reason.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {reason.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a47b43]">
            Kind words from our guests
          </p>
          <h2 className="mt-4 font-serif text-4xl text-[#1d4439] sm:text-5xl">
            A stay worth remembering
          </h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {guestReviews.map((review) => (
            <figure
              className="flex flex-col rounded-2xl border border-[#e9e5dc] bg-white p-6 sm:p-8"
              key={review.name}
            >
              <div aria-label="5 out of 5 stars" className="text-sm tracking-[0.2em] text-[#b3884d]">
                ★★★★★
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-7 text-[#526159]">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-7 border-t border-[#efede7] pt-5">
                <span className="block text-sm font-semibold text-[#24352f]">
                  {review.name}
                </span>
                <span className="mt-1 block text-xs text-[#7b817b]">
                  {review.location} · Sample review
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="bg-[#172f28] px-5 py-14 text-white sm:px-8 lg:px-10" id="contact">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr]">
          <div>
            <a className="text-xl font-semibold" href="#home">
              {hotel.hotelName}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
              A comfortable city stay, thoughtful hospitality, and a warm
              welcome whenever you need a place to feel at home.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#e2c697]">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    className="text-sm text-white/70 transition hover:text-white"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#e2c697]">
              Get in touch
            </h2>
            <address className="mt-4 space-y-3 text-sm not-italic leading-6 text-white/70">
              <p>{hotel.address}</p>
              <p>
                <a className="hover:text-white" href={`tel:${hotel.phone}`}>
                  {hotel.phone}
                </a>
              </p>
              <p>
                <a className="break-all hover:text-white" href={`mailto:${hotel.email}`}>
                  {hotel.email}
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {hotel.hotelName}. All rights reserved.</p>
          <a className="hover:text-white" href="/login">
            Staff sign in
          </a>
        </div>
      </footer>
    </main>
  );
}
