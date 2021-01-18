import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useGlobalStore } from '../store/store';
import api from '../config/api';

const dateBuilder = (rawdate: Date) => {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let date = rawdate.getDate();
  let year = rawdate.getFullYear();
  let day = days[rawdate.getDay()];
  let month = months[rawdate.getMonth()];

  return `${day} ${date} ${month} ${year}`;
};

const WeatherInfo = () => {
  const [store, dispatch] = useGlobalStore();
  useEffect(() => {
    (async () => {
      const { data } = await api.get(
        `weather?q=${store.query}&units=metric&apikey=9558b1a1b3168a18ce05956d6f03f2ba`,
      );

      dispatch({
        type: 'GET_WEATHER',
        payload: {
          temp: Math.round(data.main.temp),
          location: `${data.sys.country} ${data.name}`,
          weather: data.weather[0].main,
        },
      });
    })();
  }, []);

  return (
    <div class="weather__info">
      <h2>{store.temp} °C</h2>
      <h3>{store.weather}</h3>
      <h4 className="location">{store.location}</h4>
      <p className="date">{dateBuilder(store.date)}</p>
    </div>
  );
};

export default WeatherInfo;
