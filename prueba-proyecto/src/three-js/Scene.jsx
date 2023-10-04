import React, { Component } from "react";
import "./App.css";
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import axios from "axios";
import dir_url from "@/lib/url";


// import axios from 'axios'

let scene, camera, renderer, wall, popup, raycaster;
const popups = [];
const objectsWithTeleportID = [];
const target = new THREE.Vector2();
let isDragging
let previousMousePosition
let info = ''

class Scene extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.popupRef = React.createRef();
    this.menuRef = React.createRef();
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.animate = this.animate.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this); //Referenciar al clickear en la posición determinada en el canvas
    this.onLinkClick = this.onLinkClick.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);

    // Límites de rotación de la cámara
    this.minRotationX = -Math.PI / 4;
    this.maxRotationX = Math.PI / 4;

    this.minRotationY = -Math.PI / 4;
    this.maxRotationY = Math.PI / 4;

    // Zoom
    this.zoomSpeed = 0.1;
    this.targetZoom = 1;
    this.currentZoom = 1;

    this.state = {
      zoom: 1,
      isMenuVisible: true,
      isPopupVisible: false,
      isCloseMenuButtonVisible: false,
      isDragging: false,
    };

    this.cube = null;

    this.teleportProgress = 0;
    const teleportSpeed = 0.02;
  }


  openMenu = () => {
    this.setState({ isMenuVisible: true, isCloseMenuButtonVisible: false });
}

  closeMenu = () => {
    this.setState({ isMenuVisible: false, isCloseMenuButtonVisible: true });
}

  // loader.load('/models/poly.gltf',

  loadModel(modelPath, position, scale, rotation) {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);
  
    loader.load(modelPath, function (gltf) {
      const model = gltf.scene;
      model.scale.set(scale.x, scale.y, scale.z);
      model.position.set(position.x, position.y, position.z);
      model.rotation.set(rotation.x, rotation.y, rotation.z); // Aplica la rotación aquí
      scene.add(model);
    });
  }
  
  componentDidMount() {
    this.init();
    this.animate();
    this.canvasRef.current.addEventListener("click", this.onCanvasClick);

    // Agrega los event listeners solo cuando estás dentro del canvas
    this.canvasRef.current.addEventListener("mousedown", this.onMouseDown);
    this.canvasRef.current.addEventListener("mouseup", this.onMouseUp);
    this.canvasRef.current.addEventListener("mousemove", this.onMouseMove);

    this.canvasRef.current.addEventListener("wheel", this.onMouseWheel);
  
    // Forma de añadir: UBICACIÓN ARCHIVO - UBICACIÓN EN ESCENA - TAMAÑO - ROTACIÓN
    this.loadModel('/models/poly.gltf', new THREE.Vector3(0, 7.5, 0), new THREE.Vector3(10, 10, 10), new THREE.Vector3(0, 0, 0));
    this.loadModel('/models/ortDesk.gltf', new THREE.Vector3(-15, 0, 8), new THREE.Vector3(2, 2, 2), new THREE.Vector3(0, Math.PI / 2, 0));


    // Instanciar popups
    // this.createPopup(X, Y, Z, "TEXTO");
    this.createPopup(-14, 3.75, 7, "Popup 1");
    this.createPopup(15, 5, 3, "Popup 2");
    this.createPopup(0, 0, -2, "Popup 3");
  }
  
  componentWillUnmount() {
    this.canvasRef.current.removeEventListener("click", this.onCanvasClick);
    this.canvasRef.current.removeEventListener("mousedown", this.onMouseDown);
    this.canvasRef.current.removeEventListener("mouseup", this.onMouseUp);
    this.canvasRef.current.removeEventListener("mousemove", this.onMouseMove);
  }

  

  // Hacer zoom
  onMouseWheel(event) {
    event.preventDefault();
    // Límite del zoom (Cuanto zoom se puede hacer en la escena)
    const minZoom = 0.75;
    const maxZoom = 2;

    const delta = event.deltaY * 0.001;

    const newZoom = THREE.MathUtils.clamp(
      this.state.zoom - delta,
      minZoom,
      maxZoom
    );

    this.setState({ zoom: newZoom });

    camera.fov = 50 / newZoom;
    camera.updateProjectionMatrix();
  }




  // Mover la vista de la cámra hacia el centro al cerrar el popup
  moveToCenter() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    target.x = ((centerX / window.innerWidth) * 2 - 1) * -1.5;
    target.y = ((centerY / window.innerHeight) * 2 - 1) * 0.5;
  }

  onMouseDown = () => {
    this.setState({ isDragging: true });
  };

  // Nuevo evento para indicar que se ha soltado el mouse
  onMouseUp = () => {
    this.setState({ isDragging: false });
  };

  // Nuevo evento para mover la cámara solo cuando se está arrastrando el mouse
  onMouseMove = (event) => {
    const { isDragging } = this.state;
    if (isDragging) {
      const deltaMove = {
        x: event.movementX,
        y: event.movementY,
      };

      // Ajusta la rotación de la cámara basada en el movimiento del mouse
      camera.rotation.order = "YXZ";
      const sensitivity = 0.002;
      camera.rotation.y += deltaMove.x * sensitivity;
      camera.rotation.x += deltaMove.y * sensitivity;

      // Limita la rotación vertical
      const maxVerticalAngle = Math.PI / 2;
      camera.rotation.x = Math.max(
        -maxVerticalAngle,
        Math.min(maxVerticalAngle, camera.rotation.x)
      );
    }
  };

  init() {
    // Crear escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 100) // Niebla

    // Añadir cámara
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    camera.position.y = 5;

    // Screen renderer    
    renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.current });
    renderer.setSize(1200, 600);
    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio)
    });

    // Añadir Grid
    var grid = new THREE.GridHelper(100, 50);
    scene.add(grid);

    // Añadir punto de luz
    var light = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(light);
    light.position.set(1, 5, 8);


    // Crear y agregar cubos adicionales con diferentes posiciones
    this.cube1 = this.createInteractiveTorus(4.5, 0.5, 7.5);
    this.cube1.name = "teleport";
    scene.add(this.cube1);

    this.cube2 = this.createInteractiveTorus(5, 0.5, 2);
    this.cube2.name = "teleport";
    scene.add(this.cube2);
    
    this.cube3 = this.createInteractiveTorus(10, 0.5, -2);
    this.cube3.name = "teleport";
    scene.add(this.cube3);

    this.cube4 = this.createInteractiveTorus(0, 0.5, 4);
    this.cube4.name = "teleport";
    scene.add(this.cube4);

    this.cube5 = this.createInteractiveTorus(-11, 0, 5);
    this.cube5.name = "teleport";
    scene.add(this.cube5);

    // Mover la cámara hacia el objeto presionado
    isDragging = false;
    previousMousePosition = { x: 0, y: 0 };


    // Añadir pared (test)
    var wallgeometry = new THREE.BoxGeometry(10, 5, 0.1);
    var wallmaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false });
    wall = new THREE.Mesh(wallgeometry, wallmaterial);
    scene.add(wall);
    wall.position.z = -5;
    wall.position.y = 2.5;
  }
  
  // Añadir los popups
  createPopup(x, y, z, id) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: true });
    popup = new THREE.Mesh(geometry, material);
    popup.position.set(x, y, z);
    scene.add(popup);
    popups.push({ mesh: popup, id });
  }


createInteractiveTorus(x, y, z) {
  const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 2, 64);
  const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xfffff, wireframe: false, emissive: 0xffffff, });
  const torus = new THREE.Mesh(torusGeometry, torusMaterial);
  torus.rotation.x = Math.PI / 2;

  // Collider encima de la geometría del TP para poder tener un mayor radio para clickear y teletransportarse
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
  const interactiveMesh = new THREE.Mesh(boxGeometry, boxMaterial);

  const interactiveTorus = new THREE.Group();
  interactiveTorus.add(torus);
  interactiveTorus.add(interactiveMesh);

  interactiveTorus.position.set(x, y, z);
  return interactiveTorus;
}

  animate() {
    if (!this.state.isPopupVisible) {
      // Suavizar el movimiento de la cámara
      const lerpAmount = 0.5; // Suavidad del movimiento
  
      requestAnimationFrame(this.animate);
      renderer.render(scene, camera);
    } else {
      requestAnimationFrame(this.animate);
    }
  }  

  // Detectar si se clickeó el canvas para mostrar el popup con la información de una obra
  onCanvasClick(event) {

    const GetInfo = async (idpopup) => {
      try {
        await axios.post(`${dir_url}/api/infoobras`, {
          id: idpopup
        }).then((res) => {
          console.log(res.data)
          info = res.data['description']
          this.showPopup(idpopup);
        })
      } catch (error) {
        console.log(error)
      }
    }

    const rect = this.canvasRef.current.getBoundingClientRect();
  const mouse = {
    x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
    y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
  };

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Verificar si el rayo intersecta con algún popup
  const intersects = raycaster.intersectObjects(popups.map((popup) => popup.mesh));

  if (intersects.length > 0) {
    // Hiciste clic en un popup, muestra el contenido del popup
    const popup = popups.find((p) => p.mesh === intersects[0].object);
    if (popup) {

      GetInfo(popup.id);

    }
  } else {
    // Hiciste clic en otro lugar de la escena, cierra el popup si está abierto
    if (this.state.isPopupVisible) {
      this.closePopup();
    }
  
      // Recorre todos los objetos en la escena y encuentra los que tienen el ID "teleport"
      scene.traverse((obj) => {
        if (obj.name === "teleport") {
          objectsWithTeleportID.push(obj);
        }
      });
  
      const teleportIntersects = raycaster.intersectObjects(objectsWithTeleportID);
  
      if (teleportIntersects.length > 0) {
        const targetPosition = teleportIntersects[0].point;
        const targetRotation = new THREE.Euler(0, camera.rotation.y, 0); // Mantener la rotación actual en el eje Y
  
        // Guarda la posición y rotación actual de la cámara
        const startPosition = camera.position.clone();
        const startRotation = camera.rotation.clone();
  
        const teleportSpeed = 0.02;
        let teleportProgress = 0;
  
        const animateTeleport = () => {
          teleportProgress += teleportSpeed;
          if (teleportProgress < 1) {
            const newPositionX = startPosition.x + (targetPosition.x - startPosition.x) * teleportProgress;
            const newPositionZ = startPosition.z + (targetPosition.z - startPosition.z) * teleportProgress;
            camera.position.set(newPositionX, camera.position.y, newPositionZ);
        
            camera.rotation.x = startRotation.x + (targetRotation.x - startRotation.x) * teleportProgress;
            camera.rotation.y = startRotation.y + (targetRotation.y - startRotation.y) * teleportProgress;
            camera.rotation.z = startRotation.z + (targetRotation.z - startRotation.z) * teleportProgress;
        
            requestAnimationFrame(animateTeleport);
          } else {
            camera.position.copy(targetPosition);
            camera.position.y = startPosition.y; // Restaura la altura de la cámara
            camera.rotation.copy(targetRotation);
          }
        };
        
        animateTeleport();
  
      }
    }
  }
  



  moveCameraToPosition(position) {
    const cameraY = camera.position.y; // Guardar posición Z
    camera.position.copy(position);
    camera.position.z = cameraY; // Igualar altura de la cámara a la posición de la cámara
    camera.lookAt(position);
  }

  // Mostrar el popup
  showPopup() {
    const popup = this.popupRef.current; //Añadir popup a la escena 3D (DOM)
    popup.style.display = "block"; //Cambia la propiedad "display" de "popup" con el fin de mostrarlo en la escena
    this.setState({ isPopupVisible: true });
  }

  // Ocultar el popup
  closePopup() {
    this.popupRef.current.style.display = "none"; //Ocultar elemento "popup" del HTML modificando su display con el fin de no tener una posición exacta en la pantalla.
    this.moveToCenter();
    this.setState({ isPopupVisible: false });
  }

  // Detectar si se clickeó sobre el menu para transportarse por la escena (Diferentes pisos)
  onLinkClick(event) {
    if (event.target.id === 'linkTP') {
      event.preventDefault();

      this.setState({ isTeleporting: true });

      setTimeout(() => {
        const position = this.cube1.position;
        const cameraY = camera.position.y;
        camera.position.copy(position);
        camera.position.y = cameraY;
        camera.lookAt(position);

        setTimeout(() => {
          // Desactiva la pantalla negra
          this.setState({ isTeleporting: false });
        }, 1000); // Tiempo de animación de teletransportación
      }, 500);
    }
  }


  render() {
    return (

          <div  className="w-full h-full flex justify-center items-center">
           <div id="darkOverlay" className={this.state.isTeleporting ? 'dark-overlay active' : 'dark-overlay'}></div>

            <canvas ref={this.canvasRef} className="App" />
            {this.state.isCloseMenuButtonVisible && (
            <button className="btnCloseMenu" onClick={this.openMenu}><i className="fa-solid fa-question"></i></button>
            )}
            {this.state.isMenuVisible && (
            <div className="w-[300px] h-[500px] scroll-smooth" ref={this.menuRef}>
            <div className="w-[250px] h-[300px] absolute top-1/2 bg-white appMenu opacity-75">
                <div className="w-full h-full flex items-center justify-center flex-col gap-5">
                  <li className="list-none w-full h-14 text-black hover:scale-95 transition flex justify-center items-center">
                    <span  id="linkTP" onClick={this.onLinkClick} className=" text-2xl text-start cursor-pointer">Ubicación 1</span>
                  </li>
                  <li className="list-none w-full h-14 text-black hover:scale-95 transition flex justify-center items-center">
                    <span  id="linkTP" onClick={this.onLinkClick} className=" text-2xl text-start cursor-pointer">Ubicación 2</span>
                  </li>
                  <li className="list-none w-full h-14 text-black hover:scale-95 transition flex justify-center items-center">
                    <span  id="linkTP" onClick={this.onLinkClick} className=" text-2xl text-start cursor-pointer">Ubicación 3</span>
                  </li>
                </div>
              </div>
            </div>
            )}
            
            
            <div id="popup" className="popup flex justify-center items-center flex-col bg-opacity-5 gap-5" ref={this.popupRef} style={{ display: "none", position: "absolute", top: 0, left: 0 }}>  {/* Hace referencia al elemento "popup" para mostrarlo en el HTML */}


            
            <h1 className="text-3xl font-semibold w-full text-center">Impacto Social</h1>
            
            <i className="fa-regular fa-eye-slash" id="eyeClose" onClick={this.closePopup}></i>
            <div className="flex w-full justify-center items-center flex-col gap-4">
              <div className="flex w-full justify-center items-center flex-row gap-4">
              <iframe
                width="300"
                height="200"
                className=""
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
  
              <p id="UItext">{info}</p>
              </div>
              <div className="w-12 h-12">
                <button onClick={this.closePopup} className="w-full h-full">Cerrar</button>
              </div>
            </div>
          </div>
          </div>
    );
  }
}

export default Scene;