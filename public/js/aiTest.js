const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");
const calorieElement = document.querySelector("#calorie-message");
const countElement = document.querySelector("#counter");
const controls = window;
const mpPose = window;
const drawingUtils = window;
const fpsControl = new controls.FPS();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const exerciseId = urlParams.get("id");
const restartElement = document.querySelector("#restart");
let pose;

function init() {}
// Bicep Curl
let 啞鈴_count = 0;
let 啞鈴_stage = "";
// Squat
let squat_count = 0;
let squat_stage = "";
// Dumbbell Shoulder Press
let pushShoulder_count = 0;
let pushShoulder_stage = "";
let warning = "";

function calculateAngle(a, b, c) {
  a = nj.array(a); // First
  b = nj.array(b); // Mid
  c = nj.array(c); // End

  const d = Math.atan2(
    getSelectionData(c, 1) - getSelectionData(b, 1),
    getSelectionData(c, 0) - getSelectionData(b, 0)
  );
  const e = Math.atan2(
    getSelectionData(a, 1) - getSelectionData(b, 1),
    getSelectionData(a, 0) - getSelectionData(b, 0)
  );

  let radians = d - e;
  let angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180) {
    angle = 360 - angle;
  }
  return angle;
}

function getSelectionData(data, index) {
  return data.selection.data[index];
}

// Bicep Curl
function 啞鈴(landmarks) {
  const left_shoulder = [landmarks[12].x, landmarks[12].y];
  const left_elbow = [landmarks[14].x, landmarks[14].y];
  const left_wrist = [landmarks[16].x, landmarks[16].y];
  const left_hip = [landmarks[24].x, landmarks[24].y];
  const left_elbow_angle = calculateAngle(
    left_shoulder,
    left_elbow,
    left_wrist
  );
  const left_shoulder_angle = calculateAngle(
    left_hip,
    left_shoulder,
    left_elbow
  );

  const right_shoulder = [landmarks[11].x, landmarks[11].y];
  const right_elbow = [landmarks[13].x, landmarks[13].y];
  const right_wrist = [landmarks[15].x, landmarks[15].y];
  const right_hip = [landmarks[23].x, landmarks[23].y];

  const right_elbow_angle = calculateAngle(
    right_shoulder,
    right_elbow,
    right_wrist
  );
  const right_shoulder_angle = calculateAngle(
    right_hip,
    right_shoulder,
    right_elbow
  );

  const left_right_shoulder_y_length = left_shoulder[1] - right_shoulder[1];

  console.log("left_right_shoulder_y_length: ", left_right_shoulder_y_length);
  console.log("left_elbow_angle: ", left_elbow_angle);
  console.log("right_shoulder_angle: ", right_shoulder_angle);
  console.log("right_elbow_angle: ", right_elbow_angle);

  // Warning message handling:
  canvasCtx.font = "900 100px Georgia";
  canvasCtx.fillStyle = "#ff0000";
  // canvasCtx.fillText("textAlign=center", 150, 120);
  // canvasCtx.textAlign = "center";
  canvasCtx.fillText(`${warning}`, 200, 120);

  if (Math.abs(left_right_shoulder_y_length) > 0.05) {
    warning = "唔好側側膊唔多覺";
  } else {
    warning = "";
  }
  console.log("啞鈴_stage: ", 啞鈴_stage);
  if (warning == "" && right_shoulder_angle < 40) {
    if (left_elbow_angle > 140 && (啞鈴_stage == "up" || 啞鈴_stage == "")) {
      啞鈴_stage = "down";
    } else if (left_elbow_angle < 30 && 啞鈴_stage == "down") {
      啞鈴_stage = "up";
      啞鈴_count++;
    }
  }
  calorieElement.innerHTML =
    "Calorie burn : " +
    Number.parseFloat(啞鈴_count * 0.143).toFixed(2) +
    " calories";
  countElement.innerHTML = 啞鈴_count + " times";
}

// Squat
function squat(landmarks) {
  const left_shoulder = [landmarks[12].x, landmarks[12].y];
  const left_elbow = [landmarks[14].x, landmarks[14].y];
  const left_wrist = [landmarks[16].x, landmarks[16].y];
  const left_hip = [landmarks[24].x, landmarks[24].y];
  const left_knee = [landmarks[26].x, landmarks[26].y];
  const left_ankle = [landmarks[28].x, landmarks[28].y];
  const left_foot = [landmarks[32].x, landmarks[32].y];

  const right_shoulder = [landmarks[11].x, landmarks[11].y];
  const right_elbow = [landmarks[13].x, landmarks[13].y];
  const right_wrist = [landmarks[15].x, landmarks[15].y];
  const right_hip = [landmarks[23].x, landmarks[23].y];
  const right_knee = [landmarks[25].x, landmarks[25].y];
  const right_ankle = [landmarks[27].x, landmarks[27].y];
  const right_foot = [landmarks[31].x, landmarks[31].y];
  //right elbow angle
  const right_elbow_angle = calculateAngle(
    right_shoulder,
    right_elbow,
    right_wrist
  );
  //left elbow angle
  const left_elbow_angle = calculateAngle(
    left_shoulder,
    left_elbow,
    left_wrist
  );
  //right shoulder angle
  const right_shoulder_angle = calculateAngle(
    right_hip,
    right_shoulder,
    right_elbow
  );
  //left shoulder angle
  const left_shoulder_angle = calculateAngle(
    left_hip,
    left_shoulder,
    left_elbow
  );
  //right hip angle
  const right_hip_angle = calculateAngle(right_shoulder, right_hip, right_knee);
  //left hip angle
  const left_hip_angle = calculateAngle(left_shoulder, left_hip, left_knee);
  //right knee angle
  const right_knee_angle = calculateAngle(right_hip, right_knee, right_ankle);
  //left knee angle
  const left_knee_angle = calculateAngle(left_hip, left_knee, left_ankle);
  //right ankle angle
  const right_ankle_angle = calculateAngle(right_knee, right_ankle, right_foot);
  //left ankle angle
  const left_ankle_angle = calculateAngle(left_knee, left_ankle, left_foot);

  const left_right_shoulder_y_length = left_shoulder[1] - right_shoulder[1];

  // console.log("left_right_shoulder_y_length: ", left_right_shoulder_y_length)
  // console.log("left_elbow_angle: ", left_elbow_angle);
  // console.log("right_elbow_angle: ", right_elbow_angle);

  // console.log("left_shoulder_angle: ", left_shoulder_angle);
  // console.log("right_shoulder_angle: ", right_shoulder_angle);

  // console.log("left_hip_angle: ", left_hip_angle);
  // console.log("right_hip_angle: ", right_hip_angle);

  // console.log("left_knee_angle: ", left_knee_angle);
  // console.log("right_knee_angle: ", right_knee_angle);

  // console.log("left_ankle_angle: ", left_ankle_angle);
  // console.log("right_ankle_angle: ", right_ankle_angle);

  if (Math.abs(left_right_shoulder_y_length) > 0.05) {
    warning = "唔好側側膊唔多覺！";
  } else if (
    squat_stage == "up" &&
    right_hip_angle > 145 &&
    left_hip_angle > 145 &&
    right_hip_angle < 165 &&
    left_hip_angle < 165 &&
    right_knee_angle > 145 &&
    left_knee_angle > 145 &&
    right_knee_angle < 165 &&
    left_knee_angle < 165
  ) {
    warning = "Hey! 踎低D啦！";
  } else {
    warning = "";
  }

  if (
    right_elbow_angle < 60 &&
    left_elbow_angle < 60 &&
    right_shoulder_angle < 60 &&
    left_shoulder_angle < 60 &&
    right_hip_angle > 160 &&
    left_hip_angle > 160 &&
    right_knee_angle > 170 &&
    left_knee_angle > 170
  ) {
    squat_stage = "up";
  } else if (
    right_elbow_angle < 60 &&
    left_elbow_angle < 60 &&
    right_shoulder_angle < 60 &&
    left_shoulder_angle < 60 &&
    right_hip_angle < 150 &&
    left_hip_angle < 150 &&
    right_knee_angle < 150 &&
    left_knee_angle < 150 &&
    squat_stage == "up"
  ) {
    squat_stage = "down";
    squat_count++;
  }

  console.log("squat_stage: ", squat_stage);

  console.log("warning: ", warning);
  console.log("squat_count: ", squat_count);

  // Warning message handling:
  canvasCtx.font = "900 100px Georgia";
  canvasCtx.fillStyle = "#ff0000";
  canvasCtx.fillText(`${warning}`, 250, 200);

  calorieElement.innerHTML =
    "Calorie burn : " +
    Number.parseFloat(squat_count * 0.327).toFixed(2) +
    " calories";
  countElement.innerHTML = squat_count + " times";
}

// Dumbbell Shoulder Press
function pushShoulder(landmarks) {
  const left_shoulder = [landmarks[12].x, landmarks[12].y];
  const left_elbow = [landmarks[14].x, landmarks[14].y];
  const left_wrist = [landmarks[16].x, landmarks[16].y];
  const left_hip = [landmarks[24].x, landmarks[24].y];
  const left_elbow_angle = calculateAngle(
    left_shoulder,
    left_elbow,
    left_wrist
  );
  const left_shoulder_angle = calculateAngle(
    left_hip,
    left_shoulder,
    left_elbow
  );

  const right_shoulder = [landmarks[11].x, landmarks[11].y];
  const right_elbow = [landmarks[13].x, landmarks[13].y];
  const right_wrist = [landmarks[15].x, landmarks[15].y];
  const right_hip = [landmarks[23].x, landmarks[23].y];
  const right_elbow_angle = calculateAngle(
    right_shoulder,
    right_elbow,
    right_wrist
  );
  const right_shoulder_angle = calculateAngle(
    right_hip,
    right_shoulder,
    right_elbow
  );

  const left_right_shoulder_y_length = left_shoulder[1] - right_shoulder[1];
  if (Math.abs(left_right_shoulder_y_length) > 0.05) {
    warning = "唔好側側膊唔多覺！";
  } else {
    warning = "";
  }
  if (
    warning == "" &&
    right_shoulder_angle < 120 &&
    left_shoulder_angle < 120
  ) {
    if (
      left_elbow_angle > 120 &&
      right_elbow_angle > 120 &&
      (pushShoulder_stage == "up" || pushShoulder_stage == "")
    ) {
      pushShoulder_stage = "down";
    } else if (
      left_elbow_angle < 90 &&
      right_elbow_angle < 90 &&
      pushShoulder_stage == "down"
    ) {
      pushShoulder_stage = "up";
      pushShoulder_count++;
    }
  }
  calorieElement.innerHTML =
    "Calorie burn : " +
    Number.parseFloat(pushShoulder_count * 0.236).toFixed(2) +
    " calories";
  countElement.innerHTML = pushShoulder_count + " times";
  console.log(pushShoulder_stage);
}

// warningElement.innerHTML = warning

function onResults(results) {
  fpsControl.tick();

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (results.segmentationMask) {
    canvasCtx.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    canvasCtx.globalCompositeOperation = "source-in";
    // This can be a color or a texture or whatever...
    canvasCtx.fillStyle = "#00FF007F";
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = "destination-atop";
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    canvasCtx.globalCompositeOperation = "source-over";
  } else {
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
  }

  drawingUtils.drawConnectors(
    canvasCtx,
    results.poseLandmarks,
    mpPose.POSE_CONNECTIONS,
    {
      visibilityMin: 0.65,
      color: "white",
    }
  );
  try {
    let landmarks = results.poseLandmarks;
    // console.log(landmarks);

    if (exerciseId == 1) {
      // Bicep Curl
      啞鈴(landmarks);
    } else if (exerciseId == 2) {
      // Squat
      squat(landmarks);
    } else if (exerciseId == 3) {
      // Dumbbell Shoulder Press
      pushShoulder(landmarks);
    }

    drawingUtils.drawLandmarks(
      canvasCtx,
      Object.values(mpPose.POSE_LANDMARKS_LEFT).map(
        (index) => results.poseLandmarks[index]
      ),
      {
        visibilityMin: 0.65,
        color: "white",
        fillColor: "rgb(255,138,0)",
      }
    );
    drawingUtils.drawLandmarks(
      canvasCtx,
      Object.values(mpPose.POSE_LANDMARKS_RIGHT).map(
        (index) => results.poseLandmarks[index]
      ),
      {
        visibilityMin: 0.65,
        color: "white",
        fillColor: "rgb(0,217,231)",
      }
    );
    drawingUtils.drawLandmarks(
      canvasCtx,
      Object.values(mpPose.POSE_LANDMARKS_NEUTRAL).map(
        (index) => results.poseLandmarks[index]
      ),
      {
        visibilityMin: 0.65,
        color: "white",
        fillColor: "white",
      }
    );
  } catch (e) {
    //console.log(e);
  }
  canvasCtx.restore();
}

function init() {
  pose = new Pose({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    },
  });
  pose.onResults(onResults);
  let controlsElement = document.getElementsByClassName("control-panel")[0];
  new controls.ControlPanel(controlsElement, {
    selfieMode: true,
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
    effect: "background",
  })
    .add([
      fpsControl,
      new controls.SourcePicker({
        onSourceChanged: () => {
          // Resets because this model gives better results when reset between
          // source changes.
          pose.reset();
        },
        onFrame: async (input, size) => {
          const aspect = size.height / size.width;
          let width, height;
          if (window.innerWidth > window.innerHeight) {
            height = window.innerHeight;
            width = height / aspect;
          } else {
            width = window.innerWidth;
            height = width * aspect;
          }
          canvasElement.width = width;
          canvasElement.height = height;
          await pose.send({
            image: input,
          });
        },
      }),
    ])
    .on((x) => {
      const options = x;
      videoElement.classList.toggle("selfie", options.selfieMode);
      pose.setOptions(options);
    });
}

document.querySelector("#restart").addEventListener("click", () => {
  window.location.reload();
});
init();
