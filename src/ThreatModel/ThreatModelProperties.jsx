import { For } from "solid-js";

export default function ThreatModelProperties({ element }) {
    const prettyPrint = (o) => {
        const result = Object.keys(o).map(k => `${k}: ${o[k]}`).join("\n");
        return result;
    };

    return (
        <div>
            <For each={element()?.data?.properties ?? []}>{(properties, i) => <div>{prettyPrint(properties)}</div>}</For>
        </div>);
}