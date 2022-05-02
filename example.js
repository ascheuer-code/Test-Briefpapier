count = 0;
function viewImage() {
    var imagefile = document.querySelector('#image');
    if (imagefile.files && imagefile.files[count]) {


        for (var i = 0; i < imagefile.files.length; i++) {
            var reader = new FileReader();
            reader.onload = function (e) {

                //container für das bild
                let container = document.createElement("div")
                container.setAttribute("class", "dragme")
                container.setAttribute("id", count)

                //remove button
                let button = document.createElement("button")
                button.setAttribute("class", "exit")
                button.textContent = "X"
                button.addEventListener("mousedown", (e) => {
                    removePicture();
                });
                container.appendChild(button)

                //Bild
                let image = document.createElement("img")
                image.setAttribute("class", "picture")
                image.setAttribute("src", e.target.result)
                image.setAttribute("draggable", false)
                image.setAttribute("ondragstart", "return false")
                container.appendChild(image)

                //Container samt bild hinzufügen
                document.getElementById("page").appendChild(container)

                function removePicture() {
                    document.getElementById("page").removeChild(button.parentElement)
                }

                function onDrag({ movementX, movementY }) {
                    let getStyle = window.getComputedStyle(container);
                    let leftVal = parseInt(getStyle.left);
                    let topVal = parseInt(getStyle.top);
                    container.style.left = `${leftVal + movementX}px`;
                    container.style.top = `${topVal + movementY}px`;
                }
                container.addEventListener("mousedown", () => {
                    if (document.getElementById("check").checked == false) {
                        container.classList.add("active");
                        container.addEventListener("mousemove", onDrag);
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
function drawImage() {
    let canvas = document.createElement("canvas")

    canvas.width = 793;
    canvas.height = (canvas.width * Math.sqrt(2))

    let page = document.getElementById("page")

    let ratioX = canvas.width / (page.getBoundingClientRect().right - page.getBoundingClientRect().left)
    //  let ratioX = canvas.width / page.getBoundingClientRect().width
    let ratioY = canvas.height / page.getBoundingClientRect().height

    let context = canvas.getContext("2d")


    let imageList = document.getElementsByClassName("picture")

    Array.prototype.forEach.call(imageList, function (e) {
        let pic = new Image()
        pic.src = e.currentSrc
        context.drawImage(pic, (e.x - (page.getBoundingClientRect().x) * ratioX), ((e.y - page.getBoundingClientRect().y) * ratioY), e.width * ratioX, e.height * ratioY)
    });

    let wind = window.open();


    wind.document.body.appendChild(canvas);


}
