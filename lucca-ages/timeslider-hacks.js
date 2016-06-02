
//Convert the timesteps set in lightmap for the timeslider with labels
var agemap = {"0001":"Roman",
                "0504":"Roman",
                "1008":"Middle ages",
                "1512":"Late middle ages",
                "2016":"Renaissance"
            };

//Overwrite the wms timeslider control in order to customize the labels
L.Control.SliderControlFds  = L.Control.SliderControl.extend({
    updateTimestamp: function(timestamps) {
        
        var out = "xxx1 - xxx2";
        out = out.replace("xxx1", agemap[timestamps[0].substring(0,4)]);
        out = out.replace("xxx2", agemap[timestamps[1].substring(0,4)]);
        
        $(this._sliderTimestamp).html(out);
    }
});

L.control.sliderControlFds = function(options) {
  return new L.Control.SliderControlFds(options);
};