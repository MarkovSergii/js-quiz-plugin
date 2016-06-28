/**
 * Created by user on 28.06.2016.
 */
$(document).ready(function(){

    var data1 = {
        questionrClass:"",
        answerClass:"",
        questionType:"radiobox",
        question:{
            text:"Сколько вам лет?",
            answers:['<18','19-40','41-60','>60']
        }
    };
    var data2 = {
        questionrClass:"",
        answerClass:"",
        questionType:"radiobox",
        question:{
            text:"Сколько вам лет?",
            answers:['<18','19-40','41-60','>60']
        }
    };



    var q1 = $('#main').createQuiz({
        dataSrc:"data",
        data:data1
    });
    var q2 = $('#main2').createQuiz({
        dataSrc:"data",
        data:data2
    });

    q1.stat();
    q2.stat();
});