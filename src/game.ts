import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import Script1 from "../8dcc2ca4-5e30-4488-9731-be24f0c041fd/src/item"
import Script2 from "../b53e3bde-9d22-4098-8707-29a685d25a3b/src/item"
import Script3 from "../b88efbbf-2a9a-47b4-86e1-e38ecc2b433b/src/item"
import Script4 from "../7d669c08-c354-45e4-b3a3-c915c8fd6b6e/src/item"
import { BeerBaseState, beerGlasses } from "./modules/beerGlass"
import { Sound } from "./modules/sound"
import { Player } from "./player"
import * as ui from "@dcl/ui-scene-utils"
import { beerDispenser } from "./modules/tap"
import { TriggerBoxShape } from '@dcl/ecs-scene-utils'
import * as utils from "@dcl/ecs-scene-utils"
import { triggerEmote, PredefinedEmote } from "@decentraland/RestrictedActions"
import { DynamicMedia, SwivelMetaServices  } from "swivelmeta-dcl-sdk"
import { addPresent } from "./modules/present";




const SMService = new SwivelMetaServices(
  "DCL-WISHER-ID",
  false,
  true,
true);

// Create a new scene
const scene = new Entity()
engine.addEntity(scene)

addPresent()

const StageImage = new DynamicMedia(
  new Texture("/images/blue.png"),
  new PlaneShape(),
  new Transform({
    position: new Vector3(8, 3, .35),
    rotation: Quaternion.Euler(0,0,0),
    scale: new Vector3(5, 7, 2)
  }),
  "MainScreen"
)

const Small = new DynamicMedia(
  new Texture("/images/blue.png"),
  new PlaneShape(),
  new Transform({
    position: new Vector3(.33, 5, 23),
    rotation: Quaternion.Euler(0,90,0),
    scale: new Vector3(12, 7, 2)
  }),
  "MainScreen"
)

const BigImage = new DynamicMedia(
  new Texture("/images/blue.png"),
  new PlaneShape(),
  new Transform({
    position: new Vector3(16, 4.5, 8),
    rotation: Quaternion.Euler(0,90,0),
    scale: new Vector3(16, 9, 2)
  }),
  "MainScreen"
)

const water1 = new DynamicMedia(
  new Texture("/images/blue.png"),
  new PlaneShape(),
  new Transform({
    position: new Vector3(10, 2, 8),
    rotation: Quaternion.Euler(90,90,0),
    scale: new Vector3(20, 4, 2)
  }),
  "MainScreen"
)

const water2 = new DynamicMedia(
  new Texture("/images/blue.png"),
  new PlaneShape(),
  new Transform({
    position: new Vector3(8, 2, 8),
    rotation: Quaternion.Euler(90,90,0),
    scale: new Vector3(20, 4, 2)
  }),
  "MainScreen"
)

const componententities= [
  { component: "mediaComponent1", object: Small },
  { component: "mediaComponent2", object: StageImage },
  { component: "mediaComponent3", object: BigImage },
  { component: "water1", object: water1 },
  { component: "water2", object: water2 },
 ]
SMService.updateMediaOnSceneLoad(componententities);
SMService.updateMediaOnSceneEnter(componententities);

//
//
//Dance Floor
//
//
const trigger = new Entity();
trigger.addComponent(new BoxShape())
trigger.getComponent(BoxShape).withCollisions = false
engine.addEntity(trigger);
trigger.addComponent(new Transform({
    position: new Vector3(9.5, 0, 20),
    scale: new Vector3(0, 0, 1)
}));

var inputSubscription = (e) => {
    if (emoteinterval == null) {
        triggerEmote({ predefined: PredefinedEmote.TIK })
        startemoteinterval()
        log("buttonup")
    }
};

var emoteinterval;

trigger.addComponent(new utils.TriggerComponent(
    new utils.TriggerBoxShape(new Vector3(12, 10, 20), new Vector3(0, 0, 0)),
    {
        onCameraEnter: () => {
            triggerEmote({ predefined: PredefinedEmote.TIK })
            startemoteinterval()
        },
        onCameraExit: () => {

            if (emoteinterval) {
                trigger.removeComponent(emoteinterval)
                emoteinterval = null
                log("removing interval")
            }


            log("unsubing")
        }
        , enableDebug: false
    }
))
    ;
let emotes = [PredefinedEmote.TIK, PredefinedEmote.DISCO, PredefinedEmote.ROBOT, PredefinedEmote.HAMMER]
function startemoteinterval() {
    if (emoteinterval == null) {
        emoteinterval = new utils.Interval(5000, (): void => {
            let index = Math.floor(Math.random() * emotes.length);
            triggerEmote({ predefined: emotes[index] })
        })
        trigger.addComponent(emoteinterval)
    }
}

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(16, 0, 0),
  rotation: new Quaternion(0, -0.7071068, 0, 0.7071068),
  scale: new Vector3(1, 1, 1)
})


_scene.addComponentOrReplace(transform)


// #1
const myVideoClip = new VideoClip(
  "https://livepeercdn.com/hls/d14b5tapgeyihwf8/index.m3u8"
)

// #2
const myVideoTexture = new VideoTexture(myVideoClip)

// #3
const myMaterial = new Material()
myMaterial.albedoTexture = myVideoTexture
myMaterial.roughness = 1
myMaterial.specularIntensity = 0
myMaterial.metallic = 0


// #4
const screen = new Entity()
screen.addComponent(new PlaneShape())
screen.addComponent(
  new Transform({
    position: new Vector3(16, 4.5, 24),
    rotation: Quaternion.Euler(0, -90, 0),
    scale: new Vector3(16,9,1)

    
  })

)
screen.addComponent(myMaterial)
screen.addComponent(
  new OnPointerDown(() => {
    myVideoTexture.playing = !myVideoTexture.playing
  })
)
engine.addEntity(screen)

// #5
myVideoTexture.play()




const base = new Entity('base')
engine.addEntity(base)
const transform3 = new Transform({
  position: new Vector3(0, 0, 32),
  rotation: new Quaternion(0, 0, 0, 0),
  scale: new Vector3(.99, .99, .99)
})
base.addComponentOrReplace(transform3)
const gltfShape2 = new GLTFShape("models/base2.gltf")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
base.addComponentOrReplace(gltfShape2)


const planks = new Entity('planks')
engine.addEntity(planks)
//planks.setParent(_scene)
const transform66 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 0),
  scale: new Vector3(1.478, 1.478, 1.478)
})
planks.addComponentOrReplace(transform66)
const gltfShape1a = new GLTFShape("models/planks.glb")
gltfShape1a.withCollisions = true
gltfShape1a.isPointerBlocker = true
gltfShape1a.visible = true
planks.addComponentOrReplace(gltfShape1a)



const planks2 = new Entity('planks2')
engine.addEntity(planks2)
//planks.setParent(_scene)
const transform67 = new Transform({
  position: new Vector3(8, 0, 24),
  rotation: new Quaternion(0, 0, 0, 0),
  scale: new Vector3(1.478, 1.478, 1.478)
})
planks2.addComponentOrReplace(transform67)
const gltfShape3a = new GLTFShape("models/planks.glb")
gltfShape3a.withCollisions = true
gltfShape3a.isPointerBlocker = true
gltfShape3a.visible = true
planks2.addComponentOrReplace(gltfShape3a)


const benchWLight3 = new Entity('benchWLight3')
engine.addEntity(benchWLight3)
benchWLight3.setParent(_scene)
const transform53 = new Transform({
  position: new Vector3(16.560039710998535, 0.3110992908477783, 14.426495552062988),
  rotation: new Quaternion(-4.127578846475997e-15, 0.7071068286895752, -8.429370268459024e-8, -0.7071068286895752),
  scale: new Vector3(0.09437122941017151, 0.09437084197998047, 0.09437122941017151)
})
benchWLight3.addComponentOrReplace(transform53)
const gltfShape56 = new GLTFShape("models/Bench_w_light.glb")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
benchWLight3.addComponentOrReplace(gltfShape56)






const beetWLights = new Entity('beetWLights')
engine.addEntity(beetWLights)
beetWLights.setParent(_scene)
const transform9 = new Transform({
  position: new Vector3(25.498332023620605, 8.568916320800781, 8.300411224365234),
  rotation: new Quaternion(-4.672012661455487e-15, -0.7071068286895752, 8.429368136830817e-8, 0.7071068286895752),
  scale: new Vector3(0.13726012408733368, 0.1372598260641098, 0.13726012408733368)
})
beetWLights.addComponentOrReplace(transform9)
const gltfShape7 = new GLTFShape("models/Beet_w-Lights.glb")
gltfShape7.withCollisions = true
gltfShape7.isPointerBlocker = true
gltfShape7.visible = true
beetWLights.addComponentOrReplace(gltfShape7)

const bottle = new Entity('bottle')
engine.addEntity(bottle)
bottle.setParent(_scene)
const transform22 = new Transform({
  position: new Vector3(10.498332023620605, 2, 14),
  rotation: new Quaternion(9.672012661455487e-15, 5.9071068286895752, 11.429368136830817e-8, 0.7071068286895752),

  scale: new Vector3(1, 1, 1.13726012408733368)
})

bottle.addComponentOrReplace(transform22)
const gltfShape12 = new GLTFShape("models/bottle_fixed2.glb")
gltfShape12.withCollisions = true
gltfShape12.isPointerBlocker = true
gltfShape12.visible = true
bottle.addComponentOrReplace(gltfShape12)




const externalLink = new Entity('website')
engine.addEntity(externalLink)

externalLink.setParent(_scene)
const transform16 = new Transform({
  position: new Vector3(31.5, 0.07604384422302246, 15.04959487915039),
  rotation: new Quaternion(-4.672012661455487e-15, 16.7071068286895752, 8.429368136830817e-8, 16.7071068286895752),
  scale: new Vector3(.9, .9, .9)
})
externalLink.addComponentOrReplace(transform16)


const greenSycamoreTree = new Entity('greenSycamoreTree')
engine.addEntity(greenSycamoreTree)
greenSycamoreTree.setParent(_scene)
const transform20 = new Transform({
  position: new Vector3(8.294395446777344, .5, 4.642902088165283),
  rotation: new Quaternion(1.0563159420377615e-15, 0.8968931436538696, -1.0691798024708987e-7, -0.4422474205493927),
  scale: new Vector3(10, 10, 10)
})
greenSycamoreTree.addComponentOrReplace(transform20)
const gltfShape10 = new GLTFShape("models/bloodmoon-cup2.glb")
gltfShape10.withCollisions = true
gltfShape10.isPointerBlocker = true
gltfShape10.visible = true
greenSycamoreTree.addComponentOrReplace(gltfShape10)

// Add an audio clip to the entity
const audio2 = new AudioClip('sounds/wolf.mp3')
const audioSource2 = new AudioSource(audio2)
greenSycamoreTree.addComponent(audioSource2)

// Create a new canvas for the UI element
const canvas222 = new UICanvas()

const imagebg2 = new UIImage(canvas222, new Texture("images/featured-cocktial.png"))

imagebg2.name = "clickable-image"
imagebg2.width = "500px"
imagebg2.height = "300px"
imagebg2.hAlign ="center"
imagebg2.sourceWidth = 1000
imagebg2.sourceHeight = 600
imagebg2.paddingLeft = 0
imagebg2.positionY = 0
imagebg2.isPointerBlocker = true
imagebg2.visible = false
imagebg2.onClick = new OnPointerDown(
    async function () {
        openExternalURL("https://wishervodka.com/collections/recipes?utm_source=Decentraland&utm_medium=BloodmoonPopup&utm_campaign=Celestial+Wilds")
    },
)


// Create a new text element and add it to the canvas
const text2 = new UIText(canvas222)
text2.hAlign ="center"
text2.value = "Did you know bloodmoon berries are a core food source for cosmos wolves?"
text2.visible = false
text2.fontSize = 20
text2.adaptWidth = false
text2.textWrapping = true
text2.width = 500
text2.positionX = 0
text2.vAlign = "bottom"
text2.paddingBottom = 10
text2.vTextAlign = "center"
text2.hTextAlign = "center"


// Listen for click events on the entity
greenSycamoreTree.addComponent(
  new OnPointerDown(() => {
    text2.visible = true
    imagebg2.visible = true
    utils.setTimeout(10000, ()=>{
    text2.visible = false
    imagebg2.visible = false

  })
  
   

    // Play the animation when the entity is clicked

    // Play the audio when the entity is clicked
    audioSource2.playOnce()
  })
)


//boobcube



//Star//

const flower = new Entity('flower')
engine.addEntity(flower)
flower.setParent(_scene)
const transform20flower = new Transform({
  position: new Vector3(17.294395446777344, .1, 4.742902088165283),
  rotation: new Quaternion(1.0563159420377615e-15, 2.8968931436538696, -1.0691798024708987e-7, -0.4422474205493927),
  scale: new Vector3(1, 1, 1)
})
flower.addComponentOrReplace(transform20flower)
const gltfShape10flower = new GLTFShape("models/crystal2.glb")
gltfShape10flower.withCollisions = true
gltfShape10flower.isPointerBlocker = true
gltfShape10flower.visible = true
flower.addComponentOrReplace(gltfShape10flower)


const flower2 = new Entity('flower2')
engine.addEntity(flower)
flower2.setParent(_scene)
const transform20flower2 = new Transform({
  position: new Vector3(30.094395446777344, .2, 11.942902088165283),
  rotation: new Quaternion(1.0563159420377615e-15, 0.8968931436538696, -1.0691798024708987e-7, -0.4422474205493927),
  scale: new Vector3(1.2, 1.2, 1.2)
})
flower2.addComponentOrReplace(transform20flower2)
const gltfShape10flower2 = new GLTFShape("models/crystal2.glb")
gltfShape10flower2.withCollisions = true
gltfShape10flower2.isPointerBlocker = true
gltfShape10flower2.visible = true
flower2.addComponentOrReplace(gltfShape10flower2)



// Add an audio clip to the entity
const audio22 = new AudioClip('sounds/wolf.mp3')
const audioSource22 = new AudioSource(audio22)
flower2.addComponent(audioSource22)

// Create a new canvas for the UI element
const canvas2222 = new UICanvas()

const imagebg22 = new UIImage(canvas2222, new Texture("images/lore.png"))

imagebg22.name = "clickable-image"
imagebg22.width = "500px"
imagebg22.height = "300px"
imagebg22.hAlign ="center"
imagebg22.sourceWidth = 1000
imagebg22.sourceHeight = 600
imagebg22.paddingLeft = 0
imagebg22.positionY = 0
imagebg22.isPointerBlocker = true
imagebg22.visible = false
imagebg22.onClick = new OnPointerDown(
    async function () {
        openExternalURL("https://wishervodka.com/collections/recipes?utm_source=Decentraland&utm_medium=BloodmoonPopup&utm_campaign=Celestial+Wilds")
    },
)


// Create a new text element and add it to the canvas
const text22 = new UIText(canvas2222)
text22.hAlign ="center"
text22.value = "Uh, oh this is an Arcane Abberation. "
text22.visible = false
text22.fontSize = 20
text22.adaptWidth = false
text22.textWrapping = true
text22.width = 500
text22.positionX = 0
text22.vAlign = "bottom"
text22.paddingBottom = 10
text22.vTextAlign = "center"
text22.hTextAlign = "center"


// Listen for click events on the entity
flower2.addComponent(
  new OnPointerDown(() => {
    text22.visible = true
    imagebg22.visible = true
    utils.setTimeout(15000, ()=>{
    text22.visible = false
    imagebg22.visible = false

  })
  
   

    // Play the animation when the entity is clicked

    // Play the audio when the entity is clicked
    audioSource22.playOnce()
  })
)




const portal = new Entity('portal')
engine.addEntity(portal)
portal.setParent(_scene)
const transform1989 = new Transform({
  position: new Vector3(8.498332023620605, -.5, .4),
  rotation: new Quaternion(-4.672012661455487e-15, 0.7071068286895752, 0.429368136830817e-8, 26.7071068286895752),
  scale: new Vector3(.8, .8, .8)
})
portal.addComponentOrReplace(transform1989)
const gltfShape767 = new GLTFShape("models/portal.glb")
gltfShape767.withCollisions = true
gltfShape767.isPointerBlocker = true
gltfShape767.visible = true
portal.addComponentOrReplace(gltfShape767)


portal.addComponent(
    new OnPointerDown(() => {
      openExternalURL("https://go.swivelmeta.io/Tv3ipPo/wisher-vodka-r1")
    })
  );

  // text to display //
const canvas = new UICanvas()

const myText = new UIText(canvas)
myText.value =
  "Post an image on twitter, tag @wishervodka & @DJTRAXNFT"
myText.fontSize = 20
myText.adaptWidth = false
myText.textWrapping = true
myText.width = 500
myText.positionX = 0
myText.vAlign = "bottom"
myText.paddingBottom = 10
myText.vTextAlign = "center"
myText.hTextAlign = "center"
myText.visible = false



// text click //


const uiTrigger = new Entity()
const transform2bb = new Transform({
  position: new Vector3(12, 1, 5),
  scale: new Vector3(.3, .3, .3),
})
uiTrigger.addComponent(transform2bb)

uiTrigger.addComponent(
  new OnPointerDown(() => {
    canvas.visible = true
    canvas.isPointerBlocker = true
  })
)


engine.addEntity(uiTrigger)

// Wisher Signage Button text show on image click //

const close = new UIImage(canvas, new Texture("images/signage.png"))

close.name = "clickable-image"
close.width = "100px"
close.height = "50px"
close.hAlign ="left"
close.sourceWidth = 500
close.sourceHeight = 250
close.paddingLeft = -10
close.positionY = 160
close.isPointerBlocker = true
close.onClick = new OnPointerDown(() =>  {
  log("clicked on the close image")
  myText.visible = true
  canvas.isPointerBlocker = true
  utils.setTimeout(5000, ()=>{
    myText.visible = false
})
  
})


//buynow button//

// text to display //
const canvasbottle2 = new UICanvas()

const myTextbottle2 = new UIText(canvas)
myText.value =
"Post an image on twitter, tag @wishervodka & @serenaelis"
myTextbottle2.fontSize = 20
myTextbottle2.adaptWidth = false
myTextbottle2.textWrapping = true
myTextbottle2.width = 500
myTextbottle2.positionX = 0
myTextbottle2.vAlign = "bottom"
myTextbottle2.paddingBottom = 10
myTextbottle2.vTextAlign = "center"
myTextbottle2.hTextAlign = "center"
myTextbottle2.visible = false




// text show on image click //

const closebottle2 = new UIImage(canvasbottle2, new Texture("images/buynow.png"))

closebottle2.name = "clickable-image"
closebottle2.width = "260px"
closebottle2.height = "215px"
closebottle2.hAlign ="left"
closebottle2.sourceWidth = 1000
closebottle2.sourceHeight = 532
closebottle2.paddingLeft = -170
closebottle2.positionY = 30
closebottle2.isPointerBlocker = true
closebottle2.onClick = new OnPointerDown(
    async function () {
        openExternalURL("https://wishervodka.com/products/wisher-bottle")
    },
)


//end buy now button//




const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const options = { inventory }

const script1 = new Script1()
const script2 = new Script2()
const script3 = new Script3()
const script4 = new Script4()
script1.init()
script2.init()
script3.init()
script4.init()
//script4.spawn(imageFromURL3, {"image":"https://cdn.shopify.com/s/files/1/0610/1119/8185/files/Today_at_3pm_EST_Decentraland_4_-111.jpg?v=1666980868"}, createChannel(channelId, imageFromURL3, channelBus))
script4.spawn(externalLink, {"image":"https://cdn.shopify.com/s/files/1/0610/1119/8185/files/Untitled_design_15_600x600.png?v=1639777149", "link":"https://wishervodka.com/"}, createChannel(channelId, externalLink, channelBus))
//script4.spawn(imageFromURL4, {"image":"https://cdn.shopify.com/s/files/1/0610/1119/8185/files/wrixia-panel.jpg?v=1666564382"}, createChannel(channelId, imageFromURL4, channelBus))
//script4.spawn(imageFromURL5, {"image":"https://cdn.shopify.com/s/files/1/0610/1119/8185/files/Today_at_3pm_EST_Decentraland_4_-111.jpg?v=1666980868"}, createChannel(channelId, imageFromURL4, channelBus))


export const sceneMessageBus = new MessageBus()
/*
// Base
const base = new Entity()
base.addComponent(new GLTFShape("models/baseDarkWithCollider.glb"))
engine.addEntity(base)
*/

// Sound
const errorSound = new Sound(new AudioClip("sounds/error.mp3"))

// Tables


// Instance the input object
const input = Input.instance

input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, true, (event) => {
  if (Player.holdingBeerGlass && event.hit) {
    if (event.hit.normal.y > 0.99) {
      for (let i = 0; i < beerGlasses.length; i++) {
        // Check if item has a parent
        if (beerGlasses[i].getParent()?.alive) {
          let beerPosition: Vector3
          switch (event.hit.meshName) {
            case "redBase_collider":
              beerPosition = beerDispenser.getComponent(Transform).position.clone().subtract(new Vector3(0.368, -0.02, 0.31))
              beerGlasses[i].putDown(i, beerPosition, (beerGlasses[i].beerBaseState = BeerBaseState.RED_BEER))
              break
            case "yellowBase_collider":
              beerPosition = beerDispenser.getComponent(Transform).position.clone().subtract(new Vector3(0, -0.02, 0.31))
              beerGlasses[i].putDown(i, beerPosition, (beerGlasses[i].beerBaseState = BeerBaseState.YELLOW_BEER))
              break
            case "greenBase_collider":
              beerPosition = beerDispenser.getComponent(Transform).position.clone().subtract(new Vector3(-0.368, -0.02, 0.31))
              beerGlasses[i].putDown(i, beerPosition, (beerGlasses[i].beerBaseState = BeerBaseState.GREEN_BEER))
              break
            default:
              log("DEFAULT")
              beerGlasses[i].putDown(i, event.hit.hitPoint, BeerBaseState.NONE)
              break
          }
        }
      }
    } else {
      noSign.show(1)
      errorSound.getComponent(AudioSource).playOnce()
    }
  }
})

input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, () => {
  if (Player.holdingBeerGlass) {
    for (let i = 0; i < beerGlasses.length; i++) {
      // Check if item has a parent
      if (beerGlasses[i].getParent()?.alive && beerGlasses[i].isFull) {
        beerGlasses[i].drink(i) 
      }
    }
  }
})

let noSign = new ui.CenterImage("images/no-sign.png", 1, true, 0, 20, 128, 128, {
  sourceHeight: 512,
  sourceWidth: 512,
  sourceLeft: 0,
  sourceTop: 0,
})


 