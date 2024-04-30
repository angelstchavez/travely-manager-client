import React, { useState, useEffect } from "react";
import SeatStatusCounts from "../utils/sale/seat-counter";
import Bus from "../utils/sale/bus";
import TripDetails from "../utils/sale/trip-detail";
import SelectedSeatsDisplay from "../utils/sale/selected-seat";
import TotalSale from "../utils/sale/total-sale";

interface Seat {
  id: string;
  number: number;
}

interface Props {
  onSelectSeats: (seats: Seat[]) => void;
  tripId: number;
  onCanContinueChange: (canContinue: boolean) => void;
}

const SeatSelectionForm: React.FC<Props> = ({
  onSelectSeats,
  tripId,
  onCanContinueChange,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  useEffect(() => {
    const canContinue = selectedSeats.length > 0;
    onCanContinueChange(canContinue);
    onSelectSeats(selectedSeats);
  }, [selectedSeats, onCanContinueChange, onSelectSeats]);

  const handleSelectedSeatsChange = (newSelectedSeat: Seat) => {
    if (selectedSeats.length < 5) {
      setSelectedSeats((prevSelectedSeats) => {
        const existingIndex = prevSelectedSeats.findIndex(
          (seat) => seat.id === newSelectedSeat.id
        );
        if (existingIndex !== -1) {
          return prevSelectedSeats.filter(
            (_, index) => index !== existingIndex
          );
        } else {
          return [...prevSelectedSeats, newSelectedSeat];
        }
      });
    } else {
      if (selectedSeats.some((seat) => seat.id === newSelectedSeat.id)) {
        setSelectedSeats((prevSelectedSeats) =>
          prevSelectedSeats.filter((seat) => seat.id !== newSelectedSeat.id)
        );
      } else {
        alert("Solo puedes seleccionar 5 asientos como máximo.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center p-2">
      <div className="flex flex-col sm:flex-row gap-2 p-2">
        <div className="overflow-hidden md:w-[300px] lg:w-[300px]">
          <SeatStatusCounts tripId={tripId} />
          <Bus
            tripId={tripId}
            onSelectedSeatsChange={(selectedSeatData) =>
              handleSelectedSeatsChange(selectedSeatData)
            }
          />
        </div>
        <div className="overflow-hidden flex-grow">
          <TripDetails tripId={tripId} />
          <div className="overflow-hidden flex-grow">
            <SelectedSeatsDisplay selectedSeatIds={selectedSeats} />
          </div>
          <div className="mt-2">
            <TotalSale tripId={tripId} count={selectedSeats.length} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionForm;
