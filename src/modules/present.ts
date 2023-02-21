import * as ui from "@dcl/ui-scene-utils";
import * as utils from "@dcl/ecs-scene-utils";



export function addPresent() {
  

//---------Play audio on click -------//

// Create a new entity
const present = new Entity()
present.addComponent(new GLTFShape("models/present.glb"))

// Set the position of the entity
present.addComponent(new Transform({
position: new Vector3(1.2, .5, 6.1),
scale: new Vector3(.03, .03, .03)
}))

// Add an audio clip to the entity
const audio = new AudioClip('sounds/present.wav')
const audioSource = new AudioSource(audio)
present.addComponent(audioSource)

// Create a new canvas for the UI element
const canvas22 = new UICanvas()
canvas22.visible = false


const imagebg = new UIImage(canvas22, new Texture("images/holidays.png"))

imagebg.name = "clickable-image"
imagebg.width = "500px"
imagebg.height = "300px"
imagebg.hAlign ="center"
imagebg.sourceWidth = 1000
imagebg.sourceHeight = 600
imagebg.paddingLeft = 0
imagebg.positionY = 0
imagebg.isPointerBlocker = true
imagebg.visible = false
imagebg.onClick = new OnPointerDown(
    async function () {
        openExternalURL("https://tyanna.org/donate/")
    },
)


// Create a new text element and add it to the canvas
const text = new UIText(canvas22)
//text.value = "Use promocode 'cosmos' at wishervodka.com to get one free cowboy hat"
text.visible = false

// Listen for click events on the entity
present.addComponent(
  new OnPointerDown(() => {
    //text.visible = true
    imagebg.visible = true
    utils.setTimeout(8000, ()=>{
      imagebg.visible = false
    //text.visible = false
  })
  
   

    // Play the animation when the entity is clicked

    // Play the audio when the entity is clicked
    audioSource.playOnce()
  })
)

// Add the entity to the scene
engine.addEntity(present)

//---------END Play audio on click -------//
}