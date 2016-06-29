/**
 * Created by user on 28.06.2016.
 */
'use strict';

function JSQuiz(config) {

    var that = this;
    // configuration
    this.id = config.id;
    this.showRequireError = config.showRequireError;

    this.data = [];
    if (Array.isArray(config.data)) {
        this.data = config.data;
    }
    else {
        this.data.push(config.data)
    }


    // system methods --------------------------------------------------
    // create quiz block select
    var run = function (it) {
        if (it.data.length != 0) {
            $(that.id).html("");
            it.data.forEach(function (item) {
                if ((item.question) && (item.question.id) && (item.question.text)) {
                    if (item.questionType == 'radiogroup') {
                        $(that.id).append(createRadioGroup(item));
                    }
                    if (item.questionType == 'checkbox') {
                        $(that.id).append(createCheckBox(item));
                    }
                    if (item.questionType == 'text') {
                        $(that.id).append(createText(item));
                    }
                    if (item.questionType == 'select') {
                        $(that.id).append(createSelect(item));
                    }
                }

            });


        }
    };

    var createSelect = function (item) {
        // create root div
        var div_item = $('<div></div>');
        if (item.question.id) div_item.attr('js_qz_id', item.question.id);
        // create header
        var header = $('<h3></h3>').text(item.question.text);
        if (item.questionClass) header.addClass(item.questionClass);
        // create select
        var content = $('<div></div>');
        var select = $('<select>').attr('question_id', item.question.id).addClass(item.answerClass).attr('id', 'select_' + item.question.id);
        item.question.answers.forEach(function (answer) {
            var o = $('<option></option>').text(answer.text).attr('value', answer.id);
            select.append(o);

        });
        // clear select
        select.prop('value', false);

        // delete error class in we change value
        select.change(function () {
            that.unsetError($(this).attr('question_id'));
        });
        // connect all to root div
        content.append(select);
        div_item.append(header);
        div_item.append(content);
        // return select block
        return div_item

    };
    //------------------------------------------------------------------
    // create quiz block input text
    var createText = function (item) {
        // create root div
        var div_item = $('<div></div>');
        if (item.question.id) div_item.attr('js_qz_id', item.question.id);
        // create header
        var header = $('<h3></h3>').text(item.question.text);
        if (item.questionClass) header.addClass(item.questionClass);
        // create input
        var content = $('<div></div>');
        var p = $('<p></p>').addClass(item.answerClass);
        var t = $('<input>').attr('name', 'answer_on_question' + item.question.id).attr('question_id', item.question.id).attr('type', 'text');
        // delete error class in we change value
        t.focus(function () {
            that.unsetError($(this).attr('question_id'));
        });
        // connect all to root div
        p.prepend(t);
        content.append(p);
        div_item.append(header);
        div_item.append(content);
        // return input block
        return div_item

    };
    //------------------------------------------------------------------
    // create quiz block chekbox group
    var createCheckBox = function (item) {
        // create root div
        var div_item = $('<div></div>');
        if (item.question.id) div_item.attr('js_qz_id', item.question.id);
        // create header
        var header = $('<h3></h3>').text(item.question.text);
        if (item.questionClass) header.addClass(item.questionClass);
        // create input root
        var content = $('<div></div>');

        // create chackboxs for each answer
        item.question.answers.forEach(function (answer) {
            var p = $('<p></p>').text(answer.text).addClass(item.answerClass);
            var c = $('<input>').attr('name', 'answer_on_question' + item.question.id).attr('question_id', item.question.id).attr('type', 'checkbox').attr('value', answer.id);
            // if we have checkbox for other add other input
            if (answer.other) {
                c.attr('can_other', 'true');
                var txt = $('<input>').addClass('js_quiz_other_hide').attr('type', 'text').attr("other_input", "true");
                p.append(txt);
            }

            c.click(function () {
                // delete error class in we change value
                that.unsetError($(this).attr('question_id'));
                // if check  checkbox with other attr show other input
                if ($(this).attr('can_other') == 'true') {
                    // if uncheck hide  other input
                    $(this).siblings().toggleClass('js_quiz_other_hide');
                }
            });
            // connect all to input root
            p.prepend(c);
            content.append(p);
        });
        // connect all to root div
        div_item.append(header);
        div_item.append(content);
        // return input block
        return div_item

    };
    //------------------------------------------------------------------
    var createRadioGroup = function (item) {
        // create root div
        var div_item = $('<div></div>');
        if (item.question.id) div_item.attr('js_qz_id', item.question.id);
        // create header
        var header = $('<h3></h3>').text(item.question.text);
        if (item.questionClass) header.addClass(item.questionClass);
        // create input root
        var content = $('<div></div>');

        // create radio for each answer
        item.question.answers.forEach(function (answer) {
            var p = $('<p></p>').text(answer.text).addClass(item.answerClass);
            var r = $('<input>').attr('name', 'answer_on_question' + item.question.id).attr('question_id', item.question.id).attr('type', 'radio').attr('value', answer.id);
            // if we have checkbox for other add other input
            if (answer.other) {
                r.attr('can_other', 'true');
                var txt = $('<input>').addClass('js_quiz_other_hide').attr('type', 'text').attr("other_input", "true");
                p.append(txt);
            }
            r.click(function () {
                // delete error class in we change value
                that.unsetError($(this).attr('question_id'));

                if ($(this).attr('can_other') == 'true') {
                    // if check  radio with other attr show other input
                    $(this).siblings().removeClass('js_quiz_other_hide');
                }
                else {
                    // if check other radio set unisible all other inputs
                    $('div[js_qz_id=' + item.question.id + ']').find('input[other_input="true"]').addClass('js_quiz_other_hide');
                }
            });
            // connect all to input root
            p.prepend(r);
            content.append(p);
        });

        // connect all to root div
        div_item.append(header);
        div_item.append(content);
        // return input block
        return div_item
    };

    var setError = function (id) {
        $('[js_qz_id = ' + id + ']').addClass('js_quiz_question_error_required');
    };
    var unsetError = function (id) {
        $('[js_qz_id = ' + id + ']').removeClass('js_quiz_question_error_required');
    };

    //------------------------------------------------------------------

    // method for returning values from quiz
    this.getValues = function () {
        var is_error = false;
        var data = [];
        var err_mas_id = [];

        this.data.forEach(function (item) {
            if (item.questionType == 'radiogroup') {
                var sel_elem = $("input:radio[name=" + "answer_on_question" + item.question.id + "]:checked");
                var r = sel_elem.val();
                if (r == undefined) {
                    if (item.required) {
                        err_mas_id.push(item.question.id);
                        is_error = true;
                    }
                    else {
                        data.push({question_id: item.question.id, answers: [{}]});
                    }

                }
                else {
                    if (sel_elem.attr('can_other') == 'true') {
                        var other = sel_elem.siblings().val();
                        data.push({question_id: item.question.id, answers: [{id: r, other: other}]});
                    }
                    else {
                        data.push({question_id: item.question.id, answers: [{id: r}]});
                    }

                }

            }
            if (item.questionType == 'checkbox') {
                var c = $("input[name=answer_on_question" + item.question.id + "]:checked");  // array of answers
                if (c.length == 0) {
                    if (item.required) {
                        err_mas_id.push(item.question.id);
                        is_error = true;
                    }
                    else {
                        data.push({question_id: item.question.id, answers: [""]});
                    }
                }
                else {
                    var res = [];
                    c.each(function () {

                        if ($(this).attr('can_other') == 'true') {
                            var other = $(this).siblings().val();
                            res.push({id: $(this).val(), other: other});
                        }
                        else {
                            res.push({id: $(this).val()});
                        }

                    });

                    data.push({question_id: item.question.id, answers: res});
                }
            }
            if (item.questionType == 'text') {
                var t = $("input:text[name=answer_on_question" + item.question.id + "]").val();
                if (t.length == 0) {
                    if (item.required) {
                        err_mas_id.push(item.question.id);
                        is_error = true;
                    }
                    else {
                        data.push({question_id: item.question.id, answers: [""]});
                    }

                }
                else {
                    data.push({question_id: item.question.id, answers: [{text: t}]});
                }
            }
            if (item.questionType == 'select') {
                var s = $('#select_' + item.question.id + ' :selected').val();
                if (s == undefined) {
                    if (item.required) {
                        err_mas_id.push(item.question.id);
                        is_error = true;
                    }
                    else {
                        data.push({question_id: item.question.id, answers: [""]});
                    }

                }
                else {
                    data.push({question_id: item.question.id, answers: [{id: s}]});
                }
            }
        });


        // if global settings show error enabled then show it
        if (that.showRequireError) {
            err_mas_id.forEach(function (item) {
                setError(item);
            });
        }

        return {
            // return result or error
            error: is_error,
            data: is_error ? {} : data,
            errors_id: is_error ? err_mas_id : []
        };
    };

    //------------------------------------------------------------------
    run(this);
}


(function ($) {
    $.fn.createQuiz = function (config) {
        config = config || {};

        var conf = {
            data: config.data || [],  // array of question objects or 1 obj if 1 question
            showRequireError: ((!!config.showRequireError) || (config.showRequireError == undefined)) ? true : false,
            id: undefined

        };


        if ((!this.selector) || (!this.selector[0] == '#')) {
            return undefined
        }
        conf.id = this.selector;

        return new JSQuiz(conf);
    };
})(jQuery);


