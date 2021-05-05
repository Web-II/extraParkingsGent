import { StreetMap } from "./streetmap.js";

function fetchRequest(url) {
  return fetch(url).then((response) => response.json());
}

class Parking {
  constructor(latitude, longitude, address, contact, total, free, lastModified) {
    this._latitude = latitude;
    this._longitude = longitude;
    this._address = address;
    this._contact = contact;
    this._total = total;
    this._status = {
      'free': free,
      'lastModified': lastModified
    }
  }

  get latitude() {
    return this._latitude;
  }
  get longitude() {
    return this._longitude;
  }
  get address() {
    return this._address;
  }
  get contact() {
    return this._contact;
  }
  get total() {
    return this._total;
  }
  get status() {
    return this._status;
  }
  get procentFree() {
    const { free } = this.status;
    return Math.ceil((free / this.total) * 100);
  }
  get statusColor() {
    return this.procentFree <= 5 ? "redStatus" : this.procentFree <= 25 ? "orangeStatus" : "greenStatus";
  }
  updateStatus(free, lastModified) {
    this._status = {
      'free': free,
      'lastModified': lastModified
    }
  }

}

class ParkingsRepository {
  constructor() {
    this._parkings = new Map();
  }
  get parkings() {
    return [...this._parkings];
  }
  get totalFree() {

  }
  get totalCapacity() {

  }
  parking(name, latitude, longitude, address, contact, total, free, lastModified) {

  }

  getParkingByName(name) {

  }
}

class ParkingsApp {
  constructor() {
    this._parkingsRepository = new ParkingsRepository();
    this.getData();
    this._timer = null;
  }
  getData() {
    const url =
      "https://data.stad.gent/api/records/1.0/search/?dataset=bezetting-parkeergarages-real-time";
    //fetch data 
  }


  showParkings() {
    document.getElementById("parkings").innerHTML = "";
    if (this._timer) clearInterval(this._timer);
    this._timer = setInterval(() => {
      this.getData();
    }, 60000);
    document.getElementById("total").innerHTML = `Free: ${this._parkingsRepository.totalFree}/${this._parkingsRepository.totalCapacity} on ${new Date().toLocaleDateString()}`;

    this._parkingsRepository.parkings.forEach(([name, parking]) => {
      document.getElementById("parkings").insertAdjacentHTML(
        "beforeend",
        `     
				<div class="col s12 m6 l4">
				<div class="card" id="${name}">				
					<div class="card-content">
          <span class="card-title">${name}</span>
						<span class="free ${parking.statusColor}">${parking.status.free}</span><hr>
						<p>Capacity: ${parking.total}</p> <p>Free: ${parking.procentFree} %</p>             					
						<p>Last update: ${parking.status.lastModified.slice(11, 16)}</p>
					</div> 
					</div>       
				</div>
				</div>
				`
      );
      //show one parking use name of parking to get parking
      document.getElementById(name).onclick = () => {

      };
    });
  }
  showParking(name, parking) {
    if (this._timer) clearInterval(this._timer);
    document.getElementById("parkings").innerHTML = "";
    document.getElementById("parkings").insertAdjacentHTML(
      "beforeend",
      `     
			<div id="back" class="col s12">
				<div class="card">				
					<div class="card-stacked">  
						<div class="card-content detail">
							<span class="card-title">${name}</span>             
							<ul>
								<li><label>Free:</label> ${parking.status.free}</li>
								<li><label>Capacity:</label> ${parking.total}</li>
								<li><label>Address:</label> ${parking.address.replace("\n", " - ")}</li>
								<li><label>Contact:</label> ${parking.contact}</li>						
							</ul>
						</div> 
					</div>
					<div class="card-image">
						<div id="map" style="height:350px" ></div>
					</div>       
				</div>
			</div>
			<div class="col s12">
			</div>
			`
    );
    //show on StreetMap

  }
}

window.onload = () => {
  new ParkingsApp();
};
