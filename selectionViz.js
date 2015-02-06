
// -------------------------------
// map to select cities
// -------------------------------

setUpMap = function() {
  // place city selection text
  d3.select('#citySelection')
    .style("left", (width + margin.left) + "px")
    .style("top", (margin.top - 10) + "px");

  // label with current city
  document.getElementById('citySelection').innerHTML = "City: " + cState.getCity();

  // defines size of map, and location on the screen
  var projection = d3.geo.albersUsa()
    .translate([width + margin.left + 50, 80])
    .scale([300]);

  var path = d3.geo.path().projection(projection);

  // read in US geometry
  d3.json("us.json", function(error, topology) {

    // limit to continental US
    topology.objects.cb_2013_us_state_20m.geometries =
      topology.objects.cb_2013_us_state_20m.geometries.filter(
        function(d) {
          if (["Alaska", "Hawaii", "Puerto Rico"].indexOf(d.id) == -1) {
            return d
          }
        }
      )

    // attach path for US boundary
    svg.append("path")
      .datum(topojson.feature(topology, topology.objects.cb_2013_us_state_20m))
      .attr("d", path)
      .attr("class", "map");

    function mapSelections(k) {
      k.on("mouseover", function(d) {
        document.getElementById('citySelection').innerHTML = "Click to choose " + d.city;
      })
      .on("mouseout", function(d) {
        document.getElementById('citySelection').innerHTML = "City: " + cState.getCity();
      })
    }


    cities = svg.append("g")
      .attr("class", "cities");

    cities.selectAll(".citiesBackground")
      .data(citiesData)
      .enter().append("circle")
      .attr("transform", function(d) {
        return "translate(" + projection([
          d.location.longitude,
          d.location.latitude
        ]) + ")"
      })
      .attr("r", 7)
      .attr("class", "citiesBackground")
      .attr("opacity", function(d) {
        if (d.city.toLowerCase() == cState.getCity().toLowerCase()) {
          return 1
        } else {
          return 0
        }
      })
      .call(mapSelections)
      .on("click", function(d) {
        updateCity(d.city);
      });

    cities.selectAll(".cityForeground")
      .data(citiesData)
      .enter().append("circle")
      .attr("transform", function(d) {
        return "translate(" + projection([
          d.location.longitude,
          d.location.latitude
        ]) + ")"
      })
      .attr("r", 3)
      .attr("class", "citiesForeground")
      .call(mapSelections)
      .on("click", function(d) {
        updateCity(d.city);
      });
  });

}

updateCities = function(city) {
  // update text above US map
  document.getElementById('citySelection').innerHTML = "City: " + city;

  // update opacity of background circle for cities on map
  d3.selectAll(".citiesBackground")
    .data(citiesData)
    .attr("opacity", function(d) {
      if (d.city.toLowerCase() == city.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
}


// CITIES TO MAP, AND LOCATIONS
// use city lookup tool to get other cities http://bl.ocks.org/zanarmstrong/raw/b7381e04dcded29b2b6f/

// city list
var citiesData = [
  {
    "city": "DENVER",
    "country": "USA",
    "location": {
      "latitude": 39.858333333333334,
      "longitude": -104.66694444444445
    }
  },
 /* {
    "city": "AUSTIN",
    "country": "USA",
    "location": {
      "latitude": 30.194444444444446,
      "longitude": -97.66972222222223
    }
  }, */
  {
    "city": "CHARLOTTE",
    "country": "USA",
    "location": {
      "latitude": 35.21388888888889,
      "longitude": -80.94305555555556
    }
  },
  {
    "city": "CHICAGO",
    "country": "USA",
    "location": {
      "latitude": 41.78583333333333,
      "longitude": -87.75222222222222
    }
  },
  {
    "city": "COLUMBUS",
    "country": "USA",
    "location": {
      "latitude": 39.99777777777778,
      "longitude": -82.89166666666668
    }
  },
  {
    "city": "DALLAS",
    "country": "USA",
    "location": {
      "latitude": 32.846944444444446,
      "longitude": -96.85166666666666
    }
  },
  {
    "city": "DETROIT",
    "country": "USA",
    "location": {
      "latitude": 42.409166666666664,
      "longitude": -83.00972222222222
    }
  },
  {
    "city": "EL PASO",
    "country": "USA",
    "location": {
      "latitude": 31.849444444444444,
      "longitude": -106.38
    }
  },
  {
    "city": "HOUSTON",
    "country": "USA",
    "location": {
      "latitude": 29.607222222222223,
      "longitude": -95.15861111111111
    }
  },
  {
    "city": "INDIANAPOLIS",
    "country": "USA",
    "location": {
      "latitude": 39.717222222222226,
      "longitude": -86.29416666666667
    }
  },/*
  {
    "city": "JACKSONVILLE",
    "country": "USA",
    "location": {
      "latitude": 30.49388888888889,
      "longitude": -81.68777777777778
    }
  },*/
  {
    "city": "LOS ANGELES",
    "country": "USA",
    "location": {
      "latitude": 33.942499999999995,
      "longitude": -118.40805555555556
    }
  },
  {
    "city": "MEMPHIS",
    "country": "USA",
    "location": {
      "latitude": 35.04222222222222,
      "longitude": -89.97666666666667
    }
  },
  {
    "city": "NEW YORK",
    "country": "USA",
    "location": {
      "latitude": 40.63972222222222,
      "longitude": -73.77888888888889
    }
  },
  {
    "city": "PHILADELPHIA",
    "country": "USA",
    "location": {
      "latitude": 39.871944444444445,
      "longitude": -75.24111111111111
    }
  },
  {
    "city": "PHOENIX",
    "country": "USA",
    "location": {
      "latitude": 33.535,
      "longitude": -112.38305555555554
    }
  },
  {
    "city": "SAN ANTONIO",
    "country": "USA",
    "location": {
      "latitude": 29.529444444444444,
      "longitude": -98.27888888888889
    }
  },
  {
    "city": "SAN DIEGO",
    "country": "USA",
    "location": {
      "latitude": 32.69916666666666,
      "longitude": -117.21527777777779
    }
  },
  {
    "city": "SAN FRANCISCO",
    "country": "USA",
    "location": {
      "latitude": 37.61888888888889,
      "longitude": -122.37472222222222
    }
  },
  {
    "city": "SEATTLE",
    "country": "USA",
    "location": {
      "latitude": 47.52972222222222,
      "longitude": -122.30194444444444
    }
  },
  {
    "city": "MINNEAPOLIS",
    "country": "USA",
    "location": {
      "latitude": 44.88027777777778,
      "longitude": -93.21666666666667
    }
  },
  {
    "city": "MIAMI",
    "country": "USA",
    "location": {
      "latitude": 25.793055555555558,
      "longitude": -80.29055555555556
    }
  },
  {
    "city": "GREAT FALLS",
    "country": "USA",
    "location": {
      "latitude": 47.481944444444444,
      "longitude": -111.37055555555555
    }
  },
  {
    "city": "PORTLAND",
    "country": "USA",
    "location": {
      "latitude": 45.58861111111111,
      "longitude": -122.5975
    }
  },
  {
    "city": "ATLANTA",
    "country": "USA",
    "location": {
      "latitude": 33.640277777777776,
      "longitude": -84.42694444444444
    }
  },
  {
    "city": "LAS VEGAS",
    "country": "USA",
    "location": {
      "latitude": 36.08027777777778,
      "longitude": -115.15222222222222
    }
  },
  {
    "city": "FARGO",
    "country": "USA",
    "location": {
      "latitude": 46.87719,
      "longitude": -96.78980
    }
  }
]
