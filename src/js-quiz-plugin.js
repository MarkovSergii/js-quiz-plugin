/**
 * Created by user on 28.06.2016.
 */
'use strict';

function JSQuiz(config) {
    this.id = config.id;

    // create elements
    var createRadioGroup = function(question)
    {
        var elem = $('<div></div>');
        var header = $('<h1></h1>').text("header");
        var content = $('<div></div>').text('content');
        elem.append(header);
        elem.append(content);
        return elem
    };

    $(this.id).append(createRadioGroup());


    this.stat = function(){

        console.log('ID = '+this.id);
    }
}


$.prototype.createQuiz = function(config){


    config = config || {};

    var conf = {
        quizType: config.quizType || "checkbox",
        quizClass : config.quizClass || "",
        ansClass : config.ansClass || "",
        id: undefined
    };


    if ((!this.selector) || (!this.selector[0]=='#'))
    {
      return undefined
    }
    conf.id = this.selector;



    return new JSQuiz(conf);
};


