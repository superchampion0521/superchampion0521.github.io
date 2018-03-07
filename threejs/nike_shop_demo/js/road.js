function createRoadModel(scene) {
    var loader = new THREE.TextureLoader();

    var groundLeftTexture = loader.load('textures/ground/grass.jpg');
    groundLeftTexture.wrapS = groundLeftTexture.wrapT = THREE.RepeatWrapping;
    groundLeftTexture.repeat.set(1, 25);
    groundLeftTexture.anisotropy = 16;

    var grassLeftMaterial = new THREE.MeshLambertMaterial({ map: groundLeftTexture });
    var grassLeftMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 20000), grassLeftMaterial);
    grassLeftMesh.position.y = -248;
    grassLeftMesh.position.x = -400;
    grassLeftMesh.rotation.x = -Math.PI / 2;
    grassLeftMesh.receiveShadow = true;
    scene.add(grassLeftMesh);

    var roadTexture = loader.load('textures/ground/aspalt_road.jpg');
    roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
    roadTexture.repeat.set(1, 25);
    roadTexture.anisotropy = 16;

    var roadMaterial = new THREE.MeshLambertMaterial({ map: roadTexture });
    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 20000), roadMaterial);
    mesh.position.y = -247;
    mesh.position.x = 0;
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    var grassRightTexture = loader.load('textures/ground/grass.jpg');
    grassRightTexture.wrapS = grassRightTexture.wrapT = THREE.RepeatWrapping;
    grassRightTexture.repeat.set(1, 25);
    grassRightTexture.anisotropy = 16;

    var grassRightMaterial = new THREE.MeshLambertMaterial({ map: grassRightTexture });
    var grassRightMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 20000), grassRightMaterial);
    grassRightMesh.position.y = -248;
    grassRightMesh.position.x = 400;
    grassRightMesh.rotation.x = -Math.PI / 2;
    grassRightMesh.receiveShadow = true;
    scene.add(grassRightMesh);
}
