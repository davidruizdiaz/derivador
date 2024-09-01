import { removeEmptyLines } from "../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>App Asistencia | Marcación</title>
    <link rel="stylesheet" href="./css/attendance_main.css">
    ${vp[1]}
    <script defer type="module" src="./js/attendance_main.js"></script>
    ${vp[2]}
  </head>
  <body>
    <header class="center">
      <div class="login-menu">
        ${vp[3]}
        <a href="./login.html">Login</a>
      </div>
      <h1>${vp[4]}</h1>
      <h4>${vp[5]}</h4>
      ${vp[6]}
    </header>
    <div class="cam-container">
      <div class="spinner-box">
        <video id="video-cam" ${vp[7]}></video>
        <div class="spinner-container hidden">
          <div class="spinner">
            <div class="result hidden"></div>
          </div>
        </div>
      </div>
      <div class="data-container" hidden></div>
    </div>
    <div id="notify-content"></div>
  </body>
</html>
`;
}
