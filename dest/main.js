/**
 * Created by user on 28.06.2016.
 */
$(document).ready(function(){


  /*  var config = {

    };

    var t = new JSQuiz(config);
    t.create();
*/
    var q1 = $('#main').createQuiz();
    var q2 = $('#main2').createQuiz();

    q1.stat();
    q2.stat();
});