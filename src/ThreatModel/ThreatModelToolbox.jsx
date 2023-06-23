import styles from "./ThreatModel.module.css";

export default function ThreatModelToolbox() {
    return (
        <div class={styles.tmToolbox}>
            <button type="button">Add Node</button>
            <button type="button">Add Link</button>
            <button type="button">Add Node</button>
        </div>
    );
}