export default function aStar(startNode, endNode) {
  let openSet = [];
  const closedSet = [];
  const path = [];
  const visitedNodes = [];

  openSet.push(startNode);

  while (openSet.length > 0) {
    let leastIndex = 0;

    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }

    const current = openSet[leastIndex];
    visitedNodes.push(current);

    if (current === endNode) {
      let temp = current;
      path.push(current);

      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }

      return { path, visitedNodes };
    }

    /* 기존 방문노드는 close set으로 옮기고, open set에서는 삭제 */
    openSet = openSet.filter((element) => element !== current);
    closedSet.push(current);

    /* 
    이웃 노드 중 close set에 이미 포함되면 제외 
    open set에 이미 포함된 경우, g값을 비교하여 낮은 값으로 갱신
    아닌 경우 open set에 포함
    */
    const { neighbors } = current;
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.isWall) {
        const temp_g = current.g + 1;
        let newPath = false;

        if (openSet.includes(neighbor)) {
          if (temp_g < neighbor.g) {
            neighbor.g = temp_g;
            newPath = true;
          }
        } else {
          neighbor.g = temp_g;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, endNode);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }

  return { path, visitedNodes, error: "Path not found" };
}

const heuristic = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

/* [Answer]  
  let openSet = [];
  const closedSet = [];
  openSet.push(startSpot);

  while (openSet.length > 0) {
    let leastIndex = 0;

    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }

    const current = openSet[leastIndex];
    visitedNodes.push(current);

    if (current.x === endSpot.x && current.y === endSpot.y) {				console.log(current);
      let temp = current;
      output.push(current);
      while (temp.previous) {
        output.push(temp.previous);
        temp = temp.previous;
      }

      return;
    }

    openSet = openSet.filter((element) => !isObjEqual(element, current));
    closedSet.push(current);

    const { neighbors } = current;
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (!includes(closedSet, neighbor) && !neighbor.isWall) {
        const temp_g = current.g + 1;
        let newPath = false;

        if (includes(openSet, neighbor)) {
          if (temp_g < neighbor.g) {
            neighbor.g = temp_g;
            newPath = true;
          }
        } else {
          neighbor.g = temp_g;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, endSpot);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }
*/
