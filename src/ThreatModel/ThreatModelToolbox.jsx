import { For } from "solid-js";
import ThreatModelProperties from "./ThreatModelProperties";
import styles from "./ThreatModel.module.css";

const nodeTypes = [
    { name: "process", properties: [{ pid: 0 }, { user: "root" }] },
    { name: "database", properties: [{ type: "SQL" }, { port: 3450 }] },
    { name: "server", properties: [{ isSshEnabled: true }, { isRootLoginEnabled: false }, { isFirewallEnabled: true }] },
];

const edgeTypes = [
    { name: "http request", properties: [{ protocol: "https" }] }
];

export default function ThreatModelToolbox({ addNode, addEdge, selectedElement }) {

    return (
        <div class={styles.tmToolbox}>
            <For each={nodeTypes} >{(e, i) =>
                <button type="button" class={styles.tmButton} onClick={() => addNode(e, i() * 20, i() * 20)}>Add {e.name}</button>
            }</For>

            <For each={edgeTypes} >{(e, i) =>
                <button type="button" class={styles.tmButton} onClick={() => addEdge(e)}>Add {e.name}</button>
            }</For>
            <ThreatModelProperties element={selectedElement} />
        </div>
    );
}