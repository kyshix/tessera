import React, { useState, useEffect } from 'react';
import { Box, Card, Image, Text, VStack, Heading, LinkBox, Button, HStack } from '@chakra-ui/react';
import TesseraSeatPicker from 'tessera-seat-picker';

function SeatPicker({ user_id, event_id, updateTotal }) {
  const [allSeats, setAllSeats] = useState([]);
  const [rowsMap, setRowsMap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/inventory/prices/event/${event_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        const data = await response.json();
        setAllSeats(data);
      } catch (error) {
        console.error(`Error fetching all tickets for event: ${event_id}`, error);
      }
    };
    fetchData();
  }, [event_id]);

  useEffect(() => {
    if (allSeats.length > 0) {
      const newRowsMap = Object.values(
        allSeats.reduce((acc, cur) => {
          const rowId = cur.row_name;
          const seatInfo = {
            id: rowId + cur.seat_number,
            number: cur.seat_number,
            isReserved: cur.status !== 'AVAILABLE',
            tooltip: String('$' + cur.value.toFixed(2)),
          };
          if (!acc[rowId]) {
            acc[rowId] = [seatInfo];
          } else {
            acc[rowId].push(seatInfo);
          }
          return acc;
        }, {})
      );

      setRowsMap(newRowsMap);
      setLoading(false);
    }
  }, [allSeats]);

  const addSeatCallback = async ({ row, number, id }, addCb) => {
    setLoading(true);
    try {
      fetch(`http://localhost:5000/inventory/reserve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ row, number, event_id, user_id })
      })
        .then(setSelected((prevItems) => [...prevItems, id]))
        .then(() => updateTotal())
        .then(addCb(row, number, id, 'Added to cart'))
    } catch (error) {
      console.error('Error adding seat:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSeatCallback = async ({ row, number, id }, removeCb) => {
    setLoading(true);
    try {
      fetch(`http://localhost:5000/inventory/unreserve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ row, number, event_id, user_id })
      })
        .then(setSelected((list) => list.filter((item) => item !== id)))
        .then(() => updateTotal())
        .then(removeCb(row, number))
    } catch (error) {
      console.error('Error removing seat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <h2>No Seats Available...</h2>
      ) : (
        <Box>
          <TesseraSeatPicker
            addSeatCallback={addSeatCallback}
            removeSeatCallback={removeSeatCallback}
            rows={rowsMap}
            maxReservableSeats={3}
            alpha
            visible
            loading={loading}
            seatStyle={{backgroundColor: '#777799', borderRadius: '2px'}}
            stageStyle={{backgroundColor: 'brown'}}
          />
        </Box>
      )}
    </div>
  );
}

export default SeatPicker;