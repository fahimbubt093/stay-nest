"use client";

import { useState } from "react";
import { type Room, sampleRooms } from "@/components/rooms/room-data";
import { RoomFormDialog } from "@/components/rooms/RoomFormDialog";
import { RoomsPageHeader } from "@/components/rooms/rooms-page-header";
import { RoomsTable } from "@/components/rooms/rooms-table";

export function RoomManagement() {
  const [rooms, setRooms] = useState(sampleRooms);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);

  function closeRoomForm() {
    setIsAddingRoom(false);
    setRoomToEdit(null);
  }

  function saveRoom(room: Room) {
    if (roomToEdit) {
      setRooms((currentRooms) =>
        currentRooms.map((currentRoom) =>
          currentRoom.roomNumber === roomToEdit.roomNumber
            ? room
            : currentRoom,
        ),
      );
    } else {
      setRooms((currentRooms) => [room, ...currentRooms]);
    }

    closeRoomForm();
  }

  function deleteRoom() {
    if (!roomToDelete) {
      return;
    }

    setRooms((currentRooms) =>
      currentRooms.filter(
        (room) => room.roomNumber !== roomToDelete.roomNumber,
      ),
    );
    setRoomToDelete(null);
  }

  return (
    <>
      <RoomsPageHeader
        onAddRoom={() => {
          setRoomToEdit(null);
          setIsAddingRoom(true);
        }}
        roomCount={rooms.length}
      />
      <RoomsTable
        onDelete={setRoomToDelete}
        onEdit={(room) => {
          setIsAddingRoom(false);
          setRoomToEdit(room);
        }}
        rooms={rooms}
      />

      {(isAddingRoom || roomToEdit) && (
        <RoomFormDialog
          key={roomToEdit?.roomNumber ?? "new-room"}
          existingRoomNumbers={rooms
            .filter(
              (room) => !roomToEdit || room.roomNumber !== roomToEdit.roomNumber,
            )
            .map((room) => room.roomNumber)}
          initialRoom={roomToEdit ?? undefined}
          onCancel={closeRoomForm}
          onSave={saveRoom}
        />
      )}

      {roomToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <section
            aria-describedby="delete-room-description"
            aria-labelledby="delete-room-title"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-xl"
            role="alertdialog"
          >
            <h2
              className="text-lg font-semibold text-slate-900"
              id="delete-room-title"
            >
              Delete room {roomToDelete.roomNumber}?
            </h2>
            <p
              className="mt-2 text-sm leading-6 text-slate-500"
              id="delete-room-description"
            >
              This room will be removed from the current room list. This action
              cannot be undone.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => setRoomToDelete(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="min-h-11 rounded-xl bg-rose-600 px-5 text-sm font-semibold text-white transition hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                onClick={deleteRoom}
                type="button"
              >
                Delete Room
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
