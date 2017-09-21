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