/**
 * Created by user on 28.06.2016.
 */
'use strict';
    function JSQuiz(config) {

        var that = this;
        this.id = config.id;

        // system methods --------------------------------------------------
        // create elements
        this._createRadioGroup = function(question)
        {
            var elem = $('<div></div>');
            var header = $('<h1></h1>').text("header");
            var content = $('<div></div>').text('content');
            elem.append(header);
            elem.append(content);
            return elem
        };


        this._goBuild = function(){
            $(this.id).append(this._createRadioGroup());
        };

        if (config.dataSrc=='data')
        {
            this.data = config.data;
            this._goBuild();
        }
        else if  (config.dataSrc=='dataSrc')
        {
                $.ajax(
                {
                    method: "GET",
                    url: config.dataUrl}
                )
                .done(function(data) {
                    that.data = data;
                    this._goBuild();
                })
                .fail(function() {

                });


        }








        this.stat = function(){

            console.log('ID = '+this.id);
        };




    }


    $.prototype.createQuiz = function(config){


        config = config || {};

        var conf = {
            dataSrc: config.dataSrc || "data", /// data or dataUrl
            data: config.data || {},  // array of question objects or 1 obj if 1 question
            dataUrl: config.dataUrl || "", // url to get data by request
            id: undefined
        };


        if ((!this.selector) || (!this.selector[0]=='#'))
        {
            return undefined
        }
        conf.id = this.selector;



        return new JSQuiz(conf);
};





