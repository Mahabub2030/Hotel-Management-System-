import PropTypes from "prop-types";
import Button from "../Shared/Button/Button";
import { DateRange } from "react-date-range";
import { useState } from "react";

const RoomReservation = ({ room }) => {
console.log('Start Date --->', new Date(room.from).toLocaleDateString())
console.log('Ends Date --->', new Date(room.to).toLocaleDateString())
  const [state, setState] = useState([
    {
      startDate: new Date(room.from),
      endDate: new Date(room.to),
      key: "selection",
    },
  ]);

  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {room?.price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        {/* Calender */}

        <DateRange
          rangeColors={['#F4405F']}
          showDateDisplay={false}
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
      <hr />
      <div className="p-4">
        <Button label={"Reserve"} />
      </div>
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${room?.price}</div>
      </div>
    </div>
  );
};

RoomReservation.propTypes = {
  room: PropTypes.object,
};

export default RoomReservation;
