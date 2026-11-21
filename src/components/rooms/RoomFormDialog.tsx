"use client";

import { AddRoomForm } from "@/src/components/rooms/AddRoomForm";
import type { Room } from "@/src/components/rooms/room-data";

type RoomFormDialogProps = {
  existingRoomNumbers: string[];
  initialRoom?: Room;
  onCancel: () => void;
  roomNumberReadOnly?: boolean;
  onSave: (room: Room) => void;
};

export function RoomFormDialog({
  existingRoomNumbers,
  initialRoom,
  onCancel,
  roomNumberReadOnly,
  onSave,
}: RoomFormDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
      <div
        aria-label={
          initialRoom ? `Edit room ${initialRoom.roomNumber}` : "Add a room"
        }
        aria-modal="true"
        className="my-auto w-full max-w-2xl"
        role="dialog"
      >
        <AddRoomForm
          existingRoomNumbers={existingRoomNumbers}
          initialRoom={initialRoom}
          onCancel={onCancel}
          roomNumberReadOnly={roomNumberReadOnly}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
