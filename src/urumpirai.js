/*
 * created: 2013-12-07
 */

// models

var Urumpirai = {

    init: function(){
        App.Debug.log({message:"urumpirai:init"});
    }

    , delete_thing: function(position){
        App.Debug.log({message:"function delete_thing()"});
        App.Debug.log({message:"position = "+position});
        this.things.splice(position,1);
    }

    , add_thing: function(thingName){
        App.Debug.log({message:"function add_thing()"});
        this.add_things('[{"name":"'+thingName+'"}]');
    }

    , add_things: function(data){
        var thisThings = this.things;
        App.Debug.log({message:"function add_things()"});
        var dataType = typeof data;
        var dataJSON = {};
        App.Debug.log({message:"dataType =  "+dataType});
        App.Debug.log({message:"data = "+data});
        switch(dataType){
            case 'string':
                var dataJSON = JSON.parse(data);
                break;
        }
        App.Debug.log({message:"typeof dataJSON = "+typeof dataJSON});
        App.Debug.log({message:"dataJSON = "+dataJSON});
        if(typeof dataJSON != "object"){
            App.Debug.log({message:"not an object"});
            return false;
        }
        $(dataJSON).each(
            function(){
                App.Debug.log({message:"adding thing"});
                thisThings.push(this);
            }
        );
        App.Debug.log({message:"total count of things is "+thisThings.length});
    }

    , get_category_value: function(categoryId){
        // TODO: check if categoryId is an number
        var thisValue = 0;
        App.Debug.log({message:"function get_category_value()"});
        App.Debug.log({message:"categoryId = "+categoryId});

        $(this.categories).each(
            function(){
                App.Debug.log({message:"checking category "+this.id});
                if(this.id === categoryId){
                    App.Debug.log({message:"found it!"});
                    thisValue = this.value;
                }
            }
        );
        return thisValue;
    }

    , get_active_category: function(){
        App.Debug.log({message:"function get_active_category()"});
        var activeCategory = null;
        $(this.categories).each(
            function(index, element){
                if(element.active){
                    activeCategory = element;
                }
            }
        );
        App.Debug.log({message:"activeCategory = "+activeCategory.name});
        return activeCategory;
    }

    , set_active_category: function(position){
        App.Debug.log({message:"function set_active_category()"});
        App.Debug.log({message:"position = "+position});
        $(this.categories).each(
            function(index, element){
                element.active = false;
                if(index==position){
                    element.active = true;
                }
            }
        );
    }

    , things: []

    , categories: [
        {id:1, name:"category 1", value:20}
        , {id:2, name:"category 1", value:20}
        , {id:3, name:"category 3", value:30}
        , {id:4, name:"category 4", value:40}
    ]
}

