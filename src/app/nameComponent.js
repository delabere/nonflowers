export class nameComponent {
    constructor(args) {
        this.containerElementId = (typeof(args.containerElementId) !== "undefined" && args.containerElementId !== null) ? args.containerElementId : "flora";
    }


    render(plant, className = 'col-md-8') {

        var flowerContainer = document.createElement('div');
            flowerContainer.className = className + " flower mb-4";
            flowerContainer.id = plant.seed;

        var plantImg = document.createElement('img')
            plantImg.src = plant.canvas.toDataURL('image/png');
            plantImg.className = "img-fluid";

        flowerContainer.appendChild(plantImg);

        var infoContainer = document.createElement('div');
            infoContainer.className = "col-md-8 col-sm-6 mx-auto";

        var h5 = document.createElement("a");
            h5.className = ""
            h5.innerHTML = plant.name;
            h5.href= "./?seed=" + plant.seed + "&plantType=" + plant.type + "&plantCount=1";
            h5.target = "_blank";

        infoContainer.appendChild(h5);

        Object.entries(plant.description).map(obj => {
            var description = document.createElement("p");
            description.className = "text-start my-0 ms-2";
            description.innerHTML = obj.reverse().join(" ")// [1] + obj[0];
            infoContainer.appendChild(description);
        })

        flowerContainer.appendChild(infoContainer);

        var flora = document.getElementById(this.containerElementId);
            flora.appendChild(flowerContainer);
    }

}