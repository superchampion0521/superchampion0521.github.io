function UnderArmourModel(scene, camera, x, y, z) {
    var underArmour = {};

    underArmour.color = {
        bottomBorder: 0x252525,
        frame: 0x101010,
        pillow: 0x252525,
        wall: 0x252525
    };
    underArmour.loader = new THREE.TextureLoader();
    underArmour.pos = { x: x, y: y, z: z };
    underArmour.size = {
        bottomBorder: { x: 20, y: 80 },
        frame: { x: 8, y: 8 },
        mark: { x: 380 },
        pillow: { x: 25, y: 25 },
        wall: 20,
        x: 2000, y: 1000, z: 1200
    };

    underArmour.create = function () {
        this.size.outTile = { y: (this.size.y - this.size.bottomBorder.y) / 5 };
        this.size.window = { y: (this.size.y - this.size.outTile.y - this.size.bottomBorder.y) / 2 };

        underArmour.makeWall();
        underArmour.makeFloor();
        underArmour.makeBottomBorder();
        underArmour.makePillow();
        underArmour.makeFrames();
    };

    underArmour.makeBottomBorder = function() {
        var bottomMaterial = new THREE.MeshBasicMaterial({ color: this.color.bottomBorder });

        var bottomTopGeo = new THREE.CubeGeometry(underArmour.size.x, underArmour.size.bottomBorder.y, 5);
        var bottomTopMesh = new THREE.Mesh(bottomTopGeo, bottomMaterial);
        bottomTopMesh.position.set(2200, -210, 602.5);
        scene.add(bottomTopMesh);

        var bottomBottomGeo = new THREE.CubeGeometry(underArmour.size.x, underArmour.size.bottomBorder.y, 5);
        var bottomBottomMesh = new THREE.Mesh(bottomBottomGeo, bottomMaterial);
        bottomBottomMesh.position.set(2200, -210, -602.5);
        scene.add(bottomBottomMesh);

        var bottomLeftGeo = new THREE.CubeGeometry(5, underArmour.size.bottomBorder.y, 1205);
        var bottomLeftMesh = new THREE.Mesh(bottomLeftGeo, bottomMaterial);
        bottomLeftMesh.position.set(3202.5, -210, 0);
        scene.add(bottomLeftMesh);

        var bottomRightGeo = new THREE.CubeGeometry(5, underArmour.size.bottomBorder.y, 1205);
        var bottomRightMesh = new THREE.Mesh(bottomRightGeo, bottomMaterial);
        bottomRightMesh.position.set(1198.5, -210, 0);
        scene.add(bottomRightMesh);
    };

    underArmour.makeFloor = function() {
        var floorTexture = this.loader.load('textures/under_armour/floor.jpg');
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set(4, 2);
        floorTexture.anisotropy = 16;

        var floorMaterial = new THREE.MeshLambertMaterial({ map: floorTexture });
        var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(this.size.x, this.size.z), floorMaterial);
        mesh.position.set(this.pos.x, (this.pos.y - this.size.y / 2) + 5, 0);
        //mesh.position.y = -250;
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);
    };

    underArmour.makeFrames = function() {
        var frameMat = new THREE.MeshBasicMaterial({ color: this.color.frame });

        for (var i = 0; i < 3; i ++) {
            var frontGeo = new THREE.CubeGeometry(this.size.x - this.size.mark.x - this.size.wall * 2, this.size.frame.y, this.size.frame.x);
            var frontMesh = new THREE.Mesh(frontGeo, frameMat);
            frontMesh.position.x = this.pos.x + this.size.mark.x / 2;
            frontMesh.position.y = this.pos.y - this.size.y / 2 + this.size.bottomBorder.y + this.size.frame.y / 2 + i * this.size.window.y;
            frontMesh.position.z = this.pos.z + this.size.z / 2 + this.size.frame.y / 2;
            scene.add(frontMesh);

            var backGeo = new THREE.CubeGeometry(this.size.x - this.size.wall * 2, this.size.frame.y, this.size.frame.x);
            var backMesh = new THREE.Mesh(backGeo, frameMat);
            backMesh.position.x = this.pos.x;
            backMesh.position.y = this.pos.y - this.size.y / 2 + this.size.bottomBorder.y + this.size.frame.y / 2 + i * this.size.window.y;
            backMesh.position.z = this.pos.z - this.size.z / 2 - this.size.frame.y / 2;
            scene.add(backMesh);

            var rightGeo = new THREE.CubeGeometry(this.size.frame.x, this.size.frame.y, this.size.z - this.size.wall * 2);
            var rightMesh = new THREE.Mesh(rightGeo, frameMat);
            rightMesh.position.x = this.pos.x + this.size.x / 2 + this.size.frame.x / 2;
            rightMesh.position.y = this.pos.y - this.size.y / 2 + this.size.bottomBorder.y + this.size.frame.y / 2 + i * this.size.window.y;
            rightMesh.position.z = this.pos.z;
            scene.add(rightMesh);

            var leftGeo = new THREE.CubeGeometry(this.size.frame.x, this.size.frame.y, this.size.z - this.size.wall * 2 - this.size.mark.x);
            var leftMesh = new THREE.Mesh(leftGeo, frameMat);
            leftMesh.position.x = this.pos.x - this.size.x / 2 - this.size.frame.x / 2;
            leftMesh.position.y = this.pos.y - this.size.y / 2 + this.size.bottomBorder.y + this.size.frame.y / 2 + i * this.size.window.y;
            leftMesh.position.z = this.pos.z - this.size.mark.x / 2;
            scene.add(leftMesh);
        }

        var stickGeo = new THREE.CubeGeometry(this.size.frame.x, this.size.y - this.size.outTile.y, this.size.frame.y);
        
        var frontStickLeftMesh = new THREE.Mesh(stickGeo, frameMat);
        frontStickLeftMesh.position.x = this.pos.x - this.size.x / 2 + this.size.wall + this.size.mark.x + this.size.frame.x / 2;
        frontStickLeftMesh.position.y = this.pos.y - this.size.outTile.y / 2;
        frontStickLeftMesh.position.z = this.pos.z + this.size.z / 2 + this.size.frame.y / 2;
        scene.add(frontStickLeftMesh);
        var frontStickRightMesh = new THREE.Mesh(stickGeo, frameMat);
        frontStickRightMesh.position.x = this.pos.x + this.size.x / 2 - this.size.wall - this.size.frame.x / 2;
        frontStickRightMesh.position.y = this.pos.y - this.size.outTile.y / 2;
        frontStickRightMesh.position.z = this.pos.z + this.size.z / 2 + this.size.frame.y / 2;
        scene.add(frontStickRightMesh);

        var bottomStickLeftMesh = new THREE.Mesh(stickGeo, frameMat);
        bottomStickLeftMesh.position.x = this.pos.x - this.size.x / 2 + this.size.wall + this.size.frame.x / 2;
        bottomStickLeftMesh.position.y = this.pos.y - this.size.outTile.y / 2;
        bottomStickLeftMesh.position.z = this.pos.z - this.size.z / 2 - this.size.frame.y / 2;
        scene.add(bottomStickLeftMesh);
        var bottomStickRightMesh = new THREE.Mesh(stickGeo, frameMat);
        bottomStickRightMesh.position.x = this.pos.x + this.size.x / 2 - this.size.wall - this.size.frame.x / 2;
        bottomStickRightMesh.position.y = this.pos.y - this.size.outTile.y / 2;
        bottomStickRightMesh.position.z = this.pos.z - this.size.z / 2 - this.size.frame.y / 2;
        scene.add(bottomStickRightMesh);

        var leftStickLeftMesh = new THREE.Mesh(stickGeo, frameMat);
        leftStickLeftMesh.position.x = this.pos.x + this.size.x / 2 + this.size.frame.x / 2;
        leftStickLeftMesh.position.y = this.pos.y - this.size.outTile.y / 2;
        leftStickLeftMesh.position.z = this.pos.z + this.size.z / 2 - this.size.wall - this.size.frame.y / 2;
        scene.add(leftStickLeftMesh);
        var leftStickRightMesh = new THREE.Mesh(stickGeo, frameMat);
        leftStickRightMesh.position.x = this.pos.x + this.size.x / 2 + this.size.frame.x / 2;
        leftStickRightMesh.position.y = this.pos.y - this.size.outTile.y / 2;
        leftStickRightMesh.position.z = this.pos.z - this.size.z / 2 + this.size.wall + this.size.frame.y / 2;
        scene.add(leftStickRightMesh);

        var rightStickLeftMesh = new THREE.Mesh(stickGeo, frameMat);
        rightStickLeftMesh.position.x = this.pos.x - this.size.x / 2 - this.size.frame.x / 2;
        rightStickLeftMesh.position.y = this.pos.y - this.size.outTile.y / 2;
        rightStickLeftMesh.position.z = this.pos.z + this.size.z / 2 - this.size.wall - this.size.frame.y / 2 - this.size.mark.x;
        scene.add(rightStickLeftMesh);
        var rightStickRightMesh = new THREE.Mesh(stickGeo, frameMat);
        rightStickRightMesh.position.x = this.pos.x - this.size.x / 2 - this.size.frame.x / 2;
        rightStickRightMesh.position.y = this.pos.y - this.size.outTile.y / 2;
        rightStickRightMesh.position.z = this.pos.z - this.size.z / 2 + this.size.wall + this.size.frame.x / 2;
        scene.add(rightStickRightMesh);
    };

    underArmour.makePillow = function() {
        var pillowMat = new THREE.MeshBasicMaterial({ color: this.color.pillow });
        var pillowGeo = new THREE.CubeGeometry(this.size.pillow.x, this.size.y, this.size.pillow.y);
        
        var frontLeftMesh = new THREE.Mesh(pillowGeo, pillowMat);
        frontLeftMesh.position.x = this.pos.x + this.size.x / 2 - this.size.wall + this.size.pillow.x / 2;
        frontLeftMesh.position.y = this.pos.y;
        frontLeftMesh.position.z = this.pos.z + this.size.z / 2 - this.size.wall + this.size.pillow.x / 2;
        scene.add(frontLeftMesh);

        var frontRightMesh = new THREE.Mesh(pillowGeo, pillowMat);
        frontRightMesh.position.x = this.pos.x - this.size.x / 2 + this.size.wall - this.size.pillow.x / 2;
        frontRightMesh.position.y = this.pos.y;
        frontRightMesh.position.z = this.pos.z + this.size.z / 2 - this.size.wall + this.size.pillow.x / 2;
        scene.add(frontRightMesh);

        var bottomLeftMesh = new THREE.Mesh(pillowGeo, pillowMat);
        bottomLeftMesh.position.x = this.pos.x + this.size.x / 2 - this.size.wall + this.size.pillow.x / 2;
        bottomLeftMesh.position.y = this.pos.y;
        bottomLeftMesh.position.z = this.pos.z - this.size.z / 2 + this.size.wall - this.size.pillow.x / 2;
        scene.add(bottomLeftMesh);

        var bottomRightMesh = new THREE.Mesh(pillowGeo, pillowMat);
        bottomRightMesh.position.x = this.pos.x - this.size.x / 2 + this.size.wall - this.size.pillow.x / 2;
        bottomRightMesh.position.y = this.pos.y;
        bottomRightMesh.position.z = this.pos.z - this.size.z / 2 + this.size.wall - this.size.pillow.x / 2;
        scene.add(bottomRightMesh);
    };

    underArmour.makeWall = function() {
        var wallMaterial = new THREE.MeshBasicMaterial({ color: this.color.wall });
        wallMaterial.transparent = true;
        wallMaterial.opacity = 0.5;

        var frontGeo = new THREE.CubeGeometry(this.size.x, this.size.y, this.size.wall);
        var frontMesh = new THREE.Mesh(frontGeo, wallMaterial);
        frontMesh.position.x = this.pos.x;
        frontMesh.position.y = this.pos.y;
        frontMesh.position.z = (this.pos.z + this.size.z / 2) - this.size.wall / 2;
        scene.add(frontMesh);

        var backGeo = new THREE.CubeGeometry(this.size.x, this.size.y, 20);
        var backMesh = new THREE.Mesh(backGeo, wallMaterial);
        backMesh.position.x = this.pos.x;
        backMesh.position.y = this.pos.y;
        backMesh.position.z = (this.pos.z - this.size.z / 2) + this.size.wall / 2;
        scene.add(backMesh);
        
        var leftGeo = new THREE.CubeGeometry(this.size.wall, this.size.y, this.size.z);
        var leftMesh = new THREE.Mesh(leftGeo, wallMaterial);
        leftMesh.position.x = (this.pos.x - this.size.x / 2) + this.size.wall / 2;
        leftMesh.position.y = this.pos.y;
        leftMesh.position.z = this.pos.z;
        scene.add(leftMesh);
        
        var rightGeo = new THREE.CubeGeometry(this.size.wall, this.size.y, this.size.z);
        var rightMesh = new THREE.Mesh(rightGeo, wallMaterial);
        rightMesh.position.x = (this.pos.x + this.size.x / 2) - this.size.wall / 2;
        rightMesh.position.y = this.pos.y;
        rightMesh.position.z = this.pos.z;
        scene.add(rightMesh);
    };

    return underArmour;
}
