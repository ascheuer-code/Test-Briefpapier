


//diese funktion sorgt dafür das man bilder hinzufügen kann
count = 0;
function viewImage() {
    var imagefile = document.querySelector('#image');
    if (imagefile.files && imagefile.files[count]) {


        for (var i = 0; i < imagefile.files.length; i++) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var container = document.createElement("div")

                container.setAttribute("class", "dragme")

                //var content = '<img class="im" id="temp_image_' + count + '" style="border: 1px solid; " >';

                //  container.innerHTML += content
                document.querySelector('body').appendChild(container)
                //document.querySelector('#temp_image_' + count).setAttribute('src', e.target.result);
                container.style.backgroundImage = "url(" + e.target.result + ")"

                function onDrag({ movementX, movementY }) {
                    let getStyle = window.getComputedStyle(container);
                    let leftVal = parseInt(getStyle.left);
                    let topVal = parseInt(getStyle.top);
                    container.style.left = `${leftVal + movementX}px`;
                    container.style.top = `${topVal + movementY}px`;
                }
                container.addEventListener("mousedown", () => {
                    if (document.getElementById("check").checked == true) {
                        container.classList.add("active");
                        container.addEventListener("mousemove", onDrag);
                        console.log("left: " + container.getBoundingClientRect().x)
                        console.log("top: " + container.getBoundingClientRect().y)

                        console.log("width: " + container.getBoundingClientRect().width)
                        console.log("height: " + container.getBoundingClientRect().height)

                    }
                });


                document.addEventListener("mouseup", () => {
                    container.classList.remove("active");
                    container.removeEventListener("mousemove", onDrag);
                });

            }
            reader.readAsDataURL(imagefile.files[count]);
            this.imagefile = imagefile.files[count];
            count++;

        };
        count = 0;

    }
}




//entfernt den Border und die resize funktion
function borderkiller() {
    var liste = document.getElementsByClassName("dragme")
    console.log(liste)
    for (var i = 0; i < liste.length; i++) {
        liste[i].style.border = "none"
        liste[i].style.resize = "none"
    }

}