// import * as iro from 'https://cdn.jsdelivr.net/npm/@jaames/iro@beta/dist/iro.min.js';
import iro from '@jaames/iro';
import { Color } from './color.js';
import { ColorTranslator } from 'colortranslator';

export class GeneEditorComponent extends EventTarget {

    constructor(args) {
      super()
        this._elementId = args.elementId;

        let regenID = 0;
        let delayOnChange = 200;

        this._element = document.getElementById(this._elementId)

        this._form = document.createElement('form');
        this._form.className = "form"; 
        this._form.id = 'dna-form';
        this.eventTarget = new EventTarget();
        var _self = this;
        this._form.addEventListener('change', function(evt) {
          clearTimeout(regenID);
          evt.stopPropagation();
          if (delayOnChange > 0) {
            regenID = setTimeout(function() { _self.onChange(evt) }, delayOnChange);
          } else {
              _self.onChange(evt);
          }
          }, false);
    }

    loadSchema(schemaFile) {
      fetch(schemaFile)
      .then(response => response.json())
      .then(json => console.log(json));
    }
    onChange(evt) {
      this.dispatchEvent(new CustomEvent('editor.change', {
        detail: this.dna
     }));
    }

    get isEmpty() {
      return Object.keys(this.dna).length !== 0 
    }

    get dna() {
      return $('#dna-form').serializeJSON({});
    }

    render(PAR) {

      var PAR = this.sortKeys(PAR);

      var form = this._form;
      form.innerHTML = "";



      let cnt = 0
      for (let k in PAR){
        var container = document.createElement('div');
            container.className = "col-md-3";

        if (typeof(PAR[k]) == "number"){
          cnt += 1

          var inpt = this.input({value: PAR[k], name: k, input: {type: 'number', class: 'form-control form-control-sm', min:0, max:180, step: 0.00000000000001}})

          container.appendChild(inpt);
          form.appendChild(container);

        }else if (typeof(PAR[k]) == "object"){

          for (var i in PAR[k]){
      
            if (k.includes("olor")){

              var colorInput = this.colorInput({value: PAR[k][i], label: `${k}.${i}`, id: `${k}-${i}`, name: `${k}[${i}]`, min:0, max:359});
            
              container.appendChild(colorInput);
              form.appendChild(container);
    
            }else{


              if(Array.isArray(PAR[k])) {
                var inpt = this.input({label: `${k}.${i}`, value: PAR[k][i], name: `${k}[]`, input: {min:1, max:4, step: 1, type: "number", class: 'form-control form-control-sm'}})

                container.appendChild(inpt);
                form.appendChild(container);
              }else{
                var inpt = this.input({label: `${k}.${i}`, value: PAR[k][i], name: `${k}[${i}]`, input: {type: "number", class: 'form-control form-control-sm', min:1, max:4, step: 1}})

                container.appendChild(inpt);
                form.appendChild(container);
              }

            }
          }
          
        }

        this._element.appendChild(form);

      } 


      // const popover = new bootstrap.Popover('.swatch', options);
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
      const popoverList = [...popoverTriggerList].map(popoverTriggerEl => {
        let options = {
          html: true,
          content: () => {
            return '<div id="' + popoverTriggerEl.id + '-colorpicker"></div>'
          }
        }
        new bootstrap.Popover(popoverTriggerEl, options);
        popoverTriggerEl.addEventListener('shown.bs.popover', (event) => {
        
          var colorPicker = new iro.ColorPicker("#" + event.target.id + '-colorpicker', {
            // Set the size of the color picker
            width: 220,
            // Set the initial color to pure red

            color: event.target.style.backgroundColor,
            layout: [
              {
                component: iro.ui.Slider,
                options: {
                  sliderType: 'hue'
                }
              },
              {
                component: iro.ui.Slider,
                options: {
                  sliderType: 'saturation'
                }
              },
              {
                component: iro.ui.Slider,
                options: {
                  sliderType: 'value'
                }
              },
              {
                component: iro.ui.Slider,
                options: {
                  sliderType: 'alpha'
                }
              },

            ]
          });
          colorPicker.on('color:change', function(color) {
            event.target.style.backgroundColor = color.rgbaString;
            const colorName = new Color(color.hex8String).humanName;
            event.target.nextElementSibling.innerHTML = colorName;
            Object.entries(color.hsva).map((k,i) => { 
              if([0,3].includes(i)) {
                document.getElementById(`${event.target.id}-${k[0]}`).value = k[1];
              }else{
                document.getElementById(`${event.target.id}-${k[0]}`).value = k[1] / 100;
              }
            });
            event.target.setAttribute('data-bs-title', colorName);
          });
        });

        popoverTriggerEl.addEventListener('hidden.bs.popover', (event) => {

          this.onChange();

        });



      })



       
    }

    colorInput(attributes) {
      var inputGroup = document.createElement('div');
          inputGroup.className = "mb-1"; 

      var inputContainer = document.createElement('div');
          inputContainer.className = "row";
          inputContainer.id = attributes.id;

      var label = document.createElement('label');
          label.className = "col-4 col-form-label col-form-label-sm text-end pe-2"
          label.innerHTML = attributes.label || attributes.name;

      var input = document.createElement('div');
          input.className = "swatch col-2 mt-1";
          this.setAttributes(input, {
            'data-bs-container':"body",
            'data-bs-toggle': "popover",
            'data-bs-placement': "bottom",
          })
          input.style="background-color: " + Color.toHSLA(attributes.value);
          input.id =  attributes.id;



      var colorName = document.createElement('div');
          colorName.innerHTML = Color.fromHSLA(attributes.value).humanName;
          colorName.className = "col-sm-6 color-name col-form-label col-form-label-sm"; 

      for(var v in attributes.value) {
        var naming = ['h','s','v','a']
        var hiddenInput = document.createElement('input');
            hiddenInput.className = ''; 
            hiddenInput.type = 'hidden';
            hiddenInput.value = attributes.value[v];
            hiddenInput.id = `${attributes.label.replace(".", '-')}-${naming[v]}`;
            
            this.setAttributes(hiddenInput,{name: `${attributes.name}[]:number`, value: attributes.value[v]})
            inputContainer.appendChild(hiddenInput);
      }
      inputContainer.appendChild(label);
      inputContainer.appendChild(input);
      inputContainer.appendChild(colorName);
      inputGroup.appendChild(inputContainer);

      return inputGroup;
    }

    input(attributes={}) {

      attributes.input = {
        ...{type: "range", class: 'form-range', min:0, max:180, step: 0.00000000000001 }, //defaults
        ...attributes.input, //override defaults with user input
        ...{value: attributes.value, name: attributes.name} //allow value and name keys as first level args
      }
      attributes.input.name = `${attributes.input.name}:number`;


      var inputGroup = document.createElement('div');
          inputGroup.className = "input-group mb-1";

      var label = document.createElement('label');
          label.className = "col-sm-4 col-form-label col-form-label-sm text-end pe-2"
          label.innerHTML = attributes.label || attributes.name;

      var inputContainer = document.createElement('div');
          inputContainer.className = "col-8";

      var input = document.createElement('input');
          input.className = attributes.input.class; 
          input.type = attributes.input.type;

          this.setAttributes(input, attributes.input)

      inputGroup.appendChild(label);
      inputContainer.appendChild(input);
      inputGroup.appendChild(inputContainer);

      if(attributes.input.type == "range") {
          input.oninput=() => input.nextElementSibling.innerText = input.value;
            
          var span = document.createElement('span');
              span.className = "small";
              span.innerHTML = input.value;

          inputContainer.appendChild(span);

      }

      return inputGroup; 
    }

    sortKeys(objToSort) {
      let sorted = Object.keys(objToSort).sort().reduce(
        (obj, key) => { 
          obj[key] = objToSort[key]; 
          return obj;
        }, 
        {}
      );
      return sorted;
    }

    setAttributes(element, attributes) {
      Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
      });
    }


}