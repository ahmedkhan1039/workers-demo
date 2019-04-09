function add(a, b) {
  return a + b;
}


const BOX_WIDTH = 20;
const BOX_HEIGHT = 20;
const BOX_INITIAL_X = 1;
const BOX_INITIAL_Y = 1;

const ROOM = 0;
const WALL = 1;
const EXIT = 2;

function transformGridStructure(rawGrid) {
  const transformedGrid = {
    linePath: "",
    wallPath: "",
    exit: {
      x: BOX_INITIAL_X,
      y: BOX_INITIAL_Y
    },
    width: BOX_WIDTH * rawGrid.cols + BOX_INITIAL_X * 2,
    height: BOX_HEIGHT * rawGrid.rows + BOX_INITIAL_Y * 2
  };

  let xpos = BOX_INITIAL_X;
  let ypos = BOX_INITIAL_Y;
  let wallLimit = 0;
  let restartPoint = 0;

  rawGrid.data.forEach((row, rowNo) => {
    wallLimit = 0;
    restartPoint = 0;
    transformedGrid.wallPath += ` M${xpos},${ypos}`;
    transformedGrid.linePath += ` M${xpos},${ypos}`;
    row.forEach((cellValue, columnNo) => {
      if (restartPoint !== 0) {
        transformedGrid.wallPath += ` M${restartPoint},${ypos}`;
        transformedGrid.linePath += ` M${restartPoint},${ypos}`;
      }
      if (cellValue === WALL) {
        restartPoint = 0;
        wallLimit += BOX_WIDTH;
        transformedGrid.wallPath += ` l0,${BOX_HEIGHT} l${wallLimit},0 l0,-${BOX_HEIGHT} l-${wallLimit},0`;
        transformedGrid.linePath += constructGridOutline(
          rawGrid,
          rowNo,
          columnNo,
          xpos,
          ypos
        );
      } else {
        wallLimit = 0;
        restartPoint = xpos + BOX_WIDTH;
        if (cellValue === EXIT) {
          transformedGrid.exit.x = xpos - BOX_INITIAL_X;
          transformedGrid.exit.y = ypos;
        }
      }

      xpos += BOX_WIDTH;
    });
    xpos = BOX_INITIAL_X;
    ypos += BOX_HEIGHT;
  });

  transformedGrid.linePath += ` z`;
  transformedGrid.wallPath += ` z`;
  return transformedGrid;
}

function constructGridOutline(grid, row, column, x, y) {
  let linePath = "";

  if (column - 1 >= 0) {
    if (grid.data[row][column - 1] !== WALL) {
      linePath += ` L${x},${y + BOX_HEIGHT}`;
    } else {
      linePath += ` M${x},${y + BOX_HEIGHT}`;
    }
  } else {
    linePath += ` L${x},${y + BOX_HEIGHT}`;
  }

  if (row + 1 < grid.rows) {
    if (grid.data[row + 1][column] !== WALL) {
      linePath += ` L${x + BOX_WIDTH},${y + BOX_HEIGHT}`;
    } else {
      linePath += ` M${x + BOX_WIDTH},${y + BOX_HEIGHT}`;
    }
  } else {
    linePath += ` L${x + BOX_WIDTH},${y + BOX_HEIGHT}`;
  }

  if (column + 1 < grid.cols) {
    if (grid.data[row][column + 1] !== WALL) {
      linePath += ` L${x + BOX_WIDTH},${y}`;
    } else {
      linePath += ` M${x + BOX_WIDTH},${y}`;
    }
  } else {
    linePath += ` L${x + BOX_WIDTH},${y}`;
  }

  if (row - 1 >= 0) {
    if (grid.data[row - 1][column] !== WALL) {
      linePath += ` L${x},${y}`;
    } else {
      linePath += ` M${x},${y}`;
    }
  } else {
    linePath += ` L${x},${y}`;
  }

  return linePath;
}
