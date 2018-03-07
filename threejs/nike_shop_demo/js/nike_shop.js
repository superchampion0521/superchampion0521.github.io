function createNikeShopModel(scene, listener) {
    var loader = new THREE.TextureLoader();
    // Nike Shop
    var nikeShopGeometry = new THREE.CubeGeometry(1887, 804, 1203);
    //var nikeShopMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var nikeShopSide0 = loader.load('textures/nike_shop/front.png');
    var nikeShopSide1 = loader.load('textures/nike_shop/back.png');
    var nikeShopSide2 = loader.load('textures/nike_shop/top.png');
    var nikeShopSide3 = loader.load('textures/nike_shop/bottom.png');
    var nikeShopSide4 = loader.load('textures/nike_shop/left.png');
    var nikeShopSide5 = loader.load('textures/nike_shop/right.png');
    var nikeShopMaterial = [
        new THREE.MeshBasicMaterial({ map: nikeShopSide0 }),
        new THREE.MeshBasicMaterial({ map: nikeShopSide1 }),
        new THREE.MeshBasicMaterial({ map: nikeShopSide2 }),
        new THREE.MeshBasicMaterial({ map: nikeShopSide3 }),
        new THREE.MeshBasicMaterial({ map: nikeShopSide4 }),
        new THREE.MeshBasicMaterial({ map: nikeShopSide5 })
    ];
    var nikeShopMesh = new THREE.Mesh(nikeShopGeometry, nikeShopMaterial);
    nikeShopMesh.position.x = -2200;
    nikeShopMesh.position.y = 150;
    scene.add(nikeShopMesh);

    // Audio
    var audioLoader = new THREE.AudioLoader();
    var sound1 = new THREE.PositionalAudio(listener);
    audioLoader.load('sounds/Project_Utopia.ogg', function(buffer) {
        sound1.setBuffer(buffer);
        sound1.setLoop(true);
        sound1.setRefDistance(1000);
        //sound1.play();
    });
    nikeShopMesh.add(sound1);
}