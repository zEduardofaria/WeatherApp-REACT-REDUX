import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import _ from 'lodash'; 
import GoogleMap from '../components/google_map'

class WeatherList extends Component {
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273.15);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const { lon, lat } = cityData.city.coord;
        //const lat = cityData.city.coord.lat;
        
        return (
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat}/></td>
                <td><Chart data={temps} color="orange" units="ºC" /></td> 
                <td><Chart data={humidities} color="red" units="%" /></td> 
                <td><Chart data={pressures} color="yellow" units="hPa" /></td> 
            </tr>
        );
    }
        
    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Tempeture (ºC)</th>
                        <th>Humidity (%)</th>
                        <th>Pressure (hPa)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({ weather }) {
    return { weather };
}

export default connect(mapStateToProps)(WeatherList);