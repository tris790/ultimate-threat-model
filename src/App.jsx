import styles from './App.module.css';
import { onMount, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import ThreatModelToolbox from './ThreatModel/ThreatModelToolbox';
import Graph from "graphology";
import Sigma from "sigma";

const selectedHightlightColor = "#03ad91";
const typeStyles = {
	"database": "#00FF00",
	"process": "#0000FF",
	"server": "#FFFF00"
};

let graph = null;
let container = null;
let renderer = null;

let elements = [];


export default function App() {
	const [selectedElement, setSelectedElement] = createSignal({});
	const [edgeToAdd, setEdgeToAdd] = createSignal({});
	const [multiNodeSelection, setMultiNodeSelection] = createStore([]);

	onMount(() => {
		container = document.getElementById("threat-model-container");
		graph = new Graph();

		renderer = new Sigma(
			graph,
			container,
			{
				labelColor: { color: "#FF0000" },
				enableEdgeClickEvents: true,
				enableEdgeWheelEvents: true,
				enableEdgeHoverEvents: "debounce",
				edgeReducer(edge, data) {
					const res = { ...data };
					if (edge === selectedElement().key) res.color = selectedHightlightColor;
					return res;
				},
				nodeReducer(node, data) {
					const res = { ...data };
					if (node === selectedElement().key) res.color = selectedHightlightColor;
					return res;
				}
			}
		);

		// renderer.on("enterEdge", (e) => {
		// 	console.log("enterEdge", "edge", e);
		// });

		// renderer.on("leaveEdge", (e) => {
		// 	console.log("leaveEdge", "edge", e);
		// });

		renderer.on("clickEdge", (e) => {
			setSelectedElement(elements.find(x => x.key === e.edge));
		});

		renderer.on("clickNode", (e) => {
			const selectedNode = elements.find(x => x.key === e.node);
			setSelectedElement(selectedNode);

			if (edgeToAdd().selectingNodes === true) {
				console.log("adding", selectedNode);
				setMultiNodeSelection([...multiNodeSelection, selectedNode]);

				if (multiNodeSelection.length === 2) {
					const edge = edgeToAdd().edge
					console.log("adding edge", edge, "nodes", multiNodeSelection, "0", multiNodeSelection[0]);

					addEdge(edge, multiNodeSelection);
					setEdgeToAdd({ selectingNodes: false });
				}
			}
		});

		init();
	});

	const init = (e) => {
		const element1 = { name: "user", properties: [{ "first_name": "Bob" }] };
		const element2 = { name: "browser", properties: [{ which: "chrome" }, { version: "108.00" }] };
		const edge = { name: "web request", properties: [{ protocol: "https" }] };

		addNode(element1, 30, 30);
		addNode(element2, 20, 30);
	};

	const addNode = (threatModelElement, x, y) => {
		const key = graph.addNode(threatModelElement.name, { x: x, y: y, size: 20, label: threatModelElement.name, color: typeStyles[threatModelElement.name] });
		elements.push({ key, data: threatModelElement });
	};

	const addEdge = (threatModelElement, nodes) => {
		const key = graph.addEdge(nodes[0].key, nodes[1].key, { size: 10 });
		elements.push({ key, data: threatModelElement });
	};

	const startNodeSelection = (e) => {
		setMultiNodeSelection([]);
		setEdgeToAdd({ selectingNodes: true, edge: e });
	};

	return (
		<div>
			<div class={styles.tmUIContainer}>
				<div id="threat-model-container" class={styles.tmCanvasRenderer}></div>
				<ThreatModelToolbox selectedElement={selectedElement} addNode={addNode} addEdge={startNodeSelection} />
			</div>
		</div >
	);
}
