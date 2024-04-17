function dijkstra(graph, start) {
    const distances = {};
    const visited = {};
    const queue = [];

    // Initialize distances with Infinity for all vertices except the start vertex
    for (let vertex in graph) {
        distances[vertex] = vertex === start ? 0 : Infinity;
        queue.push(vertex);
    }

    while (queue.length > 0) {
        // Find vertex with the minimum distance in the queue
        let minDistanceVertex = queue.reduce((minVertex, vertex) => {
            return (!minVertex || distances[vertex] < distances[minVertex]) ? vertex : minVertex;
        }, null);

        // Remove the vertex with minimum distance from the queue
        queue.splice(queue.indexOf(minDistanceVertex), 1);

        // Update distances for adjacent vertices
        for (let neighbor in graph[minDistanceVertex]) {
            let distance = distances[minDistanceVertex] + graph[minDistanceVertex][neighbor];
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
            }
        }
    }

    return distances;
}

// Example usage:
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A')); // Output: { 'A': 0, 'B': 4, 'C': 2, 'D': 5 }
