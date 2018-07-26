/**********************************************************************************************************************************
/**********************************************************************************************************************************
/**
/** update-color.jsx
/** v. 0.4
/** Author:  Jeffery W. Hall
/** Last Updated:  March 20, 2018
/**
/**********************************************************************************************************************************
/*********************************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Bring in JSON
//
////////////////////////////////////////////////////////////////////////////////////////////////////
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return a<10?"0"+a:a}function this_value(){return this.valueOf()}function quote(a){return rx_escapable.lastIndex=0,rx_escapable.test(a)?'"'+a.replace(rx_escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,h,g=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,h=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=0===h.length?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;c<f;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=0===h.length?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;d<c;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();
////////////////////////////////////////////////////////////////////////////////////////////////////


var show_model = (function() {
  var color_data_file = File("~/Documents/Work/ion-show-colors.json");

  if (color_data_file.open("r")) {
    color_data_file.encoding = "UTF-8";
    var show_colors = JSON.parse(color_data_file.read());
    color_data_file.close();
  }

  var report = new Array();

  return {
    get_show_data: function() { return show_colors; },

    set_report: function(key, light, mid) {
      report.push([key, light, mid]);
    },

    get_report: function() {
      var r = "";
      var light, mid;

      for (var i = 0; i < report.length; i++) {
        r += report[i][0] + ":  " + report[i][1] + ", " + report[i][2] + "\n";
      }

      return r;
    }
  };
})();



var dom_view = (function() {
  var master_ctrl = (function() {
    for (var i = 1; i <= app.project.items.length; i++) {
      if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Master Control") {
        return app.project.items[i];
      }
    }
  })();

  var greeting = function() {
    return confirm("Update Colors v.1.0\nThis software will update all of the show colors.\n\nProceed?")
  };

  return {
    set_color: function(show, light_color, mid_color) {
      master_ctrl.layer(show).property("Effects").property("light").property("Color").setValue(light_color);
      master_ctrl.layer(show).property("Effects").property("mid").property("Color").setValue(mid_color);
    },

    get_confirmation: function() { return greeting(); },

    report: function(rep) {
      alert("You are good to go!\n" + app.project.file.name + "::" + master_ctrl.name + " colors updated.\n\n" + rep);
    }
  };
})();



var controller = (function(shows, view) {
  var hex_to_rgb = function() {
    var light_color, mid_color, r, g, b;
    var show_data = shows.get_show_data();

    for (var key in show_data) {
      light_color = get_rgb( parseInt(show_data[key]["light"], 16) );
      mid_color = get_rgb( parseInt(show_data[key]["mid"], 16) );
      view.set_color(key, light_color, mid_color);
      shows.set_report(key, show_data[key]["light"], show_data[key]["mid"]);
    }

    function get_rgb(color) {
      r = color >> 16;
      g = (color & 0x00FF00) >> 8;
      b = color & 0xFF;

      return [r/255, g/255, b/255, 1];
    }
  };

  return {
    init: function() {
      var proceed = view.get_confirmation();

      if (proceed) {
        hex_to_rgb();
      } else return;

      view.report(shows.get_report());
    }
  };
})(show_model, dom_view);


controller.init();
