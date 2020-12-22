import { h } from 'preact';
import { useGlobalStore } from '../store/store';

export default function Searcher() {
  const [store, dispatch] = useGlobalStore();

  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${
        store.query
      }&units=metric&apikey=${'9558b1a1b3168a18ce05956d6f03f2ba'}`,
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'GET_WEATHER',
          payload: {
            temp: `${Math.round(data.main.temp)} °C`,
            location: `${data.sys.country} ${data.name}`,
            weather: data.weather[0].main,
          },
        });
      });
  };

  const handleChange = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    dispatch({
      type: 'SEARCH_WEATHER',
      payload: e.target.value,
    });
  };

  return (
    <form class="searcher" onSubmit={(e) => handleSubmit(e)}>
      <input
        value={store.query}
        type="search"
        onInput={handleChange}
        placeholder="Search your contry"
        aria-placeholder="Search your contry"
      />
    </form>
  );
}
