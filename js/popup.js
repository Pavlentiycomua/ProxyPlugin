$(document).ready(function(){

    checkStatus();

    $("input[name=login]").click(function(){
        var URL = "https://opskins.com";
        chrome.tabs.create({ url: URL });
    });

    $("a#settings").click(function(){
        $(".content > div").hide();
        $("input[name=pushbullet_token]").val(localStorage['pushbullet_token']);
        $("input[name=freeze_time]").val(localStorage['freeze_time']);
        $("div.settings").show();
    });

    $("input[name=save]").click(function(){
        localStorage["pushbullet_token"] = $("input[name=pushbullet_token]").val();
        localStorage["freeze_time"] = $("input[name=freeze_time]").val();
        checkStatus();
    });

    $("input[name=focus]").click(function(){
        var task_no = parseInt($(this).attr("data-item"));
        focusTab(task_no);
    });

    $("input[name=back]").click(function(){
        showTasksList();
    });

    $("input[name=find]").click(function(){
        addTask();
    });

    $("input[name=save_edit]").click(function(){
        var task_no = parseInt($(this).attr("data-item"));
        addTask(task_no);
    });

    $("input[name=start]").click(function(){
        var task_no = parseInt($(this).attr("data-item"));
        startTask(task_no);
    });

    $("input[name=pause]").click(function(){
        var task_no = parseInt($(this).attr("data-item"));
        pauseTask(task_no);
    });

    $("input[name=delete]").click(function(){
        var task_no = parseInt($(this).attr("data-item"));
        removeTask(task_no);
        checkStatus();
    });

    $("input[name=add_new_task]").click(function(){
        $(".content > div").hide();
        $(".add_new input[name=find]").show();
        $(".add_new input[name=save_edit]").hide();

        $(".add_new input[name=name]").val("AWP | Asiimov");

        var dslider = $("#discount_slider");
        dslider.slider("value", 25);
        $("#discount_slider_val").html(25);

        $(".add_new input[name=price]").val(27);
        $(".add_new input[name=suggested_price]").val(35);

        var fslider = $("#frequency_slider");
        fslider.slider("value", 10);
        $("#frequency_slider_val").html(10);

        var rslider = $("#slider_range");
        rslider.slider("values", 0, 60);
        $("#slider_range_min").html(60);
        rslider.slider("values", 1, 120);
        $("#slider_range_max").html(120);

        $(".add_new input[name=mode]").filter('[value=1]').prop('checked', true);

        $(".add_new input[name=repeat]").prop('checked', false);

        $(".content > .add_new").show();
    });

    $("input[name=edit]").click(function(){
        var task_no = parseInt($(this).attr("data-item"));
        editTask(task_no);
    });

    $(document).on("click","div.item span.name", function(){
        showTask(parseInt($(this).parent().attr("data-item")));
    });

    $(document).on("click","div.item .fa-pause", function(){
        var task_no = parseInt($(this).parent().parent().attr("data-item"));
        pauseTask(task_no);
        showTasksList();
    });

    $(document).on("click","div.item .fa-play", function(){
        var task_no = parseInt($(this).parent().parent().attr("data-item"));
        startTask(task_no);
        showTasksList();
    });

    $(document).on("click","div.item .fa-pencil-square-o", function(){
        var task_no = parseInt($(this).parent().parent().attr("data-item"));
        editTask(task_no);
    });

    $(document).on("click","div.item .fa-search", function(){
        var task_no = parseInt($(this).parent().parent().attr("data-item"));
        focusTab(task_no);
    });

    $("#discount_slider").slider({
        min: 0,
        max: 99,
        value: $("input[name='discount']").val(),
        slide: function( event, ui ) {
            $("#discount_slider_val").html(ui.value);
            $("input[name='discount']").val(ui.value);
        }
    });

    $("#slider_range").slider({
        range: true,
        min: 1,
        max: 200,
        values: [ $("input[name='random_time_min']").val(), $("input[name='random_time_max']").val() ],
        slide: function( event, ui ) {
            $("#slider_range_min").html(ui.values[0]);
            $("input[name='random_time_min']").val(ui.values[0]);

            $("#slider_range_max").html(ui.values[1]);
            $("input[name='random_time_max']").val(ui.values[1]);
        }
    });

    $("#frequency_slider").slider({
        min: 1,
        max: 120,
        value: $("input[name='frequency']").val(),
        slide: function( event, ui ) {
            $("#frequency_slider_val").html(ui.value);
            $("input[name='frequency']").val(ui.value);
        }
    });

    $("#freeze_time_slider").slider({
        min: 10,
        max: 30,
        value: $("input[name='freeze_time']").val(),
        slide: function( event, ui ) {
            $("#freeze_time_slider_val").html(ui.value);
            $("input[name='freeze_time']").val(ui.value);
        }
    });

});