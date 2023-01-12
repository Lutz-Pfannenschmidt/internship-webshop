$("#searchbox").keypress(function(e){
    if (e.which == 13) {
        copyContent()
        return false 
    } 
    return true
});

function copyContent() {
    document.getElementById("searchbox-hidden").value =  document.getElementById("searchbox").innerHTML;
    document.getElementById("searchform").submit()
    return true;
}

function add_to_cart(item_id) {
    $.ajax({
        url: 'add_to_cart',
        type: 'POST',
        data: {
            item_id: item_id
        },
        success: function (response) {
            var counter = parseInt($("#items_in_cart_hidden").val());
            counter++;
            $("#items_in_cart_hidden").val(counter);
            $("#items_in_cart").text(counter);

            $(".add-to-cart."+item_id).toggleClass("wiggle");
            setTimeout(()=>{
                $(".add-to-cart."+item_id).toggleClass("wiggle");
            }, 250)
        },
        error: function (response) {
        }
    });
};

$("#hidden-login-submit").click(function() {
    $("#hidden-login-form").submit();
});

$(".cart-sidepanel-toggle").click(function(e) {
    e.preventDefault();
    $.ajax({
        url: 'cart',
        type: 'GET',
        data: {},
        success: function (response) {
            $("#cart-sidepanel").toggleClass("active");

            $(".cart-table-remove").remove();
            $(function() {
                $.each(response[0], function(i, item) {
                    var tr = $('<tr>').append(
                        $('<td>').text(item[1]),
                        $('<td>').text((parseInt(item[3])/100).toString()+"€"),
                        $('<td>').text(item[4]),
                        $('<td>').text((parseInt(item[3])*item[4]/100).toString()+"€")
                    ).addClass("cart-table-remove");
                    $("#cart-table").append(tr);
                });
            });

            $("#cart-sidepanel-price").text((response[1] / 100).toString()+"€")
        },
        error: function (response) {
        }
    });
});