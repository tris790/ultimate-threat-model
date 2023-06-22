import logo from './logo.svg';
import styles from './App.module.css';
import { onMount } from "solid-js";
import ThreatModelRenderer from './ThreatModel/ThreatModelRenderer';

function App() {
  let threatModel = new ThreatModelRenderer();
  onMount(() => {
    threatModel.initialize();
  });

  const addNodes = (e) => {
    threatModel.addNodes();
  }

  return (
    <div class={styles.App}>
      <button onClick={addNodes}>Add nodes</button>
      <div id="threat-model-container" class={styles.tmcontainer}></div>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div >
  );
}

export default App;
