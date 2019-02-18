import React, { Component } from "react";
import {Map, InfoWindow, Polyline, Marker, GoogleApiWrapper ,BicyclingLayer} from 'google-maps-react';
import "./App.css";
import MarkerConfig from "./MarkerConfig";
import Export from './Export';
import Import from './Import';

import Itineraire from './itinéraire';


export class Markeur {

    constructor(nom,lat,lng,titre,texte,img){

        this.nom=nom;
        this.lat=lat;
        this.lng=lng;
        this.titre=titre;
        this.texte=texte;
        this.img=img;


    }
}


const style = {
    width: '75%',
    height: '75%',

};


export class MapContainer extends Component {





    constructor(props) {
        super(props);
        this.mk = [];

        this.state = {

            place: null,
            nbmk: 1,
            isOpen: false,
            Poly: true,
            id: 0,
            on: props.on,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            Event: {},

            


        };
        this.button = this.state.on ? "none" : "block";


    }


/** Fonction serveur import - export **/

update = () => {this.setState({nbmk:10})};

/** Function qui permet de d'actualiser la polyline du markeur pour */
    newDragend = (markeur,p2,event) =>{

        var newlat = event.latLng.lat();
        var newlng = event.latLng.lng();
        var id= markeur.id;

        this.mk[id].lng=newlng;
        this.mk[id].lat=newlat;
        this.setState({nmbk:this.mk.length});
    };

    affichage =(markeur,p2,event) => {
    this.setState({on:!this.state.on})

    };



    change () {
        this.setState({Poly:!this.state.Poly})
    }

    /** permet de supprimer un markeur depuis le bouton **/
    delete () {
        this.mk.pop();
        this.setState({nbmk:this.mk.length})
        this.setState({nbmk: this.mk.length, showingInfoWindow: false})
    }
/** permet de supprimer tous les markeurs depuis le bouton **/
    deleteAll () {

        this.mk.splice(0, this.mk.length);
        this.setState({nbmk: this.mk.length, showingInfoWindow: false})
    }



/** permet d'ajouter un markeur sur la map en appuyant sur click gauche**/
    handleMapClick(p1,p2,event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA3Gsj08QzmXalEyHuuHgnzNKk4dGS6i84`)
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        // })
        this.mk.push(new Markeur("point "+ this.mk.length,lat,lng));
        this.setState({nbmk:this.mk.length});


    }

    onMarkerClick = (props, marker, event) =>{


        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            Event: event,
            showingInfoWindow:true,
        });
};
    FunctionTestAfficher = () => {
        if (this.mk.length > 1){
            return this.mk[1].lat
        }
    };

    SupprimerMarkeurActuel = () =>{

        this.mk.splice(this.state.selectedPlace.id,1);
        this.setState({nbmk:this.mk.length})
    };

    render() {


        let  rows = [];
        let  poli = [];
        for (var i = 0; i< this.mk.length;i++){
            rows.push(
                <Marker
                hoverDistance={20}
                onightClick ={this.right}
                id={i} 
                name={this.mk[i].nom}
                onClick={this.onMarkerClick}
                draggable={true} onDragend={this.newDragend}
                position={{lat: this.mk[i].lat,lng: this.mk[i].lng}}/>);


            poli.push(rows[i].props.position)
      }

        const polySelector = this.state.Poly ? poli : null;


        return (
            <div className="MAPP">
                    <Itineraire 
                point={rows}
            />

                <Map
                    style={style}
                    google={this.props.google}
                    zoom={18}
                    initialCenter={{lat:43.599980, lng:1.443138}}
                    streetViewControl={false}
                    mapTypeControl={false}
                    onClick={this.handleMapClick.bind(this)}

                    disableDoubleClickZoom={true}
                    onReady={this.fetchPlaces}
             
                >
                    {rows}
                    <Polyline
                    path={polySelector}
                    />

                    <InfoWindow
                        onOpen={this.windowHasOpened}
                        onClose={this.windowHasClosed}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <p>le markeur {this.state.selectedPlace.id}</p>
                            <p>me servira d'appéritif</p>
                            <img src="https://www.girlizz.com/img_jeux/1912.jpg"/>
                        </div>
                    </InfoWindow>
         
                </Map>


                <div className="sectiondroit">
                    <ul>

                             <button onClick={this.anotherPosition}>Trouver le point </button>
                        <li><button onClick={this.deleteAll.bind(this)}>Supprimer tous les markeurs</button></li>
                        <br/>
                        <li><button onClick={this.delete.bind(this)}>Supprimer dernier markeur</button></li>
                        <br/>
                        <li><button onClick={this.change.bind(this)}>Tracer:{this.state.Poly ? " Désactiver": " Activer"}</button></li>
                    </ul>
                    <div>
                    <MarkerConfig
                        laat={this.state.selectedPlace.id}
                        delete={this.SupprimerMarkeurActuel}

                    />
                    </div>
                </div>
                <div className="sectionbas">
                    <Export jsonSave={this.mk}/>
                    <Import jsonLoad={this.mk} callback={this.update}/>

                </div>
            </div>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA3Gsj08QzmXalEyHuuHgnzNKk4dGS6i84"

})(MapContainer)