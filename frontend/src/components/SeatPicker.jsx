import React, { useState, useEffect } from 'react';
import TesseraSeatPicker from 'tessera-seat-picker';

const Rows = [
  [
    { id: 1, number: 1, tooltip: "$30" },
    { id: 2, number: 2, tooltip: "$30" },
    { id: 3, number: 3, isReserved: false, tooltip: "$30" },
    null,
    { id: 4, number: 4, tooltip: "$30" },
    { id: 5, number: 5, tooltip: "$30" },
    { id: 6, number: 6, tooltip: "$30" }
  ],
  [
    { id: 7, number: 1, isReserved: true, tooltip: "$20" },
    { id: 8, number: 2, isReserved: true, tooltip: "$20" },
    { id: 9, number: 3, isReserved: true, tooltip: "$20" },
    null,
    { id: 10, number: 4, tooltip: "$20" },
    { id: 11, number: 5, tooltip: "$20" },
    { id: 12, number: 6, tooltip: "$20" }
  ]
];

function SeatPicker({ event_id }) {
  const [allSeats, setAllSeats] = useState([]);
  const [rowsMap, setRowsMap] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/inventory/prices/${event_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
      .then(response => response.json())
      .then(data => setAllSeats(data))
      .catch(error => console.error('Error fetching event details:', error));
  }, [event_id]);

  useEffect(() => {
    debugger
    setRowsMap(Object.values(allSeats.reduce((acc, cur) => {
      const rowId = cur.row_name;
      const seatInfo = { id: rowId + cur.seat_number, number: cur.seat_number, isReserved: (cur.status == 'AVAILABLE' ? false : true)};
      if (!acc[rowId]) {
        acc[rowId] = [seatInfo];
      } else {
        acc[rowId].push(seatInfo);
      }
      return acc;
    }, {})));

    
    setLoading(false);
  }, [allSeats]);
  console.log(rowsMap)

  // const rows = allSeats.reduce((acc, cur) => {
  //   const rowId = cur.row_name;
  //   const seatInfo = { id: rowId + cur.seat_number, number: cur.seat_number, isReserved: (cur.status == 'AVAILABLE'? false : true), tooltip: cur.value};
  //   if (!acc[rowId]) {
  //     acc[rowId] = [seatInfo];
  //   } else {
  //     acc[rowId].push(seatInfo);
  //   }
  //   return acc;
  // }, {});

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  const addSeatCallback = async ({ row, number, id }, addCb) => {
    setLoading(true);

    try {
      // Your custom logic to reserve the seat goes here...

      // Assuming everything went well...
      setSelected((prevItems) => [...prevItems, id]);
      const updateTooltipValue = 'Added to cart';

      // Important to call this function if the seat was successfully selected - it helps update the screen
      addCb(row, number, id, updateTooltipValue);
    } catch (error) {
      // Handle any errors here
      console.error('Error adding seat:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSeatCallback = async ({ row, number, id }, removeCb) => {
    setLoading(true);

    try {
      // Your custom logic to remove the seat goes here...

      setSelected((list) => list.filter((item) => item !== id));
      removeCb(row, number);
    } catch (error) {
      // Handle any errors here
      console.error('Error removing seat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    //.. A bunch of other stuff...
    <div>
      <TesseraSeatPicker
        addSeatCallback={addSeatCallback}
        removeSeatCallback={removeSeatCallback}
        rows={rowsMap}
        maxReservableSeats={3}
        alpha
        visible
        loading={loading}
      />
    </div>
  );
}

export default SeatPicker;