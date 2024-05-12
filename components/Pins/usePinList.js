import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { getAddressCoordinates } from '../utils/config';

const usePinList = () => {
  const [pinsWithCoordinates, setPinsWithCoordinates] = useState([]);

  useEffect(() => {
    const fetchPinsData = async () => {
      try {
        // Fetch pins data from Supabase
        const { data, error } = await supabase.from('pins').select('*');

        if (error) {
          // Handle error if fetching data fails
          console.error('Error fetching pins data:', error.message);
        } else {
          // Fetch coordinates for each pin
          const pinsWithData = await Promise.all(data.map(async (pin) => {
            const coordinates = await getAddressCoordinates(pin.location);
            return { ...pin, coordinates };
          }));
          setPinsWithCoordinates(pinsWithData);

          // Log the fetched pins data with coordinates
         console.log('Pins with coordinates:', pinsWithData);
        }
      } catch (error) {
        // Handle unexpected errors
    //    console.error('Unexpected error:', error.message);
      }
    };

    // Call fetchPinsData function when the component mounts
    fetchPinsData();
  }, []);

  return pinsWithCoordinates;
};

export default usePinList;
