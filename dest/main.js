/**
 * Created by user on 28.06.2016.
 */
$(document).ready(function(){
/*
    var data1 = {
        questionrClass: "q1",
        answerClass: "q2",
        questionType: "radiogroup",
        required:true,
        question: {
            id:11,
            text: "Сколько вам лет?",
            answers: [
                {
                    id:12,
                    text:"<18"
                },
                {
                    id:11,
                    text:"19-30"
                },
                {
                    id:10,
                    text:"31-60"
                },
                {
                    id:1,
                    text:">60"
                }
            ]
        }
    };

    var data2 = [
        {
            questionrClass: "q3",
            answerClass: "q4",
            questionType: "radiogroup",
            required:true,
            question: {
                id:11,
                text: "Сколько вам лет?",
                answers: [
                    {
                        id:12,
                        text:"<18"
                    },
                    {
                        id:11,
                        text:"19-30"
                    },
                    {
                        id:10,
                        text:"31-60"
                    },
                    {
                        id:1,
                        text:">60"
                    }
                ]
            }
        },
        {
            questionrClass:"",
            answerClass:"",
            required:true,
            questionType:"checkbox",
            question:{
                id:13,
                text:"Чего вы хотите?",
                answers: [
                    {
                        id:12,
                        text:"Сникерс"
                    },
                    {
                        id:11,
                        text:"Воды"
                    },
                    {
                        id:10,
                        text:"Компутер"
                    },
                    {
                        id:1,
                        text:"ТВ"
                    }
                ]
            }
        },
        {
            questionrClass:"q5",
            answerClass:"q6",
            required:true,
            questionType:"text",
            question:{
                id:14,
                text:"Укажите имя"
            }
        },
        {
            questionrClass:"q7",
            answerClass:"q8",
            required:true,
            questionType:"select",
            question:{
                id:16,
                text:"Уровень счастья",
                answers: [
                    {
                        id:12,
                        text:"Мега"
                    },
                    {
                        id:11,
                        text:"Супер"
                    },
                    {
                        id:10,
                        text:"Средне"
                    },
                    {
                        id:1,
                        text:"Плохо"
                    }
                ]
            }
        }
    ];

*/
    var q1;

    var myfunct = function(params){
        console.log(params);
        //alert("hh "+params.toString());
    };


    $('#set_quiz').click(function(){
        var q_param = JSON.parse(($('#q_param').val()));
        var q_quiz = JSON.parse(($('#q_quiz').val()));

        q_param.data = q_quiz;
        q_param.submitFunction = myfunct;

        q1 = $('#main').createQuiz(q_param);
    });

    $('#k').click(function(){
        $('#result').text(JSON.stringify(q1.getValues()));
    });




});