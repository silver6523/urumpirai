function App(){

    this.isFullscreen   = false;

    this.Debug = {
        isActive: false
        , mode  : "CONSOLE" // ALERT, CONSOLE, SERVER
        , log: function(info){
            if(!this.isActive){
                return;
            }
            switch(this.mode){
                case "CONSOLE":
                    console.log(info.message);
                    break;
                case "ALERT":
                    alert(info.message);
                    break;
            }
        }
    }

    this.GET            = {}

    this.API = {

        url     : "../000/request.php",
        request : function(Parameters, functionName){
            return $.ajax({
                url: this.url
                , data: Parameters.join("&")
                , type: "POST"
                , success: function(data){
                    if(typeof window[functionName] == "function") {
                        window[functionName](data);
                    } else {
                        alert(functionName + " is not a function");
                    }
                }
                , error: function(obj, msg, tmp){
                    alert("an error occured:");
                }
            });
        }
    }

    this.getGETParams   = function(qs){
        qs = qs.split("+").join(" ");
        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])]
                = decodeURIComponent(tokens[2]);
        }
        return params;
    }

    this.Template = {

        render: function(targetSelector, templateId, data){
            var source = $('#'+templateId).html();
            var template = Handlebars.compile(source);
            $(targetSelector).html(template(data));
        }

    }

    this.isOnline        = function(){
    }

    this.init            = function(){
        this.GET = this.getGETParams(document.location.search);
        if(this.GET.debug==1){
            this.Debug.isActive = true;
        }
        if(this.Debug.isActive){
            if(this.GET.debugMode !== undefined){
                this.Debug.mode = this.GET.debugMode;
            }
            this.Debug.log({message:'debug is active'});
        }

    }

    this.init();

};

App = new App();