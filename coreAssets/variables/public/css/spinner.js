import { removeEmptyLines } from "../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
.spinner-box {
  ${vp[1]}
  ${vp[2]}
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;
}
.spinner-container {
  width: ${vp[3]}px;
  height: ${vp[4]}px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .4);
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hidden {
  display: none;
}
.spinner {
  width: 100px;
  height: 100px;
  border: 4px solid rgba(255, 255, 255, .6);
  border-radius: 50%;
  border-top: solid 6px #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(720deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
/* # PARA CONFIRMACIONES # */
.loaded-ok {
  width: 100px;
  height: 100px;
  border: 4px solid #fff;
  border-radius: 50%;
  border-color: #C5EBAA;
  animation: none;
  -webkit-animation: none;
}
.check {
  position: relative;
  height: 20px;
  width: 60px;
  border-bottom: 4px solid #C5EBAA;
  border-left: 4px solid #C5EBAA;
  transform: rotate(-45deg);
  /* -webkit-transform: rotate(45deg); */
  top: 30px;
  left: 15px;
}
/* # PARA ERRORES # */
.cross {
  width: 100px;
  height: 100px;
  position: relative;
}
.cross:before,
.cross:after {
  content: " ";
  position: absolute;
  width: 60px;
  height: 4px;
  background-color: #F94C10;
  top: 45px;
  left: 15px;
}
.cross:before {
  transform: rotate(45deg);
}
.cross:after {
  transform: rotate(-45deg);
}
.loaded-error {
  width: 100px;
  height: 100px;
  border: 4px solid #fff;
  border-radius: 50%;
  border-color: #F94C10;
  animation: none;
  -webkit-animation: none;
}
`;
}
