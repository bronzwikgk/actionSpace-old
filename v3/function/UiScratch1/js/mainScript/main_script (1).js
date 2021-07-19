
$(document).ready(function(){

    $('.drop_down_btn').click(function(){
        var arrow = $(this).find('> .drop_down_arrow')
        $(arrow).toggleClass('active')
        var parent = $(this).parent().parent()
        $(parent).toggleClass('active')
        var drop_down_Items = $(parent).find('> .drop_down_items')
        $(drop_down_Items).toggleClass('active')
    })

    $('.opt_drop_down_btn').click(function(){
        $(this).toggleClass('active')
        var parent = $(this).parent()
        $(parent).toggleClass('active')
        var drop_down_Items = $(parent).find('> .opt_drop_down_items')
        $(drop_down_Items).toggleClass('active')
    })

    $('.item').click(function(){
        if($(this).data('show')){
            var get_data = $($(this).data('show')).clone(true)
            $(get_data).css('display' , 'inherit')
            $('#SideBarContent').html("")
            console.log($(this).data('show'))
            if($('#body_side_bar').hasClass('hide')){
                $('#body_side_bar').removeClass('hide')
            }
            $('#SideBarContent').html(get_data)
        }
    })
    $('.workspaceitem').click(function(){
        if($(this).data('workspace')){
            var data_id = ($(this).data('workspace'))
            var get_data = $(data_id).clone(true)
            $('#BodyWorkspace').html("")
            $(get_data).css('display' , 'inherit')
            $('#BodyWorkspace').html(get_data)


        }
        else{
            console.log('nothign')
        }
    })

    $('#mid_bar_hamburger').click(function(){
        $('#body_side_bar').toggleClass('hide')


    })

    $('#MainHeaderHamburger1').click(function(){
        $('#navigationSection').toggleClass('hide')
    })
    $('#MainHeaderHamburger2').click(function(){
        $('#navigationSection').toggleClass('hide')
    })
})