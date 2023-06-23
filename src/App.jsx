import logo from './logo.svg';
import styles from './App.module.css';
import { onMount } from "solid-js";
import ThreatModelRenderer from './ThreatModel/ThreatModelRenderer';
import ThreatModelToolbox from './ThreatModel/ThreatModelToolbox';

function App() {
  let threatModel = new ThreatModelRenderer();
  onMount(() => {
    threatModel.initialize();
  });

  const addNodes = (e) => {
    threatModel.addNodes();
  }

  return (
    <div>
      <div class={styles.tmUIContainer}>
        <button onClick={addNodes}>Display</button>
        <div id="threat-model-container" class={styles.tmCanvasRenderer}></div>
        <ThreatModelToolbox />
      </div>
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
