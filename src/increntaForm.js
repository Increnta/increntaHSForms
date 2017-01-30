/**
 * Created by FerRubioMorales on 30/01/17.
 */
var increntaForm = (function(window){

    var increntaForm = function(options){
      this.checkOptions(options);
      this.portalId = options.portalId;
      this.formId = options.formId;
      this.target = options.target || null;
      this.formReady = options.formReady || function(form){};
      this.onSend = options.onSend || function(form){};
      this.getRedirect = options.getRedirect || function(form){ return null};

      this.init();
    };

    increntaForm.prototype.checkOptions = function(options){
      if(typeof options !== 'object')
        throw("IncrentaForm: Not valid options object passed");
      if(!options.portalId || options.portalId == undefined)
        throw new Error("IncrentaForm: portalId option is required.");
      if(!options.formId)
        throw new Error("IncrentaForm: formId option is required.");
      if(typeof options.getRedirect == "undefined" || (typeof options.getRedirect != "undefined" && typeof options.getRedirect != "function"))
        throw new Error("IncrentaForm: getRedirect is not a function");
    };


    increntaForm.prototype.calculareRedirect = function(form){
        var $hsContext = form.find("input[name='hs_context']");
        var hsContext = JSON.parse($hsContext.val());
        hsContext.redirectUrl = this.getRedirect(form);
        $hsContext.val(JSON.stringify(hsContext));
    };

    increntaForm.prototype.init = function(){
      var hbspt_options = {
          css: '',
          portalId: this.portalId,
          formId: this.formId,
          onFormReady: function(form){
            this.formReady(form);
          }.bind(this),
          onFormSubmit: function(form){
            this.sendForm(form);
          }.bind(this)
      };

      if(this.target)
          hbspt_options['target'] = this.target;

      hbspt.forms.create(hbspt_options);
    };

    increntaForm.prototype.serializeForm = function(form){
        return form.serialize();
    };


    increntaForm.prototype.sendForm = function(form){
      this.onSend(form);

        if(this.getRedirect)
            this.calculareRedirect(form);
    };

    return increntaForm;

  })(window);
