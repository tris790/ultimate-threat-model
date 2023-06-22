import Graph from "graphology";
import Sigma from "sigma";

export default class ThreatModelRenderer {
    constructor() {
    }

    initialize() {
        this.container = document.getElementById("threat-model-container");
        this.graph = new Graph();
        this.renderer = new Sigma(this.graph, this.container);
    }

    addNodes() {
        this.graph.addNode("John", { x: 0, y: 10, size: 5, label: "John", color: "blue" });
        this.graph.addNode("Mary", { x: 10, y: 0, size: 3, label: "Mary", color: "red" });
        this.graph.addEdge("John", "Mary");
    }
}
