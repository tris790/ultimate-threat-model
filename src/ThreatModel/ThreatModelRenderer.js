import Graph from "graphology";
import Sigma from "sigma";

const selectedHightlightColor = "#03ad91";

export default class ThreatModelRenderer {
    constructor() {
        this.selectedElement = null;
    }

    initialize() {
        this.container = document.getElementById("threat-model-container");
        this.graph = new Graph();

        let selectedElement = null
        this.renderer = new Sigma(
            this.graph,
            this.container,
            {
                enableEdgeClickEvents: true,
                enableEdgeWheelEvents: true,
                enableEdgeHoverEvents: "debounce",
                edgeReducer(edge, data) {
                    const res = { ...data };
                    if (edge === selectedElement) res.color = selectedHightlightColor;
                    return res;
                },
                nodeReducer(node, data) {
                    const res = { ...data };
                    console.log(res, selectedElement);
                    if (node === selectedElement) res.color = selectedHightlightColor;
                    return res;
                }
            }
        );

        this.renderer.on("enterEdge", (e) => {
            console.log("enterEdge", "edge", e);
        });

        this.renderer.on("leaveEdge", (e) => {
            console.log("leaveEdge", "edge", e);
        });

        this.renderer.on("clickEdge", (e) => {
            console.log("clickEdge", "edge", e);
            selectedElement = e.edge;
        });

        this.renderer.on("clickNode", (e) => {
            console.log("clickNode", e);
            selectedElement = e.node;
        });
    }

    addNodes() {
        this.graph.addNode("John", { x: 0, y: 10, size: 20, label: "John", color: "blue" });
        this.graph.addNode("Mary", { x: 10, y: 0, size: 20, label: "Mary", color: "red" });
        this.graph.addEdge("John", "Mary", { size: 10 });
    }

    addNode(node) {
        this.graph.addNode(node.name, node.properties);
    }

    addEdge(edge) {
        this.graph.addEdge(edge.first, edge.second);
    }
}
