import { removeEmptyLines } from "../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
.cam-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 5px;
}
/* proporcion de video */
/* 320x234 */
/* 416x314 */
/* 512x378 */
/* 608x450 = 616X464*/
#video-cam {
  width: ${vp[1]}px;
  height: ${vp[2]}px;
  border: solid 4px #111;
  border-radius: 3px;
  transform: rotateY(180deg);
}
canvas {
  position: absolute;
  transform: rotateY(180deg);
}
.data-container {
  border: 4px solid #111;
  border-radius: 3px;
  padding: 20px;
}
.data-container h3 {
  text-align: center;
}
.data-container p {
  line-height: 30px;
  font-size: 20px;
}
`;
}
