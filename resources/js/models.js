var AMOUNTH_0 = 500000;
var AMOUNTH_1 = 7500000;
var AMOUNTH_2 = 10000000;
var AMOUNTH_3 = 50000000;
var AMOUNTH_4 = 120000000;
var SCP = 1.0603;
var TIMV = 0.01;
var SMMN = 667;
var TNA = TIMV * 12;
var allow = true;
var amountAux = null;
var discountsAux = null;
var salaryAux = null;
var userDebt = {
    "1144044549" : {
        "resp" : [
            {
                "type" : "TC",
                "amount" : 450000,
                "bank" : "DAVIVIENDA"
            },
            {
                "type" : "CP",
                "amount" : 320000,
                "bank" : "POPULAR"
            } 
        ]
    },
    "1144044548" : {
        "resp" : [
            {
                "type" : "TC",
                "amount" : 180000,
                "bank" : "DAVIVIENDA"
            },
            {
                "type" : "CP",
                "amount" : 35000,
                "bank" : "POPULAR"
            } 
        ]
    },
    "1144044547" : {
        "resp" : [
            {
                "type" : "TC",
                "amount" : 45000,
                "bank" : "DAVIVIENDA"
            },
            {
                "type" : "CP",
                "amount" : 320000,
                "bank" : "POPULAR"
            } 
        ]
    },



}

var protectSal = function(){

    salary = $("#salary").val();
    return (salary * 0.92) * 0.5;
}
var tq= function(){
    var id = $("#documentId").val();
    if(userDebt[id]){
        debt = userDebt[id].resp;

        total = 0;
        for(d in debt){
            total += debt[d].amount;
        }
        return total;
    }
    return 0
};
var vc = 0;
var minimun =  644000;
var expenFamily = function(){
    
    salary = $("#salary").val();
    numMin = salary / minimun;
    if(numMin < 3){
        val =  0.5;
    }else if(numMin >= 3 && numMin <= 5){
        val = 0.45;
    }else if(numMin > 5 && numMin <= 10){
        val = 0.40;
    }else if(numMin > 10 && numMin <= 20){
        val = 0.35;
    }else if(numMin > 20){
        val = 0.3;
    }
    return parseFloat(salary) * parseFloat(val);
}
$("#amountRequired").change(function(){
    amount = $(this).val();        
});
    var amount = amountRequired.value;
    var cws = function(){
        return Math.round(amount * ((TIMV * (Math.pow((1+TIMV), $("#amountMonth").val()))) / (Math.pow((1 + TIMV), $("#amountMonth").val()) -1)));
    }

    var di = function(){
       return  (amount * TNA * DC)/ 360;
    }

    var vtsln = function(){
        return (amount * SMMN )/ 1000000;
    }

    var vcplnss =function(){
        return cws() + vtsln()
    };
    var vcplncs = function(){
        return vcplnss() * SCP;
    }

var creditTypes = [
    {
        "LI" : {
            "name" : "Libre inversión",
            "code" : "1"
        }
    },
    {
        "CC" : {
            "name" : "Compra de cartera",
            "code" : "2"
        } 
    }
]
months = {
    "1" : [
        {"value" : 6} ,  
        {"value": 9}, 
        {"value":12}, 
        {"value" : 18} , 
        {"value" :24}, 
        {"value" : 30},  
        {"value":36}
    ],
    "2" : [
        {"value" : 6},
        {"value" : 9}, 
        {"value" :12}, 
        {"value" : 18}, 
        {"value" : 24}, 
        {"value" : 30}, 
        {"value" :36 }, 
        {"value" : 48}
    ],
    "3" : [
        {"value" : 6}, 
        {"value" : 9}, 
        {"value" : 12}, 
        {"value" : 18}, 
        {"value" : 24}, 
        {"value" : 30}, 
        {"value" : 36}, 
        {"value" : 48}, 
        {"value" :60 }, 
        {"value" :72}
    ],
    "4" : [
        {"value" :6}, 
        {"value" :9}, 
        {"value" :12}, 
        {"value" :18}, 
        {"value" :24}, 
        {"value" :30}, 
        {"value" : 36}, 
        {"value" : 48}, 
        {"value" :60}, 
        {"value" : 72}, 
        {"value" : 84}, 
        {"value" :96}
    ],
}

var Simulator = function(){

}

simulator = new Simulator();

function paintsMonths(data){
    var source = $("#optionByAmount").html();
    var template = Handlebars.compile(source);
    $("#amountMonth").html(template(data));

}
 
//events
$("#amountRequired").change(function(){
    var amount = parseInt($(this).val());
    amountAux = amount;
    var options = $("#amountMonth").find("option");
    $("#errorAmount").hide();
    if( amount >= AMOUNTH_0 && amount < AMOUNTH_1){
        options.remove();
        paintsMonths(months["1"]);
    }else if(amount > AMOUNTH_1 && amount < AMOUNTH_2){
        options.remove();
        paintsMonths(months["2"]);
    }else if(amount >= AMOUNTH_2 && amount < AMOUNTH_3){
        options.remove();
        paintsMonths(months["3"]);
         
    }else if(amount >= AMOUNTH_3 && amount < AMOUNTH_4){
        options.remove();
        paintsMonths(months["4"]);
    }else{
        $("#errorAmount").show();
    }
    allow = true;
    vc = 0;

});
$("#creditType").change(function(){
    if($(this).val() == 1){
       vc = 0;

        buyDebts.style.display = "none";
    }else{
        vc = 0;

        buyDebts.style.display = "";
    }       
});
$("#salary").change(function(){
    salaryAux = $(this).val();        
    allow =true;
    vc = 0;
});

$("#discounts").change(function(){
    discountsAux = $(this).val();
    allow=true;
    vc = 0;
});
Number.prototype.format = function(n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
                    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
                    };
var disp1 = function(){
    salary = parseInt($("#salary").val());
    return salary - expenFamily() - tq() + vc; 
}

var disp2 = function(){

    salary = $("#salary").val();
    return salary - protectSal() - $("#discounts").val();
}
function paintDeb(data){
    Handlebars.registerHelper('bankAmount', function(options) {
        return this.amount.format();
    });
    Handlebars.registerHelper('_tq', function(options) {
        return tq();
    });
    var source = $("#buyDebts-tpl").html();
    var template = Handlebars.compile(source);
    $("#buyDebts").html(template(data));
    $(".vcCheck").change(function(){
        if($(this).is(":checked")) {
            vc += parseInt($(this).attr("value"));
        }else{
            vc -= parseInt($(this).attr("value"));
        }
        $("#vc").html(vc);
    });

}
function calculateAccept(){
         $("#cws").html("$ "+cws().format());
        if($("#creditType").val() == 1){
            min = ( disp1() > disp2() ? disp2() : disp1() );
            if(cws() > min){
                $("#rejected").show();
                $("#accepted").hide();
            }else{
                $("#accepted").show();
                $("#rejected").hide();
            }
        }else{
            min = ( disp1() > disp2() ? disp2() : disp1() );
            
             if(cws() > min){
                $("#rejected").show();
                $("#accepted").hide();
            }else{
                $("#accepted").show();
                $("#rejected").hide();
            }
            if(allow){
                buyDebts.style.display = "";
                paintDeb(userDebt[documentId.value].resp);
                allow=false;

            }

           
        }

}

var interval = setInterval(function(){
    var company = $("#companyName").val();
    var amount = $("#amountRequired").val();
    var time = $("#amountMonth").val();
    var type = $("#creditType").val();
    var scp = $("#secureProtect").val();
    var name = $("#name").val();
    var lastname = $("#lastname").val();
    var salary = $("#salary").val();
    var discounts = $("#discounts").val();
    if(company != "" && amount != "" && time != "" && type != "" && scp != "" && name != "" && lastname  != "" && salary != "" && discounts != "" ){
            amountAux = amount;
            salaryAux = salary;
            discountsAux = discounts;
            calculateAccept();
    }
}, 1000);
