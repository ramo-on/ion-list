import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";

// Configurar ícone personalizado
const customIcon = L.icon({
  iconUrl: 'assets/pin.png',
  iconSize: [50, 50], // Ajuste o tamanho conforme necessário
  iconAnchor: [15, 50], // Ponto de ancoragem do ícone
  popupAnchor: [0, -50] // Ponto de ancoragem do popup
});

// Remover ícone padrão
L.Marker.prototype.options.icon = customIcon;

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.page.html',
  styleUrls: ['./modelos.page.scss'],
})
export class ModelosPage implements OnInit {

  public leafletMap!: L.Map;

  lng: number = -49.270561;

  lat: number = -16.740493;

  zoom: number = 17;
  markers: L.Marker[] = [];


  constructor() { }

  ngOnInit() {

    this.loadLeafletMap()
  }

  ionViewDidEnter() {
    this.leafletMap.invalidateSize();
  }

  loadLeafletMap() {
    this.leafletMap = new L.Map('leafletMap');

    this.leafletMap.setView([this.lat, this.lng], this.zoom);

    L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.leafletMap);

    this.leafletMap.on('moveend', () => {
      const center = this.leafletMap.getCenter();
      this.lat = center.lat;
      this.lng = center.lng;

    });

        // Adicionar controle de localização
        const locateControl = new L.Control({ position: 'topleft' });
        locateControl.onAdd = () => {
          const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
          div.style.backgroundColor = 'white';
          div.style.width = '30px';
          div.style.height = '30px';
          div.style.cursor = 'pointer';
          div.innerHTML = '<i class="fa fa-location-arrow"></i>';
          div.onclick = () => {
            this.leafletMap.locate({ setView: true, maxZoom: this.zoom });
          };
          return div;
        };
        locateControl.addTo(this.leafletMap);

  }
    // Função para buscar POIs usando a API Overpass
    fetchPOIs(lat: number, lon: number, radius: number, query: string) {
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${lat},${lon})[${query}];out;`;
  
      fetch(overpassUrl)
        .then(response => response.json())
        .then(data => {
          // Limpar marcadores existentes
          this.markers.forEach(marker => this.leafletMap.removeLayer(marker));
          this.markers = [];
  
          // Adicionar novos marcadores
          data.elements.forEach((element: any) => {
            
            if (element.type === 'node') {
              // const latLng = [element.lat, element.lon];
              const popupText = element.tags.name || 'Unnamed POI';
              const marker = L.marker([element.lat, element.lon]).addTo(this.leafletMap)
                .bindPopup(popupText)
                // .openPopup();
              this.markers.push(marker);
            }
          });
        })
        .catch(error => {
          console.error('Error fetching POIs:', error);
        });
    }
  
    // Função para lidar com a busca de diferentes POIs
    searchPOIs(type: string) {
      let query = '';
      switch(type) {
        case 'pharmacy':
          query = 'amenity=pharmacy';
          break;
        case 'supermarket':
          query = 'shop=supermarket';
          break;
        case 'clothes':
          query = 'shop=clothes';
          break;
        default:
          alert('Tipo de POI desconhecido');
          return;
      }
      this.fetchPOIs(this.lat, this.lng, 5000, query); // 1000 metros de raio
    }

}
