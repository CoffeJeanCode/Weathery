import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import Searcher from './components/Searcher';
import WeatherInfo from './components/WeatherInfo';
import { useGlobalStore } from './store/store';

function App() {
  const [store] = useGlobalStore();
  const tempCondition = useMemo(() => (store.temp > 16 ? 'warm' : 'cold'), [
    store.temp,
  ]);
  return (
    <div className={`main__wrapper cold ${tempCondition}`}>
      <main class={`app cold ${tempCondition}`}>
        <Searcher />
        <WeatherInfo />
      </main>
    </div>
  );
}

export default App;
