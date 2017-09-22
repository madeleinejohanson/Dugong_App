                <GeoJSONLayer
                id="draw_layer"
                data={this.state.draw}
                fillExtrusionPaint={{
                'fill-extrusion-color': {this.state.draw_colour}
                    },
                    'fill-extrusion-height': draw_height
                    ,
                    'fill-extrusion-base': 0
                  }}
                />

                                <Layer
                  id="3d-buildings"
                  sourceId="composite"
                  layerOptions={{
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15
                  }}
                  paint={{
                    'fill-extrusion-color': '#aaa',
                    'fill-extrusion-height': {
                        'type': 'identity',
                        'property': 'height'
                    },
                    'fill-extrusion-base': {
                        'type': 'identity',
                        'property': 'min_height'
                    }
                  }}
                /> 

                            <input 
            style={{ width: 250 }}
            id="extrude_slider_base" 
            type="range" 
            defaultValue="0"
            min="0" max={draw_height} 
            step="3"
            onChange={this.extrudeBaseChange.bind(this)}
            ref={(input) => this.input = input}
            />

            {"type":"FeatureCollection","features":[{"id":"885015850e37e7513856e4282c439bc8","type":"Feature","properties":{},"geometry":{"coordinates":[[[151.2069960258039,-33.86730325524335],[151.20877947919473,-33.86955691028775],[151.2052803529691,-33.86988681845976],[151.2069960258039,-33.86730325524335]]],"type":"Polygon"}}]}

            151.20452820459,-33.87212387123],[151.20455721203,-33.87224001751],[151.20463768167,-33.87223367998],[151.20463847947,-33.87224605027],[151.2046422802,-33.87230892363],[151.20465167445,-33.87243320921],[151.20417445905,-33.87247378018],[151.20414840973,-33.87245306442],[151.20411587945,-33.87215954787],[151.20410044347,-33.87202076753],[151.20448877204,-33.87199576699],[151.20449794219,-33.87204903096

            {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type": "Polygon","coordinates": [[[151.20811676358,-33.87097600672],[151.20811372479,-33.87105655705],[151.20787797212,-33.87105286389],[151.20788209556,-33.87097260938],[151.20811676358,-33.87097600672]]}}]};

            {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{ 
  "type": "Polygon","coordinates": [151.205292222514,-33.8717258167423],[151.205298900679,-33.8717832668887],
  [151.205307631595,-33.8718573721096],[151.205527141532,-33.8718452797009],[151.205513803131,-33.871713060999],
  [151.205292222514,-33.8717258167423]}}]};