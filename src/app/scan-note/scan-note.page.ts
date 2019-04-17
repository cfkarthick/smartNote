import { Component, OnInit,Renderer2  } from '@angular/core';
import {ScriptServiceService} from '../script-service.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Device } from '@ionic-native/device/ngx';



declare var THREE: any;
declare var THREEx: any;
declare var Stats: any;
@Component({
  selector: 'app-scan-note',
  templateUrl: './scan-note.page.html',
  styleUrls: ['./scan-note.page.scss'],
})
export class ScanNotePage implements OnInit {
 
  constructor(public ScriptService:ScriptServiceService,private render:Renderer2
    ,public splashScreen: SplashScreen,public device:Device) {
      //this.ScriptService.loadScript('threex');
      //this.ScriptService.loadScript('stats').then(()=>{});
      //this.ScriptService.loadScript('ar').then((data)=>{});
     
    }
    
  ngOnInit() {
    this.splashScreen.hide();
  }  

  ionViewDidEnter() {
   
    
      console.log("test da")
    var renderer	= new THREE.WebGLRenderer({
      antialias	: true,
      alpha: true
    });
    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    // renderer.setPixelRatio( 1/2 );
    renderer.setSize( 500, 500 );
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    renderer.domElement.style.background='transparent'
    this.render.selectRootElement('div').appendChild(renderer.domElement);
  
    // array of functions for the rendering loop
    var onRenderFcts= [];
  
    // init scene and camera
    var scene	= new THREE.Scene();
    
    //////////////////////////////////////////////////////////////////////////////////
    //		Initialize a basic camera
    //////////////////////////////////////////////////////////////////////////////////
  
    // Create a camera
    var camera = new THREE.Camera();
    scene.add(camera);
    console.log(camera);
    ////////////////////////////////////////////////////////////////////////////////
    //          handle arToolkitSource
    ////////////////////////////////////////////////////////////////////////////////
   
    
    // start camera
    
    var arToolkitSource = new THREEx.ArToolkitSource({
      // to read from the webcam 
      sourceType : 'webcam'		
    })
  
    arToolkitSource.init(function onReady(){
      onResize()
    })
    
    // handle resize
    window.addEventListener('resize', function(){
      onResize()
    })
    function onResize(){
      arToolkitSource.onResize()	
      arToolkitSource.copySizeTo(renderer.domElement)	
      if( arToolkitContext.arController !== null ){
        arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
      }	
    }
    ////////////////////////////////////////////////////////////////////////////////
    //          initialize arToolkitContext
    ////////////////////////////////////////////////////////////////////////////////
    
  
    // create atToolkitContext
    var arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: '../../assets/ar/scripts/camera_para.dat',
      detectionMode: 'mono',
      maxDetectionRate: 30,
      canvasWidth: 80*3,
      canvasHeight: 60*3,
    })
    // initialize it
    arToolkitContext.init(function onCompleted(){
      // copy projection matrix to camera
      camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
    })
  
    // update artoolkit on every frame
    onRenderFcts.push(function(){
      if( arToolkitSource.ready === false )	return
  
      arToolkitContext.update( arToolkitSource.domElement )
    })
    
    
    ////////////////////////////////////////////////////////////////////////////////
    //          Create a ArMarkerControls
    ////////////////////////////////////////////////////////////////////////////////
    
    var markerRoot = new THREE.Group
    scene.add(markerRoot)
    var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
      type : 'pattern',
      patternUrl : '../../assets/ar/scripts/patt.hiro'
      // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji'
    })
  
    // build a smoothedControls
    var smoothedRoot = new THREE.Group()
    scene.add(smoothedRoot)
    var smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
      lerpPosition: 0.4,
      lerpQuaternion: 0.3,
      lerpScale: 1,
    })

    var ambientLight = new THREE.AmbientLight('#fff', 0.5);
    var arWorldRoot = smoothedRoot
    smoothedRoot.add(ambientLight)


    var pointLight = new THREE.PointLight(0xffffff, 0.9);
    smoothedRoot.add(pointLight);
    
    onRenderFcts.push(function(delta){
      smoothedControls.update(markerRoot)
    })
    //////////////////////////////////////////////////////////////////////////////////
    //		add an object in the scene
    //////////////////////////////////////////////////////////////////////////////////
  
    var arWorldRoot = smoothedRoot
  
    // add a torus knot	
    var geometry	= new THREE.CubeGeometry(1,1,1);
    var material	= new THREE.MeshNormalMaterial({
      transparent : true,
      opacity: 0.5,
      side: THREE.DoubleSide
    }); 
    var mesh	= new THREE.Mesh( geometry, material );
    mesh.position.y	= geometry.parameters.height/2
    arWorldRoot.add( mesh );
    
    // var geometry	= new THREE.TorusKnotGeometry(0.3,0.1,64,16);
    // var material	= new THREE.MeshNormalMaterial(); 
    // var mesh	= new THREE.Mesh( geometry, material );
    // mesh.position.y	= 0.5
    // arWorldRoot.add( mesh );
      
      var header_html = '';
      header_html += '<div style="width:256px; height:80px; background-color:white;margin:0;padding:2px 0px;margin-left:-10px;margin-top:-15px;">';
      header_html += ' <img src="images/rrd_logo.svg" style="width:120px;height:70px;margin-left:10px"/>';
      header_html += ' <img src="images/meetup.svg" style="width:80px;height:70px;margin-top: 3px;margin-right: 10px;" align="right"/>';
      //header_html += ' <img src="./images/rrd_logo.png" style="margin-left:10px"/>';
      //header_html += ' <img src="./images/meetup.png" style="width:100px;height:60px;margin-top: 3px;" align="right"/>';
      header_html += '</div>';
  
      var canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      canvas.setAttribute('id', 'myCanvas');
  
      // var draw = function () {
      //     rasterizeHTML.drawHTML(header_html, canvas).then(function (result) {
      //         console.log(result);
      //     }, function (e) {
      //         console.log('An error occured:', e);
      //     });
      // };
  
      var textureHeader = new THREE.Texture(canvas);
      textureHeader.needsUpdate = true;
      // draw();
  
      // var materials = [
      //     leftSide = new THREE.MeshBasicMaterial({ color: 0xffffff }),        // Left side
      //     rightSide = new THREE.MeshBasicMaterial({ color: 0xffffff }),       // Right side
      //     topSide = new THREE.MeshBasicMaterial({ map: textureHeader }),         // Top side map: textureHeader
      //     bottomSide = new THREE.MeshBasicMaterial({ color: 0xffffff }),      // Bottom side
      //     frontSide = new THREE.MeshBasicMaterial({ color: 0xffffff }),     // Front side
      //     backSide = new THREE.MeshBasicMaterial({ color: 0xffffff })    // Back side
      // ];
  
      var geometryHeader = new THREE.BoxBufferGeometry((2 + 1.05), 0, 0.4);
      var cubeHeader = new THREE.Mesh(geometryHeader);
      cubeHeader.position.set(0, 0, -1);
      
      // var mesh	= new THREE.Mesh( geometry, material );
      // mesh.position.y	= geometry.parameters.height/2
      arWorldRoot.add( cubeHeader );
  
    onRenderFcts.push(function(){
      mesh.rotation.x += 0.1
    })
  
    //////////////////////////////////////////////////////////////////////////////////
    //		render the whole thing on the page
    //////////////////////////////////////////////////////////////////////////////////
    var stats = new Stats();
   // document.body.appendChild( stats.dom );
   document.body.appendChild(stats.dom)
    // render the scene
    onRenderFcts.push(function(){
      console.log("this is console karthick");
      renderer.render( scene, camera );
      stats.update();
    })
  
    // run the rendering loop
    var lastTimeMsec= null
    requestAnimationFrame(function animate(nowMsec){
      // keep looping
      requestAnimationFrame( animate );
      // measure time
      lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
      var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
      lastTimeMsec	= nowMsec
      // call each update function
      onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec/1000, nowMsec/1000)
      })
    })
    }
  

}
