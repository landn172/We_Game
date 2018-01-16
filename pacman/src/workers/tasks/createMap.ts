enum PointType {
  "empty" = 0,
  "wall" = 1,
  "bean" = 2,
  "goldenBean" = 3
}

interface IMapPoint {
  pointType: PointType;
  x: number;
  y: number;
}

const createMap: IScopeTasks = {
  createMapWall: (data: any) => {
    let { wallWidth = 400, wallHeight = 400 } = data;
    const wallData: any[] = []; // 二维地图
    console.log("start create");

    let x = 0;
    let y = 0;

    while (x < wallWidth) {
      const lineData: IMapPoint[] = [];
      while (y < wallHeight) {
        lineData.push({
          pointType: randomPointType(),
          x: wallWidth,
          y: wallHeight
        });
        y++;
      }
      wallData.push(lineData);
      y = 0;
      x++;
    }

    console.log("end create");
    return wallData;
  }
};

function randomPointType() {
  const len = Object.keys(PointType).length / 2;
  const index = ~~(Math.random() * len);
  return index;
}

export default createMap;
