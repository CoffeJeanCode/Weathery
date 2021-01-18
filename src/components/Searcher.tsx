import { h } from 'preact';
import api from '../config/api';
import { useGlobalStore } from '../store/store';

export default function Searcher() {
  const [{ query }, dispatch] = useGlobalStore();

  const handleSubmit = async (
    e: h.JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();
    const { data } = await api.get(
      `weather?q=${query}&units=metric&apikey=9558b1a1b3168a18ce05956d6f03f2ba`,
    );

    dispatch({
      type: 'GET_WEATHER',
      payload: {
        temp: Math.round(data.main.temp),
        location: `${data.sys.country} ${data.name}`,
        weather: data.weather[0].main,
      },
    });
  };

  const handleChange = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    dispatch({
      type: 'SEARCH_WEATHER',
      payload: e.currentTarget.value,
    });
  };

  return (
    <form class="searcher" onSubmit={handleSubmit}>
      <input
        value={query}
        type="search"
        onInput={handleChange}
        spellcheck
        placeholder="Search your contry"
        aria-placeholder="Search your contry"
      />
    </form>
  );
}
