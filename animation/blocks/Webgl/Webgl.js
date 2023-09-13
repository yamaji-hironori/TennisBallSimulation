// Canvas
const canvas = document.querySelector('canvas#Webgl')

// Three.jsライブラリの読み込み
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// テニスボールの生成
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshBasicMaterial({color: 0xFFFF00});
const ball = new THREE.Mesh(geometry, material);

scene.add(ball);

// 初期位置
ball.position.set(0, 1, -5);

// 物理パラメータ
let velocity = new THREE.Vector3(0.1, 0.2, 0);
const acceleration = new THREE.Vector3(0, -0.01, 0);
const timeStep = 0.1;

// カメラの位置設定
camera.position.z = 5;

// アニメーション
const animate = function () {
    requestAnimationFrame(animate);

    // 物理シミュレーション
    ball.position.add(velocity.clone().multiplyScalar(timeStep));
    velocity.add(acceleration.clone().multiplyScalar(timeStep));

    // 床との衝突判定
    if (ball.position.y <= -1) {
        velocity.y *= -0.8;  // 反発係数
    }

    renderer.render(scene, camera);
};

animate();

