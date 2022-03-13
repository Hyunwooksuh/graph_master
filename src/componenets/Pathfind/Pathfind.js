import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import problemSet from "../../asset/problemSet";
import Node from "./Node/Node";
import "./Pathfind.css";
import {
  COLUMNS,
  ROWS,
  NODE_END_COL,
  NODE_END_ROW,
  NODE_START_COL,
  NODE_START_ROW,
} from "../../constant/pathFind";
import aStar from "../../util/aStar";
import { togglePathVisualize } from "../../redux/slices/problemSlice";

export class Spot {
  constructor(row, column) {
    this.x = row;
    this.y = column;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbors = [];
    this.isWall = false;
    this.previous = null;
  }

  addNeighbors(grid, rows, columns) {
    const i = this.x;
    const j = this.y;

    if (i > 0) this.neighbors.push(grid[i - 1][j]);
    if (i < rows - 1) this.neighbors.push(grid[i + 1][j]);
    if (j > 0) this.neighbors.push(grid[i][j - 1]);
    if (j < columns - 1) this.neighbors.push(grid[i][j + 1]);
  }
}

export default function Pathfind() {
  const [grid, setGrid] = useState([]);
  const [path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [didInit, setDidInit] = useState(false);
  const dispatch = useDispatch();
  const userVisitedNodes = useSelector((state) => state.scope.visitedNodes);
  const optimizedPath = useSelector((state) => state.scope.optimizedPath);
  const { onPathVisualize } = useSelector((state) => state.problem);

  useEffect(() => {
    if (!didInit) {
      setDidInit(true);
      initializeGrid();
    }

    visualizePath();
  }, [didInit]);

  useEffect(() => {
    if (userVisitedNodes && optimizedPath) {
      if (userVisitedNodes.length > 0 && optimizedPath.length > 0 && onPathVisualize) {
        markUserVisitedPath(userVisitedNodes, optimizedPath);
      }
    }
  }, [userVisitedNodes, optimizedPath, onPathVisualize]);

  function initializeGrid() {
    const grid = Array.from(new Array(ROWS), () => new Array(COLUMNS));

    createSpot(grid);
    setGrid(grid);
    updateNeighbors(grid);
    createWall(grid, problemSet["shortestPath"].wall);

    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    const { path, visitedNodes } = aStar(startNode, endNode);
    startNode.isWall = false;
    endNode.isWall = false;

    setPath(path);
    setVisitedNodes(visitedNodes);
  }

  function createWall(grid, input) {
    for (let k = 0; k < input.length; k++) {
      const { x, y } = input[k];

      grid[x][y].isWall = true;
    }
  }

  function createSpot(grid) {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  }

  function updateNeighbors(grid) {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        grid[i][j].addNeighbors(grid, ROWS, COLUMNS);
      }
    }
  }

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizePath = () => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 50 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
        }, 50 * i);
      }
    }
  };

  const markUserVisitedPath = async (userVisitedNodes, optimizedPath) => {
    for (let i = 0; i <= userVisitedNodes.length; i++) {
      if (i === userVisitedNodes.length) {
        setTimeout(() => {
          for (let i = 0; i < optimizedPath.length; i++) {
            setTimeout(() => {
              const node = optimizedPath[i];
              document.getElementById(`node-${node.x}-${node.y}`).innerHTML =
                "<img width=60px height=60px src=https://cdn-icons-png.flaticon.com/512/684/684462.png >";
            }, 200 * i);
          }
        }, 500 * i);
      } else {
        const { x, y } = userVisitedNodes[i];
        setTimeout(() => {
          document.getElementById(`node-${x}-${y}`).innerText = `${i}`;
        }, 500 * i);
      }
    }

    dispatch(togglePathVisualize(false));
  };

  const gridWithNode = (
    <div>
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStart, isEnd, isWall } = col;

              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowIndex}
                  col={colIndex}
                  isWall={isWall}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return <div className="Wrapper">{gridWithNode}</div>;
}
