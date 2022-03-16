import { createSpot, createWall, updateNeighbors } from "../componenets/Pathfind/Pathfind";
import {
  COLUMNS,
  ROWS,
  NODE_END_COL,
  NODE_END_ROW,
  NODE_START_COL,
  NODE_START_ROW,
} from "../constant/pathFind";
import aStar from "./aStar";

describe("A* star algorithm test", () => {
  const grid = Array.from(new Array(ROWS), () => new Array(COLUMNS));
  const wall = [
    { x: 1, y: 2 },
    { x: 2, y: 0 },
    { x: 3, y: 2 },
    { x: 0, y: 4 },
    { x: 0, y: 3 },
    { x: 2, y: 4 },
  ];

  let result = null;
  beforeEach(() => {
    createSpot(grid);
    updateNeighbors(grid);
    createWall(grid, wall);

    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    result = aStar(startNode, endNode);
  });

  test("check shortest path", () => {
    const path = result.path.map((el) => [el.x, el.y]);

    expect(path).toEqual([
      [3, 4],
      [3, 3],
      [2, 3],
      [2, 2],
      [2, 1],
      [1, 1],
      [1, 0],
      [0, 0],
    ]);
  });

  test("check visited nodes", () => {
    const visitedNodes = result.path.map((el) => [el.x, el.y]);

    expect(visitedNodes).toEqual([
      [3, 4],
      [3, 3],
      [2, 3],
      [2, 2],
      [2, 1],
      [1, 1],
      [1, 0],
      [0, 0],
    ]);
  });
});
