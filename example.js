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

                //Bild wird der imageListe hinzugefügt


                //get src from imageList
                //imageList.forEach(e => console.log(e.getAttribute("src")))


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

                        console.log("image height: " + image.getBoundingClientRect().height)
                        console.log("image width: " + image.getBoundingClientRect().width)

                        let page = document.getElementById("page")
                        console.log("Offset X: " + (image.getBoundingClientRect().x - page.getBoundingClientRect().x))
                        console.log("Offset Y: " + (image.getBoundingClientRect().y - page.getBoundingClientRect().y))
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
    var canvas = document.createElement("canvas")
    canvas.height = 1122;
    canvas.width = 793;

    var context = canvas.getContext("2d")

    let imageList = document.getElementsByClassName("picture")

    Array.prototype.forEach.call(imageList, function (e) {
        let pic = new Image()
        pic.src = e.currentSrc

        context.drawImage(pic, (e.x - page.getBoundingClientRect().x), (e.y - page.getBoundingClientRect().y), e.width, e.height)
    });

    console.log(imageList)

    //  Array.prototype.forEach.call(imageList, function (e) {

    //      var image = document.createElement("img")
    //      image.setAttribute("src", e.currentSrc)



    //      console.log(image)
    //      context.drawImage(image, 0, 0)

    //      //context.drawImage(image, e.height, e.width, (e.x - page.getBoundingClientRect().x), (e.y - page.getBoundingClientRect.y));
    //  });


    let wind = window.open();

    wind.document.body.style.width = "1122";
    wind.document.body.style.width = "793";
    wind.document.body.appendChild(canvas);


}