
    var map;
    var infowindow;

navigator.geolocation.getCurrentPosition(initMap);

function initMap(position) {
    
  
     //obtenemos coordenadas
      let lat  = position.coords.latitude;
      let lng = position.coords.longitude;
      let locate = {lat, lng};
      map = new google.maps.Map(document.getElementById("map"),{
          center:locate,
          zoom:13
      });

infowindow = new google.maps.InfoWindow();
let service = new google.maps.places.PlacesService(map);
service.nearbySearch({
    location:locate,//localizacion
    radius:500, //radio
    type:["restaurant"]
}, callback);  
    
function callback(results, status){
    
    if(status === google.maps.places.PlacesServiceStatus.OK){
        for (let i = 0; i<results.length;i++){
            createMarker(results[i]);
            console.log(results);
            infoPlaces(results[i]);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
                  createMarker(results[i]); 
                  console.log(results);
                  const name = results[i].name;
                  const direccion = results[i].vicinity;
                  const foto = results[i].photos;
                  const restorant = document.getElementById('restorant');
                  restorant.innerHTML += `<h4>${name}</h4><p>${direccion}</p>`;
                //   console.log(name);
                //   console.log(direccion);
                //   console.log(foto);    
        }
    }
}
function infoPlaces(place){
    const name = place.name;
    const radius = place.vicinity;
    const photo = place.photos[0].getUrl({'maxWidth': 350, 'maxHeight': 350});
    
    const containerInfo = document.getElementById('imgInfo');
    containerInfo.innerHTML += `<h4>${name}</h4><p>${radius}</p><img src='${photo}'></img>` 
    console.log(name);
    console.log(radius);
    console.log(photo);
}

function createMarker(place){
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
        map:map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker,'click',function(){
        infowindow.setContent(place.name);

        infowindow.open(map,this);
    });
    }
    
}

}


}
